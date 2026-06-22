/**
 * /rss.xml — the site feed (changelog), STATICALLY GENERATED at build time.
 *
 * Newest-first across the four dated collections (lessons, reference, interview,
 * roadmap), the same content the /latest page shows — but for feed readers.
 * Sorted publishedAt desc → title asc. Item links are root-relative (carry the
 * GitHub-Pages base) and @astrojs/rss resolves them against `site`.
 *
 * Discoverability: BaseLayout emits the <link rel="alternate" …> autodiscovery
 * tag on every page, and the footer carries a visible "RSS" link.
 */
import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context: APIContext) {
    const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

    const [lessons, reference, interview, roadmap] = await Promise.all([
        getCollection('lessons'),
        getCollection('reference'),
        getCollection('interview'),
        getCollection('roadmap'),
    ]);

    const tag = (entries: any[], kind: string) =>
        entries.map((e) => ({
            title: e.data.title,
            link: `${base}${e.data.path}`,
            // YYYY-MM-DD → UTC midnight (build-deterministic, no tz drift).
            pubDate: e.data.publishedAt ? new Date(`${e.data.publishedAt}T00:00:00Z`) : undefined,
            description: e.data.description ?? e.data.title,
            categories: [kind, e.data.trackLabel].filter(Boolean),
        }));

    const items = [
        ...tag(lessons, 'Lesson'),
        ...tag(reference, 'Reference'),
        ...tag(interview, 'Interview'),
        ...tag(roadmap, 'Roadmap'),
    ].sort(
        (a, b) =>
            (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0) ||
            a.title.localeCompare(b.title, 'en'),
    );

    return rss({
        title: 'Engineering Vault — Latest',
        description:
            'Newly published lessons, references, interview banks and roadmaps from Engineering Vault.',
        site: context.site!,
        items,
        customData: '<language>en-us</language>',
    });
}
