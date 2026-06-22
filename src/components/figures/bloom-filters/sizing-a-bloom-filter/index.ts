// Barrel for the two bespoke 0002-sizing-a-bloom-filter SVG figures, so the MDX
// lesson can `import { Fig1, Fig2 } from '...'`. Each is a verbatim copy of the
// source SVG (see the per-file headers). Kept in a sub-folder co-located with the
// lesson's figures so the bulk-extraction script can mint one such folder per
// lesson without polluting the shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
