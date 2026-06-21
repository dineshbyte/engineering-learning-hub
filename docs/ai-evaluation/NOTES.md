# Notes — teaching preferences for AI Evaluation

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background.
- Completed the AI-agents stack (`../ai-agents`): LLM, tools, agents, agent loop, runtime, memory,
  MCP, Claude Code / Cursor architecture.
- Completed `../context-engineering`: context-as-query, selection/retrieval, RAG, failure modes,
  and retrieval-eval (recall@k/precision@k/MRR/nDCG, RAGAS, golden sets, offline vs online) in L6.
- Entry rung: **Senior → Staff/Principal.** No Foundation hand-holding. Teach trade-offs, failure
  modes, "name the tension, pick a side." Assume they already think in test suites and CI gates.

## How they want to be taught
- First principles, no buzzwords. Durable engineering mental models, not academic eval theory.
- Test-suite / CI / regression / canary / A/B / SLO analogies first. The spine: **evaluation is the
  test suite for a non-deterministic system — the model is the part you can't unit-test.**
- Per-concept template every time: Simple · Deep · Engineering analogy · Misconceptions · Memory rule.
- VISUAL-FIRST infographics with a voice — hero diagram, SVG/ASCII, comparison tables, definition
  cards, interactive reveals. Prose only as captions (global house style).
- Always include REAL USE CASES + INTERVIEW QUESTIONS (click-to-reveal) — doubles as retrieval.
- Goal is reconstruction from memory, not fluency.

## Teaching rules
- **Dependency order.** Each lesson assumes only prior lessons in this track plus the two completed
  sibling tracks. Don't forward-reference.
- **Infographic-first.** Lead with the diagram; prose is caption.
- **Real use cases + interview questions every lesson.** Concrete systems (support agent, code
  assistant, RAG search, billing agent) — not toy examples.
- **Don't repeat retrieval-eval.** L5 cross-links `../context-engineering` L6 for the retrieval-
  metric internals; this track stays at the whole-system / agent altitude.

## The learning goal (north star for grading)
> How do I know an AI feature actually works — and that the next change didn't quietly make it worse?
Every lesson ladders back: turn fuzzy quality into a number you can gate, regress, and dashboard.

## Lesson arc — full checklist
- **0001 — Evaluation fundamentals + offline vs online** (THIS, flagship; mark DONE when built).
  Why demos lie; eval as the test suite for a non-deterministic system; eval harness anatomy;
  offline vs online (A/B vs shadow) and the risk/signal trade-off.
- **0002 — Golden datasets & benchmarks** (PLANNED). Building/versioning a golden set; public
  benchmarks vs your task; benchmark contamination and saturation.
- **0003 — Human eval & LLM-as-a-judge** (PLANNED). When humans, when judges; judge biases
  (position/verbosity/self-preference); calibrating a judge against human labels (Zheng 2023, G-Eval).
- **0004 — Task & tool success rate** (PLANNED). Outcome-based eval for agents; decomposing a task
  failure into plan vs execution; trajectory vs final-answer scoring.
- **0005 — Retrieval eval & hallucination detection** (PLANNED). Faithfulness/groundedness,
  hallucination rate; **cross-link `../context-engineering` L6** for the retrieval-metric deep dive.
- **0006 — Regression & continuous evaluation** (PLANNED). Eval in CI, gating merges, flakiness and
  false-alarm budgets, drift over time.
- **0007 — Production evaluation pipelines** (PLANNED, capstone). Compose it all: golden-set
  regression in CI + shadow/A/B online + judge scoring + dashboards/alerts; cost and ops.

## Delivery decisions
- **One flagship lesson first** — approve L1's style, THEN batch-build 0002–0007 to match (same
  pattern as `../context-engineering`). No EPUB / reference sheets until the lesson set is approved.
- New track accent token needed: register `--track-eval` in `docs/assets/tokens.css` (light + dark)
  before building L1's header chips; pick a hue not already used by a sibling track.

## Future sessions / ZPD
- After style approval: build 0002–0007 + reference sheets, then the EPUB ritual + hub card/links.
- Interleaved drills mixing this track with siblings (e.g. "offline vs shadow vs A/B", "task vs tool
  success", "judge bias vs human cost"), spaced a few days apart.
- Judgment drill: given a vendor's "our agent scores 95% on benchmark X" pitch, name what that does
  and doesn't tell you (contamination, task mismatch, no online signal).
- Only write learning-records on demonstrated recall, not coverage.
