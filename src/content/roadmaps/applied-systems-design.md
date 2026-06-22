---
publishedAt: '2026-06-06'
title: 'Applied Systems Design — Learning Track (Part 5, the capstone)'
description: 'Applied Systems Design learning track — the roadmap and index of lessons, references, and interview questions for Applied Systems Design on Engineering Vault.'
keywords: ['estimation', 'consistent hashing', 'back-of-envelope', 'applied systems design', 'capacity', 'back of envelope']
ogImage: 'assets/og/applied-systems-design.png'
ogImageAlt: 'Applied Systems Design · Engineering Vault learning track'
chips: ['Estimation', 'Consistent hashing', 'Back-of-envelope']
accentVar: '--track-applied'
trackLabel: 'Applied Systems Design'
path: 'applied-systems-design/README.html'
---

# Applied Systems Design — Learning Track (Part 5, the capstone)

Your map for Part 5, the finale. Parts 1–4 built the theory; this part applies all of it to design real systems end to end.

- **Mission:** turn four parts of theory into design judgment.
- **Format:** design case studies with architecture diagrams. Delivered as a **lean EPUB** for Kindle (glossary in the `.md`, out of the book) plus markdown source here.
- **Level:** the capstone — assumes Parts 1–4.

---

## Where you are now

| | |
|---|---|
| **Status** | **All 9 lessons built** ✅ — read as one comprehensive page · **series complete** 🎉 |
| **Read it** | `book-5-applied-systems-design-fundamentals.epub` (send to Kindle) · or `applied-systems-design-fundamentals.md` |
| **How to work it** | Read in order; do each self-check from memory before peeking |
| **Deep dive** | `consistent-hashing-deep-dive.epub` — a go-deeper supplement to Lessons 6 & 8 (why mod-N fails · vnodes · bounded loads · rendezvous & jump hashing) |

---

## The 9-lesson path

| # | Lesson | The single win | Status |
|---|--------|----------------|--------|
| 1 | The Systems Design Method | The repeatable five-step framework | ✅ Built |
| 2 | Back-of-the-Envelope Estimation | Turn users into QPS, storage, bandwidth | ✅ Built |
| 3 | Design a URL Shortener | Thin write path, hot cached read path | ✅ Built |
| 4 | Design a Rate Limiter | Token bucket + an atomic counter | ✅ Built |
| 5 | Design a News Feed | Fan-out on write vs on read | ✅ Built |
| 6 | Design a Distributed Cache | Cache-aside + consistent hashing | ✅ Built |
| 7 | Design a Message Queue | Partitioned log + replication | ✅ Built |
| 8 | Design a Key-Value Store | The ring + quorums + LSM | ✅ Built |
| 9 | Putting It All Together | The universal design checklist | ✅ Built |

**How every lesson is built:** prose → an architecture diagram → a self-check → an expert corner.

---

## Progress checklist

- [ ] **Lesson 1** — The Systems Design Method
- [ ] **Lesson 2** — Back-of-the-Envelope Estimation
- [ ] **Lesson 3** — Design a URL Shortener
- [ ] **Lesson 4** — Design a Rate Limiter
- [ ] **Lesson 5** — Design a News Feed
- [ ] **Lesson 6** — Design a Distributed Cache
- [ ] **Lesson 7** — Design a Message Queue
- [ ] **Lesson 8** — Design a Key-Value Store
- [ ] **Lesson 9** — Putting It All Together

*Tick each box as you finish its self-check.*

---

## Files in this folder

```
README.md                                       ← index + roadmap + tracker
applied-systems-design-fundamentals.md          ← full source (includes the glossary)
book-5-applied-systems-design-fundamentals.epub        ← lean Kindle build (glossary excluded)
diagrams/
  00-cover.svg / .png                             ← series cover (Part 5)
  01-design-method.svg / .png                     ← Lesson 1
  02-estimation.svg / .png                        ← Lesson 2
  03-url-shortener.svg / .png                     ← Lesson 3
  04-rate-limiter.svg / .png                      ← Lesson 4
  05-news-feed.svg / .png                         ← Lesson 5
  06-distributed-cache.svg / .png                 ← Lesson 6
  07-message-queue.svg / .png                     ← Lesson 7
  08-kv-store.svg / .png                          ← Lesson 8
  09-design-checklist.svg / .png                  ← Lesson 9
```

## This is the final part

The five-part series is complete. See `../backend-mastery-series.md` for the whole arc.
