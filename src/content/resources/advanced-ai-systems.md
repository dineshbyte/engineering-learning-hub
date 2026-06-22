---
title: "Resources — high-trust sources for Advanced AI Systems"
---
# Resources — high-trust sources for Advanced AI Systems

Ground every non-obvious claim in these; cite inline (`<sup>` → `#sources`). Populated before
teaching. Prefer primary sources (papers, vendor engineering blogs) over secondary commentary.
This phase is skeptical by design: most of these sources also tell you *when not* to reach for the
fancy thing.

## Primary specs / docs
- **[Anthropic — "Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents)**
  (anthropic.com/engineering). The anti-hype spine of this track: start with the simplest thing that
  works; reach for multi-agent only when the task is genuinely parallel and the coordination cost
  pays for itself. Read its multi-agent caution first.
- **[Anthropic — "Effective context engineering for AI agents"](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)**
  (anthropic.com/engineering). Long-horizon agents live or die on context budget; this is the
  reference for compaction and sub-agent context isolation.
- **[OWASP — Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)**
  (owasp.org). Autonomy raises the blast radius: excessive agency, insecure tool use, and
  supply-chain risk are the failure modes for the autonomous-systems lesson.

## Papers & deeper reading
- **[Wei et al., 2022 — "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"](https://arxiv.org/abs/2201.11903)**
  (arXiv:2201.11903). Why a model reasons better when it thinks in steps — the seed idea behind
  reasoning models and test-time compute.
- **[Yao et al., 2023 — "Tree of Thoughts: Deliberate Problem Solving with Large Language Models"](https://arxiv.org/abs/2305.10601)**
  (arXiv:2305.10601). Search over reasoning paths (explore/evaluate/backtrack) instead of one greedy
  chain — the bridge from prompting tricks to spending compute at inference time.
- **[Wu et al., 2023 — "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"](https://arxiv.org/abs/2308.08155)**
  (arXiv:2308.08155). A concrete multi-agent framework (conversable agents, conversation
  programming) — the canonical reference for orchestrator-worker and group-chat patterns.
- **[Park et al., 2023 — "Generative Agents: Interactive Simulacra of Human Behavior"](https://arxiv.org/abs/2304.03442)**
  (arXiv:2304.03442). Long-horizon agents with a memory stream + reflection + planning; the
  cleanest worked example of how persistent state drives behavior over many steps.
- **[Hu et al., 2021 — "LoRA: Low-Rank Adaptation of Large Language Models"](https://arxiv.org/abs/2106.09685)**
  (arXiv:2106.09685). Parameter-efficient fine-tuning: adapt a frozen base model by training small
  low-rank matrices. The practical default when fine-tuning is actually warranted.
- **[Hinton, Vinyals & Dean, 2015 — "Distilling the Knowledge in a Neural Network"](https://arxiv.org/abs/1503.02531)**
  (arXiv:1503.02531). The original knowledge-distillation paper: train a small student to mimic a
  large teacher. Background for "distill a cheaper model" vs "fine-tune" vs "prompt."

## Notes on trust
- Vendor blogs describe *their* product's strategy; treat product specifics (exact orchestration
  shape, model names) as version-dependent and verify against current docs before teaching as fact.
- Numbers (token costs, context sizes, latency) drift fast — teach the *shape* of the trade-off and
  give concrete numbers only as illustrative "at time of writing."
- The multi-agent / autonomy space is young and fashion-driven. Where a claim is a vendor's design
  choice rather than a settled result, label it as such; prefer the failure-mode framing.
