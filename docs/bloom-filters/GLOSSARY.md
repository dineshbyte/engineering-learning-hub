# Glossary — Bloom Filters

Adhere to these terms in every lesson. Each entry has an `_Avoid_` line — the loose
phrasing that costs precision in an interview.

- **Bloom filter** — a space-efficient probabilistic structure for set *membership*. Answers
  "is x in the set?" with "definitely no" or "probably yes."
  _Avoid_: calling it "a set" — it stores no elements, only a fingerprint of them.

- **False positive** — the filter says "present" for an item never added. Possible, and tunable.
  _Avoid_: treating it as a bug — it's the designed trade-off, not a defect.

- **False negative** — the filter says "absent" for an item that was added. **Impossible** in a
  standard Bloom filter; this is the guarantee everything rests on.
  _Avoid_: hedging "probably not there" on a negative — a negative is certain.

- **Bit array (m)** — the m-bit vector the filter is. Insert/query flip and read bits in it.
  _Avoid_: "the table" — there are no buckets or stored keys.

- **Hash functions (k)** — k independent hashes mapping an item to k bit positions.
  _Avoid_: "the hash" — there are k of them, and independence matters.

- **n** — the number of distinct items inserted (the load the filter is sized for).

- **Optimal k** — the hash count minimising false positives: `k = (m/n)·ln 2`.
  _Avoid_: "more hashes = more accurate" — accuracy peaks at optimal k, then worsens.

- **False-positive rate (FPR)** — `(1 − e^(−kn/m))^k`; at optimal k it is `(0.5)^k`.
  _Avoid_: quoting a fixed "1%" — FPR depends on m, n, and k.

- **Counting Bloom filter** — a variant using small counters instead of bits to allow deletes.
  _Avoid_: claiming a *standard* Bloom filter supports deletion — it does not.

- **Saturation / fill-up** — as more items are added, more bits set, FPR climbs toward 1.
  _Avoid_: assuming a Bloom filter's accuracy is constant regardless of load.
