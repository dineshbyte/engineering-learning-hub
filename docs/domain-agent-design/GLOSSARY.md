# Glossary — Domain Agent Design

Covers Lessons 0001–0007. Shared AI terms are reused verbatim from `../ai-agents` /
`../context-engineering` so vocabulary never drifts; track-new terms are defined once, crisply.

## Shared AI foundations (reused verbatim)
- **LLM** — the reasoning model (the brain in a jar); predicts tokens, has no memory/tools/actions
  on its own.
- **Tool** — a callable capability/API/function the model can invoke.
- **Agent** — an LLM using tools in a loop to accomplish a goal.
- **Agent loop** — observe → think → act → repeat.
- **Runtime** — the orchestration layer around the model (loop, state, tool execution, retries, limits).
- **Workflow vs agent** — developer-defined path (workflow) vs model-influenced path (agent).
- **MCP** — a protocol exposing tools/resources/prompts to AI clients (USB-C for tools).
- **Context engineering** — curating the window before the model runs.
- **RAG** — retrieve → assemble → LLM → answer.
- **Memory** — persisted state reachable only by retrieval into the context window.

## Domain Agent Design (this track)
- **Domain agent** — an agent scoped to one business domain (billing, support, SRE, …) with a
  defined goal, a fixed tool surface, and an owner. Not a general assistant: it does one job, and
  its boundary is the design artifact, not the model.
- **Responsibility boundary** — the explicit line between what the agent decides/acts on and what it
  must defer, escalate, or refuse. The agent's "API contract": inputs it accepts, actions it owns,
  things outside its remit. Drawn before any tool is wired.
- **Tool surface** — the set of tools (and their argument/return shapes) the agent can invoke. The
  surface *is* the agent's reach: every tool added widens both capability and blast radius. Smallest
  surface that covers the job.
- **Approval gate** — a checkpoint where an action pauses for explicit authorization (human or
  policy) before it executes. The valve between "agent proposed" and "system did." Placed on actions
  whose blast radius exceeds the agent's trusted autonomy.
- **Human-in-the-loop (HITL)** — a design where a human reviews, approves, or corrects agent
  actions inside the loop, not after the fact. The dial between full autonomy and full manual; set
  per action by risk, not globally.
- **ROI (for agents)** — the value the agent returns versus its all-in cost: tokens + tool calls +
  human-review time + failure/cleanup cost, against deflected human work. An agent that needs review
  on every action often costs more than the human it replaced; ROI is the build-or-kill test.
- **Build-vs-buy** — the decision to build the agent in-house vs adopt a platform/SaaS. Default for
  domain agents: buy the runtime/model/tool plumbing, build the domain glue (boundary, tools,
  policies) that no vendor can know.
- **Blast radius (of an agent action)** — the worst-case scope of damage if a single action is
  wrong, malicious, or repeated. Read-only query vs irreversible write vs fan-out to many records.
  Sizing it drives where approval gates and refusals go.
