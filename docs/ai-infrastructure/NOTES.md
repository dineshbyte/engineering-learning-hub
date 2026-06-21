# Notes — teaching preferences for AI Infrastructure

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background.
- Has completed the AI-agents stack (LLM, tools, agents, agent loop, runtime, memory, MCP) and the
  context-engineering track (selection, retrieval, RAG, chunking, embeddings-from-the-context-angle,
  ANN basics, caching/ordering/security). See `../ai-agents` and `../context-engineering`.
- Entry rung: **Senior → Staff/Principal.** No Foundation hand-holding. Teach the build/buy/run
  decision, the cost model, the failure mode, and "name the tension, pick a side."

## How they want to be taught
- First principles, no buzzwords. Durable engineering mental models over vendor feature tours.
- Distributed-systems / database analogies first: indexes, query planners, API gateways, OS paging,
  caches, replication/sharding. "AI infra is a data-and-serving system, not magic" is the spine.
- Per-concept template every time: Simple · Deep · Engineering analogy · Misconceptions · Memory rule.
- VISUAL-FIRST infographics with a voice — hero stack diagram, SVG/ASCII, comparison tables,
  definition cards, interactive reveals. Prose only as captions (global house style).
- Always include REAL USE CASES + INTERVIEW QUESTIONS (click-to-reveal) — doubles as retrieval.
- Goal is reconstruction from memory, not fluency.

## The learning goal (the north star for grading)
> When an AI feature is slow, expensive, or unreliable in production, which box in the stack is the
> cause — and what is the cheapest fix that still holds at 100× scale?
Every lesson should ladder back to this: locate the bottleneck, name the trade-off, pick the fix.

## Teaching rules
- **Dependency order.** Build the stack bottom-up: you cannot serve retrieval before you have an
  index; you cannot reason about the gateway before you understand the inference server. Do not
  forward-reference a concept before its lesson.
- **Infographic-first.** Lead each lesson with the diagram that locates the concept in the stack,
  then explain. Tables for every "A vs B" decision (pgvector vs dedicated, HNSW vs IVF, self-host
  vs API, cross-encoder vs bi-encoder).
- **Real use cases + interview questions every lesson** — a concrete scenario (support bot, code
  search, internal RAG) plus click-to-reveal interview + VP-level questions.
- Cross-link to `../context-engineering` 0008 wherever embeddings/ANN/cost overlap; this track owns
  the infra/ops depth, that track owns the context framing.

## Lesson arc (this track)
- **0001 — Infra stack map** *(THIS, flagship — DONE)*: the full ingest → embed → index → retrieve →
  rerank → gateway → inference → cache diagram; what each box owns; where latency, cost, and failure
  live; the build/buy/run lens that frames the rest of the track.
- **0002 — Embeddings & vector databases** *(planned)*: bi-encoders, dims/metrics, pgvector vs
  dedicated vs hosted; CRUD/freshness; metadata filtering as an access-control hook. Cross-link
  `../context-engineering` 0008.
- **0003 — Retrieval systems & rerankers** *(planned)*: hybrid (lexical + vector) retrieval, ANN
  index tuning (HNSW `M`/`ef`, IVF `nprobe`), reranking with cross-encoders, ColBERT late
  interaction; the recall ↔ latency ↔ cost path end to end.
- **0004 — Model gateways & inference** *(planned)*: the gateway pattern (routing, fallback, rate
  limits, cost accounting); inference servers (vLLM, PagedAttention, continuous batching);
  quantization; self-host vs hosted API decision.
- **0005 — Caching & prompt stores** *(planned)*: KV/prefix caching, retrieval/result caching,
  semantic caching and its hazards; the prompt store as deployable, versioned config.
- **0006 — Evaluation infra & memory infra** *(planned)*: how to run retrieval/answer eval as a
  pipeline (golden sets, offline/online); memory as a persisted store wired back into retrieval.
  Cross-link `../ai-evaluation`.

## Status
- 2026-06-21: Track scaffolded — MISSION / NOTES / GLOSSARY / RESOURCES authored; sources verified
  (FAISS 1702.08734, HNSW 1603.09320, vLLM 2309.06180, Sentence-BERT 1908.10084, ColBERT 2004.12832).
  Lesson 0001 is the flagship to build first; approve its house style before batch-building 0002–0006.
