#!/usr/bin/env node
/**
 * YAML frontmatter validator for the lessons collection.
 *
 * check-mdx.mjs blanks the frontmatter before compiling, so YAML errors (e.g. an
 * apostrophe inside a single-quoted scalar, a bad fold indent) slip past it yet
 * fail `astro build` (Astro parses frontmatter with js-yaml, one error at a time).
 * This parses EVERY lesson's frontmatter with the same js-yaml and reports all
 * failures at once.
 *
 * js-yaml is a transitive dep; if it isn't directly importable under pnpm we
 * locate it in the virtual store. Run:  node scripts/check-frontmatter.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

let mod;
try {
    mod = await import('js-yaml');
} catch {
    const pnpm = fileURLToPath(new URL('../node_modules/.pnpm/', import.meta.url));
    const dir = readdirSync(pnpm).find((d) => /^js-yaml@/.test(d));
    if (!dir) {
        console.error('✗ js-yaml not found. Run: pnpm add -D js-yaml');
        process.exit(2);
    }
    mod = await import('file://' + join(pnpm, dir, 'node_modules/js-yaml/dist/js-yaml.mjs'));
}
const load = mod.load ?? mod.default?.load;
if (!load) {
    console.error('✗ could not obtain js-yaml load()');
    process.exit(2);
}

const root = fileURLToPath(new URL('../src/content/lessons/', import.meta.url));
function walk(d, out = []) {
    for (const e of readdirSync(d)) {
        const p = join(d, e);
        if (statSync(p).isDirectory()) walk(p, out);
        else if (p.endsWith('.mdx')) out.push(p);
    }
    return out;
}

const files = walk(root).sort();
let fails = 0;
for (const f of files) {
    const txt = readFileSync(f, 'utf8');
    const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) {
        fails++;
        console.error(`✗ ${f.replace(root, '')}\n    no frontmatter block found\n`);
        continue;
    }
    try {
        load(m[1]);
    } catch (e) {
        fails++;
        // js-yaml mark.line is 0-based within the frontmatter body (which starts
        // at file line 2, after the opening ---) → file line ≈ mark.line + 2.
        const where = e.mark ? ` (file line ~${e.mark.line + 2})` : '';
        console.error(`✗ ${f.replace(root, '')}${where}\n    ${e.reason || e.message}\n`);
    }
}
console.log(`${files.length - fails}/${files.length} lesson frontmatter parsed OK.`);
process.exit(fails ? 1 : 0);
