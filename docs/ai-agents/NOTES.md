# Notes — teaching preferences for AI Agents

## Learner profile
- Senior Lead Engineer / VP Engineering. Strong backend / distributed-systems / SaaS background.
- Comfortable with: Laravel, SOA, AWS, Kubernetes, CI/CD, queues, microservices, API design.
- Has just completed a REST-API mastery track in the sibling workspace (`../rest-api`).

## How they want to be taught (stated explicitly)
- **Dependency order, no skipping.** Do not introduce a term until the previous one is owned.
- **Engineering analogies over academic explanation.** Always give a software-engineering analogy.
- **Per-concept template, every time:** Simple definition · Why it exists · Real-world analogy ·
  SWE analogy · Common misconceptions · One-sentence memory rule.
- **ASCII diagrams, liberally.** Vertical pipelines (User ↓ Agent ↓ Tool ↓ Service ↓ DB) land well.
- **Map every concept to an employee role** (Coding agent → Software Engineer, etc.).
- **"Memory Check" after every section** — recall questions, no clues in formatting.
- **Goal is reconstruction from memory, not fluency.** Build storage strength, not just recall-in-the-moment.
- **VISUAL-FIRST, not paragraph-heavy** (stated 2026-06-19). Lessons should be infographics with a voice:
  hero diagram, SVG/ASCII visuals, comparison tables, definition cards, interactive reveals — prose only
  as captions. This is now baked into the global `/teach` skill too; honour it in every lesson here.
- **Always include REAL USE CASES + INTERVIEW QUESTIONS** (stated 2026-06-19). Every lesson should ground
  the concept in concrete real-world usage and end with interview-style questions (click-to-reveal answer
  checklists) — doubles as retrieval practice and fits the decision/interview-readiness mission.

## Delivery decisions made
- This is a comprehensive first-principles curriculum, so Lesson 0001 covers ALL 10 levels as one
  coherent build-up (the user explicitly asked for the full sequence + cheat sheet + review guides).
  This is an exception to the usual "one tiny thing per lesson" rule — justified by the explicit request.
- The durable artifacts they'll revisit are `reference/agents-cheat-sheet.html` (cheat sheet + buzzword
  table + master diagram + 5-min/30-min review guides) and `GLOSSARY.md`.

## Future sessions / zone of proximal development
- Next: convert passive reading into storage strength. Interleaved retrieval drills that MIX levels
  (e.g. "runtime vs memory", "workflow vs agent", "tool vs MCP") spaced a few days apart.
- A "place this product on the workflow↔agent spectrum" judgment drill using real vendor pitches.
- A design exercise: spec the tool registry + guardrails for one archetype (e.g. an SRE agent).
- Possible later mission extension: designing/leading an agent build at their company (would change scope).
