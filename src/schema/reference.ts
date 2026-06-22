import { z } from 'astro/zod';
import { lessonMetaSchema } from './lesson';

/**
 * The reference / cheat-sheet "contract" — the 10 passive Tufte-styled reference
 * pages (<track>/reference/<slug>.html: rest-api ×5, ai-agents ×2,
 * context-engineering ×2, bloom-filters ×1). One .mdx per page under
 * src/content/reference/<track>/. ReferenceLayout calls `.parse()` on it at
 * build time, so a malformed/missing field is a BUILD ERROR, never a silently
 * broken page.
 *
 * These pages are PASSIVE — no quiz, no interview Q&A, no progress. So unlike
 * the lesson/interview schemas there is deliberately:
 *   • NO jsonLd field (no FAQPage — nothing to mark up),
 *   • NO interview / quiz / rubric / sources body data.
 * The bespoke body (tables, .cols grids, pre.dgm ASCII diagrams, .y/.n cells,
 * .tag/.flag badges, dl/dt/dd) and the per-page <footer> are authored as raw
 * HTML in the MDX body, not modeled here.
 *
 * Reuse, don't re-declare: the head/SEO fields are PICKED from lessonMetaSchema
 * so they stay byte-for-byte what BaseLayout reads.
 */
export const referenceMetaSchema = z.object({
    // —— head / SEO (reused from the lesson meta contract) ——
    title: lessonMetaSchema.shape.title, // bare page title; BaseLayout appends " · Engineering Vault" to <title>
    description: lessonMetaSchema.shape.description,
    keywords: lessonMetaSchema.shape.keywords,
    path: lessonMetaSchema.shape.path, // EXACT, e.g. "rest-api/reference/rest-constraints-and-maturity.html"
    ogImage: lessonMetaSchema.shape.ogImage,
    ogImageAlt: lessonMetaSchema.shape.ogImageAlt,

    // og:title VERBATIM. The live pages have a suffix quirk: the 5 REST pages put
    // "… · Engineering Vault" INSIDE og:title (identical to <title>); the 5
    // non-REST pages use the bare title. BaseLayout's ogTitle prop defaults to
    // `title` (bare) — so this is set ONLY on the REST pages, to the full
    // suffixed string, and left absent (→ bare) on the rest.
    ogTitle: z.string().optional(),

    // accentVar drives the per-track :root{--accent} kept as the first line of the
    // inline skin block (matching the live pages, where there is NO separate
    // accent <style> tag) — so it is NOT forwarded to BaseLayout's accentVar prop.
    accentVar: z.string().startsWith('--track-'),

    // —— masthead / chrome ——
    trackLabel: z.string(), // hubbar muted label, e.g. "REST API Mastery · Reference"
    kicker: z.string(), // eyebrow, e.g. "Reference · REST"
    h1Html: z.string(), // headline; may contain inline HTML (&amp;, <em>, …)
    chips: z.array(z.string()).min(1), // the .ltags topic chips (HTML allowed per chip)

    // —— dates (optional) —— shown on the page itself, never on hub cards.
    publishedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD')
        .optional(),
    updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'updatedAt must be YYYY-MM-DD')
        .optional(),

    // Exactly one of these renders the optional intro line under the chips:
    lede: z.string().optional(), // <p class="lede"> on the 5 REST pages
    subHtml: z.string().optional(), // <div class="sub"> on the agents/context pages (carries cross-links)

    // Which inline Tufte skin to inject (selects one of three CSS blocks):
    //   'rest'      — the 5 REST pages (50rem, .lede, .y/.n/.num, dl .why, .lvl)
    //   'checklist' — the 4 ai-agents + context pages (.sub, .cols, .one, pre.dgm, .tag, uppercase h2)
    //   'bloom'     — the 1 bloom page
    skin: z.enum(['rest', 'checklist', 'bloom']).default('rest'),

    // The two 'checklist' review pages add a `.flag` badge rule the two
    // checklist cheat-sheets omit — toggled here so output stays byte-identical.
    flag: z.boolean().default(false),

    // —— routing (used only by the dynamic route) ——
    track: z.string(), // e.g. "rest-api"
});

export type ReferenceMeta = z.infer<typeof referenceMetaSchema>;
