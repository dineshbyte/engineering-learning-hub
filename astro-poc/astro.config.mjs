// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// ── Heading slug rehype plugin (no external dependency) ──────────────────────
// Astro/remark does NOT add `id` attributes to headings; the pandoc-generated
// glossary/resources pages DO (their deep-link anchors). This tiny inline plugin
// reproduces pandoc's `auto_identifiers` slug:
//   1. drop every char that is not alphanumeric / `_` / `-` / `.` / whitespace
//      (entities like &amp; have already been decoded to `&` in the hast text),
//   2. collapse whitespace runs to a single `-`,
//   3. lowercase,
//   4. trim leading chars up to the first letter.
// e.g. "Control-flow spectrum" → "control-flow-spectrum",
//      "Analysis & math" → "analysis-math", "Foundations (L1–2)" → "foundations-l12".
// It is dependency-free (a 30-line hast walker), so it adds no npm package.
function pandocSlug(text) {
    let s = text
        .replace(/[^\p{L}\p{N}_\-.\s]/gu, '') // strip disallowed punctuation (—, –, &, /, (), …)
        .replace(/\s+/g, '-') // whitespace runs → single hyphen
        .toLowerCase();
    s = s.replace(/^[^a-z]+/, ''); // pandoc trims up to the first letter
    return s;
}

function hastText(node) {
    if (node.type === 'text') return node.value;
    if (node.children) return node.children.map(hastText).join('');
    return '';
}

/**
 * rehype plugin for the glossary/resources Markdown bodies ONLY. It does two
 * things on those files:
 *   1. STRIP the leading <h1> — the GlossaryLayout renders the canonical H1 from
 *      the title (kicker → h1 → chips → body), matching the generator, so the
 *      body's own first H1 must not be duplicated.
 *   2. add pandoc-style `id`s to the remaining h2–h6 (Astro's built-in slugger
 *      would otherwise emit github-slugger ids, which differ from pandoc on `&`,
 *      en/em dashes, etc.). It only sets an id when none exists, so it never
 *      fights Astro's slugger.
 *
 * MDX inherits this base `markdown` config, so the plugin is SCOPED by source
 * path: the 70 lesson/interview/reference .mdx pages keep their existing
 * github-slugger ids and their authored H1s untouched. We no-op unless the file
 * lives under src/content/{glossary,resources,roadmaps}/ (roadmaps are the 5
 * README pages — same treatment: strip the leading H1, id the rest).
 */
function rehypeHeadingIds() {
    return (tree, file) => {
        const p = (file && (file.path || file.history?.[0])) || '';
        const norm = p.replace(/\\/g, '/');
        if (!/\/content\/(glossary|resources|roadmaps)\//.test(norm)) return;

        // 1. drop the FIRST <h1> wherever it sits in the tree (it may be nested
        //    inside a wrapper element, not a direct child of the root). Walk
        //    depth-first; remove the first h1 from its parent's children and stop.
        let removed = false;
        const dropFirstH1 = (node) => {
            if (removed || !Array.isArray(node.children)) return;
            for (let k = 0; k < node.children.length; k++) {
                const child = node.children[k];
                if (child.type === 'element' && child.tagName === 'h1') {
                    node.children.splice(k, 1);
                    removed = true;
                    return;
                }
                dropFirstH1(child);
                if (removed) return;
            }
        };
        dropFirstH1(tree);

        // 2. id every remaining heading (pandoc slug, skip if already set).
        const visit = (node) => {
            if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
                node.properties = node.properties || {};
                if (!node.properties.id) {
                    const id = pandocSlug(hastText(node));
                    if (id) node.properties.id = id;
                }
            }
            if (node.children) node.children.forEach(visit);
        };
        visit(tree);
    };
}

// ── Engineering Vault — Astro site config ───────────────────────────────────
// outDir is ../docs: `astro build` GENERATES the published site into docs/, and
// GitHub Pages serves it (main → /docs). docs/ is pure build output now — the
// hand-authored HTML has been removed; this Astro project is the source of truth.
// emptyOutDir:true regenerates docs/ cleanly each build (it lives outside the
// project root, so Astro requires the explicit opt-in to empty it).
//
// build.format:'file' preserves the existing .html URLs (e.g. .../0001-foo.html)
// so canonical URLs, OG tags, and the sitemap don't change a single character.
// base is the project-pages subpath; site is the origin — together they make
// canonical/OG URLs and asset links resolve exactly as they did before.
export default defineConfig({
    site: 'https://dineshbyte.github.io',
    base: '/engineering-learning-hub',
    outDir: '../docs',
    build: {
        format: 'file',
        emptyOutDir: true,
    },
    // MDX is required by the lessons content collection (src/content/lessons/*.mdx).
    // The lesson body is MDX (prose + tables + the figure/Quiz/Interview/Sources
    // components); .astro pages still render fine alongside it.
    integrations: [mdx()],
    // Heading ids on the Markdown glossary/resources bodies, matching pandoc's
    // anchors. No-dep inline plugin (see top of file).
    markdown: {
        rehypePlugins: [rehypeHeadingIds],
    },
});
