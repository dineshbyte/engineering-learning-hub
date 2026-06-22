// Barrel for the six bespoke transactions-isolation-fundamentals inline-SVG
// figures, so the MDX lesson can `import { Fig1, … } from '...'`. Each is a
// verbatim copy of the source page's inline <svg> figure (see the per-file
// headers); the page's other figures are <img src="diagrams/…"> raster diagrams,
// kept inline in the MDX. Co-located in a per-lesson sub-folder so the bulk
// extraction stays one folder per lesson.
//
//   Fig1 — HERO isolation ladder (refs #arw, #arwA)
//   Fig2 — Level 1 · the four ACID promises
//   Fig3 — Level 2 · the five named anomalies (+ P0)
//   Fig4 — Level 4 · snapshot scope: RC per-statement vs SI per-transaction
//   Fig5 — Level 7 · the 2PC in-doubt trap (refs #arwA)
//   Fig6 — Level 9 · the shape-of-write decision tree (refs #arw)
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
export { default as Fig6 } from './Fig6.astro';
