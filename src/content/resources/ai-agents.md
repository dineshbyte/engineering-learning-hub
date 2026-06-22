---
title: "AI Agents Resources"
---
# AI Agents Resources

Curated, high-trust sources for the AI-agents mental models in this workspace. Knowledge in the
lessons is drawn from here, not from parametric guesses.

## Knowledge

- [Article: "Building effective agents" — Anthropic Engineering](https://www.anthropic.com/engineering/building-effective-agents)
  The canonical, vendor-neutral framing. Defines the **augmented LLM** (LLM + retrieval + tools +
  memory), and the **workflow vs agent** distinction used throughout Level 7. Strong "start simple,
  add complexity only when it pays" guidance. Use for: Levels 1–7. Read this first.

- [Article: "How we built our multi-agent research system" — Anthropic Engineering (Jun 2025)](https://www.anthropic.com/engineering/multi-agent-research-system)
  Real-world orchestrator-worker case study: lead agent + 3–5 parallel subagents, ~15× the tokens of
  a chat, 90.2% better than single-agent on their research eval. Use for: Level 9 (multi-agent),
  and the "don't reach for multi-agent too early" trade-off.

- [Docs: Model Context Protocol — modelcontextprotocol.io](https://modelcontextprotocol.io)
  Primary source for MCP. "A USB-C port for AI applications." Defines the open standard, MCP
  **servers** (expose tools/data/prompts) and **clients** (connect from the host app). Use for: Level 8.
  Architecture deep-dive: <https://modelcontextprotocol.io/docs/learn/architecture>.

- [Docs: Anthropic — Tool use (function calling)](https://docs.claude.com/en/docs/build-with-claude/tool-use/overview)
  How tool calling actually works on the wire: you advertise tools with JSON-schema, the model
  returns a structured `tool_use` request, your code runs it and returns a `tool_result`. Use for:
  Level 2. (OpenAI's equivalent "function calling" guide is an alternative second source.)

- [Docs: Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview)
  The runtime/loop made concrete — the harness that holds history, dispatches tools, enforces limits.
  Use for: Levels 4–6 (agent loop, runtime, memory) when you want to see the loop in code.

## Stage 2 sources

- [Docs: Claude Code — Anthropic](https://docs.anthropic.com/en/docs/claude-code)
  Canonical source for how Claude Code works: read-on-demand tool use, filesystem/bash/git tools,
  planning mode, MCP server connections. Use for: Module 4 (how Claude Code works).

- [Docs: Cursor — cursor.com/docs](https://cursor.com/docs)
  Primary source for Cursor's architecture: codebase indexing (embeddings), retrieval, context
  assembly, agent mode. Covers documented behavior only — no proprietary internals. Use for: Module 5.

- [Spec: Model Context Protocol — modelcontextprotocol.io](https://modelcontextprotocol.io)
  Canonical MCP spec: Tools (invocable functions), Resources (URI-addressed data), Prompts (templates),
  transports (stdio, SSE, WebSocket), server/client lifecycle, tool discovery. Use for: Module 6.

- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
  The authoritative list of LLM/agent security risks — prompt injection (#1), insecure tool invocation,
  data exfiltration via agents. Use for: Module 8 (production security).

## Wisdom (Communities)

- [r/LocalLLaMA](https://reddit.com/r/LocalLLaMA) and [r/AI_Agents](https://reddit.com/r/AI_Agents)
  High-volume practitioner discussion. Use for: sanity-checking vendor claims, seeing what breaks in
  production. Filter hard — signal-to-noise is mixed.
- [MCP community / GitHub discussions](https://github.com/modelcontextprotocol)
  Use for: how teams actually expose and consume tools; reference server implementations to read.
- Not yet selected: a high-signal, low-hype venue for *engineering-leadership* discussion of agents
  (architecture, build-vs-buy). See Gaps.

## Gaps
- No single high-trust source yet for **agent evaluation / reliability in production** (how you'd
  prove an agent is safe to ship). Mission lists eval as out-of-scope for now, but a VP will need it
  soon — flag for a future search.
- No vetted leadership-level community found yet (most venues skew IC/hobbyist or pure hype).
