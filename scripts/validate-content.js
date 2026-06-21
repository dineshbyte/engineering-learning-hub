#!/usr/bin/env node
/**
 * Content validator for the Engineering Vault static site (docs/).
 *
 * Encodes the checks that used to be done by hand, as enforceable gates:
 *
 *   SEO         every indexable page has exactly one <title>, a canonical link,
 *               an og:url, a meta description, non-empty meta keywords, the shared
 *               analytics.js include, and meta robots + author.
 *   Interview   every interview panel uses only valid data-level values
 *               (core | senior | staff | design).
 *   JSON-LD     every <script type="application/ld+json"> block parses as JSON.
 *   Sitemap     every <loc> in sitemap.xml resolves to a real file, and every
 *               indexable lesson/reference/interview/hub page is listed.
 *
 * "Indexable" = docs/**.html, excluding epub/ build sources and README.html.
 *
 * Zero dependencies (Node built-ins only). Exit code 1 if any check fails.
 *
 *   node scripts/validate-content.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'docs');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const BASE_URL = 'https://dineshbyte.github.io/engineering-learning-hub/';
const VALID_LEVELS = new Set(['core', 'senior', 'staff', 'design']);

const errors = [];
const fail = (page, msg) => errors.push(`docs/${path.relative(ROOT, page)}: ${msg}`);

function walk(dir, test, out = []) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, test, out);
        else if (test(entry.name)) out.push(full);
    }
    return out;
}

/** Pages that must be SEO-complete and present in the sitemap. */
function isIndexable(file) {
    const rel = path.relative(ROOT, file);
    if (!rel.endsWith('.html')) return false;
    if (rel.split(path.sep).includes('epub')) return false;     // EPUB build sources
    if (path.basename(rel).toLowerCase() === 'readme.html') return false;
    return true;
}

function checkSeo(page, html) {
    const titles = html.match(/<title>([\s\S]*?)<\/title>/gi) || [];
    if (titles.length === 0) fail(page, 'missing <title>');
    else if (titles.length > 1) fail(page, `${titles.length} <title> tags (expected 1)`);
    else if (!titles[0].replace(/<\/?title>/gi, '').trim()) fail(page, 'empty <title>');

    if (!/<link[^>]+rel=["']canonical["']/i.test(html)) fail(page, 'missing <link rel="canonical">');
    if (!/<meta[^>]+property=["']og:url["']/i.test(html)) fail(page, 'missing og:url meta');
    if (!/<meta[^>]+name=["']description["']/i.test(html)) fail(page, 'missing meta description');

    const kw = html.match(/<meta[^>]+name=["']keywords["'][^>]*content=["']([^"']*)["']/i);
    if (!kw) fail(page, 'missing meta keywords (page tags)');
    else if (kw[1].trim().length < 5) fail(page, 'empty/thin meta keywords');

    // every page must load the shared GA4 module (run scripts/inject-analytics.js)
    if (!/<script[^>]+src=["'][^"']*assets\/analytics\.js["']/i.test(html)) {
        fail(page, 'missing analytics.js include (run scripts/inject-analytics.js)');
    }

    // codified head bar: every indexable page carries robots + author
    if (!/<meta[^>]+name=["']robots["']/i.test(html)) fail(page, 'missing meta robots');
    if (!/<meta[^>]+name=["']author["']/i.test(html)) fail(page, 'missing meta author');
}

function checkInterviewLevels(page, html) {
    const re = /data-level\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
        const lvl = (m[1] !== undefined ? m[1] : m[2]).trim();
        if (!VALID_LEVELS.has(lvl)) fail(page, `invalid data-level "${lvl}" (expected core|senior|staff|design)`);
    }
}

function checkJsonLd(page, html) {
    const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let m, i = 0;
    while ((m = re.exec(html)) !== null) {
        i++;
        try { JSON.parse(m[1].trim()); }
        catch (e) { fail(page, `JSON-LD block #${i} is invalid JSON (${e.message})`); }
    }
}

function checkSitemap(indexablePages) {
    if (!fs.existsSync(SITEMAP)) { errors.push('docs/sitemap.xml: missing'); return; }
    const xml = fs.readFileSync(SITEMAP, 'utf8');
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);

    // 1) every sitemap URL resolves to a real file
    const listed = new Set();
    for (const loc of locs) {
        if (!loc.startsWith(BASE_URL)) { errors.push(`sitemap.xml: <loc> outside base URL: ${loc}`); continue; }
        let rel = loc.slice(BASE_URL.length);
        if (rel === '' || rel.endsWith('/')) rel += 'index.html';
        const file = path.join(ROOT, rel);
        listed.add(path.resolve(file));
        try {
            if (!fs.statSync(file).isFile()) errors.push(`sitemap.xml: stale entry (no such file): ${loc}`);
        } catch (e) { errors.push(`sitemap.xml: stale entry (no such file): ${loc}`); }
    }

    // 2) every indexable lesson/reference/interview/hub page is listed
    for (const page of indexablePages) {
        const rel = path.relative(ROOT, page);
        const inContentDir = /(^|\/)(lessons|reference|interview)\//.test(rel.split(path.sep).join('/'));
        const isHub = rel === 'index.html';
        if ((inContentDir || isHub) && !listed.has(path.resolve(page))) {
            errors.push(`sitemap.xml: missing entry for docs/${rel}`);
        }
    }
}

/** A teaching/lesson page: /lessons/* OR a track's *-fundamentals / *-deep-dive
 *  page (NOT reference/interview/glossary/resources). Every card links one of
 *  these as its "lesson". */
function isLessonPage(rel) {
    const p = rel.split(path.sep).join('/');
    if (/(^|\/)(reference|interview)\//.test(p)) return false;
    if (/\/lessons\//.test(p)) return true;
    return /-fundamentals\.html$|-deep-dive\.html$/.test(p);
}

/** Lesson-page structural integrity — guards the two breakages we hit:
 *   (1) the feedback widget / closing endnote must be present on every lesson;
 *   (2) the <main> landmark must enclose the WHOLE lesson — nothing of substance
 *       may follow </main> (a too-early </main> stranded content + broke layout). */
function checkLessonStructure(page, html, rel) {
    if (!isLessonPage(rel)) return;
    if (!/class=["']lesson-fb["']/.test(html)) fail(page, 'lesson missing feedback widget (run scripts/inject-lesson-feedback.py)');
    if (!/class=["']lesson-endnote["']/.test(html)) fail(page, 'lesson missing closing endnote (run scripts/inject-lesson-endnote.py)');
    const opens = (html.match(/<main[\s>]/gi) || []).length;
    const closes = (html.match(/<\/main>/gi) || []).length;
    if (opens !== 1 || closes !== 1) { fail(page, `lesson needs exactly one <main>…</main> (found ${opens} open / ${closes} close)`); return; }
    const after = html.slice(html.lastIndexOf('</main>') + '</main>'.length)
        .replace(/<\/div>|<\/body>|<\/html>|<!--[\s\S]*?-->|<script[\s\S]*?<\/script>|\s+/gi, '');
    if (after) fail(page, `content stranded after </main> (landmark closed too early): "${after.slice(0, 60)}"`);
}

function main() {
    if (!fs.existsSync(ROOT)) { console.error(`✗ docs/ not found at ${ROOT}`); process.exit(1); }

    const allHtml = walk(ROOT, (n) => n.endsWith('.html'));
    const indexable = allHtml.filter(isIndexable);

    for (const page of indexable) {
        const html = fs.readFileSync(page, 'utf8');
        checkSeo(page, html);
        checkInterviewLevels(page, html);
        checkJsonLd(page, html);
        checkLessonStructure(page, html, path.relative(ROOT, page));
    }
    checkSitemap(indexable);

    console.log(`Validated ${indexable.length} indexable pages (of ${allHtml.length} .html files).`);
    if (errors.length) {
        console.error(`\n✗ ${errors.length} problem(s):\n`);
        for (const e of errors) console.error(`  ${e}`);
        process.exit(1);
    }
    console.log('✓ All content checks passed.');
}

main();
