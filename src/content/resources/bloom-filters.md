---
title: "Bloom Filter Resources"
---
# Bloom Filter Resources

High-trust only: the original paper, a peer-reviewed re-analysis, the canonical survey,
and a real production use. URLs confirmed during curation (2026-06-19).

## Knowledge

### Primary / original
- [Bloom, B. H. (1970), "Space/Time Trade-offs in Hash Coding with Allowable Errors", CACM 13(7)](https://dl.acm.org/doi/10.1145/362686.362692)
  The original paper that defines the structure and the space/time/accuracy trade-off.
  Use for: the first-principles framing — "allowable errors" in exchange for space.
  **Primary read for Lesson 1.**

### Analysis & math
- [Christensen, Roginsky, Jimeno (NIST), "A New Analysis of the False-Positive Rate of a Bloom Filter"](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=903775)
  Shows the textbook FP formula is a (very good) approximation and where it drifts for
  small m. Use for: the honest senior caveat that (0.5)^k is the *optimum* approximation.
- [Mitzenmacher & Broder, "Network Applications of Bloom Filters: A Survey", Internet Mathematics 1(4)](https://www.eecs.harvard.edu/~michaelm/postscripts/im2005b.pdf)
  The canonical survey: FP rate, optimal k = (m/n)·ln 2, and counting Bloom filters.
  Use for: the derivations and the variants in one trusted place.

### Reference / quick recall
- [Wikipedia — Bloom filter](https://en.wikipedia.org/wiki/Bloom_filter)
  Well-maintained, citation-dense. Use for: fast recall of the formulae and variant list.

### Production use (exemplar)
- [RocksDB Wiki — Bloom Filter](https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter)
  How an LSM-tree database uses per-SSTable Bloom filters to skip disk reads for absent
  keys. Use for: the "where does this actually live" answer interviewers want.

## Wisdom (Communities)
- [r/algorithms](https://www.reddit.com/r/algorithms/) — sanity-check activity before relying.
- [Computer Science Stack Exchange](https://cs.stackexchange.com/) — strong tag for
  probabilistic data structures; good for testing a derivation against experts.

## Gaps
- No single vendor-neutral "probabilistic data structures" community verified to a high
  bar; the StackExchange tag is the most reliable place to pressure-test understanding.
