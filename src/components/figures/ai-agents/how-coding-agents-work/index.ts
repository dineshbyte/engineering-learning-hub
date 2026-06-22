// Barrel for the four bespoke ai-agents/0003 SVG figures, so the MDX lesson can
// `import { Fig1, Fig2, Fig3, Fig4 } from '...'`. Each is a verbatim copy of the
// source SVG (see the per-file headers). Kept in a per-lesson sub-folder so the
// bulk-extraction script can mint one such folder per lesson without polluting
// the shared components dir.
//   Fig1 — M4 "How Claude Code Actually Works" architecture
//   Fig2 — M5 "How Cursor Actually Works" two-phase diagram
//   Fig3 — M6 "MCP chain" (business function → … → Agent LLM)
//   Fig4 — M6 "Three MCP primitives" (Tools / Resources / Prompts)
export { default as Fig1 } from './Fig1.astro';
export { default as Fig2 } from './Fig2.astro';
export { default as Fig3 } from './Fig3.astro';
export { default as Fig4 } from './Fig4.astro';
