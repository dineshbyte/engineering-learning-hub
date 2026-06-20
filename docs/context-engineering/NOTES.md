# Notes — teaching preferences for Context Engineering

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background.
- Already owns the AI-agents stack: LLM, tools, agents, agent loop, runtime, memory, MCP, Claude
  Code architecture, Cursor architecture, AI system basics (see `../ai-agents-mastery`).
- Entry rung: **Senior → Staff.** Do NOT drag through Foundation hand-holding. Teach trade-offs,
  failure modes, and "name the tension, pick a side."

## How they want to be taught (stated explicitly, 2026-06-20)
- First principles, no buzzwords. Optimize for durable engineering mental models, not academic AI.
- Database / distributed-systems analogies first. "Context is the new database query" is the spine.
- Per-concept template every time: Simple · Deep · Engineering analogy · Misconceptions · Memory rule.
- VISUAL-FIRST infographics with a voice — hero diagram, SVG/ASCII, comparison tables, definition
  cards, interactive reveals. Prose only as captions (inherited from the global house style).
- Always include REAL USE CASES + INTERVIEW QUESTIONS (click-to-reveal) — doubles as retrieval.
- Goal is reconstruction from memory, not fluency.

## The learning goal (the north star for grading)
> Why does one AI system appear dramatically smarter than another even when both use the same LLM?
Every lesson should ladder back to this answer: same model, different context engineering.

## Module → lesson mapping (12 modules → 5 lessons) — ALL BUILT
- **Lesson 1** (BUILT, flagship): M1 What is context · M2 Context is the new database query.
- **Lesson 2** (BUILT): M3 Context selection · M4 Retrieval (search/semantic/hybrid/rerank).
- **Lesson 3** (BUILT): M5 Codebase context (Cursor vs Claude Code) · M6 Chunking · M7 RAG.
- **Lesson 4** (BUILT): M8 Memory vs retrieval · M9 Compression · M10 Failure modes.
- **Lesson 5** (BUILT, capstone): M11 Architecture reviews · M12 Production design + the 9 final
  deliverables folded into a `#toolkit` capstone section (cheat sheet, mental models, arch-review
  checklist, failure modes, interview Qs, VP Qs, 5-min + 30-min revision, what-to-learn-next).
- Lessons 2–5 authored 2026-06-20 via 4 parallel subagents cloning Lesson 1's locked house style.
  All 5 validated: UTF-8, unique IDs, balanced tags, 5 balanced quizzes each (varied answer keys),
  cross-links wired (prev/next + footer nav), accent `--track-context`.
- DONE 2026-06-20: standalone `reference/context-engineering-cheat-sheet.html` +
  `reference/context-architecture-review.html` (cloned the AI track's reference style, accent magenta);
  hub card now shows ★ Cheat sheet / ☑ Review sheet / 📖 EPUB pills; hub stats → 9 tracks / 37 lessons
  / 10 reference sheets; footer GitHub avatar added.
- DONE 2026-06-20: Kindle EPUB built (`context-engineering/context-engineering.epub`, copy in
  `_send_to_kindle/context-engineering-v1.epub`). 8 chapters + cover, 19 diagram PNGs rasterized,
  details/quizzes flattened. Verified: mimetype first+stored, all XML valid (xmllint), entities
  numericised, cover declared both ways, spine↔manifest consistent. Track is COMPLETE.
- EXPANDED 2026-06-20: added Lessons 6–9 (advanced gaps the original 12 modules omitted), built
  via 4 parallel agents cloning the locked style; all validated; cross-links + L5 un-capped; hub
  card → 9 lessons; stats → 9 tracks / 41 lessons / 10 reference sheets:
  - **L6** Retrieval Evaluation & Observability (recall@k/precision@k/MRR/nDCG · faithfulness/
    context-precision-recall (RAGAS) · golden sets, offline vs online, tracing).
  - **L7** Pre-retrieval & Advanced RAG (query rewriting/HyDE/multi-query/step-back/decomposition/
    routing · parent-doc/hierarchical/contextual/ColBERT/GraphRAG · agentic/Self-RAG/CRAG).
  - **L8** Embeddings, Indexing & Cost (embedding model/dims/metric · HNSW/IVF/PQ ANN · ingestion/
    freshness/invalidation · token cost & latency modeling).
  - **L9** Context Caching, Ordering & Security (KV/prompt caching stable-first · lost-in-the-middle
    ordering · indirect prompt injection · multi-tenant ACL-in-the-retrieval-query · PII/OWASP).
- EPUB rebuilt 2026-06-20: 12 chapters (9 lessons + 2 refs + glossary) + cover, 40 diagram PNGs;
  re-verified mimetype-first/stored, xmllint clean, entities numeric, spine↔manifest consistent,
  no stale/orphan images. Both copies 2.7 MB.
- CLOSED 2026-06-20: reference sheets + GLOSSARY now cover all 9 lessons — cheat sheet &
  architecture-review extended with eval/observability, pre-retrieval/advanced-RAG, embeddings/ANN/
  cost, and caching/ordering/security sections; GLOSSARY grouped L1–L9. EPUB rebuilt (2.8 MB,
  ch-10/11/12 regenerated, verified mimetype-first/stored, xmllint clean, entities numeric, new
  material confirmed in-package). Track + all revision artifacts are now COMPLETE and consistent.
- Future = retrieval/interleaving drills (see ZPD below); resume the Staff "name the failure mode"
  grill (Round 1 on the SAML-sync stale-doc scenario was posed, not yet answered).

## Delivery decisions made
- 2026-06-20: User chose **"one flagship lesson first"** — approve style on Lesson 1, THEN batch-build
  the rest to match. EPUB build is DEFERRED until the lesson set is approved (do not half-build it).
- New track accent token added: `--track-context` (#b5179e light / #e879cf dark, magenta).

## Future sessions / ZPD
- After style approval: build Lessons 2–5 + reference sheets, then the EPUB ritual + hub EPUB link.
- Convert reading → storage strength: interleaved drills mixing modules (e.g. "BM25 vs embeddings",
  "RAG vs long-context", "missing vs wrong context"), spaced a few days apart.
- A judgment drill: given a vendor pitch, name its context strategy + most likely failure mode.
- Only write learning-records on demonstrated recall, not coverage.
