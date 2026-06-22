---
publishedAt: '2026-04-19'
title: 'Transactions & Isolation — Learning Track (Part 2)'
description: 'Transactions & Isolation learning track — the roadmap and index of lessons, references, and interview questions for Transactions & Isolation on Engineering Vault.'
keywords: ['acid', 'mvcc', 'isolation levels', 'ssi', 'transactions', 'isolation', 'snapshot', 'serializable', 'anomalies', 'locks']
ogImage: 'assets/og/transactions-isolation.png'
ogImageAlt: 'Transactions & Isolation · Engineering Vault learning track'
chips: ['ACID', 'MVCC', 'Isolation levels', 'SSI']
accentVar: '--track-transactions'
trackLabel: 'Transactions & Isolation'
path: 'transactions-isolation/README.html'
---

# Transactions & Isolation — Learning Track (Part 2)

Your map for Part 2 of the series. Part 1 was *Distributed Systems — Fundamentals* (replication consistency); this part is the other half — **transaction isolation**: what happens when concurrent transactions touch the same data.

- **Mission:** write backend code that doesn't corrupt data under concurrency — the daily, high-leverage half of "consistency."
- **Format:** general theory, concrete SQL/scenario examples. Delivered as a **lean EPUB** for Kindle (glossary kept in the `.md`, out of the book) plus markdown source here.
- **Level:** builds on Part 1; each lesson adds senior-level depth (real-DB gotchas).

---

## Where you are now

| | |
|---|---|
| **Status** | **All 9 lessons built** ✅ — read as one comprehensive page + deep-dive supplements |
| **Read it** | `book-2-transactions-isolation-fundamentals.epub` (send to Kindle) · or `transactions-isolation-fundamentals.md` |
| **How to work it** | Read in order; do each self-check from memory before peeking |
| **Deep dive** | `mvcc-internals-deep-dive.epub` — a go-deeper supplement to Lesson 4 (heap vs undo-log · the visibility test · VACUUM bloat trap · xid wraparound) |
| **Deep dive** | `ssi-deep-dive.epub` — a go-deeper supplement to Lesson 6 (write skew · serializable ⟺ acyclic graph · the dangerous structure · SIRead locks & the 40001 abort · safe-snapshot read-only optimization) |

---

## The 9-lesson path

| # | Lesson | The single win | Status |
|---|--------|----------------|--------|
| 1 | What a Transaction Promises (ACID) | What the four promises mean — and don't | ✅ Built |
| 2 | The Anomalies | The catalog of concurrency bugs | ✅ Built |
| 3 | Isolation Levels: The Menu | The levels, and why the names lie | ✅ Built |
| 4 | Snapshot Isolation & MVCC | How Read Committed / SI actually work | ✅ Built |
| 5 | Lost Updates & Write Skew | The subtle invariant-breakers | ✅ Built |
| 6 | Serializability | Serial · 2PL · SSI | ✅ Built |
| 7 | Distributed Transactions & 2PC | Why two-phase commit blocks | ✅ Built |
| 8 | Sagas, Outbox & Idempotency | Eventual consistency for workflows | ✅ Built |
| 9 | Choosing Isolation in Practice | The senior decision tree | ✅ Built |

**How every lesson is built:** prose → a diagram → a self-check → an expert corner.

---

## Progress checklist

- [ ] **Lesson 1** — What a Transaction Promises (ACID)
- [ ] **Lesson 2** — The Anomalies
- [ ] **Lesson 3** — Isolation Levels
- [ ] **Lesson 4** — Snapshot Isolation & MVCC
- [ ] **Lesson 5** — Lost Updates & Write Skew
- [ ] **Lesson 6** — Serializability
- [ ] **Lesson 7** — Distributed Transactions & 2PC
- [ ] **Lesson 8** — Sagas, Outbox & Idempotency
- [ ] **Lesson 9** — Choosing Isolation in Practice

*Tick each box as you finish its self-check; tell me where you want to go deeper.*

---

## Files in this folder

```
README.md                                     ← index + roadmap + tracker
transactions-isolation-fundamentals.md        ← full source (includes the glossary)
book-2-transactions-isolation-fundamentals.epub      ← lean Kindle build (glossary excluded)
diagrams/
  00-cover.svg / .png                          ← series cover (Part 2)
  01-acid-atomicity.svg / .png                 ← Lesson 1
  02-lost-update.svg / .png                    ← Lesson 2
  03-isolation-matrix.svg / .png               ← Lesson 3
  04-mvcc-snapshot.svg / .png                  ← Lesson 4
  05-write-skew.svg / .png                     ← Lesson 5
  06-serializability-strategies.svg / .png     ← Lesson 6
  07-two-phase-commit.svg / .png               ← Lesson 7
  08-saga-compensation.svg / .png              ← Lesson 8
  09-isolation-decision.svg / .png             ← Lesson 9
```

## Next in the series

**Part 3 — Storage Engines & Data Modeling** (LSM-trees vs B-trees, WAL, indexes, row vs column, schema design). Then Streaming & Event-Driven, then Applied Systems Design.
