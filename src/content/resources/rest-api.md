---
title: "REST API Resources"
---
# REST API Resources

All URLs below were fetched and confirmed live during curation. High-trust only:
primary specs, original authors, industry-standard design guides, canonical
exemplar APIs.

## Knowledge

### API design & architecture
- [Fielding Dissertation, Ch. 5 — Representational State Transfer](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm)
  The primary source: REST's six architectural constraints, defined by the person
  who coined REST. Use for: answering "what *actually* makes an API RESTful" and
  HATEOAS from first principles. (Author's own copy; the common `ics.uci.edu`
  mirror currently has a TLS cert error.)
- [Richardson Maturity Model — Martin Fowler](https://martinfowler.com/articles/richardsonMaturityModel.html)
  Levels 0–3 (resources → verbs → hypermedia). Use for: framing REST maturity in
  interviews and arguing where the pragmatic bar sits. **Primary read for Lesson 1.**
- [RFC 9110 — HTTP Semantics (IETF, 2022)](https://www.rfc-editor.org/rfc/rfc9110.html)
  The authoritative, current spec for methods, status codes, conditional requests.
  Use for: definitive wording on semantics (obsoletes RFC 7231).
- [MDN — HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
  The safe / idempotent / cacheable matrix per method. Use for: fast, correct
  recall of GET/PUT/PATCH/DELETE semantics under pressure.
- [Microsoft Azure — Web API Design Best Practices](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)
  Vendor-neutral house-style checklist (resource modeling, filtering, pagination,
  versioning, async ops); updated 2025. Use for: designing endpoints to a standard.
- [Google API Improvement Proposals (AIP)](https://google.aip.dev/)
  Living, versioned design standard (resource-oriented design, standard methods,
  long-running ops, error model). Use for: rigorous conventions at scale; RPC vs.
  resource-oriented contrast.

### Security & production
- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
  Canonical API-specific risks (BOLA, broken auth, BOPLA, resource consumption,
  SSRF…). Use for: security/threat-modeling questions and hardening review.

### Hands-on / exemplar APIs
- [Stripe API Reference](https://docs.stripe.com/api) · [Idempotent requests](https://docs.stripe.com/api/idempotent_requests)
  Gold-standard real-world design: clean resources, error format, expandable
  objects, and the `Idempotency-Key` pattern. Use for: studying production
  idempotency, pagination, versioning done right.
- [GitHub REST API docs](https://docs.github.com/en/rest) · [Pagination](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
  Link-header + cursor pagination, rate limiting, date-based versioning,
  ETags/conditional requests. Use for: comparing pagination strategies at scale.

### Books
- [Designing Web APIs — Jin, Sahni, Shevat (O'Reilly, 2018)](https://www.oreilly.com/library/view/-/9781492026914)
  Best single general-purpose API design book for a senior; ages well. Case
  studies from Slack, Stripe, GitHub. Use for: design, auth, pagination, scaling, DX.
  _Skip as primaries:_ *REST API Design Rulebook* (2011, pre-RFC 9110, dated);
  *Web API Design* (Apigee) — subsumed by the Azure + Google guides above.

## Wisdom (Communities)
- [APIs You Won't Hate](https://apisyouwonthate.com/)
  Active 2025/26 (newsletter, podcast, members' Slack); founded by Phil Sturgeon.
  Use for: current, opinionated senior-level discussion (OpenAPI, versioning,
  hypermedia, JSON streaming).
- [Google AIP repo](https://github.com/aip-dev/google.aip.dev)
  A living standard debated in public PRs/issues. Use for: watching seasoned
  engineers argue design trade-offs in writing.

## Gaps
- **Reddit (r/api, r/ExperiencedDevs):** could not verify activity/moderation to a
  high-trust standard (crawler blocked). Sanity-check manually before relying on them.
- **Open vendor-neutral Discord/Slack:** thin. Only verified live chat community is
  the (membership-gated) APIs You Won't Hate Slack.
