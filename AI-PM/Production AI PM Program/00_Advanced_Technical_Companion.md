# Advanced Technical Companion For Production AI PM

## Purpose

This companion is for learners who want deeper technical credibility without turning the program into a coding bootcamp.

The goal is not to become the ML engineer. The goal is to lead AI product decisions with enough technical fluency to:

- ask sharper engineering questions;
- understand architecture tradeoffs;
- define eval and telemetry requirements;
- identify production risks early;
- scope prototypes responsibly;
- explain technical decisions to executives.

Use this doc alongside the weekly workbooks. The core course remains no-code / low-code. This companion adds optional depth.

---

## The AI Product Stack

Use this stack to reason about most GenAI, RAG, and agentic products.

```text
User surface
  -> workflow and task model
  -> instruction layer
  -> model selection
  -> context and retrieval
  -> tools and actions
  -> memory and state
  -> evals and observability
  -> governance, safety, cost, and launch controls
```

As a PM, your job is to connect each layer to a product decision.

| Layer | PM decision |
|---|---|
| User surface | Where does AI appear, and what does the user control? |
| Workflow | What job is being improved, removed, or delegated? |
| Instruction layer | What behavior must the system follow? |
| Model | What capability, latency, cost, and reliability do we need? |
| Context/RAG | What information must the system use to be grounded? |
| Tools/actions | What can the system do outside the chat box? |
| Memory/state | What should persist, and what should not? |
| Evals | How will we know it is good enough to ship? |
| Observability | What traces, events, and metrics must be logged? |
| Governance | What must be approved, blocked, reviewed, or rolled back? |

---

## Named Tools And Durable Principles

The course can demo named tools, but the principles should survive tool changes.

| Need | Named tools to know | Tool-agnostic principle |
|---|---|---|
| Reasoning and drafting | Claude, ChatGPT | Use AI to expose options, assumptions, and critique |
| Source-backed research | Perplexity, ChatGPT search, Gemini | Separate sourced facts from product interpretation |
| Workflow automation | n8n, Make, Zapier | Model the workflow before adding autonomy |
| UI prototyping | v0, Lovable, Bolt, Figma | Prototype the decision surface, not just screens |
| Data tables and evals | Sheets, Airtable, Notion databases | Start evals in a visible table before scaling tooling |
| API prototyping | OpenAI API, Anthropic API | Make system behavior explicit and measurable |
| RAG and vectors | Supabase, Pinecone, Weaviate, Chroma | Retrieval quality matters more than vector-store branding |
| Tracing and evals | LangSmith, Braintrust, Langfuse, Humanloop | Capture traces before arguing about quality |
| Product analytics | PostHog, Amplitude, Mixpanel | Track workflow outcomes, not just feature clicks |
| Engineering collaboration | GitHub, Linear, Jira, Slack | Convert product risk into explicit engineering work |

---

## Week-By-Week Technical Depth

| Week | Optional technical depth | Output |
|---|---|---|
| 1 | Identify AI vs automation vs rules-based alternatives | AI opportunity filter with non-AI baseline |
| 2 | Compare build, buy, partner, and wrapper approaches | Technical assumptions in strategy memo |
| 3 | Map a GenAI system end to end | Plain-English system architecture |
| 4 | Prototype a workflow with tool calls and approvals | Agent/RAG workflow and autonomy map |
| 5 | Create eval rows, rubrics, and trace review criteria | Eval dataset and failure taxonomy |
| 6 | Review architecture tradeoffs with engineering questions | Technical architecture brief |
| 7 | Model cost, latency, security, and launch risk | Launch readiness review |
| 8 | Translate technical tradeoffs into portfolio and interviews | AI PM technical narrative |

---

## Core Concepts PMs Must Understand

### Tokens And Context

Tokens are the units models process. Context windows define how much text, data, instructions, and history the model can consider at once.

PM implications:

- long context can improve recall but increase cost and latency;
- more context is not always better;
- important instructions and evidence can get diluted;
- retrieved context needs prioritization;
- UX should not assume the model remembers everything.

Questions to ask:

- What context is required for this task?
- What context can be safely omitted?
- What happens when the context is too large?
- How do we handle stale, missing, or conflicting context?

### Prompt And Instruction Layer

The instruction layer defines role, task, constraints, output format, refusal rules, and escalation behavior.

PM implications:

- prompts are product behavior, not copywriting;
- prompts should map to acceptance criteria;
- prompts should include failure behavior;
- structured outputs are easier to evaluate than free-form text.

Questions to ask:

- What must the system always do?
- What must it never do?
- When should it ask for clarification?
- When should it refuse or escalate?
- What output schema should engineering rely on?

### Model Choice

Model choice is a tradeoff between capability, reliability, latency, cost, privacy, availability, and ecosystem.

PM implications:

- the most capable model may be too slow or expensive;
- cheaper models may be fine for narrow subtasks;
- routing can send simple and complex tasks to different models;
- fallback behavior matters in production.

Questions to ask:

- What capability does the task actually require?
- Which failure modes are unacceptable?
- What latency does the user workflow tolerate?
- What is the cost per successful workflow?
- Do we need model fallback or routing?

---

## RAG And Knowledge Systems

RAG means retrieval-augmented generation. The system retrieves relevant information and gives it to the model as context.

### Basic RAG Flow

```text
User asks or workflow triggers
  -> query is created
  -> relevant documents or records are retrieved
  -> retrieved context is ranked or filtered
  -> model generates an answer or action plan
  -> output is evaluated, logged, and shown to the user
```

### PM Decisions In RAG

| Decision | Why it matters |
|---|---|
| Source selection | Determines what the AI is allowed to know |
| Chunking | Affects whether useful context is retrieved |
| Metadata | Helps filter by customer, role, permission, recency, product, or region |
| Ranking | Determines which evidence gets priority |
| Citations | Makes trust and review easier |
| Freshness | Prevents stale answers |
| Permissions | Prevents data leakage |
| Eval set | Shows whether retrieval works before launch |

### RAG Failure Modes

| Failure | What it looks like | Product response |
|---|---|---|
| Missing retrieval | The right source is never used | Improve indexing, query generation, or metadata |
| Wrong retrieval | The system uses irrelevant context | Add filters, ranking, or source constraints |
| Stale retrieval | The answer uses outdated information | Add freshness checks and source dates |
| Permission leak | User sees content they should not see | Enforce access control before retrieval |
| Overstuffed context | Model gets too much text and misses the point | Reduce context, rank better, summarize carefully |
| Unsupported answer | Model answers beyond retrieved evidence | Require citations or refusal behavior |

---

## Agents And Workflow Automation

Use "agent" carefully. Many useful AI products are workflows with AI steps, not fully autonomous agents.

### Autonomy Tiers

| Tier | AI role | Human role | Example |
|---|---|---|---|
| 0 | No AI | Does all work | Manual checklist |
| 1 | Suggests | Reviews and acts | Drafts support reply |
| 2 | Prepares | Approves before action | Creates refund recommendation |
| 3 | Acts within limits | Reviews exceptions | Sends low-risk follow-up |
| 4 | Plans and acts | Audits and intervenes | Multi-step account workflow |

Most production products should start at Tier 1 or Tier 2.

### Agent Design Checklist

- What is the user goal?
- What workflow step is being delegated?
- What tools can the system use?
- What data can it access?
- What actions require approval?
- What stop conditions prevent loops?
- What recovery path exists after failure?
- What traces are saved?
- What evals must pass before launch?

### Tool-Calling Product Decisions

Every tool call is a permission decision.

For each tool/action, define:

- name;
- purpose;
- required input;
- allowed user roles;
- data access rules;
- approval requirement;
- rate limit or budget limit;
- failure behavior;
- logging requirement.

---

## Evals And Observability

In AI products, evals are part of the product spec.

### Eval Types

| Eval type | Use it for | Example |
|---|---|---|
| Golden dataset | Known test cases before launch | 20 customer questions with expected behavior |
| Rubric eval | Human or LLM-assisted quality review | Groundedness, task completion, safety |
| Regression eval | Prevent old bugs from returning | Previously failed traces must now pass |
| Red-team eval | Stress risky behavior | Prompt injection, bad context, unsafe action |
| Online monitoring | Measure real-world performance | Escalation rate, correction rate, latency |
| Human review | Align quality with expert judgment | Reviewer approves or rejects outputs |

### Trace Review

A trace is a record of what happened inside the AI workflow.

Useful traces include:

- user input;
- system instructions;
- retrieved context;
- tool calls;
- intermediate decisions;
- final output;
- human edits;
- latency;
- cost;
- error or refusal state.

PM questions:

- Which traces should be reviewable?
- Who reviews them?
- What failures block launch?
- Which issues become product work vs model work?
- How will we know quality improved?

---

## Cost And Latency

AI product economics are shaped by usage, context, model calls, tool calls, retries, evals, and human review.

### Cost Drivers

| Driver | PM implication |
|---|---|
| Number of model calls | Multi-step workflows can multiply cost quickly |
| Context size | Long prompts and retrieved docs increase cost |
| Output size | Long generated content costs more and takes longer |
| Model choice | Premium models may be needed only for hard tasks |
| Tool/API calls | External calls add cost and latency |
| Retries | Poor quality can create hidden cost |
| Human review | Review effort is part of cost per successful workflow |

### Optimization Levers

- route simple tasks to cheaper models;
- cache repeated context;
- summarize or compress long context;
- use retrieval filters;
- batch background tasks;
- reduce unnecessary tool calls;
- split synchronous and asynchronous work;
- require human approval only where risk warrants it.

PM questions:

- What is the cost per successful workflow?
- What latency does the user actually tolerate?
- Which steps can happen in the background?
- Which quality failures create rework cost?
- What usage level breaks the business case?

---

## Safety, Security, And Governance

AI risk is product risk. It should be handled in the PRD, architecture brief, eval plan, and launch review.

### Common Risk Areas

| Risk | Example | Control |
|---|---|---|
| Prompt injection | User tricks AI into ignoring rules | Instruction hierarchy, input filtering, tool limits |
| Data leakage | AI exposes private data | Access control, retrieval permissions, logging |
| Hallucination | AI makes unsupported claims | Grounding, citations, refusal rules, evals |
| Excessive agency | AI takes action without approval | Autonomy tiers, human gates, tool limits |
| Unsafe recommendation | AI suggests harmful action | Safety rubric, escalation rules, red-team tests |
| High-cost loops | Agent repeats tool calls | Budget limits, stop conditions, monitoring |
| Audit gap | Team cannot explain what happened | Trace logging and review process |

### Launch Gate Examples

Do not launch if:

- critical eval rows fail;
- sensitive data can leak across users or accounts;
- risky actions lack approval gates;
- rollback is undefined;
- trace review is unavailable;
- cost per workflow breaks the business case;
- latency makes the workflow unusable.

---

## Architecture Brief Template

Use this as the technical appendix to your AI PRD.

### 1. Product Context

- User:
- Workflow:
- AI role:
- Human role:
- Business outcome:

### 2. System Map

- User surface:
- Input:
- Instruction layer:
- Model:
- Retrieval/context:
- Tools/actions:
- Memory/state:
- Output:
- Human approval:
- Telemetry:

### 3. Data And Context

| Source | Purpose | Freshness | Permission rule | Failure if missing |
|---|---|---|---|---|
| | | | | |

### 4. Tool/Action Registry

| Tool/action | What it does | Approval? | Failure behavior | Logged? |
|---|---|---|---|---|
| | | | | |

### 5. Eval Contract

- Golden dataset size:
- Critical failure rows:
- Rubric criteria:
- Required pass threshold:
- Human review process:
- Release-blocking failures:

### 6. Production Constraints

- Latency target:
- Cost target:
- Privacy requirement:
- Security requirement:
- Rollback trigger:
- Monitoring owner:

### 7. Engineering Questions

1. What context is required for reliable output?
2. Which actions require approval?
3. What should be logged for trace review?
4. What is the fallback when the model or retrieval fails?
5. Which eval failures block beta?

---

## Recommended Advanced Tool Path

Use this if you want deeper technical proof in your portfolio.

### Path A: Low-Code Technical Portfolio

Best for PMs who want technical credibility without code.

Use:

- n8n or Make for workflow orchestration;
- Google Sheets or Airtable for eval data;
- Claude or ChatGPT for structured outputs;
- Figma or FigJam for system maps;
- PostHog or a spreadsheet for basic telemetry model.

Build:

- one workflow with at least 4 steps;
- one human approval gate;
- one tool/action step;
- one eval table with 20 rows;
- one launch review with cost/latency assumptions.

### Path B: API-Literate Portfolio

Best for PMs comfortable reading API docs and working with engineering.

Use:

- OpenAI or Anthropic API;
- a lightweight prototype environment;
- LangSmith, Braintrust, Langfuse, or Humanloop for traces/evals;
- Supabase, Pinecone, Weaviate, Chroma, or a managed RAG tool;
- GitHub for private artifacts.

Build:

- one API-based prompt or workflow spec;
- one small RAG or tool-calling prototype;
- one trace review;
- one eval run;
- one architecture brief with unresolved engineering questions.

### Path C: Engineering-Team Companion

Best for PMs working inside an existing AI/ML team.

Use:

- your team's approved stack;
- internal telemetry and eval tools;
- approved synthetic or anonymized data;
- existing PRD, ticketing, and review workflows.

Build:

- an AI PRD aligned to team architecture;
- an eval contract engineering can implement;
- a launch-readiness checklist;
- stakeholder-facing tradeoff memo.

---

## PM Questions For Engineering Reviews

Use these in Week 6 and Week 7.

### Capability

- What can the model reliably do today?
- What does it do well only in demos?
- What examples show the boundary of capability?

### Context

- What data must be available at inference time?
- What happens when data is stale, missing, or contradictory?
- How are permissions enforced before retrieval?

### Workflow

- Which steps are deterministic and which are probabilistic?
- Which actions require human approval?
- What is the recovery path after a failed action?

### Evals

- What test set represents real user risk?
- Which eval failures block launch?
- How will regressions be caught?

### Cost And Latency

- What are the biggest cost drivers?
- Which parts must be real-time?
- Which parts can run in the background?

### Safety And Operations

- What is logged?
- Who reviews traces?
- What is the rollback plan?
- What incident would make us pause launch?

---

## Portfolio Signals For Global AI PM Roles

Your technical work should signal leadership, not tool tourism.

Strong signals:

- clear AI PRD with acceptance criteria;
- system map with context, tools, approvals, and telemetry;
- eval dataset tied to real workflow risk;
- red-team cases and launch-blocking failures;
- cost and latency reasoning;
- tradeoff memo on model, RAG, autonomy, or build/buy/partner;
- concise interview story explaining technical choices in product language.

Weak signals:

- screenshots of chat outputs only;
- prompt library without product context;
- generic chatbot demo;
- architecture diagram with no eval or launch plan;
- tool list without tradeoffs;
- public portfolio that exposes confidential data.

---

## Glossary

| Term | Meaning for PMs |
|---|---|
| Agent | A system that can plan, use tools, and act within boundaries |
| Context window | The amount of information a model can consider at once |
| Embedding | Numeric representation used to compare semantic similarity |
| Eval | A repeatable way to judge AI quality |
| Golden dataset | Curated examples used to test expected behavior |
| Grounding | Tying AI output to approved context or evidence |
| Hallucination | Unsupported or false output presented confidently |
| Human-in-the-loop | Human review or approval inside the workflow |
| Latency | Time the user waits for the system |
| Memory | Information persisted across turns or sessions |
| RAG | Retrieval-augmented generation; retrieving context before generation |
| Trace | A record of model inputs, context, tool calls, outputs, and outcomes |
| Tool call | A model-triggered action against an API, database, or workflow step |
| Vector database | A system that stores embeddings for semantic retrieval |

---

## Final Technical Bar

By the end of the program, an advanced learner should be able to explain:

- what AI system they would build;
- what context it needs;
- where autonomy is allowed and where approval is required;
- how quality is evaluated;
- what traces are logged;
- what cost and latency constraints matter;
- what launch risks must be controlled;
- what engineering questions remain unresolved.

That is enough technical depth for a senior AI PM portfolio without pretending to be the ML engineer.
