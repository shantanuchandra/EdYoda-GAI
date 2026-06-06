# Generative AI for Non-Coders — Session 6 Workbook

**Workflow Automation with n8n: Wiring Agents into Business Workflows**

---

## How to use this workbook

The **slides** carry the concepts — the four nodes, the two-ears pattern, the HITL flow. **This workbook carries the execution** — what to click, what to paste, what you should see, and what to do when it doesn't behave. Slides for the *why*; this for the *how*.

Everything today runs on **one story: Lumière Bakery** — the same system you've been building since Session 4. In Session 5 you designed the Order Assistant on paper (loop trace, tool manifest, pattern choice). Today that paper starts running. The HTTP Request node calls the agent you designed. The Wait node is the human gate you circled on your Tool Manifest.

**Open before you start:** your **n8n.cloud account** with your Gmail credential already connected. If you haven't done this yet — connect it now before the session starts (Settings → Credentials → Add Credential → Gmail).

---

## What you're building today

The **Lumière Order Triage** workflow — a fully working n8n automation:

```
Gmail Trigger (new order arrives)
      ↓
HTTP Request → Lumière Order Assistant (AI classifier)
      ↓
IF node — standard or complex?
      │
      ├── Standard → Gmail: auto-confirm to customer
      │
      └── Complex → Telegram: notify manager (✅ Approve / ❌ Reject)
                        ↓
                   Wait node (workflow pauses)
                        ↓
                   Telegram Trigger (manager taps button)
                        │
                        ├── ✅ Approve → Gmail: send draft confirmation
                        └── ❌ Reject → HTTP: re-draft → Gmail: revised response
```

| Build Step | What you wire | New node | Deliverable |
|---|---|---|---|
| **A — Wire the Spine** | Gmail → HTTP → IF → auto-confirm | Trigger, HTTP Request, IF | Standard orders handled automatically |
| **B — Add the Human Gate** | Wait + Telegram + approval branch | Wait, Telegram | Complex orders routed to a human |
| **C — Debug the Dirty Node** | Find what's broken in a broken workflow | Execution History | 3-question debugging method |

---

## The 4 Nodes — Reference Card

Keep this open. These are the only nodes you need today.

| Node | Job | The one-sentence rule |
|---|---|---|
| **Trigger** | Starts the workflow | "Something happened in the world" |
| **HTTP Request** | Calls your agent (or any URL) | "The agent lives here" |
| **IF / Switch** | Routes based on a condition | "Standard or custom?" |
| **Wait** | Pauses until a human responds | "Don't act without permission" |

---

## The Two-Ears Pattern

Our workflow has two entry points. Draw this in your mind before Build B:

```
Ear 1: Gmail Trigger ──────────────────────────────┐
                                                   │
                                              [workflow runs]
                                                   │
                                            [Wait node sleeps]
                                                   │
Ear 2: Telegram Trigger ───────────────────────────┘
       (manager taps ✅ or ❌)              [workflow resumes]
```

The Wait node is the bridge between the two ears. The workflow isn't cancelled — it's sleeping. The Telegram tap wakes it up.

**Why this matters:** The human doesn't need to log into n8n. They don't need to know any of this exists. They get a Telegram message with two buttons. That's the entire interface.

---

## BUILD STEP A — Wire the Spine
*(Slides 9–13 · 15 on the learner deck)*

**What & why.** You'll build the deterministic half of the workflow — the part that runs at machine speed with no human involved. Standard orders classified by the agent get confirmed automatically. This is the foundation everything else attaches to.

**Time:** ~20 min

---

### Step A1 — Gmail Trigger
*(→ Slide 9)*

1. Open a blank workflow in n8n.cloud. Click **+** to add your first node.
2. Search for **Gmail** → choose **Gmail Trigger**.
3. Configure:
   - **Credential:** select your Gmail account (connect it now if you haven't)
   - **Trigger on:** New Email
   - **Poll Time:** Every Minute
4. Click **Test step** — n8n will fetch a recent email from your inbox to use as test data.
5. Confirm you can see these fields in the output: `from`, `subject`, `text`.

> **What you should see:** A real email from your inbox, shown as JSON. The `text` field is the email body — that's what we're sending to the agent.

> **If no emails appear:** Send yourself a test email first, then click Test step again.

---

### Step A2 — HTTP Request (the agent call)
*(→ Slide 10)*

1. Add an **HTTP Request** node after the Gmail Trigger.
2. Configure:
   - **Method:** POST
   - **URL:** `[your Lumière Order Assistant endpoint — from the session slide]`
   - **Body Content Type:** JSON
   - **Body:**
     ```json
     {
       "message": "{{ $json.text }}"
     }
     ```
   - **Headers:** `Content-Type: application/json`

3. Click **Test step**. The agent classifies the email and returns JSON.

> **What you should see:**
> ```json
> {
>   "order_type": "standard",
>   "complexity": "simple",
>   "human_gate": false,
>   "human_gate_reason": "",
>   "draft_response": "Thank you for your order at Lumière Bakery..."
> }
> ```

> **If you see an error:** Check the URL (no trailing spaces). Check that Body Content Type is set to JSON, not Form Data.

> **n8n expressions:** `{{ $json.text }}` means "take the `text` field from the previous node's output." This is the only expression syntax you need today.

---

### Step A3 — IF Node (the classifier's output becomes a decision)
*(→ Slide 11)*

1. Add an **IF** node after the HTTP Request.
2. Configure:
   - **Condition:** `{{ $json.human_gate }}` **equals** `true`
3. You now have two output wires:
   - **True** (right output) = complex orders → needs human
   - **False** (left output) = standard orders → auto-confirm

> **What you should see:** Two output ports on the IF node. Drag a wire from each — you'll connect them to the next nodes in the following steps.

---

### Step A4 — Gmail (auto-confirm, false branch)
*(→ Slide 12)*

1. Connect the **false (left)** output of the IF node to a new **Gmail** node.
2. Action: **Send Email**
3. Configure:
   - **To:** `{{ $('Gmail Trigger').item.json.from }}`
   - **Subject:** `Your Lumière order is confirmed ✓`
   - **Message:**
     ```
     {{ $('HTTP Request').item.json.draft_response }}
     ```
4. Click **Test step** (with a standard order test email).

> **What you should see:** An email sent to the customer address from the test email. Check your sent folder.

> **Expression note:** `$('Gmail Trigger').item.json.from` means "go back to the Gmail Trigger node and get the `from` field." You're reaching across nodes.

---

### A — Check your work
*(→ Slide 13 · verify on Slide 15)*

Run the full spine with a **standard order** test email:

```
Test email to paste/send to yourself:
Subject: Cake order request
Body: Hi, I'd like to order a 2-tier vanilla sponge with buttercream frosting 
for a birthday. About 20 people. Budget around ₹2,500. 
Pick-up on Saturday afternoon. Thanks, Priya
```

**Expected flow:**
- Gmail Trigger catches it
- HTTP Request → agent returns `human_gate: false`
- IF → takes false branch
- Gmail sends auto-confirmation

> **Reflection:** Find the step in your Session 5 Tool Manifest that you marked as a "write" action (the send-confirmation step). The Gmail auto-confirm node is that tool. The false branch is the constraint around it — it only fires after the agent has classified the order as safe to auto-handle.

---

## BUILD STEP B — Add the Human Gate
*(Slides 19–23 · debrief Slide 24 on the learner deck)*

**What & why.** You'll wire the HITL (Human-in-the-Loop) approval flow on the complex branch. The Wait node pauses the workflow. The Telegram bot notifies the manager. The manager's tap resumes it. This is the "nervous tool" gate you designed in Session 5, now running.

**Time:** ~30 min

---

### Step B1 — Telegram Send (complex branch)
*(→ Slide 19)*

1. Connect the **true (right)** output of the IF node to a **Telegram** node.
2. Action: **Send Message**
3. Configure:
   - **Chat ID:** `[provided by facilitator — your session's bot chat_id]`
   - **Text:**
     ```
     🧁 New custom order from {{ $('Gmail Trigger').item.json.from }}

     {{ $('Gmail Trigger').item.json.text }}

     Agent classification: {{ $('HTTP Request').item.json.complexity }}
     Reason for review: {{ $('HTTP Request').item.json.human_gate_reason }}

     Draft response:
     {{ $('HTTP Request').item.json.draft_response }}
     ```
   - **Reply Markup:** Inline Keyboard
     - Row 1, Button 1: Text = `✅ Approve` · Callback Data = `approve`
     - Row 1, Button 2: Text = `❌ Reject` · Callback Data = `reject`

> **What you should see:** A Telegram message on the facilitator's phone/screen with your order details and two buttons.

---

### Step B2 — Wait Node
*(→ Slide 20)*

1. Add a **Wait** node after the Telegram Send.
2. Configure:
   - **Wait for:** On webhook call (not a time delay)
3. n8n generates a **Resume URL** automatically. Note it — it's how the workflow knows to wake up.

> **What this does:** The workflow stops here. It doesn't time out, it doesn't cancel. It waits — indefinitely — until the Telegram Trigger calls the Resume URL.

> **The sleeping workflow metaphor:** Think of the workflow as having pressed pause on a film. The frames are still in memory. When the Telegram callback arrives, it presses play again — from exactly the frame it stopped at.

---

### Step B3 — Telegram Trigger (second ear)
*(→ Slide 21)*

1. Add a **Telegram Trigger** node (separate from the main flow — this is a new entry point).
2. Configure:
   - **Updates:** Callback Query
3. After the Telegram Trigger, add an **IF** node:
   - Condition: `{{ $json.callback_query.data }}` equals `approve`
   - True branch → Approval path
   - False branch → Rejection path

---

### Step B4 — Approval Branch
*(→ Slide 22)*

1. Connect the **true** output to a **Gmail** node.
2. Action: Send Email
3. Configure:
   - **To:** `{{ $('Gmail Trigger').item.json.from }}`
   - **Subject:** `Your Lumière order is confirmed ✓`
   - **Message:** `{{ $('HTTP Request').item.json.draft_response }}`

---

### Step B5 — Rejection Branch
*(→ Slide 23)*

1. Connect the **false** output to a new **HTTP Request** node (re-draft call).
2. Configure:
   - **Method:** POST
   - **URL:** `[same Lumière Order Assistant endpoint]`
   - **Body:**
     ```json
     {
       "message": "{{ $('Gmail Trigger').item.json.text }}",
       "revision_note": "Manager requested a revision. Please ask the customer for their preferred date and budget range before confirming."
     }
     ```
3. Add a **Gmail** node after it → send the revised response to the customer.

---

### B — Check your work
*(→ Slides 23–24)*

Test with a **complex order** email:

```
Test email to paste/send to yourself:
Subject: Custom fondant cake request
Body: Hi! I need a 3-tier fondant cake with sculpted sugar flowers, 
completely dairy-free (my daughter has a severe milk allergy). 
For Saturday — that's 2 days from now. Budget is flexible, around ₹3,000–₹3,500. 
Can you confirm? — Meera
```

**Expected flow:**
- Gmail Trigger catches it
- HTTP Request → agent returns `human_gate: true` (dairy-free + fondant + 48hr)
- IF → takes true branch
- Telegram message arrives with ✅/❌ buttons
- Wait node pauses workflow
- Tap ✅ → Approval branch → Gmail confirmation fires
- (Test ❌ → Rejection branch → re-draft → revised Gmail fires)

> **Reflection:** You circled a "nervous tool" on your Session 5 Tool Manifest. The Wait node + Telegram button is the implementation of that circle. The human gate you designed in theory is now a real pause in a real workflow.

---

## BUILD STEP C — Debug the Dirty Node
*(Slides 25–26 on the learner deck)*

**What & why.** Every workflow breaks. The skill is finding what broke in under two minutes. You'll use n8n's visual execution history and three diagnostic questions to locate and fix a broken node.

**Time:** ~15 min

---

### The 3-Question Method
*(→ Slide 25)*

Memorize this. Use it every time a workflow fails:

1. **Which node is red?** Open Execution History. Find the red node. Start there — not at the beginning of the workflow.
2. **What did it receive?** Click the red node → Input tab. Did the data from the previous node arrive correctly?
3. **What did it expect?** Read the error message. What was the mismatch between what arrived and what the node needed?

Fix the mismatch. Re-run. Done.

---

### Step C1 — Open the broken workflow

The facilitator will share a broken workflow for you to import, or will demo it on screen. Open it (or watch the screen).

### Step C2 — Run it and watch it fail

Click **Test workflow** with a test order email. Watch the execution — one or more nodes will go red.

### Step C3 — Apply the 3-question method

1. Open **Execution History** (clock icon in the left sidebar)
2. Click the most recent run
3. Click the red node
4. Check: Input (what arrived?), Output (what was expected?), Error message

Write your answers here:

| Question | Answer |
|---|---|
| Which node is red? | |
| What did it receive? | |
| What did it expect? | |
| Fix applied: | |

### Step C4 — Fix and re-run

Apply the fix. Click **Test workflow** again. Confirm the execution history shows all green nodes.

---

### Pin Data (take-home technique)
*(→ Slide 26)*

Instead of sending a real email every time you test, **pin** the data:

1. Open the Gmail Trigger's output from any previous successful run
2. Click **Pin data**
3. Now when you run the workflow, the Trigger uses the pinned email instead of polling Gmail

Use this to test the complex branch anytime without crafting a new test email.

---

## The Classifier Prompt

This is what's embedded in your HTTP Request node. Study it — you'll customize it for your own context in the take-home exercise.

```
You are the Lumière Bakery Order Classifier.

A new order email has arrived. Read it carefully and return a JSON object 
with exactly these fields:

{
  "order_type": "standard" or "custom",
  "complexity": "simple" | "moderate" | "complex",
  "human_gate": true or false,
  "human_gate_reason": "one sentence explaining why, or empty string",
  "draft_response": "the confirmation email to send the customer if approved"
}

Classify as CUSTOM (human_gate: true) if ANY of these apply:
- Dietary restriction mentioned (dairy-free, nut-free, vegan, gluten-free, etc.)
- Lead time under 72 hours
- Budget outside ₹800–₹6,000
- Fondant, sculpted, or 3+ tier cake
- Unusual flavours or imported ingredients

Classify as STANDARD (human_gate: false) if none of the above apply.

Draft response: warm, specific to the order, ends with 
"We'll confirm your slot within 2 hours."

Return only valid JSON. No prose outside the JSON object.
```

---

## Take-Home — Customize for Your Own Context

The workflow pattern is identical whatever the domain. The classifier prompt is what changes. Use this template:

```
You are the [YOUR CONTEXT] Classifier.

A new [REQUEST TYPE] has arrived. Read it carefully and return:

{
  "request_type": "standard" or "escalate",
  "human_gate": true or false,
  "human_gate_reason": "...",
  "draft_response": "..."
}

Escalate (human_gate: true) if ANY of these apply:
- [YOUR TRIGGER CONDITION 1]
- [YOUR TRIGGER CONDITION 2]
- [YOUR TRIGGER CONDITION 3]

Standard (human_gate: false) if none of the above apply.
```

**Starter conditions by role:**

| Role | Request type | Escalate when |
|---|---|---|
| **Sales** | Inbound lead | Enterprise account / budget > ₹10L / C-suite contact / competitor mention |
| **Finance** | Invoice approval | Amount > ₹50K / new vendor / missing PO / currency mismatch |
| **HR** | Candidate triage | Senior hire (VP+) / counter-offer situation / internal referral / relocation required |
| **Healthcare** | Referral | Urgent flag / specialist out of network / paediatric patient / allergies noted |

---

## Reference: n8n Expressions You Used Today

| Expression | What it means |
|---|---|
| `{{ $json.text }}` | The `text` field from the current node's input |
| `{{ $('Gmail Trigger').item.json.from }}` | The `from` field from the Gmail Trigger node specifically |
| `{{ $('HTTP Request').item.json.draft_response }}` | The `draft_response` field from the HTTP Request node |
| `{{ $json.callback_query.data }}` | The button data from a Telegram inline keyboard tap |

**Rule:** `$json` = current node. `$('Node Name').item.json` = a specific node by name.

---

## What You Shipped Today

- A **Gmail Trigger** that catches every new order email
- An **HTTP Request** that calls an AI agent to classify it
- An **IF node** that routes standard vs. complex orders
- A **Gmail auto-confirm** for standard orders (machine speed, no human)
- A **Telegram notification** with inline approval buttons for complex orders
- A **Wait node** that pauses the workflow mid-run
- A **Telegram Trigger** (second ear) that resumes it on manager approval
- An **approval branch** that sends the draft confirmation
- A **rejection branch** that re-drafts and sends a revised response
- A **debugging method** that finds broken nodes in under 2 minutes

**The Architecture Card connection:**
- Your Loop Trace → became the classifier prompt
- Your Tool Manifest → became the HTTP Request node and its scoped permission
- The human gate you circled → became the Wait node + Telegram button
- Your Pattern Choice → became the IF branch structure

---

*Shantanu Chandra · [linkedin.com/in/chandrashantanu](https://linkedin.com/in/chandrashantanu)*
