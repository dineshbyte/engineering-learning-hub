#!/usr/bin/env node
/**
 * Broken-link checker for the Engineering Vault static site (docs/).
 *
 * Walks every .html page under docs/, extracts internal href/src targets, and
 * verifies each one resolves to a real file — mirroring how GitHub Pages serves
 * the folder (exact file, then `<path>.html`, then `<path>/index.html`).
 *
 * Catches the exact failure mode that folder moves and slug renames introduce:
 * a relative link that no longer points at anything.
 *
 * External links (http/https/protocol-relative/mailto/tel/data) and pure
 * in-page anchors (#…) are skipped — this checks the file graph, not the web.
 *
 * Zero dependencies (Node built-ins only). Exit code 1 if any link is broken.
 *
 *   node scripts/check-broken-links.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'docs');
const BASE_PREFIX = '/engineering-learning-hub'; // GitHub Pages base — maps to ROOT
const ATTR_RE = /(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
const SKIP_RE = /^(?:https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i;

/** Recursively collect files under `dir` whose name matches `test`. */
function walk(dir, test, out = []) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, test, out);
        else if (test(entry.name)) out.push(full);
    }
    return out;
}

/** True if a link target resolves to a real file, GitHub-Pages style. */
function targetExists(fileDir, rawLink) {
    let link = rawLink.split('#')[0].split('?')[0];
    if (!link) return true;                         // was a pure #anchor / query
    try { link = decodeURIComponent(link); } catch (e) { /* use as-is */ }

    // Root-relative links starting with the GitHub Pages base prefix are
    // resolved against docs/ (the site root), not the filesystem root.
    if (link === BASE_PREFIX || link.startsWith(BASE_PREFIX + '/')) {
        link = link.slice(BASE_PREFIX.length) || '/';
    }
    // Any remaining root-relative path (starts with '/') resolves from ROOT.
    const base = link.startsWith('/')
        ? path.join(ROOT, link)
        : path.resolve(fileDir, link);
    const candidates = link.endsWith('/')
        ? [path.join(base, 'index.html')]
        : [base, base + '.html', path.join(base, 'index.html')];

    return candidates.some((c) => {
        try { return fs.statSync(c).isFile(); } catch (e) { return false; }
    });
}

function main() {
    if (!fs.existsSync(ROOT)) {
        console.error(`✗ docs/ not found at ${ROOT}`);
        process.exit(1);
    }

    const pages = walk(ROOT, (n) => n.endsWith('.html'));
    const broken = [];
    let linkCount = 0;

    for (const page of pages) {
        // Strip script/style/comments so we don't scan JS-built strings (e.g.
        // a search script that assembles href="'+d.u+'") as if they were links.
        const html = fs.readFileSync(page, 'utf8')
            .replace(/<script\b[\s\S]*?<\/script>/gi, '')
            .replace(/<style\b[\s\S]*?<\/style>/gi, '')
            .replace(/<!--[\s\S]*?-->/g, '');
        const dir = path.dirname(page);
        let m;
        ATTR_RE.lastIndex = 0;
        while ((m = ATTR_RE.exec(html)) !== null) {
            const link = m[1] !== undefined ? m[1] : m[2];
            if (!link || SKIP_RE.test(link)) continue;
            linkCount++;
            if (!targetExists(dir, link)) {
                broken.push({page: path.relative(ROOT, page), link});
            }
        }
    }

    console.log(`Checked ${linkCount} internal links across ${pages.length} pages.`);
    if (broken.length) {
        console.error(`\n✗ ${broken.length} broken link(s):\n`);
        for (const b of broken) console.error(`  docs/${b.page}  →  ${b.link}`);
        process.exit(1);
    }
    console.log('✓ No broken internal links.');
}

main();
