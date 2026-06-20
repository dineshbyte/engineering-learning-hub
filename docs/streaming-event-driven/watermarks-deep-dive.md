# Watermarks — Deep Dive

*A supplement to Book 4, Lesson 8. The intro called a watermark "a moving estimate of event-time progress." True — and that one sentence hides the whole reason stream processing is hard. A watermark is a guess about completeness; getting it wrong stalls your pipeline or drops your data; and the deepest idea in modern streaming is that the watermark does **not** decide when you emit output. This goes to the floor.*

Dense. Read it after Lesson 8 has settled.

---

## Where Lesson 8 stopped

You learned the two clocks — **event time** (when it happened) vs **processing time** (when you saw it) — that events arrive **out of order** and **late**, that you bucket them into **windows** by event time, and that a **watermark** lets a window fire and late events get dropped or side-outputted. Each of those is a doorway. Behind them: what a watermark precisely claims, why it is usually a *heuristic* (and what that costs you), why one idle input can freeze an entire pipeline, and the Dataflow-model insight that separates *when a window fires* from *when its event time is complete*. That separation is the thing most engineers never learn, and it is what makes late data a non-problem.

---

## 1. What a watermark actually asserts

Strip away the metaphor. A watermark is a single timestamp, carried alongside the data, that makes a **claim about completeness**:

> **A watermark `W` asserts: "event time has advanced to `W` — no event with timestamp ≤ `W` will arrive from here on."** It is a monotonically non-decreasing lower bound on the timestamps of all *future* records.

When the watermark for a window's end passes, the system is being *told* "this window is complete; you may compute its final result." That is the entire job of a watermark: to convert the open-ended question "have I seen all the data for 12:00–12:05 yet?" into a concrete signal. And here is the part Lesson 1 of Book 1 prepared you for — **that signal is a guess.** A watermark is to event-time completeness exactly what a *timeout* was to failure detection: a heuristic the system commits to because it cannot wait forever for certainty. Same shape, same trap.

---

## 2. Perfect vs heuristic watermarks — and the tension that defines streaming

There are two kinds, and the difference is the difference between theory and your on-call pager.

A **perfect watermark** is possible only when you have perfect knowledge of the input's timestamps — say a single Kafka partition whose records are written in event-time order, or a source with a hard, known maximum delay. Then the watermark can be *exact*: it never advances past an event that has not arrived, so **there is never any late data.** Clean, and rare.

A **heuristic watermark** is what you actually have. The source *estimates* event-time progress from whatever it can see — most commonly "the maximum timestamp I've observed, minus an allowed-lateness bound `B`" (the *bounded-out-of-orderness* generator). Because it is an estimate, it is wrong in one of two directions, and you choose which way to be wrong:

![**Perfect vs heuristic watermarks.** A perfect watermark never passes an unseen event, so nothing is ever late. A heuristic watermark is a guess: set it too fast and real events arrive "late" and get dropped; too slow and windows fire late while state piles up.](diagrams/dd-01-watermark-skew.png)

| If the watermark is… | Then… | You lose |
|---|---|---|
| **too fast** (over-aggressive) | it passes window-end before stragglers arrive; those events are now "late" | **completeness** — late data dropped |
| **too slow** (over-conservative) | it lags real progress; windows fire long after their data is in | **latency** — results delayed, state held longer |

> **The tension that defines stream processing:** a watermark trades **completeness against latency.** Advance it eagerly for fast results and you drop stragglers; advance it conservatively for completeness and everything gets slower and more expensive. There is no setting that wins both — only one matched to how late your data really runs.

This is why "just set the watermark correctly" is not advice. The watermark is a *policy*, and §5 shows the escape hatch that makes the policy far less painful than it sounds.

---

## 3. Generation and propagation: the min rule, and the idle-partition stall

A pipeline is a graph of operators, and watermarks flow through it as special markers interleaved with the data. The propagation rule is short and consequential:

> **An operator's watermark is the MINIMUM of the watermarks of all its inputs.** (Held back further by any buffered state with pending event-time timers.)

The min is forced: you cannot claim "event time is complete up to `W`" on your output if even one input might still deliver something older than `W`. The slowest input governs the whole operator. When you `union` two streams, or a keyed operator reads three partitions, its progress is pinned to whichever input lags most.

That rule has a famous, vicious failure mode.

![**The min rule and the idle-partition stall.** An operator's watermark is the minimum across its inputs. If one partition goes idle, its watermark stops advancing, pins the minimum, and every downstream window freezes — even though data is flowing on the other inputs.](diagrams/dd-02-watermark-min-inputs.png)

Suppose three input partitions feed an operator. Two are busy, their watermarks climbing. The third goes **idle** — no records at all (a quiet Kafka partition, a key range with no traffic right now). With no new timestamps, its watermark *stops advancing*. The min rule then pins the operator's watermark to that idle partition's stale value, **forever or until it gets data.** Downstream windows never reach their firing point. To an operator watching the dashboard, the pipeline is processing records but emitting nothing — **stalled, with no error.** This is one of the most common real streaming incidents, and the cause is always the same: a watermark held hostage by a silent input.

The fix is **idleness detection**: after a configurable quiet period, mark the idle source *idle* and **exclude it from the minimum** (Flink's `WatermarkStrategy.withIdleness`, Beam's idle-source handling), so the busy inputs can carry the watermark forward. Re-include it the moment it produces data again. Knowing this one knob is the difference between a two-minute fix and a two-day outage.

---

## 4. Triggers: *when to fire* is not the watermark

Here is the deepest idea in the whole topic, from Akidau et al.'s *Dataflow Model* (VLDB 2015). Three questions that everyone conflates are actually independent:

1. **Where** in event time is the data grouped? → **windowing**.
2. **When**, in processing time, is a result emitted? → **triggers**.
3. **How** do successive results for the same window relate? → **accumulation mode**.

The watermark only *informs* question 2; it does not *answer* it. A **trigger** decides when a window materialises output, and it can fire **more than once**:

![**Triggers decouple firing from the watermark.** A window can fire EARLY (speculative partial results before the watermark), ON-TIME (when the watermark passes window-end), and LATE (again when stragglers arrive, within allowed lateness) — then its state is dropped and truly-late data is discarded.](diagrams/dd-03-triggers.png)

- **Early (speculative) firings** — emit partial results *before* the watermark passes, e.g. every few seconds of processing time. You get a low-latency running answer that is incomplete but improving.
- **On-time firing** — the default: fire once when the watermark crosses the window's end. The "this is complete" result.
- **Late firings** — fire *again* when a straggler arrives *after* the watermark, updating the result.

And **accumulation mode** says how a late or early re-firing relates to what you already emitted:

| Mode | Each firing emits | Downstream must |
|---|---|---|
| **Discarding** | only what's new since the last firing (a delta) | sum the deltas itself |
| **Accumulating** | the full result-so-far (overwrites the previous) | replace the prior value |
| **Accumulating + retracting** | a retraction of the old value *plus* the new one | apply both for exactness |

This is the answer to "but what about late data?" that Lesson 8 left open. **You do not have to drop it.** With late-firing triggers and an accumulating mode, a straggler arrives, the window re-fires, and the result is *corrected*. The watermark stops meaning "discard everything after this" and starts meaning "emit the on-time result around here" — a completeness *estimate*, not a guillotine. Decoupling these three questions is the single most useful mental model in stream processing.

---

## 5. Allowed lateness, and the three-way trade-off

Late firings cannot run forever — a window cannot keep its state indefinitely waiting for stragglers, or memory grows without bound. **Allowed lateness** is the horizon: after the watermark passes a window's end, the engine keeps that window's state for an extra `allowedLateness` duration. Late events within it trigger late firings; once it expires, the window's state is **garbage-collected**, and any event later than that is *truly* late — dropped, or routed to a **side output / dead-letter** for separate handling (never silently, if you value your data).

That knob completes a **three-way trade-off**, and watermarks/triggers/allowed-lateness are the three dials that set it:

> **Completeness vs latency vs cost.** Fire *early* → lower latency, less complete. Wait for the *watermark* → more complete, higher latency. Hold state *longer* (more allowed lateness) → tolerate more lateness, at the cost of memory. You cannot maximise all three. Pick the two your use case needs and pay for the third deliberately.

A fraud check wants low latency and tolerates re-firing (early + late firings, short state). A billing rollup wants completeness and accepts delay (conservative watermark, long allowed lateness). Same windowing primitives; opposite dial settings — exactly the per-workload judgement this whole series has been training.

---

## Self-Check — Watermarks Deep Dive

Answer from memory before the key.

**Q1.** A watermark `W` flowing through a pipeline asserts that…

- (a) no event with a timestamp at or below W will still arrive
- (b) every event seen so far had a timestamp strictly above W
- (c) the processing-time clock has now advanced to exactly W
- (d) all windows ending before W have already emitted output

**Q2.** A heuristic watermark set too *fast* (too aggressive) costs you…

- (a) latency, because windows fire well after their data lands
- (b) completeness, because real stragglers count as late and drop
- (c) ordering, because events get reshuffled across the windows
- (d) memory, because window state is held far longer than needed

**Q3.** A pipeline emits nothing despite healthy input because one partition went idle. The cause is…

- (a) the operator watermark is the minimum across all its inputs
- (b) the idle partition is replaying its log from the first offset
- (c) the Bloom filter on that partition rejected every new record
- (d) back-pressure from a downstream sink paused all the sources

**Q4.** In the Dataflow model, what decides *when* a window emits a result is the…

- (a) watermark, which fires the window exactly once when it passes
- (b) trigger, which may fire early, on-time, and late, more than once
- (c) window size, which sets a fixed processing-time emit interval
- (d) accumulation mode, which controls how late events are merged

## Answer Key

- **Q1 → (a).** A watermark is a completeness claim: a monotonic lower bound asserting no future event will have a timestamp ≤ W.
- **Q2 → (b).** Too-fast watermarks pass window-end before stragglers arrive, so those events are classified late and (absent late firings) dropped — a loss of completeness.
- **Q3 → (a).** The watermark is the *minimum* of input watermarks; an idle input's stale watermark pins the minimum and freezes downstream windows. Fix: idleness detection excludes it.
- **Q4 → (b).** Triggers decide *when* to emit and can fire multiple times (early/on-time/late); the watermark only *informs* the on-time firing, and accumulation mode governs *how* firings relate.

---

## Sources

- **Akidau, Bradshaw, Chambers, Chernyak, Fernández-Moctezuma, Lax, McVeety, Mills, Perry, Schmidt & Whittle — "The Dataflow Model" (VLDB 2015).** The paper that separated windowing, triggering, and accumulation.
- **Akidau — "Streaming 101" and "Streaming 102" (O'Reilly, 2015–16),** and the book ***Streaming Systems*** (Akidau, Chernyak & Lax, 2018). The definitive treatment of watermarks and triggers.
- **Apache Flink documentation** — *Generating Watermarks*, `WatermarkStrategy.withIdleness`, allowed lateness, side outputs.
- **Apache Beam documentation** — windowing, triggers, accumulation modes, late data.
- **Kleppmann — DDIA, Chapter 11** — event time vs processing time, the reasoning about "when is a window complete?"
