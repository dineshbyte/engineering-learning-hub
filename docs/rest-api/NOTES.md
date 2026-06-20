# Teaching Notes

## Learner profile
- Experienced engineer; ships REST APIs regularly. Comfortable with verbs/status
  codes/CRUD mechanics. Gap is the senior **articulation** and trade-off reasoning.
- Goal is dual: pass senior/staff interviews AND master the material long-term.
- Works in/around distributed systems + MongoDB (workspace + tooling signal).

## How to teach this learner
- **Calibrate above 101.** Skip fundamentals unless anchoring a deeper point.
  Assume CRUD/verbs/status-code basics are known.
- **Retrieval practice is the default modality.** Every lesson ends in recall from
  memory, not re-reading. This serves both interview prep and storage strength.
- **Interview rehearsal.** Where useful, include an "answer this out loud like a
  senior would" prompt with a model answer to self-grade against.
- **Trade-offs over rules.** A senior answer names the trade-off and picks a side.
  Lessons should teach the "why" and the pragmatic reality, not just the ideal.
- **Language-agnostic.** Code is illustrative only; never framework-specific.

## Mechanics
- Quiz answers: keep all options the **same word/char count** — no formatting tells.
- Lessons: short, one tangible win, Tufte-style HTML, cite sources inline, link to
  reference docs + sibling lessons, end with "ask your teacher" reminder.
- Open each new lesson in the browser after writing it.

## Arc — ALL 11 LESSONS BUILT (2026-06-14), not yet attempted by user
All lessons + 5 reference cram-sheets + index.html created up front at user's
request ("create all stuffs first"). User intends to go through them in one pass.
No learning records beyond LR-0001 until the user demonstrates mastery (quiz cold,
rehearsal defended) — coverage ≠ learning.

1. ✅ built — What makes an API RESTful? (constraints + Richardson Maturity Model)
2. ✅ built — HTTP methods & status codes (safe/idempotent, PUT vs PATCH, 2xx/4xx/5xx)
3. ✅ built — Idempotency in practice (idempotency keys, retries, exactly-once)
4. ✅ built — Resource modeling & URI design (nouns, nesting, actions, opaque ids)
5. ✅ built — Versioning & evolution (additive-first, placement, deprecation)
6. ✅ built — Pagination at scale (offset vs cursor; consistency under writes)
7. ✅ built — Caching & conditional requests (ETags, Cache-Control, If-Match→412)
8. ✅ built — Auth & authZ (OAuth2/OIDC, JWT vs sessions, BOLA)
9. ✅ built — Errors + rate limiting + observability (RFC 9457, 429, RED metrics)
10. ✅ built — Async & long-running ops (202 + status resource, webhooks)
11. ✅ built — Capstone mock interview (11-step framework, worked example, 3 to attempt)

## Interview question banks (added 2026-06-14)
`interview/` holds one active-recall flashcard bank per lesson (same basenames as
lessons/). 452 Q&A total, each tagged Core/Senior/Staff with a senior model answer,
grouped by sub-theme. Format = question shown, "Reveal senior answer" toggles the
model answer (forces recall, not skim). User chose: flashcards + up to 50/lesson,
no padding (depth varies — REST foundations 21, auth/methods 49, etc.). Linked from
index.html. Counts: L1 21 · L2 49 · L3 38 · L4 44 · L5 40 · L6 37 · L7 42 · L8 49 ·
L9 48 · L10 38 · L11 46.

## Kindle EPUB (built 2026-06-14)
`rest-api-mastery.epub` (workspace root, ~180 KB) is the portable, offline,
all-in-one edition for Kindle. Source files live in `epub/` (mimetype, META-INF,
OEBPS with 28 XHTML chapters + style.css + nav.xhtml + toc.ncx + 12 SVG diagrams).
- Why EPUB not one HTML: Kindle runs no JS, so the web flashcards/quizzes/filters
  would be dead. EPUB reflows on e-ink; interactivity converted to static
  question→answer (answer below an ANSWER divider). Diagrams = grayscale SVG
  (e-ink has no color), referenced via <img>.
- Contents: front matter + 11 lessons (with quizzes→answer keys, rehearsals→model
  answers, embedded diagrams) + 11 banks (452 Q&A, static) + 5 reference sheets.
- Cover: `epub/cover.svg` (source, NOT zipped — lives in epub/ root) → rasterized
  `rsvg-convert -w 1600 -h 2560 cover.svg -o cover.png` then
  `magick cover.png -background "#141310" -flatten -quality 88 OEBPS/images/cover.jpg`.
  Wired via OPF `<meta name="cover" content="cover-img"/>` + manifest `properties="cover-image"`
  + `cover.xhtml` as first spine item. Kindle reads the OPF cover meta for the library thumbnail.
- Rebuild: re-rasterize the cover if cover.svg changed, validate every file with
  `xmllint --noout`, then from `epub/`:
  `zip -X -0 ../rest-api-mastery.epub mimetype` then `zip -X -9 -r ../rest-api-mastery.epub META-INF OEBPS`.
  mimetype MUST be the first, stored (uncompressed) entry. (Files in epub/ root like
  cover.svg/cover.png are intentionally excluded — only META-INF + OEBPS are zipped.)
- Caveat to watch: a few older Kindles rasterize SVG-via-img poorly; if a diagram
  doesn't render, rasterize the 12 SVGs to PNG and swap the <img src>/manifest media-type.
- epubcheck is NOT installed locally; validation was structural (xmllint + manifest/
  spine/image/link cross-checks), not a full epubcheck pass.

## Open follow-ups for the teacher
- Grade the user's rehearsal answers like an interviewer when pasted back.
- Offer to "grill" on any lesson with harder follow-ups.
- Spot-check: all quiz options were length-balanced by builders; re-verify if a
  lesson is revised. Lesson 11 has no MCQ (framework + 3 rehearsal prompts instead).
