# Prompt And Workflow Library

## Purpose

This library gives learners reusable prompts and workflow patterns for the course.

The prompts are not the product. They are thinking scaffolds. Learners should adapt them to their capstone, user, workflow, and data context.

---

## How To Use These Prompts

For every prompt:

1. Replace bracketed fields.
2. Add your capstone context.
3. Ask for assumptions and risks.
4. Review the output critically.
5. Convert the answer into your own product artifact.

Do not paste private customer or company data into tools unless approved.

---

## Week 1: AI Opportunity Filter Prompt

```text
Act as a senior AI product advisor.

I am evaluating this AI product idea:
[describe idea]

Target user:
[user]

Workflow:
[workflow]

Score the idea from 1 to 5 on:
1. Pain
2. Workflow leverage
3. Available context/data
4. Quality tolerance
5. Economics
6. Risk controllability

For each score, explain:
- why you gave that score;
- what assumption is weakest;
- what evidence would make us kill or reshape the idea.

End with a pursue / reshape / kill recommendation.
```

---

## Week 2: Strategy Memo Critique Prompt

```text
Act as a critical senior AI PM reviewer.

Review this AI product strategy memo:
[paste memo or summary]

Evaluate it for:
- user and workflow specificity;
- AI necessity vs non-AI alternative;
- business outcome;
- data or workflow advantage;
- build / buy / partner logic;
- first release scope;
- kill criteria.

Return:
1. strongest strategic signal;
2. weakest assumption;
3. missing evidence;
4. one scope cut;
5. one sharper version of the strategy.
```

---

## Week 3: AI PRD Behavior Prompt

```text
Act as a PM writing an AI PRD for engineering.

Product concept:
[concept]

User workflow:
[workflow]

Draft the system behavior section with:
- inputs;
- required context;
- retrieval sources;
- tools/actions;
- output format;
- human approval points;
- refusal behavior;
- escalation behavior;
- logging requirements.

Then list the top 8 failure modes with:
- user impact;
- detection method;
- mitigation.
```

---

## Week 4: Agent Workflow Prompt

```text
Act as an agentic workflow designer.

Workflow:
[workflow]

User:
[user]

Goal:
[goal]

Design a workflow with:
- 4 to 7 steps;
- AI role in each step;
- human role in each step;
- data or tool used;
- approval requirement;
- stop condition;
- recovery path if the step fails.

Use autonomy tiers from 0 to 4. Recommend the safest starting tier for launch.
```

---

## Week 5: Eval Dataset Generator Prompt

```text
Act as an AI eval designer.

Product:
[product]

Workflow:
[workflow]

Known risks:
[risks]

Generate 20 golden dataset rows with:
- ID;
- input;
- context;
- expected behavior;
- failure category;
- severity;
- whether failure should block launch.

Include normal cases, edge cases, adversarial cases, missing-context cases, and unsafe-action cases.
```

---

## Week 6: Engineering Review Prep Prompt

```text
Act as an AI/ML engineering lead reviewing a PM architecture brief.

Here is my system map:
[system map]

Here is my AI PRD summary:
[summary]

Identify:
- unclear technical assumptions;
- missing data or context requirements;
- retrieval risks;
- tool/action risks;
- eval gaps;
- observability gaps;
- cost and latency questions.

Return the 10 most important engineering review questions I should be ready to answer.
```

---

## Week 7: Launch Readiness Prompt

```text
Act as a production readiness reviewer for an AI product.

Product:
[product]

Workflow:
[workflow]

Architecture:
[architecture]

Eval plan:
[eval plan]

Review for:
- quality risks;
- prompt injection;
- data leakage;
- excessive agency;
- high-cost loops;
- latency;
- monitoring;
- rollback;
- human escalation.

Return:
1. risk register;
2. launch-blocking issues;
3. beta criteria;
4. GA criteria;
5. rollback triggers.
```

---

## Week 8: Interview Story Prompt

```text
Act as a senior AI PM interviewer.

Here is my capstone:
[summary]

Help me turn it into a 2-minute interview story using:
1. Situation
2. Product judgment
3. Technical tradeoff
4. Eval and quality bar
5. Launch risk
6. Cross-functional leadership
7. Result or expected result

Then ask me 8 hard follow-up questions a senior interviewer might ask.
```

---

## Critique Prompt For Peer Review

```text
Act as a direct but constructive peer reviewer.

Artifact:
[paste artifact]

Review it using this frame:
- What is the strongest decision?
- What is the weakest assumption?
- What would fail in production?
- What is too generic?
- What should be cut?
- What evidence is missing?
- What is the next best improvement?

Keep the critique specific and senior-level.
```

---

## Workflow Pattern 1: Human-Approved Copilot

```text
User requests help
  -> AI gathers context
  -> AI drafts recommendation
  -> human reviews
  -> human edits or approves
  -> approved action is logged
  -> outcome feeds evals
```

Use when:

- quality matters;
- user trust matters;
- action risk is moderate;
- human judgment should stay in the loop.

---

## Workflow Pattern 2: RAG Answer With Citations

```text
User asks question
  -> retrieve approved sources
  -> rank and filter context
  -> generate answer with citations
  -> refuse if evidence is insufficient
  -> log query, sources, answer, and feedback
```

Use when:

- answers need grounding;
- source trust matters;
- users need evidence;
- stale or wrong answers are risky.

---

## Workflow Pattern 3: Agentic Triage

```text
New item arrives
  -> AI classifies urgency and category
  -> AI retrieves relevant context
  -> AI recommends next step
  -> low-risk items route automatically
  -> high-risk items escalate
  -> outcomes update the eval dataset
```

Use when:

- many items need routing;
- categories are clear;
- mistakes can be detected;
- escalation paths exist.

---

## Workflow Pattern 4: Decision Support Assistant

```text
User describes goal
  -> AI gathers preferences and constraints
  -> AI ranks options
  -> AI explains tradeoffs
  -> user selects or asks follow-up
  -> system logs decision and feedback
```

Use when:

- the product helps users choose;
- explainability matters;
- the right answer depends on preferences;
- trust is built through tradeoff clarity.

---

## Prompt Quality Checklist

- [ ] The prompt names the user and workflow.
- [ ] The prompt includes constraints and context.
- [ ] The prompt asks for assumptions.
- [ ] The prompt asks for failure modes.
- [ ] The output format is structured.
- [ ] The prompt includes refusal or escalation behavior when relevant.
- [ ] The prompt does not include private data.
- [ ] The output is reviewed against the product artifact, not accepted blindly.
