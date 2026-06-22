import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { lessonMetaSchema, lessonBodyShape, lessonRoutingShape } from './schema/lesson';
import { interviewSchema } from './schema/interview';
import { referenceMetaSchema } from './schema/reference';

/**
 * The `lessons` content collection — the MDX-hybrid lesson shape.
 *
 * Each lesson is one .mdx file under src/content/lessons/<track>/. The
 * FRONTMATTER carries the full lesson contract (the head/masthead `meta`
 * fields, validated by lessonMetaSchema) plus the structured BODY data
 * (quiz/interview/sources) that used to be handwritten DOM. The MDX BODY is
 * just the prose + headings + tables + the figure components.
 *
 * Schema source of truth stays src/schema/lesson.ts — we compose it here:
 *   lessonMetaSchema (the LessonLayout `meta` contract)
 *     .extend(body data)        ← quiz / interview / rubric / sources
 *     .extend(routing fields)   ← track / number (used by the dynamic route)
 *
 * .extend keeps every meta field byte-identical to what LessonLayout parses, so
 * passing `entry.data` straight through to LessonLayout's `meta` prop is safe.
 */
const lessons = defineCollection({
    loader: glob({
        pattern: '**/*.mdx',
        base: './src/content/lessons',
    }),
    schema: lessonMetaSchema.extend(lessonBodyShape).extend(lessonRoutingShape),
});

/**
 * The `interview` content collection — the Tufte-styled standalone interview
 * banks (rest-api/interview/NNNN-….mdx). FRONTMATTER carries the full bank
 * contract (head + masthead + nav + footer) plus the structured Q&A data
 * (interview[] + design rubric); the MDX BODY is just the short `.how` intro.
 * Schema source of truth is src/schema/interview.ts.
 */
const interview = defineCollection({
    loader: glob({
        pattern: '**/*.mdx',
        base: './src/content/interview',
    }),
    schema: interviewSchema,
});

/**
 * The `reference` content collection — the passive Tufte-styled reference /
 * cheat-sheet pages (<track>/reference/<slug>.html). One .mdx per page under
 * src/content/reference/<track>/. FRONTMATTER carries the head/masthead `meta`
 * (validated by referenceMetaSchema) + the inline-skin selector; the MDX BODY
 * is the bespoke content (tables / grids / ASCII diagrams / badges) authored as
 * raw HTML plus the per-page <footer>. Schema source of truth: schema/reference.ts.
 */
const reference = defineCollection({
    loader: glob({
        pattern: '**/*.mdx',
        base: './src/content/reference',
    }),
    schema: referenceMetaSchema,
});

export const collections = { lessons, interview, reference };
