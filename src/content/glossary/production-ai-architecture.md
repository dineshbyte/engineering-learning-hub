---
title: "Glossary — Production AI Architecture"
---
# Glossary — Production AI Architecture

Covers the production-review methodology. Grouped by where each term first lands. Shared AI terms
reuse the canonical hub definitions verbatim so they never drift across tracks.

## Shared foundations (carried in from `../ai-agents` and `../context-engineering`)
- **LLM** — the reasoning model (the brain in a jar); predicts tokens, has no memory/tools/actions
  on its own.
- **Tool** — a callable capability/API/function the model can invoke.
- **Agent** — an LLM using tools in a loop to accomplish a goal.
- **Agent loop** — observe → think → act → repeat.
- **Runtime** — the orchestration layer around the model (loop, state, tool execution, retries,
  limits).
- **Workflow vs Agent** — developer-defined path (workflow) vs model-influenced path (agent).
- **MCP** — a protocol exposing tools/resources/prompts to AI clients (USB-C for tools).
- **Context engineering** — curating the window before the model runs.
- **RAG** — retrieve → assemble → LLM → answer.
- **Memory** — persisted state reachable only by retrieval into the context window.

## Reliability & degradation (L1–L3)
- **Reliability (for AI)** — the probability the system returns a *useful, correct-enough* answer
  within budget under real load and partial failure. Not "the model is up" — the model being up but
  slow, rate-limited, or hallucinating is still an outage to the user.
- **Graceful degradation** — keeping the system useful as components fail or saturate, by shedding
  quality before availability: shorter context, smaller model, cached/templated answer, or an honest
  "I can't do that right now" instead of a 30s hang or a wrong answer.
- **Fallback model** — a cheaper/faster/more-available model (or a non-AI code path) you route to
  when the primary is rate-limited, timing out, or down. The AI equivalent of a read replica or a
  static cached page.
- **Token budget** — the per-request ceiling on input+output tokens you'll spend, set by cost,
  latency, and the context window. The capacity-planning unit of an AI system; you provision and
  bill in tokens the way you provision CPU and bill in requests.

## Observability & control (L2)
- **AI observability** — being able to answer "what did the system do and why" from telemetry, on
  three signals: the **trace/span** (the full agent-loop call tree — model calls, tool calls,
  retrievals, latency, tokens), the **eval signal** (was the output correct/grounded/safe, scored
  offline on a golden set or online from production), and cost/usage. Logs/metrics/traces plus a
  quality axis classic systems don't have.
- **Governance** — the rules and controls deciding which models, data, tools, and prompts are
  allowed, by whom, for what — and the enforcement that makes those rules real (NIST RMF: GOVERN /
  MAP / MEASURE / MANAGE). The change-management and access-control layer for AI behaviour.
- **Auditability** — the ability to reconstruct, after the fact, exactly what a given AI decision saw
  and did: the prompt, retrieved context, model+version, tool calls, and output, tied to a request
  ID and retained. "Show me what the agent did for ticket #4471 last Tuesday" must be answerable.

## Multi-tenancy, platform & capacity (L3, L5–L6)
- **Multi-tenancy** — one AI system serving many isolated customers/teams from shared
  infrastructure, with per-tenant isolation of data (retrieval scoped by tenant), cost (per-tenant
  token budgets/metering), and blast radius (one tenant's load or prompt-injection can't reach
  another's). The SaaS isolation problem with a context-window twist.
- **Agent platform** — the shared substrate teams build agents *on*: the runtime, tool registry,
  context/memory services, model gateway, eval harness, and observability — so each team doesn't
  rebuild the loop, retries, and telemetry. The internal-developer-platform pattern applied to AI
  (Claude Code, Cursor, enterprise agent platforms).
- **Inference capacity planning** — sizing for AI load: tokens/sec and concurrent requests against
  provider rate limits or self-hosted GPU memory (KV-cache grows with context length × concurrency),
  with queueing, batching, and admission control. The AI analogue of connection-pool and
  thread-pool sizing — get it wrong and you get latency cliffs, not graceful slowdown.
