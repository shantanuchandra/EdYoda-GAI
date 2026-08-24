# Capstone And Casebook

## Purpose

The capstone is the spine of Production AI PM. Every learner should leave with a portfolio packet that shows how they would lead one AI product from opportunity selection through launch readiness.

This casebook gives learners and instructors a shared structure.

---

## Capstone Rules

Every capstone must have:

- a specific user;
- a real workflow or decision;
- a clear pain;
- a non-AI alternative;
- data or context requirements;
- failure modes;
- evals;
- cost and latency assumptions;
- launch gates.

Avoid capstones that are:

- generic chatbots;
- tool demos without a user workflow;
- "AI for everything" ideas;
- ideas that require sensitive data the learner cannot safely discuss;
- ideas where failure has no meaningful consequence.

---

## Capstone Tracks

| Track | Best for | Example directions |
|---|---|---|
| Enterprise Copilot | B2B SaaS, internal tools, customer-facing expert workflows | Success copilot, sales account prep, support response assistant |
| Agentic Workflow Product | Operations, routing, approvals, multi-step automation | Renewal risk workflow, research agent, claims triage |
| Decision Support Product | Recommendations, summarization, ranking, trust | Travel planner, card recommendation, health content assistant |

---

## Shared Teaching Case

Use this case throughout live teaching.

### Customer Success Copilot For B2B SaaS

Target user:

- Customer Success Manager managing mid-market and enterprise accounts.

Workflow:

- Prepare for renewal or risk review.
- Understand account health.
- Identify risks and opportunities.
- Draft next-best actions.
- Escalate risky accounts.

Current pain:

- information is scattered across CRM, support tickets, product usage, call notes, and email;
- CSMs spend too much time preparing and still miss important context;
- risk signals are inconsistent;
- recommendations vary by CSM quality and time available.

Why AI may help:

- synthesize scattered context;
- summarize account history;
- highlight risks and evidence;
- suggest playbooks;
- draft internal and customer-facing next steps;
- route high-risk cases for review.

Non-AI alternative:

- dashboard with health score;
- checklist-driven account review;
- manual CSM prep template;
- rules-based risk alerts.

Potential product outcome:

- reduce prep time;
- improve risk detection;
- increase renewal quality;
- improve consistency of CSM recommendations.

---

## Shared Case System Map

```text
CSM opens account review
  -> system retrieves account context
  -> AI summarizes evidence and risks
  -> AI recommends playbook and next action
  -> CSM reviews and edits
  -> approved action is logged
  -> risky accounts are escalated
  -> traces and outcomes feed evals
```

---

## Shared Case Data Sources

| Source | Example fields | Risk |
|---|---|---|
| CRM | plan, renewal date, account owner, contract value | stale or incomplete fields |
| Product usage | logins, feature adoption, seat utilization | misleading usage patterns |
| Support tickets | issue severity, sentiment, open bugs | wrong account or outdated ticket |
| Call notes | objections, stakeholders, commitments | unstructured and subjective |
| Email summaries | follow-ups, commitments, blockers | privacy and permission boundaries |
| Playbook library | recommended actions by scenario | outdated playbooks |

---

## Shared Case Failure Modes

| Failure | Example | Launch implication |
|---|---|---|
| Unsupported claim | Says account is at risk without evidence | Require citations and evidence |
| Wrong account context | Mixes data from another customer | Block launch until permissions and retrieval pass |
| Bad recommendation | Suggests discount when issue is product adoption | Improve rubric and playbook mapping |
| Unsafe action | Sends customer email without review | Require approval gate |
| Missing escalation | Fails to flag high-risk renewal | Mark as launch-blocking eval row |
| High-cost workflow | Calls model repeatedly for every account view | Add caching, routing, and usage limits |

---

## Public Example Contexts

These examples can be used for teaching and content.

### Wasabi Travels

Potential product angle:

- AI-assisted travel planning and itinerary refinement.

AI PM lessons:

- uncertainty handling;
- preference capture;
- recommendation quality;
- trust and user control;
- cost of repeated planning loops.

Possible capstone:

- "AI trip planning copilot for high-intent travelers who need itinerary confidence before booking."

### Card Compass

Potential product angle:

- decision support and recommendation quality for financial products.

AI PM lessons:

- explainability;
- ranking quality;
- trust;
- suitability;
- evals for recommendation accuracy and user outcomes.

Possible capstone:

- "AI card recommendation assistant that explains tradeoffs and avoids unsupported financial claims."

### Valik Diary

Potential product angle:

- memory, reflection, personalization, and knowledge workflows.

AI PM lessons:

- long-term memory;
- privacy boundaries;
- personalization quality;
- tone and user trust;
- retrieval and summarization.

Possible capstone:

- "AI reflection companion that turns user entries into safe, private, and useful personal insights."

---

## Capstone Selection Worksheet

Use this in Week 1.

| Question | Answer |
|---|---|
| Who is the user? | |
| What workflow or decision is being improved? | |
| How often does this happen? | |
| What is painful, expensive, slow, risky, or inconsistent today? | |
| What is the best non-AI alternative? | |
| What data or context is available? | |
| What could go wrong? | |
| What would make this idea worth killing? | |
| Which capstone track fits best? | |

---

## Capstone Review Gates

| Week | Gate | Pass condition |
|---|---|---|
| 1 | Opportunity | User, workflow, pain, non-AI alternative, and risk are clear |
| 2 | Strategy | Business outcome, moat, and first release are defensible |
| 3 | System | AI behavior, context, tools, and approvals are mapped |
| 4 | Workflow | Prototype shows workflow and autonomy boundaries |
| 5 | Evals | Golden dataset and rubric catch meaningful failures |
| 6 | Architecture | Engineering questions and tradeoffs are visible |
| 7 | Launch | Cost, latency, risk, monitoring, and rollback are defined |
| 8 | Story | Portfolio and interview narrative show senior judgment |

---

## Fallback Capstone Prompts

Use these when learners cannot use work context.

1. Customer Success Copilot for B2B SaaS renewal risk.
2. AI Travel Planner for high-intent international travelers.
3. Credit Card Recommendation Assistant for informed decision support.
4. Internal Research Agent for a strategy team.
5. Support Triage Assistant for high-volume tickets.
6. Sales Account Prep Copilot for enterprise reps.
7. Hiring Screening Workflow with strict human review.
8. Compliance Policy Assistant with citations and refusal rules.

Learners should choose one and adapt it into a specific user/workflow pair.
