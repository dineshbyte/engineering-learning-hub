# Astro migration — proof of concept

A **non-destructive** proof that an Astro build step makes incremental page
addition easy and ends the "fix one page, break all the others" problem. It
lives entirely in `astro-poc/` and **builds to `../dist`, never `docs/`** — your
live site is untouched.

## What it proves

The single bloom-filters lesson (`0001`) is rebuilt in Astro with **all of its
duplicated chrome removed**. The page file now contains only:

- a small, **schema-validated** `meta` object (title, description, keywords,
  chips, prev/next, OG image, …), and
- the bespoke lesson **body** (the SVGs, quiz, interview Q&A) — verbatim.

Everything else — the entire `<head>`, the theme scripts, the analytics include,
the hubbar, the masthead, the topic chips, the "Was this helpful?" widget, and
the closing endnote — comes from **two shared files**:

| File | Owns |
|------|------|
| `astro-poc/src/layouts/BaseLayout.astro` | the whole `<head>` + HTML skeleton + analytics |
| `astro-poc/src/layouts/LessonLayout.astro` | hubbar, masthead, chips, feedback widget, endnote, quiz JS |
| `astro-poc/src/schema/lesson.ts` | the lesson "contract" — bad/missing metadata is a **build error** |

Change the masthead once in `LessonLayout.astro` → every lesson updates. That is
the whole fix. These layouts replace what `inject-a11y.py`,
`inject-lesson-feedback.py`, `inject-lesson-endnote.py`, and `inject-analytics.js`
do today by hand-patching every file.

## Run it (this is the step I can't run for you — the package manager is blocked in my sandbox)

Uses **pnpm**:

```sh
cd astro-poc
pnpm install
pnpm build           # → writes ../dist/bloom-filters/lessons/0001-what-is-a-bloom-filter.html
pnpm preview         # serves with the /engineering-learning-hub base path
pnpm format          # Prettier, 4-space indent (matches .editorconfig)
```

Then open:
`http://localhost:4321/engineering-learning-hub/bloom-filters/lessons/0001-what-is-a-bloom-filter.html`

It should be **visually identical** to the live page. Compare the built HTML's
`<head>` against the current page — same title, canonical, OG/Twitter tags,
JSON-LD, and `.html` URL (preserved via `build.format: 'file'`).

> If the build errors, paste me the output — the layouts are where any first-build
> bug will be, and they're quick to fix.

## Deploy model is unchanged

GitHub Pages still serves `main → /docs`. For the real migration you flip
`outDir` in `astro.config.mjs` from `../dist` to `../docs`, and add
`public/.nojekyll` (already here) so Pages doesn't strip Astro's `_astro/` asset
folder. Same URL, same hosting, one `astro build` before each commit.

## What's next (only if you like this)

1. **Replicate** to bloom-filters `0002`–`0004` (mechanical) → prev/next + the
   full track render.
2. **Interview-as-data**: lift the Q&A into a typed array so the visible
   `<details>` **and** the FAQ JSON-LD are generated from one source — this is
   the "add an interview question and it renders perfectly, and the structured
   data can't drift" win. (Today they're hand-duplicated; see the JSON-LD note in
   `0001-what-is-a-bloom-filter.astro`.)
3. Generated `sitemap.xml` + `search-index.js` from the page set instead of
   hand-maintaining them.

## Notes

- `astro-poc/public/assets/` holds a **copy** of the few assets this one lesson
  needs (CSS/JS/favicon/OG). The real migration points at a single canonical
  assets dir; the copy just keeps this POC self-contained.
- `dist/`, `node_modules/`, and `.astro/` are gitignored.
