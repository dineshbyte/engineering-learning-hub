// Barrel for the four bespoke exactly-once-kafka-deep-dive SVG figures, so the
// MDX lesson can `import { Fig1, Fig2, Fig3, Fig4 } from '...'`. Each is a
// verbatim copy of the corresponding source <figure>+<svg> (see the per-file
// headers). Only the INLINE-SVG figures are extracted here; the three PNG <img>
// figures stay as raw <img> in the MDX body, mirroring the source DOM.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
