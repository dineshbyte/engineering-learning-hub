---
title: "Glossary — Advanced AI Systems"
---
# Glossary — Advanced AI Systems

Covers Lesson 1 (the rest of this track is in progress). Grouped by where each term first lands. Shared AI terms are reused verbatim
from the canonical set so they don't drift across tracks; track-new terms follow.

## Shared foundations (carried in from `../ai-agents` and `../context-engineering`)
- **LLM** — the reasoning model (the brain in a jar); predicts tokens, has no memory/tools/actions
  on its own.
- **Tool** — a callable capability/API/function the model can invoke.
- **Agent** — an LLM using tools in a loop to accomplish a goal.
- **Agent Loop** — observe → think → act → repeat.
- **Runtime** — the orchestration layer around the model (loop, state, tool execution, retries,
  limits).
- **Workflow vs Agent** — developer-defined path (workflow) vs model-influenced path (agent).
- **MCP** — a protocol exposing tools/resources/prompts to AI clients (USB-C for tools).
- **Context Engineering** — curating the window before the model runs.
- **RAG** — retrieve → assemble → LLM → answer.
- **Memory** — persisted state reachable only by retrieval into the context window.

## Multi-agent & orchestration (L1)
- **Multi-agent system** — multiple agents (each its own LLM + tools + context) working on one goal,
  coordinating by passing messages or results. The distributed-systems version of an agent: more
  throughput on parallel work, at the cost of coordination.
- **Orchestrator-worker** — one lead agent decomposes the task and delegates sub-tasks to worker
  agents, then synthesizes their results. The scatter-gather / fan-out-fan-in pattern; the lead owns
  planning and integration, workers own isolated sub-problems.
- **Agent swarm** — many peer agents with no central orchestrator; behavior emerges from local
  interactions and shared environment/state. Maximizes parallelism and decoupling, but trades away
  predictability and makes failures hard to attribute.
- **Coordination overhead** — the extra tokens, latency, and failure surface spent getting agents to
  agree, hand off, and not duplicate work. The tax every multi-agent design pays; if the task isn't
  genuinely parallel, this tax exceeds the benefit (the central anti-pattern of the track).

## Adapting models: fine-tuning & distillation (L2)
- **Fine-tuning** — continuing training on a base model with your own examples to change its weights
  (style, format, narrow-domain behavior). Bakes knowledge into the model; expensive to redo, and
  the wrong reach for facts that change (use retrieval for those).
- **Distillation** — training a small "student" model to imitate a larger "teacher" model's outputs,
  to get most of the quality at a fraction of the cost/latency. Compression of capability, not of
  data.

## Reasoning & inference-time compute (L3)
- **Reasoning model** — a model trained to produce extended internal reasoning (chains/trees of
  thought) before its final answer, trading more inference compute for better answers on hard,
  multi-step problems.
- **Test-time compute** — spending more compute at inference (longer reasoning, sampling several
  attempts, search over paths) to raise answer quality without retraining. The "think longer for
  this hard one" knob; cost and latency scale with it.

## Long-horizon & autonomy (L4–L5)
- **Long-horizon agent** — an agent that pursues a goal across many steps or a long elapsed time,
  where context budget, memory, and error accumulation dominate the design (one bad step compounds).
- **Autonomous system** — an AI system that acts on the world with little or no human in the loop;
  the design problem shifts from accuracy to blast radius, guardrails, reversibility, and audit.
