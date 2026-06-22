import { type Track, trackSchema } from '../schema/track';

/**
 * The 15 hub track cards, extracted faithfully from docs/index.html (the source
 * of truth) so the home grid can render SERVER-SIDE with identical markup.
 *
 * - hrefs are copied VERBATIM (relative, GitHub-Pages style).
 * - tagline / description / tags[] / lessons[].title keep their source HTML
 *   entities (&amp;, &mdash;) so the rendered DOM matches byte-for-byte.
 * - lessons[].blurb is folded in from window.CARD_DETAIL (docs/assets/card-detail.js),
 *   keyed by lesson href. The 6 newer single-lesson AI tracks are not in that map,
 *   so their lessons carry no blurb (see anomalies in the foundation report).
 *
 * Order matches the DOM order of the cards in <main class="grid">.
 */
export const tracks: Track[] = [
    {
        slug: 'ai-agents',
        name: 'AI Agents',
        tagline: 'Strategy &amp; architecture',
        category: 'ai',
        tier: 2,
        colorVar: '--track-agents',
        startHere: true,
        tags: ['Agent loop', 'Tool use', 'MCP', 'Memory', 'Runtime'],
        description:
            'The whole agent stack, bottom-up — tell real capability from hype in pitches and reviews.',
        lessonCountLabel: '5 lessons',
        readTime: '~2h 55m read',
        lessons: [
            {
                href: 'ai-agents/lessons/ai-agents-from-first-principles.html',
                n: 1,
                title: 'The ten-level stack — LLM → archetypes',
                blurb: 'AI agents from first principles: how LLMs, tools, the agent loop, planning, and MCP fit together — build the full stack from memory and tell real capability from hype.',
            },
            {
                href: 'ai-agents/lessons/agent-runtime-and-context.html',
                n: 2,
                title: 'Runtime, context &amp; memory',
                blurb: 'Your bar: explain to an interviewer how an agent runtime orchestrates an LLM loop, why context engineering often matters more than model choice, and how the…',
            },
            {
                href: 'ai-agents/lessons/how-coding-agents-work.html',
                n: 3,
                title: 'How coding agents work (Claude Code · Cursor · MCP)',
                blurb: 'Your bar: explain step-by-step how Claude Code executes a real task, how Cursor retrieves context from a large repo, and how MCP turns any business function…',
            },
            {
                href: 'ai-agents/lessons/agent-systems-and-production.html',
                n: 4,
                title: 'Multi-agent systems &amp; production',
                blurb: 'Your bar: decide when multi-agent is justified vs unnecessary; name five ways production agents fail and how to prevent them; design a business agent…',
            },
            {
                href: 'ai-agents/lessons/agent-systems-engineering.html',
                n: 5,
                title: 'Agent systems engineering &mdash; how production AI executes work',
                blurb: 'How production AI agents actually execute work: planning, state, execution engines, loop control, failure recovery, orchestration, long-running tasks, cost, and observability — from first principles.',
            },
        ],
        references: [
            {
                label: '★ Cheat sheet',
                href: 'ai-agents/reference/agents-cheat-sheet.html',
            },
            {
                label: '☑ Review sheet',
                href: 'ai-agents/reference/agent-architecture-review.html',
            },
            { label: 'Glossary', href: 'ai-agents/GLOSSARY.html', md: true },
            { label: 'Resources', href: 'ai-agents/RESOURCES.html', md: true },
        ],
    },
    {
        slug: 'context-engineering',
        name: 'Context Engineering',
        tagline: 'Why same-LLM systems differ',
        category: 'ai',
        tier: 3,
        colorVar: '--track-context',
        startHere: true,
        tags: ['RAG', 'Retrieval', 'Embeddings', 'Chunking', 'Reranking'],
        description:
            'Why one AI system feels far smarter than another on the identical model — selection, retrieval &amp; assembly of context.',
        lessonCountLabel: '9 lessons',
        readTime: '~2h 10m read',
        lessons: [
            {
                href: 'context-engineering/lessons/what-is-context-and-context-as-query.html',
                n: 1,
                title: 'What is context — &amp; the new database query',
                blurb: 'Your bar: explain why an LLM cannot see your whole codebase, what actually fills the context window, and why context retrieval — not the model — is where modern AI systems win or lose.',
            },
            {
                href: 'context-engineering/lessons/context-selection-and-retrieval.html',
                n: 2,
                title: 'Context selection &amp; retrieval',
                blurb: 'Your bar: explain how a system decides what to send to the model, and compare lexical, semantic, hybrid search, ranking and re-ranking by purpose, advantages, disadvantages, and failure modes.',
            },
            {
                href: 'context-engineering/lessons/codebase-context-chunking-and-rag.html',
                n: 3,
                title: 'Codebase context, chunking &amp; RAG',
                blurb: 'Your bar: explain how Cursor and Claude Code understand large repos, why chunking exists and how it fails, and how RAG works from first principles — and why most RAG bugs are retrieval bugs.',
            },
            {
                href: 'context-engineering/lessons/memory-compression-and-failure-modes.html',
                n: 4,
                title: 'Memory, compression &amp; failure modes',
                blurb: "Your bar: distinguish memory from a knowledge base, manage a long-running agent's context with summarization and sliding windows, and diagnose the five ways context systems fail — missing, wrong, o…",
            },
            {
                href: 'context-engineering/lessons/architecture-reviews-and-production-design.html',
                n: 5,
                title: 'Architecture reviews &amp; production design',
                blurb: 'The capstone: review real AI products (Cursor, Claude Code, ChatGPT, Copilot) by their context strategy, design production agents (billing, support, engineering, research), and walk away with the P…',
            },
            {
                href: 'context-engineering/lessons/retrieval-evaluation-and-observability.html',
                n: 6,
                title: 'Retrieval evaluation &amp; observability',
                blurb: 'Your bar: measure retrieval separately from generation, name recall@k / precision@k / MRR / nDCG and the RAGAS-style answer-quality metrics, and explain golden sets, offline vs online eval, and the…',
            },
            {
                href: 'context-engineering/lessons/pre-retrieval-and-advanced-rag.html',
                n: 7,
                title: 'Pre-retrieval &amp; advanced RAG',
                blurb: 'Your bar: transform the query before you retrieve, match the retrieval structure to the question shape, and know when to graduate from a static pipeline to a self-correcting agentic loop.',
            },
            {
                href: 'context-engineering/lessons/embeddings-indexing-and-cost.html',
                n: 8,
                title: 'Embeddings, indexing &amp; cost',
                blurb: 'Your bar: explain what an embedding actually is, how vector indexes (HNSW / IVF / PQ) trade recall for speed and memory, and how to model the real token and dollar cost of a retrieval pipeline.',
            },
            {
                href: 'context-engineering/lessons/context-caching-ordering-and-security.html',
                n: 9,
                title: 'Context caching, ordering &amp; security',
                blurb: 'Your bar: structure a prompt for KV/prompt caching, order the window so the model actually reads what matters, and defend a retrieval pipeline against prompt injection and cross-tenant leaks.',
            },
        ],
        references: [
            {
                label: '★ Cheat sheet',
                href: 'context-engineering/reference/context-engineering-cheat-sheet.html',
            },
            {
                label: '☑ Review sheet',
                href: 'context-engineering/reference/context-architecture-review.html',
            },
            {
                label: 'Glossary',
                href: 'context-engineering/GLOSSARY.html',
                md: true,
            },
            {
                label: 'Resources',
                href: 'context-engineering/RESOURCES.html',
                md: true,
            },
        ],
    },
    {
        slug: 'ai-evaluation',
        name: 'AI Evaluation',
        tagline: 'Measuring &amp; improving AI',
        category: 'ai-eng',
        tier: 3,
        colorVar: '--track-eval',
        startHere: false,
        added: '2026-06-21',
        tags: ['Offline eval', 'Online eval', 'LLM-as-judge', 'Golden sets', 'Eval loop'],
        description:
            'How AI systems are measured and made to improve — offline &amp; online eval, golden sets, LLM-as-judge, and the production eval loop.',
        lessonCountLabel: '1 lesson',
        readTime: '~15m read',
        lessons: [
            {
                href: 'ai-evaluation/lessons/evaluation-fundamentals-offline-online.html',
                n: 1,
                title: 'Evaluation fundamentals — offline vs online &amp; the eval loop',
            },
        ],
        references: [
            { label: 'Glossary', href: 'ai-evaluation/GLOSSARY.html', md: true },
            {
                label: 'Resources',
                href: 'ai-evaluation/RESOURCES.html',
                md: true,
            },
        ],
    },
    {
        slug: 'production-ai-architecture',
        name: 'Production AI Architecture',
        tagline: 'Review AI like a distributed system',
        category: 'ai-eng',
        tier: 3,
        colorVar: '--track-prodai',
        startHere: false,
        added: '2026-06-21',
        tags: ['Reliability', 'Scalability', 'Observability', 'Cost control', 'Failure modes'],
        description:
            'Review AI systems with the rigor of production distributed systems — reliability, scalability, observability, cost, governance &amp; failure modes.',
        lessonCountLabel: '1 lesson',
        readTime: '~15m read',
        lessons: [
            {
                href: 'production-ai-architecture/lessons/reviewing-ai-like-a-distributed-system.html',
                n: 1,
                title: 'Reviewing an AI system like a distributed system',
            },
        ],
        references: [
            {
                label: 'Glossary',
                href: 'production-ai-architecture/GLOSSARY.html',
                md: true,
            },
            {
                label: 'Resources',
                href: 'production-ai-architecture/RESOURCES.html',
                md: true,
            },
        ],
    },
    {
        slug: 'ai-security',
        name: 'AI Security',
        tagline: 'AI-specific attacks &amp; defenses',
        category: 'ai-eng',
        tier: 3,
        colorVar: '--track-aisec',
        startHere: false,
        added: '2026-06-21',
        tags: ['Prompt injection', 'Threat model', 'OWASP LLM', 'Tool egress', 'Defense in depth'],
        description:
            'The AI attack surface — prompt injection, jailbreaks, tool abuse, data leakage &amp; multi-tenant risk — with threat models, detection &amp; mitigation.',
        lessonCountLabel: '1 lesson',
        readTime: '~16m read',
        lessons: [
            {
                href: 'ai-security/lessons/ai-threat-model-and-prompt-injection.html',
                n: 1,
                title: 'The AI threat model &amp; prompt injection (OWASP LLM Top 10)',
            },
        ],
        references: [
            { label: 'Glossary', href: 'ai-security/GLOSSARY.html', md: true },
            { label: 'Resources', href: 'ai-security/RESOURCES.html', md: true },
        ],
    },
    {
        slug: 'ai-infrastructure',
        name: 'AI Infrastructure',
        tagline: 'The stack under modern AI',
        category: 'ai-eng',
        tier: 3,
        colorVar: '--track-aiinfra',
        startHere: false,
        added: '2026-06-21',
        tags: ['Embeddings', 'Vector DBs', 'Rerankers', 'Model gateway', 'Inference'],
        description:
            'The infrastructure powering AI products — embeddings, vector DBs, rerankers, model gateways, inference &amp; caching — with scaling &amp; cost trade-offs.',
        lessonCountLabel: '1 lesson',
        readTime: '~15m read',
        lessons: [
            {
                href: 'ai-infrastructure/lessons/the-ai-infra-stack-end-to-end.html',
                n: 1,
                title: 'The AI infrastructure stack, end to end',
            },
        ],
        references: [
            {
                label: 'Glossary',
                href: 'ai-infrastructure/GLOSSARY.html',
                md: true,
            },
            {
                label: 'Resources',
                href: 'ai-infrastructure/RESOURCES.html',
                md: true,
            },
        ],
    },
    {
        slug: 'domain-agent-design',
        name: 'Domain Agent Design',
        tagline: 'Designing agents for real businesses',
        category: 'ai-eng',
        tier: 3,
        colorVar: '--track-domain',
        startHere: false,
        added: '2026-06-21',
        tags: ['Responsibilities', 'Tool surface', 'Approval gates', 'Build vs buy', 'ROI'],
        description:
            'A repeatable method to design production agents for real domains — responsibilities, tools, context, memory, runtime, eval, security, approval &amp; ROI.',
        lessonCountLabel: '1 lesson',
        readTime: '~15m read',
        lessons: [
            {
                href: 'domain-agent-design/lessons/the-domain-agent-design-method.html',
                n: 1,
                title: 'The domain-agent design method',
            },
        ],
        references: [
            {
                label: 'Glossary',
                href: 'domain-agent-design/GLOSSARY.html',
                md: true,
            },
            {
                label: 'Resources',
                href: 'domain-agent-design/RESOURCES.html',
                md: true,
            },
        ],
    },
    {
        slug: 'advanced-ai-systems',
        name: 'Advanced AI Systems',
        tagline: 'The frontier, without the hype',
        category: 'ai-eng',
        tier: 3,
        colorVar: '--track-advai',
        startHere: false,
        added: '2026-06-21',
        tags: ['Multi-agent', 'Orchestration', 'Swarms', 'Coordination cost', 'Anti-patterns'],
        description:
            'Advanced AI systems judged on engineering merit — multi-agent &amp; swarms, fine-tuning, distillation, reasoning models &amp; long-horizon autonomy: when, and when not.',
        lessonCountLabel: '1 lesson',
        readTime: '~16m read',
        lessons: [
            {
                href: 'advanced-ai-systems/lessons/multi-agent-systems-when-and-when-not.html',
                n: 1,
                title: 'Multi-agent systems, orchestration &amp; swarms — when &amp; when not',
            },
        ],
        references: [
            {
                label: 'Glossary',
                href: 'advanced-ai-systems/GLOSSARY.html',
                md: true,
            },
            {
                label: 'Resources',
                href: 'advanced-ai-systems/RESOURCES.html',
                md: true,
            },
        ],
    },
    {
        slug: 'rest-api',
        name: 'REST API Mastery',
        tagline: 'Senior interview companion',
        category: 'design',
        tier: 3,
        colorVar: '--track-rest',
        startHere: false,
        tags: ['HTTP', 'Idempotency', 'Pagination', 'Caching', 'Auth'],
        description:
            'The design decisions a senior interview probes — each infographic-first with a quiz and a rehearse-out-loud drill.',
        lessonCountLabel: '11 lessons',
        readTime: '~1h 20m read',
        lessons: [
            {
                href: 'rest-api/lessons/what-makes-an-api-restful.html',
                n: 1,
                title: 'What makes an API RESTful?',
                blurb: "What makes an API RESTful? Learn Roy Fielding's six REST constraints — statelessness, uniform interface, HATEOAS, cacheability — and how to nail the interview answer.",
            },
            {
                href: 'rest-api/lessons/http-methods-and-status-codes.html',
                n: 2,
                title: 'HTTP methods &amp; status codes',
                blurb: 'HTTP methods and status codes explained: GET, POST, PUT, PATCH, DELETE semantics, safe vs idempotent methods, and choosing the right 2xx/4xx/5xx code for REST APIs.',
            },
            {
                href: 'rest-api/lessons/idempotency-in-practice.html',
                n: 3,
                title: 'Idempotency in practice',
                blurb: 'API idempotency explained: how idempotency keys make POST retries safe, dedupe duplicate requests, and survive network failures without double-charging in REST APIs.',
            },
            {
                href: 'rest-api/lessons/resource-modeling-and-uri-design.html',
                n: 4,
                title: 'Resource modeling &amp; URIs',
                blurb: 'REST resource modeling and URI design: nouns over verbs, collections vs sub-resources, nesting depth, naming conventions, and clean URL patterns for scalable APIs.',
            },
            {
                href: 'rest-api/lessons/api-versioning-strategies.html',
                n: 5,
                title: 'Versioning &amp; evolution',
                blurb: 'REST API versioning strategies compared: URI path /v1 vs header and media-type versioning, breaking vs non-breaking changes, deprecation, and evolving APIs safely.',
            },
            {
                href: 'rest-api/lessons/pagination-at-scale.html',
                n: 6,
                title: 'Pagination at scale',
                blurb: 'API pagination at scale: why offset pagination breaks on large changing datasets, how cursor and keyset pagination work, and stable page design for REST APIs.',
            },
            {
                href: 'rest-api/lessons/caching-and-conditional-requests.html',
                n: 7,
                title: 'Caching &amp; conditional requests',
                blurb: 'HTTP caching for REST APIs: Cache-Control directives, ETags and Last-Modified, conditional GET with If-None-Match, 304 responses, and optimistic concurrency control.',
            },
            {
                href: 'rest-api/lessons/authentication-and-authorization.html',
                n: 8,
                title: 'Authentication &amp; authorization',
                blurb: 'API authentication and authorization: AuthN vs AuthZ, OAuth2 flows, JWT vs opaque tokens, scopes and RBAC, and securing REST endpoints against common attacks.',
            },
            {
                href: 'rest-api/lessons/error-design-rate-limiting-observability.html',
                n: 9,
                title: 'Errors, limits &amp; observability',
                blurb: 'API error design, rate limiting, and observability: consistent error contracts (RFC 7807), 429 with Retry-After, token-bucket throttling, logs, metrics, and tracing.',
            },
            {
                href: 'rest-api/lessons/async-and-long-running-operations.html',
                n: 10,
                title: 'Async &amp; long-running ops',
                blurb: 'Async and long-running REST operations: the 202 Accepted pattern, status polling, job resources, webhooks vs polling, and designing APIs for exports and batch jobs.',
            },
            {
                href: 'rest-api/lessons/mock-interview-whiteboard-design.html',
                n: 11,
                title: 'Mock interview: design an API',
                blurb: 'A REST API design mock interview walkthrough: scope the problem, model resources and URIs, pick status codes, and handle auth, pagination, idempotency, and errors live.',
            },
        ],
        references: [
            {
                label: 'Constraints',
                href: 'rest-api/reference/rest-constraints-and-maturity.html',
            },
            {
                label: 'Idempotency',
                href: 'rest-api/reference/idempotency-and-retries.html',
            },
            {
                label: 'Caching',
                href: 'rest-api/reference/caching-pagination-versioning.html',
            },
            {
                label: 'Security',
                href: 'rest-api/reference/api-security-and-auth.html',
            },
            {
                label: 'Design framework',
                href: 'rest-api/reference/api-design-interview-framework.html',
            },
            { label: 'Glossary', href: 'rest-api/GLOSSARY.html', md: true },
            { label: 'Resources', href: 'rest-api/RESOURCES.html', md: true },
        ],
    },
    {
        slug: 'bloom-filters',
        name: 'Bloom Filters',
        tagline: 'Probabilistic data structures',
        category: 'data',
        tier: 2,
        colorVar: '--track-bloom',
        startHere: false,
        tags: ['Probabilistic', 'Hashing', 'Sizing', 'LSM reads'],
        description:
            'Foundation → Staff: the membership-test asymmetry, sizing math, failure modes, and variants at scale.',
        lessonCountLabel: '4 lessons',
        readTime: '~30 min read',
        lessons: [
            {
                href: 'bloom-filters/lessons/what-is-a-bloom-filter.html',
                n: 1,
                title: 'What a Bloom filter is — the asymmetry',
                blurb: 'A Bloom filter trades certainty for space: "definitely not in the set" is guaranteed, "probably in the set" is not. Learn the core asymmetry and how it works.',
            },
            {
                href: 'bloom-filters/lessons/sizing-a-bloom-filter.html',
                n: 2,
                title: 'Sizing — pick the error, derive the rest',
                blurb: "Size a Bloom filter the senior way: start from the false-positive rate you can tolerate, then derive bits (m) and hash functions (k) from n — don't guess.",
            },
            {
                href: 'bloom-filters/lessons/failure-modes-and-lsm-reads.html',
                n: 3,
                title: 'Failure modes &amp; the LSM read path',
                blurb: 'How a Bloom filter earns its keep on the LSM-tree read path to skip disk reads — and how it silently rots when load outgrows its sizing. Real failure modes.',
            },
            {
                href: 'bloom-filters/lessons/variants-at-scale.html',
                n: 4,
                title: 'Variants at scale — counting · cuckoo · dedup',
                blurb: 'Counting, scalable, and blocked Bloom filter variants compared. Standard Bloom is the default — reach for a variant only when deletes, unknown n, or speed bite.',
            },
        ],
        references: [
            {
                label: '★ Cheat sheet',
                href: 'bloom-filters/reference/bloom-filters-cheat-sheet.html',
            },
            { label: 'Glossary', href: 'bloom-filters/GLOSSARY.html', md: true },
            {
                label: 'Resources',
                href: 'bloom-filters/RESOURCES.html',
                md: true,
            },
        ],
    },
    {
        slug: 'distributed-systems',
        name: 'Distributed Systems',
        tagline: 'Failure · time · consensus',
        category: 'distributed',
        tier: 3,
        colorVar: '--track-distributed',
        startHere: false,
        tags: ['Consensus', 'Clocks', 'Idempotency', 'Failure modes'],
        description:
            'Why distributed systems are hard, and the primitives that tame failure and time.',
        lessonCountLabel: '3 lessons',
        readTime: '~1h 35m read',
        lessons: [
            {
                href: 'distributed-systems/distributed-systems-fundamentals.html',
                n: '★',
                title: 'Fundamentals — start here',
                blurb: 'Distributed systems fundamentals: the CAP theorem, consistency models, replication, partitioning, and failure modes — reason about any async, multi-service system from first principles.',
            },
            {
                href: 'distributed-systems/consensus-deep-dive.html',
                n: 1,
                title: 'Consensus — deep dive',
                blurb: 'How distributed consensus works: the FLP impossibility result, Paxos, Raft leader election and safety, quorums, and the commit rules that keep replicated state machines correct.',
            },
            {
                href: 'distributed-systems/idempotency-keys-deep-dive.html',
                n: 2,
                title: 'Idempotency keys — deep dive',
                blurb: 'Idempotency keys done right: dedupe retried requests, store and replay saved results safely, handle concurrent and in-flight duplicates, and reach exactly-once delivery semantics.',
            },
        ],
        references: [
            {
                label: 'Roadmap',
                href: 'distributed-systems/README.html',
                md: true,
            },
        ],
    },
    {
        slug: 'storage-engines',
        name: 'Storage Engines',
        tagline: 'Indexes · B-tree · LSM',
        category: 'data',
        tier: 3,
        colorVar: '--track-storage',
        startHere: false,
        tags: ['B-trees', 'LSM', 'Indexes', 'Compaction'],
        description:
            'How databases actually store and find data — and the read/write/space trade-offs underneath.',
        lessonCountLabel: '2 lessons',
        readTime: '~1h 5m read',
        lessons: [
            {
                href: 'storage-engines/storage-engines-fundamentals.html',
                n: '★',
                title: 'Fundamentals — start here',
                blurb: 'How a database puts bytes on disk and finds them again — B-trees vs LSM-trees, indexes, and data models — so you can choose a storage engine with real judgment.',
            },
            {
                href: 'storage-engines/lsm-compaction-deep-dive.html',
                n: 1,
                title: 'LSM compaction — deep dive',
                blurb: 'LSM-tree compaction in depth: leveled vs tiered strategies, the write/read/space amplification trade-off, and the tombstone resurrection bug — pick per table.',
            },
        ],
        references: [
            {
                label: 'Roadmap',
                href: 'storage-engines/README.html',
                md: true,
            },
        ],
    },
    {
        slug: 'transactions-isolation',
        name: 'Transactions & Isolation',
        tagline: 'ACID · isolation · MVCC',
        category: 'data',
        tier: 3,
        colorVar: '--track-transactions',
        startHere: false,
        tags: ['ACID', 'MVCC', 'Isolation levels', 'SSI'],
        description: 'What isolation levels really promise, and how MVCC and SSI deliver them.',
        lessonCountLabel: '3 lessons',
        readTime: '~1h 25m read',
        lessons: [
            {
                href: 'transactions-isolation/transactions-isolation-fundamentals.html',
                n: '★',
                title: 'Fundamentals — start here',
                blurb: 'Transaction isolation levels explained: read committed, repeatable read, snapshot, serializable — and the anomalies (dirty reads, write skew, phantoms) each one allows or prevents.',
            },
            {
                href: 'transactions-isolation/mvcc-internals-deep-dive.html',
                n: 1,
                title: 'MVCC internals — deep dive',
                blurb: 'MVCC internals: how databases store row version chains, how a snapshot decides which version it sees, and why one long-running transaction causes table bloat and vacuum pressure.',
            },
            {
                href: 'transactions-isolation/ssi-deep-dive.html',
                n: 2,
                title: 'SSI — deep dive',
                blurb: 'Serializable Snapshot Isolation (SSI) explained: how a database keeps non-blocking snapshot reads yet stays serializable by tracking rw-dependencies and aborting dangerous write skew.',
            },
        ],
        references: [
            {
                label: 'Roadmap',
                href: 'transactions-isolation/README.html',
                md: true,
            },
        ],
    },
    {
        slug: 'streaming-event-driven',
        name: 'Streaming & Event-Driven',
        tagline: 'Logs · Kafka · windows',
        category: 'distributed',
        tier: 3,
        colorVar: '--track-streaming',
        startHere: false,
        tags: ['The log', 'Exactly-once', 'Watermarks', 'Kafka'],
        description:
            'The log as a primitive, and how exactly-once and event-time processing are really achieved.',
        lessonCountLabel: '3 lessons',
        readTime: '~1h 25m read',
        lessons: [
            {
                href: 'streaming-event-driven/streaming-event-driven-fundamentals.html',
                n: '★',
                title: 'Fundamentals — start here',
                blurb: 'Streaming and event-driven architecture from first principles: logs, topics, partitions, delivery guarantees, event time vs processing time, and how to design sound async pipelines.',
            },
            {
                href: 'streaming-event-driven/exactly-once-kafka-deep-dive.html',
                n: 1,
                title: 'Exactly-once in Kafka — deep dive',
                blurb: 'Exactly-once semantics in Kafka explained: idempotent producers, transactions, and committing consumer offsets inside the producer transaction to make read-process-write loops exactly-once.',
            },
            {
                href: 'streaming-event-driven/watermarks-deep-dive.html',
                n: 2,
                title: 'Watermarks — deep dive',
                blurb: 'Watermarks and event-time windowing explained: how a watermark estimates completeness, advances by the min rule, triggers windows, handles late data, and why an idle input stalls a pipeline.',
            },
        ],
        references: [
            {
                label: 'Roadmap',
                href: 'streaming-event-driven/README.html',
                md: true,
            },
        ],
    },
    {
        slug: 'applied-systems-design',
        name: 'Applied Systems Design',
        tagline: 'Method · estimation · designs',
        category: 'design',
        tier: 3,
        colorVar: '--track-applied',
        startHere: false,
        tags: ['Estimation', 'Consistent hashing', 'Back-of-envelope'],
        description:
            'A repeatable method for system-design rounds, plus the building blocks they lean on.',
        lessonCountLabel: '2 lessons',
        readTime: '~1h 5m read',
        lessons: [
            {
                href: 'applied-systems-design/applied-systems-design-fundamentals.html',
                n: '★',
                title: 'Fundamentals — start here',
                blurb: 'A repeatable method for any blank-page system design — interview or real review. Walk through requirements, estimates, APIs, data, and scaling without freezing.',
            },
            {
                href: 'applied-systems-design/consistent-hashing-deep-dive.html',
                n: 1,
                title: 'Consistent hashing — deep dive',
                blurb: 'Consistent hashing from the ring up: why mod N is catastrophic on resize, why a bare ring is lopsided, and how virtual nodes (vnodes) flatten the distribution.',
            },
        ],
        references: [
            {
                label: 'Roadmap',
                href: 'applied-systems-design/README.html',
                md: true,
            },
        ],
    },
];

// Validate every track against the schema at module load so bad/missing data is
// a BUILD ERROR, not a silently broken card. (There is no CI guard for the hub
// card markup, so this is the guard.)
tracks.forEach((t) => trackSchema.parse(t));
