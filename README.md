<div align="center">

# ▦ StackDepth

**Visual system design & AI engineering, from first principles — interactive, and built for long-term recall.**

Infographic-first HTML lessons with diagrams, quizzes, rehearse-out-loud drills, and a tabbed
**interview panel** (Core · Senior · Staff · System Design) · printable cheat sheets — across **9 tracks**.

[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)
![Node](https://img.shields.io/badge/Node-%E2%89%A522-339933?logo=node.js&logoColor=white)
![No dependencies](https://img.shields.io/badge/dependencies-0-blue)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)
[![GitHub stars](https://img.shields.io/github/stars/dineshbyte/engineering-learning-hub?style=social)](https://github.com/dineshbyte/engineering-learning-hub/stargazers)

[**Tracks**](#-tracks) · [**Quick start**](#-quick-start) · [**Design**](#-design) · [**Connect**](#-connect)

</div>

---

Most resources teach these topics as disconnected facts. StackDepth teaches the **mental models** — each concept
grounded in a plain engineering analogy, shown as a diagram first, then drilled with retrieval practice and graded
interview questions. It's tuned for two things at once: **passing senior/staff interviews** and **actually
understanding the systems** long after.

No build step, no dependencies, no tracking — just open the pages.

## 📚 Tracks

| Track                           | Focus                                                                                                       | Lessons |
|---------------------------------|-------------------------------------------------------------------------------------------------------------|:-------:|
| 🤖 **AI Agents**                | The agent stack bottom-up: LLM → tools → runtime → memory → MCP → multi-agent → production                  |    4    |
| 🧩 **Context Engineering**      | Why same-LLM systems differ: context, retrieval, RAG, chunking, memory, eval, caching & security            |    9    |
| 🌐 **REST API**                 | The design decisions a senior interview probes: methods, idempotency, pagination, caching, auth, versioning |   11    |
| 🧮 **Bloom Filters**            | Probabilistic membership, Foundation → Staff: the asymmetry, sizing math, failure modes, variants           |    4    |
| 🛰️ **Distributed Systems**     | Failure, time, consensus, idempotency keys                                                                  |    3    |
| 🗄️ **Storage Engines**         | Indexes, B-trees, LSM compaction                                                                            |    2    |
| 🔒 **Transactions & Isolation** | ACID, isolation levels, MVCC, SSI                                                                           |    3    |
| 🌊 **Streaming & Event-Driven** | The log, exactly-once, watermarks                                                                           |    3    |
| 📐 **Applied Systems Design**   | A repeatable method, estimation, consistent hashing                                                         |    2    |

Each track ships **lessons** (infographic-first HTML with an interactive quiz + a tabbed interview panel), a printable
**reference sheet**, and a **glossary** with cited sources.

## 🚀 Quick start

The lessons are plain HTML with no build step — **open `docs/index.html` in any browser** and click into a track.

> 💡 **Go live:** enable **GitHub Pages** (Settings → Pages → branch `main` / `/docs`) to publish the hub at
`https://dineshbyte.github.io/engineering-learning-hub/`.

## 🎨 Design

Every page shares one design system, so the look stays consistent and re-themeable:

- **`assets/tokens.css`** — every colour (base palette, dark theme, 9 per-track accents) in one place. Change a value
  once → every page updates.
- **`assets/lesson.css`** — the modern, responsive lesson components.
- **`assets/interview.css` + `assets/interview.js`** — the shared interview panel: author a flat list of
  `<details class="iq" data-level="…">` and the tabs (Core / Senior / Staff / System Design) build themselves.
- 🌓 **Dark mode** on every page (respects your OS preference).

## 🗂️ Repo layout

```
docs/                 # the published site (GitHub Pages serves this folder as the root)
  index.html          # the hub (dashboard of all tracks)
  assets/             # shared design system: tokens.css, lesson.css, interview.css/js, favicon.svg
  <track>/            # one folder per track: lessons/, reference/, GLOSSARY.md, RESOURCES.md
  sitemap.xml         # SEO sitemap · robots.txt · .nojekyll
```

## 🤝 Contributing

Issues and PRs are welcome — fix a typo, sharpen an explanation, add a diagram, or propose a new track. Keep lessons
visual-first, add an interview panel, and cite high-trust sources.

## ⭐ Found this useful?

If it helped you learn or land an interview, **a star means a lot** and helps others find it.

## 👋 Connect

Built by **Dinesh** — I write about backend, distributed systems, and learning in public.

[![Twitter](https://img.shields.io/badge/Twitter-@dineshxbyte-1DA1F2?logo=x&logoColor=white)](https://twitter.com/dineshxbyte)
[![Medium](https://img.shields.io/badge/Medium-@dineshbyte-000000?logo=medium&logoColor=white)](https://medium.com/@dineshbyte)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-dineshbyte-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dineshbyte/)

## 📄 License

[MIT](LICENSE) — free to use, learn from, and adapt.
