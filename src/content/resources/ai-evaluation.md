---
title: "Resources — high-trust sources for AI Evaluation"
---
# Resources — high-trust sources for AI Evaluation

Ground every non-obvious claim in these; cite inline (`<sup>` → `#sources`). Populated before
teaching. Prefer primary sources (specs, vendor engineering docs, papers) over secondary
commentary. Evaluation facts taught wrong fail an interview — verify before stating.

## Primary specs / docs
- **OpenAI — Evals framework** (github.com/openai/evals). Reference implementation of an eval
  harness: registry of evals, model-graded vs exact-match graders, datasets-as-code. The shape
  most production harnesses copy.
- **Anthropic — "Create strong empirical evaluations"** (docs.anthropic.com, Build with Claude →
  Test & evaluate). Vendor guidance on building task-specific evals, grading methods, and why you
  evaluate the *system* not the model.
- **Anthropic — "Define your success criteria"** (docs.anthropic.com). How to turn a fuzzy quality
  goal into measurable, per-task pass/fail criteria before you write a single eval case.
- **RAGAS — documentation** (docs.ragas.io). The de-facto metric vocabulary for RAG/agent eval:
  faithfulness, answer relevancy, context precision/recall — reference-free, LLM-assisted scoring.

## Papers & deeper reading
- **Zheng et al., 2023 — "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"**
  (arXiv:2306.05685). The reference study for LLM-as-a-judge: strong judges reach ~80% agreement
  with humans (same as human–human), and documents judge biases (position, verbosity, self-bias).
- **Liu et al., 2023 — "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment"**
  (arXiv:2303.16634). Chain-of-thought + form-filling judge prompting; shows a judge can prefer
  LLM-generated text — the self-preference bias to design around.
- **Liang et al., 2022 — "Holistic Evaluation of Language Models" (HELM)** (Stanford CRFM,
  arXiv:2211.09110). Why one number is never enough: evaluate across many scenarios *and* many
  metrics (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency) and surface the
  trade-offs.
- **Es et al., 2023 — "RAGAS: Automated Evaluation of Retrieval Augmented Generation"**
  (arXiv:2309.15217). The paper behind the RAGAS metrics — reference-free RAG scoring without
  ground-truth human annotations.

## Notes on trust
- Vendor docs describe *their* product and move fast; treat specific grader names, model IDs, and
  default thresholds as version-dependent and re-check current docs before teaching as fact.
- Benchmark leaderboards rot (contamination, saturation, new models). Teach the *method* of
  building and reading an eval, not a leaderboard rank that will be stale by the time anyone reads it.
- "~80% judge–human agreement," judge-bias magnitudes, and any correlation numbers are illustrative
  and dataset-dependent — cite the study, not the digit, and re-verify before quoting in an interview.
