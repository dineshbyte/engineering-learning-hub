/**
 * tracks-reference.ts — the per-track metadata for the GLOSSARY / RESOURCES
 * collections, transcribed VERBATIM from scripts/build-reference-pages.py
 * (TRACKS / TRACK_KEYWORDS / TRACK_TAGS) so the Astro-built pages carry the same
 * title/keywords/chips/accent/ogImage bytes as the live pandoc-generated pages.
 *
 * The Python generator derives the keyword list at build time:
 *   keywords = [chip.lower() for chip in chips]
 *            + [k for k in TRACK_KEYWORDS.split(',') if k not in chips.lower()]
 * `deriveKeywords` below reproduces that exactly (order + dedup preserved).
 *
 * The two description templates (glossary / resources) are the fixed strings the
 * generator interpolates `name` into.
 */

export interface TrackReference {
    /** Display name, e.g. "AI Agents" (the TRACKS map value). */
    name: string;
    /** CSS accent token, e.g. "--track-agents" (the TRACKS map token). */
    accentVar: string;
    /** og:image basename under assets/og/ — equals the track slug for all tracks. */
    ogSlug: string;
    /** Visible topic chips (TRACK_TAGS) — also the leading keyword items. */
    chips: string[];
    /** Raw comma-joined TRACK_KEYWORDS string for the track. */
    keywords: string;
}

/**
 * Per-track reference metadata, keyed by track slug. Transcribed exactly from
 * build-reference-pages.py's TRACKS (accent token + name), TRACK_KEYWORDS, and
 * TRACK_TAGS maps.
 */
export const TRACKS_REFERENCE: Record<string, TrackReference> = {
    'ai-agents': {
        name: 'AI Agents',
        accentVar: '--track-agents',
        ogSlug: 'ai-agents',
        chips: ['Agent loop', 'Tool use', 'MCP', 'Memory', 'Runtime'],
        keywords:
            'ai agents, agent loop, multi-agent, llm, tool, runtime, memory, mcp, claude, cursor, production',
    },
    'bloom-filters': {
        name: 'Bloom Filters',
        accentVar: '--track-bloom',
        ogSlug: 'bloom-filters',
        chips: ['Probabilistic', 'Hashing', 'Sizing', 'LSM reads', 'False positive'],
        keywords:
            'bloom filters, data structures, false positive, probabilistic, sizing, lsm, cuckoo, counting, hash, membership',
    },
    'context-engineering': {
        name: 'Context Engineering',
        accentVar: '--track-context',
        ogSlug: 'context-engineering',
        chips: ['RAG', 'Retrieval', 'Embeddings', 'Chunking', 'Reranking'],
        keywords:
            'context engineering, rag, retrieval augmented generation, embeddings, semantic search, hybrid, bm25, rerank, chunking, context window, tokens, working memory',
    },
    'rest-api': {
        name: 'REST API',
        accentVar: '--track-rest',
        ogSlug: 'rest-api',
        chips: ['HTTP', 'Idempotency', 'Pagination', 'Caching', 'Auth'],
        keywords:
            'rest api, http methods, status codes, idempotency, pagination, caching, auth, oauth, jwt, versioning, errors, rate limiting',
    },
    'ai-evaluation': {
        name: 'AI Evaluation',
        accentVar: '--track-eval',
        ogSlug: 'ai-evaluation',
        chips: ['Offline eval', 'Online eval', 'LLM-as-judge', 'Golden sets', 'Eval loop'],
        keywords:
            'ai evaluation, offline evaluation, online evaluation, golden datasets, benchmarks, human evaluation, llm as a judge, task success rate, tool success rate, retrieval evaluation, hallucination detection, regression testing, continuous evaluation',
    },
    'production-ai-architecture': {
        name: 'Production AI Architecture',
        accentVar: '--track-prodai',
        ogSlug: 'production-ai-architecture',
        chips: ['Reliability', 'Scalability', 'Observability', 'Cost control', 'Failure modes'],
        keywords:
            'production ai architecture, reliability, scalability, observability, governance, auditability, cost control, runtime architecture, context architecture, tool architecture, multi-tenant, agent platform',
    },
    'ai-security': {
        name: 'AI Security',
        accentVar: '--track-aisec',
        ogSlug: 'ai-security',
        chips: ['Prompt injection', 'Threat model', 'OWASP LLM', 'Tool egress', 'Defense in depth'],
        keywords:
            'ai security, prompt injection, jailbreaking, tool abuse, context poisoning, data leakage, permission escalation, agent security, mcp security, multi-tenant security, supply chain, owasp llm top 10',
    },
    'ai-infrastructure': {
        name: 'AI Infrastructure',
        accentVar: '--track-aiinfra',
        ogSlug: 'ai-infrastructure',
        chips: ['Embeddings', 'Vector DBs', 'Rerankers', 'Model gateway', 'Inference'],
        keywords:
            'ai infrastructure, embeddings, vector databases, retrieval systems, rerankers, model gateways, inference, caching, prompt stores, evaluation infrastructure, memory infrastructure, hnsw, faiss, kv cache',
    },
    'domain-agent-design': {
        name: 'Domain Agent Design',
        accentVar: '--track-domain',
        ogSlug: 'domain-agent-design',
        chips: ['Responsibilities', 'Tool surface', 'Approval gates', 'Build vs buy', 'ROI'],
        keywords:
            'domain agent design, billing agent, support agent, engineering agent, sre agent, product manager agent, research agent, tools, context, memory, runtime, evaluation, human approval, roi, build vs buy',
    },
    'advanced-ai-systems': {
        name: 'Advanced AI Systems',
        accentVar: '--track-advai',
        ogSlug: 'advanced-ai-systems',
        chips: ['Multi-agent', 'Orchestration', 'Swarms', 'Coordination cost', 'Anti-patterns'],
        keywords:
            'advanced ai systems, multi-agent systems, agent orchestration, agent swarms, fine-tuning, distillation, reasoning models, long-horizon agents, autonomous systems',
    },
};

/**
 * Reproduce build-reference-pages.py's keyword derivation byte-for-byte:
 *   lowercased chips, then each TRACK_KEYWORDS entry that is non-empty and not
 *   already present as a lowercased chip — joined with ", ".
 */
export function deriveKeywords(ref: TrackReference): string {
    const chipLower = ref.chips.map((c) => c.toLowerCase());
    const extra = ref.keywords
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k && !chipLower.includes(k));
    return [...chipLower, ...extra].join(', ');
}

/** Fixed glossary description template (the generator's `desc` for GLOSSARY). */
export function glossaryDescription(name: string): string {
    return `${name} glossary — the canonical terms used across the Engineering Vault ${name} lessons, defined in dependency order.`;
}

/** Fixed resources description template (the generator's `desc` for RESOURCES). */
export function resourcesDescription(name: string): string {
    return `${name} resources — the high-trust sources (specs, docs, papers) behind the Engineering Vault ${name} lessons.`;
}
