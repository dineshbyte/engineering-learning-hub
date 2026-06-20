# Serializable Snapshot Isolation — Deep Dive

*A supplement to Book 2, Lesson 6. Lesson 6 told you there are three ways to get true serializability — literally execute serially, take real locks (two-phase locking), or use **Serializable Snapshot Isolation (SSI)** — and that SSI is the one that "runs at almost snapshot-isolation speed and aborts the rare transaction that would break serializability." That sentence hides the whole trick. How does a database that lets everyone read a stale, non-blocking snapshot still guarantee the result is equivalent to running the transactions one at a time? The answer is a small, beautiful piece of graph theory turned into a runtime detector — and a deliberate decision to abort transactions it isn't even sure are wrong. This goes to the floor.*

Dense. Read it after Lessons 5 (write skew) and 6 (serializability) have settled. It is the natural sequel to the MVCC deep dive — SSI is the safety layer that sits on top of the snapshots that one described.

---

## Where Lesson 6 stopped

You learned the *menu*: serial execution (correct, doesn't scale across cores), strict two-phase locking (correct, but readers block writers and you get deadlocks), and SSI (correct, non-blocking reads, occasional aborts). You learned that **snapshot isolation is not serializable** — its signature hole is **write skew** — and that SSI closes that hole. What Lesson 6 did *not* tell you is *how*. The honest version is more interesting than "it tracks dependencies and aborts": SSI rests on a theorem about what every snapshot-isolation anomaly must structurally look like, and PostgreSQL turns that theorem into a cheap, conservative, runtime check. Conservative is the key word, and it has a price. This goes there.

---

## 1. Snapshot isolation's blind spot

Snapshot isolation (SI) is strong. Every transaction reads from a consistent snapshot taken at its start, so it never sees dirty data, never sees a non-repeatable read, and — via first-committer-wins — never loses a blind update. For years people *called* it serializable. It isn't. Oracle's isolation level literally named `SERIALIZABLE` is, to this day, only snapshot isolation, and it permits the anomaly below. (Berenson, Bernstein, Gray et al., "A Critique of ANSI SQL Isolation Levels", 1995.)

The hole is **write skew**: two concurrent transactions each *read* an overlapping set of rows, then each *write* a **different** row, where each write is only safe given what the *other* one read. Neither sees the other's write — they're on separate snapshots — so both commit, and the combined result satisfies no serial order.

![**Write skew breaks an invariant no single transaction violates.** Two on-call doctors each read "2 doctors on call — fine, I can go off-call," then each updates *their own* row. Neither write conflicts with the other (different rows), so SI's first-committer-wins never fires. Both commit; zero doctors are on call. No serial order — A-then-B or B-then-A — ever produces this, because the second to run would have read "only 1 on call" and been blocked by the application check.](diagrams/ssi-01-write-skew.png)

The canonical example: a hospital requires **at least one** doctor on call. Alice and Bob are both on call and both feeling sick. Each runs `SELECT count(*) FROM on_call WHERE shift = today` → sees `2` → concludes "fine, the other covers it" → sets *their own* `on_call = false`. Two different rows, two different snapshots, no write-write conflict. Both commit. Now nobody is on call. Run them serially in *either* order and the second transaction reads `count = 1` and is refused. The concurrent SI schedule produced a state no serial schedule could — the textbook definition of a serializability violation. (Fekete et al., "Making Snapshot Isolation Serializable", 2005; Cahill et al., 2008.)

Write skew isn't exotic — it's any "check a condition, then act on the assumption it still holds" across rows: double-spending the last unit of inventory, two people claiming the same username via a uniqueness check, allocating overlapping meeting rooms. SI cannot stop any of them. SSI can.

---

## 2. Serializability is a graph property

To detect non-serializability you first need to *define* it precisely, and the definition is graph-shaped. Model each committed transaction as a node and draw a directed edge whenever one transaction must come **before** another in any equivalent serial order. There are exactly three kinds of dependency. (Adya, "Weak Consistency", 1999; the multiversion serialization-graph framework.)

![**Three dependency edges, and the rule.** A `wr` edge (T1 writes x, T2 reads that version) and a `ww` edge (T1's version of x is overwritten by T2) both order T1 → T2 the obvious way. The `rw`-antidependency is the subtle one: T1 reads the *old* version of x and T2 writes a *newer* one — T1 didn't see T2's write, so T1 must have come first (T1 → T2). A history is serializable **if and only if** this graph is acyclic; a cycle means "everyone came before everyone," which no serial order can satisfy.](diagrams/ssi-02-dependency-graph.png)

- **`wr` (write→read, a "dependency"):** T1 writes a version of `x`; T2 reads *that* version. T1 must precede T2. Under SI this never crosses concurrent transactions — you only read committed versions from your snapshot.
- **`ww` (write→write):** T1 creates a version of `x`; T2 overwrites it with a later version. T1 precedes T2. SI's first-committer-wins already prevents two concurrent transactions from both writing `x`, so `ww` between concurrent transactions is blocked.
- **`rw` (read→write, an "antidependency"):** T1 reads a version of `x`; T2 writes a **later** version of `x` that T1 did not see. Because T1's read reflects the world *before* T2's write, T1 must come **before** T2: `T1 →rw T2`. This is the only edge SI can't prevent — your snapshot is frozen, so writes that land after it are invisible to you yet still create an ordering obligation.

The master theorem (Adya; Bernstein/Hadzilacos/Goodman): **a multiversion history is serializable exactly when its dependency graph has no cycle.** A cycle `T1 → T2 → … → T1` asserts each transaction is simultaneously before and after the others — impossible to lay out on a line. So the entire job of a serializable engine reduces to: *don't let a cycle commit.* SI prevents `ww` and cross-transaction `wr` cycles already; the **only** way an SI history goes non-serializable is through cycles made of `rw`-antidependencies. That narrows the search enormously, and the next section narrows it to almost nothing.

---

## 3. The dangerous structure: two `rw`-edges and a pivot

Here is the result SSI is built on — the reason it can be cheap. Fekete, O'Neil, and O'Neil proved it in 2005, and it is sharper than "watch for cycles."

![**Every snapshot-isolation anomaly contains this exact shape.** In any non-serializable SI history, some transaction T-pivot has BOTH an incoming `rw`-edge (T-in →rw T-pivot) and an outgoing `rw`-edge (T-pivot →rw T-out) — two `rw`-antidependencies *in a row*, meeting at the pivot. Both conflicting transactions are concurrent with the pivot, and (Fekete's refinement) T-out is the first of the three to commit. Find these two adjacent edges and you've found the only way SI can break.](diagrams/ssi-03-dangerous-structure.png)

> **Fekete's theorem (2005).** In any non-serializable execution under snapshot isolation, the dependency-graph cycle contains **two `rw`-antidependency edges that are consecutive** — i.e. there is a transaction **T-pivot** with an inbound `rw`-edge from some **T-in** and an outbound `rw`-edge to some **T-out**. Moreover T-in and T-out are each concurrent with T-pivot, and T-out commits before the pivot's conflict is resolved.

Sit with why this is powerful. To guarantee serializability you do **not** need to materialize the whole dependency graph, nor wait to confirm a cycle actually closed. You only need to spot a single transaction that is the meeting point of two `rw`-edges — one coming in, one going out. That local, two-edge pattern is the **dangerous structure**. Break any one of the three transactions in it and the potential cycle cannot form.

The catch — and it's the entire trade-off of SSI — is that the dangerous structure is a **necessary** condition for an SI anomaly but **not a sufficient** one. Every real anomaly contains the pattern; but the pattern can also appear in histories that are *perfectly serializable* (the would-be cycle never actually closes, or the third edge runs the other way). A detector that aborts on the pattern is therefore **conservative**: it catches every anomaly *and* some innocents. That choice — cheap and conservative over exact and expensive — is what makes the next section possible.

---

## 4. How PostgreSQL catches it: SIRead locks and a conservative abort

Knowing the shape to look for, the engine needs to detect `rw`-antidependencies *as they form*, without making reads block. PostgreSQL's SSI (Ports & Grittner, VLDB 2012) does it with **predicate locks that aren't really locks**.

![**SSI detection at runtime.** Every read under SERIALIZABLE leaves a non-blocking SIRead "lock" recording what was read (down to tuples, escalating to pages/relations under pressure). A later write that lands on data someone SIRead-locked flags a `rw`-conflict and sets an in/out flag on each transaction. When one transaction ends up with BOTH an inbound and an outbound conflict flag — the dangerous structure — the engine aborts a transaction (preferring the pivot, unless it has already committed) with SQLSTATE 40001. SIRead locks survive the reader's commit, because a conflicting writer can still arrive later.](diagrams/ssi-04-ssi-detection.png)

The mechanism, piece by piece:

- **SIRead locks (predicate locks).** When a serializable transaction reads data, it acquires a **SIRead lock** on what it touched. These are *not* ordinary locks — they **never block** a writer. Their only job is to leave a record: "this transaction read this." A write that later falls on SIRead-locked data is exactly a detected `rw`-antidependency. (PostgreSQL wiki, "Serializable"; `README-SSI` in the source.)
- **Predicate granularity & phantoms.** Locks are taken at **tuple** level, escalating to **page** then **relation** as a transaction reads more (and via index-range locks to cover *predicates*, which is how SSI catches phantoms — rows that don't exist yet but would match). Coarser locks bound memory but flag more conflicts.
- **The abort rule.** Each transaction carries two flags: "has an inbound `rw`-conflict" and "has an outbound `rw`-conflict." When **both** get set on a single transaction (the pivot of two adjacent `rw`-edges), a serialization failure is unavoidable-in-principle, so the engine rolls one transaction back — **preferring to abort the pivot itself, unless the pivot has already committed**, in which case it aborts one of the others. The victim gets `ERROR: could not serialize access due to read/write dependencies among transactions`, **SQLSTATE 40001**.
- **Locks outlive the reader.** A SIRead lock must be *retained after the reading transaction commits*, because a writer that creates the dangerous structure can show up later. This is why long-lived and read-heavy transactions inflate the predicate-lock footprint (next section).

Because the detector fires on the dangerous *structure* and not on a confirmed cycle, it inherits the conservatism from §3: **every genuine write skew is caught, and some innocent transactions are aborted too.** The application's contract, in return, is simple and non-negotiable: **on 40001, retry the transaction.** (Idempotency from Book 1 is what makes that retry safe — see the Idempotency Keys deep dive.)

---

## 5. The price, the tuning, and the escape hatch

SSI buys true serializability at roughly snapshot-isolation throughput — no read locks, no reader-writer blocking, no deadlock-detector storms. But "roughly" and "conservative" both cost something, and senior use means knowing the bill.

![**The trade-off, and the fast path.** Versus strict 2PL (blocks readers, deadlocks) and plain SI (fast but admits write skew), SSI keeps reads non-blocking and stays correct — paying instead in false-positive aborts and predicate-lock memory. The escape hatch: a READ ONLY transaction can be proven to a "safe snapshot" where it can neither suffer nor cause an anomaly; PostgreSQL then runs it as plain REPEATABLE READ with zero SSI overhead. `READ ONLY DEFERRABLE` waits for such a snapshot on purpose.](diagrams/ssi-05-tradeoff.png)

**False-positive aborts.** Because the dangerous structure is sufficient-not-necessary (§3), some aborted transactions were actually serializable. The rate climbs with contention and with **coarse predicate locks** — when SIRead locks summarize from tuple to page to relation, unrelated rows start colliding and innocent transactions get flagged. Workloads with short transactions and selective reads see few false positives; high-contention or full-table-scan workloads see more.

**Predicate-lock memory.** SIRead locks accumulate and outlive their readers, so they consume a bounded shared pool sized by `max_pred_locks_per_transaction` (× connections). Run past it and PostgreSQL **summarizes** to coarser granularity — trading memory for a higher false-positive rate — rather than failing. One long-running serializable transaction holds its SIRead locks the whole time, the same way a long transaction starves VACUUM in the MVCC deep dive: **the oldest open transaction sets the cost.**

**The read-only escape hatch (the elegant part).** Ports & Grittner added a multiversion-serializability result: a **read-only** transaction is *safe* if it cannot be part of any dangerous structure — and that can sometimes be proven the moment its snapshot is taken (no concurrent read-write transaction can form the pivot against it). When a read-only transaction reaches such a **safe snapshot**, PostgreSQL silently **drops it from SERIALIZABLE to REPEATABLE READ**: it takes no SIRead locks, can never abort with 40001, and can never cause anyone else to. `SET TRANSACTION READ ONLY DEFERRABLE` opts in deliberately — the transaction *waits* until a safe snapshot is available, then runs with zero SSI overhead. Long analytics reads on a serializable cluster belong here.

**The discipline, and the limits:**

- **Always retry on 40001.** Serializable transactions *will* abort under contention; an app that doesn't retry is broken, not unlucky.
- **Keep transactions short and reads selective** — both cut false positives and predicate-lock pressure.
- **Use `READ ONLY DEFERRABLE` for long reporting queries** to get a free, abort-proof snapshot.
- **It's single-node.** PostgreSQL's SSI guarantees serializability *within one server*. It does **not** extend across shards or logical-replication boundaries for free — distributed serializability is a different, harder problem (Book 1's consensus, Book 5's design). Don't assume a sharded fleet is serializable because each node is.

The shape to remember: SSI is **optimistic** where two-phase locking is **pessimistic**. 2PL prevents conflicts by blocking up front and pays in latency and deadlocks; SSI lets everyone run on snapshots and pays at the end with the occasional conservative abort. For read-mostly, low-conflict OLTP — most systems — optimism wins. Push contention high enough and the abort-and-retry tax eventually exceeds 2PL's blocking tax; *that* crossover is the one number worth measuring before you trust SERIALIZABLE under load.

---

## Self-Check — Serializable Snapshot Isolation Deep Dive

Answer from memory before the key.

**Q1.** Snapshot isolation permits **write skew** specifically because…

- (a) two transactions write the same row and the later write silently wins
- (b) each reads a shared condition then writes a different, non-conflicting row
- (c) one transaction reads uncommitted data written by a second transaction
- (d) the snapshot is refreshed mid-transaction so reads stop being repeatable

**Q2.** A multiversion history is serializable exactly when its dependency graph…

- (a) contains only read-write antidependency edges and no others
- (b) has at least one transaction that reads before any others write
- (c) is acyclic — no cycle of "must-come-before" edges exists
- (d) forms a single connected component spanning every transaction

**Q3.** Fekete's theorem says every snapshot-isolation anomaly contains…

- (a) two consecutive rw-antidependency edges meeting at a pivot transaction
- (b) exactly one write-write conflict between two concurrent transactions
- (c) a read-only transaction that observes two different committed snapshots
- (d) a long-running transaction that pins the cleanup horizon far back

**Q4.** SSI may abort a transaction that was *actually* serializable because…

- (a) it materializes the full graph and miscomputes the cycle direction
- (b) SIRead locks block writers and force a deadlock-style rollback choice
- (c) the dangerous structure is sufficient for a cycle but not necessary
- (d) the dangerous structure is necessary for a cycle but not sufficient

**Q5.** PostgreSQL's safe-snapshot / `READ ONLY DEFERRABLE` optimization lets…

- (a) a read-only transaction run as REPEATABLE READ with no SSI overhead
- (b) a write transaction skip first-committer-wins for faster blind updates
- (c) the engine widen predicate locks from tuple level up to relation level
- (d) two serializable transactions share one snapshot to avoid any conflict

## Answer Key

- **Q1 → (b).** Write skew is two transactions reading an overlapping condition and each writing a *different* row, so SI's first-committer-wins (which only catches same-row write-write) never fires; both commit and break an invariant no serial order would.
- **Q2 → (c).** Serializable ⟺ the dependency graph is acyclic. A cycle asserts each transaction comes both before and after the others — impossible to serialize.
- **Q3 → (a).** Two *consecutive* rw-antidependency edges meeting at a pivot (inbound + outbound) — the "dangerous structure." It's the signature of every SI anomaly.
- **Q4 → (d).** The dangerous structure is **necessary** (every anomaly has it) but **not sufficient** (it also appears in serializable histories). Aborting on it catches all anomalies plus some innocents — conservative by design.
- **Q5 → (a).** A read-only transaction proven to reach a safe snapshot can neither suffer nor cause an anomaly, so Postgres runs it as plain REPEATABLE READ — no SIRead locks, no 40001. `READ ONLY DEFERRABLE` waits for that snapshot on purpose.

---

## Sources

- **Cahill, Röhm & Fekete — "Serializable Isolation for Snapshot Databases" (SIGMOD 2008; ACM TODS 2009):** the original SSI algorithm — track rw-antidependencies, abort on the dangerous structure.
- **Fekete, Liarokapis, O'Neil, O'Neil & Shasha — "Making Snapshot Isolation Serializable" (ACM TODS 2005):** the theorem that every SI anomaly has two consecutive rw-edges at a pivot.
- **Ports & Grittner — "Serializable Snapshot Isolation in PostgreSQL" (VLDB 2012, [arXiv:1208.4179](https://arxiv.org/pdf/1208.4179)):** the production implementation — SIRead predicate locks, lock granularity/summarization, crash recovery, 2PC, and the safe-snapshot read-only optimization.
- **PostgreSQL documentation** — "Transaction Isolation → Serializable Isolation Level," and the [Serializable wiki page](https://wiki.postgresql.org/wiki/Serializable); the in-tree `README-SSI`.
- **Berenson, Bernstein, Gray et al. — "A Critique of ANSI SQL Isolation Levels" (SIGMOD 1995):** the precise definition of snapshot isolation and why named-`SERIALIZABLE`-that-is-really-SI (e.g. Oracle) admits write skew.
- **Adya — "Weak Consistency: A Generalized Theory and Optimistic Implementations" (MIT PhD, 1999):** the multiversion dependency-graph framework the whole argument rests on.
- **Kleppmann — DDIA, Chapter 7** ("Transactions" → Serializability → Serializable Snapshot Isolation): the accessible synthesis.
