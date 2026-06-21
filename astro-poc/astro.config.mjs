// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// ── Engineering Vault — Astro proof-of-concept config ────────────────────────
// PROOF ONLY: outDir is ../dist so a build NEVER overwrites the live site in
// docs/. For the real migration you flip outDir to '../docs' (or move the
// project to the repo root with outDir './docs') and the deploy model stays
// exactly "GitHub Pages: main → /docs" — Pages just serves the built output.
//
// build.format:'file' preserves the existing .html URLs (e.g. .../0001-foo.html)
// so canonical URLs, OG tags, and the sitemap don't change a single character.
//
// base is the project-pages subpath; site is the origin. Together they make
// canonical/OG URLs and asset links resolve exactly as they do today.
export default defineConfig({
    site: 'https://dineshbyte.github.io',
    base: '/engineering-learning-hub',
    outDir: '../dist',
    build: {
        format: 'file',
    },
    // MDX is required by the lessons content collection (src/content/lessons/*.mdx).
    // The lesson body is MDX (prose + tables + the figure/Quiz/Interview/Sources
    // components); .astro pages still render fine alongside it.
    integrations: [mdx()],
});
