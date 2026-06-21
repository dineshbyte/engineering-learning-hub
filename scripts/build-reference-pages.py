#!/usr/bin/env python3
"""
Build styled HTML pages from each track's GLOSSARY.md / RESOURCES.md so they
render on-site (GitHub Pages serves .md as raw text, which is unreadable).

Source of truth stays the Markdown; re-run this after editing a GLOSSARY.md or
RESOURCES.md to regenerate the matching .html. Requires `pandoc` on PATH.

    python3 scripts/build-reference-pages.py

Then update docs/sitemap.xml if you add a new track's pages.
"""
import subprocess, re, os, sys

ROOT = os.path.join(os.path.dirname(__file__), '..', 'docs')
BASE = 'https://dineshbyte.github.io/engineering-learning-hub'
TRACKS = {
    'ai-agents': ('--track-agents', 'AI Agents'),
    'bloom-filters': ('--track-bloom', 'Bloom Filters'),
    'context-engineering': ('--track-context', 'Context Engineering'),
    'rest-api': ('--track-rest', 'REST API'),
    'ai-evaluation': ('--track-eval', 'AI Evaluation'),
    'production-ai-architecture': ('--track-prodai', 'Production AI Architecture'),
    'ai-security': ('--track-aisec', 'AI Security'),
    'ai-infrastructure': ('--track-aiinfra', 'AI Infrastructure'),
    'domain-agent-design': ('--track-domain', 'Domain Agent Design'),
    'advanced-ai-systems': ('--track-advai', 'Advanced AI Systems'),
}
# per-track keyword tags (kept in sync with the hub card data-name lists) so the
# generated glossary/resources pages carry page tags like every other page.
TRACK_KEYWORDS = {
    'ai-agents': 'ai agents, agent loop, multi-agent, llm, tool, runtime, memory, mcp, claude, cursor, production',
    'bloom-filters': 'bloom filters, data structures, false positive, probabilistic, sizing, lsm, cuckoo, counting, hash, membership',
    'context-engineering': 'context engineering, rag, retrieval augmented generation, embeddings, semantic search, hybrid, bm25, rerank, chunking, context window, tokens, working memory',
    'rest-api': 'rest api, http methods, status codes, idempotency, pagination, caching, auth, oauth, jwt, versioning, errors, rate limiting',
    'ai-evaluation': 'ai evaluation, offline evaluation, online evaluation, golden datasets, benchmarks, human evaluation, llm as a judge, task success rate, tool success rate, retrieval evaluation, hallucination detection, regression testing, continuous evaluation',
    'production-ai-architecture': 'production ai architecture, reliability, scalability, observability, governance, auditability, cost control, runtime architecture, context architecture, tool architecture, multi-tenant, agent platform',
    'ai-security': 'ai security, prompt injection, jailbreaking, tool abuse, context poisoning, data leakage, permission escalation, agent security, mcp security, multi-tenant security, supply chain, owasp llm top 10',
    'ai-infrastructure': 'ai infrastructure, embeddings, vector databases, retrieval systems, rerankers, model gateways, inference, caching, prompt stores, evaluation infrastructure, memory infrastructure, hnsw, faiss, kv cache',
    'domain-agent-design': 'domain agent design, billing agent, support agent, engineering agent, sre agent, product manager agent, research agent, tools, context, memory, runtime, evaluation, human approval, roi, build vs buy',
    'advanced-ai-systems': 'advanced ai systems, multi-agent systems, agent orchestration, agent swarms, fine-tuning, distillation, reasoning models, long-horizon agents, autonomous systems',
}
# visible topic chips per track (the same set the hub card shows) — rendered as
# multi-colour .ltags chips and led into the keyword list so visible == meta.
TRACK_TAGS = {
    'ai-agents': ['Agent loop', 'Tool use', 'MCP', 'Memory', 'Runtime'],
    'bloom-filters': ['Probabilistic', 'Hashing', 'Sizing', 'LSM reads', 'False positive'],
    'context-engineering': ['RAG', 'Retrieval', 'Embeddings', 'Chunking', 'Reranking'],
    'rest-api': ['HTTP', 'Idempotency', 'Pagination', 'Caching', 'Auth'],
    'ai-evaluation': ['Offline eval', 'Online eval', 'LLM-as-judge', 'Golden sets', 'Eval loop'],
    'production-ai-architecture': ['Reliability', 'Scalability', 'Observability', 'Cost control', 'Failure modes'],
    'ai-security': ['Prompt injection', 'Threat model', 'OWASP LLM', 'Tool egress', 'Defense in depth'],
    'ai-infrastructure': ['Embeddings', 'Vector DBs', 'Rerankers', 'Model gateway', 'Inference'],
    'domain-agent-design': ['Responsibilities', 'Tool surface', 'Approval gates', 'Build vs buy', 'ROI'],
    'advanced-ai-systems': ['Multi-agent', 'Orchestration', 'Swarms', 'Coordination cost', 'Anti-patterns'],
}
THEME = ('<script>\n'
         "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();\n"
         "function toggleTheme(){var d=document.documentElement;var t=d.getAttribute('data-theme')==='dark'?'light':'dark';d.setAttribute('data-theme',t);try{localStorage.setItem('theme',t);}catch(e){}}\n"
         '</script>')


def build():
    made = []
    for slug, (token, name) in TRACKS.items():
        for kind in ('GLOSSARY', 'RESOURCES'):
            md = os.path.join(ROOT, slug, kind + '.md')
            if not os.path.exists(md):
                continue
            body = subprocess.run(['pandoc', '-f', 'markdown', '-t', 'html5', md],
                                  capture_output=True, text=True, check=True).stdout
            m = re.search(r'<h1[^>]*>(.*?)</h1>', body, re.S)
            title = re.sub('<[^>]+>', '', m.group(1)).strip() if m else f'{name} {kind.title()}'
            word = 'Glossary' if kind == 'GLOSSARY' else 'Resources'
            desc = (f'{name} glossary — the canonical terms used across the Engineering Vault {name} lessons, defined in dependency order.'
                    if kind == 'GLOSSARY' else
                    f'{name} resources — the high-trust sources (specs, docs, papers) behind the Engineering Vault {name} lessons.')
            canon = f'{BASE}/{slug}/{kind}.html'
            # masthead consistency: add a kicker eyebrow + multi-colour topic
            # chips into the pandoc body so glossary/resources match lessons.
            tags = TRACK_TAGS.get(slug, [])
            kicker = f'<div class="kicker">Reference · {word}</div>'
            chips = ('<div class="ltags">'
                     + ''.join(f'<span class="lt">{t}</span>' for t in tags)
                     + '</div>')
            body = re.sub(r'(<h1\b)', kicker + r'\n\1', body, count=1)
            body = re.sub(r'(</h1>)', r'\1\n' + chips, body, count=1)
            keywords = ', '.join([t.lower() for t in tags]
                                 + [k.strip() for k in TRACK_KEYWORDS.get(slug, '').split(',')
                                    if k.strip() and k.strip() not in [t.lower() for t in tags]])
            html = f'''<!DOCTYPE html>
<html lang="en" style="--accent:var({token})">
<head>
{THEME}
<meta charset="utf-8">
<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>{title} · Engineering Vault</title>
<meta name="description" content="{desc}">
<meta name="keywords" content="{keywords}">
<link rel="canonical" href="{canon}">
<meta name="robots" content="index, follow">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Engineering Vault">
<meta property="og:title" content="{title} · Engineering Vault">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{BASE}/assets/og/{slug}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{name} · Engineering Vault learning track">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@dineshxbyte">
<meta name="twitter:creator" content="@dineshxbyte">
<meta name="twitter:title" content="{title} · Engineering Vault">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{BASE}/assets/og/{slug}.png">
<link rel="stylesheet" href="../assets/tokens.css">
<link rel="stylesheet" href="../assets/lesson.css">
<script src="../assets/analytics.js" defer></script>
</head>
<body>
<div class="wrap">
<nav id="hubbar">
  <a href="../index.html">← Engineering Vault</a>
  <span style="display:flex;align-items:center;gap:.6rem"><button class="themebtn" onclick="toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark / light">\U0001f313</button><span style="color:var(--muted)">{name} · {word}</span></span>
</nav>
{body}
</div>
</body>
</html>
'''
            out = os.path.join(ROOT, slug, kind + '.html')
            with open(out, 'w') as fh:
                fh.write(html)
            made.append(os.path.relpath(out))
    return made


if __name__ == '__main__':
    if subprocess.run(['which', 'pandoc'], capture_output=True).returncode != 0:
        sys.exit('pandoc is required (brew install pandoc)')
    for p in build():
        print('  wrote', p)
