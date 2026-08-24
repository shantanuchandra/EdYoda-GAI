# Portfolio Showcase And Career Kit

## Purpose

This kit helps learners translate course work into a credible senior AI PM signal for interviews, internal mobility, public writing, or advisory positioning.

The goal is not to publish every artifact. The goal is to package the right evidence for the right audience.

---

## Portfolio Formats

| Format | Best for | Notes |
|---|---|---|
| Private portfolio packet | Interviews and internal reviews | Can include anonymized detail and richer artifacts |
| Public case study | Brand building and credibility | Must remove confidential details |
| Interview-only appendix | Senior AI PM interviews | Short, evidence-rich, and easy to walk through |
| Executive memo | Internal promotion or leadership buy-in | Focus on decisions, tradeoffs, and launch risk |
| LinkedIn content series | Visibility and network building | Use lessons and frameworks, not private artifacts |

---

## Public/Private Decision Table

| Artifact | Public? | Private? | Interview-only? | Notes |
|---|---|---|---|---|
| Strategy memo | Usually anonymized | Yes | Yes | Remove company strategy and numbers |
| AI PRD | Usually private | Yes | Yes | Show structure, not sensitive system details |
| Workflow prototype | Sometimes | Yes | Yes | Use synthetic data |
| Eval dataset | Sometimes | Yes | Yes | Use synthetic or public examples |
| Architecture brief | Usually private | Yes | Yes | Avoid internal architecture exposure |
| Launch review | Usually private | Yes | Yes | Remove security and risk details |
| Executive story | Yes, in summarized form | Yes | Yes | Keep it concise |

---

## Portfolio Case Study Structure

Use this for public or semi-public versions.

```text
Title:
One-line product thesis:

1. Problem
Who is the user?
What workflow was painful?
Why did it matter?

2. Why AI
What could simple automation not solve?
What context or reasoning was needed?

3. Product approach
What would the AI system do?
Where does human judgment stay?

4. Evaluation
What does good look like?
What failure modes matter?
How would quality be measured?

5. Production readiness
What cost, latency, safety, and launch risks were considered?

6. Tradeoffs
What did you choose not to build?
What would you validate next?

7. Result or expected result
What outcome would you measure?
```

---

## 2-Minute Executive Story

Use this in Week 8.

```text
The business problem is [problem].

The user is [user], and the workflow is [workflow].

AI is useful here because [reason AI is needed], but the non-AI alternative is [alternative].

The system I would build first is [first release].

The main technical tradeoff is [tradeoff].

I would evaluate quality using [eval plan].

The biggest launch risks are [risks], so the launch gates are [gates].

The first measurable outcome is [metric].
```

---

## Senior AI PM Interview Story

Use this structure.

| Part | Prompt |
|---|---|
| Situation | What product/workflow problem did you choose? |
| Product judgment | Why was this worth pursuing or reshaping? |
| Technical tradeoff | What did you choose around model, RAG, tools, autonomy, or build/buy/partner? |
| Evals | How did you define quality? |
| Launch risk | What could go wrong in production? |
| Leadership | How would you work with engineering, design, data, legal, and GTM? |
| Result | What outcome would prove the product worked? |

---

## Resume Bullets

Adapt these honestly.

```text
Built a senior AI PM portfolio covering product strategy, AI PRD, GenAI workflow design, eval planning, architecture tradeoffs, and production readiness for a [domain] AI product.

Designed an AI product strategy for [workflow], including non-AI alternatives, data requirements, system behavior, failure modes, and launch gates.

Created an eval plan with [number] golden dataset rows, failure taxonomy, pass/fail rubric, and launch-blocking quality criteria.

Mapped an agentic/RAG workflow with human approval gates, tool boundaries, recovery paths, telemetry requirements, and cost/latency assumptions.
```

---

## LinkedIn Positioning

Use content that teaches a principle from the work without exposing private detail.

Post ideas:

1. "The difference between an AI demo and an AI product is evals."
2. "A senior AI PM should ask these 7 questions before approving an agent."
3. "Why I now start AI PRDs with failure modes."
4. "The non-AI alternative is the most underrated AI product strategy tool."
5. "RAG is not a feature. It is a product trust system."
6. "Most agentic products should start at autonomy tier 1 or 2."
7. "Cost per successful workflow matters more than cost per model call."
8. "A good AI PM portfolio should show launch judgment, not prompt screenshots."

---

## Portfolio Review Checklist

- [ ] The product idea has a specific user and workflow.
- [ ] The AI rationale is clear.
- [ ] The non-AI alternative is named.
- [ ] The system map is understandable without code.
- [ ] The eval plan has real failure cases.
- [ ] The launch review includes cost, latency, safety, and rollback.
- [ ] The story explains tradeoffs.
- [ ] Confidential details are removed or anonymized.
- [ ] The artifact can be explained in 2 minutes.
- [ ] The learner can answer hard follow-up questions.

---

## Hard Interview Questions

Practice these before using the portfolio.

1. Why does this need AI?
2. What is the best non-AI alternative?
3. What would make you kill this idea?
4. What failure would most damage user trust?
5. What data do you need, and what happens if it is missing?
6. Where would you keep a human in the loop?
7. How would you measure quality before launch?
8. Which eval failures block release?
9. What would drive cost?
10. What latency does the workflow tolerate?
11. What would you ship first?
12. What would you not build?
13. How would you work with engineering on this?
14. How would you explain the risk to executives?
15. What would you monitor after launch?

---

## Final Portfolio Standard

The portfolio should prove:

> I can lead AI product work through ambiguity, technical tradeoffs, quality evaluation, and production readiness.

Anything that does not support that proof should be cut.
