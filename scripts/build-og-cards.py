#!/usr/bin/env python3
"""
Generate a per-track Open Graph / social-share card (1200x630 PNG) for every
StackDepth track, so a shared link to any track shows a banner with that
track's name, tagline and topics — not the generic site cover.

Cards are stamped from one template (brand-consistent: indigo→teal gradient,
StackDepth wordmark, track name, tagline eyebrow, topic chips, footer), so the
set scales to any number of tracks. Output: docs/assets/og/<slug>.png.

The global homepage cover stays docs/assets/og-cover.svg → og-cover.png
(hand-authored; rebuild it with: rsvg-convert -w 1200 -h 630
 docs/assets/og-cover.svg > docs/assets/og-cover.png).

Requires `rsvg-convert` on PATH. Re-run after adding a track or editing copy:

    python3 scripts/build-og-cards.py
"""
import os, subprocess, sys

ROOT = os.path.join(os.path.dirname(__file__), '..', 'docs')
OUT = os.path.join(ROOT, 'assets', 'og')

# slug, display name, tagline, accent (legible on the dark gradient), topic chips.
# Names/taglines keep &amp; (valid in SVG text). Source of truth = the hub cards.
TRACKS = [
    ('ai-agents', 'AI Agents', 'Strategy &amp; architecture', '#7b74f0',
     ['Agent loop', 'Tool use', 'MCP', 'Memory', 'Runtime']),
    ('context-engineering', 'Context Engineering', 'Why same-LLM systems differ', '#d651bf',
     ['RAG', 'Retrieval', 'Embeddings', 'Chunking', 'Reranking']),
    ('ai-evaluation', 'AI Evaluation', 'Measuring &amp; improving AI', '#d4a72c',
     ['Offline eval', 'Online eval', 'LLM-as-judge', 'Golden sets', 'Eval loop']),
    ('production-ai-architecture', 'Production AI Architecture', 'Review AI like a distributed system', '#5a7cf5',
     ['Reliability', 'Scalability', 'Observability', 'Cost control', 'Failure modes']),
    ('ai-security', 'AI Security', 'AI-specific attacks &amp; defenses', '#e0564e',
     ['Prompt injection', 'Threat model', 'OWASP LLM', 'Tool egress', 'Defense in depth']),
    ('ai-infrastructure', 'AI Infrastructure', 'The stack under modern AI', '#7fc04a',
     ['Embeddings', 'Vector DBs', 'Rerankers', 'Model gateway', 'Inference']),
    ('domain-agent-design', 'Domain Agent Design', 'Designing agents for real businesses', '#c89455',
     ['Responsibilities', 'Tool surface', 'Approval gates', 'Build vs buy', 'ROI']),
    ('advanced-ai-systems', 'Advanced AI Systems', 'The frontier, without the hype', '#9a7af0',
     ['Multi-agent', 'Orchestration', 'Swarms', 'Coordination cost', 'Anti-patterns']),
    ('rest-api', 'REST API Mastery', 'Senior interview companion', '#3b8fe6',
     ['HTTP', 'Idempotency', 'Pagination', 'Caching', 'Auth']),
    ('bloom-filters', 'Bloom Filters', 'Probabilistic data structures', '#1fa594',
     ['Probabilistic', 'Hashing', 'Sizing', 'LSM reads']),
    ('distributed-systems', 'Distributed Systems', 'Failure &#183; time &#183; consensus', '#e0902a',
     ['Consensus', 'Clocks', 'Idempotency', 'Failure modes']),
    ('storage-engines', 'Storage Engines', 'Indexes &#183; B-tree &#183; LSM', '#3fa863',
     ['B-trees', 'LSM', 'Indexes', 'Compaction']),
    ('transactions-isolation', 'Transactions &amp; Isolation', 'ACID &#183; isolation &#183; MVCC', '#a35fd6',
     ['ACID', 'MVCC', 'Isolation levels', 'SSI']),
    ('streaming-event-driven', 'Streaming &amp; Event-Driven', 'Logs &#183; Kafka &#183; windows', '#e8677d',
     ['The log', 'Exactly-once', 'Watermarks', 'Kafka']),
    ('applied-systems-design', 'Applied Systems Design', 'Method &#183; estimation &#183; designs', '#2a9fc0',
     ['Estimation', 'Consistent hashing', 'Back-of-envelope']),
]

ESC = lambda s: s.replace('&amp;', '&').replace('&#183;', '·')  # for length only


def vis_len(s):
    return len(ESC(s))


def name_font(name):
    n = vis_len(name)
    return 78 if n <= 13 else 64 if n <= 20 else 54


def chips_svg(chips, accent):
    """Lay chips left→right at 16px, wrapping to a 2nd row past 1056px."""
    parts, x, row, gap, maxw = [], 0, 0, 14, 1056
    for c in chips:
        w = int(vis_len(c) * 9.6) + 34
        if x and x + w > maxw:
            x, row = 0, row + 1
            if row > 1:
                break
        cx, y = x, row * 52
        parts.append(
            f'<rect x="{cx}" y="{y}" width="{w}" height="38" rx="19" fill="{accent}" '
            f'fill-opacity="0.92"/>'
            f'<text x="{cx + w // 2}" y="{y + 25}" text-anchor="middle" font-size="16" '
            f'font-weight="bold" fill="#fff">{c}</text>')
        x += w + gap
    return '\n    '.join(parts)


def card_svg(slug, name, tagline, accent, chips):
    eyebrow = ESC(tagline).upper().replace('&', '&amp;')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" font-family="Helvetica,Arial,sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#171636"/><stop offset="1" stop-color="#0c2a27"/>
    </linearGradient>
    <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5b54e6"/><stop offset="1" stop-color="#0f8a7e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="2" y="2" width="1196" height="626" rx="22" fill="none" stroke="#2c3a52" stroke-width="2"/>
  <rect x="0" y="0" width="12" height="630" fill="{accent}"/>
  <g transform="translate(72,68)">
    <rect width="48" height="48" rx="11" fill="url(#logo)"/>
    <g fill="#ffffff">
      <rect x="11" y="11" width="11" height="11" rx="2.5"/><rect x="26" y="11" width="11" height="11" rx="2.5"/>
      <rect x="11" y="26" width="11" height="11" rx="2.5"/><rect x="26" y="26" width="11" height="11" rx="2.5"/>
    </g>
    <text x="64" y="33" font-size="23" letter-spacing="3" fill="#9fb0c8" font-weight="bold">STACKDEPTH</text>
    <text x="64" y="33" dx="200" font-size="15" letter-spacing="2" fill="#5f6f86">LEARNING TRACK</text>
  </g>
  <text x="72" y="252" font-size="22" letter-spacing="2" font-weight="bold" fill="{accent}">{eyebrow}</text>
  <text x="72" y="346" font-size="{name_font(name)}" font-weight="bold" fill="#ffffff">{name}</text>
  <g transform="translate(72,432)">
    {chips_svg(chips, accent)}
  </g>
  <text x="72" y="582" font-size="23" fill="#7f8fa6">dineshbyte.github.io/engineering-learning-hub</text>
  <text x="1128" y="582" text-anchor="end" font-size="23" fill="#9fe7da" font-weight="bold">free &#183; learning in public</text>
</svg>'''


def main():
    if not os.path.isdir(OUT):
        os.makedirs(OUT)
    made = []
    for slug, name, tagline, accent, chips in TRACKS:
        svg = card_svg(slug, name, tagline, accent, chips)
        png = os.path.join(OUT, slug + '.png')
        r = subprocess.run(['rsvg-convert', '-w', '1200', '-h', '630', '-o', png],
                           input=svg.encode('utf-8'), capture_output=True)
        if r.returncode != 0:
            print('FAILED', slug, r.stderr.decode(), file=sys.stderr)
            sys.exit(1)
        made.append(slug)
    print('Generated %d track cards in docs/assets/og/: %s' % (len(made), ', '.join(made)))


if __name__ == '__main__':
    main()
