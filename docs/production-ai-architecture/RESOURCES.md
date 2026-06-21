# Resources — high-trust sources for Production AI Architecture

Ground every non-obvious claim in these; cite inline (`<sup>` → `#sources`). Populated before
teaching. Prefer primary specs and vendor engineering docs over secondary commentary. This track
is about running AI *as a production system*, so the spine is classic SRE / distributed-systems
material with the AI-specific layers (telemetry conventions, risk framework, cloud lens) bolted on.

## Primary specs / docs
- **Google — Site Reliability Engineering (the SRE Book)** (sre.google/books). The reliability
  vocabulary this whole track reuses: SLI/SLO/error budgets, graceful degradation, load shedding,
  toil, postmortems. AI doesn't get a new reliability theory — it inherits this one.
- **AWS — Well-Architected Framework: Generative AI Lens**
  (docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens). Reviews a GenAI workload across
  the six pillars (op-excellence, security, reliability, performance, cost, sustainability) and ships
  reference scenarios — including a *multi-tenant generative AI service*, which maps directly to L5.
- **OpenTelemetry — GenAI semantic conventions**
  (opentelemetry.io/docs/specs/semconv/gen-ai/). The standard attribute set for LLM/agent spans:
  model name, input/output token counts, tool calls, tool results. The "trace/span" half of L2's
  observability triad; treat it as the wire format so your telemetry isn't vendor-locked.
- **NIST — AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1, 2023)** (nist.gov/itl/
  ai-risk-management-framework). The GOVERN / MAP / MEASURE / MANAGE functions — the backbone of L2's
  governance + auditability material. See also the **Generative AI Profile (NIST AI 600-1, 2024)**.
- **OWASP — Top 10 for LLM Applications** (owasp.org). Production threat model: prompt injection,
  sensitive-info disclosure, excessive agency. Feeds the security cut of the review methodology.

## Papers & deeper reading
- **Kleppmann, M., 2017 — "Designing Data-Intensive Applications" (DDIA).** The reliability /
  scalability / maintainability framing and the failure-mode discipline (partial failure, retries,
  back-pressure, idempotency) that L1 ports onto an AI runtime. Not AI-specific; that's the point.
- **Beyer et al., 2016 — "Site Reliability Engineering" (O'Reilly / Google).** Companion to the
  free SRE Book above for the error-budget and on-call operational model.
- **Anthropic — "Building effective agents"** (anthropic.com/engineering). Workflow-vs-agent
  boundary and where production risk concentrates in an agent runtime (feeds L4).

## Notes on trust
- Cloud-vendor lenses describe best practices *for that vendor's stack* (Bedrock/SageMaker for AWS);
  take the architecture *shape* as portable, treat product specifics as version-dependent.
- The OTel GenAI conventions are still evolving — capturing prompt/completion *content* is opt-in and
  carries PII/cost weight. Teach the attribute taxonomy, verify exact attribute names against the
  current spec before quoting them as fact.
- Cost and capacity numbers (tokens/sec, $/Mtok, GPU memory) drift fast — teach the *model*
  (queueing, batching, KV-cache memory), give concrete numbers only as illustrative "at time of
  writing."
