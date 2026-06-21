# Notes — teaching preferences for Advanced AI Systems

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background.
- Has completed **`../ai-agents`** (LLM, tools, agent loop, runtime, memory, MCP, single-vs-multi
  basics) and **`../context-engineering`** (selection/retrieval, RAG, memory vs retrieval, failure
  modes, caching/ordering/security). Do NOT re-teach those — build on them.
- Entry rung: **Staff → Principal / VP.** Teach trade-offs, cost models, failure modes, and
  "name the anti-pattern, then the narrow case where it flips." No Foundation hand-holding.

## How they want to be taught
- First principles, no buzzwords. Optimize for durable engineering mental models, not academic AI.
- Distributed-systems / SaaS analogies first: fan-out/fan-in, queues, idempotency, blast radius,
  capacity planning, build-vs-buy. The spine of this track is **"is the coordination/complexity tax
  worth it here?"** — every lesson ladders back to that.
- Per-concept template every time: Simple · Deep · Engineering analogy · Misconceptions · Memory rule.
- VISUAL-FIRST infographics with a voice — hero diagram, SVG/ASCII, comparison tables, decision
  trees, definition cards, interactive reveals. Prose only as captions (global house style).
- Always include REAL USE CASES + INTERVIEW QUESTIONS (click-to-reveal) — doubles as retrieval.
- Cost-first and skeptical: introduce each technique beside its bill and its anti-pattern. Default
  answer is often "don't"; teach the conditions under which it flips to "do."
- Goal is reconstruction from memory, not fluency.

## Teaching rules
- **Dependency order:** L1 (coordination cost) → L2 (adapt the model) → L3 (spend inference compute)
  → L4 (run for a long horizon) → L5 (remove the human + anti-patterns/research). Don't teach
  long-horizon (L4) before the reader can budget context and reason about error accumulation.
- **Infographic-first:** lead each module with the diagram/decision-tree, then explain it.
- Every lesson: real use cases + interview questions (click-to-reveal); cross-link prev/next + hub.
- Cross-link out, don't duplicate: point to `../ai-agents` 0004 and `../context-engineering` rather
  than re-deriving their material.

## Lesson arc (this track) — flagship done, rest planned
- **0001 — Multi-agent / orchestration / swarms: when & when not.** (FLAGSHIP — built first.)
  Single vs multi-agent; orchestrator-worker (fan-out/fan-in) vs swarm; coordination overhead as a
  cost model; the anti-patterns. **Cross-links `../ai-agents` lesson 0004** as the intro-level
  prerequisite; this is the advanced, skeptical treatment.
- **0002 — Fine-tuning & distillation.** (PLANNED.) Prompt vs RAG vs fine-tune vs distill decision
  tree; what each actually solves; LoRA/PEFT as the practical default; distillation for cost/latency;
  "fine-tuning is not how you add facts that change."
- **0003 — Reasoning models.** (PLANNED.) Chain-of-thought → tree-of-thought → reasoning models;
  test-time compute as a cost/latency knob; when more inference compute beats a bigger model or more
  context.
- **0004 — Long-horizon agents.** (PLANNED.) Surviving many steps: context budgeting/compaction,
  memory persistence, error accumulation and recovery. Leans on `../context-engineering`.
- **0005 — Autonomous systems + anti-patterns + future/research directions.** (PLANNED, capstone.)
  Guardrails: blast radius, reversibility, human-in-the-loop, audit; OWASP-LLM failure modes that
  autonomy amplifies; the cross-track anti-pattern catalog; where the research is heading.

## Delivery decisions / status
- **One flagship lesson first**: approve style on Lesson 0001, THEN batch-build 0002–0005 to match
  (clone the locked house style, as the context-engineering track did). EPUB build deferred until
  the lesson set is approved.
- Track accent token: register `--track-advanced` in `assets/tokens.css` (light + dark) before
  building lesson HTML.

## Future sessions / ZPD
- After style approval: build 0002–0005 + reference sheets (cheat sheet + architecture-review), then
  the EPUB ritual + hub EPUB link.
- Interleaved drills mixing modules (e.g. "multi-agent vs single", "fine-tune vs RAG", "more compute
  vs bigger model", "what breaks at step 50"), spaced a few days apart.
- A judgment drill: given an "advanced AI" pitch, name the anti-pattern + the narrow condition that
  would justify it.
- Only write learning-records on demonstrated recall, not coverage.
