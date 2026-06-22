// Barrel for the four bespoke mvcc-internals-deep-dive inline-SVG figures, so the
// MDX lesson can `import { Fig1, Fig2, Fig3, Fig4 } from '...'`. Each is a verbatim
// copy of the source SVG (see the per-file headers): Fig1 the hero version chain,
// Fig2 the snapshot + visibility gates, Fig3 the XID-wraparound circle, Fig4 the
// loose-ends 3-panel. The two PNG-`<img>` figures (dd-01 storage, dd-02 visibility,
// dd-03 vacuum-bloat) stay inline as <figure><img> in the MDX body — only the inline
// SVG figures become components. Kept in a sub-folder co-located with the lesson's
// figures so the bulk-extraction script mints one such folder per lesson.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
