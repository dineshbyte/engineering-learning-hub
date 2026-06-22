/**
 * /assets/search-index.js — the hub's search index, STATICALLY GENERATED.
 *
 * This endpoint is the single source of truth for `window.SEARCH_INDEX`. It is
 * prerendered at build time into `assets/search-index.js`, a plain JS file the
 * hub loads (non-defer) before the ported search IIFE runs (see index.astro).
 *
 * It replaces the old inline title+blurb-only derivation in index.astro with a
 * FULL-TEXT index built straight from the `lessons` content collection: each
 * lesson's searchable blob (`x`) now includes the lesson PROSE (the MDX body),
 * its quiz/interview Q&A, and its footnote sources — so a term that appears only
 * deep in a lesson body matches again (deep search restored).
 *
 * Entry shape is UNCHANGED — the ported run()/search code reads `{t,u,g,k,x,c}`:
 *   t = title (decoded display text)   u = href (canonical path)
 *   g = track display name (decoded)   k = kind label (.rkind: "Lesson" | …)
 *   x = lowercased searchable blob      c = track color var (e.g. "--track-rest")
 *
 * SCOPE: this covers the 48 migrated lessons (now full-text) + the per-track
 * reference pills. The 11 rest-api/interview/* bank pages and the reference/
 * glossary/resources pages are NOT in the `lessons` collection (not yet migrated
 * to Astro), so they are NOT in this index — same coverage gap as the previous
 * Astro derivation, just now full-text on the lessons it does cover.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { tracks } from '../../data/tracks';

export const prerender = true;

type SearchEntry = { t: string; u: string; g: string; k: string; x: string; c: string };

// ── text helpers (kept local to this endpoint — it owns the index) ───────────
// Decode the handful of HTML entities in the source strings into plain text, so
// the searchable blob (`x`) and the displayed title/group (`t`/`g`) read as
// plain text (mirrors how the old prebuilt index stored decoded text).
const decode = (s: string): string =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&mdash;/g, '—')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');

// Reference-pill label → the kind label rendered in the result row's `.rkind`.
// Muted (md) pills are Glossary / Resources / Roadmap; the rest are reference
// sheets. Identical logic to the derivation index.astro used previously.
const refKind = (label: string): string => {
    const l = decode(label).toLowerCase();
    if (l.includes('glossary')) return 'Glossary';
    if (l.includes('resources')) return 'Resources';
    if (l.includes('roadmap')) return 'Roadmap';
    return 'Reference';
};

// Strip raw MDX/HTML chrome out of a lesson body down to plain searchable prose.
// In order: drop `export const …`/`import …` lines (component wiring), strip
// HTML/JSX tags `<…>` (incl. self-closing `<Fig1 />`), strip `{…}` JSX
// expressions, strip named (`&rarr;`) + numeric (`&#8594;`) HTML entities, strip
// markdown punctuation `# * ` > _ ~ [ ] ( ) |`, then collapse whitespace. The
// caller lowercases the result. Intentionally lossy — it restores DEEP search
// (a term appearing only in body prose now matches) without being a real parser.
const bodyToText = (body: string): string =>
    body
        .replace(/^export\s+(?:const|let|var|default|function)\b[\s\S]*?(?:;|\n\n)/gm, ' ')
        .replace(/^\s*import\s.*$/gm, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\{[^{}]*\}/g, ' ')
        .replace(/&[a-zA-Z]+;/g, ' ')
        .replace(/&#\d+;/g, ' ')
        .replace(/[#*`>_~[\]()|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

// track slug → { name (decoded), colorVar } — one lookup pass over `tracks`.
const trackBySlug = new Map(
    tracks.map((tr) => [tr.slug, { name: decode(tr.name), colorVar: tr.colorVar }] as const),
);

/**
 * Get a lesson's raw MDX body. Prefer the collection's `entry.body` (populated
 * for glob-loaded MDX); fall back to reading the file off disk and stripping the
 * leading frontmatter fence if `body` is empty for any reason.
 */
async function rawBody(entry: { body?: string; filePath?: string }): Promise<string> {
    if (entry.body && entry.body.trim()) return entry.body;
    if (entry.filePath) {
        const file = await readFile(entry.filePath, 'utf8');
        // strip a leading `---\n…\n---\n` frontmatter block
        return file.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
    }
    return '';
}

export const GET: APIRoute = async () => {
    const lessonEntries = await getCollection('lessons');

    // ── LESSON entries — FULL-TEXT ──────────────────────────────────────────
    const lessons: SearchEntry[] = [];
    for (const entry of lessonEntries) {
        const d = entry.data;
        const track = trackBySlug.get(d.track);
        const g = track?.name ?? decode(d.track);
        const c = track?.colorVar ?? d.accentVar; // accentVar is the per-lesson track color too

        const title = decode(d.title);
        const chipsText = (d.chips ?? []).map(decode).join(' ');
        const quizText = (d.quiz ?? []).map((qi) => qi.q).join(' ');
        const interviewText = (d.interview ?? []).map((iv) => `${iv.q} ${iv.a}`).join(' ');
        const sourcesText = (d.sources ?? []).map((s) => s.html).join(' ');
        const prose = bodyToText(await rawBody(entry));

        // FULL-TEXT blob: title + chips + quiz Qs + interview Q&A + sources + prose.
        // Entities/tags in the structured HTML strings are scrubbed the same way
        // the prose is, so the blob is clean plain text.
        const blob = bodyToText(
            [title, chipsText, quizText, interviewText, sourcesText, prose].join(' '),
        );

        lessons.push({
            t: title,
            u: d.path,
            g,
            k: 'Lesson',
            c,
            x: blob.toLowerCase(),
        });
    }

    // ── REFERENCE entries — the .tfoot pills (verbatim with index.astro) ─────
    const references: SearchEntry[] = [];
    for (const track of tracks) {
        const group = decode(track.name);
        for (const ref of track.references) {
            const t = decode(ref.label);
            references.push({
                t,
                u: ref.href,
                g: group,
                k: refKind(ref.label),
                x: `${group} ${t}`.toLowerCase(),
                c: track.colorVar,
            });
        }
    }

    const entries = lessons.concat(references);

    return new Response(`window.SEARCH_INDEX=${JSON.stringify(entries)};`, {
        headers: { 'content-type': 'text/javascript' },
    });
};
