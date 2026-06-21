// Barrel for the nine bespoke storage-engines-fundamentals SVG figures, so the
// MDX lesson can `import { Fig1, …, Fig9 } from '...'`. Each is a verbatim copy
// of the source inline <svg> figure (see the per-file headers). Kept in a
// sub-folder co-located with the lesson's figures, one such folder per lesson.
//
// The nine <img src="diagrams/NN-*.png"> figures in the source are NOT extracted
// here — they're raster diagrams, not inline SVG, so they stay as plain <img>
// in the MDX body exactly as they appear in the source page.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
export { default as Fig6 } from './Fig6.astro';
export { default as Fig7 } from './Fig7.astro';
export { default as Fig8 } from './Fig8.astro';
export { default as Fig9 } from './Fig9.astro';
