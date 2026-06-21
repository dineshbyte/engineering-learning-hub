#!/usr/bin/env node
/**
 * wire-og-cards.js — point each page's og:image / twitter:image at its track's
 * social card (docs/assets/og/<track>.png), and add og:image:width/height so
 * LinkedIn / Slack / Discord render the preview reliably.
 *
 * A page's track is its top-level docs/ folder. Pages not under a track folder
 * (homepage, privacy) keep the global docs/assets/og-cover.png. Generated
 * glossary/resources pages already carry the right card from
 * build-reference-pages.py; this only retargets values that differ, so it is
 * idempotent — safe to re-run after adding pages.
 *
 *     node scripts/wire-og-cards.js
 *
 * Zero dependencies (Node built-ins only).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'docs');
const BASE = 'https://dineshbyte.github.io/engineering-learning-hub';
const OGDIR = path.join(ROOT, 'assets', 'og');
const SLUGS = new Set([
  'ai-agents', 'context-engineering', 'ai-evaluation', 'production-ai-architecture',
  'ai-security', 'ai-infrastructure', 'domain-agent-design', 'advanced-ai-systems',
  'rest-api', 'bloom-filters', 'distributed-systems', 'storage-engines',
  'transactions-isolation', 'streaming-event-driven', 'applied-systems-design',
]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'epub') walk(f, out); }
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

let scanned = 0, updated = 0;
for (const f of walk(ROOT)) {
  scanned++;
  const seg = path.relative(ROOT, f).split(path.sep)[0];
  const slug = SLUGS.has(seg) && fs.existsSync(path.join(OGDIR, seg + '.png')) ? seg : null;
  const abs = slug ? `${BASE}/assets/og/${slug}.png` : `${BASE}/assets/og-cover.png`;

  let html = fs.readFileSync(f, 'utf8');
  const orig = html;
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/i, `$1${abs}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/i, `$1${abs}$2`);
  if (!/og:image:width/i.test(html)) {
    html = html.replace(
      /(<meta property="og:image" content="[^"]*"\s*\/?>)/i,
      '$1\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">');
  }
  if (html !== orig) { fs.writeFileSync(f, html); updated++; }
}
console.log(`wire-og-cards: scanned ${scanned} pages, updated ${updated}.`);
