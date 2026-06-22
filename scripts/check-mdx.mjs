#!/usr/bin/env node
/**
 * Batch MDX syntax validator for the lessons collection.
 *
 * `astro build` compiles MDX but stops at the FIRST parse error, which turns
 * fixing a freshly-bulk-converted set into slow one-error-per-build whack-a-mole.
 * This compiles EVERY src/content/lessons/**.mdx independently and reports ALL
 * failures in one run (file + line:col + reason), so a sweep fix can clear them
 * together.
 *
 * It validates SYNTAX only (it does not resolve component imports or evaluate
 * the `frontmatter` global — both are syntactically valid and compile fine), so
 * it catches exactly the class we keep hitting: unterminated regex / bad MDX
 * comments / stray `{` / `<` parsed as JSX.
 *
 * Run from astro-poc/:
 *     pnpm add -D @mdx-js/mdx
 *     node scripts/check-mdx.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

let compile;
try {
    ({ compile } = await import('@mdx-js/mdx'));
} catch {
    console.error('✗ @mdx-js/mdx not installed. Run:  pnpm add -D @mdx-js/mdx');
    process.exit(2);
}

const rootPath = fileURLToPath(new URL('../src/content/lessons/', import.meta.url));

function walk(dir, out = []) {
    for (const entry of readdirSync(dir)) {
        const p = join(dir, entry);
        if (statSync(p).isDirectory()) walk(p, out);
        else if (p.endsWith('.mdx')) out.push(p);
    }
    return out;
}

const files = walk(rootPath).sort();
let fails = 0;

for (const file of files) {
    // Blank out the YAML frontmatter but KEEP its newlines so reported line
    // numbers still match the real file. (MDX itself would choke on raw `---`.)
    const src = readFileSync(file, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, (m) =>
        m.replace(/[^\n]/g, ''),
    );
    try {
        await compile(src, { development: false });
    } catch (e) {
        fails++;
        const loc = e.line ? ` ${e.line}:${e.column}` : '';
        console.error(`✗ ${file.replace(rootPath, '')}${loc}\n    ${e.reason || e.message}\n`);
    }
}

console.log(`${files.length - fails}/${files.length} lesson .mdx parsed OK.`);
process.exit(fails ? 1 : 0);
