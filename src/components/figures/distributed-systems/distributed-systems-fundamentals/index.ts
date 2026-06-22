// Barrel for the bespoke distributed-systems/fundamentals SVG figures + the
// shared arrowhead marker defs, so the MDX lesson can
// `import { Defs, Fig1, … } from '...'`. Each is a verbatim copy of the source
// inline SVG (see the per-file headers). The source page's other figures are
// raster <img src="diagrams/…"> and stay inline as <img> in the MDX, so only the
// seven inline-SVG figures are extracted here. Kept in a sub-folder co-located
// with the lesson's figures, mirroring the bloom-0001 / ai-agents layout, so the
// bulk-extraction pattern mints one folder per lesson without polluting the
// shared components dir.
export { default as Defs } from './Defs.astro';
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
export { default as Fig6 } from './Fig6.astro';
export { default as Fig7 } from './Fig7.astro';
