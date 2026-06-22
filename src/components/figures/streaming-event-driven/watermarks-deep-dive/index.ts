// Barrel for the five bespoke watermarks-deep-dive SVG figures, so the MDX lesson
// can `import { Fig1, … Fig5 } from '...'`. Each is a verbatim copy of the source
// inline SVG (see the per-file headers). The other three source figures are raster
// <img src="diagrams/…"> and stay inline as <img> in the MDX, so only the five
// inline-SVG figures are extracted here. Kept in a sub-folder co-located with the
// lesson's figures, mirroring the bloom-0001 / consensus-deep-dive layout, so the
// bulk-extraction script mints one folder per lesson.
//
// Figure → source location:
//   Fig1 — HERO "two clocks & the skew" banner
//   Fig2 — Level 1: what a watermark asserts
//   Fig3 — Level 3: the min rule & the idle-partition stall
//   Fig4 — Level 4: where / when / how — three independent questions
//   Fig5 — Level 5: a window's lifetime + the three-dial trade-off triangle
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
