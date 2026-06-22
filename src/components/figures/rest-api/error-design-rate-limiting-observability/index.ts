// Barrel for the four bespoke rest-api/0009 SVG figures, so the MDX lesson can
// `import { Fig1, …, Fig4 } from '...'`. Each is a verbatim copy of the source
// SVG (see the per-file headers): Fig1 = anatomy of a problem+json error body
// (RFC 9457 core fields + extension members + never-leak banner), Fig2 = routing
// the failure to the right code (400 vs 422 vs 409, never 200), Fig3 = the token
// bucket → 429 decision (Retry-After + RateLimit-* headers), Fig4 = the
// observability triad (logs · metrics · traces) stitched by one correlation id.
// Kept in a per-lesson sub-folder co-located with the lesson's figures so the
// bulk-extraction script can mint one such folder per lesson without polluting
// the shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
