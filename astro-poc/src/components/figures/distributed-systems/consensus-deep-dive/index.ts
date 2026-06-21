// Barrel for the seven bespoke consensus-deep-dive SVG figures, so the MDX lesson
// can `import { Fig1, … Fig7 } from '...'`. Each is a verbatim copy of the source
// inline SVG (see the per-file headers). The other three source figures are raster
// <img src="diagrams/…"> and stay inline as <img> in the MDX, so only the seven
// inline-SVG figures are extracted here. Kept in a sub-folder co-located with the
// lesson's figures, mirroring the bloom-0001 / consistent-hashing-deep-dive
// layout, so the bulk-extraction script mints one folder per lesson.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
export { default as Fig6 } from './Fig6.astro';
export { default as Fig7 } from './Fig7.astro';
