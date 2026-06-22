---
publishedAt: '2026-06-21'
title: 'Streaming & Event-Driven Architecture — Learning Track (Part 4)'
description: 'Streaming & Event-Driven learning track — the roadmap and index of lessons, references, and interview questions for Streaming & Event-Driven on Engineering Vault.'
keywords: ['the log', 'exactly-once', 'watermarks', 'kafka', 'streaming', 'event driven', 'windows', 'exactly once']
ogImage: 'assets/og/streaming-event-driven.png'
ogImageAlt: 'Streaming & Event-Driven · Engineering Vault learning track'
chips: ['The log', 'Exactly-once', 'Watermarks', 'Kafka']
accentVar: '--track-streaming'
trackLabel: 'Streaming & Event-Driven'
path: 'streaming-event-driven/README.html'
---

# Streaming & Event-Driven Architecture — Learning Track (Part 4)

Your map for Part 4 of the series. Parts 1–3 covered distributed systems, transactions & isolation, and storage engines. This part is about how data **moves** and is processed as it arrives.

- **Mission:** design event-driven systems with judgment — the log as a unifying abstraction, Kafka, event sourcing, CQRS, stream processing.
- **Format:** log/dataflow/event-time diagrams + concrete examples. Delivered as a **lean EPUB** for Kindle (glossary kept in the `.md`, out of the book) plus markdown source here.
- **Level:** builds on Parts 1–3; each lesson adds senior-level depth (real-system behaviour).

---

## Where you are now

| | |
|---|---|
| **Status** | **All 9 lessons built** ✅ — read as one comprehensive page + deep-dive supplements |
| **Read it** | `book-4-streaming-event-driven-fundamentals.epub` (send to Kindle) · or `streaming-event-driven-fundamentals.md` |
| **How to work it** | Read in order; do each self-check from memory before peeking |
| **Deep dive** | `watermarks-deep-dive.epub` — a go-deeper supplement to Lesson 8 (perfect vs heuristic · the idle-partition stall · triggers & late firings) |
| **Deep dive** | `exactly-once-kafka-deep-dive.epub` — a go-deeper supplement to Lesson 3 (idempotent producer PID+seq · atomic offset commit · `read_committed`/LSO · zombie fencing & the epoch) |

---

## The 9-lesson path

| # | Lesson | The single win | Status |
|---|--------|----------------|--------|
| 1 | The Log: An Append-Only Source of Truth | Why the log is the unifying abstraction | ✅ Built |
| 2 | Kafka: The Distributed Log | Topics, partitions, offsets, consumer groups | ✅ Built |
| 3 | Delivery Guarantees in Streams | The offset-commit point decides everything | ✅ Built |
| 4 | Events vs Commands vs State | Thin notification vs fat state transfer | ✅ Built |
| 5 | Event Sourcing | Events as the source of truth | ✅ Built |
| 6 | CQRS | One write model, many read models | ✅ Built |
| 7 | Stream Processing | Stateless vs stateful dataflow | ✅ Built |
| 8 | Time, Windows & Watermarks | Event time, late data, completeness vs latency | ✅ Built |
| 9 | Building It Right | Patterns & pitfalls (the checklist) | ✅ Built |

**How every lesson is built:** prose → a diagram → a self-check → an expert corner.

---

## Progress checklist

- [ ] **Lesson 1** — The Log
- [ ] **Lesson 2** — Kafka
- [ ] **Lesson 3** — Delivery Guarantees
- [ ] **Lesson 4** — Events vs Commands vs State
- [ ] **Lesson 5** — Event Sourcing
- [ ] **Lesson 6** — CQRS
- [ ] **Lesson 7** — Stream Processing
- [ ] **Lesson 8** — Time, Windows & Watermarks
- [ ] **Lesson 9** — Building It Right

*Tick each box as you finish its self-check; tell me where you want to go deeper.*

---

## Files in this folder

```
README.md                                       ← index + roadmap + tracker
streaming-event-driven-fundamentals.md          ← full source (includes the glossary)
book-4-streaming-event-driven-fundamentals.epub        ← lean Kindle build (glossary excluded)
diagrams/
  00-cover.svg / .png                             ← series cover (Part 4)
  01-the-log.svg / .png                           ← Lesson 1
  02-kafka-partitions.svg / .png                  ← Lesson 2
  03-offset-commit.svg / .png                     ← Lesson 3
  04-event-types.svg / .png                       ← Lesson 4
  05-event-sourcing.svg / .png                    ← Lesson 5
  06-cqrs.svg / .png                              ← Lesson 6
  07-stream-processing.svg / .png                 ← Lesson 7
  08-windows-watermark.svg / .png                 ← Lesson 8
  09-eventdriven-patterns.svg / .png              ← Lesson 9
```

## Next in the series

**Part 5 — Applied Systems Design** (the capstone): design a rate limiter, a news feed, a distributed cache, a message queue, a URL shortener — applying all four prior books end-to-end. This is the final book of the series.
