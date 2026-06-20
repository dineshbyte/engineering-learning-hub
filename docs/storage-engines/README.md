# Storage Engines & Data Modeling — Learning Track (Book 3)

Your map for Book 3 of the series. Book 1 was *Distributed Systems*; Book 2 was *Transactions & Isolation*. This book goes one layer **down**: how a database actually stores bytes on disk and finds them fast, and how to model data.

- **Mission:** choose engines, indexes, and data models with judgment — grounds Books 1 and 2 in real machinery.
- **Format:** structural diagrams + concrete examples. Delivered as a **lean EPUB** for Kindle (glossary kept in the `.md`, out of the book) plus markdown source here.
- **Level:** builds on Books 1–2; each lesson adds senior-level depth (real-engine behaviour).

---

## Where you are now

| | |
|---|---|
| **Status** | **All 9 lessons built** ✅ — full book |
| **Read it** | `book-3-storage-engines-fundamentals.epub` (send to Kindle) · or `storage-engines-fundamentals.md` |
| **How to work it** | Read in order; do each self-check from memory before peeking |
| **Deep dive** | `lsm-compaction-deep-dive.epub` — a go-deeper supplement to Lessons 3–4 (STCS vs LCS · the RUM trade-off · tombstone resurrection · L0 write stalls) |

---

## The 9-lesson path

| # | Lesson | The single win | Status |
|---|--------|----------------|--------|
| 1 | How a Database Stores Bytes | The log + index, and the read/write tension | ✅ Built |
| 2 | B-Trees: The Default | The read-optimized workhorse | ✅ Built |
| 3 | LSM-Trees: Write-Optimized | Memtable, SSTables, compaction | ✅ Built |
| 4 | B-Tree vs LSM | The amplification trade-off | ✅ Built |
| 5 | Indexes: Finding Data Fast | Clustered vs secondary, the write cost | ✅ Built |
| 6 | Data Models | Relational, document, graph | ✅ Built |
| 7 | Schema Design | Normalization vs denormalization | ✅ Built |
| 8 | Encoding & Evolution | Forward/backward compatibility | ✅ Built |
| 9 | OLTP vs OLAP & Column Storage | Row vs column, by workload | ✅ Built |

**How every lesson is built:** prose → a structural diagram → a self-check → an expert corner.

---

## Progress checklist

- [ ] **Lesson 1** — How a Database Stores Bytes
- [ ] **Lesson 2** — B-Trees: The Default
- [ ] **Lesson 3** — LSM-Trees: Write-Optimized
- [ ] **Lesson 4** — B-Tree vs LSM
- [ ] **Lesson 5** — Indexes
- [ ] **Lesson 6** — Data Models
- [ ] **Lesson 7** — Schema Design
- [ ] **Lesson 8** — Encoding & Evolution
- [ ] **Lesson 9** — OLTP vs OLAP & Column Storage

*Tick each box as you finish its self-check; tell me where you want to go deeper.*

---

## Files in this folder

```
README.md                                  ← index + roadmap + tracker
storage-engines-fundamentals.md            ← full source (includes the glossary)
book-3-storage-engines-fundamentals.epub          ← lean Kindle build (glossary excluded)
diagrams/
  00-cover.svg / .png                        ← series cover (Book 3)
  01-log-hash-index.svg / .png               ← Lesson 1
  02-btree.svg / .png                        ← Lesson 2
  03-lsm-tree.svg / .png                     ← Lesson 3
  04-amplification.svg / .png                ← Lesson 4
  05-secondary-index.svg / .png              ← Lesson 5
  06-data-models.svg / .png                  ← Lesson 6
  07-normalization.svg / .png                ← Lesson 7
  08-schema-evolution.svg / .png             ← Lesson 8
  09-row-vs-column.svg / .png                ← Lesson 9
```

## Next in the series

**Book 4 — Streaming & Event-Driven Architecture** (Kafka, the log as source of truth, event sourcing, CQRS, stream processing, exactly-once in streams). Then Applied Systems Design.
