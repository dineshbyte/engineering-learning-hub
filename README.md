# Engineering Learning Hub

A self-paced, visual-first learning hub for backend and AI-systems engineering — built from first principles in plain engineering analogies, tuned for **long-term recall** and **senior/staff interview prep**.

Every track is a set of interactive HTML lessons (diagrams, quizzes, rehearse-out-loud drills) plus a printable cheat sheet and a Kindle-ready EPUB. No build step, no dependencies, no tracking — just open the pages.

## Tracks

| Track | Focus | Lessons |
|-------|-------|---------|
| 🤖 **AI Agents** | The agent stack bottom-up: LLM → tools → runtime → memory → MCP → multi-agent → production | 4 |
| 🌐 **REST API** | The design decisions a senior interview probes: methods, idempotency, pagination, caching, auth, versioning | 11 |
| 🧮 **Bloom Filters** | Probabilistic membership, Foundation → Staff: the asymmetry, sizing math, failure modes, variants | 4 |
| 🛰️ **Distributed Systems** | Failure, time, consensus, idempotency keys | 3 |
| 🗄️ **Storage Engines** | Indexes, B-trees, LSM compaction | 2 |
| 🔒 **Transactions & Isolation** | ACID, isolation levels, MVCC, SSI | 3 |
| 🌊 **Streaming & Event-Driven** | The log, exactly-once, watermarks | 3 |
| 📐 **Applied Systems Design** | A repeatable method, estimation, consistent hashing | 2 |

## Quick start

The lessons are plain HTML — **open `index.html` in any browser** and click into a track.

To use the **in-browser EPUB reader** (preview the Kindle books without a Kindle), serve the folder over HTTP so the reader can fetch the `.epub` files (browsers block `fetch()` of `file://`):

```bash
npm start              # → http://localhost:8000/   (zero dependencies; Node ≥ 22)
# or, without Node:
python3 -m http.server 8000
```

Then open `http://localhost:8000/` for the hub, or `…/reader.html` for the reader.

## What's in each track

- **Lessons** (`<track>/lessons/` or `<track>/`) — infographic-first HTML with an interactive quiz and an interview rehearsal.
- **Reference sheets** (`<track>/reference/`) — printable cheat sheets to "keep handy."
- **EPUBs** — offline, reflowable Kindle editions (`<track>/*.epub`); read them in the browser via `reader.html` or send them to a Kindle.
- **GLOSSARY / RESOURCES / NOTES** — terminology, cited high-trust sources, and the learning arc.

## Design

All pages share one design system so the look stays consistent and re-themeable:

- **`assets/tokens.css`** — every colour (base palette, dark theme, per-track accents) in one place. Change a value once → every page updates.
- **`assets/lesson.css`** — the modern, responsive lesson components.
- Dark mode on every page (respects your OS preference; toggle with 🌓).

## Repo layout

```
index.html            # the hub (dashboard of all tracks)
reader.html           # in-browser EPUB reader
server.js             # tiny zero-dependency static server (for the reader)
assets/               # shared design system: tokens.css, lesson.css, favicon.svg
lib/                  # vendored epub.js + jszip (for the reader)
<track>/              # one folder per track: lessons, reference/, *.epub, docs
```

## License

[MIT](LICENSE) — free to use, learn from, and adapt.
