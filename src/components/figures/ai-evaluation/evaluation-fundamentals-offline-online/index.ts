// Barrel for the five bespoke ai-evaluation/0001 SVG figures, so the MDX lesson
// can `import { Fig1, Fig2, … } from '...'`. Each is a verbatim copy of the
// source SVG (see the per-file headers). Fig1 also carries the page's shared
// arrowhead <marker> defs (#arw/#arwG/#arwR/#arwM) that Figs 2–5 reference.
// Kept in a sub-folder co-located with the lesson's figures so the bulk-
// extraction script can mint one such folder per lesson without polluting the
// shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
