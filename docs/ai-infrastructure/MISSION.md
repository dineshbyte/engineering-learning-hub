# Mission: AI Infrastructure from First Principles

## Why
As a Senior Lead / VP Engineering I have to make the build/buy/run decisions *under* an AI product:
which vector database, whether to self-host inference or call an API, where the gateway sits, what
caching buys, and what it all costs at scale. The agents and context-engineering tracks taught what
goes *into* the model. This track is the plumbing that serves it: the embedding pipeline, the vector
store, the retrieval and rerank path, the model gateway, the inference server, the caches. The
question I must answer cold is: **when an AI feature is slow, expensive, or unreliable in production,
which box in the diagram is the cause — and what's the cheapest fix that holds at 100×?** This is
distributed-systems reasoning applied to a model-backed stack, not new magic.

## Success looks like
- I can draw the full AI infra stack on a whiteboard — ingest → embed → index → retrieve → rerank →
  gateway → inference → cache — and name what each box owns and how it fails.
- For any AI product I can make the vector-store call (pgvector vs dedicated vs hosted) and defend it
  on recall, latency, freshness, operational load, and cost.
- I can decide self-hosted inference vs hosted API on a cost-per-token, latency-SLO, and
  ops-burden basis, and say where the gateway and its fallbacks belong.
- I can reason about the recall ↔ latency ↔ memory trade-off of an ANN index (HNSW vs IVF) and tune
  it for a workload instead of accepting defaults.
- I can explain where caching pays off (KV/prefix cache, prompt store, retrieval cache) and quantify
  the hit-rate and cost impact.
- I can review an AI-infra design for scalability, cost blow-ups, freshness/staleness, and failure
  modes the way I'd review any distributed system.

## Constraints
- Engineering analogies first (databases, indexes, query planners, API gateways, OS paging, caches,
  replication/sharding). Model internals only when they explain an infra cost.
- Visual-first: hero stack diagram + SVG/ASCII + comparison tables + definition cards. Prose only as
  captions. 60–70% of each lesson is visual.
- Per-concept template every time: simple explanation · deep explanation · engineering analogy ·
  common misconceptions · one-sentence memory rule.
- Every lesson ends in retrieval practice + interview questions (click-to-reveal).
- Optimize for durable mental models of cost and failure, not vendor feature tours.

## Out of scope (for now)
- Embedding-model and transformer training; fine-tuning internals.
- GPU kernel / CUDA-level optimization beyond the serving mental model.
- Vendor-specific SDK call signatures (LangChain/LlamaIndex/provider client tutorials).
- Token-level prompt-cost micro-optimization beyond the budgeting and cache-hit model.

## Cross-link note
- `../context-engineering` Lesson 0008 (Embeddings, indexing & cost) covers embeddings from the
  *context* angle — what to retrieve and how it fills the window. **THIS track is the infra/ops deep
  dive**: how the embedding pipeline, vector store, serving layer, and caches are built, scaled, and
  paid for. Read 0008 for the "why retrieve"; read here for the "how to run it."

## Sibling tracks
- `../ai-agents` — LLM, tools, agent loop, runtime, memory, MCP. The model-side foundation.
- `../context-engineering` — what gets selected/retrieved/assembled into the window (the layer above
  this one).
- `../ai-evaluation` — measuring retrieval/answer quality and regressions.
- `../ai-security` — prompt injection, multi-tenant isolation, data exfiltration on the infra path.
- `../production-ai-architecture` — putting the full system together for production.
- `../advanced-ai-systems` — beyond-the-basics patterns once the stack is understood.
