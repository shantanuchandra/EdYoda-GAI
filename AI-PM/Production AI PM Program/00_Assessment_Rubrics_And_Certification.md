# Assessment Rubrics And Certification

## Purpose

This document defines how learner work is reviewed, what counts as completion, and what standard earns a certificate.

The course is not graded like an academic program. It is assessed like senior product work: clear decisions, defensible tradeoffs, and production judgment.

---

## Completion Levels

| Level | Meaning |
|---|---|
| Incomplete | Artifact missing or too generic to review |
| Developing | Direction is visible, but assumptions and quality bar are weak |
| Cohort Ready | Strong enough for cohort completion |
| Portfolio Ready | Strong enough to show in interviews or executive conversations |
| Showcase Ready | Strong enough for public or semi-public portfolio use after privacy review |

The default target is Portfolio Ready for the final packet.

---

## Certificate Criteria

To receive a certificate of completion, a learner must:

- attend at least 6 of 8 live sessions or review recordings and submit make-up work;
- submit at least 5 of 7 portfolio artifacts;
- submit the final portfolio packet;
- complete the eval dataset with at least 20 rows;
- complete the launch readiness review;
- deliver or submit the 2-minute executive narrative;
- follow confidentiality and AI use policies.

To receive a distinction or top-performer note, a learner must:

- submit all 7 artifacts;
- reach Portfolio Ready on at least 5 artifacts;
- show clear technical tradeoff reasoning;
- include evals and production readiness in the final narrative;
- provide useful critique to peers.

---

## Master Rubric

| Dimension | Developing | Cohort Ready | Portfolio Ready |
|---|---|---|---|
| Product judgment | Problem and user are broad | User, workflow, and pain are specific | Clear pursue, reshape, or kill logic |
| AI necessity | AI is assumed useful | Non-AI alternative is named | AI role is justified by workflow, context, and value |
| Strategy | Business value is vague | Outcome and first release are defined | Moat, distribution, and build/buy/partner logic are credible |
| System design | Tool choice dominates | System behavior is mapped | Context, tools, approvals, telemetry, and failure modes are clear |
| Evals | Quality is subjective | Rubric and sample rows exist | Golden dataset catches launch-blocking failures |
| Production readiness | Risks are listed | Cost, latency, safety, and rollback are addressed | Launch gates are measurable and defensible |
| Communication | Artifact is hard to scan | Artifact is clear and concise | Executive and interview narratives are strong |

---

## Artifact Rubrics

### 1. AI Product Strategy Memo

| Criterion | Portfolio Ready bar |
|---|---|
| User and workflow | Specific user, workflow, trigger, and current pain |
| AI rationale | Explains why AI is needed and why simpler alternatives are insufficient |
| Business case | Names business outcome and leading indicators |
| Defensibility | Explains data, workflow, distribution, or learning-loop advantage |
| First release | Defines what should ship first and what should not |
| Kill criteria | Names evidence that would stop or reshape the idea |

### 2. AI PRD

| Criterion | Portfolio Ready bar |
|---|---|
| User journey | Trigger, user goal, AI role, human role, success, and failure states |
| System behavior | Inputs, context, output, retrieval, tools, and approval points |
| Failure modes | Meaningful failures with impact, detection, and mitigation |
| Acceptance criteria | Must-do, must-not-do, escalation, refusal, and logging rules |
| Engineering clarity | Clear enough for an engineering review without heavy translation |

### 3. Agent/RAG Workflow Prototype

| Criterion | Portfolio Ready bar |
|---|---|
| Workflow | At least 4 meaningful steps connected to user value |
| Context | Names data sources, permissions, and freshness needs |
| Autonomy | Approval gates and stop conditions are explicit |
| Demo | Demonstrates the target workflow, not just a generic chat interaction |
| Recovery | Includes failure and recovery path |

### 4. Eval Dataset And Rubric

| Criterion | Portfolio Ready bar |
|---|---|
| Golden dataset | At least 20 rows, including edge cases and failure cases |
| Expected behavior | Specific enough to judge pass/fail |
| Failure taxonomy | Covers groundedness, wrong context, unsafe action, escalation, and UX/trust |
| Severity | Launch-blocking rows are marked |
| Rubric | Criteria can be used repeatedly by human or automated reviewers |

### 5. Technical Architecture Brief

| Criterion | Portfolio Ready bar |
|---|---|
| System map | Clear plain-English architecture |
| Model/context/tools | Names the major components and tradeoffs |
| Telemetry | Explains what needs to be logged and reviewed |
| Engineering questions | Lists unresolved questions that matter before launch |
| PM judgment | Connects technical choices to product risk and user outcomes |

### 6. Production Readiness Review

| Criterion | Portfolio Ready bar |
|---|---|
| Cost model | Includes usage, model calls, context, tool calls, and review effort |
| Latency | Defines user-facing or background latency targets |
| Risk register | Includes likelihood, impact, mitigation, and launch gates |
| Safety/security | Covers prompt injection, data leakage, excessive agency, and escalation |
| Launch plan | Defines alpha, beta, GA criteria, rollback, and monitoring |

### 7. Executive Narrative And Interview Story

| Criterion | Portfolio Ready bar |
|---|---|
| Executive story | Clear 2-minute explanation of business problem, AI choice, system, evals, and risk |
| Interview story | Shows product judgment, technical tradeoff, and cross-functional leadership |
| Evidence | Points to portfolio artifacts without overwhelming the listener |
| Seniority signal | Communicates decisions and tradeoffs, not just participation |

---

## Feedback Template

Use this for written reviews.

```text
Artifact:
Current level:
Strongest signal:
Weakest assumption:
Production risk:
Technical clarity:
Portfolio improvement:
Next action:
```

---

## Final Review Scorecard

| Item | Status |
|---|---|
| Strategy Memo submitted | |
| AI PRD submitted | |
| Workflow Prototype submitted | |
| Eval Dataset and Rubric submitted | |
| Technical Architecture Brief submitted | |
| Production Readiness Review submitted | |
| Executive Narrative submitted | |
| Confidentiality reviewed | |
| Public/private/anonymized labels added | |
| Certificate criteria met | |

---

## Certificate Language

Suggested certificate wording:

```text
This certifies that [Learner Name] completed Production AI PM, an 8-week applied cohort focused on leading GenAI and agentic products from strategy to launch.

The learner completed applied work across AI product strategy, system design, agent/RAG workflows, evals, technical architecture, production readiness, and executive communication.
```

Keep the certificate honest. The stronger proof is the portfolio packet.
