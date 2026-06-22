// Barrel for the three bespoke rest-api/0010 SVG figures, so the MDX lesson can
// `import { Fig1, Fig2, Fig3 } from '...'`. Each is a verbatim copy of the source
// SVG (see the per-file headers): Fig1 (hero) = the async request–reply flow
// (202 + Location → a pollable status resource → 200 + result link), Fig2 = the
// job as a small state machine (queued → running → succeeded | failed), Fig3 =
// polling vs webhook callback, two shapes and their trade-offs. Kept in a
// per-lesson sub-folder co-located with the lesson's figures so the bulk-
// extraction script can mint one such folder per lesson without polluting the
// shared components dir.
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
