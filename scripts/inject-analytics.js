#!/usr/bin/env node
/**
 * inject-analytics.js — add the shared GA4 include to every docs/ page.
 *
 * There is no shared <head> include in this static site, so the
 * `assets/analytics.js` <script> must live in each page. This walks docs/**.html
 * (excluding epub/ build sources), computes the correct relative path from the
 * page's depth, and inserts the include before </head>. Idempotent: a page that
 * already references assets/analytics.js is skipped. Generated glossary/resources
 * pages get the include from build-reference-pages.py instead.
 *
 *     node scripts/inject-analytics.js
 *
 * Zero dependencies (Node built-ins only).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'docs');
const MARK = 'assets/analytics.js';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'epub') walk(f, out); }
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

// number of directories between docs/ and the file → the ../ prefix to reach assets/
function relPrefix(file) {
  const segs = path.relative(ROOT, file).split(path.sep).length - 1;
  return '../'.repeat(segs);
}

let changed = 0, skipped = 0;
for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(MARK)) { skipped++; continue; }      // idempotent
  if (!/<\/head>/i.test(html)) { skipped++; continue; }  // no <head> → leave alone
  const tag = `<script src="${relPrefix(file)}${MARK}" defer></script>\n`;
  html = html.replace(/<\/head>/i, tag + '</head>');
  fs.writeFileSync(file, html);
  changed++;
}
console.log(`Analytics include: injected into ${changed} page(s), ${skipped} already had it / skipped.`);
