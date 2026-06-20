# Glossary — Context Engineering

Covers Lessons 1–9. Grouped by where each term first lands.

## Foundations (L1–2)
- **Context** — everything the model can see for a single call: system prompt + instructions +
  conversation history + retrieved data + tool definitions/results + the user's query. The model's
  *entire* world for that one inference. It has no other access to your data.
- **Context window** — the model's fixed maximum number of tokens per call (input + output). A hard
  ceiling, like total RAM. Exceed it and content must be dropped, truncated, or summarized.
- **Token** — the unit the model counts in. A sub-word chunk (~4 chars / ~0.75 words of English on
  average). Limits, latency, and cost are all measured in tokens, not characters or lines.
- **Working context** — the curated subset actually assembled into the window for *this* turn: the
  few things relevant right now, not everything that exists. The output of context engineering.
- **Context engineering** — the discipline of deciding what to put in the window (and what to leave
  out) so a fixed model produces the best possible answer. The selection/retrieval/compression/
  assembly pipeline that runs *before* the model.
- **Context assembly** — the step that packs selected/retrieved content (plus prompt, history,
  tools) into the final window, within budget, in an order the model uses well.
- **Context-as-query** — the mental model: in classic software the query (SQL) fetches from the DB;
  in AI the context-retrieval pipeline fetches what the LLM reasons over. The "query" moved from
  SQL into context assembly.
- **Retrieval quality vs model quality** — past a baseline, *what you feed* the model usually moves
  answer quality more than *which model* you use. Right context + smaller model often beats wrong
  context + best model.

## Selection & retrieval (L2)
- **Selection** — choosing the smallest set of content that still contains the answer, within the
  token budget. Candidate generation → ranking → packing.
- **Lexical / keyword search (BM25)** — exact-term matching with TF-IDF/BM25 scoring. Precise on
  identifiers and exact terms; blind to synonyms (vocabulary mismatch).
- **Semantic / vector search** — encode query and chunks as embeddings, retrieve by similarity.
  Captures meaning and paraphrase; can return "topically similar but wrong"; weak on rare exact tokens.
- **Hybrid search** — run lexical + semantic and fuse results (e.g. Reciprocal Rank Fusion). Covers
  exact *and* semantic; more infra to tune.
- **Ranking** — ordering candidates by a cheap score; first stage optimizes **recall** (don't miss it).
- **Re-ranking** — a second, expensive, accurate stage (e.g. a cross-encoder) that re-scores the
  top-N jointly with the query; optimizes **precision**. Can't recover a doc the first stage missed.

## Codebase, chunking & RAG (L3)
- **Repository indexing** — building a searchable representation of a codebase (embeddings and/or a
  symbol/dependency index) so relevant code can be retrieved.
- **Read-on-demand (agentic) context** — fetching files live via tools (grep/glob/read) instead of a
  persistent embedding index. Always fresh; costs tool round-trips. (Claude Code's model.)
- **Chunking** — splitting documents into retrievable units. Chunk on meaning/structure, not raw
  character count.
- **Overlap** — sharing boundary text between chunks so a fact spanning a boundary survives.
- **Context fragmentation** — a fact split across chunks so no single chunk is complete/retrievable.
- **Contextual chunking/retrieval** — prepend a short doc/section-situating summary to each chunk
  before embedding (and index BM25 too) to cut retrieval failures.
- **RAG (Retrieval-Augmented Generation)** — Question → Retrieval → Assembly → LLM → Answer. Grounds
  the model in your private/current data; only as good as its retrieval.

## Memory, compression & failure modes (L4)
- **Memory** — persisted state the system writes and recalls about an ongoing task/relationship
  (derived facts, decisions). Reaches the model only via retrieval into context.
- **Knowledge base** — the corpus of source documents/facts; usually read-only reference material.
- **Compression** — fitting more useful signal into the budget via **summarization** (condense),
  **distillation** (extract salient facts), pruning redundancy, and **sliding windows** (recent
  verbatim + rolling summary). Lossy — keep recent turns and decisions verbatim.
- **The 5 failure modes** — **missing** (never retrieved), **wrong** (irrelevant retrieved),
  **outdated** (stale index), **conflicting** (sources disagree), **excessive** (too much → noise /
  lost-in-the-middle). Diagnose by symptom → cause → fix.

## Evaluation & observability (L6)
- **recall@k** — is at least one relevant doc in the top-k. The most important RAG retrieval metric;
  nothing downstream can use what wasn't retrieved.
- **precision@k** — fraction of the top-k that are relevant.
- **MRR (mean reciprocal rank)** — how high the first relevant result sits.
- **nDCG** — graded, position-discounted relevance; rewards putting the best at the top.
- **Faithfulness / groundedness** — is every claim in the answer supported by the retrieved context
  (detects hallucination).
- **Context precision / recall** — are retrieved chunks relevant and well-ranked (precision); did
  retrieval capture everything the ideal answer needs (recall, needs ground truth). RAGAS vocabulary.
- **Golden set** — a versioned eval set of (query, relevant doc IDs, ideal answer) for offline
  regression testing.
- **Offline vs online eval** — offline = regression on the golden set before deploy; online =
  production signals (thumbs, deflection/escalation, citation-clicks, rephrase rate).
- **LLM-as-judge** — using an LLM to score faithfulness/relevance at scale (needs calibration).

## Pre-retrieval & advanced RAG (L7)
- **Query rewriting** — clean/expand/disambiguate the raw query before retrieval.
- **Multi-query** — generate several paraphrases, retrieve for each, union the results (boosts recall).
- **HyDE (Hypothetical Document Embeddings)** — embed a generated hypothetical *answer* (not the
  question) to bridge the query↔document vocabulary gap.
- **Query decomposition** — split a complex question into sub-queries, retrieve each, combine.
- **Step-back prompting** — ask a broader question first to pull grounding, then the specific one.
- **Routing** — classify the query and send it to the right index/datasource/tool.
- **Parent-document / small-to-big** — match small precise chunks but return the larger parent for context.
- **GraphRAG** — retrieve over an entity/knowledge graph (subgraphs + community summaries); wins on
  global "connect-the-dots across the corpus" questions.
- **Agentic RAG** — the LLM decides whether/what/when to retrieve, iterating in a loop.
- **Self-RAG / Corrective RAG (CRAG)** — the model critiques its own retrieval/answer; CRAG grades
  retrieved docs and falls back (e.g. web search) when quality is low.

## Embeddings, indexing & cost (L8)
- **Embedding** — a dense vector capturing meaning; near vectors ≈ similar meaning.
- **Similarity metric** — cosine (most common), dot product, or Euclidean distance over embeddings.
- **ANN (approximate nearest neighbor)** — trade a little recall for large speed at scale; exact
  k-NN is O(n) per query.
- **HNSW / IVF / PQ** — vector index families: graph-based (fast, high recall, memory-heavy) /
  clustering (probe a few cells) / product quantization (compress vectors, lower recall). The
  recall ↔ latency ↔ memory trade-off.
- **Metadata filtering** — pre/post-filtering candidates by attributes (date, type, tenant); also an
  access-control hook.
- **Index freshness / invalidation** — keeping the index current (incremental updates, CDC,
  re-embedding on model change); a stale index *is* the "outdated context" failure mode.

## Caching, ordering & security (L9)
- **Prompt / KV caching** — reusing the processed state of a stable prefix across calls to cut cost
  and latency. Put stable content (system prompt, tools) first, volatile content (query, retrieved
  docs) last; any change busts the cache from that point on.
- **Lost in the middle** — models attend most to the start (primacy) and end (recency) of the
  window, weakest in the middle. Order matters: put the query last and the best doc at an edge.
- **Indirect prompt injection** — a malicious instruction hidden in *retrieved* content that the
  model may obey. Treat all retrieved content as untrusted data, never as instructions.
- **Multi-tenant access control** — enforce row/document-level permissions in the *retrieval query*
  (scope by tenant/ACL before anything reaches the model). Never rely on the prompt to enforce access.
