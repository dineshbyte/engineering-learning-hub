# Teaching Notes — Bloom Filters

## Learner profile
- Experienced backend/systems engineer; knows the term "Bloom filter" and the one-liner.
- Gap is senior **articulation**: the asymmetry, the sizing math, failure modes, and
  knowing when not to use one. Entry rung: **Foundation** (per bootstrap, 2026-06-19).
- Dual goal: pass senior/staff systems-design interviews AND retain long-term.

## How to teach this learner
- **Calibrate above 101.** Assume hashing/arrays known; lead with the *why*.
- **Infographic-first.** The bit-array diagram carries the idea; prose is caption only.
  Apply the ship test: followable from the visuals alone.
- **Retrieval practice is the default.** Every lesson ends in recall from memory.
- **Interview rehearsal.** Include an "answer out loud like a senior" prompt + model answer.
- **Trade-offs over rules.** Name the asymmetry and the cost it buys; pick a side.
- **Never trust parametric memory on the math** — the FP formula and optimal-k are cited.

## The ladder (this track)
1. **Foundation** — what it is, the asymmetry, the three operations. ← lesson 0001
2. **Core** — sizing: m, k, the FP formula; choosing parameters for a target rate.
3. **Senior** — failure modes (fill-up, bad hashes, no deletes) and the real LSM-tree use.
4. **Staff** — variants & scale (counting / cuckoo / scalable Bloom), distributed dedup.

## Arc
- ✅ built 2026-06-19 — 0001 · What a Bloom filter *is* (Foundation). Created during the
  `/coach` bootstrap dry run. Not yet attempted by the user.
- ✅ built 2026-06-19 — 0002 · Sizing a Bloom filter (Core). Authored to the raised visual bar
  (60–70% visual: 2 SVG diagrams + stepper + cards + tables, ~550 chars narrative prose).
  k=log₂(1/p); m=−(n·ln p)/(ln2)²; ~10 bits/item≈1%. Not yet attempted by the user.
- ✅ built 2026-06-19 — 0003 · Failure modes & the LSM-tree read path (Senior). Built in parallel
  by a subagent to the visual bar. Saturation (FPR rises with load), LSM per-SSTable read skip,
  weak/correlated hashes, no-delete staleness → rebuild. Not yet attempted.
- ✅ built 2026-06-19 — 0004 · Variants at scale (Staff). Built in parallel by a subagent.
  Counting / scalable / cuckoo variant matrix + distributed dedup (cheap negative filter in front
  of an authoritative store). Not yet attempted.

Full Foundation→Staff ladder now complete (4 lessons). 0001 retrofitted to the visual bar after
the "too much text" feedback. Track built partly via parallel subagents (3 lessons at once).

No learning records until the user demonstrates mastery cold (quiz from memory / rehearsal
defended). Coverage ≠ learning.

## Kindle EPUB
`epub/` holds the source (mimetype, META-INF, OEBPS). Build from `epub/`:
`zip -X0 ../../_send_to_kindle/bloom-filters-v1.epub mimetype` then
`zip -rX9 … META-INF OEBPS`. mimetype MUST be first + stored. Cover declared both ways
(`<meta name="cover">` + `properties="cover-image"` + cover.xhtml first in spine).
Track section color: teal `#136f63` (used for cover + diagrams).

## Open follow-ups for the teacher
- Grade rehearsal answers like an interviewer when pasted back.
- Next session: spaced recall of 0001's asymmetry before starting 0002 (Core sizing).
