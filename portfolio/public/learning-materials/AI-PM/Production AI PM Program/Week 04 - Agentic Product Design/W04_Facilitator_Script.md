# Facilitator Script - Agentic Product Design (Session 4 of 8)

**Subtitle:** Design safe autonomy: workflows, tools, approvals, and recovery paths.  
**Duration:** 120 minutes. **Format:** Live virtual. **Audience:** Senior PMs and product leaders.  
**Spine:** Workflows vs Agents -> Autonomy Levels -> Tool and Approval Design -> Prototype Review.  
**Hands-on share:** ~50% (about 60 minutes).  
**Session artifact:** Agent/RAG Workflow Prototype v1 and Autonomy Map.  
**Tools assumed available:** n8n or workflow tool, AI PRD v1, shared workflow sketch, portfolio packet.

---

## Pre-Class Checklist

- [ ] Prepare simple n8n workflow skeleton.
- [ ] Prepare autonomy-level examples.
- [ ] Prepare approval gate examples.
- [ ] Prepare fallback static screenshots for tool failure.

---

# The 120-Minute Blended Run Sheet

## Block 0 - Opening (0:00-0:10)

**Say:** "An agent is not a chatbot with ambition. It is a product surface that can decide, use tools, and sometimes act."

Ask chat: "What action would you never allow an AI system to take without approval?"

## Block 1 - Strategy Lens: Workflows Before Agents (0:10-0:35)

Teach:

1. Workflow: known steps, predictable path.
2. Agent: dynamic steps, tool use, environmental feedback.
3. Autonomy tiers: suggest, draft, prepare, execute with approval, execute autonomously.
4. Tool boundaries: what it can read, write, change, or trigger.
5. Guardrails outside the model: permissions, budgets, stop conditions, rollback.

## Block 2 - Applied Walkthrough: Shared Case (0:35-0:55)

Customer Success Copilot workflow:

1. Pull account data.
2. Summarize risk.
3. Retrieve playbook.
4. Draft recommended action.
5. Ask CSM for approval.
6. Log decision.

Show which steps are workflow, which are model calls, and which require human approval.

## Hard Break (0:55-1:05)

Real break.

## Block 3 - Studio: Autonomy Map (1:05-1:35)

Learners map their capstone:

- Step.
- AI role.
- Human role.
- Tool/data.
- Approval needed.
- Failure recovery.

Critique for excessive agency.

## Block 4 - Prototype Sketch Or Build (1:35-1:55)

Learners either:

- sketch the workflow in workbook/FigJam; or
- build a minimal n8n workflow with mock data.

Quality bar:

- At least 4 steps.
- At least 1 human approval gate.
- At least 1 failure recovery path.
- At least 1 telemetry event.

## Block 5 - Close (1:55-2:00)

Assignment: finish workflow prototype or sketch and autonomy map.

Next: Evals as the New PRD.

---

## Contingencies

**If n8n fails:** switch to workflow sketching in the workbook.  
**If learners overbuild:** force the smallest workflow that demonstrates the core product behavior.  
**If learners want full autonomy:** ask what failure would trigger rollback.

