import { z } from 'astro/zod';

/**
 * The lesson "contract". Every lesson page must satisfy this shape, and the
 * shared LessonLayout calls `.parse()` on it at build time — so a malformed or
 * missing field is a BUILD ERROR, not a silently broken page that ships.
 *
 * This is what replaces the hand-rolled checks in scripts/validate-content.js
 * for lesson metadata: the schema is the single, enforced source of truth.
 *
 * This file stays the SINGLE source of all lesson schema:
 *   • `lessonMetaSchema`  — the head/masthead/wayfinding fields LessonLayout reads.
 *   • `lessonBodyShape`   — the structured body DATA (quiz/interview/sources) the
 *                           MDX content collection lifts out of the prose.
 *   • `lessonRoutingShape`— track + number, used only by the dynamic route.
 * `content.config.ts` composes them into the `lessons` collection schema; nothing
 * else changes for LessonLayout (it still imports + parses `lessonMetaSchema`).
 */
export const lessonMetaSchema = z.object({
    // —— SEO / <head> ——
    title: z.string().min(8), // page title, sans the "· Engineering Vault" suffix
    description: z.string().min(20),
    keywords: z.string().min(5), // meta keywords (comma-separated)
    path: z.string().min(3), // canonical path under the site root, e.g. "bloom-filters/lessons/0001-….html"
    ogImage: z.string(), // path under the site, e.g. "assets/og/bloom-filters.png"
    ogImageAlt: z.string(),
    accentVar: z.string().startsWith('--track-'),
    jsonLd: z.unknown().optional(), // structured data (e.g. FAQPage) injected into <head>

    // —— masthead ——
    trackLabel: z.string(), // e.g. "Bloom Filters · Foundation"
    kicker: z.string(), // e.g. "Lesson 1 · Foundation"
    h1Html: z.string(), // headline; may contain inline <em>
    metaLine: z.string(), // e.g. "~7 min · visual-first · …"
    chips: z.array(z.string()).min(1), // topic chips (the leading meta keywords, Title-cased)

    // —— dates (optional) —— shown on the detail page itself (NOT on hub cards),
    // and available for RSS/SEO/article metadata. publishedAt = first published;
    // updatedAt = last meaningful revision. Rendered only when present.
    publishedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD')
        .optional(),
    updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'updatedAt must be YYYY-MM-DD')
        .optional(),

    // —— prev/next wayfinding (optional at the ends of a track) ——
    prev: z
        .object({
            href: z.string(),
            title: z.string(),
        })
        .optional(),
    next: z
        .object({
            href: z.string(),
            title: z.string(),
        })
        .optional(),
});

export type LessonMeta = z.infer<typeof lessonMetaSchema>;

/**
 * Structured BODY data — the interactive blocks lifted out of the prose into
 * frontmatter so they can be rendered by the typed components (<Quiz>,
 * <Interview>, <Sources>) and so the FAQ JSON-LD derives from the SAME interview
 * array the page shows (no drift). These are an OBJECT of fields (not a z.object)
 * so the collection schema can spread them next to the meta fields.
 */
export const lessonBodyShape = {
    // retrieval-practice quiz — each item rendered by <Quiz>
    quiz: z
        .array(
            z.object({
                q: z.string(),
                options: z.array(z.string()).min(2),
                correct: z.number().int().min(0), // index of the correct option
            }),
        )
        .default([]),

    // interview Q&A — <Interview> renders the level-grouped <details> AND the
    // FAQPage JSON-LD from this one array (the FAQ must NOT also go in meta.jsonLd)
    interview: z
        .array(
            z.object({
                level: z.enum(['core', 'senior', 'staff', 'design']),
                q: z.string(), // may contain inline HTML
                a: z.string(), // answer HTML
            }),
        )
        .default([]),
    rubricIntro: z.string().optional(), // design-round framework lead-in (HTML)
    rubric: z.array(z.string()).default([]), // ordered design-round checklist (HTML per item)

    // footnote sources — verbatim citation HTML incl. links + the ↩ back-ref
    sources: z
        .array(
            z.object({
                id: z.string(), // anchor id the body's <sup> links to, e.g. "s1"
                html: z.string(),
            }),
        )
        .default([]),

    // memory-check recall disclosure (33/48 lessons) — rendered by <MemoryCheck>
    mc: z
        .array(
            z.object({
                q: z.string(), // prompt (may contain inline HTML)
                a: z.string(), // answer shown after the → arrow
            }),
        )
        .default([]),

    // arrow-flow stat row (11/48 lessons) — rendered by <Steps>
    steps: z
        .array(
            z.object({
                lab: z.string(),
                big: z.string(),
                sub: z.string(),
            }),
        )
        .default([]),
} as const;

/**
 * Routing fields — used only by the dynamic route to place the built file. They
 * are redundant with `path` but make getStaticPaths explicit and let a future
 * bulk script group/sort entries without reparsing `path`.
 */
export const lessonRoutingShape = {
    track: z.string(), // e.g. "bloom-filters"
    number: z.string().optional(), // zero-padded lesson number e.g. "0001"; absent for fundamentals/deep-dive single-pagers
} as const;
