# AI Product Management — Rewritten Curriculum (v2, GenAI-first)

> Drop-in replacement for the 10-module curriculum on
> `edyoda.com/micro-degree/ai-product-management-micro-degree`.
> **Constraints preserved:** 6 weeks · 100% live weekends · max batch 15 · no-code / strategy
> audience (no Python, no stats) · 10 modules · 6 sub-topics each (matches current page format).
> **Core change:** GenAI / LLMs / agents / evals / RAG move from "the future" (old Module 10)
> to the **spine** of the course. Classical ML is demoted to "enough to talk to your DS team."

---

## Why this rewrite (the gap it closes)

The current curriculum is a 2023-era *ML*-PM course with GenAI bolted on as the final module.
The field has moved. Across ~55 sources — AI-PM educators (Marily Nika, Aakash Gupta, Pawel
Huryn, Miqdad Jaffer, Claire Vo, Peter Yang, Lenny Rachitsky), builder-authorities (Hamel
Husain & Shreya Shankar, Eugene Yan, Anthropic, OpenAI), and real 2026 job descriptions
(OpenAI, Anthropic, Google, Scale) — the consensus is unambiguous:

| Field consensus (2025–26) | Where the old curriculum put it |
|---|---|
| **Evals are the #1 new AI-PM skill** | A sub-bullet inside "Metrics" (M6) |
| **GenAI/LLMs/RAG/agents are the present core** | Quarantined in M10, "the Future" |
| **Agents + tool/MCP design + guardrails** | Absent entirely |
| **Context engineering + RAG** | Absent entirely |
| **Prompt engineering as a toolkit** | One bullet in M10 |
| **Unit economics / cost-per-feature** | Abstract "cost tradeoffs" in M2/M10 |
| **AI-specific security (prompt injection, isolation)** | Conflated with ethics in M9 |
| **Build-first / prototyping (vibe coding)** | Absent |

This v2 fixes all of it without breaking the no-code promise or the 6-week shape.

---

## The 10 modules at a glance

| # | Module | Old equivalent | What changed |
|---|---|---|---|
| 1 | Thinking in Probabilities: The AI Product Mindset | M1 | + Minimum Viable Quality (MVQ), "launch = quality gate" |
| 2 | Spotting (and Killing) AI Opportunities | M2 | + unit-economics intro, "don't be an API wrapper" |
| 3 | Prompting & Spec-by-Example | *new* (was 1 bullet in M10) | Promoted to a full module |
| 4 | Context Engineering & RAG | *new* | Promoted to a full module |
| 5 | **Evals: The AI PM's Superpower** | replaces M6's classical metrics | The flagship new module |
| 6 | Designing AI Experiences (UX for Uncertainty) | M5 | Updated to 2026 (trust calibration, streaming, citations) |
| 7 | Building AI Agents | *new* | Promoted to a full module (uses n8n) |
| 8 | Shipping: Cost, Latency & Launch Economics | M7 + cost depth | + token economics, Cache/Route/Compress, pricing |
| 9 | Trust, Safety & Responsible AI | M9 split & sharpened | + OWASP LLM Top 10, prompt injection, isolation |
| 10 | Leading AI Products & What's Next | M8 + M10 tail | Collaboration + role evolution + frontier |

Data (old M3) and PM↔DS collaboration (old M8) are **folded in where they're used** — data
into M2/M4, collaboration into M5/M7/M10 — rather than taught as standalone abstractions.
This is what frees the four new slots without adding weeks.

---

# Module 1 — Thinking in Probabilities: The AI Product Mindset

*The mental model that makes everything else make sense. Pure strategy, zero code.*

**Sub-topics Covered**
1. Deterministic vs Probabilistic Products — Why AI Predicts Instead of Computes
2. Why AI Products Fail More Often — Designing for Errors, Not Around Them
3. The Five Tools and When Each Is Wrong — Rules vs ML vs Prompting vs RAG vs Fine-Tuning
4. Minimum Viable Quality (MVQ): The AI Equivalent of MVP
5. "Launch Is a Quality Gate, Not a Deadline" — The Probabilistic Worldview
6. Reframing AI as a Capability, and the Human-in-the-Loop Default

> *Grounding:* Sid Arora (JAPM, "design for errors / launch = quality gate"); Marily Nika
> (AI Product Development Lifecycle + MVQ); Eugene Yan et al. (applied-llms.org, "focus on the
> system, not the model").

---

# Module 2 — Spotting (and Killing) AI Opportunities

*From "should this even be AI?" to a prioritized, economically-honest opportunity.*

**Sub-topics Covered**
1. AI-Suitable vs AI-Unsuitable Problems — The "Should This Be AI?" Checklist
2. Automation vs Augmentation — Choosing the Right Level of Human Control
3. Data Readiness as a Go/No-Go Gate — Cold Starts, Feedback Loops & Data Flywheels
4. The First Look at Unit Economics — Will This Pencil Out at Scale?
5. Moats Beyond the Model — Proprietary Data, Distribution, "Don't Be an API Wrapper"
6. Case Teardown: From Good Idea to Bad AI Product

> *Grounding:* Miqdad Jaffer / Product Faculty (AI product strategy, moats, "API wrapper");
> Dan Hockenmaier / Reforge (proprietary-data moats). Data-readiness content absorbed from
> the old Module 3.

---

# Module 3 — Prompting & Spec-by-Example

*Your first hands-on AI skill — and the one that doubles as your spec and your eval set.*

**Sub-topics Covered**
1. The Prompting Technique Grid — Chain-of-Thought, Roles, Few-Shot, Constraints, XML Tags
2. Prompt Chaining & Self-Consistency — Composing Reliable Multi-Step Prompts
3. The System Prompt as a PM Deliverable — Writing and Iterating It
4. Spec-by-Example — Requirements as Input / Output / Edge / Failure Examples (not "the system shall…")
5. How Your Examples Become Your Test Cases (Bridge to Evals)
6. Hands-On: Turn a Fuzzy Feature Request into a Working, Specced Prompt

> *Grounding:* Aakash Gupta ("#1 skill for great agents + productivity"); Sid Arora
> (spec-by-example); Pawel Huryn (14 prompting techniques); Marily Nika (PMs author system prompts).

---

# Module 4 — Context Engineering & RAG

*Where the right answer actually comes from. The discipline Karpathy & Lütke say succeeds prompting.*

**Sub-topics Covered**
1. Context Engineering vs Prompt Engineering — Designing the Whole Context Window
2. "Lost in the Middle" & Context Rot — Where to Place Critical Information
3. RAG in Plain English — Why You Ground Models in Your Own Data
4. The RAG Levers, in Order of Leverage — Chunking, Embeddings, Hybrid Search, Reranking, Freshness
5. Separating Retriever Quality from Generation Quality When Debugging
6. Hands-On: Build a Grounded Q&A Over a Document Set (no-code)

> *Grounding:* Andrej Karpathy & Tobi Lütke ("context engineering" framing, Jun 2025);
> Anthropic (effective context engineering, context rot); Liu et al. "Lost in the Middle"
> (TACL 2024); industry RAG consensus (chunking = biggest dial, hybrid + rerank).

---

# Module 5 — Evals: The AI PM's Superpower  ⭐ flagship

*The single most-demanded new skill in the field. "Evals are the new PRDs."*

**Sub-topics Covered**
1. Error Analysis First — Read Real Traces, Open-Code Failures, Find Your 5–6 Failure Modes
2. Golden Datasets & Regression Suites — Catching Silent Eval Regressions
3. LLM-as-Judge, Done Right — Aligning It to Human Labels Before You Trust It (binary > 1–5)
4. The Three Levels of Evals — Assertions → Human + LLM-Judge on Traces → A/B Tests
5. Retrieval Evals vs Generation Evals — Recall, Grounding, Attribution, Citation Quality
6. Evals as Living PRDs — Turning Acceptance Criteria into a Quality Gate

> *Grounding:* Hamel Husain & Shreya Shankar (Parlance Labs — the canonical error-analysis-first
> method; "evals are the hottest new skill"); Eugene Yan ("fix your process, not the judge";
> binary over Likert; Cohen's Kappa alignment); Reforge AI Evals; echoed by Aakash, Marily,
> Peter Yang and frontier-lab JDs. *Replaces the old Module 6's classical precision/recall focus
> — that survives as one lesson in Module 10's quantitative-literacy bridge.*

---

# Module 6 — Designing AI Experiences (UX for Uncertainty)

*Designing for outputs that are sometimes wrong — the 2026 version.*

**Sub-topics Covered**
1. Designing for Non-Determinism — Fallbacks, Validation Layers, Confidence-Gated Actions
2. Trust *Calibration*, Not Trust Maximization — Appropriate Reliance Is the Goal
3. The Overreliance Trap — Why Confident Explanations Can Backfire (and what to do instead)
4. Hallucination & Citation Design — Grounding, Sources, Honest Uncertainty
5. Streaming & Progressive UX — Masking Variable Latency, Showing Real Progress
6. Human Override, Undo & Escalation as First-Class Controls

> *Grounding:* Emily Campbell (Shape of AI vocabulary); Product Faculty (3P + 4 design patterns);
> Mantlr / Smashing (non-determinism patterns); NN/g (citation/uncertainty — **and the warning
> that a naked confidence score can increase misplaced trust**); designative.info + arXiv on
> overreliance; Groovyweb (streaming UX). Updates the old Module 5.

---

# Module 7 — Building AI Agents

*The 2025–26 product surface. Taught hands-on in n8n — which EdYoda already uses.*

**Sub-topics Covered**
1. Workflows vs Agents — Start Simple, Add Autonomy Only When It Measurably Helps
2. The Five Workflow Patterns — Chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer
3. Tool & MCP Design as Product Design — Schemas, Descriptions, Examples, Argument Validation
4. Guardrails Outside the Model — Loop Budgets, Tool Budgets, Stop Conditions, Recovery Paths
5. Autonomy Tiers & Human-in-the-Loop Approval Gates — Action Scoping, Rollback, Monitoring
6. Hands-On: Build a Guard-railed Multi-Step Agent in n8n

> *Grounding:* Anthropic ("Building Effective Agents" — the five patterns, "start simple";
> "Writing tools for agents"; MCP standard); Pawel Huryn (learn agents by building, n8n examples);
> Colin Matthews (agent system design for PMs); OpenAI Agents SDK (input/output guardrails, HITL);
> Marily Nika (*Building AI-Powered Products* Ch.8).

---

# Module 8 — Shipping: Cost, Latency & Launch Economics

*The unit-economics skill that separates an AI PM from a SaaS PM.*

**Sub-topics Covered**
1. Token Economics for PMs — Cost Is a Distribution; Output Tokens Cost 3–5× Input; Context-Window Creep
2. Cost Attribution Per Feature, Workflow, Tenant & User Journey — Not Just Per Model
3. The Cache / Route / Compress Levers — Model Routing, Prompt vs Semantic Caching
4. Latency as a Spec-Time Constraint — First-Token vs Per-Token Speed, Streaming for Perceived Speed
5. Pricing AI Products — Usage vs Per-Seat vs Hybrid; Protecting Margin
6. The AI Launch Playbook — MVQ Gate, Staged Rollout, Post-Launch Improvement Loop

> *Grounding:* FinOps Foundation (token pricing, capacity options); Eric Klein / Workday
> (per-tenant unit cost); Mavik Labs (Cache/Route/Compress); Sid Arora (cost attribution
> per feature/tenant); Miqdad Jaffer (pricing + adoption psychology). Merges the old Module 7
> with the cost depth the field demands.

---

# Module 9 — Trust, Safety & Responsible AI

*Two distinct jobs the old curriculum blurred: product **security** and responsible-AI **governance**.*

**Sub-topics Covered**
1. The OWASP LLM Top 10 as Your Product-Security Checklist — Prompt Injection (#1) & System-Prompt Leakage
2. Multi-Tenant Isolation & Access-Control-Before-Retrieval — The B2B Release Gate
3. Least-Privilege Tool Scoping & Pre-Action Authorization for Agents (Excessive Agency)
4. Bias, Fairness, Privacy-by-Design & "When Not to Ship"
5. The Governance Stack — EU AI Act Risk Tiers (enforcement Aug 2026), NIST AI RMF, ISO 42001
6. Red-Teaming & Crisis Management for AI Product Failures

> *Grounding:* OWASP GenAI Security Project (LLM Top 10 2025); DeepTeam / Confident AI
> (agentic red-teaming, pre-action authorization); OpenAI/Anthropic safety guidance (Anthropic
> runs a dedicated safety interview round); EU AI Act + NIST RMF + ISO 42001 stack;
> Product School (responsible AI as a PM job). Sharpens the old Module 9.

---

# Module 10 — Leading AI Products & What's Next

*Working with the people who build the model, and where the role is going.*

**Sub-topics Covered**
1. Translating Business Goals into ML/LLM Problem Statements — Being a Force Multiplier
2. Asking the Right Technical Questions — Reading Traces, Dashboards & Incident Reports
3. Quantitative Literacy Bridge — Precision/Recall/F1 & P50/P95/P99 *Without the Math* (interview-ready)
4. Model & Vendor Selection — GPT/Claude/Gemini vs Open-Source, Avoiding Lock-In, the "Fine-Tuning Trap"
5. Build-First PMs — Prototyping / Vibe Coding (Lovable, v0, Bolt) as a Core Competency
6. The Evolving AI PM Role — Taste, Judgment & Becoming the "Editor of Super-Intelligent Suggestions"

> *Grounding:* Merges the old Module 8 (PM↔DS collaboration) with the forward-looking tail of
> the old Module 10. Sub-topic 3 preserves the classical-metrics literacy that interviews still
> probe (Aakash's 2026 interview guide). Sub-topic 5 brings in Claire Vo's "proto-manager,"
> Aakash's AI-PRD cycle, and Colin Matthews' prototyping-for-PMs. Sub-topic 6: Lenny Rachitsky,
> Reforge, Peter Yang on durable human skills.

---

## What moved, what's new, what's gone

**New full modules (4):** Prompting & Spec-by-Example (3), Context Engineering & RAG (4),
Evals (5, flagship), Building AI Agents (7).

**Promoted from a single bullet → full treatment:** prompt design, RAG, evals, agents,
unit economics, AI-specific security.

**Folded in rather than standalone:** old M3 *Data as a Product Asset* → M2 + M4;
old M8 *Working with Data Scientists* → M5 + M7 + M10. (Nothing is lost; it's taught where it's used.)

**Demoted:** classical precision/recall — from a whole module (old M6) to one interview-prep
lesson (M10.3), because GenAI evaluation (M5) is now the load-bearing skill.

---

## Optional: project alignment (if you also refresh the 3 projects)

The current three projects are all *documents*. To match this curriculum, swap one for a build:

1. **AI Opportunity & Economics Memo** — pick a domain, run the "Should this be AI?" checklist,
   model rough unit economics, prioritize. *(M2 + M8)*
2. **Build & Evaluate a Grounded Agent** — build a RAG-backed, guard-railed agent in n8n, then
   write its eval plan (golden set + LLM-as-judge rubric) and report failure modes. *(M3–M5, M7)* ← the new "build" project
3. **Launch & Trust Plan** — GTM + pricing + staged-rollout + an OWASP-LLM-Top-10 security/trust
   review and an EU-AI-Act risk classification. *(M6, M8, M9)*

---

## References (grounding for this rewrite)

**AI-PM educators & thought leaders**
- Sid Arora (Siddhartha Arora), JAPM — https://japm.substack.com/p/what-the-hell-is-an-ai-product-manager · observability: https://japm.substack.com/p/what-is-ai-and-llm-observability *(the "as an AI PM, please learn" 16-item list)*
- Aakash Gupta, Product Growth — roadmap: https://www.aakashg.com/ai-pm-learning-roadmap/ · AI-PRD: https://www.news.aakashg.com/p/ai-prd · 2026 interview guide: https://www.news.aakashg.com/p/ai-pm-interview-guide-2026
- Pawel Huryn, The Product Compass — roadmap (no stats/Python): https://www.productcompass.pm/p/ai-product-management-learning-roadmap · agent architectures: https://www.productcompass.pm/p/ai-agent-architectures
- Dr. Marily Nika, AI Product Academy — AIPDL + MVQ: https://marily.substack.com/p/the-ai-product-development-lifecycle-1cb · bootcamp: https://maven.com/marily-nika/ai-pm-bootcamp · *Building AI-Powered Products* (O'Reilly): https://www.oreilly.com/library/view/building-ai-powered-products/9781098152697/
- Miqdad Jaffer (OpenAI) / Product Faculty — cert: https://maven.com/product-faculty/ai-product-management-certification · strategy: https://www.productcompass.pm/p/openai-how-to-build-ai-product-strategy
- Claire Vo (LaunchDarkly / ChatPRD) — "proto-manager": https://www.command.ai/blog/claire-vo-chatprd/
- Colin Matthews — prototyping for PMs: https://maven.com/tech-for-product/ai-prototyping-for-product-managers · agent system design: https://maven.com/tech-for-product/ai-agent-system-design-for-product-managers
- Peter Yang — inside the AI PM role: https://creatoreconomy.so/p/inside-the-ai-product-manager-role
- Lenny Rachitsky — AI & PM: https://www.lennysnewsletter.com/p/how-ai-will-impact-product-management
- Reforge — AI Evals: https://www.reforge.com/courses/ai-evals · AI Foundations: https://www.reforge.com/courses/ai-foundations/details · how AI changes PM: https://www.reforge.com/blog/how-ai-changes-product-management
- Product School — AI PM guide: https://productschool.com/blog/artificial-intelligence/guide-ai-product-manager

**Evals & builder canon**
- Hamel Husain & Shreya Shankar (Parlance Labs) — "why evals are the hottest skill": https://www.lennysnewsletter.com/p/why-ai-evals-are-the-hottest-new-skill · https://hamel.dev/blog/posts/evals/ · course: https://maven.com/parlance-labs/evals
- Eugene Yan (Amazon) — eval process: https://eugeneyan.com/writing/eval-process/ · product evals: https://eugeneyan.com/writing/product-evals/ · LLM patterns: https://eugeneyan.com/writing/llm-patterns/
- Eugene Yan, Bryan Bischof, Charles Frye, Hamel Husain, Shreya Shankar, Jason Liu — "What We Learned from a Year of Building with LLMs": https://applied-llms.org/

**Agents, tools, context engineering**
- Anthropic — Building Effective Agents: https://www.anthropic.com/research/building-effective-agents · Writing tools for agents: https://www.anthropic.com/engineering/writing-tools-for-agents · Effective context engineering: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents · MCP: https://www.anthropic.com/news/model-context-protocol
- Andrej Karpathy & Tobi Lütke — "context engineering": https://x.com/karpathy/status/1937902205765607626
- OpenAI — Agents SDK guardrails: https://openai.github.io/openai-agents-python/guardrails/
- RAG best practices (StackAI): https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization

**AI UX**
- Emily Campbell — Shape of AI: https://www.shapeof.ai/
- Mantlr — designing for AI agents (2026): https://mantlr.com/blog/designing-for-ai-agents-ux-patterns-2026
- NN/g — AI hallucinations (incl. the confidence-display caveat): https://www.nngroup.com/articles/ai-hallucinations/
- designative.info — trust calibration: https://www.designative.info/2026/05/21/trust-calibration-in-agentic-ai-designing-for-appropriate-reliance-not-blind-trust/

**Cost / economics**
- FinOps Foundation — token pricing: https://www.finops.org/wg/genai-finops-how-token-pricing-really-works/ · capacity options: https://www.finops.org/wg/genai-capacity-options/
- Eric Klein / Workday — unit cost of GenAI features: https://medium.com/workday-engineering/measuring-the-unit-cost-of-genai-features-370f090c3982
- Mavik Labs — LLM cost optimization 2026: https://www.maviklabs.com/blog/llm-cost-optimization-2026

**Safety, security & governance**
- OWASP GenAI Security Project (LLM Top 10 2025, via Mend): https://www.mend.io/blog/2025-owasp-top-10-for-llm-applications-a-quick-guide/
- DeepTeam — agentic red-teaming: https://www.trydeepteam.com/guides/guide-agentic-ai-red-teaming
- EU AI Act / NIST RMF / ISO 42001 comparison (EC-Council): https://www.eccouncil.org/cybersecurity-exchange/responsible-ai-governance/eu-ai-act-nist-ai-rmf-and-iso-iec-42001-a-plain-english-comparison/

**Hiring signal (triangulation)**
- AI PM JDs — Anthropic et al.: https://job-boards.greenhouse.io/anthropic/jobs/5123082008 · skill aggregation: https://jobdescription.org/jobs/artificial-intelligence/ai-product-manager

*Some cost/observability figures in the sources are vendor-estimated and should be treated as
directional. The NN/g caveat (a confidence score can increase misplaced trust) is deliberately
baked into Module 6 so the course doesn't teach the naive "show confidence → more trust" pattern.*
