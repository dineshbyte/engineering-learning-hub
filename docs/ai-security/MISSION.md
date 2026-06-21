# Mission: AI Security from First Principles

## Why
As a Senior Lead / VP Engineering I now ship agents that read untrusted content and call real tools
on real data. The question I must answer cold is: **once an LLM can both ingest attacker-controlled
text and take actions, where does it break, and what stops the blast radius?** The uncomfortable
truth is that the LLM cannot reliably separate data from instructions — so the security model can't
live in the prompt. It has to live in the architecture: scoped tools, tenant-scoped retrieval,
egress control, least privilege, assume-breach. I want durable threat-modeling instincts for the
whole agent stack, so I can review a design and name the exfiltration path before an attacker does —
not memorize a checklist of attack names.

## Success looks like
- I can draw the agent stack with its **trust boundaries** and point to where untrusted text becomes
  an action — and what control sits on each boundary.
- I can explain **direct vs indirect prompt injection** and why "tell the model to ignore injected
  instructions" is not a control.
- I can name the **OWASP LLM Top 10** categories from memory and map a given design's risks onto them
  (plus when to reach for NIST AI 100-2 / MITRE ATLAS framing).
- I can design **least-privilege tool access, egress allowlists, and tenant-scoped retrieval** for a
  multi-tenant agent and reason about the residual risk each leaves.
- I can trace a **data-exfiltration path** end-to-end (injection → tool → outbound channel) and say
  which layer breaks it.
- I can run a **red-team pass** on an agent design and produce a threat catalog mapped to controls.

## Constraints
- Engineering analogies first: confused deputy, SSRF/egress firewalls, SQL injection, IAM least
  privilege, untrusted input at a trust boundary, blast-radius / assume-breach. Security framing the
  way a backend engineer already thinks, applied to the agent stack.
- Visual-first: hero diagram of the stack + trust boundaries, attack-path SVGs, before/after
  control tables, definition cards. Prose only as captions. 60–70% of each lesson is visual.
- Per-concept template every time: simple explanation · deep explanation · engineering analogy ·
  common misconceptions · one-sentence memory rule.
- Every lesson ends in retrieval practice + interview questions (click-to-reveal).
- Defense framing: no control is presented as complete. Always layered, always residual risk named.

## Out of scope (for now)
- Model alignment / RLHF training internals (we treat alignment as a soft filter, a given, not a
  thing we build).
- Adversarial-ML math (gradient attacks, perturbation bounds) beyond the threat-model intuition.
- General appsec/cloud security not specific to the LLM/agent surface (covered elsewhere).
- Compliance/regulatory frameworks (GDPR/SOC2 mechanics) beyond where they touch data leakage.

## Sibling tracks
- **`../context-engineering`** — lesson 0009 introduces indirect prompt injection and multi-tenant
  ACL *at the context layer* (treat retrieved content as untrusted; enforce ACL in the retrieval
  query). **This track is the dedicated security deep-dive across the whole agent stack** — it picks
  those two ideas up and extends them through tools, egress, MCP, and supply chain. Start there for
  the context-layer view; come here for the end-to-end attacker view.
- **`../ai-agents`** — the runtime, tools, agent loop, and MCP this track secures. Prerequisite.
- Other phases in the program: **`../ai-evaluation`**, **`../ai-infrastructure`**,
  **`../advanced-ai-systems`**, **`../production-ai-architecture`**, **`../domain-agent-design`**.
  Security is the layer that runs *across* all of them.
