# Notes — teaching preferences for Production AI Architecture

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background;
  this is home turf — the AI is the new variable, not the systems thinking.
- Has completed `../ai-agents` (LLM, tools, agent, agent loop, runtime, memory, MCP, Claude Code /
  Cursor architecture) and `../context-engineering` (selection, retrieval, RAG, failure modes,
  caching, multi-tenant ACL-in-retrieval). Do NOT re-teach those primitives — reference them.
- Entry rung: **Staff → Principal / VP.** Teach the review lens: what to ask, what to require, where
  the blast radius is. "Name the failure mode, name the control, pick a side."

## How they want to be taught
- First principles, no buzzwords. Durable engineering mental models, not vendor tours.
- SRE / distributed-systems / SaaS analogies first. "An AI system is a distributed system with a
  non-deterministic, rate-limited, billable dependency" is the spine. Reliability theory is inherited
  from SRE, not reinvented.
- Per-concept template every time: Simple · Deep · Engineering analogy · Misconceptions · Memory rule.
- VISUAL-FIRST infographics with a voice — hero diagram, SVG/ASCII, comparison tables, definition
  cards, interactive reveals. Prose only as captions (global house style).
- Always REAL USE CASES + INTERVIEW QUESTIONS (click-to-reveal) — doubles as retrieval. Include the
  VP/architecture-review framing ("what would you require before approving this?").
- Goal is reconstruction of the review checklist from memory, not fluency.

## The learning goal (north star for grading)
> Is this AI system production-ready — and if not, what's the failure mode that takes it down?
Every lesson should ladder back to a control you'd require in a review.

## Teaching rules
- **Dependency order.** Frame the system as distributed-systems-with-a-twist (0001) before any
  specific concern; observability/governance (0002) before cost/capacity (0003) before the
  component-level runtime/context/tool architecture (0004); multi-tenancy (0005) before the
  platform that productizes it (0006).
- **Infographic-first.** Lead with the diagram; prose is caption.
- **Real use cases + interview questions every lesson**, including the architecture-review prompt.
- Cross-link siblings instead of re-deriving: `../ai-agents` 0002 (runtime) and 0004 (multi-agent /
  production), `../context-engineering` 0005 (architecture reviews).

## Lesson arc — flagship done, rest planned
- **0001** (BUILT, flagship): **Review-as-distributed-system framing.** An AI system is a distributed
  system with a non-deterministic, rate-limited, billable dependency. SLOs/error budgets, partial
  failure, blast radius, the review lens this whole track runs through.
- **0002** (PLANNED): **Observability / governance / auditability.** Trace/span over the agent loop
  (OTel GenAI conventions), the eval signal, per-request cost attribution; NIST RMF GOVERN/MAP/
  MEASURE/MANAGE; "show me what the agent did for request X."
- **0003** (PLANNED): **Cost control & capacity.** Token budgets, per-tenant metering, rate limits
  vs GPU/KV-cache memory, queueing/batching/admission control, the latency cliff.
- **0004** (PLANNED): **Runtime + context + tool architecture.** Reviewing the component layer:
  loop/retries/limits, context assembly, tool blast radius and least privilege. Cross-link
  `../ai-agents` 0002 (runtime) + 0004 (multi-agent/production); don't re-derive.
- **0005** (PLANNED): **Multi-tenant architecture.** Data isolation (retrieval scoped per tenant),
  cost isolation (per-tenant budgets), blast-radius isolation (noisy-neighbour, cross-tenant
  injection). The SaaS isolation playbook with a context-window twist.
- **0006** (PLANNED): **Agent platform architecture.** The shared substrate (runtime, tool registry,
  model gateway, eval harness, observability) — Claude Code · Cursor · enterprise platforms. The
  internal-developer-platform pattern applied to AI; when a platform earns its keep vs over-build.

## Delivery decisions
- Build the flagship (0001) first, approve the style, THEN batch-build 0002–0006 cloning the locked
  house style (same pattern as `../context-engineering`). Defer the EPUB ritual until the set is
  approved.
- Accent token: add `--track-prod-ai` (pick a hue distinct from the existing tracks; suggest a
  steel/teal so it reads "infrastructure"). Confirm before wiring.

## Future sessions / ZPD
- Judgment drill: given an AI design doc, run the review and produce the approve/block call + the
  three controls you'd require.
- Interleaved drills mixing concerns (e.g. "fallback model vs retry budget", "per-tenant token
  budget vs global rate limit", "trace vs eval signal").
- Only write learning-records on demonstrated recall, not coverage.
