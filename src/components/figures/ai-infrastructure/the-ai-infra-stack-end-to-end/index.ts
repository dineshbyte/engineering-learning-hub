// Barrel for the five bespoke ai-infrastructure/0001 SVG figures, so the MDX
// lesson can `import { Fig1, Fig2, Fig3, Fig4, Fig5 } from '...'`. Each is a
// verbatim copy of the source page's inline SVG (see per-file headers). Fig1
// additionally carries the source page's shared arrowhead <defs> (#arw/#arwG/
// #arwR/#arwM), which the later figures reference via marker-end="url(#arw)".
// Kept in a sub-folder co-located with the lesson's figures, one such folder
// per lesson, so the shared components dir stays unpolluted.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
