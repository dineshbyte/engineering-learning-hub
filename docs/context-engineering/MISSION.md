# Mission: Context Engineering from First Principles

## Why
As a Senior Lead / VP Engineering I evaluate, buy, and build AI products. The single question I
must be able to answer cold is: **why does one AI system appear dramatically smarter than another
even when both use the same LLM?** The answer is almost never the model — it's context
engineering: what gets selected, retrieved, compressed, and assembled into the window before the
model ever runs. I want durable mental models for why Cursor, Claude Code, RAG systems, and modern
AI products succeed or fail — not a vocabulary of buzzwords.

## Success looks like
- I can explain, on a whiteboard, why the model is the *fixed* part and context assembly is where
  all the engineering value (and most of the failure) lives.
- I can frame context as the new database query: retrieval quality usually dominates model quality.
- For any AI product I can name its context strategy (pre-indexed embeddings vs read-on-demand vs
  hybrid) and the trade-off it bought.
- I can diagnose a failing AI feature by failure mode: missing / wrong / outdated / conflicting /
  excessive context — and know the fix for each.
- I can design the context system for a billing, support, engineering, or research agent and reason
  about its scalability, cost, reliability, and observability.

## Constraints
- Engineering analogies first (databases, query planners, caches, indexes, RAM/disk, distributed
  systems). Academic framing only when unavoidable.
- Visual-first: hero diagram + SVG/ASCII visuals + comparison tables + definition cards. Prose only
  as captions. 60–70% of each lesson is visual.
- Per-concept template every time: simple explanation · deep explanation · engineering analogy ·
  common misconceptions · one-sentence memory rule.
- Every lesson ends in retrieval practice + interview questions (click-to-reveal).
- Optimize for long-term retention over completeness.

## Out of scope (for now)
- Embedding model training, transformer internals, fine-tuning.
- Vendor-specific API tutorials (LangChain/LlamaIndex call signatures).
- Token-level cost optimization math beyond the budgeting mental model.

## Sibling track
- Builds directly on `../ai-agents-mastery` (runtime, context window, memory tiers). Context
  Engineering is the deep-dive on the "context" layer that track introduced.
