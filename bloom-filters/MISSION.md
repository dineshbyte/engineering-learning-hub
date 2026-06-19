# Mission: Bloom Filters (Senior / systems-design level)

## Why
Be able to reach for a Bloom filter — and *defend the choice* — in a senior backend /
systems-design interview, and recognise it in real systems (LSM-tree databases, CDNs,
dedup pipelines). The learner knows the name and the one-liner ("probabilistic set");
the gap is the senior framing: the membership-test asymmetry, the space/accuracy math,
the failure modes, and when NOT to use one.

## Success looks like
- Can state the defining asymmetry without hesitating: **no false negatives, possible
  false positives** — and explain why that asymmetry is the entire point.
- Can size one on a whiteboard: given n items and a target false-positive rate, derive
  the bit-array size m and optimal hash count k = (m/n)·ln 2.
- Can place it in a real architecture (e.g. skip disk reads in an LSM-tree read path)
  and name the trade-off it buys and the one it costs.
- Knows the limits cold: can't delete (standard), degrades as it fills, needs good/independent
  hashes — and what to use instead (counting / cuckoo / scalable Bloom filters).
- Recalls all of the above from memory under pressure (storage strength, not fluency).

## Constraints
- Language-agnostic: the data structure and its math, not a specific library.
- Interview-oriented: each lesson ends in retrieval practice + an out-loud rehearsal.
- Short lessons, one tangible win each — respect working-memory limits.
- Infographic-first: the bit-array picture carries the idea; prose is the caption.

## Out of scope (for now)
- Heavy probability derivations beyond the standard FP formula and optimal-k result.
- Exotic variants past a one-line mention (blocked, partitioned, learned Bloom filters).
- Hash-function internals — assumed "good enough, independent" unless it sharpens a point.
