# Glossary — AI Security

Covers Lesson 1 (the rest of this track is in progress). Grouped by where each term first lands. Shared AI terms are reused **verbatim**
from the canonical definitions so they never drift across tracks; track-new security terms follow.

## Shared foundations (reused verbatim from ai-agents / context-engineering)
- **LLM** — the reasoning model (the brain in a jar); predicts tokens, has no memory/tools/actions
  on its own.
- **Tool** — a callable capability/API/function the model can invoke.
- **Agent** — an LLM using tools in a loop to accomplish a goal.
- **Agent Loop** — observe → think → act → repeat.
- **Runtime** — the orchestration layer around the model (loop, state, tool execution, retries, limits).
- **MCP** — a protocol exposing tools/resources/prompts to AI clients (USB-C for tools).
- **Context Engineering** — curating the window before the model runs.
- **RAG** — retrieve → assemble → LLM → answer.
- **Memory** — persisted state reachable only by retrieval into the context window.

## Threat modelling & injection (L1)
- **Threat model** — a structured answer to: what are we protecting, who attacks it, how, and what
  we do about it (assets → trust boundaries → attacker capabilities → attack surface → controls).
  The same discipline you'd apply to any service, drawn for the agent stack.
- **Trust boundary** — the line where data crosses from one trust level to another (untrusted user
  input, retrieved web content, tool output → trusted runtime). Every boundary needs a control.
- **Prompt injection** — adversarial text that the model treats as *instructions* instead of *data*,
  overriding its intended behavior. The root cause is that prompts mix instructions and data in one
  channel with no separation (OWASP LLM01).
- **Direct prompt injection** — the attacker types the malicious instruction straight into the
  user input ("ignore previous instructions and …").
- **Indirect prompt injection** — the malicious instruction is hidden in content the model later
  *retrieves* (a webpage, document, email, database row, tool result) and then obeys. The dangerous
  one: the attacker never touches your prompt. (Greshake et al., 2023.)
- **Data vs instructions confusion** — the underlying flaw behind injection: an LLM has no built-in
  way to tell "content to reason about" from "commands to follow." Mitigations narrow the gap; none
  closes it.

## Jailbreaking & poisoning (L2)
- **Jailbreak** — input crafted to bypass the model's safety/alignment guardrails so it produces
  output it was trained to refuse (role-play framings, obfuscation, or optimized adversarial
  suffixes as in GCG, Zou et al. 2023). Alignment is a soft filter, not a security boundary.
- **Context poisoning** — planting malicious or false content where it will be retrieved into a
  future context window (poisoned docs in the knowledge base, a poisoned memory entry, a poisoned
  tool result), so the attack fires later, on someone else's turn. The persistent cousin of
  indirect injection.

## Tool abuse & privilege (L3)
- **Excessive agency** — giving the agent more capability, autonomy, or permission than the task
  needs, so a single compromise (injection/jailbreak) does outsized damage (OWASP). The agent
  equivalent of running every service as root.
- **Tool abuse** — an attacker steering the agent to invoke its legitimate tools toward malicious
  ends (delete records, send mail, transfer funds) via injected instructions.
- **Permission / privilege escalation** — an attacker getting the agent to act with rights beyond
  the requesting user's, by abusing tools the *agent* holds rather than rights the *user* has. The
  classic confused-deputy: the agent is the deputy with broad credentials.
- **Least privilege (for tools)** — each tool gets the minimum scope, and the agent runs with the
  minimum tool set, for the narrowest time, ideally scoped to the *calling user's* permissions. The
  single highest-leverage control in the agent stack.
- **Tool egress** — the outbound side: what a tool is allowed to send and where (network
  destinations, recipients, data fields). Controlling egress is how you stop a compromised agent
  from exfiltrating — allowlist destinations, never the open internet by default.

## Data leakage & multi-tenancy (L4)
- **Data exfiltration** — an attacker extracting data the model can see (other tenants' rows,
  secrets, PII, system prompt) out through any channel: the response, a tool call, an outbound URL.
  Injection + a network-capable tool is the canonical exfil path.
- **Multi-tenant isolation** — guaranteeing tenant A can never reach tenant B's data through the
  agent. Enforce in the *retrieval/tool layer* (scope every query by tenant before anything reaches
  the model); never rely on the prompt to keep tenants apart.
- **System-prompt leakage** — coaxing the model to reveal its instructions, tool list, or hidden
  config. Treat the system prompt as discoverable; never put secrets or access rules *only* there.

## Agent & MCP security (L5)
- **Agent security** — securing the whole loop: untrusted input → model decision → tool execution →
  outbound effects, with controls at each boundary (input handling, action authorization, egress).
- **MCP security** — the risks of the tool-exposure protocol: untrusted/malicious MCP servers, tool
  descriptions as an injection vector ("tool poisoning"), over-broad scopes, and unauthenticated
  servers. The supply chain reaches into the prompt via tool definitions.

## Supply chain & posture (L6)
- **Supply-chain risk** — compromise via dependencies you didn't write: model weights, training
  data, embeddings, third-party tools/MCP servers, prompt templates, plugins (OWASP). Same threat
  class as a poisoned npm package, new surfaces.
- **Red team** — an adversarial exercise that probes the system the way a real attacker would
  (injection, jailbreak, exfil, escalation) to find failures before production does.
- **Threat catalog** — the maintained inventory of the system's threats with likelihood, impact,
  and the control that addresses each — the artifact a review produces, mapped to OWASP/ATLAS.
- **Defense-in-depth** — layered, independent controls so no single bypass is catastrophic: scoped
  tools + egress allowlists + tenant-scoped retrieval + output filtering + monitoring + assume-breach
  blast-radius limits. The governing principle of the whole track: there is no single fix.
