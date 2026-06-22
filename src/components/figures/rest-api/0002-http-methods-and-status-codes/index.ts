// Barrel for the five bespoke rest-api/0002 SVG figures, so the MDX lesson can
// `import { Fig1, Fig2, Fig3, Fig4, Fig5 } from '...'`. Each is a verbatim copy
// of the source SVG (see the per-file headers): Fig1 = the three orthogonal
// properties (safe ⊂ idempotent, cacheable apart), Fig2 = the method-semantics
// matrix (RFC 9110), Fig3 = PUT vs POST "who owns the URI", Fig4 = the
// status-code families at a glance, Fig5 = the "pick the right code — four
// forks" decision mini-map. Kept in a per-lesson sub-folder co-located with the
// lesson's figures so the bulk-extraction script can mint one such folder per
// lesson without polluting the shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
