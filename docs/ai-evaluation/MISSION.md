# Mission: AI Evaluation from First Principles

## Why
As a Senior Lead / VP Engineering I have to answer one question before I ship or buy any AI feature:
**how do I know it actually works — and that the next change didn't make it worse?** With normal
software a passing test suite answers that. With an LLM the output is non-deterministic, "correct"
is fuzzy, and the model is the one part I can't unit-test. So the engineering moves to *evaluation*:
how you turn fuzzy quality into a number you can gate a deploy on, regress against, and put on a
dashboard. This track gives me durable mental models for evaluating whole AI systems and agents —
not a tour of benchmark leaderboards.

## Success looks like
- I can explain why a passing demo means nothing and why evaluation — not the model — is the part
  that decides whether an AI feature is shippable.
- I can design an **offline golden set** for a real feature (support agent, code assistant, RAG
  search) and reason about how it's built, versioned, and kept honest.
- I can choose between **offline, shadow, and A/B** evaluation for a given change and explain the
  risk/signal trade-off of each.
- I can decide when **LLM-as-a-judge** is appropriate, what biases it introduces, and how I'd
  calibrate it against humans before trusting its score.
- I can separate **task success rate** from **tool success rate** when an agent fails, and turn a
  vague "it's worse now" into a specific regression I can localize.
- I can stand up a **continuous evaluation pipeline** (golden-set regression in CI + online
  signals) and reason about its cost, flakiness, and false-alarm rate.

## Constraints
- Engineering analogies first (test suites, CI gates, regression tests, canaries/shadow traffic,
  A/B experiments, SLOs/dashboards). Academic eval framing only when unavoidable.
- Visual-first: hero diagram + SVG/ASCII visuals + comparison tables + definition cards. Prose only
  as captions. 60–70% of each lesson is visual.
- Per-concept template every time: simple explanation · deep explanation · engineering analogy ·
  common misconceptions · one-sentence memory rule.
- Every lesson ends in retrieval practice + interview questions (click-to-reveal).
- Optimize for long-term retention over completeness.

## Out of scope (for now)
- Model training/fine-tuning evaluation internals (loss curves, eval-during-training).
- Vendor-specific eval-SDK call signatures (exact RAGAS/Evals API surface).
- Safety/red-teaming and alignment evaluation as a discipline (touched only where it overlaps
  hallucination/faithfulness).

## Cross-link
- `../context-engineering` **L6 (Retrieval Evaluation & Observability)** is the deep dive on
  *retrieval-specific* eval — recall@k, precision@k, MRR, nDCG, faithfulness, RAGAS context
  precision/recall. THIS track generalizes evaluation to whole AI systems and agents (task/tool
  success, judges, regression, production pipelines). For the retrieval-eval internals, go there;
  this track's L5 links into it rather than repeating it.

## Sibling tracks (Phase 5–10)
- `../ai-agents` — runtime, tools, agent loop, memory, MCP. The system this track evaluates.
- `../context-engineering` — what goes into the window; includes the retrieval-eval deep dive (L6).
- Later Phase 5–10 tracks (AI safety/guardrails, AI observability/ops, agent architecture,
  fine-tuning & adaptation, AI product/economics) link here as siblings once authored.
