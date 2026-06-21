# Mission: Domain Agent Design

## Why
I know what an agent *is* (`../ai-agents`) and how to feed it context (`../context-engineering`).
The unanswered question for a Senior Lead / VP Eng is the next one: **given a real business domain —
billing, support, on-call, PM work — should there be an agent here, what exactly does it own, and
where does it stop?** That is a *design* decision, not a model decision. Most failed agent projects
didn't pick the wrong model; they drew the wrong boundary, handed the agent too large a tool
surface, or skipped the approval gate on an irreversible action. This track turns "build an agent"
into a repeatable design discipline with a per-domain blueprint.

## Success looks like
- I can decide, with a defensible argument, **whether a given domain should get an agent at all** —
  and when a workflow or plain software is the right call instead.
- I can draw an agent's **responsibility boundary** on a whiteboard: inputs it accepts, actions it
  owns, what it defers or refuses.
- I can size an action's **blast radius** and place **approval gates / human-in-the-loop** where the
  risk demands it — not uniformly.
- I can design the **tool surface** for a domain agent: the smallest set of tools that covers the
  job, with safe argument/return shapes.
- I can run the **build-vs-buy** call and the **ROI** math (token + tool + review cost vs deflected
  human work) and say build, buy, or don't.
- I can take a new domain I've never seen and instantiate the blueprint cold.

## Constraints
- Engineering analogies first (service boundaries, API contracts, IAM/least-privilege, blast radius,
  canary/rollback, on-call runbooks). Academic framing only when unavoidable.
- Visual-first: hero diagram + SVG/ASCII visuals + comparison tables + definition cards. Prose only
  as captions. 60–70% of each lesson is visual.
- Per-concept template every time: simple explanation · deep explanation · engineering analogy ·
  common misconceptions · one-sentence memory rule. Each *agent* lesson also runs a 9-part design
  template + an explicit build-vs-buy call.
- Every lesson ends in retrieval practice + interview questions (click-to-reveal).
- Optimize for long-term retention and transfer to unseen domains over completeness.

## Out of scope (for now)
- Re-teaching agent internals or context engineering (covered by the sibling tracks; cross-link).
- Vendor-specific framework tutorials (LangGraph/CrewAI call signatures).
- Model selection / eval metrics beyond the cost-and-risk shape that drives a design decision.
- MLOps, fine-tuning, and prompt-tuning craft.

## Sibling tracks
- **`../ai-agents`** — prerequisite. LLM, tool, agent loop, runtime, memory, MCP. Lesson 0004
  (`0004-agent-systems-and-production.html`) introduces **business agent** archetypes; **this track
  turns that introduction into a design discipline with per-domain blueprints.** Start there if the
  agent loop isn't second nature.
- **`../context-engineering`** — prerequisite. How each domain agent's context window is selected,
  retrieved, and assembled. This track designs *around* that layer, not inside it.
- **Other Phase 5–10 tracks** — the broader curriculum these two anchor (`../rest-api` and the
  remaining phase tracks as they ship). Domain Agent Design is **Phase 9**: applying everything the
  earlier phases taught to real business domains.
