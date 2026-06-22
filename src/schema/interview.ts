import { z } from 'astro/zod';
import { lessonMetaSchema, lessonBodyShape } from './lesson';

/**
 * The interview-BANK "contract" — the Tufte-styled standalone Q&A pages
 * (rest-api/interview/NNNN-….html). One .mdx per bank under
 * src/content/interview/<track>/. InterviewLayout calls `.parse()` on it at
 * build time, so a malformed/missing field is a BUILD ERROR, never a silently
 * broken page.
 *
 * Reuse, don't re-declare:
 *   • head/SEO fields are PICKED from lessonMetaSchema (title, description,
 *     keywords, path, ogImage, ogImageAlt, accentVar) so they stay byte-identical
 *     to what BaseLayout reads.
 *   • the body sub-schemas (interview[] / rubricIntro / rubric[]) are LIFTED from
 *     lessonBodyShape so <Interview> renders the SAME shape it does for lessons —
 *     and the FAQPage JSON-LD it emits can never drift from the visible Q&A.
 *
 * There is deliberately NO `jsonLd` field: <Interview> owns the single FAQPage
 * blob. Setting one here would ship two FAQPage objects.
 */
export const interviewSchema = z
    .object({
        // —— head / SEO (reused from the lesson meta contract) ——
        title: lessonMetaSchema.shape.title,
        description: lessonMetaSchema.shape.description,
        keywords: lessonMetaSchema.shape.keywords,
        path: lessonMetaSchema.shape.path,
        ogImage: lessonMetaSchema.shape.ogImage,
        ogImageAlt: lessonMetaSchema.shape.ogImageAlt,
        accentVar: lessonMetaSchema.shape.accentVar,

        // —— masthead / chrome (bank-specific, raw HTML where noted) ——
        trackLabel: z.string(), // hubbar muted label, e.g. "REST API Mastery · Interview"
        kicker: z.string(), // eyebrow, e.g. "Interview Bank · Lesson 1"
        h1Html: z.string(), // headline; may contain inline HTML (&amp;, <em>, …)
        metaLine: z.string(), // RAW HTML — carries the "pairs with <a>Lesson N</a>" cross-link + &nbsp; (NOT derivable)
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

        // —— wayfinding (data-driven .nav, top + bottom) ——
        topNav: z.object({
            refHref: z.string(), // the "📄 …reference" link href
            refLabel: z.string(), // its visible label (may contain HTML entities)
            prevHref: z.string().optional(),
            prevLabel: z.string().optional(),
            nextHref: z.string().optional(),
            nextLabel: z.string().optional(),
        }),

        // —— footer (raw HTML — carries links + entities) ——
        footerHtml: z.string(),

        // —— routing (used only by the dynamic route) ——
        track: z.string(), // e.g. "rest-api"
        number: z.string().optional(), // zero-padded bank number, e.g. "0001"
    })
    // body Q&A data — interview[] {level, q, a}, rubricIntro?, rubric[] — lifted
    // verbatim from lessonBodyShape so <Interview> renders identically.
    .extend({
        interview: lessonBodyShape.interview,
        rubricIntro: lessonBodyShape.rubricIntro,
        rubric: lessonBodyShape.rubric,
    });

export type InterviewMeta = z.infer<typeof interviewSchema>;
