# Glossary — AI Evaluation

Covers Lessons 1–7. Grouped by where each term first lands. Shared AI terms are reused verbatim
from the cross-track canon so vocabulary never drifts.

## Shared canon (carried in from `../ai-agents`)
- **LLM (large language model)** — the reasoning model (the brain in a jar); predicts tokens, has no
  memory/tools/actions on its own.
- **Tool** — a callable capability/API/function the model can invoke.
- **Agent** — an LLM using tools in a loop to accomplish a goal.
- **Agent Loop** — observe → think → act → repeat.
- **Runtime** — the orchestration layer around the model (loop, state, tool execution, retries, limits).
- **RAG (Retrieval-Augmented Generation)** — retrieve → assemble → LLM → answer.

## Foundations (L1)
- **Golden dataset** — a versioned, curated set of (input, expected-output / acceptance-criteria)
  cases used as the ground truth for offline evaluation. Small, hand-checked, and treated like test
  fixtures: it changes only by deliberate review, never silently.
- **Offline evaluation** — scoring the system against a fixed dataset (the golden set) *before*
  shipping. Reproducible, runs in CI, gates a deploy. Like a unit/integration test suite for AI
  behaviour: same inputs every run.
- **Online evaluation** — measuring quality on *live* production traffic. Two shapes:
  - **A/B** — split real users between the old and new system and compare outcome metrics. Users see
    the variant; you measure who does better.
  - **Shadow** — run the new system on real traffic in parallel but throw its output away (never
    shown to users); compare against the live system offline. No user risk, no live signal either.
- **Eval harness** — the runner that loads a dataset, executes the system per case, applies a
  grader, and aggregates scores into a report. The test framework for AI: dataset + runner +
  grader + report.

## Datasets & benchmarks (L2)
- **Benchmark** — a *shared, public* dataset + metric used to compare models/systems against each
  other (e.g. MT-Bench, HELM scenarios). A standardized exam; good for cross-model comparison, weak
  as a proxy for *your* task.
- **Benchmark contamination** — the benchmark's test data leaked into a model's training data, so a
  high score reflects memorization, not capability. Why a fresh, private golden set beats a public
  leaderboard for trusting a result.

## Human eval & judges (L3)
- **LLM-as-a-judge** — using an LLM to score or compare outputs (faithfulness, relevance,
  preference) in place of a human rater, so evaluation scales. Cheap and fast, but biased
  (position, verbosity, self-preference) and must be calibrated against human labels before you
  trust it.

## Task & tool success (L4)
- **Task success rate** — fraction of cases where the system achieved the user's actual goal
  (end-to-end, outcome-based), not whether individual steps looked plausible. The headline metric
  for an agent: did it get the job done.
- **Tool success rate** — for agents, the fraction of tool calls that were the right tool, with
  valid arguments, that succeeded. Decomposes a task failure into "wrong plan" vs "right plan,
  broken execution."

## Retrieval eval & hallucination (L5)
- **Hallucination rate** — fraction of outputs containing a claim not supported by the provided
  context or ground truth (unfaithful / fabricated). Measured against faithfulness/groundedness;
  the inverse of "every claim is grounded." (Retrieval-specific eval lives in `../context-engineering`
  L6.)

## Regression & continuous eval (L6)
- **Regression evaluation** — re-running the golden set on every change (prompt, model, retrieval,
  tool) to catch quality that silently *got worse*. The AI equivalent of a regression test suite:
  a green eval gates the merge.

(L7 — production evaluation pipelines — composes the above: golden-set regression in CI + shadow/
A/B online + judge scoring + dashboards/alerts. No new primitive terms.)
