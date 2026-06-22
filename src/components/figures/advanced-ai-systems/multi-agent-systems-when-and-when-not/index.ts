// Barrel for the bespoke advanced-ai-systems/0001 SVG figures, so the MDX lesson
// can `import { Fig0, Fig1, Fig2, Fig3, Fig4 } from '...'`. Each is a verbatim copy
// of the source SVG (see the per-file headers). Fig0 is NOT a <figure> — it holds
// the shared arrowhead <marker> defs that Fig1–Fig4 reference by id (#arw, #arwG,
// #arwR, #arwM); the MDX renders <Fig0 /> ONCE before the figures so the markers
// resolve. Kept in a sub-folder co-located with the lesson's figures so the bulk-
// extraction script can mint one such folder per lesson without polluting the
// shared components dir.
export { default as Fig0 } from './Fig0.astro';
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
