import { defineCollection, z } from 'astro:content';
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

/**
 * The `glossary` and `resources` collections — the on-site renderings of each
 * track's GLOSSARY.md / RESOURCES.md (replacing scripts/build-reference-pages.py).
 *
 * One plain .md per track under src/content/{glossary,resources}/<track>.md
 * (SEPARATE base dirs from the .mdx `reference` collection so the globs don't
 * collide). The only AUTHORED frontmatter is `title:` — the exact pre-suffix
 * <title> text, which the markdown's own H1 wording is too inconsistent to
 * supply. ALL other metadata (name/keywords/chips/accent/ogImage/description) is
 * DERIVED from the track slug via src/data/tracks-reference.ts, so the schema is
 * deliberately permissive: validate `title`, passthrough anything else.
 */
const glossary = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/glossary',
    }),
    schema: z.object({ title: z.string() }).passthrough(),
});

const resources = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/resources',
    }),
    schema: z.object({ title: z.string() }).passthrough(),
});

export const collections = { lessons, interview, reference, glossary, resources };
