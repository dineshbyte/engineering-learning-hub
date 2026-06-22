// Barrel for the two bespoke applied-systems-design-fundamentals SVG figures, so
// the MDX lesson can `import { Fig1, Fig2 } from '...'`. Each is a verbatim copy
// of the source inline SVG (see the per-file headers). The other seven source
// figures are raster <img src="diagrams/…"> and stay inline as <img> in the MDX,
// so only the two inline-SVG figures are extracted here. Kept in a sub-folder
// co-located with the lesson's figures, mirroring the bloom-0001 / advanced-ai
// layout, so the bulk-extraction script mints one folder per lesson.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
