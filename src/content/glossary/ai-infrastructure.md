---
title: "Glossary — AI Infrastructure"
---
# Glossary — AI Infrastructure

Covers Lesson 0001 (the rest of this track is in progress). Grouped by where each term first lands. Shared AI terms reuse the
canonical definitions verbatim so they never drift across tracks.

## Shared AI foundations (reused verbatim)
- **LLM (large language model)** — the reasoning model (the brain in a jar); predicts tokens, has
  no memory/tools/actions on its own.
- **Tool** — a callable capability/API/function the model can invoke.
- **Agent** — an LLM using tools in a loop to accomplish a goal.
- **Agent loop** — observe → think → act → repeat.
- **Runtime** — the orchestration layer around the model (loop, state, tool execution, retries,
  limits).
- **Workflow vs agent** — developer-defined path (workflow) vs model-influenced path (agent).
- **MCP** — a protocol exposing tools/resources/prompts to AI clients (USB-C for tools).
- **Context engineering** — curating the window before the model runs.
- **RAG (Retrieval-Augmented Generation)** — retrieve → assemble → LLM → answer.
- **Memory** — persisted state reachable only by retrieval into the context window.

## Retrieval substrate (L2–L3)
- **Embedding** — a dense vector capturing meaning; near vectors ≈ similar meaning. Pre-computed
  once at ingest, then compared at query time.
- **Vector database** — a store that indexes embeddings for similarity search at scale, with
  metadata filtering, CRUD, and ANN indexes. The serving substrate retrieval reads from.
- **ANN (approximate nearest neighbor)** — trade a little recall for large speed/memory wins at
  scale; exact k-NN is O(n) per query and does not scale.
- **HNSW** — graph-based ANN index: layered proximity graphs, logarithmic search. Fast, high
  recall, memory-heavy; tuned via `M` (graph degree) and `ef` (search breadth).
- **IVF (inverted file)** — clustering-based ANN: partition vectors into cells, probe only a few
  (`nprobe`) at query time. Cheaper memory than HNSW; recall depends on cells probed.
- **Reranker** — a second, expensive, accurate stage that re-scores the top-N candidates jointly
  with the query to optimize precision. Cannot recover a doc the first stage missed.
- **Cross-encoder** — the model class behind most rerankers: encodes query and document *together*
  in one forward pass for a relevance score. Accurate but O(candidates) per query — too slow for
  first-stage retrieval, ideal for reranking a small top-N.

## Serving & gateways (L4)
- **Model gateway** — a proxy in front of one or more model providers: routing, auth, rate limits,
  retries/fallback, cost accounting, caching, and observability. The API gateway pattern for LLMs.
- **Inference server** — the system that runs model forward passes for many concurrent requests:
  batching, scheduling, KV-cache management, streaming (e.g. vLLM). Where GPUs actually serve traffic.
- **Quantization** — storing model weights (and/or KV cache) at lower precision (e.g. INT8/INT4)
  to cut memory and raise throughput, trading some accuracy. The serving-side cost/quality knob.

## Caching & prompt infra (L5)
- **KV cache** — the per-request attention key/value tensors the model reuses across generated
  tokens. Grows with sequence length; the dominant GPU-memory consumer in serving (PagedAttention
  exists to manage it).
- **Prompt store** — a versioned registry for prompts/templates (with variables, A/B variants, and
  rollout): treat prompts as deployable config, not hardcoded strings. The "feature flag" layer for prompts.
