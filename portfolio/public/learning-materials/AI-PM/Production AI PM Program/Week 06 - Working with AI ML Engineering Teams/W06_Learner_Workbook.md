# Production AI PM - Session 6 Workbook

## Working with AI/ML Engineering Teams

Today you build the technical fluency to lead an architecture discussion.

By the end of this 120-minute session, you will have a **Technical Architecture Brief for PMs**.

One rule for today: **Ask questions that expose tradeoffs, not questions that perform technical confidence.**

---

## Pre-Class Checklist

- [ ] AI PRD open.
- [ ] Eval plan open.
- [ ] Workflow/autonomy map open.
- [ ] Portfolio packet open.

---

## Exercise 1: Architecture Brief

| Component | Decision | Open question |
|---|---|---|
| User surface | | |
| Model | | |
| Prompt/instruction layer | | |
| Context/RAG | | |
| Tools/actions | | |
| Memory | | |
| Telemetry/evals | | |
| Human review | | |

---

## Exercise 2: Tradeoff Questions

Write five engineering-facing questions.

| Area | Weak question | Stronger question |
|---|---|---|
| Model | Is this model good? | What eval evidence would justify using a smaller model for this workflow? |
| RAG | Can we use RAG? | What retrieval failure would most damage user trust, and how will we detect it? |
| Tools | Can the agent call this API? | What permissions and validation are required before the agent can trigger this action? |
| Cost | Is this expensive? | What is the cost per successful workflow, and what can we cache or route? |
| Launch | Is it ready? | Which eval failures block beta, and which can be monitored post-launch? |

Your five questions:

1.
2.
3.
4.
5.

---

## Exercise 3: Model / Vendor Decision

| Factor | Notes |
|---|---|
| Capability needed | |
| Latency target | |
| Cost sensitivity | |
| Privacy requirement | |
| Integration complexity | |
| Lock-in risk | |
| Evaluation evidence needed | |

Recommendation:

---

## Take-Home

Before Session 7:

1. Complete the Technical Architecture Brief.
2. Add the top 5 engineering questions.
3. Mark the assumptions that must be validated before launch.

