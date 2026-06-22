// Barrel for this lesson's three bespoke inline-SVG figures, so the MDX lesson
// can `import { Fig1, Fig2, Fig3 } from '...'`. Each is a verbatim copy of the
// source SVG (see the per-file headers). Fig1 (the hero) also emits the shared
// arrowhead <marker> defs (arw, arwA, arwG) the three SVGs reference, since the
// source page declared them once in a body-top <svg>. Kept in a sub-folder
// co-located with the lesson so the bulk-extraction script can mint one such
// folder per lesson without polluting the shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
