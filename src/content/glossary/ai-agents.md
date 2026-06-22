---
title: "AI Agents Glossary"
---
# AI Agents Glossary

The canonical language for this workspace. Every lesson and reference uses these terms. Definitions
say what a thing *is*, in dependency order, leaning on the engineering analogies the learner trusts.

## Core stack

**LLM (Large Language Model)**:
A stateless function that takes text in and predicts text out. No memory between calls, no side
effects, no hands. The "brain in a jar."
_Avoid_: AI, the model "knowing" things, a database.

**Tool**:
A function the LLM is allowed to *request* — declared by a name and a JSON-schema of parameters. The
model cannot run it; it only emits a structured call. The "hands."
_Avoid_: plugin, skill, capability (use "tool").

**Tool calling**:
The model emitting a structured request to invoke a tool (which the *runtime* then executes and feeds
the result back). The bridge from text-prediction to real-world effects.
_Avoid_: function calling (acceptable alias), the model "running" a tool.

**Agent**:
An LLM placed in a loop with tools and a goal, where the *model* decides which tools to call and in
what order until the goal is met. = Brain + Hands + Loop + Goal.
_Avoid_: a "smarter" LLM, AI assistant (too vague), bot.

**Agent loop**:
The control loop that runs an agent: **Observe → Think → Act → Repeat** until done or a limit is hit.
The reconciliation loop for *intent*.
_Avoid_: "the AI thinking in a loop" — the loop is plain code in the runtime, not inside the model.

**Agent runtime (harness)**:
The ordinary program that runs the loop: holds conversation state, calls the LLM, executes tool
calls, enforces limits/timeouts/retries, streams output. The app server around the brain.
_Avoid_: framework (a runtime may use one), "the agent itself."

**Memory**:
Whatever the runtime chooses to put back into the prompt, because the LLM is stateless.
*Short-term* = conversation history in the context window (RAM). *Long-term* = an external store the
runtime retrieves from and injects (disk). *Working memory* = the in-flight task scratchpad (current
plan, tool outputs, intermediate results) — exists only for the duration of the task.
_Avoid_: "the model remembers" — the runtime re-sends; the model never retains.

**Context window**:
The maximum amount of text (tokens) an LLM can read in one call. Working memory / RAM — bounded and
volatile; refilled by the runtime on every call.
_Avoid_: "the model's memory."

**Context engineering (retrieval)**:
The process of deciding *what* goes into the context window before each LLM call — retrieving, ranking,
assembling, and compressing content from a larger source (codebase, KB, conversation history). Often a
more important lever than model choice: wrong content in = wrong answer out regardless of model quality.
Analogous to the cache-fill strategy for the LLM's RAM.
_Avoid_: "RAG" as a synonym for all context engineering (RAG is one retrieval pattern, not the whole category).

## Control-flow spectrum

**Workflow**:
A system where the *developer* hardcodes the control flow; LLMs/tools are orchestrated through
predefined code paths. Predictable, cheap, testable.
_Avoid_: pipeline (a workflow may be one), "dumb automation."

**Agentic workflow**:
A hybrid — a mostly-predefined workflow with model-decided (agentic) steps embedded, or an agent
fenced in by workflow guardrails. A runbook with "use your judgment here" steps.
_Avoid_: using "agent" and "agentic workflow" interchangeably.

> In this workspace: **Workflow = the developer writes the if/else. Agent = the model writes the
> if/else.** Most production value is workflows; reach for full agents only when the path can't be
> predetermined.

## Integration

**MCP (Model Context Protocol)**:
An open standard for how agents discover and call tools (and fetch data/prompts) from external
systems. "A USB-C port for AI applications." Turns N×M bespoke integrations into N+M.
_Avoid_: "a Claude/Anthropic feature" (it's an open, multi-vendor standard), "the tool itself."

**MCP server**:
A process that exposes tools/data/prompts over the MCP protocol (e.g. a GitHub or database MCP
server). The peripheral / device.
_Avoid_: "the backend" (too vague).

**MCP client**:
The component inside the host app that connects to MCP servers, discovers their tools, and routes the
model's tool calls to them. The USB port / driver.
_Avoid_: "the agent" (the client is one part of it).

**Tool registry**:
The catalog of tools currently advertised to the model — built-in tools plus everything discovered
from connected MCP servers. Service discovery for tools.
_Avoid_: "the API list."

## Topology

**Single agent**:
One agent loop, one context, one tool registry handling the whole task. The monolith.
_Avoid_: "simple agent" (single ≠ simple).

**Multi-agent system**:
Several specialized agents coordinating — typically an orchestrator/lead agent delegating subtasks to
worker agents, then synthesizing. Microservices / orchestrator-worker for agents.
_Avoid_: "swarm" (loaded), assuming it always means parallel.

**Orchestrator (lead agent)**:
The agent that plans, fans work out to subagents, and synthesizes their results. The manager / map-reduce
coordinator.
_Avoid_: "master" — prefer orchestrator or lead.

**Subagent (worker)**:
A specialized agent with its own context and tools, spun up by the orchestrator for a scoped subtask.
_Avoid_: "thread" (it's a full agent, not a thread of execution).

## Production controls

**Loop cap (max iterations)**:
A hard limit on the number of agent loop iterations per session. The primary guard against infinite loops.
If exceeded: the runtime halts and returns an error. Not optional in production.
_Avoid_: relying on the LLM to self-terminate — it won't reliably.

**Token budget**:
A hard cap on the total tokens consumed per session or task. Controls cost. When hit: the runtime halts
(fail-fast preferred over silent truncation). For multi-agent: apply per-agent, not just per-session.
_Avoid_: "we'll optimize cost later" — token spend compounds with multi-agent and long loops.

**HITL (Human-in-the-loop)**:
A design pattern where a human approval gate is inserted before an agent can take an irreversible or
high-risk action (e.g. apply a charge, deploy to production, send an email). The oversight mechanism.
_Avoid_: assuming full autonomy is the goal — HITL is the responsible default for consequential actions.

**Least privilege (agent)**:
The principle that an agent should hold only the permissions it needs for its current task — no broader.
A read-only reporting agent should never have write access; a support agent should not have billing API
access. Limits blast radius when the agent makes a mistake.
_Avoid_: granting broad permissions "for flexibility" — this is how a demo becomes a production incident.

**Prompt injection**:
An attack where adversarial content inside a tool result (e.g. a webpage the agent fetched) contains
instruction-like text intended to override the system prompt. Defense: tag tool outputs as data, not
instructions; validate/sanitize tool outputs; instruct the model in the system prompt to ignore
instruction-like content in user/tool content.
_Avoid_: assuming only malicious users cause prompt injection — it can happen in any uncontrolled external content.

## Mental shorthand
- LLM = Brain · Tool = Hands · Agent = Brain + Hands + Loop · Runtime = the office around the worker
- Workflow = you choose the path · Agent = the model chooses the path
- MCP = USB-C for tools · Server = device · Client = port · Registry = catalog of what's plugged in
- Single agent = monolith · Multi-agent = microservices
- An archetype (coding / EA / support / SRE / billing agent) = the same engine + a different tool
  registry + a different job description.
