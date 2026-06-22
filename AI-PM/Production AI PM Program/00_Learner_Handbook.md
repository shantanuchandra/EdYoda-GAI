# Production AI PM Learner Handbook

## Program Promise

Production AI PM is an 8-week cohort for senior PMs and product leaders who want to lead GenAI and agentic products from strategy to launch.

By the end of the program, you should be able to:

- decide which AI product ideas deserve to be built;
- explain an AI system clearly enough to work with engineering;
- design GenAI, RAG, and agentic workflows with appropriate human control;
- define evals, failure modes, and launch gates;
- reason about cost, latency, safety, and production readiness;
- package the work into a credible senior AI PM portfolio and interview story.

This is not a generic PM basics course, a coding bootcamp, a heavy ML math course, or a prompt-engineering-only workshop.

---

## Who This Is For

This program is built for:

- senior PMs moving into AI PM, GenAI PM, or agentic product roles;
- product leaders working with AI/ML engineering teams;
- PMs targeting global or remote AI PM roles;
- operators who need portfolio-grade proof of AI product judgment.

You do not need to code to complete the core path. You do need to make product decisions, write clearly, critique work, and understand technical tradeoffs well enough to lead the room.

---

## How The Course Works

Each week has one 120-minute live session.

The session is blended:

- strategy lens;
- applied walkthrough;
- live studio work;
- critique;
- portfolio artifact close.

Each week also has a workbook, a presenter/learner deck pair, and a portfolio artifact. The weekly work compounds into one final Senior AI PM Portfolio Packet.

Expected time:

- live session: 2 hours per week;
- assignment work: 2 to 4 hours per week;
- optional advanced technical work: 1 to 2 hours per week.

---

## Your Working Folder

Create one private folder for the cohort before Week 1.

Recommended structure:

```text
Production AI PM Portfolio/
  01_AI_Product_Strategy_Memo/
  02_AI_PRD/
  03_Agent_RAG_Workflow_Prototype/
  04_Evals_And_Golden_Dataset/
  05_Technical_Architecture_Brief/
  06_Production_Readiness_Review/
  07_Executive_Narrative_And_Interview_Story/
  Scratch/
  Private_Data_Do_Not_Share/
```

Keep public, private, and anonymized material separate from the start. Do not wait until Week 8 to decide what can be shown externally.

---

## Capstone Tracks

Choose one capstone track by the end of Week 1.

| Track | Best for | Example |
|---|---|---|
| Enterprise Copilot | B2B SaaS, internal tools, support, sales, success, finance, HR | Customer Success Copilot |
| Agentic Workflow Product | Multi-step operations, approvals, routing, research, automation | Renewal Risk Agent |
| Decision Support Product | Recommendations, summarization, personalization, trust, quality | Portfolio Risk Assistant |

If you cannot use a real work problem, use a synthetic or anonymized product context. A strong anonymized portfolio is better than a vague real one.

---

## Confidentiality Rules

Use good judgment with company, customer, and personal data.

Do:

- anonymize company and customer names when needed;
- replace real numbers with realistic ranges;
- use synthetic examples for sensitive workflows;
- mark anything private at the top of the document;
- keep confidential artifacts out of public portfolio links.

Do not:

- paste private customer data into AI tools;
- expose internal architecture, contracts, pricing, or strategy;
- share production credentials, API keys, recordings, or private documents;
- publish artifacts that imply endorsement from an employer or client.

For your final portfolio, every artifact should be labeled as one of:

- public;
- private;
- anonymized;
- interview-only.

---

## Weekly Artifact Map

| Week | Session | Portfolio artifact |
|---|---|---|
| 1 | AI Product Judgment for Senior PMs | AI Opportunity One-Pager |
| 2 | AI Strategy, Moats, and Business Case | AI Product Strategy Memo v1 |
| 3 | GenAI System Design for PMs | AI PRD v1 |
| 4 | Agentic Product Design | Agent/RAG Workflow Prototype v1 + Autonomy Map |
| 5 | Evals as the New PRD | Eval Dataset + Rubric + Failure Mode Taxonomy |
| 6 | Working with AI/ML Engineering Teams | Technical Architecture Brief for PMs |
| 7 | Production Readiness: Cost, Latency, Safety, and Launch | Cost Model + Risk Register + Launch Readiness Review |
| 8 | Executive Narrative, Portfolio, and AI PM Interview Readiness | Final Portfolio Packet + AI PM Interview Narrative |

---

## What Good Work Looks Like

Good work in this cohort is not judged by how many tools you use. It is judged by the quality of your decisions.

Strong artifacts:

- name a specific user and workflow;
- explain why AI is needed and what the non-AI alternative is;
- make assumptions visible;
- include failure modes and quality bars;
- connect product decisions to system behavior;
- show how quality will be evaluated;
- include launch risks, cost, latency, and operational constraints;
- are concise enough for an executive or interviewer to understand quickly.

Weak artifacts:

- describe a tool demo without a product decision;
- use generic AI language without workflow detail;
- avoid risk, failure, and cost;
- rely on prompts as the whole product;
- assume the model will be right because the demo looked good.

---

## Critique Norms

This is a senior-level cohort. Critique should make the work sharper, not safer.

When giving critique:

- point to the decision, not the person;
- name the weakest assumption;
- ask what would make the idea fail;
- separate user value, business value, and technical feasibility;
- suggest one concrete improvement.

When receiving critique:

- do not defend too early;
- write down the risk being exposed;
- ask what evidence would change the conclusion;
- decide whether to pursue, reshape, or kill the current version.

Use this simple critique frame:

| Question | Purpose |
|---|---|
| What is the strongest part? | Preserve what is working |
| What is the weakest assumption? | Focus the next validation step |
| What failure would hurt trust? | Surface production risk |
| What should be cut or simplified? | Reduce demo-driven scope |
| What evidence is missing? | Make the next step concrete |

---

## Tool Philosophy

You will use named tools, but the course is not positioned around any one tool.

The durable principles are:

- workflow before interface;
- context before model choice;
- evals before launch;
- approval before autonomy;
- telemetry before scaling;
- product judgment before prompt polish.

Use tools to make your decisions visible. If a tool changes, the product logic should still hold.

---

## Core Tool Setup

Before Week 1, make sure you have:

- Claude or ChatGPT;
- a research tool such as Perplexity;
- Google Docs, Notion, or equivalent;
- Google Sheets, Airtable, or equivalent;
- n8n, Make, Zapier, or a workflow automation equivalent;
- Figma, FigJam, Miro, or equivalent;
- a private folder for portfolio artifacts.

The optional advanced path is covered in `00_Advanced_Technical_Companion.md`.

---

## Weekly Learner Rhythm

Before each session:

- open the weekly workbook;
- open your latest portfolio artifact;
- bring one decision you want critiqued;
- prepare any required sample inputs, outputs, traces, or eval rows.

During the session:

- keep notes inside the artifact, not in a disconnected notebook;
- use the studio time to make decisions;
- ask for critique on tradeoffs, not on polish;
- capture one next action before the session ends.

After the session:

- finish the weekly artifact within 48 hours;
- mark assumptions and open questions;
- update the final portfolio packet;
- decide what is public, private, or anonymized;
- prepare the next artifact before the next live session.

---

## Portfolio Completion Bar

Your final portfolio should include seven pieces.

| Artifact | Completion bar |
|---|---|
| Strategy Memo | Clear business outcome, user workflow, AI rationale, moat, and first release |
| AI PRD | Inputs, context, behavior, failure modes, approvals, and acceptance criteria |
| Workflow Prototype | Clear workflow steps, tool/data dependencies, autonomy boundaries, and demo scenario |
| Eval Plan | Golden dataset, failure taxonomy, rubric, and launch-blocking rows |
| Architecture Brief | Plain-English system map and engineering questions |
| Launch Review | Cost, latency, risk register, monitoring, beta/GA gates, rollback |
| Executive Story | Two-minute narrative and interview-ready tradeoff story |

The final packet does not need to be long. It needs to be specific.

---

## AI Use Policy

Use AI tools to accelerate thinking, drafting, critique, and prototyping. Do not use them to hide weak judgment.

Acceptable uses:

- turn rough notes into a structured memo;
- generate alternative failure modes;
- critique an eval rubric;
- draft synthetic examples;
- compare architecture options;
- rehearse interview answers.

Unacceptable uses:

- fabricating evidence;
- claiming a tool demo is production-ready;
- using private data in tools that are not approved for that data;
- submitting generic AI-written artifacts without product-specific judgment.

When in doubt, note how AI was used in the artifact footer.

---

## Feedback Checkpoints

You will get the most value from the program if you submit work before these points.

| Week | Feedback item | What to bring |
|---|---|---|
| 2 | Strategy Memo | One-pager plus target user, workflow, and business outcome |
| 4 | AI PRD + Workflow Prototype | System map, behavior spec, and autonomy map |
| 5 | Eval Dataset + Rubric | At least 10 rows and a first failure taxonomy |
| 7 | Production Readiness Review | Cost/latency model, risk register, beta/GA criteria |
| 8 | Final Portfolio Packet | Public/private/anonymized version plus interview story |

---

## Optional Premium Add-Ons

The program can include higher-touch support depending on the cohort tier.

Possible add-ons:

- 1:1 capstone review;
- mock AI PM interview;
- resume, LinkedIn, and portfolio positioning review;
- advanced technical lab review;
- public portfolio polish.

Use these for high-leverage feedback, not for redoing basic assignment work.

---

## Final Week Readiness Checklist

Before the final session, confirm:

- [ ] The portfolio packet has all seven sections.
- [ ] Each artifact has a clear title and one-line purpose.
- [ ] Sensitive material is labeled public, private, anonymized, or interview-only.
- [ ] The AI PRD has failure modes and acceptance criteria.
- [ ] The eval plan has at least 20 golden dataset rows.
- [ ] The launch review has beta criteria, GA criteria, and rollback triggers.
- [ ] The executive story can be delivered in 2 minutes.
- [ ] The interview story explains judgment, tradeoffs, and leadership.

---

## The Standard

By the end, your work should make this claim credible:

> I can lead a GenAI or agentic product from opportunity selection through system design, evals, engineering tradeoffs, launch readiness, and executive communication.

That is the bar. Every artifact should help prove it.
