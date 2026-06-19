# LSM Compaction — Deep Dive

*A supplement to Book 3, Lessons 3 and 4. The intro told you compaction "merges SSTables in the background and drops overwritten and deleted keys." True — and it hides every interesting decision in an LSM engine. Compaction is where the read/write/space trade-off is actually made, where your write throughput goes to die, and where a subtle bug can resurrect deleted data. This goes to the floor.*

Dense. Read it after Lessons 3–4 have settled.

---

## Where Lesson 3 stopped

You learned the LSM write path: writes hit an in-memory **memtable**, which flushes to an immutable, sorted **SSTable** on disk; **compaction** later merges SSTables, dropping shadowed and deleted keys; **Bloom filters** let a read skip SSTables that lack a key. What Lesson 3 left as one word — "compaction" — is in reality a *policy*, and the policy you pick is the single biggest performance decision in the engine. There is more than one, they make opposite trade-offs, and "just compact in the background" is where production LSM systems fall over.

---

## 1. The job, and the three amplifications

Compaction exists because the LSM write path is *append-only*: every write, overwrite, and delete is a new record, so dead data piles up and the same key scatters across many files. Compaction reclaims space and consolidates a key's history. But *how* it does that is a choice, and every choice is scored on three **amplification** factors (DDIA Ch. 3; the framing is standard in the RocksDB literature):

| Amplification | Definition | Who pays |
|---|---|---|
| **Write** | bytes written to disk ÷ bytes written by the app | flash wear, write throughput |
| **Read** | SSTables (disk reads) touched per logical read | read latency, p99 |
| **Space** | bytes on disk ÷ bytes of live data | storage cost |

> **The iron law of compaction:** lowering one amplification raises another. There is no free strategy — only one matched to your workload. (Athanassoulis et al., the **RUM conjecture**, EDBT 2016.)

The two dominant strategies sit at opposite corners.

---

## 2. Size-tiered compaction (STCS)

The original approach (Google Bigtable, Cassandra's historical default). Group SSTables by **size**. When enough tables of roughly the same size accumulate — say four — merge them into one table of the next size up. Small tables become medium, mediums become large, larges become huge.

- **Write amplification: LOW.** A key is rewritten only once per *tier* it passes through, and tiers grow geometrically, so a key is rewritten ~`log(N)` times total. Writes are cheap.
- **Space amplification: HIGH.** Two killers. First, a merge needs room for its inputs *and* its output simultaneously — in the worst case (compacting everything at once) you briefly need ~**2×** the dataset on disk. Second, the same key can have live-looking copies sitting in several different tiers that have not yet been merged, so obsolete versions and tombstones linger.
- **Read amplification: MEDIUM–HIGH.** A point lookup may have to consult one (or more) SSTable per tier; Bloom filters cut the misses, but a key that genuinely exists might be chased through several tiers.

STCS is the **write-optimized** corner: great when you ingest faster than you read and can spare disk. Its weakness is exactly the disk headroom — a big STCS compaction can momentarily double your space, and clusters have run out of disk *because of* compaction.

---

## 3. Leveled compaction (LCS)

LevelDB's design, RocksDB's and Cassandra's modern choice for read-heavy data. Organise SSTables into **levels** `L0, L1, L2, …`, each ~`T`× larger than the last (`T` ≈ 10 by default). The crucial invariant:

> Within every level **except L0**, the SSTables have **non-overlapping key ranges**. So for any key, each level `L1+` holds it in **at most one** SSTable.

`L0` is the exception: it receives whole memtable flushes, which are independent sorted runs that *do* overlap. Compaction in LCS is incremental: pick one SSTable from `Ln`, find the (few) SSTables in `Ln+1` whose key ranges overlap it, merge them, and write the results back into `Ln+1`, preserving the non-overlap invariant.

![**Size-tiered vs leveled compaction.** Left: STCS merges same-size tables into bigger tiers (cheap writes, lots of space, a key may live in several tiers). Right: LCS keeps each level non-overlapping and ~10× the last, merging one table down at a time (cheap reads + space, but each key is rewritten many times).](diagrams/dd-01-lsm-compaction-strategies.png)

- **Read amplification: LOW.** A point lookup checks at most **one SSTable per level** (plus all of `L0`), so ~`log_T(N)` files — a handful even for terabytes. Range scans win too: each level is one sorted, non-overlapping run.
- **Space amplification: LOW (~1.1×).** Because each level is non-overlapping, there is almost no duplication; obsolete data is squeezed out quickly.
- **Write amplification: HIGH.** This is the cost. Merging one `Ln` table into `Ln+1` rewrites the ~`T` overlapping tables it touches, so moving a byte down one level costs ~`T` bytes written; across `log_T(N)` levels the total is roughly **`T · log_T(N)`** — commonly **10–30×** in practice. Every key is rewritten many times on its way to the bottom.

LCS is the **read-and-space-optimized** corner: bounded read latency and tight disk usage, paid for in write bandwidth. The number to remember: leveled compaction can write ~10–30 bytes to disk for every byte your application writes.

Hybrids exist between the corners — RocksDB's *universal* compaction is tiered-leaning; Cassandra's *TWCS* (Time-Window) buckets SSTables by time for append-only, TTL'd, time-series data so whole old buckets drop at once.

---

## 4. The trade-off you cannot escape

Put the two strategies on one picture and the RUM conjecture becomes concrete: you may minimise any **two** of read, write, and space amplification, but the third then suffers.

![**The amplification trade-off.** Read, write, and space amplification form a triangle; a compaction strategy is a point inside it. Leveled sits near low-read/low-space (paying write); size-tiered sits near low-write (paying read and space). You cannot reach all three corners at once.](diagrams/dd-02-amplification-triangle.png)

| Strategy | Write amp | Read amp | Space amp | Reach for it when |
|---|---|---|---|---|
| **Size-tiered** | low | med–high | **high** | write-heavy, disk to spare |
| **Leveled** | **high** | low | low | read-heavy, space-constrained |
| **Time-window (TWCS)** | low | low* | low | time-series with TTLs |

\* within a time window. The senior move is to choose **per table / per column family**, by its access pattern, exactly as Book 3 Lesson 5 chose indexes per query. A write-once-read-rarely audit log and a hot read-mostly profile table should not share a compaction strategy.

---

## 5. Tombstones and the resurrection bug

Deletes are the trap. An LSM engine cannot erase a record in place — the data is spread across immutable SSTables — so a delete writes a **tombstone**: a marker that says "this key is dead as of this sequence number." A read that meets a tombstone newer than any value returns "not found." Compaction eventually drops the key *and* its tombstone together. Two things make this genuinely dangerous.

**First, the resurrection bug.** A tombstone must **outlive every older SSTable that still holds the deleted key's value.** Drop the tombstone too early — while an older, not-yet-compacted SSTable still contains the original value — and the next read finds that old value with no tombstone to mask it. **The deleted data comes back.**

![**Tombstone resurrection.** A delete writes a tombstone, but an older SSTable still holds the value. Purge the tombstone before that old SSTable is compacted away, and the value reappears. The tombstone must survive until it has been compacted past all older copies.](diagrams/dd-03-tombstone-resurrection.png)

So a tombstone may only be purged once compaction has carried it down to a point where **no older data for that key can remain** (in leveled, the bottom level; in tiered, after it has merged with every older tier). In a *distributed* store this is stricter still: Cassandra holds tombstones for `gc_grace_seconds` (default **10 days**) before dropping them, because the delete must first reach every replica. Drop it sooner and a replica that missed the delete — partitioned at the time — will, on the next read-repair or hinted handoff, happily re-share the old value and resurrect it cluster-wide. **Premature tombstone GC is a real, shipped data-loss-in-reverse bug.**

**Second, tombstone read amplification.** Tombstones are *data* until they are purged, and a read over a range must scan them all. A delete-heavy, queue-like workload (write rows, read them, delete them) accumulates millions of tombstones in a partition; a range read then plods through all of them, and Cassandra will actually abort a query that scans past `tombstone_failure_threshold` (default 100,000). "My queue table times out reads" is, nine times out of ten, tombstone overload.

---

## 6. L0, write stalls, and back-pressure

Now the operational reality — the failure mode that pages you. Recall that `L0` is special: it takes raw memtable flushes, so its SSTables **overlap**. Two consequences.

A read must consult **every** `L0` file (their ranges overlap, so a binary search can't pick one) — Bloom filters help, but a fat `L0` slows every read. More importantly, `L0` is the pressure gauge for the whole tree. Flushes feed `L0` from the top; compaction drains it toward `L1` and below. **If the write rate exceeds the rate compaction can drain, `L0` files pile up and "compaction debt" accumulates** (RocksDB calls it *pending compaction bytes*).

LSM engines respond with **back-pressure**, deliberately slowing or stopping writes so the tree can catch up. RocksDB has explicit knobs:

- `level0_slowdown_writes_trigger` — once `L0` has this many files, *throttle* incoming writes.
- `level0_stop_writes_trigger` — at this many files, **stop writes entirely** until compaction drains `L0`.
- `soft/hard_pending_compaction_bytes_limit` — the same idea by total compaction debt.

This is why an LSM database that was fast all week suddenly shows write latency spikes or stalls under a heavier ingest: it is not "slow," it is **back-pressuring** because compaction fell behind. The fix is never "write faster" — it is to give compaction more I/O budget (threads, faster disks), pick a cheaper-write strategy (tiered), or smooth the write rate. The deepest LSM truth: **your sustainable write rate is bounded by your compaction throughput, not your disk's raw write speed.**

---

## Self-Check — LSM Compaction Deep Dive

Answer from memory before the key.

**Q1.** Compared with size-tiered, leveled compaction primarily trades…

- (a) lower write amplification for higher read amplification
- (b) higher write amplification for lower read and space amp
- (c) lower space amplification for much higher write latency
- (d) higher read amplification for lower total disk space used

**Q2.** In leveled compaction, levels below L0 hold any given key in at most one SSTable because…

- (a) each level keeps its SSTables in non-overlapping key ranges
- (b) Bloom filters remove the key from all the other SSTables
- (c) the memtable is flushed straight into the lowest level only
- (d) compaction deletes every duplicate key before a flush runs

**Q3.** A tombstone must be retained until compaction has carried it past all older copies because otherwise…

- (a) the read path would scan far too many tombstone markers
- (b) the deleted key's old value would reappear on the next read
- (c) the bottom level would grow without any bound over time
- (d) replicas would never converge on the same set of SSTables

**Q4.** An LSM database showing sudden write stalls under heavy ingest is usually…

- (a) running out of memtable space for new incoming writes
- (b) back-pressuring because compaction has fallen behind L0
- (c) waiting on a fsync to the write-ahead commit log to finish
- (d) rebuilding its Bloom filters after a recent schema change

## Answer Key

- **Q1 → (b).** Leveled keeps each level non-overlapping (low read amp) and tight (low space amp), but rewrites each key ~`T` times per level, so write amplification is high (often 10–30×).
- **Q2 → (a).** The non-overlapping-range invariant in `L1+` means a key falls in exactly one SSTable per level, which is what bounds read amplification to ~one file per level.
- **Q3 → (b).** Drop the tombstone while an older SSTable still holds the value and the value resurrects; the tombstone must outlive every older copy (and, distributed, survive `gc_grace_seconds`).
- **Q4 → (b).** `L0` filling faster than compaction can drain it triggers slowdown/stop-writes back-pressure — sustainable write rate is bounded by compaction throughput.

---

## Sources

- **Kleppmann — DDIA, Chapter 3** ("Storage and Retrieval"): SSTables, LSM-trees, compaction, the amplification framing.
- **O'Neil, Cheng, Gawlick & O'Neil — "The Log-Structured Merge-Tree" (1996).** The origin.
- **Athanassoulis et al. — "Designing Access Methods: The RUM Conjecture" (EDBT 2016).** The read/update/memory trade-off made formal.
- **RocksDB wiki** — Leveled vs Universal compaction, write stalls, `level0_*_trigger`, pending-compaction-bytes. The operational bible.
- **Apache Cassandra docs** — STCS / LCS / TWCS, `gc_grace_seconds`, tombstone thresholds and the resurrection hazard.
