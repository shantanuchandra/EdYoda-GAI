# Facilitator Script — Workflow Automation with n8n: Wiring Agents into Business Workflows (Session 6 of 8)

**Subtitle:** *By the end of this session, you'll have built a real n8n workflow that receives an order email, calls an AI agent to classify it, auto-handles simple orders, and routes complex ones to a human for approval via Telegram — all without writing a line of code.*
**Duration:** 120 minutes · **Format:** Live virtual (Zoom/Meet)
**Audience:** Same cohort as S1–S5 — mixed India + international; marketing/sales, finance/consulting, at least one doctor. ~6 learners expected. Call everyone by name.
**Spine:** Blueprint → Factory Floor → Quality Gate
**Hands-on share:** ~58% (≈70 min across 3 builds + debrief)
**Build artifact:** The "Lumière Order Triage" workflow — Gmail Trigger → HTTP classifier → IF branch → auto-confirm or Telegram HITL approval → Gmail confirmation.
**Tools:** n8n.cloud (free tier, browser-based). Gmail (OAuth pre-connected before class). Telegram (facilitator's pre-configured bot). Lumière Order Assistant HTTP endpoint.

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] Send learners a 1-line email: *"Tomorrow's session runs on n8n. Before you arrive: sign up at n8n.cloud (free), open a blank workflow, and connect your Gmail account as a credential. Takes 5 minutes. Link to instructions: [n8n Gmail credential guide]. See you at [time]."*
- [ ] Send the **Session 6 Learner Workbook** as a Google Doc (view-only). Confirm the link is in the calendar invite.
- [ ] **Configure your Telegram bot end-to-end:**
  - BotFather → `/newbot` → get token
  - Send one message to your bot → get `chat_id` via `api.telegram.org/bot<token>/getUpdates`
  - Add Telegram credential in your n8n account (token only)
  - Test: send a message from n8n → confirm it arrives
- [ ] **Build the complete workflow yourself from scratch.** Send a test order email (standard + custom). Confirm the IF branch routes correctly. Tap ✅ Approve on Telegram. Confirm the confirmation Gmail fires. Tap ❌ Reject. Confirm the re-draft fires. You must have done this full loop at least twice before class.
- [ ] Prepare the **deliberately broken workflow** for Build C: duplicate your working workflow, change the HTTP Request URL to something invalid (e.g., `https://example.com/broken`). Save it separately. You'll open this during Build C.
- [ ] Pre-load browser tabs (in this order):
  1. **n8n.cloud** — your working workflow, open on the canvas
  2. **Gmail** — test inbox (separate from your real inbox if possible)
  3. **Telegram** — your bot's chat open
  4. **n8n Execution History** — for Build C
  5. **Session 6 Learner Workbook** — open to Build Step A
- [ ] **Confirm the Lumière Order Assistant HTTP endpoint is live.** Test it with one curl or Postman call before class. Have a fallback URL ready (see Contingency Guide).
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] Have water, a printed copy of this script, and a visible timer.
- [ ] **Cohort note (this run):** ~6 learners. Call every learner by name in every exercise debrief. Go verbal throughout — no chat scoreboard.

---

## Opening Hook Slide (have this up 5 min before class starts)

> **"In Session 5 you drew the blueprint. Today it runs."**

Play soft instrumental music until you start.

---

# THE 120-MINUTE RUN SHEET

---

## BLOCK 0 — OPENING (0:00–0:12)

**Goal:** Reconnect the room with the cumulative story. Make the S5 Architecture Card feel like unfinished business — today it stops being paper. Set the one rule.

### 0:00–0:03 — Cold Open · one-word check-in

*"Welcome back, everyone. Same ritual we always start with — one word in the chat: how did Session 5 land? The Architecture Card, the loop trace, the whole thing. Just one word, whatever's honest."*

→ Wait 30 seconds. Read **every word** out loud, **by name**. With this cohort, every name gets called.

*"Thank you [Name]… I'm hearing 'dense', 'useful', 'mind-bending.' That sounds about right. Last session we took agents apart and named every piece. Today we wire those pieces into something that actually runs."*

> **Why this works:** Same cold-open ritual as every session. Continuity signals "we're in the same journey." Everyone who typed in the first 90 seconds stays engaged for the hour.

### 0:03–0:08 — Course Story So Far

*"Before we go anywhere new — let me show you how far we've come."*

→ Show the Course Story slide. Walk each row — one breath per row:

| Session | Promise | What you built |
|---|---|---|
| S1 | LLMs can generate — but they can't act | Watched the bakery campaign fail 4 of 6 steps |
| S2 | An agent can do what a chatbot can't | Built the HR Candidate Screener — 3 nodes: search → skills → score |
| S3 | The right prompt makes an agent reliable | Wrote system prompts for tone, format, and refusal |
| S4 | Ground the agent in your own documents | Built the Lumière Knowledge Agent — cited its source, refused when it didn't know |
| S5 | Open the hood — understand WHY agents work, break, and scale | Completed the Agent Architecture Card — loop trace, tool manifest, pattern choice |
| **S6** | **Wire the blueprint into a real running workflow** | **The Lumière Order Triage workflow** |

*"Five sessions of building. But here's the thing — everything we've built so far lives inside one tool. One conversation window. One agent. Today we step outside that window. Today we connect it to the real world — to your inbox, to your team, to a decision."*

### 0:08–0:12 — The Gap + The One Rule

→ Show the "Gap" slide: agent on the left (the S5 Architecture Card), real world on the right (Gmail, Slack, Telegram, calendar, CRM). Gap in the middle.

*"Here's the gap. Your Lumière Order Assistant can reason. It can classify an order, check the spec, draft a response. But right now it just sits there waiting for someone to paste a message into it. Nobody at Lumière is going to do that for every order that comes in."*

*"n8n is the bridge. It's the thing that says: 'When an email arrives, call the agent, take its answer, and do something with it' — automatically. No code. Just nodes on a canvas."*

*"One rule for today: you will not leave with theory. You will leave with a workflow that fires when an email arrives."*

*"Here's how we get there. First, four concepts — fast, each anchored to something you already know. Then we build in three steps, each one adding a layer. By the end, you'll have a workflow that handles real orders and routes the tricky ones to a human for approval. Let's go."*

> ⏱ **Time check: 0:12.** If past 0:10, shorten the course story walk. The gap slide and the one rule are non-negotiable.

---

## BLOCK 1 — CONCEPT SPRINT (0:12–0:40)

**Goal:** Four concepts, each in ~5–7 min. Anchor every one to the workflow learners are about to build. No abstract theory — every concept is a node they'll drag onto the canvas in the next block.

*"Four concepts coming up. Each one is a node you're about to use. I'll keep them short because the best way to understand a node is to wire it yourself — which we do next."*

### 0:12–0:19 — Sprint 1: 4 Nodes, 4 Jobs

→ Show the 4-node decision table slide.

*"n8n has over 400 nodes. You don't need to know most of them. For today, four nodes do everything:"*

*"The **Trigger** node starts the machine. Something happens in the world — an email arrives, a form is submitted, a schedule fires — and the Trigger says 'go.' Without a Trigger, nothing ever starts."*

*"The **HTTP Request** node talks to anything with a URL. Your Lumière Order Assistant lives at a URL. Every time you want to call it, you use this node. If you remember one thing from today: the HTTP Request node is how n8n talks to your agent."*

*"The **IF node** asks a yes/no question. The agent comes back and says 'this order is standard' or 'this order is complex.' The IF node reads that answer and sends the workflow down one of two paths."*

*"The **Wait node** pauses everything. It stops the workflow mid-run and waits — for a minute, an hour, or until a human taps a button. Without the Wait node, workflows happen at machine speed, no human in the loop."*

*"Decision rule, one sentence: Trigger starts it. HTTP calls the agent. IF routes it. Wait pauses it for a human. That's the whole session."*

→ Ask: *"Which of these four nodes do you think is the most important for the kind of workflows you'd want to build at your job?"* Read a few chat answers by name. Move on.

> ⏱ **0:19.** If running long, cut the chat question.

### 0:19–0:26 — Sprint 2: The HTTP Request Node — How n8n Talks to Your Agent

→ Show the HTTP Request anatomy slide: URL field, method (POST), body (JSON with the message), response.

*"Let's go deeper on the HTTP Request node because this is the key that unlocks everything. Your Lumière Order Assistant — the one you designed in Session 5 — lives at a URL. When you paste that URL into an HTTP Request node, you're saying: 'Call this agent, give it this message, and bring back the answer.'"*

*"Three things you configure: the URL (where your agent lives), the method (almost always POST for sending data), and the body (the message you're sending — in this case, the text of the order email that just arrived)."*

*"The agent responds with JSON — a structured answer. In our case: order type, complexity, whether a human needs to review it, and a draft confirmation. The rest of the workflow reads that JSON and acts on it."*

*"This is the pattern. Not just for Lumière — for any agent, any tool, any API in the world. Learn this node and you can wire your agent into anything."*

→ Show a before/after: raw order email text goes in, structured JSON comes out. Read the JSON fields aloud.

> ⏱ **0:26.** If running long, skip the before/after visual and just describe it.

### 0:26–0:33 — Sprint 3: The IF Node — Where the Classifier's Answer Becomes a Decision

→ Show the IF node diagram: one input wire, two output wires (Standard → left, Complex → right).

*"The HTTP Request node just brought back the agent's JSON. One field in that JSON is called `human_gate` — it's either true or false. The IF node reads that field and makes a binary decision: false goes left, standard path, auto-confirm. True goes right, complex path, human review."*

*"This is conditional logic. It sounds technical. But you've been doing this your whole career. 'If the deal is above ₹10 lakh, escalate to the VP. If it's below, handle it yourself.' That's an IF node. You've just been running it in your head. Today n8n runs it for you."*

*"The power is what happens on each branch. Left branch: the workflow sends a Gmail confirmation in under a second. Right branch: it calls a human. No manual checking, no missed orders, no 'I thought you were handling it.'"*

> ⏱ **0:33.** Keep this sprint tight — the Two Ears concept needs its full time.

### 0:33–0:40 — Sprint 4: Two Ears — The Human-in-the-Loop Pattern

→ Show the Two Ears diagram: two arrows entering the workflow at different points. Gmail Trigger at the top-left. Telegram Trigger partway down the right branch. Wait node between them.

*"This is the hardest concept today, so I'm going to name it explicitly. Our workflow has two entry points — two ears."*

*"Ear one: the Gmail Trigger. When an order email arrives, the workflow wakes up and starts running."*

*"Ear two: the Telegram Trigger. When our manager taps Approve or Reject on their phone, the workflow wakes up again — but only on the right branch, only where the Wait node put it to sleep."*

*"In between: the Wait node. It pauses the workflow — holds it in place — until that second ear hears something. The workflow isn't deleted. It isn't cancelled. It's asleep, waiting."*

*"This is the Human-in-the-Loop pattern. Machine does the work. Human makes the call at the moment that matters. Machine finishes the job after the human decides. You'll see this pattern in every serious automation — invoice approvals, content sign-offs, medical referrals, legal reviews."*

*"And the key insight: the human doesn't need to log into n8n. They don't need to know any of this exists. They just get a Telegram message with two buttons. That's it."*

→ Pause. Let it land.

*"We're about to build this. Let's go."*

> ⏱ **0:40.** If past 0:38, cut the closing pause. Two Ears must be named — it's the prep for Build B.

---

## BLOCK 2 — BUILD A: WIRE THE SPINE (0:40–1:00)

**Goal:** Learners build the deterministic half of the workflow — Gmail Trigger → HTTP classifier → IF node → auto-confirm Gmail. No HITL yet. Establish the muscle memory of adding nodes, connecting them, and running a test.

*"Build A. We're wiring the spine of the workflow — the bit that handles standard orders automatically. No human in the loop yet. Just the machine doing its job."*

→ Switch to your n8n canvas. Share your screen. Learners follow on their own n8n.cloud accounts.

### Step 1 — Gmail Trigger (3 min)

*"Start with a blank workflow. Click the plus, search for Gmail, choose 'Gmail Trigger.' This is the first ear."*

→ Configure:
- Trigger event: **New Email**
- Label filter: leave blank (catch all) or add a label if you want to scope it
- Poll interval: every minute (free tier limitation — not real-time, but fine for class)

*"In production you'd use a real-time webhook push. On the free tier it polls every minute. Same concept, slight delay. For today, we'll trigger it manually with the 'Test' button so we don't wait."*

→ Click **Test step** → show a real email being pulled in. Point to the fields: `from`, `subject`, `text`.

*"That `text` field — the body of the email — is what we're about to hand to the agent."*

### Step 2 — HTTP Request Node (5 min)

*"Add an HTTP Request node. This is where the agent lives."*

→ Configure:
- Method: **POST**
- URL: `[Lumière Order Assistant endpoint]`
- Body: JSON
  ```json
  {
    "message": "{{ $json.text }}"
  }
  ```
- Headers: `Content-Type: application/json`

*"That `{{ $json.text }}` is n8n's way of saying 'take the email body from the previous node and drop it here.' This is called an expression — the only bit of syntax you need today."*

→ Click **Test step** with a real order email in the trigger. Show the JSON response coming back:
```json
{
  "order_type": "standard",
  "complexity": "simple",
  "human_gate": false,
  "draft_response": "Thank you for your order..."
}
```

*"The agent classified it. It came back with a decision and a draft. Now the IF node reads that decision."*

> **If the endpoint is down:** Use the fallback endpoint from your Contingency sheet. Say: "In Session 7 you'll host this agent yourself — that's the Agent Builder session. For today we're using a shared demo endpoint."

### Step 3 — IF Node (4 min)

*"Add an IF node. We're asking one question: is `human_gate` true?"*

→ Configure:
- Condition: `{{ $json.human_gate }}` equals `true`
- True branch: complex orders (right output)
- False branch: standard orders (left output)

*"Left goes to auto-confirm. Right goes to the human. That's the whole routing logic — one condition, two paths."*

### Step 4 — Gmail (auto-confirm, false branch) (3 min)

*"On the false branch — standard order — we send the confirmation automatically."*

→ Add Gmail node (Send Email):
- To: `{{ $('Gmail Trigger').item.json.from }}`
- Subject: `Your Lumière order is confirmed`
- Body: `{{ $('HTTP Request').item.json.draft_response }}`

*"The customer gets their confirmation in under a second. No one at Lumière touched anything."*

→ **Run the full workflow with a standard order email.** Watch the confirmation fire. 

→ Debrief (2 min): *"Where in this flow does the 'nervous tool' from your Session 5 Tool Manifest sit? For most of you it was the 'send confirmation' step — the irreversible action. You circled it. We just built the thing that surrounds it. Build B adds the gate."*

> ⏱ **1:00.** If past 0:58, skip the debrief question and go straight to break.

---

## BREAK (1:00–1:10)

→ Show the break slide. Start the break timer. Say:

*"Ten minutes. Real break. When you come back we add the human gate — the Telegram approval flow. That's where it gets interesting."*

---

## BLOCK 3 — BUILD B: ADD THE HUMAN GATE (1:10–1:40)

**Goal:** Insert the Wait node and Telegram approval flow on the complex branch. BotFather demo. Inline keyboard. Approval fires the confirmation; rejection fires a re-draft. The HITL moment happens live on screen.

*"Build B. The right branch — complex orders. This is where the human comes in. Three pieces: we notify the manager via Telegram, we wait for their decision, and then we act on it."*

### 0:00–0:03 of Build B — BotFather Demo (facilitator-only, no learner action)

*"Before we wire it, let me show you how a Telegram bot gets born. This takes three minutes and you'll do this yourself for any workflow you build after today."*

→ Open Telegram. Show BotFather:
1. Search `@BotFather` → `/newbot`
2. Name it (e.g., `LumiereOrderBot`)
3. Get the token — show it (redact the real one if needed, or use a dummy)
4. Send one message to the bot
5. `api.telegram.org/bot<token>/getUpdates` → show `chat_id`
6. Add credential in n8n → Telegram → paste token

*"That's it. One bot, one token, one chat ID. In production: one bot per Lumière location. London gets its own bot. Gurgaon gets its own bot. Same workflow — different `chat_id` in the Telegram node. No code changes."*

> **Learner action:** None. They watch. The bot is yours. Move on immediately.

### Step 1 — Telegram Send (complex branch) (6 min)

*"On the true branch of the IF node, add a Telegram node — action: 'Send Message.' This notifies the manager."*

→ Configure:
- Chat ID: your bot's `chat_id`
- Text:
  ```
  🧁 New custom order from {{ $('Gmail Trigger').item.json.from }}
  
  {{ $('Gmail Trigger').item.json.text }}
  
  Agent classification: {{ $('HTTP Request').item.json.complexity }}
  Reason for review: {{ $('HTTP Request').item.json.human_gate_reason }}
  
  Draft response:
  {{ $('HTTP Request').item.json.draft_response }}
  ```
- Reply Markup: **Inline Keyboard**
  - Button 1: text `✅ Approve`, callback data `approve`
  - Button 2: text `❌ Reject`, callback data `reject`

→ Test: trigger with a complex order email (dietary restriction + fondant + 48hr lead time). Watch the Telegram message arrive with the two buttons.

*"The manager gets the full context — the order, the classification, the reason, and the draft response. One tap. That's it."*

### Step 2 — Wait Node (3 min)

*"After the Telegram send, add a Wait node. Mode: 'On webhook call.' This is the pause."*

→ Configure:
- Wait mode: **On webhook call**
- n8n generates a Resume URL automatically — copy it

*"The workflow stops here. It doesn't time out. It doesn't cancel. It waits — for as long as it takes — until someone calls that Resume URL. Our Telegram Trigger is going to be the thing that calls it."*

*"In production you'd add a timeout — 'if no one approves in 4 hours, escalate.' We'll keep it simple today."*

### Step 3 — Telegram Trigger (second ear) (5 min)

*"Now for the second ear. Add a Telegram Trigger node — trigger on: 'Message (callback query).' This listens for the button tap."*

→ Configure:
- Updates: Callback Query
- Add a Code node (or Function node) after it:
  - Extract `callback_data` (`approve` or `reject`) from `$json.callback_query.data`
  - Extract the Resume URL from the Wait node's stored data (or pass it via Telegram message ID → n8n lookup)

*"When the manager taps ✅, Telegram sends n8n a callback query with the data 'approve.' This Trigger catches it. Then we route again — approve or reject."*

→ Add IF node on callback data:
- `approve` → approval branch
- `reject` → rejection branch

### Step 4 — Approval Branch (3 min)

*"Approve path: send the draft confirmation to the customer."*

→ Add Gmail node:
- To: `{{ $('Gmail Trigger').item.json.from }}`
- Subject: `Your Lumière order is confirmed`
- Body: `{{ $('HTTP Request').item.json.draft_response }}`

### Step 5 — Rejection Branch (4 min)

*"Reject path: call the agent again, this time with the rejection note, and ask for a revised response."*

→ Add HTTP Request node:
- Same endpoint
- Body:
  ```json
  {
    "message": "{{ $('Gmail Trigger').item.json.text }}",
    "revision_note": "Manager rejected the initial draft. Please revise and ask the customer for their preferred date and budget range."
  }
  ```
→ Add Gmail node to send the revised response.

### The HITL Moment (3 min)

→ **Run the full complex-order workflow live.**

1. Send a complex order email to Gmail (fondant tier, dairy-free, 48hr lead time)
2. Workflow fires → Telegram message arrives on your phone/screen
3. Tap ✅ Approve live in front of the class
4. Gmail confirmation fires to the customer

*"That's the Human-in-the-Loop pattern. The machine did everything except the decision. You made the decision. The machine finished the job."*

→ Pause. Let the room react.

→ Debrief (2 min): *"Look at your Tool Manifest from Session 5. Find the tool you marked with a human gate. Which node in this workflow is that gate? It's the Wait node — and the Telegram button is how the human speaks to it. That's not a new concept. That's the exact thing you designed five sessions ago."*

> ⏱ **1:40.** If Build B ran long, demo the HITL moment yourself and skip the debrief question. The live approval is non-negotiable.

---

## BLOCK 4 — BUILD C: DEBUG THE DIRTY NODE (1:40–1:55)

**Goal:** Teach the three-question debugging method using n8n's visual execution history. Learners find the red node, read the error, fix it, re-run.

*"Build C. Debugging. Because every workflow you ever build will break at some point. The question isn't whether it breaks — it's whether you can find what broke in under two minutes."*

→ Switch to the deliberately broken workflow (wrong HTTP URL).

*"I've got a workflow here that someone handed me. They say it's broken. Let's find out why."*

→ Run the broken workflow with a test email. It fails.

→ Open **Execution History:**

*"Three questions. Every time. First: which node is red? Always start there — don't guess from memory, look at the history."*

→ Click the red HTTP Request node. Show the error (connection refused, 404, whatever the broken URL returns).

*"Second question: what did it receive? Click 'Input' on that node. The email text arrived correctly — the Trigger worked, the data passed through fine. The problem is at this node, not upstream."*

*"Third question: what did it expect? It expected a valid URL and a 200 response. It got a 404. Mismatch."*

→ Fix the URL. Re-run.

*"Done. Two minutes. That's the whole debugging method — red node, input data, expected output. You don't need to understand every node to debug it. You just need to know where it broke and what it got vs. what it wanted."*

→ Show **pin data** for testing (2 min):

*"One more thing — pinning. Instead of sending a real email every time you test, you can pin the data from the Gmail Trigger and replay it. It saves you from flooding your inbox and means you can test the complex branch anytime without crafting a perfect test email."*

→ Demo: pin the complex order data from a previous execution → run with pinned data → full workflow runs without triggering Gmail.

→ Debrief (2 min): *"What's one workflow you'd want to debug at your own job? Where's the step that's most likely to break?"* Read 2–3 chat answers by name.

> ⏱ **1:55.** If past 1:53, skip the pin data demo. The three-question method is the load-bearing piece.

---

## BLOCK 5 — CLOSE (1:55–2:00)

**Goal:** Walk the completed workflow. Call back the Architecture Card. Bridge to S7 crisply. Send them out with a take-home task.

→ Show the completed Lumière Order Triage workflow diagram.

*"Look at what you built today. An email arrives. The agent reads it and makes a decision. Simple orders go out in under a second. Complex ones pause, notify a human, wait for a tap, and then finish. The whole thing runs without anyone watching it."*

*"Now look at your Session 5 Architecture Card. Your loop trace became the classifier prompt. Your tool manifest became the HTTP Request node. The human gate you circled became the Wait node and the Telegram button. The paper didn't just describe the machine — it was the machine. You drew it in Session 5 and wired it today."*

*"Take-home for this week: take the classifier prompt and customize it for your own job. If you're in sales — it's a lead triage workflow. If you're in finance — it's an invoice approval workflow. The pattern is identical. The prompt changes. The workbook has the starter for your track."*

*"One more thing. You called an agent today via HTTP Request — a URL, a JSON body, a JSON response. That agent lived at an endpoint we gave you. In Session 7, you build that endpoint yourself. You'll open the EdYoda Agent Builder, give your agent a system prompt, connect its knowledge base, and get a URL that works exactly like the one you used today. Then you can swap in your own agent everywhere you used ours."*

*"Great session, everyone. See you next time."*

> ⏱ **2:00.** The S7 bridge is the final 30 seconds — do not cut it. Everything before is cuttable; the bridge is not.

---

# CONTINGENCY GUIDE

## Before class

| Problem | Response |
|---|---|
| Learner Gmail OAuth failed | Email them: connect Gmail in n8n at least 30 min before class starts. If still broken on the day: pair them with a neighbour who has OAuth working — they follow along on one screen and build their own version at home |
| Telegram bot not responding | Re-run BotFather setup the night before. If still broken: use n8n's native Slack node instead — same HITL pattern, swap channel for chat_id |
| Lumière Order Assistant endpoint is down | Use `httpbin.org/post` as a fallback URL — it echoes back whatever you send it. Fabricate a mock JSON response in a Set node immediately after. Explain: "In Session 7 you'll host the real agent. Today we're using a stand-in." |

## During class

| Scenario | Response |
|---|---|
| Build A runs past 1:00 | Skip the debrief question. Go to break. Cut Build C to 10 min (drop pin data demo) |
| Telegram inline keyboard not showing | Check Reply Markup is set to "Inline Keyboard" not "Reply Keyboard." If still broken: skip buttons, use keyword reply ("APPROVE"/"REJECT") — Telegram Trigger filters on message text instead of callback data |
| Wait node Resume URL lost | Check Execution History — the Wait node's output contains the Resume URL. Or restart the test from the Gmail trigger |
| Build B runs past 1:40 | Demo the HITL moment yourself only — don't ask learners to wire the Telegram Trigger. Give the complete workflow JSON as a file they can import. The live approval moment is non-negotiable |
| Learner n8n.cloud account hit execution limit | Free tier = 2,500 executions/month. Extremely unlikely in one class. If it happens: log out and log into a backup account you pre-created |
| Someone asks about cost | n8n.cloud free tier: 5 active workflows, 2,500 executions/month. Starter: €20/mo, 10,000 executions. For most non-coder business workflows, free tier covers everything in this session |
| Someone asks "how is this different from Zapier?" | "Zapier is simpler to start — great for connecting two apps with one trigger. n8n handles complex branching, AI agents, and custom code when you need it. For the Human-in-the-Loop pattern we built today, n8n is the right tool." |

---

## Practice Recommendation (do this the day before)

Run the full workflow yourself three times:
1. Standard order → watch the auto-confirm fire
2. Complex order → tap ✅ on Telegram → watch the confirmation fire
3. Complex order → tap ❌ on Telegram → watch the re-draft fire

Practice the BotFather demo aloud. It takes 3 minutes when you know it; it takes 10 when you don't. The inline keyboard config (Reply Markup → Inline Keyboard → button rows) is the step most likely to trip you up live — do it from memory.

---

*Colophon: Shantanu Chandra · [linkedin.com/in/chandrashantanu](https://linkedin.com/in/chandrashantanu)*
