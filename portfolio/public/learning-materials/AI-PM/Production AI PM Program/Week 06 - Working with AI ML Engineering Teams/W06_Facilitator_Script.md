# Facilitator Script - Working with AI/ML Engineering Teams (Session 6 of 8)

**Subtitle:** Become technically credible without pretending to be the engineer.  
**Duration:** 120 minutes. **Format:** Live virtual. **Audience:** Senior PMs and product leaders.  
**Spine:** Technical Fluency -> Architecture Review -> Tradeoff Questions -> Brief Defense.  
**Hands-on share:** ~45% (about 54 minutes).  
**Session artifact:** Technical Architecture Brief for PMs.  
**Tools assumed available:** AI PRD, eval plan, workflow map, model/vendor comparison examples.

---

## Pre-Class Checklist

- [ ] Prepare architecture review checklist.
- [ ] Prepare model/vendor comparison table.
- [ ] Prepare example engineering questions.
- [ ] Pick 2 learner capstones for live architecture critique if available.

---

# The 120-Minute Blended Run Sheet

## Block 0 - Opening (0:00-0:10)

**Say:** "The goal is not to sound like an ML engineer. The goal is to be the PM engineering trusts in ambiguous technical decisions."

Ask chat: "What technical question do you wish you could ask more confidently?"

## Block 1 - Strategy Lens: PM Technical Fluency (0:10-0:35)

Teach what senior PMs must understand:

1. Model capability and limits.
2. Context and retrieval constraints.
3. Tool/action boundaries.
4. Data contracts.
5. Eval and telemetry contracts.
6. Cost, latency, privacy, and lock-in tradeoffs.

## Block 2 - Applied Walkthrough: Architecture Review (0:35-0:55)

Run the shared case through an architecture review:

- What context is required?
- What model class is good enough?
- What can be cached?
- What actions require approval?
- What telemetry is required?
- What failure would trigger rollback?

## Hard Break (0:55-1:05)

Real break.

## Block 3 - Studio: Learner Architecture Brief (1:05-1:42)

Learners draft and defend:

- system map;
- model/vendor assumption;
- context/RAG plan;
- tool/action plan;
- telemetry/eval plan;
- unresolved engineering questions.

Pair critique: one learner acts as engineering lead and challenges assumptions.

## Block 4 - Artifact Close (1:42-1:55)

Learners finalize 5 engineering questions they would bring to an architecture review.

Quality bar:

- no vague "is this feasible?" questions;
- questions must identify a tradeoff;
- questions must connect to quality, risk, cost, or launch.

## Block 5 - Close (1:55-2:00)

Assignment: complete Technical Architecture Brief.

Next: Production Readiness.

---

## Contingencies

**If learners overuse jargon:** ask them to explain it to a CFO or CPO.  
**If learners under-specify:** force exact context, tool, telemetry, and approval decisions.  
**If model debate dominates:** redirect to product constraints and eval evidence.

