# Notes — teaching preferences for Domain Agent Design

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background.
- Has completed **`../ai-agents`** (LLM, tool, agent loop, runtime, memory, MCP, Claude Code /
  Cursor architecture) and **`../context-engineering`** (selection, retrieval, RAG, failure modes,
  caching/ordering/security). Treat both as assumed knowledge — cross-link, never re-teach.
- Entry rung: **Senior → Staff/VP.** No Foundation hand-holding. Teach the *decision*: should this
  domain get an agent, where's its boundary, what's the blast radius, build or buy.

## Teaching rules
- **Dependency order.** 0001 (the design method) is the lens; every agent lesson after it
  instantiates the same blueprint, so concepts compound. Don't teach billing-agent specifics before
  the method that frames them.
- **Infographic-first.** Hero diagram + SVG/ASCII + comparison tables + definition cards. Prose only
  as captions (global house style). 60–70% visual.
- **Per-concept template:** Simple · Deep · Engineering analogy · Misconceptions · Memory rule.
- **Per-agent design template (the 9 parts)** on every agent lesson:
  1. Domain & goal — one sentence: what job, for whom.
  2. Responsibility boundary — owns / defers / refuses.
  3. Tool surface — smallest tool set + argument/return shapes.
  4. Context strategy — what the window needs (links `../context-engineering`).
  5. Blast radius — per-action worst case.
  6. Approval gates / human-in-the-loop — where and why.
  7. Failure modes — domain-specific, with the fix.
  8. Observability & ROI — what to measure; cost vs deflected work.
  9. Build-vs-buy — the explicit call, with the trade-off named.
- **Real use cases + interview questions** (click-to-reveal) every lesson — doubles as retrieval.
- Goal is reconstruction + **transfer to an unseen domain**, not fluency.

## The learning goal (north star for grading)
> Given a real business domain, should there be an agent — and if so, what does it own, where does
> it stop, and is it worth building? Every lesson ladders back to drawing that boundary and sizing
> that bet.

## Lesson arc — checklist (flagship done, rest planned)
- **0001 — The design method (THIS, flagship, DONE-as-plan):** the blueprint itself. Boundary,
  tool surface, blast radius, approval gates, HITL, ROI, build-vs-buy. The lens for 0002–0007.
- **0002 — Billing agent (PLANNED):** money = irreversible writes; heavy approval gates,
  tightest blast-radius discipline. Instantiates the 9-part template + build-vs-buy.
- **0003 — Support agent (PLANNED):** deflection-vs-escalation, read-heavy, customer-facing tone
  and refusal design. 9-part template + build-vs-buy.
- **0004 — Engineering agent (PLANNED):** code/PR/CI domain; ties to `../ai-agents` coding-agent
  work. 9-part template + build-vs-buy.
- **0005 — SRE agent (PLANNED):** on-call/incident domain; runbook analogy, high-blast-radius
  remediations behind gates. 9-part template + build-vs-buy.
- **0006 — Product-manager agent (PLANNED):** synthesis/prioritization, low-write/high-judgment;
  HITL as the default. 9-part template + build-vs-buy.
- **0007 — Research agent (PLANNED):** open-ended retrieval loop, source trust, citation
  discipline; ties to `../context-engineering`. 9-part template + build-vs-buy.

## Delivery decisions
- Same "one flagship lesson first" ritual as `../context-engineering`: approve 0001's style, THEN
  batch-build 0002–0007 to match. EPUB build deferred until the lesson set is approved.
- New track accent token to add: `--track-domain-agent` (pick a hue distinct from the other tracks;
  recommend a green/teal family, theme-aware light/dark) — wire in `tokens.css` before first lesson.

## Future sessions / ZPD
- After style approval: build 0002–0007 + reference sheets (blueprint cheat sheet + a
  design-review checklist), then the EPUB ritual + hub card/stats update.
- Judgment drill: hand the learner an unseen domain (e.g. "procurement agent") and have them
  instantiate the 9-part blueprint cold, then grade the boundary and the build-vs-buy call.
- Only write learning-records on demonstrated recall, not coverage.
