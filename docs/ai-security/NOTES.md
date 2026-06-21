# Notes — teaching preferences for AI Security

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background;
  already thinks in trust boundaries, IAM, least privilege, SSRF/egress, blast radius, confused
  deputy — just hasn't mapped them onto the agent stack yet.
- Has completed **`../ai-agents`** (LLM, tools, agent loop, runtime, memory, MCP) and
  **`../context-engineering`** (retrieval, RAG, and the L0009 intro to indirect injection +
  multi-tenant ACL). Do not re-teach those foundations; build on them.
- Entry rung: **Senior → Staff/Principal.** No hand-holding. Teach trade-offs, attack paths, and
  "name the failure mode, name the control, name the residual risk."

## How they want to be taught
- First principles, no buzzwords. The spine: an LLM cannot separate data from instructions, so
  security lives in the architecture, not the prompt. Every lesson ladders back to that.
- Engineering/security analogies first: confused deputy, SQL injection, SSRF + egress firewall, IAM
  least privilege, untrusted input at a trust boundary, assume-breach blast radius.
- Per-concept template every time: Simple · Deep · Engineering analogy · Misconceptions · Memory rule.
- VISUAL-FIRST infographics with a voice — hero stack-with-trust-boundaries diagram, attack-path
  SVG/ASCII, before/after control tables, definition cards, interactive reveals. Prose only as
  captions (global house style).
- Always REAL USE CASES + INTERVIEW QUESTIONS (click-to-reveal) — doubles as retrieval practice.
- Defense framing is non-negotiable: present controls as layered, never complete; always name the
  residual risk. Goal is reconstruction of attack→control reasoning from memory, not fluency.

## The learning goal (north star for grading)
> Once an LLM can both ingest attacker-controlled text and take actions, where does it break, and
> what stops the blast radius?
Every lesson should ladder back: the model can't separate data from instructions → push the control
into the architecture (scoped tools, tenant-scoped retrieval, egress allowlists, assume-breach).

## Dependency order (teach in this order; each lesson assumes the prior)
Threat model → injection (the root cause) → jailbreak/poisoning (bypassing & persistence) → tool
abuse/escalation (turning input into actions) → data leakage/multi-tenancy (the payoff attackers
want) → agent & MCP security (the protocol surface) → supply chain + red team (whole-system posture).

## Lesson arc — checklist
- **0001 — Threat model + prompt injection** *(FLAGSHIP, DONE)*: what we protect, trust boundaries,
  attacker capabilities; direct vs indirect injection; why the prompt can't be the control.
  **Cross-link `../context-engineering` L0009** (it introduces indirect injection + ACL at the
  context layer; this lesson generalizes it to the whole stack).
- **0002 — Jailbreaking & context poisoning** *(PLANNED)*: alignment as a soft filter; jailbreak
  techniques incl. transferable adversarial suffixes (GCG, Zou et al. 2023); poisoning the
  knowledge base / memory / tool results so the attack fires on a later turn.
- **0003 — Tool abuse & permission escalation** *(PLANNED)*: excessive agency; confused deputy;
  least privilege for tools; scoping tool rights to the calling user; the case for human-in-the-loop
  on high-impact actions.
- **0004 — Data leakage & multi-tenant security** *(PLANNED)*: exfiltration paths (response / tool
  call / outbound URL); tenant-scoped retrieval enforced in the data layer; egress allowlists;
  system-prompt and secret leakage.
- **0005 — Agent security & MCP security** *(PLANNED)*: securing the full loop; MCP-specific risks —
  malicious/untrusted servers, tool-description (tool-poisoning) injection, over-broad scopes,
  unauthenticated servers.
- **0006 — Supply-chain risks + red-team scenarios + threat catalog** *(PLANNED, capstone)*:
  dependency/model/data/tool supply chain; running a red-team pass; producing a threat catalog
  mapped to OWASP LLM Top 10 / MITRE ATLAS / NIST AI 100-2; plus the revision/interview toolkit.

## Delivery decisions
- **One flagship lesson first**: build 0001, get the house style approved, THEN batch-build 0002–0006
  to match (clone the locked style, as the context-engineering track did). EPUB build deferred until
  the lesson set is approved.
- New track accent token to add: `--track-ai-security` (pick a red/crimson family to read as
  "security"; light + dark variants in `assets/tokens.css`).
- Standard track CI before any PR: `check-broken-links.js` + `validate-content.js`; update
  `sitemap.xml` and `search-index.js` after adding pages.

## Future sessions / ZPD
- After style approval: build 0002–0006 + reference sheets (cheat sheet + threat-model/red-team
  review sheet), then the EPUB ritual + hub card.
- Storage-strength drills, interleaved across lessons: "direct vs indirect injection", "which layer
  stops exfiltration", "excessive agency vs least privilege", "is this a prompt fix or an arch fix?".
- Judgment drill: given an agent design, produce the threat catalog + name the highest-leverage
  missing control.
- Only write learning-records on demonstrated recall, not coverage.
