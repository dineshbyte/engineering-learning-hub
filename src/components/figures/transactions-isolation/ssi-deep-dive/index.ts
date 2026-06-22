// Barrel for the three bespoke ssi-deep-dive inline-SVG figures, so the MDX
// lesson can `import { Fig1, Fig2, Fig3 } from '...'`. Each is a verbatim copy of
// the source page's inline <svg> figure (hero banner, §1 write-skew timeline, §3
// dangerous-structure graph — see the per-file headers). The §1–§5 <img>
// diagrams (diagrams/ssi-0N-*.png) stay inline in the MDX as plain <figure><img>
// and are NOT components. Kept in a sub-folder co-located with the lesson's
// figures, mirroring the bloom-0001 pattern.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
