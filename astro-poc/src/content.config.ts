import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { lessonMetaSchema, lessonBodyShape, lessonRoutingShape } from './schema/lesson';

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

export const collections = { lessons };
