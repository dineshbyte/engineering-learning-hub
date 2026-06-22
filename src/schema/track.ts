import { z } from 'astro/zod';

/**
 * The track "contract" for the hub (docs/index.html). Every track card on the
 * home grid is rendered SERVER-SIDE from one of these objects, reproducing the
 * exact DOM that analytics.js depends on (there is no CI guard for that markup,
 * so the schema is the guard: `tracks.forEach(t => trackSchema.parse(t))` in
 * src/data/tracks.ts makes bad/missing data a BUILD ERROR, not a shipped break).
 *
 * Field-by-field mapping to the card markup in docs/index.html:
 *   slug             → <a class="start" data-track="SLUG"> (and the lesson href prefix)
 *   name             → span.tname
 *   tagline          → span.ttag  (the uppercase eyebrow under the name)
 *   category         → data-cat   (drives the filter chips)
 *   tier             → data-tier  (1 | 2 | 3)
 *   colorVar         → style="--tc:var(COLORVAR)"  e.g. "--track-agents"
 *   startHere        → the `data-here` boolean attribute (emit only when true)
 *   order            → hub-grid sort position (no DOM output; see sortTracksForHub)
 *   publishedAt      → data-added="YYYY-MM-DD"  (only on newer tracks; optional)
 *   updatedAt        → freshness marker for the date-first "Latest" sort (optional)
 *   tags             → .tags > span.tag[]   (the 5 topic chips, raw HTML preserved)
 *   description      → p.tdesc  (raw HTML preserved — may contain &amp; etc.)
 *   lessonCountLabel → span.cnt  e.g. "5 lessons" / "1 lesson"
 *   readTime         → .rtime    e.g. "~2h 55m read"
 *   lessons          → details.lwrap > .lessons > a.lchip[]
 *                        n     → the <i> glyph: a lesson number OR "★" (fundamentals)
 *                        title → the a.lchip > span inner HTML (entities preserved)
 *                        blurb → emitted into window.CARD_DETAIL[href] (derived inline
 *                                from lessons[].blurb in index.astro; the bottom sheet reads it)
 *   references       → .tfoot > a.pill[] (label = link text; md=true for the
 *                        muted Glossary/Resources/Roadmap pills, i.e. class="pill md")
 *
 * NOTE on raw-HTML fields (name? no — name is plain; but tagline, description,
 * tags[], lessons[].title): the source markup carries HTML entities such as
 * `&amp;` and `&mdash;`. These are stored EXACTLY as they appear in index.html so
 * the component can emit them with `set:html` and reproduce the page byte-for-byte.
 */

/** Lesson list entry — one `a.lchip` row inside the (display:none) details.lwrap. */
export const lessonRefSchema = z.object({
    /** href EXACTLY as in index.html — relative, e.g. "ai-agents/lessons/0001-….html". */
    href: z.string().min(1),
    /**
     * The `<i>` glyph: a lesson number (1, 2, …) OR the literal "★" used by the
     * deep-dive tracks for their "Fundamentals — start here" entry. Kept as a
     * string|number union to reproduce the glyph faithfully.
     */
    n: z.union([z.number().int().positive(), z.string().min(1)]),
    /** a.lchip > span inner HTML (HTML entities preserved, e.g. "Memory &amp; …"). */
    title: z.string().min(1),
    /** Per-lesson blurb shown in the card-detail sheet; emitted into
     *  window.CARD_DETAIL (derived inline from this field in index.astro). */
    blurb: z.string().min(1).optional(),
    /** Learning-sequence position (ascending). OPTIONAL: when unset the lesson
     *  keeps its authored position in the `lessons` array, which is already the
     *  learning order — set this only to override without moving the array entry.
     *  NOTE: distinct from `n` (the display glyph, which may be "★" or a label),
     *  so ordering never depends on the glyph. */
    order: z.number().int().optional(),
    /** When the lesson was first published (YYYY-MM-DD). Tiebreak only — the
     *  learning sequence is `order`/array position, NOT the publish date. */
    publishedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD')
        .optional(),
});

/** Footer pill — one `a.pill` (or `a.pill.md`) in the card's `.tfoot`. */
export const referenceRefSchema = z.object({
    /** Visible link text, e.g. "★ Cheat sheet", "Glossary", "Roadmap". */
    label: z.string().min(1),
    /** href EXACTLY as in index.html (relative). */
    href: z.string().min(1),
    /** true → class="pill md" (the muted Glossary/Resources/Roadmap pills). */
    md: z.boolean().optional(),
});

export const trackSchema = z.object({
    /** URL slug + data-track value, e.g. "ai-agents". */
    slug: z.string().min(1),
    /** Display name, span.tname, e.g. "AI Agents". (Plain text — no entities.) */
    name: z.string().min(1),
    /** span.ttag eyebrow, e.g. "Strategy & architecture" (raw HTML preserved). */
    tagline: z.string().min(1),
    /** data-cat — drives the filter chips. */
    category: z.enum(['ai', 'ai-eng', 'distributed', 'data', 'design']),
    /** data-tier difficulty band. */
    tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    /** CSS custom-property name for the track color, e.g. "--track-agents". */
    colorVar: z.string().startsWith('--track-'),
    /** Recommended entry path. Emits the `data-here` boolean attribute when true
     *  AND floats the card to the front of the hub grid (see sortTracksForHub). */
    startHere: z.boolean(),
    /** Manual hub-grid position (ascending), AFTER startHere tracks. Self-
     *  documents the intended order independently of the array's source position.
     *  OPTIONAL: unset falls back to the array index (authored position). */
    order: z.number().int().optional(),
    /** When the track was first published (YYYY-MM-DD) — emitted as the
     *  `data-added` attribute that drives the "NEW" pill. Used only as a sort
     *  TIEBREAK (newest-first) after startHere + order; never the learning
     *  sequence. Only on newer tracks. */
    publishedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD')
        .optional(),
    /** Freshness marker (YYYY-MM-DD) for the date-first "Latest" ordering
     *  (sortByLatest). Distinct from publishedAt so re-touching content doesn't
     *  rewrite its first-published date. */
    updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'updatedAt must be YYYY-MM-DD')
        .optional(),
    /** .tags > span.tag[] topic chips (raw HTML preserved). */
    tags: z.array(z.string().min(1)).min(1),
    /** p.tdesc card description (raw HTML preserved). */
    description: z.string().min(1),
    /** span.cnt, e.g. "5 lessons" / "1 lesson". */
    lessonCountLabel: z.string().min(1),
    /** .rtime, e.g. "~2h 55m read". */
    readTime: z.string().min(1),
    /** Ordered lesson list (kept in DOM for SEO + the bottom sheet). */
    lessons: z.array(lessonRefSchema).min(1),
    /** .tfoot footer pills (cheat sheet / review sheet / glossary / resources / roadmap). */
    references: z.array(referenceRefSchema).min(1),
});

export type LessonRef = z.infer<typeof lessonRefSchema>;
export type ReferenceRef = z.infer<typeof referenceRefSchema>;
export type Track = z.infer<typeof trackSchema>;
