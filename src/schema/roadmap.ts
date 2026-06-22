import { z } from 'astro/zod';

/**
 * The roadmap "contract" — the 5 README/roadmap pages (<track>/README.html for
 * storage-engines, distributed-systems, transactions-isolation,
 * streaming-event-driven, applied-systems-design). One plain .md per track under
 * src/content/roadmaps/<track>.md. RoadmapLayout calls `.parse()` on it at build
 * time, so a malformed/missing field is a BUILD ERROR, never a silently broken
 * page.
 *
 * These pages are STATIC indexes — no quiz, no interview Q&A, no progress, no
 * pager. So unlike the lesson/interview schemas there is deliberately:
 *   • NO jsonLd field (no FAQPage — nothing to mark up),
 *   • NO interview / quiz / rubric / sources body data.
 * The body (prose + tables + the progress checklist + the file tree) is the
 * Markdown body, rendered by <Content/>; its leading H1 is stripped (the layout
 * renders the canonical H1 from `title`).
 *
 * The Tufte serif chrome (inline skin + .ltags chips, the fixed theme button, the
 * hubbar, the masthead) lives in RoadmapLayout exactly once.
 *
 * head/SEO fields are lifted VERBATIM from the live (hand-curated) README.html
 * <head>; chips are the leading keyword items / the live .ltags.
 */
export const roadmapSchema = z.object({
    // —— head / SEO (lifted verbatim from the live README.html <head>) ——
    title: z.string().min(1), // bare page title; BaseLayout appends " · Engineering Vault" — required (build fails if missing)
    description: z.string().min(1),
    keywords: z.array(z.string()).min(5, 'roadmap keywords need at least 5 entries'), // joined with ", " into <meta name="keywords"> — required (build fails if missing/short)
    ogImage: z.string(), // e.g. "assets/og/storage-engines.png"
    ogImageAlt: z.string(),

    // —— masthead / chrome ——
    chips: z.array(z.string()).min(1), // the .ltags topic chips (HTML allowed per chip)
    accentVar: z.string().startsWith('--track-'), // per-track :root{--accent}, first line of the inline skin
    trackLabel: z.string(), // hubbar muted label, e.g. "Storage Engines"
    kicker: z.string().default('Learning track · Roadmap'), // eyebrow

    // —— routing (used by the dynamic route) ——
    path: z.string().min(1), // EXACT, e.g. "storage-engines/README.html" — required (build fails if missing)
});

export type RoadmapMeta = z.infer<typeof roadmapSchema>;
