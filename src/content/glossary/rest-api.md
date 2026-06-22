---
title: "REST API Glossary"
---
# REST API Glossary

Canonical language for this workspace. All lessons, references, and learning
records use these terms. Terms are promoted here once the user can use them
correctly — not on first exposure.

## Terms

**REST (Representational State Transfer)**:
An architectural *style* defined by a set of constraints — not a protocol, format,
or "JSON over HTTP". An API is RESTful only insofar as it honors the constraints.
_Avoid_: REST = JSON API, RESTful = uses HTTP verbs

**Architectural constraint**:
A rule REST imposes on a system (e.g. statelessness) that trades some freedom for a
system-wide property (scalability, visibility, evolvability).
_Avoid_: rule, requirement, feature

**Resource**:
The key abstraction in REST — any named thing worth referencing (a user, an order,
a collection). Identified by a URI; not the same as its stored row.
_Avoid_: object, record, endpoint

**Representation**:
A snapshot of a resource's state in some format (JSON, XML, HTML) transferred
between client and server. The client manipulates representations, never the
resource directly.
_Avoid_: response body, the JSON, the object

**Statelessness**:
Each request carries everything the server needs to process it; the server keeps no
client session state between requests. Enables horizontal scaling and visibility.
_Avoid_: stateless = no database, no cookies allowed

**Uniform interface**:
The constraint that all interaction follows the same generic contract (identified
resources, manipulation via representations, self-descriptive messages, HATEOAS).
What lets clients and servers evolve independently.
_Avoid_: consistent naming, standard endpoints

**HATEOAS (Hypermedia As The Engine Of Application State)**:
The part of the uniform interface where responses include links telling the client
what it can do next, so flow isn't hard-coded into the client.
_Avoid_: adding links for documentation, hypermedia = nice-to-have

**Richardson Maturity Model**:
A 0–3 scale grading how fully an API uses REST's ideas: L0 single endpoint, L1
resources, L2 HTTP verbs + status codes, L3 hypermedia (HATEOAS).
_Avoid_: REST levels, API version levels

**Safe method**:
An HTTP method that the client intends as read-only — no observable state change
(GET, HEAD, OPTIONS). Safe implies idempotent.
_Avoid_: safe = secure, safe = cacheable

**Idempotent method**:
A method where making the same request N times has the same effect on server state
as making it once (GET, PUT, DELETE, HEAD). POST is not idempotent by default.
_Avoid_: idempotent = returns same response, idempotent = no side effects
