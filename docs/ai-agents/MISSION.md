# Mission: AI Agents from First Principles

## Why
As a Senior Lead / VP Engineering, I make build-vs-buy, where-to-invest, and team-structure
decisions about AI agents — and I need to tell what is real from what is hype in vendor pitches,
team proposals, and architecture reviews. I want durable mental models I can reconstruct from
memory months later, not a vocabulary of buzzwords I'll forget.

## Success looks like
- I can derive every layer of an agent stack from scratch on a whiteboard, in dependency order
  (LLM → tool → agent → loop → runtime → memory → workflow/agent → MCP → multi-agent → archetypes).
- For any AI product pitch I can locate it on the workflow ↔ agent spectrum and name the trade-off it
  bought (predictability/cost/latency vs flexibility/autonomy).
- I can explain MCP, single- vs multi-agent, and the common agent archetypes to my team using
  backend/distributed-systems analogies they already trust.
- I can challenge "let's add more agents" the same way I'd challenge "let's add more microservices."

## Constraints
- Teach in strict dependency order; never introduce a term before the previous one is solid.
- Engineering analogies first (backend, distributed systems, APIs, Laravel, SOA, AWS, Kubernetes,
  CI/CD, SaaS). Academic framing only when unavoidable.
- Optimize for long-term retention over completeness — skip anything non-essential.
- Every concept ships with: definition, why it exists, real-world analogy, SWE analogy,
  misconceptions, one-sentence memory rule. ASCII diagrams throughout. Map concepts to employee roles.

## Out of scope (for now)
- Model training, fine-tuning, RLHF, transformer internals (how the brain is built — not needed to lead).
- Prompt-engineering tactics and framework tutorials (LangChain/LlamaIndex APIs).
- Eval methodology, cost optimization at the token level, GPU/infra economics.
