# Mission: Advanced AI Systems — the skeptical treatment

## Why
As a Senior Lead / VP Engineering I get pitched the advanced stuff constantly: "we need a
multi-agent swarm," "we should fine-tune our own model," "let's go fully autonomous." Most of these
are the wrong reach most of the time. The question this track answers is: **when does the expensive,
complex AI architecture actually pay for itself — and when is it a single agent with good context
plus a coordination bill you didn't need?** This is the advanced, cost-aware, anti-pattern-first
treatment that sits on top of the `../ai-agents` and `../context-engineering` tracks. The default
answer here is often "don't" — and I want to know exactly why, and the few cases where the answer
flips.

## Success looks like
- I can decide, on a whiteboard, **single agent vs multi-agent** for a given task — and quantify the
  coordination overhead (tokens, latency, failure surface) that multi-agent has to overcome to win.
- I can choose among **prompt vs RAG vs fine-tune vs distill** for a capability gap, and say which
  problem each one actually solves (and which it doesn't — e.g. fine-tuning is not how you add facts
  that change).
- I can explain **reasoning models and test-time compute** as a cost/latency knob, and reason about
  when paying for more inference compute beats a bigger model or more context.
- I can design a **long-horizon agent** that survives many steps — budgeting context, persisting
  memory, and containing error accumulation — instead of one that drifts after step ten.
- I can put **guardrails on an autonomous system**: blast radius, reversibility, human-in-the-loop
  checkpoints, audit — and name the OWASP-LLM failure modes that autonomy amplifies.
- For any "advanced AI" pitch I can name the **anti-pattern** it most likely is, or the narrow
  condition under which it's the right call.

## Constraints
- Engineering analogies first (distributed systems, fan-out/fan-in, queues, idempotency, blast
  radius, build-vs-buy, capacity planning). Academic framing only when unavoidable.
- Visual-first: hero diagram + SVG/ASCII visuals + comparison tables + decision trees + definition
  cards. Prose only as captions. 60–70% of each lesson is visual.
- Per-concept template every time: simple explanation · deep explanation · engineering analogy ·
  common misconceptions · one-sentence memory rule.
- Every lesson ends in retrieval practice + interview questions (click-to-reveal).
- Cost-first and skeptical: every "advanced" technique is introduced next to its bill and its
  anti-pattern, not as a default.

## Out of scope (for now)
- Training infrastructure, GPU clusters, RLHF pipelines, and pre-training (this is a *systems* track,
  not an ML-training track).
- Vendor-specific framework tutorials (AutoGen / CrewAI / LangGraph call signatures) — patterns over
  APIs.
- Transformer internals and the math of attention (covered conceptually only where test-time compute
  needs it).
- Prompt-level technique catalogs already covered in `../context-engineering`.

## Sibling tracks
- **`../ai-agents`** — the foundation: LLM, tools, agent loop, runtime, memory, MCP, single-vs-multi
  basics. **Cross-link:** ai-agents **lesson 0004 (Multi-agent systems)** introduces single-vs-multi
  at an intro level. THIS track's lesson 0001 is the advanced, skeptical follow-on: cost models,
  orchestration patterns, swarms, and the anti-patterns — link back to 0004 as the prerequisite.
- **`../context-engineering`** — the context layer long-horizon agents depend on (compaction, memory
  vs retrieval, the failure modes). Lesson 0004 here leans directly on it.
- Other Phase 5–10 tracks this sits beside: **`../ai-evaluation`**, **`../ai-infrastructure`**,
  **`../ai-security`**, **`../domain-agent-design`**, **`../production-ai-architecture`**. Autonomy
  guardrails (L5) pair with ai-security; long-horizon design (L4) pairs with ai-infrastructure.
