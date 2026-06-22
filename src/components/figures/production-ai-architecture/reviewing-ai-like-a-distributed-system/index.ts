// Barrel for the bespoke production-ai-architecture/0001 SVG figures + the shared
// arrowhead marker defs, so the MDX lesson can
// `import { Defs, Fig1, Fig2, Fig3, Fig4, Fig5 } from '...'`. Each is a verbatim
// copy of the source SVG (see the per-file headers). Kept in a sub-folder
// co-located with the lesson's figures so the bulk-extraction pattern mints one
// such folder per lesson without polluting the shared components dir.
export { default as Defs } from './Defs.astro';
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
export { default as Fig5 } from './Fig5.astro';
