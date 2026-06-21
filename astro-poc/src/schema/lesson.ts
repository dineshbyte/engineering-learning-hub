import {z} from 'astro/zod';

/**
 * The lesson "contract". Every lesson page must satisfy this shape, and the
 * shared LessonLayout calls `.parse()` on it at build time — so a malformed or
 * missing field is a BUILD ERROR, not a silently broken page that ships.
 *
 * This is what replaces the hand-rolled checks in scripts/validate-content.js
 * for lesson metadata: the schema is the single, enforced source of truth.
 */
export const lessonMetaSchema = z.object({
    // —— SEO / <head> ——
    title: z.string().min(8),            // page title, sans the "· Engineering Vault" suffix
    description: z.string().min(20),
    keywords: z.string().min(5),         // meta keywords (comma-separated)
    path: z.string().min(3),             // canonical path under the site root, e.g. "bloom-filters/lessons/0001-….html"
    ogImage: z.string(),                 // path under the site, e.g. "assets/og/bloom-filters.png"
    ogImageAlt: z.string(),
    accentVar: z.string().startsWith('--track-'),
    jsonLd: z.unknown().optional(),      // structured data (e.g. FAQPage) injected into <head>

    // —— masthead ——
    trackLabel: z.string(),              // e.g. "Bloom Filters · Foundation"
    kicker: z.string(),                  // e.g. "Lesson 1 · Foundation"
    h1Html: z.string(),                  // headline; may contain inline <em>
    metaLine: z.string(),                // e.g. "~7 min · visual-first · …"
    chips: z.array(z.string()).min(1),   // topic chips (the leading meta keywords, Title-cased)

    // —— prev/next wayfinding (optional at the ends of a track) ——
    prev: z.object({href: z.string(), title: z.string()}).optional(),
    next: z.object({href: z.string(), title: z.string()}).optional(),
});

export type LessonMeta = z.infer<typeof lessonMetaSchema>;
