<div align="center">

# 🎓 Engineering Learning Hub

**Learn backend & AI-systems engineering from first principles — visual-first, interactive, and built for long-term recall.**

Interactive HTML lessons with diagrams, quizzes, and rehearse-out-loud drills · printable cheat sheets · Kindle EPUBs — across **8 tracks**.

[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)
![Node](https://img.shields.io/badge/Node-%E2%89%A522-339933?logo=node.js&logoColor=white)
![No dependencies](https://img.shields.io/badge/dependencies-0-blue)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)
[![GitHub stars](https://img.shields.io/github/stars/dineshbyte/engineering-learning-hub?style=social)](https://github.com/dineshbyte/engineering-learning-hub/stargazers)

[**Tracks**](#-tracks) · [**Quick start**](#-quick-start) · [**Design**](#-design) · [**Connect**](#-connect)

</div>

---

Most resources teach these topics as disconnected facts. This hub teaches the **mental models** — each concept grounded in a plain engineering analogy, shown as a diagram first, then drilled with retrieval practice. It's tuned for two things at once: **passing senior/staff interviews** and **actually understanding the systems** long after.

No build step, no dependencies, no tracking — just open the pages.

## 📚 Tracks

| Track | Focus | Lessons |
|-------|-------|:------:|
| 🤖 **AI Agents** | The agent stack bottom-up: LLM → tools → runtime → memory → MCP → multi-agent → production | 4 |
| 🌐 **REST API** | The design decisions a senior interview probes: methods, idempotency, pagination, caching, auth, versioning | 11 |
| 🧮 **Bloom Filters** | Probabilistic membership, Foundation → Staff: the asymmetry, sizing math, failure modes, variants | 4 |
| 🛰️ **Distributed Systems** | Failure, time, consensus, idempotency keys | 3 |
| 🗄️ **Storage Engines** | Indexes, B-trees, LSM compaction | 2 |
| 🔒 **Transactions & Isolation** | ACID, isolation levels, MVCC, SSI | 3 |
| 🌊 **Streaming & Event-Driven** | The log, exactly-once, watermarks | 3 |
| 📐 **Applied Systems Design** | A repeatable method, estimation, consistent hashing | 2 |

Each track ships **lessons** (infographic-first HTML with an interactive quiz + interview rehearsal), a printable **reference sheet**, an offline **Kindle EPUB**, and a **glossary** with cited sources.

## 🚀 Quick start

The lessons are plain HTML — **open `index.html` in any browser** and click into a track.

To use the **in-browser EPUB reader** (preview the Kindle books without a Kindle), serve the folder over HTTP so it can fetch the `.epub` files:

```bash
npm start              # → http://localhost:8000/   (zero dependencies; Node ≥ 22)
# or, without Node:
python3 -m http.server 8000
```

Then open `http://localhost:8000/` for the hub, or `…/reader.html` for the reader.

> 💡 **Go live:** enable **GitHub Pages** (Settings → Pages → branch `main` /root) to publish the hub at `https://dineshbyte.github.io/engineering-learning-hub/`.

## 🎨 Design

Every page shares one design system, so the look stays consistent and re-themeable:

- **`assets/tokens.css`** — every colour (base palette, dark theme, 8 per-track accents) in one place. Change a value once → every page updates.
- **`assets/lesson.css`** — the modern, responsive lesson components.
- 🌓 **Dark mode** on every page (respects your OS preference).

## 🗂️ Repo layout

```
index.html            # the hub (dashboard of all tracks)
reader.html           # in-browser EPUB reader
server.js             # tiny zero-dependency static server (for the reader)
assets/               # shared design system: tokens.css, lesson.css, favicon.svg
lib/                  # vendored epub.js + jszip (for the reader)
<track>/              # one folder per track: lessons, reference/, *.epub, docs
```

## 🤝 Contributing

Issues and PRs are welcome — fix a typo, sharpen an explanation, add a diagram, or propose a new track. The default branch is **`develop`**; `main` is the release branch. Keep lessons visual-first and cite high-trust sources.

## ⭐ Found this useful?

If it helped you learn or land an interview, **a star means a lot** and helps others find it.

## 👋 Connect

Built by **Dinesh** — I write about backend, distributed systems, and learning in public.

[![Twitter](https://img.shields.io/badge/Twitter-@dineshxbyte-1DA1F2?logo=x&logoColor=white)](https://twitter.com/dineshxbyte)
[![Medium](https://img.shields.io/badge/Medium-@dineshbyte-000000?logo=medium&logoColor=white)](https://medium.com/@dineshbyte)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-dineshbyte-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dineshbyte/)

## 📄 License

[MIT](LICENSE) — free to use, learn from, and adapt.
