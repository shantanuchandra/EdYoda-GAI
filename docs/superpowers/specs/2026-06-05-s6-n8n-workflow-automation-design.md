# Session 6 Design Spec — Workflow Automation with n8n
**Wiring Agents into Business Workflows**
Date: 2026-06-05 · Status: Approved

---

## Curriculum Position

| # | Session | Status |
|---|---|---|
| 5 | Agent Architecture — How Agents Think, Remember & Act | ✅ Delivered |
| **6** | **Workflow Automation with n8n — Wiring Agents into Business Workflows** | ← This session |
| 7 | EdYoda Agent Builder — Build & Host Your First Agent | Next |
| 8 | Business Cases — Identify, Design, Build & Deploy (capstone) | — |

**Curriculum correction applied:** S6 = n8n (not Agent Builder). S7 = Agent Builder. All bridges updated accordingly.

---

## Session Metadata

- **Duration:** 120 minutes · Live virtual
- **Cohort:** Same 15 learners as S1–S5. ~6 expected. Mixed India + international: marketing/sales, finance/consulting, at least one doctor.
- **Tool:** n8n.cloud free tier (browser-based, zero install). Learners pre-connect Gmail credential before class.
- **Spine:** Blueprint → Factory Floor → Quality Gate
- **Hands-on share:** ~58% (≈70 min across 3 builds + debrief)

---

## S5 → S6 Handoff

S5 closed with: *"Next time, it stops being paper. In Session 6 you'll wire the Lumière Order Assistant as a real, running workflow — your loop trace becomes the classifier prompt, your tool manifest becomes the HTTP call, your human-gate becomes a Telegram button."*

S6 cold-open callback: *"In Session 5 you designed the Order Assistant on paper — loop trace, tool manifest, pattern choice. Today that paper starts running."*

**What learners own coming in:**
- Architecture Card (Loop Trace + Tool Manifest + Pattern Choice)
- Lumière Order Assistant design (checks spec vs rules, confirms lead time, books slot, sends confirmation)
- Vocabulary: five components, six-stage loop, four tool families, three multi-agent patterns
- The "nervous tool" they circled on their Manifest — today they wire the human gate around it

---

## Central Walk-Out Artifact

**The "Lumière Order Triage" workflow** — a fully working n8n automation:

```
Gmail Trigger (new order email)
    ↓
HTTP Request → Lumière Order Assistant (hosted agent)
    ↓
IF node (standard vs complex?)
    ├── Standard → Gmail: auto-confirm to customer
    └── Complex → Telegram: notify manager (inline ✅/❌ keyboard)
                    ↓
              Wait node (pauses workflow)
                    ↓
              Telegram Trigger (manager taps button)
                    ├── ✅ Approve → Gmail: send draft confirmation
                    └── ❌ Reject → HTTP Request: re-draft with note → Gmail: revised response
```

**Classifier rules (invented for session, learners customize for take-home):**
- Custom → any of: dietary restriction, lead time < 72hr, budget outside ₹800–₹6,000 standard tier, fondant/sculpted tier requested
- Standard → everything else

**Telegram pattern:** Facilitator runs one pre-configured bot on screen. "One bot per location" = the pattern; different `chat_id` per branch = the implementation. Learners watch live approval on facilitator's phone/screen.

---

## Session Arc

### Block 0 — Opening (0:00–0:12)
- One-word check-in (same ritual as every session)
- Course story so far (S1→S5 table)
- The gap: *"Your S5 card is a blueprint. Blueprints don't take orders. Today the blueprint runs."*
- One Rule: *"You will not leave with theory. You will leave with a workflow that fires when an email arrives."*

### Block 1 — Concept Sprint (0:12–0:40)
Four sprints, each ~5–6 min:

| Sprint | Concept | Anchor |
|---|---|---|
| 1 | **4 Nodes, 4 Jobs** — Trigger / HTTP Request / IF / Wait | The decision rule: one sentence per node |
| 2 | **The HTTP Request node** — how n8n talks to any agent | Lumière Order Assistant URL as the example |
| 3 | **Conditional logic** — IF node as the classifier's output router | Standard vs complex branch diagram |
| 4 | **Two Ears** — workflows with two entry points | Gmail starts it; Telegram resumes it; Wait holds the middle |

"Two Ears" gets 3 explicit minutes and a diagram. This is the hardest concept and must be named before Build B.

### Block 2 — Build A: Wire the Spine (0:40–1:00)
- Gmail Trigger → HTTP Request (classifier prompt embedded) → IF node → Gmail auto-confirm
- New nodes: Trigger, HTTP Request, IF
- No HITL yet — pure deterministic automation
- Facilitator demos live; learners build alongside
- Debrief: *"Find where the 'nervous tool' from your S5 manifest would sit in this flow."*

### BREAK (1:00–1:10)

### Block 3 — Build B: Add the Human Gate (1:10–1:40)
- Insert Wait node after IF (complex branch)
- BotFather demo (facilitator-only, 3 min): create bot, get token, get chat_id
- Wire Telegram node: send message + inline keyboard (✅ Approve / ❌ Reject)
- Wire Telegram Trigger: listen for callback query
- Approval branch → Gmail send; Reject branch → HTTP re-draft → Gmail
- HITL moment: facilitator taps ✅ on phone live; confirmation email fires
- Debrief: *"This is the human gate you circled on your Tool Manifest. Now you know where it lives in a real workflow."*

### Block 4 — Build C: Debug the Dirty Node (1:40–1:55)
- Facilitator deliberately breaks one node (wrong URL in HTTP Request)
- Learners open execution history, find the red node, read the error
- Fix it together, re-run, watch it succeed
- Teach: pin data for testing without sending real emails
- 3 diagnostic questions every n8n builder asks:
  1. Which node is red?
  2. What did it receive?
  3. What did it expect?

### Block 5 — Close (1:55–2:00)
- What you shipped (walk the completed workflow diagram)
- Architecture Card callback: loop trace → classifier prompt; tool manifest → HTTP node; human-gate → Wait + Telegram
- S7 bridge: *"You've wired the workflow. In Session 7 — the EdYoda Agent Builder — you'll host the agent that lives inside this HTTP call. Give it a shareable link, embed it in a page, watch it talk to real users."*
- Take-home: customize the classifier for your own industry (finance invoice, HR candidate, healthcare referral)

---

## Concept Reference: The 4 Nodes

| Node | Job | When to use |
|---|---|---|
| **Trigger** | Starts the workflow | "Something happened in the world" — email arrives, form submitted, schedule fires |
| **HTTP Request** | Calls any URL — including your hosted agent | "The agent lives here" — paste the URL, pass the message, get the response |
| **IF / Switch** | Routes based on a condition | "Standard or complex?" — one input, two or more outputs |
| **Wait** | Pauses until a human responds | "Don't act without permission" — holds execution until Telegram callback arrives |

---

## The Two-Ears Pattern (named, owned)

> *"This workflow has two ears. One listens for orders — that's the Gmail Trigger. One listens for your approval — that's the Telegram Trigger. In between, the Wait node holds everything still. That's the Human-in-the-Loop pattern. Once you see it, you'll spot it in every serious automation."*

Diagram: two entry arrows pointing into the workflow at different points, Wait node shown as the pause between them.

---

## Classifier Prompt (embedded in HTTP Request node)

```
You are the Lumière Bakery Order Classifier. 

A new order email has arrived. Read it carefully and return a JSON object with exactly these fields:

{
  "order_type": "standard" or "custom",
  "complexity": "simple" | "moderate" | "complex",
  "human_gate": true or false,
  "human_gate_reason": "one sentence explaining why, or empty string",
  "draft_response": "the confirmation email to send the customer if approved"
}

Classify as CUSTOM (human_gate: true) if ANY of these apply:
- Dietary restriction mentioned (dairy-free, nut-free, vegan, gluten-free, etc.)
- Lead time under 72 hours requested
- Budget stated outside ₹800–₹6,000
- Fondant, sculpted, or tiered cake (3+ tiers) requested
- Unusual flavour combinations or imported ingredients

Classify as STANDARD (human_gate: false) if none of the above apply.

Draft response must be warm, specific to the order, and end with: "We'll confirm your slot within 2 hours."

Return only valid JSON. No prose outside the JSON object.
```

---

## Pre-Class Checklist (facilitator)

- [ ] All learners connect Gmail credential in n8n.cloud before class (send instructions 24hr ahead)
- [ ] Pre-configure Telegram bot (BotFather → token → chat_id → n8n credential)
- [ ] Host the Lumière Order Assistant at a stable HTTP URL (from S5 design — assume S6 used a shared demo endpoint until Agent Builder in S7)
- [ ] Build the complete workflow yourself end-to-end. Send a test order email. Approve it on Telegram. Confirm the confirmation fires.
- [ ] Prepare one deliberately broken workflow for Build C (wrong HTTP URL)
- [ ] Pre-load browser tabs: n8n.cloud canvas (your workflow), Gmail (test inbox), Telegram (bot chat), n8n execution history

---

## Contingency Guide

| Scenario | Response |
|---|---|
| Learner Gmail OAuth fails | Pair with neighbour. Use Form Trigger as drop-in replacement — same concept, no OAuth |
| Telegram bot doesn't respond | Use n8n's built-in Test webhook button to simulate the callback. Explain: "In production this fires automatically" |
| HTTP Request returns error | Check the hosted agent URL is live. Fallback: use a free echo API (httpbin.org/post) to show the pattern, explain the agent endpoint separately |
| Build A runs long | Skip the auto-confirm Gmail branch. Complete the trigger → HTTP → IF path only. Build B still works |
| Build B runs long | Demo the Telegram approval, don't require learners to wire it themselves. Take-home instead |

---

## Take-Home Exercise

Customize the classifier for your own context:

- **Sales/Marketing:** Replace cake order with inbound lead. Complex = enterprise account, budget > ₹10L, decision-maker title. Human gate = account exec approves before outreach.
- **Finance/Ops:** Replace cake order with invoice. Complex = amount > ₹50K, new vendor, missing PO number. Human gate = finance manager approves before payment queued.
- **Healthcare:** Replace cake order with referral. Complex = urgent flag, specialist not in network, patient age < 18. Human gate = senior doctor approves before booking.

---

## S6 → S7 Bridge (close slide only)

> *"You've built the factory floor — the workflow that connects a real trigger to a real agent to a real human decision. In Session 7, you build the agent that lives inside that HTTP call. The EdYoda Agent Builder gives it a canvas, a system prompt, a memory, and a shareable link. You'll embed it in a page and watch it talk to real users."*

---

## Files to Build

| File | Status |
|---|---|
| `01_Facilitator_Script.md` | Pending |
| `02_Learner_Workbook.md` | Pending |
| `presenter_deck.html` | Pending |
| `learner_deck.html` | Pending |
| `linkedin_carousel.html` | Pending |
