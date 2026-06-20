# Resources — high-trust sources for Context Engineering

Ground every non-obvious claim in these; cite inline (`<sup>` → `#sources`). Populated before
teaching. Prefer primary sources (papers, vendor engineering blogs) over secondary commentary.

## Canonical / vendor engineering
- **Anthropic — "Effective context engineering for AI agents"** (anthropic.com/engineering). The
  spine of this track: context as a finite, curated resource; selection over dumping.
- **Anthropic — "Building effective agents"** (anthropic.com/engineering). Runtime, tool use,
  when to use retrieval vs not.
- **Anthropic — "Introducing Contextual Retrieval"** (anthropic.com/news/contextual-retrieval).
  Chunking + context loss; contextual embeddings + BM25 hybrid; rerank.
- **Anthropic — Claude Code documentation** (docs.anthropic.com). Read-on-demand context model.
- **Cursor — documentation** (cursor.com/docs). Codebase indexing via embeddings; retrieval.
- **OpenAI — embeddings & retrieval guides** (platform.openai.com/docs). Embedding-based search.

## Foundational papers
- **Lewis et al., 2020 — "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"**
  (arXiv:2005.11401). The original RAG formulation.
- **Karpukhin et al., 2020 — "Dense Passage Retrieval for Open-Domain QA"** (arXiv:2004.04906).
  Dense (embedding) retrieval baseline.
- **Robertson & Zaragoza, 2009 — "The Probabilistic Relevance Framework: BM25 and Beyond."**
  Lexical / keyword retrieval, the classic baseline.
- **Liu et al., 2023 — "Lost in the Middle: How Language Models Use Long Contexts"**
  (arXiv:2307.03172). Position bias — recall degrades for content in the middle of a long window.
- **Cormack et al., 2009 — "Reciprocal Rank Fusion"** (SIGIR). Combining rankings for hybrid search.

## Mental-model / engineering writing
- **Martin Fowler — query/CQRS and data-retrieval patterns** (martinfowler.com). For the
  "context is the new database query" analogy and read-model thinking.
- **OWASP — Top 10 for LLM Applications** (owasp.org). Prompt injection via retrieved/poisoned
  context — relevant to the failure-modes module.

## Notes on trust
- Vendor blogs describe *their* product's strategy; treat product specifics (e.g. exact index
  type) as version-dependent and verify against current docs before teaching as fact.
- Numbers (window sizes, token counts) drift fast — teach the *shape* of the constraint, give
  concrete numbers only as illustrative "at time of writing."
