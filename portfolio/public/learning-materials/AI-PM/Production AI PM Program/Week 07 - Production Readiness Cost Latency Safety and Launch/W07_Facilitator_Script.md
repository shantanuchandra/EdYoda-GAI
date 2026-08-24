# Facilitator Script - Production Readiness: Cost, Latency, Safety, and Launch (Session 7 of 8)

**Subtitle:** Decide what must be true before an AI product should ship.  
**Duration:** 120 minutes. **Format:** Live virtual. **Audience:** Senior PMs and product leaders.  
**Spine:** Launch Gates -> Cost/Latency -> Safety/Security -> Red-Team Review.  
**Hands-on share:** ~50% (about 60 minutes).  
**Session artifact:** Cost and Latency Model, Risk Register, and Launch Readiness Review.  
**Tools assumed available:** Portfolio packet, eval plan, architecture brief, spreadsheet.

---

## Pre-Class Checklist

- [ ] Prepare production readiness template.
- [ ] Prepare cost-per-workflow example.
- [ ] Prepare AI security risk examples.
- [ ] Prepare red-team prompts for the shared case.

---

# The 120-Minute Blended Run Sheet

## Block 0 - Opening (0:00-0:10)

**Say:** "The difference between an AI demo and an AI product is not the UI. It is what happens when the system is expensive, slow, wrong, attacked, or used by real customers."

Ask chat: "Which production risk worries you most: cost, latency, hallucination, security, privacy, or user overtrust?"

## Block 1 - Strategy Lens: Launch Gates (0:10-0:35)

Teach five gates:

1. Quality gate: eval pass/fail threshold.
2. Cost gate: cost per successful workflow.
3. Latency gate: acceptable wait by user context.
4. Safety/security gate: permissions, injection, data leakage, excessive agency.
5. Ops gate: monitoring, rollback, escalation, support ownership.

## Block 2 - Applied Walkthrough: Shared Case Readiness (0:35-0:55)

Customer Success Copilot:

- Cost: model calls per account review.
- Latency: background account prep vs live response.
- Security: tenant isolation and CRM permissions.
- Safety: no external email without approval.
- Observability: trace failed recommendations and escalation misses.

## Hard Break (0:55-1:05)

Real break.

## Block 3 - Studio: Red-Team Learner Capstones (1:05-1:40)

Learners exchange capstones and attack them:

- Prompt injection.
- Wrong data access.
- Unsafe action.
- High-cost loop.
- Bad recommendation.
- Missing escalation.

Each learner records top 5 risks.

## Block 4 - Artifact Build: Launch Readiness Review (1:40-1:55)

Learners complete:

- cost driver;
- latency target;
- risk register;
- beta gate;
- rollback trigger;
- monitoring plan.

## Block 5 - Close (1:55-2:00)

Assignment: complete Production Readiness Review.

Next: Executive Narrative, Portfolio, and AI PM Interview Readiness.

---

## Contingencies

**If learners treat safety as compliance only:** bring it back to product launch gates.  
**If learners cannot estimate cost:** use relative cost drivers: number of calls, context size, output size, review effort.  
**If red-team feels negative:** frame it as the highest-leverage PM behavior before launch.

