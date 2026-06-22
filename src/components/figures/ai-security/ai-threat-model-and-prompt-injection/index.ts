// Barrel for the six bespoke ai-security/0001 SVG figures, so the MDX lesson can
// `import { Fig1, …, Fig6 } from '...'`. Each is a verbatim copy of the source
// SVG (see the per-file headers). Kept in a per-lesson sub-folder co-located with
// the lesson's figures, matching the bloom-0001 pattern, so the bulk-extraction
// script can mint one such folder per lesson without polluting the shared dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
export { default as Fig6 } from './Fig6.astro';
