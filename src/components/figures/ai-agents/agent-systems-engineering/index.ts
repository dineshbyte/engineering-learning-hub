// Barrel for the ten bespoke ai-agents/0005 SVG figures, so the MDX lesson can
// `import { Fig1, …, Fig10 } from '...'`. Each is a verbatim copy of the source
// SVG (see the per-file headers). Kept in a sub-folder co-located with the
// lesson's figures so the bulk-extraction script can mint one such folder per
// lesson without polluting the shared components dir. The marker/gradient refs
// (url(#arw), url(#arwA), url(#arwG), url(#arwR)) resolve against the shared
// <defs> SVG emitted once at the top of the lesson body.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
export { default as Fig6 } from './Fig6.astro';
export { default as Fig7 } from './Fig7.astro';
export { default as Fig8 } from './Fig8.astro';
export { default as Fig9 } from './Fig9.astro';
export { default as Fig10 } from './Fig10.astro';
