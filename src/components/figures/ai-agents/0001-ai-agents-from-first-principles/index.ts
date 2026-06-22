// Barrel for the 11 bespoke ai-agents/0001 SVG figures, so the MDX lesson can
// `import { Fig1, …, Fig11 } from '...'`. Each is a verbatim copy of the source
// SVG (see the per-file headers). The source defines the arrowhead <marker>s once
// in a shared top-level <svg>; here each figure inlines the markers it needs with
// a per-figure namespace (-fN) so all 11 figures on one page keep unique ids.
// Kept in a sub-folder co-located with the lesson's figures so the bulk-extraction
// script can mint one such folder per lesson without polluting the shared dir.
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
export { default as Fig11 } from './Fig11.astro';
