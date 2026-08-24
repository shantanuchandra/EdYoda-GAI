# Facilitator Script - GenAI System Design for PMs (Session 3 of 8)

**Subtitle:** Explain a GenAI system clearly enough to work credibly with engineering.  
**Duration:** 120 minutes. **Format:** Live virtual. **Audience:** Senior PMs and product leaders.  
**Spine:** System Map -> Context Decisions -> PRD Translation -> Architecture Critique.  
**Hands-on share:** ~45% (about 54 minutes).  
**Session artifact:** AI PRD v1.  
**Tools assumed available:** Claude or ChatGPT, shared system map, portfolio packet, optional Figma/FigJam.

---

## Pre-Class Checklist

- [ ] Prepare a plain-English GenAI system map.
- [ ] Prepare examples of prompt-only, RAG, tool-use, workflow, and fine-tuning decisions.
- [ ] Prepare shared Customer Success Copilot architecture.
- [ ] Open learner strategy memos for reference.

---

# The 120-Minute Blended Run Sheet

## Block 0 - Opening (0:00-0:10)

**Say:** "A senior AI PM does not need to write the system. But they must know what system they are asking engineering to build."

Ask chat: "Which part of GenAI architecture feels most fuzzy: prompts, RAG, tools, memory, model choice, evals, or telemetry?"

## Block 1 - Strategy Lens: The GenAI System Map (0:10-0:35)

Teach the seven-part map:

1. User surface.
2. Instruction layer.
3. Model.
4. Context and retrieval.
5. Tools/actions.
6. Output and UX.
7. Telemetry and evals.

Emphasize the PM role:

**Say:** "Your job is to define behavior, constraints, quality bar, and tradeoffs. Engineering decides implementation details, but you must know what questions to ask."

## Block 2 - Applied Walkthrough: Shared Case (0:35-0:55)

Map Customer Success Copilot:

- Inputs: account notes, CRM data, support tickets, usage trends.
- Retrieval: account history and playbooks.
- Tools: CRM update, ticket lookup, meeting summary.
- Output: account risk summary and recommended next action.
- Human control: CSM approval before external communication.

## Hard Break (0:55-1:05)

Real break.

## Block 3 - Studio Critique: Capstone System Maps (1:05-1:42)

Learners draft their own system map.

Critique with five questions:

1. What context must the model see?
2. What should never enter the context?
3. What tools can it use?
4. What needs human approval?
5. What telemetry proves quality?

Review 2-3 learner maps live.

## Block 4 - Artifact Build: AI PRD v1 (1:42-1:55)

Learners draft PRD sections:

- User journey.
- System behavior.
- Inputs and context.
- Tools/actions.
- Failure modes.
- Acceptance criteria.

## Block 5 - Close (1:55-2:00)

Assignment: complete AI PRD v1 before Session 4.

Next: Agentic Product Design.

---

## Contingencies

**If learners get too technical:** return to behavior and tradeoffs.  
**If learners stay too abstract:** force them to name inputs, context, tools, and approval points.  
**If tool examples distract:** remind the room that tools are implementation choices; the PRD defines product behavior.

