# Resources — high-trust sources for Domain Agent Design

Ground every non-obvious claim in these; cite inline (`<sup>` → `#sources`). Populated before
teaching. Prefer primary sources (vendor engineering, papers) over secondary commentary. This
track is *design discipline*, so several sources are internal Engineering Vault tracks the learner has
already built — cross-link, don't re-teach.

## Primary specs / docs
- **Anthropic — "Building effective agents"** (anthropic.com/research/building-effective-agents).
  Why it matters: the spine for *when to build an agent at all*. Workflow vs agent, "start with the
  simplest thing," agents trade latency/cost for autonomy. Every domain blueprint starts here.
- **Anthropic — "Writing effective tools for AI agents"** (anthropic.com/engineering/writing-tools-for-agents).
  Why it matters: tool surface design — how many tools, naming, error shapes. Directly feeds the
  "tool surface" and "responsibility boundary" parts of each blueprint.
- **Anthropic — "Effective context engineering for AI agents"** (anthropic.com/engineering/effective-context-engineering-for-ai-agents).
  Why it matters: the context layer each domain agent depends on; cross-links to `../context-engineering`.
- **Anthropic — Claude tool-use / Claude documentation** (docs.anthropic.com).
  Why it matters: the concrete tool-definition + tool-result loop that every domain agent runs on.
- **OWASP — Top 10 for LLM Applications** (owasp.org).
  Why it matters: blast radius and approval-gate design. Excessive agency, prompt injection, and
  insecure tool use are the failure modes a domain agent's boundary must contain.

## Papers & deeper reading
- **Yao et al., 2022 — "ReAct: Synergizing Reasoning and Acting in Language Models"**
  (arXiv:2210.03629). Why it matters: the reason-then-act loop underneath every domain agent;
  grounding actions in observations is what makes a domain agent more than a chatbot.
- **Engineering Vault — `../ai-agents`** (internal track). Why it matters: prerequisite. LLM, tool, agent,
  agent loop, runtime, memory, MCP. Lesson 0004 (`0004-agent-systems-and-production.html`) introduces
  *business agent* archetypes; this track turns that into a repeatable design discipline.
- **Engineering Vault — `../context-engineering`** (internal track). Why it matters: prerequisite. How each
  agent's context is selected/retrieved/assembled — the layer this track designs *around*, not *in*.
- **Build-vs-buy / SaaS framing** (general engineering literature; e.g. Martin Fowler on capability
  vs commodity, martinfowler.com). Why it matters: most domain-agent decisions are buy-the-platform,
  build-the-domain-glue. The ROI and build-vs-buy parts of each blueprint lean on this.

## Notes on trust
- Vendor blogs describe *their* product's current strategy; treat product specifics (model names,
  limits, exact tool conventions) as version-dependent and verify against current docs before
  teaching as fact.
- ROI and cost numbers are illustrative. Teach the *shape* of the trade-off (cost per action vs
  human cost, deflection rate, blast radius) and hedge concrete figures as "at time of writing."
- The two internal tracks are the source of truth for shared terms — reuse their definitions
  verbatim so vocabulary never drifts across tracks.
