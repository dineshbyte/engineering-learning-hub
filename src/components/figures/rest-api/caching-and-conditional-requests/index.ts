// Barrel for the six bespoke rest-api/0007 SVG figures, so the MDX lesson can
// `import { Fig1, …, Fig6 } from '...'`. Each is a verbatim copy of the source
// SVG (see the per-file headers): Fig1 = caching's two halves (freshness vs
// validation), Fig2 = the Cache-Control directives map, Fig3 = the conditional
// GET → 304 round-trip, Fig4 = the fresh → stale → revalidate lifecycle,
// Fig5 = If-Match optimistic concurrency (200 vs 412), Fig6 = the cache key &
// the Vary trap. Kept in a per-lesson sub-folder co-located with the lesson's
// figures so the bulk-extraction script can mint one such folder per lesson
// without polluting the shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
export { default as Fig6 } from './Fig6.astro';
