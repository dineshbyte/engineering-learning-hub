# Distributed Systems — Learning Track (Index & Roadmap)

Your map for the whole series: what's built, what each lesson covers step by step, and what comes next. Use the checklist at the bottom to track progress.

- **Mission:** build deep, durable distributed-systems intuition → become a stronger backend engineer.
- **Format:** general theory, neutral examples. Each lesson ships as an updated **EPUB** (read on Kindle) plus markdown source here.
- **Level:** starts from zero; each lesson adds an optional *expert corner* for senior-level depth.

---

## Where you are now

| | |
|---|---|
| **Status** | **All 10 lessons built** ✅ — full book |
| **Read it** | `book-1-distributed-systems-fundamentals.epub` (send to Kindle) · or `distributed-systems-fundamentals.md` |
| **How to work it** | Read in order; do each self-check from memory before peeking |
| **Deep dive** | `consensus-deep-dive.epub` — supplement to Lesson 8 (FLP proof · Raft safety · Figure-8 · 3f+1) |
| **Deep dive** | `idempotency-keys-deep-dive.epub` — supplement to Lesson 2 (the race · atomic recording · fingerprint · the TTL hazard) |

**How every lesson is built (so you know what to expect each time):**
prose → **space-time diagrams** → a **self-check** quiz (recall before peeking) → an **expert corner** → new **glossary** terms → its own **cover**, delivered as a refreshed EPUB.

---

## The 10-lesson path

Top-level arc. Detailed steps for each are below.

| #  | Lesson | The single win | Status |
|----|--------|----------------|--------|
| 1  | The One Hard Truth | Why you can't tell "slow" from "dead" | ✅ Built |
| 2  | Talking Across the Gap | Delivery guarantees + **idempotency** | ✅ Built |
| 3  | What Time Is It? | No global clock; logical time | ✅ Built |
| 4  | Order & Causality | Partial order, broadcast | ✅ Built |
| 5  | Replication | Leader/follower, multi-leader, leaderless | ✅ Built |
| 6  | Consistency Models | Eventual → causal → linearizable | ✅ Built |
| 7  | CAP & PACELC | The real trade-offs | ✅ Built |
| 8  | Consensus | FLP + **Raft** | ✅ Built |
| 9  | Partitioning / Sharding | Splitting data without hot spots | ✅ Built |
| 10 | Putting It Together | The resilience pattern toolkit | ✅ Built |

---

## Step-by-step inside each lesson

### Lesson 1 — The One Hard Truth ✅ *(this is the current document)*

The steps that make up the document you have now:

1. **Partial failure** — the defining trait of a distributed system.
2. **The four indistinguishable causes** of a missing reply — *(diagram)*.
3. **Timeouts are a guess, not a truth** — the double-execution trap — *(diagram)*.
4. **The Two Generals Problem** — agreement over a lossy channel is impossible — *(diagram)*.
5. **The 8 Fallacies of Distributed Computing** — the practitioner's checklist.
6. **Why this matters for your day job** — real bug classes (double-charge, split brain).
7. **Expert corner** — end-to-end argument · failure detectors (φ-accrual) · FLP impossibility · the "exactly-once" myth.
8. **Self-check** (4 questions + answer key) · **Glossary seed** · **Resources**.

### Lesson 2 — Talking Across the Gap ✅ *(built)*

1. The two ways nodes talk: **RPC vs messaging**.
2. **Delivery guarantees:** at-most-once · at-least-once · exactly-once.
3. Why **exactly-once *delivery* is impossible** (callback to Lesson 1).
4. **Idempotency** — the definition, and **idempotency keys** in practice.
5. **Deduplication** — request IDs, the dedup store.
6. *Expert corner:* idempotent vs commutative · "effectively-once" · outbox teaser.

### Lesson 3 — What Time Is It? ✅ *(built)*

1. Why there is **no global clock**; clock skew and why NTP isn't enough.
2. **Physical vs logical** time.
3. The **happens-before** relation.
4. **Lamport clocks**, then **vector clocks**.
5. *Expert corner:* Spanner's TrueTime · hybrid logical clocks.

### Lesson 4 — Order & Causality ✅ *(built)*

1. **Total vs partial** order.
2. **Causal** order — preserving cause-and-effect.
3. **Broadcast** abstractions: best-effort → reliable → FIFO → causal → total.
4. *Expert corner:* state-machine replication, the bridge to consensus.

### Lesson 5 — Replication ✅ *(built)*

1. **Why replicate:** fault tolerance, latency, throughput.
2. **Single-leader** (leader/follower).
3. **Multi-leader** and conflict resolution.
4. **Leaderless** — quorums (R + W > N).
5. **Replication lag** and the anomalies it causes.
6. *Expert corner:* chain replication · anti-entropy / read repair.

### Lesson 6 — Consistency Models ✅ *(built)*

1. The **spectrum** — why "consistency" is not one thing.
2. **Eventual** consistency.
3. **Session guarantees** — read-your-writes, monotonic reads.
4. **Causal** consistency.
5. **Linearizability** — and what it costs.
6. *Expert corner:* consistency (replication) vs isolation (transactions) — two different words.

### Lesson 7 — CAP & PACELC ✅ *(built)*

1. What **CAP** actually states — and the myths.
2. **CP vs AP** behaviour under a partition.
3. **PACELC** — the latency/consistency trade *even without* partitions.
4. *Expert corner:* CAP critiques · how real databases classify themselves.

### Lesson 8 — Consensus ✅ *(built)*

1. The **consensus problem** — what "agree" formally means.
2. **FLP impossibility** (intuition; callback to Lesson 1).
3. **Quorums** and majorities.
4. **Raft:** leader election.
5. **Raft:** log replication and commitment.
6. *Expert corner:* Paxos vs Raft · Byzantine fault tolerance.

### Lesson 9 — Partitioning / Sharding ✅ *(built)*

1. **Why partition** — scaling beyond one node.
2. **Key-range vs hash** partitioning.
3. **Rebalancing** as the cluster grows.
4. **Hot spots / skew** and how to avoid them.
5. **Request routing.**
6. *Expert corner:* consistent hashing · partitioning secondary indexes.

### Lesson 10 — Putting It Together ✅ *(built)*

1. **Retries** + exponential **backoff** + **jitter**.
2. **Idempotency keys** revisited.
3. The **outbox** pattern (reliable publish).
4. **Sagas** (long-running, cross-service workflows).
5. The **exactly-once illusion** — effects vs delivery.
6. The **end-to-end argument**, revisited as a design rule.
7. *Expert corner:* a resilient-pipeline design checklist you can reuse at work.

---

## Progress checklist

- [x] **Lesson 1** — The One Hard Truth
- [ ] **Lesson 2** — Talking Across the Gap (idempotency)
- [ ] **Lesson 3** — What Time Is It?
- [ ] **Lesson 4** — Order & Causality
- [ ] **Lesson 5** — Replication
- [ ] **Lesson 6** — Consistency Models
- [ ] **Lesson 7** — CAP & PACELC
- [ ] **Lesson 8** — Consensus
- [ ] **Lesson 9** — Partitioning / Sharding
- [ ] **Lesson 10** — Putting It Together

*All ten are written. Tick each box as you finish its self-check; tell me where you want to go deeper.*

---

## Files in this folder

```
README.md                                ← you are here (index + roadmap + tracker)
distributed-systems-fundamentals.md      ← lesson source (grows as lessons are added)
book-1-distributed-systems-fundamentals.epub    ← Kindle build (regenerated each lesson)
diagrams/
  00-cover.svg / .png                     ← series cover
  01-four-causes.svg / .png               ← Lesson 1 diagrams
  02-timeout-double-run.svg / .png
  03-two-generals-regress.svg / .png
  04-delivery-guarantees.svg / .png       ← Lesson 2 diagrams
  05-idempotency-key.svg / .png
  06-happens-before.svg / .png            ← Lesson 3
  07-broadcast-ordering.svg / .png        ← Lesson 4
  08-quorum-rw.svg / .png                 ← Lesson 5
  09-consistency-spectrum.svg / .png      ← Lesson 6
  10-cap-pacelc.svg / .png                ← Lesson 7
  11-raft-election.svg / .png             ← Lesson 8
  12-raft-log.svg / .png                  ← Lesson 8
  13-hash-vs-range.svg / .png             ← Lesson 9
  14-outbox-pattern.svg / .png            ← Lesson 10
```

## Primary resources (full links inside the lesson)

Kleppmann's **Cambridge lectures** + **DDIA** (the spine) · **MIT 6.5840** (case studies) · the **8 Fallacies** · **raft.github.io** (for Lesson 8).
