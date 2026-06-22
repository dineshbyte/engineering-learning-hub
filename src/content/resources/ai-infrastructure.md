---
title: "Resources — high-trust sources for AI Infrastructure"
---
# Resources — high-trust sources for AI Infrastructure

Ground every non-obvious claim in these; cite inline (`<sup>` → `#sources`). Populated before
teaching. Prefer primary sources (papers, vendor engineering docs) over secondary commentary.
This track is the infra/ops deep dive — serving, gateways, scaling, cost — so the sources skew
toward systems papers and product docs, not modeling papers.

## Primary specs / docs
- **pgvector — documentation** (github.com/pgvector/pgvector). Vector search inside Postgres:
  exact + HNSW/IVFFlat indexes. The "do I even need a dedicated vector DB?" baseline — relevant
  when retrieval volume fits in your existing OLTP store.
- **Pinecone — documentation** (docs.pinecone.io). Managed serverless vector DB; useful for the
  build-vs-buy and operational-model (sharding, replication, metadata filtering) framing.
- **Weaviate — documentation** (weaviate.io/developers/weaviate). Open-source vector DB with
  hybrid search and built-in reranking modules; good reference for the hybrid + rerank pipeline.
- **vLLM — documentation** (docs.vllm.ai). Production inference server: PagedAttention, continuous
  batching, KV-cache management, prefix caching. The reference implementation for the serving lesson.
- **Anthropic — prompt caching** (docs.anthropic.com). KV/prefix caching at the API layer: cache
  the stable prefix (system + tools), pay reduced rates on cache hits. The cost lever for L5.
- **OpenAI — embeddings & API docs** (platform.openai.com/docs). Embedding model dims/metrics and
  the hosted-embeddings cost/latency baseline for the embeddings lesson.

## Papers & deeper reading
- **Johnson, Douze & Jégou, 2017 — "Billion-scale similarity search with GPUs"**
  (arXiv:1702.08734; FAISS). Why exact k-NN does not scale and how IVF + product quantization
  trade recall for memory and speed at billion-vector scale.
- **Malkov & Yashunin, 2016 — "Efficient and robust approximate nearest neighbor search using
  Hierarchical Navigable Small World graphs"** (arXiv:1603.09320; HNSW). The graph-based ANN index
  most vector DBs default to; the recall ↔ latency ↔ memory knobs (`ef`, `M`).
- **Reimers & Gurevych, 2019 — "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"**
  (arXiv:1908.10084). Why you pre-compute embeddings once (bi-encoder) instead of scoring every
  pair at query time — the architecture that makes vector search feasible.
- **Khattab & Zaharia, 2020 — "ColBERT: Efficient and Effective Passage Search via Contextualized
  Late Interaction over BERT"** (arXiv:2004.12832). Late-interaction retrieval: the middle ground
  between cheap bi-encoders and expensive cross-encoder rerankers; storage cost trade-off.
- **Kwon et al., 2023 — "Efficient Memory Management for Large Language Model Serving with
  PagedAttention"** (arXiv:2309.06180; vLLM, SOSP '23). KV cache as the serving bottleneck;
  OS-paging applied to attention. The spine of the inference-serving lesson.

## Notes on trust
- Vendor docs describe *their* product's current behaviour; treat product specifics (default index
  type, exact cache discount, supported metrics) as version-dependent and verify against current
  docs before teaching as fact.
- Throughput/latency/cost numbers in serving papers are hardware- and model-specific. Teach the
  *shape* of the trade-off; quote concrete numbers only as illustrative "at time of writing."
