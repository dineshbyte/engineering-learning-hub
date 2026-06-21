<!--
  Thanks for contributing to Engineering Vault! Keep PRs small and reviewable.
  Delete sections that don't apply.
-->

## What & why

<!-- One or two sentences: what this changes and the reason for it. -->

## Type of change

- [ ] Content — new lesson / track, or reworked existing content
- [ ] Content fix — typo, clarity, accuracy, or diagram fix
- [ ] Bug fix — broken link, layout, search, etc.
- [ ] Feature — site/tooling capability
- [ ] Chore / docs / CI

## Scope

<!-- Which track(s) and page(s)? e.g. docs/context-engineering/lessons/0003-... -->

## Checklist

<!-- Tick what applies. The first two are enforced by CI — run them locally first. -->

- [ ] `node scripts/check-broken-links.js` passes (no broken internal links)
- [ ] `node scripts/validate-content.js` passes (SEO tags, interview `data-level`s, JSON-LD, sitemap in sync)
- [ ] New/renamed pages are added to `docs/sitemap.xml`
- [ ] Each page has a unique `<title>` (· Engineering Vault), meta description, canonical, and Open Graph tags

### For content changes

- [ ] **Visual-first:** the concept is carried by diagrams/tables/cards; prose only labels them (passes the "skim with text too small to read" ship test)
- [ ] **Accurate & cited:** non-obvious claims cite high-trust sources (RFCs, specs, vendor/standards docs) — no claims from memory
- [ ] **Interview panel** present where expected, with valid `data-level` values (`core` / `senior` / `staff` / `design`)
- [ ] Quiz options are length-balanced; dark and light modes both legible

## Notes for the reviewer

<!-- Anything non-obvious, trade-offs taken, or follow-ups intentionally left out. -->
