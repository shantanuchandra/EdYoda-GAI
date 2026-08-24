# Facilitator Script - Evals as the New PRD (Session 5 of 8)

**Subtitle:** Define and measure AI quality before launch.  
**Duration:** 120 minutes. **Format:** Live virtual. **Audience:** Senior PMs and product leaders.  
**Spine:** Eval Mindset -> Trace Review -> Golden Dataset -> Rubric Critique.  
**Hands-on share:** ~50% (about 60 minutes).  
**Session artifact:** Eval Dataset, Eval Rubric, and Failure Mode Taxonomy.  
**Tools assumed available:** Spreadsheet, sample outputs/traces, AI PRD, workflow prototype.

---

## Pre-Class Checklist

- [ ] Prepare 6 sample traces: 2 good, 2 borderline, 2 bad.
- [ ] Prepare spreadsheet eval template.
- [ ] Prepare failure taxonomy examples.
- [ ] Ask learners to bring sample inputs/outputs from their workflow.

---

# The 120-Minute Blended Run Sheet

## Block 0 - Opening (0:00-0:10)

**Say:** "In normal software, a PRD can define expected behavior. In AI products, the PRD is not complete until it defines how quality will be judged."

Ask chat: "What would be a catastrophic wrong answer for your capstone?"

## Block 1 - Strategy Lens: Evals As Product Management (0:10-0:35)

Teach:

1. Happy-path demos are not evidence.
2. Error analysis comes before dashboards.
3. Golden datasets capture what the product must handle.
4. Rubrics make judgment repeatable.
5. LLM-as-judge is useful only after human alignment.
6. Evals become roadmap and release gates.

## Block 2 - Applied Walkthrough: Trace Review (0:35-0:55)

Show sample traces for Customer Success Copilot.

Classify failures:

- unsupported claim;
- wrong account context;
- weak recommendation;
- unsafe action;
- missing escalation;
- bad tone.

## Hard Break (0:55-1:05)

Real break.

## Block 3 - Studio: Build Golden Dataset (1:05-1:38)

Learners create 10 rows:

- ID.
- Input.
- Context.
- Expected behavior.
- Failure category.
- Severity.

Review 2-3 learner rows live and improve specificity.

## Block 4 - Rubric Critique (1:38-1:55)

Learners draft pass/fail rubric criteria.

Quality bar:

- binary or clear thresholds;
- tied to user/business risk;
- includes grounding and escalation;
- can catch regressions.

## Block 5 - Close (1:55-2:00)

Assignment: expand eval dataset to 20 rows and finalize rubric.

Next: Working with AI/ML Engineering Teams.

---

## Contingencies

**If learners write vague evals:** force a concrete input and expected behavior.  
**If learners obsess over numeric scores:** redirect to failure categories and pass/fail judgment.  
**If no traces exist:** use mocked outputs from the shared case.

