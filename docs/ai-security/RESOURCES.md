# Resources — high-trust sources for AI Security

Ground every non-obvious claim in these; cite inline (`<sup>` → `#sources`). Populated before
teaching. This is interview prep — a wrong fact taught confidently fails a round. Prefer primary
sources (standards bodies, the original attack papers, vendor engineering) over secondary blog
commentary. All URLs below were verified this session.

## Primary specs / docs
- **OWASP — Top 10 for Large Language Model Applications**
  (owasp.org/www-project-top-10-for-large-language-model-applications/; current list:
  genai.owasp.org/llm-top-10/). The shared vocabulary every reviewer expects you to name:
  LLM01 Prompt Injection, sensitive-information disclosure, supply-chain, excessive agency, etc.
  Treat the list as the *interview lingua franca*, not gospel — version it (2025 edition).
- **NIST AI 100-2 — "Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and
  Mitigations"** (csrc.nist.gov/pubs/ai/100/2/e2023/final; PDF nvlpubs.nist.gov). The neutral
  taxonomy: evasion / poisoning / privacy / (for GenAI) misuse, organized by attacker goal,
  capability, and knowledge. Use it to frame *threat models* precisely instead of hand-waving.
- **MITRE ATLAS — Adversarial Threat Landscape for AI Systems** (atlas.mitre.org). ATT&CK-style
  matrix of real-world adversary tactics/techniques against AI systems, with case studies. The
  source for "what does an attack actually look like end-to-end," useful for red-team scenarios.

## Papers & deeper reading
- **Greshake, Abdelnabi, et al., 2023 — "Not What You've Signed Up For: Compromising Real-World
  LLM-Integrated Applications with Indirect Prompt Injection"** (arXiv:2302.12173). The paper that
  named *indirect* prompt injection: instructions hidden in retrieved data (webpages, docs, emails,
  tool output) that the model later obeys. The spine of Lessons 1–2.
- **Zou, Wang, Carlini, Nasr, Kolter, Fredrikson, 2023 — "Universal and Transferable Adversarial
  Attacks on Aligned Language Models"** (arXiv:2307.15043). The GCG attack: an optimized adversarial
  suffix that jailbreaks aligned models and *transfers* across them. Evidence that alignment is a
  soft filter, not a security boundary — why defense-in-depth, not "the model will refuse."

## Notes on trust
- Standards drift: OWASP LLM Top 10 and NIST AI 100-2 are both versioned and revised yearly. Teach
  the *categories* as durable; cite the edition for any specific ranking or wording.
- Attack papers describe what was demonstrated against *specific* models at a point in time. The
  mechanism is durable; "model X refuses / doesn't" is not — never teach a current model's behavior
  as a fixed fact.
- No defense in this track is presented as complete. The whole posture is layered controls +
  least privilege + assume-breach; anything framed as "this stops prompt injection" is wrong.
