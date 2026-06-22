/**
 * Deterministic, stable ordering for the hub — ONE place, so the grid, the
 * lesson lists and any future "Latest" section never drift apart.
 *
 * This is a learning hub, not a chronological blog: the DEFAULT reader view is
 * learning-path-first (startHere → manual order → …), and the publish date is
 * only ever a TIEBREAK, never the primary key. A date-first ordering exists
 * (sortByLatest) but is reserved for an explicit "Latest" section.
 *
 * Every comparator ends in a title compare, so the result is fully deterministic
 * (no two items tie) and independent of the array's source order.
 */
import type { Track, LessonRef } from '../schema/track';

/** Stable, locale-fixed title fallback. */
const byName = (a: string, b: string) => a.localeCompare(b, 'en');

/**
 * Compare two optional YYYY-MM-DD dates. `dir = -1` → newer first (desc),
 * `dir = 1` → older first (asc). A MISSING date always sorts last (it carries no
 * ordering signal), in either direction — keeps the result deterministic.
 */
function byDate(a: string | undefined, b: string | undefined, dir: -1 | 1): number {
    if (a === b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    return a < b ? -dir : dir;
}

/** Decorate with source index so an unset `order` falls back to authored position. */
const withIndex = <T>(items: T[]) => items.map((item, idx) => ({ item, idx }));

/**
 * 1. Homepage track cards:
 *    startHere first → manual `order` asc → publishedAt desc → title asc.
 */
export function sortTracksForHub(tracks: Track[]): Track[] {
    return withIndex(tracks)
        .sort(
            (a, b) =>
                Number(b.item.startHere) - Number(a.item.startHere) ||
                (a.item.order ?? a.idx) - (b.item.order ?? b.idx) ||
                byDate(a.item.publishedAt, b.item.publishedAt, -1) ||
                byName(a.item.name, b.item.name),
        )
        .map((d) => d.item);
}

/**
 * 2. Lessons inside a track:
 *    manual `order` asc → publishedAt asc → title asc. An unset `order` keeps the
 *    authored array position, which is already the learning sequence — so lessons
 *    are learning-first, never newest-first.
 */
export function sortLessons(lessons: LessonRef[]): LessonRef[] {
    return withIndex(lessons)
        .sort(
            (a, b) =>
                (a.item.order ?? a.idx) - (b.item.order ?? b.idx) ||
                byDate(a.item.publishedAt, b.item.publishedAt, 1) ||
                byName(a.item.title, b.item.title),
        )
        .map((d) => d.item);
}

/**
 * 3. Latest / recent section (date-first — NOT the default learning view):
 *    publishedAt desc → updatedAt desc → title asc. Ready for an explicit
 *    "Latest" UI; no such section exists today.
 */
export function sortByLatest(tracks: Track[]): Track[] {
    return withIndex(tracks)
        .sort(
            (a, b) =>
                byDate(a.item.publishedAt, b.item.publishedAt, -1) ||
                byDate(a.item.updatedAt, b.item.updatedAt, -1) ||
                byName(a.item.name, b.item.name),
        )
        .map((d) => d.item);
}
