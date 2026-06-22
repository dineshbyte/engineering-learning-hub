// Barrel for the three bespoke rest-api/0001 SVG figures, so the MDX lesson can
// `import { Fig1, Fig2, Fig3 } from '...'`. Each is a verbatim copy of the source
// SVG (see the per-file headers): Fig1 = the six constraints around a central
// REST node, Fig2 = what statelessness buys you, Fig3 = the Richardson Maturity
// Model staircase. Kept in a per-lesson sub-folder co-located with the lesson's
// figures so the bulk-extraction script can mint one such folder per lesson
// without polluting the shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
