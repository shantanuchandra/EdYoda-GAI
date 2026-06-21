# Generative AI for Non-Coders — Session 6 Handbook

**Build the Lumière Order Triage Workflow — End to End, On Your Own**

---

## What this is

This is a solo execution guide. By the end of it you will have a **live n8n workflow** that reads cake-order emails the moment they land in Gmail, decides whether each one is a standard order or needs a human, auto-confirms the standard ones, and pings the bakery manager on Telegram for the rest — and waits for their ✅ or ❌ before replying.

The story is **Lumière Bakery**, the same one you've followed since Session 4. Lumière's inbox fills with order emails: "2-tier vanilla sponge for Saturday," "3-tier fondant, dairy-free, severe allergy." Some are routine. Some are not. The owner doesn't want to read every one at machine speed, but she absolutely wants to see the tricky ones before a reply goes out. That's exactly what you're building — a triage layer that handles the routine and escalates the rest.

The workbook (`02_Learner_Workbook.md`) is the in-class companion; this handbook is its fuller sibling. Everything you need to build the whole thing from a blank canvas is here, in order, with a ready-to-paste prompt for every AI-built node. Work top to bottom and don't skip the **Ground Truth** section — it's the idea the whole workflow rests on.

---

## Before you start

Three things connected, then you're clear to build. Each is a few minutes.

| Thing | What to do | Where |
|---|---|---|
| **n8n.cloud account** | Sign in. Open a blank workflow. | n8n.cloud |
| **Gmail credential** | Connect your Gmail so n8n can read the inbox and send replies. | Settings → Credentials → Add Credential → Gmail (OAuth2) |
| **Telegram bot** | Message `@BotFather`, send `/newbot`, follow the prompts, copy the **bot token**. Add it as a Telegram credential in n8n. | Telegram app → @BotFather → n8n Settings → Credentials → Telegram |

You'll also need a **Google Gemini (PaLM) API** credential for the AI classifier node — get a free key at aistudio.google.com, then add it under Settings → Credentials → Google Gemini.

> [SCREENSHOT: n8n Credentials screen showing three connected credentials — Gmail, Telegram, and Google Gemini — each with a green "connected" indicator]

That's the whole setup. Don't wire anything yet — the build starts after the next section.

---

## The Ground Truth

Here is the single most important idea in this session: **the workflow does not hardcode prices, rules, or reply wording.** It reads them from one file — `lumiere_kb.md`, the Lumière Knowledge Base.

Think about why that matters. If butterscotch goes up by ₹50, or the manager decides every dairy-free order needs a human, or the confirmation email gets a new sign-off — you do **not** go hunting through ten nodes to change a number buried in an expression. You edit **one file**, and every node that reads it follows. The KB is the brain; the nodes are the hands.

In your workflow this lives in a node called **Load Lumière KB** — a Set/Code node near the start that holds the KB content. Two later nodes read from it:

- the **Gemini classifier** reads the KB's *rules* to decide standard-vs-escalate, and
- the **Calculate Price** node reads the KB's *catalogue* to price the cake.

The KB has four sections. You don't need to memorize them — you need to know they exist and that the workflow points at them:

| § | Section | What the workflow uses it for |
|---|---|---|
| **1** | **Catalogue & Pricing** | Flavour base prices (500 g / 1 kg), size keys, surcharges (eggless +80, +400 per extra tier), and the **fuzzy-match policy** — how free-text flavours map to catalogue keys, and the rule that *no confident match → don't guess, escalate.* |
| **2** | **Operating Facts** | 72-hour minimum lead time, ₹120 city delivery, order-ID format, the "confirm within 2 hours" SLA, out-of-scope items. |
| **3** | **Classifier Rules** | The six conditions that force `human_gate: true` — dietary restriction, lead time under 72 h, budget outside ₹800–₹6,000, complex build (fondant / sculpted / 3+ tiers), unusual or imported, and no confident price match. |
| **4** | **Reply Templates & Voice** | The exact wording for the three replies — standard confirmation, post-approval confirmation, and decline — plus the "warm, specific, never robotic, sign off as Lumière Bakery" voice rule. |

The full file is `lumiere_kb.md` in this folder. Open it once now and skim it — when you build the classifier and the price node, you'll point them at exactly these sections.

> [SCREENSHOT: lumiere_kb.md open in an editor, scrolled to show the four section headings — "1. Catalogue & Pricing", "2. Operating Facts", "3. Classifier Rules", "4. Reply Templates & Voice"]

**One rule to carry through the whole build:** when a node needs a price or a decision, the answer comes from the KB — never from a number you typed into the node. If you ever catch yourself hardcoding ₹520 into an expression, stop: that value belongs in the KB.

---

## Three ways to see the same workflow

Before you build a single node, read these three diagrams. Each is the same workflow, shown through a different lens. Together they give you the full mental model — so when you wire a node, you already know where it fits, what decision it makes, and whose data it owns.

```
═══════════════════════════════════════════════════════════════════════
  HOW IT WORKS — VIEW 1 of 3 · THE ORDER'S JOURNEY
  Follow one real order all the way through. This is the FLOW.
═══════════════════════════════════════════════════════════════════════

  PRIYA sends this email:
  ┌─────────────────────────────────────────────────────────────────┐
  │ Subject: Cake order request                                      │
  │ Hi, I'd like a 2-tier vanilla sponge for Saturday. ~20 people,  │
  │ budget around ₹2,500. Pick-up Saturday afternoon. Thanks, Priya  │
  └─────────────────────────────────────────────────────────────────┘

  ↓ arrives in Gmail inbox

  ┌──────────────────────────────────────────────┐
  │  NODE 1 · Gmail Trigger                       │
  │  Catches the email the moment it lands.       │
  │  Passes on → from, subject, text              │
  └──────────────────────────────────────────────┘
  ↓ from: priya@example.com · subject: "Cake order request" · text: full body

  ┌──────────────────────────────────────────────┐
  │  NODE 2 · Load Lumière KB                     │
  │  Loads the ground truth alongside the email.  │
  │  Passes on → all email fields + kb object     │
  └──────────────────────────────────────────────┘
  ↓ kb.catalogue · kb.rules · kb.templates now travel with the email

  ┌──────────────────────────────────────────────┐
  │  NODE 3 · If (pre-filter)                     │
  │  "Does this email look like an order?"        │
  │  Checks for: cake|order|sponge|tier|fondant…  │
  └──────────────────────────────────────────────┘
  ↓ "vanilla sponge" matches → TRUE branch continues

  ┌──────────────────────────────────────────────┐
  │  NODE 4 · Message a model (Gemini)            │
  │  Reads the email + KB rules.                  │
  │  Extracts → flavour, size, eggless, tiers,    │
  │              human_gate, hasAllRequired …      │
  └──────────────────────────────────────────────┘
  ↓ hasAllRequired: true · flavour: "vanilla sponge" · human_gate: false

  ┌──────────────────────────────────────────────┐
  │  NODE 5 · Code in JavaScript (parse)          │
  │  Strips any JSON fences. Fills safe defaults. │
  │  Guarantees a clean, reliable shape.          │
  └──────────────────────────────────────────────┘
  ↓ clean booleans, no fences, every field present

  ┌──────────────────────────────────────────────┐
  │  NODE 6 · If1 (the branch)                   │
  │  hasAllRequired === true ?                    │
  └───────────────┬──────────────────────────────┘
                  │
       ┌──────────┴──────────┐
       │ TRUE                │ FALSE
       ▼                     ▼
  ┌──────────────┐    ┌─────────────────────────────┐
  │ NODE 7       │    │ NODE 7b                      │
  │ Calculate    │    │ Telegram — Notify Manager    │
  │ Price        │    │ Sends order + ✅/❌ buttons    │
  │              │    └─────────────┬───────────────┘
  │ KB fuzzy-    │                  ↓
  │ match:       │    ┌─────────────────────────────┐
  │ "vanilla"    │    │ NODE 8b                      │
  │ → vanilla_   │    │ Wait for approval            │
  │ sponge 1kg   │    │ Workflow sleeps here…        │
  │ ₹1,000       │    │ …until manager taps a button │
  │ +400 (tier)  │    └─────────────┬───────────────┘
  │ = ₹1,400     │                  ↓ (manager taps ✅)
  └──────┬───────┘    ┌─────────────────────────────┐
         ↓            │ NODE 9b                      │
  ┌──────────────┐    │ Reply to a message1           │
  │ NODE 8       │    │ Approval or decline email     │
  │ Reply to a   │    │ from KB §4 template           │
  │ message      │    └─────────────────────────────┘
  │ (Gmail       │
  │ auto-confirm)│
  │ ₹1,400,      │
  │ vanilla      │
  │ sponge 1kg   │
  └──────────────┘

  Priya gets this email:
  ┌─────────────────────────────────────────────────────────────────┐
  │ Subject: Your Lumière order is confirmed ✓                       │
  │ Dear Priya, Thank you for your order with Lumière! We've got     │
  │ your 1kg vanilla sponge cake noted. Your total comes to ₹1,400. │
  │ We'll confirm your slot within 2 hours. Warmly, Lumière Bakery  │
  └─────────────────────────────────────────────────────────────────┘
```

---

```
═══════════════════════════════════════════════════════════════════════
  HOW IT WORKS — VIEW 2 of 3 · THE DECISION TREE
  Same workflow, different lens. This is the LOGIC — every yes/no gate.
═══════════════════════════════════════════════════════════════════════

  An email arrives. The workflow asks three questions, in order.
  Each question is one node. Fail any gate → the order is handled
  differently. Here is every path:


  ┌─ Q1 ──────────────────────────────────────────────────────┐
  │  Is this an order email?                                   │
  │  NODE: If (pre-filter)   ·   tests: subject + body         │
  │  against  cake|order|sponge|fondant|tier|delivery…         │
  └────────────────────────────────────────────────────────────┘
        │                                   │
       YES                                 NO
        │                                   │
        ▼                                   ▼
   (continue)                        ╳ STOP — ignored.
        │                              Not a cake order
        │                              (newsletter, spam).
        │                              Nothing happens.
        ▼
  ┌─ Q2 ──────────────────────────────────────────────────────┐
  │  Did the AI find everything we need?                       │
  │  NODE: If1   ·   tests:  hasAllRequired === true           │
  │  (needs flavour + size + date + delivery address)          │
  └────────────────────────────────────────────────────────────┘
        │                                   │
       YES                                 NO
   (complete)                         (missing a field)
        │                                   │
        ▼                                   ▼
  ┌─ Q3 ─────────────────────────┐   ┌──────────────────────────┐
  │  Can we price it confidently?│   │  HUMAN GATE → Telegram    │
  │  NODE: Calculate Price        │   │  Manager sees the order   │
  │  fuzzy-matches the flavour    │   │  + what's missing, taps   │
  │  against the KB catalogue     │   │  ✅ Approve / ❌ Reject    │
  └───────────────────────────────┘   └──────────────────────────┘
        │                   │
   CONFIDENT            NO MATCH
   (in catalogue)      (unknown flavour)
        │                   │
        ▼                   ▼
  ┌──────────────┐   ┌──────────────────────────┐
  │ AUTO-CONFIRM │   │  HUMAN GATE → Telegram    │
  │ Price from   │   │  "Flavour not in          │
  │ KB. Email    │   │  catalogue — needs a      │
  │ Priya the    │   │  human to price."         │
  │ confirmation.│   │  (NEVER guesses a price.) │
  └──────────────┘   └──────────────────────────┘


  READ IT THIS WAY:
   • Only an order that clears ALL THREE gates is auto-handled.
   • Q1 fails  → silently ignored (it wasn't an order).
   • Q2 fails  → human, because we're missing facts.
   • Q3 fails  → human, because we won't invent a price.
   • The human gate is reached by TWO different doors (Q2 and Q3) —
     that's why "Telegram → Notify Manager" appears twice.

  WHY THREE GATES AND NOT ONE: each gate fails for a different reason,
  so each needs its own response. Spam gets dropped. Missing info gets
  a human. An unknown cake gets a human. Lumping them together would
  mean treating spam like a real order — or guessing a price you can't
  stand behind.
```

---

```
═══════════════════════════════════════════════════════════════════════
  HOW IT WORKS — VIEW 3 of 3 · GROUND TRUTH FEEDS EVERYTHING
  Same workflow, third lens. This is the DATA — where facts live
  and who reads them.
═══════════════════════════════════════════════════════════════════════

  One node — "Load Lumière KB" — holds every fact the workflow needs.
  Every downstream node reads from it. Nothing is hardcoded twice.

  Change a price in the KB → every future order uses the new price.
  Add a flavour to the KB → the workflow can price it tomorrow.
  No code changes. No redeployment. Edit one node, done.


                    ┌──────────────────────────┐
                    │     lumiere_kb.md         │
                    │  (the source document)    │
                    │                           │
                    │  § Catalogue & Pricing    │
                    │  § Operating Facts        │
                    │  § Classifier Rules       │
                    │  § Reply Templates        │
                    └────────────┬─────────────┘
                                 │
                         you paste it into
                                 │
                                 ▼
               ┌─────────────────────────────────┐
               │       Load Lumière KB            │
               │       (Code node)                │
               │                                  │
               │  Turns the KB into structured    │
               │  data: arrays, objects, numbers  │
               │  that other nodes can query.     │
               └──────────┬──────────────────────┘
                          │
            ┌─────────────┼─────────────────┐
            │             │                 │
            ▼             ▼                 ▼
  ┌─────────────┐  ┌────────────┐  ┌──────────────────┐
  │   Gemini     │  │ Calculate  │  │  Reply to a      │
  │  Classifier  │  │   Price    │  │   message        │
  │              │  │            │  │                  │
  │  READS:      │  │  READS:    │  │  READS:          │
  │  • escalation│  │  • catalogue│ │  • reply templates│
  │    rules     │  │  • aliases  │ │  • voice rules   │
  │  • lead time │  │  • prices   │ │  • operating facts│
  │  • price band│  │  • surcharges│ │                 │
  └─────────────┘  └────────────┘  └──────────────────┘

  HOW THEY ACCESS IT:  every node calls
     $('Load Lumière KB').first().json.kb
  and then reads the field it needs:
     .catalogue   .escalationRules   .templates   .leadTimeHours


  ─── WHY THIS MATTERS ──────────────────────────────────────────────

  WITHOUT a KB (the "before" version):
   • Prices live inside Calculate Price code.
   • Escalation rules live inside the Gemini prompt.
   • Reply wording lives inside the Reply node.
   • Change a price? Find it in code. Change a rule? Find it in
     the prompt. Forget one? The workflow is now lying to customers.

  WITH a KB (the "after" version):
   • Every fact lives in ONE place.
   • Every node reads from that place.
   • A non-coder can update the KB (it's just a list).
   • The workflow cannot contradict itself — there is only one
     truth, and everyone reads it.

  THIS IS THE SINGLE MOST IMPORTANT PATTERN IN AUTOMATION:
  separate what you KNOW from what you DO.
```

---

## What you're building

The full node chain. Every node below is one you'll wire in Parts 1–3.

```
┌─────────────────┐
│  Gmail Trigger  │  new unread email lands
└────────┬────────┘
         ↓
┌─────────────────┐
│  Load Lumière KB│  holds the ground truth (catalogue · rules · templates)
└────────┬────────┘
         ↓
┌─────────────────┐
│   If (pre-filter)│  regex: cake|bakery|order|flavour|tier|fondant|sponge|delivery …
└────────┬────────┘  is this even an order email?
         ↓ true
┌─────────────────┐
│ Message a model │  Google Gemini · JSON out · reads KB §3 rules
│  (AI classifier)│  → hasAllRequired, flavour, size, eggless, human_gate …
└────────┬────────┘
         ↓
┌─────────────────┐
│  Code (JS parse)│  normalises Gemini's JSON into clean fields
└────────┬────────┘
         ↓
┌─────────────────┐
│  If1            │  $json.hasAllRequired === true ?
└───┬─────────┬───┘
    │ true    │ false
    ↓         ↓
┌─────────┐  ┌──────────────────────┐
│Calculate│  │ Telegram —           │
│ Price   │  │ Notify Manager       │  order summary + ✅/❌ inline keyboard
│(KB §1   │  └──────────┬───────────┘
│ fuzzy-  │             ↓
│ match)  │  ┌──────────────────────┐
└────┬────┘  │ Wait for approval    │  workflow sleeps until a button is tapped
     ↓       └──────────┬───────────┘
┌─────────┐             ↓
│ Reply   │  ┌──────────────────────┐
│ (Gmail  │  │ Reply to a message1  │  Gmail — approved / declined wording
│ auto-   │  │  (Gmail)             │
│ confirm)│  └──────────────────────┘
└─────────┘
```

**The shape in one breath:** catch the email → load the rules → check it's an order → let the AI classify it against the rules → tidy the result → branch. Complete orders get priced from the catalogue and auto-confirmed. Incomplete or risky ones go to a human on Telegram, and the workflow waits for their call.

---

## Build Part 1 — The Spine

The spine is everything from the trigger to the branch point: **Gmail Trigger → Load Lumière KB → If pre-filter → Gemini classifier → Code parse → If1.** Build it in this order. After this part you'll have a workflow that catches an email, classifies it, and is ready to branch — you just haven't wired the two branches yet.

Every AI-built node below comes with an **RCTFC prompt** — Role / Context / Task / Format / Constraints, the structure from Session 3. Paste it into the **✨ AI button** on the n8n canvas and let n8n place and pre-configure the node; then check the config specifics underneath and adjust.

---

### 1.1 — Gmail Trigger

**What & why.** The front door. It watches the Lumière inbox and fires the moment a new unread email arrives, handing the full message — subject, body, sender — to the rest of the workflow.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder helping me automate a bakery order intake process.
> CONTEXT: I run Lumière Bakery. New customer orders arrive as emails to my Gmail inbox. I want to capture each one automatically the moment it arrives.
> TASK: Add a Gmail Trigger node that watches my inbox for new unread emails and passes the full email — subject, body, and sender — to the next step.
> FORMAT: Place the node on the far left of the canvas. Name it "Gmail Trigger". Show me where to attach my Gmail credential.
> CONSTRAINTS: Poll every minute. Watch INBOX only. Do not mark emails as read automatically.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Example value |
|---|---|---|---|
| **IN** | *(nothing — this is the trigger)* | — | — |
| **OUT** | `from` | string | `priya@example.com` |
| **OUT** | `subject` | string | `Cake order request` |
| **OUT** | `text` | string | Full email body (plain text) |
| **OUT** | `html` | string | Full email body (HTML, if present) |
| **OUT** | `id` | string | Gmail message ID (used by Reply node) |
| **OUT** | `threadId` | string | Gmail thread ID |

Every node after this one can reach these via `$('Gmail Trigger').item.json.subject` etc.

**Config specifics:**
- **Credential:** your connected Gmail account
- **Trigger on:** New Email
- **Poll Time:** Every Minute
- **Filters:** Label / Folder = INBOX
- **Options → Mark as Read:** off

Click **Test step** — n8n pulls a recent email from your inbox as test data so you have something flowing through the canvas.

> **What you should see:** one real email rendered as JSON, with `from`, `subject`, and `text` fields. The `text` field is the email body — that's the raw material everything downstream works on. If nothing appears, send yourself an email and click Test step again.

> [SCREENSHOT: Gmail Trigger node output panel showing a real email as JSON with from, subject, and text fields visible]

---

### 1.2 — Load Lumière KB

**What & why.** This node carries the ground truth into the run. It holds the KB content (catalogue, classifier rules, reply templates) as data, so the classifier and the price node can read from it instead of from hardcoded values. This is the spine of the whole "edit one file, the workflow follows" idea.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: My workflow must price cakes and classify orders against a single source of truth — the Lumière Knowledge Base. I do not want prices or rules hardcoded inside individual nodes; I want them held in one place that later nodes read from.
> TASK: Add a node right after the Gmail Trigger that holds my knowledge base as structured data — a catalogue of flavours with base prices, size keys, surcharges, the classifier rules, and the reply templates — and passes it through alongside the email.
> FORMAT: Name it "Load Lumière KB". Use a Set node (or a Code node if the data is large). Keep the original email fields flowing through untouched, and add the KB as a field named "kb".
> CONSTRAINTS: Do not alter the email data. The KB must be readable by later nodes via an expression like {{ $('Load Lumière KB').item.json.kb }}. Mirror the catalogue, rules, and templates exactly as written in lumiere_kb.md — do not paraphrase prices or rules.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Example value |
|---|---|---|---|
| **IN** | `from` | string | `priya@example.com` |
| **IN** | `subject` | string | `Cake order request` |
| **IN** | `text` | string | Full email body |
| **OUT** | *all IN fields* | — | Passed through unchanged |
| **OUT** | `kb.catalogue` | object | `{ vanilla_sponge: { aliases: [...], "500g": 520, "1kg": 1000 }, … }` |
| **OUT** | `kb.surcharges` | object | `{ eggless: 80, extra_tier: 400 }` |
| **OUT** | `kb.rules` | array | `["dietary restriction", "lead time under 72h", …]` |
| **OUT** | `kb.band` | object | `{ min: 800, max: 6000 }` |
| **OUT** | `kb.templates` | object | `{ standard: "Dear …", approved: "…", declined: "…" }` |

Downstream expression: `$('Load Lumière KB').item.json.kb.catalogue.vanilla_sponge["1kg"]` → `1000`

**Config specifics.** Use a **Set** node (Edit Fields) or a **Code** node. Add a field `kb` holding the KB as JSON — at minimum the catalogue, the six classifier rules, and the reply templates, copied faithfully from `lumiere_kb.md`. Keep the email fields passing through so the next node still sees `subject`, `text`, and `from`.

A trimmed shape of what `kb` should contain (fill from the real file):
```json
{
  "catalogue": {
    "vanilla_sponge":  { "aliases": ["vanilla","sponge","classic vanilla","plain"], "500g": 520, "1kg": 1000 },
    "chocolate_fudge": { "aliases": ["chocolate","choco","choc fudge","dark chocolate","fudge"], "500g": 580, "1kg": 1100 }
  },
  "surcharges": { "eggless": 80, "extra_tier": 400 },
  "rules": ["dietary restriction","lead time under 72h","budget outside 800-6000","fondant/sculpted/3+ tiers","unusual or imported","no confident price match"],
  "band": { "min": 800, "max": 6000 }
}
```

> **What you should see:** the email fields still present, plus a new `kb` object you can expand in the output panel. Nothing about the email changed — you only added the ground truth alongside it.

> [SCREENSHOT: Load Lumière KB node output showing the original email fields plus an expandable "kb" object containing catalogue, surcharges, and rules]

---

### 1.3 — If (regex pre-filter)

**What & why.** A cheap gate before the AI. Not every email is an order — newsletters, receipts, spam. This IF checks the subject and body against a regex of bakery words and only lets order-shaped emails through to the classifier. It keeps junk out and saves a Gemini call on every random email.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: Not every email in my inbox is a cake order — there are newsletters, receipts, and spam. Before I spend an AI call classifying an email, I want a quick keyword check to confirm it even looks like a bakery order.
> TASK: Add an IF node after the Load Lumière KB node. It should test whether the email subject or body matches a regular expression of bakery-order words, and only pass matching emails down the TRUE branch.
> FORMAT: Name it "If". The regex to match (case-insensitive) is: cake|bakery|order|flavour|flavor|tier|fondant|sponge|buttercream|delivery|pickup|eggless. TRUE = looks like an order. FALSE = ignore.
> CONSTRAINTS: Case-insensitive match. Test the combined subject + body text. The FALSE branch should simply lead nowhere (the email is dropped). Do not modify the email data.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Notes |
|---|---|---|---|
| **IN** | all Gmail + KB fields | — | passes through from Load Lumière KB |
| **OUT (TRUE)** | all IN fields | — | unchanged — the email is an order |
| **OUT (FALSE)** | *(nothing)* | — | unconnected — the email is dropped |

The IF node does not add or modify any field. It only decides which port the item exits.

**Config specifics:**
- **Condition type:** String → *matches regex*
- **Value 1:** `{{ $json.subject }} {{ $json.text }}`
- **Regex:** `(?i)(cake|bakery|order|flavour|flavor|tier|fondant|sponge|buttercream|delivery|pickup|eggless)`
- **TRUE** output → continues to the classifier. **FALSE** output → leave unconnected (the email is ignored).

> **What you should see:** with an order email flowing through, the item exits the **TRUE** branch. Paste a non-order email (a newsletter subject) into a test run and confirm it exits FALSE and goes nowhere.

> [SCREENSHOT: If node showing an order email taking the TRUE branch, with the regex condition visible in the node settings]

---

### 1.4 — Message a model (Gemini classifier)

**What & why.** The brain of the triage. A **Google Gemini** node reads the email **and the KB rules**, then returns a structured JSON verdict: is everything we need present, what flavour and size, is it eggless, and crucially **does this need a human** (`human_gate`). It doesn't invent policy — it applies the KB's §3 rules to this specific email.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: An order email has passed the keyword pre-filter. I now need an AI model to read the email against my knowledge base rules and return a structured classification — not prose. The KB rules and catalogue are available from the Load Lumière KB node.
> TASK: Add a Google Gemini "Message a model" node after the IF TRUE branch. Feed it the email text plus the KB rules, and have it return a single JSON object describing the order and whether it needs a human.
> FORMAT: Name it "Message a model". Output must be JSON only with these fields: hasAllRequired (boolean), flavour (string), size (string), eggless (boolean), tiers (number), budget (number or null), leadTimeHours (number or null), human_gate (boolean), human_gate_reason (string), customer (string). Set the node to return JSON / parse the response as JSON.
> CONSTRAINTS: Apply the KB classifier rules exactly — set human_gate true if ANY rule fires (dietary restriction, lead time under 72h, budget outside 800-6000, fondant/sculpted/3+ tiers, unusual/imported, or no confident flavour match). hasAllRequired is true only if flavour, size, and a usable date are all present. Return ONLY the JSON object, no commentary. Read the rules from {{ $('Load Lumière KB').item.json.kb }}.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Example value |
|---|---|---|---|
| **IN** | `text` | string | Full email body |
| **IN** | `kb.rules` | array | The six escalation conditions |
| **IN** | `kb.band` | object | `{ min: 800, max: 6000 }` |
| **OUT** | `hasAllRequired` | boolean | `true` |
| **OUT** | `flavour` | string | `"vanilla sponge"` |
| **OUT** | `size` | string | `"1kg"` |
| **OUT** | `eggless` | boolean | `false` |
| **OUT** | `tiers` | number | `2` |
| **OUT** | `budget` | number \| null | `2500` |
| **OUT** | `leadTimeHours` | number \| null | `96` |
| **OUT** | `human_gate` | boolean | `false` |
| **OUT** | `human_gate_reason` | string | `""` (or reason if true) |
| **OUT** | `customer` | string | `"Priya"` |

Note: the model's output may still be wrapped in code fences. The next node (Code parse) cleans that up.

**Config specifics:**
- **Credential:** Google Gemini
- **Operation:** Message a Model
- **Output / Response Format:** JSON
- **Prompt:** assemble it from the KB and the email, e.g.

  ```
  You are the Lumière Bakery Order Classifier. Apply these rules exactly:
  {{ $('Load Lumière KB').item.json.kb.rules }}

  Standard tier band: ₹{{ $('Load Lumière KB').item.json.kb.band.min }}–₹{{ $('Load Lumière KB').item.json.kb.band.max }}.

  Read this order email and return ONLY a JSON object with fields:
  hasAllRequired, flavour, size, eggless, tiers, budget, leadTimeHours,
  human_gate, human_gate_reason, customer.

  Set human_gate=true if ANY KB rule fires. hasAllRequired=true only if
  flavour, size, and a usable date are all present.

  EMAIL:
  Subject: {{ $('Gmail Trigger').item.json.subject }}
  Body: {{ $('Gmail Trigger').item.json.text }}
  ```

> **What you should see:** a JSON object, something like:
> ```json
> {
>   "hasAllRequired": true,
>   "flavour": "vanilla sponge",
>   "size": "1kg",
>   "eggless": false,
>   "tiers": 2,
>   "budget": 2500,
>   "leadTimeHours": 96,
>   "human_gate": false,
>   "human_gate_reason": "",
>   "customer": "Priya"
> }
> ```
> If the model wraps the JSON in prose or backticks, that's normal — the next node cleans it up.

> [SCREENSHOT: Message a model (Gemini) node output panel showing the returned JSON classification with hasAllRequired, flavour, human_gate and the other fields]

---

### 1.5 — Code in JavaScript (parse the classifier)

**What & why.** Gemini's output is *almost* clean JSON, but models sometimes add a stray ```` ```json ```` fence, a trailing sentence, or a missing field. This Code node parses the response, strips any wrapper, fills safe defaults, and emits one tidy item with reliable fields. Everything downstream trusts this node's shape — the branch, the price node, the replies.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: My Gemini node returns a classification that is meant to be JSON, but the model sometimes wraps it in markdown code fences or adds a stray sentence, and occasionally omits a field. Every node after this one depends on a clean, predictable object.
> TASK: Add a Code (JavaScript) node after the Gemini node. Parse the model's text output into a JSON object, stripping any ```json fences or surrounding prose, and return a single clean item with safe defaults for any missing field.
> FORMAT: Name it "Code in JavaScript". Return one item whose json has: hasAllRequired (boolean, default false), flavour (string, default ""), size (string, default ""), eggless (boolean, default false), tiers (number, default 1), budget (number or null), leadTimeHours (number or null), human_gate (boolean, default true), human_gate_reason (string), customer (string).
> CONSTRAINTS: Never throw — if parsing fails, return hasAllRequired=false and human_gate=true so the order is sent to a human rather than mishandled. Do not invent values; only fill defaults.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Example value |
|---|---|---|---|
| **IN** | raw Gemini response | string | `"```json\n{…}\n```"` — may have fences |
| **OUT** | `hasAllRequired` | boolean | `true` — never undefined |
| **OUT** | `flavour` | string | `"vanilla sponge"` — default `""` |
| **OUT** | `size` | string | `"1kg"` — default `""` |
| **OUT** | `eggless` | boolean | `false` — never undefined |
| **OUT** | `tiers` | number | `2` — default `1` |
| **OUT** | `budget` | number \| null | `2500` |
| **OUT** | `leadTimeHours` | number \| null | `96` |
| **OUT** | `human_gate` | boolean | `false` — **defaults to true if parse fails** |
| **OUT** | `human_gate_reason` | string | `""` |
| **OUT** | `customer` | string | `"Priya"` — default `""` |

Key guarantee: **if parsing fails, `human_gate: true`** — a broken parse never auto-confirms an order.

**Config specifics.** A Code node, Run Once For All Items, roughly:
```javascript
const raw = $input.first().json;
let text = raw.text ?? raw.content ?? raw.response ?? JSON.stringify(raw);

// strip ```json … ``` fences and grab the first {...} block
text = String(text).replace(/```json|```/g, '').trim();
const match = text.match(/\{[\s\S]*\}/);

let p = {};
try { p = JSON.parse(match ? match[0] : text); }
catch (e) { p = { hasAllRequired: false, human_gate: true, human_gate_reason: 'Could not parse classifier output' }; }

return [{
  json: {
    hasAllRequired:    p.hasAllRequired ?? false,
    flavour:           p.flavour ?? '',
    size:              p.size ?? '',
    eggless:           p.eggless ?? false,
    tiers:             p.tiers ?? 1,
    budget:            p.budget ?? null,
    leadTimeHours:     p.leadTimeHours ?? null,
    human_gate:        p.human_gate ?? true,
    human_gate_reason: p.human_gate_reason ?? '',
    customer:          p.customer ?? ''
  }
}];
```

> **What you should see:** the same fields as the Gemini step, but guaranteed clean — booleans are real booleans, no code fences, nothing missing. This is the contract the rest of the workflow relies on.

> [SCREENSHOT: Code node output showing the normalised JSON with clean boolean values and no markdown fences]

---

### 1.6 — If1 (the branch)

**What & why.** The fork in the road. It checks one field — `hasAllRequired` — and splits the flow. **TRUE** (we have everything) goes to the standard path: price it and auto-confirm. **FALSE** (something's missing or risky) goes to the human gate: notify the manager and wait.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: My parsed classification has a boolean field hasAllRequired. If it is true, the order has everything we need and can be priced and confirmed automatically. If it is false, the order is missing details or needs a human, and must be routed to the manager.
> TASK: Add an IF node after the Code node. The condition checks whether hasAllRequired equals true (strict boolean).
> FORMAT: Name it "If1". TRUE output = the standard auto-confirm path. FALSE output = the human-gate path.
> CONSTRAINTS: Use strict boolean equality — hasAllRequired is a boolean, not the string "true". Leave both outputs unconnected for now; I will wire them in the next two parts.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Notes |
|---|---|---|---|
| **IN** | all fields from Code parse | — | clean, guaranteed shape |
| **OUT (TRUE)** | all IN fields | — | unchanged — order is complete |
| **OUT (FALSE)** | all IN fields | — | unchanged — missing info or human_gate flag |

Like the pre-filter If, this node does not add fields — it routes. The TRUE branch gets to pricing; the FALSE branch goes to Telegram.

**Config specifics:**
- **Condition:** `{{ $json.hasAllRequired }}` **(Boolean)** **is true**
- **TRUE** output → standard path (Part 2)
- **FALSE** output → human-gate path (Part 3)

> **What you should see:** two output ports on If1. With a complete standard order flowing in, the item leaves the **TRUE** port. The spine is done — both branches are stubs you'll build next.

> [SCREENSHOT: If1 node with two output branches, a standard order item exiting the TRUE port, condition hasAllRequired = true shown in settings]

---

## Build Part 2 — The Standard Path

This is the half that runs with no human in it. If1's **TRUE** branch means the order is complete, so: **Calculate Price** (priced from the KB catalogue) → **Reply to a message** (Gmail auto-confirm). Two nodes.

Three things to hold onto here, because they're the point of the whole section:
- **Price comes from the KB catalogue** — not a number typed into the node.
- **The flavour is fuzzy-matched** to the KB aliases, because customers write "choco" and "dark chocolate," not `chocolate_fudge`.
- **An unknown flavour escalates — it never guesses.** No confident match means route to a human, per the KB's fuzzy-match policy.

---

### 2.1 — Calculate Price

**What & why.** Turns the classified order into a rupee total using the KB catalogue. It fuzzy-matches the customer's free-text flavour against the catalogue aliases, picks the base price for the size, then adds surcharges (eggless +80, +400 per extra tier). If no flavour matches confidently, it doesn't invent a price — it flags the order for escalation.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: I have a complete order with a free-text flavour, a size, an eggless flag, and a tier count. I need to price it using my knowledge base catalogue — base prices by size plus surcharges — and I must fuzzy-match the customer's wording to the catalogue's flavour aliases. Customers write things like "choco" or "dark chocolate", not the exact key.
> TASK: Add a Code (JavaScript) node on the If1 TRUE branch. Read the catalogue and surcharges from the Load Lumière KB node, fuzzy-match the flavour to an alias, look up the base price for the size, add surcharges, and output a total price.
> FORMAT: Name it "Calculate Price". Output fields: matchedFlavour, basePrice, surcharges, totalPrice, priceConfidence ("confident" or "none"), escalate (boolean).
> CONSTRAINTS: Match case-insensitively, punctuation-stripped, against the alias lists. A match counts only if an alias token is fully contained in the customer's flavour text. If there is no confident match, set priceConfidence="none", escalate=true, and DO NOT output a guessed price. Eggless adds 80; each tier beyond the first adds 400. Read everything from {{ $('Load Lumière KB').item.json.kb }} — do not hardcode prices.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Example value |
|---|---|---|---|
| **IN** | `flavour` | string | `"vanilla sponge"` |
| **IN** | `size` | string | `"1kg"` |
| **IN** | `eggless` | boolean | `false` |
| **IN** | `tiers` | number | `2` |
| **IN** | `kb.catalogue` | object | KB catalogue with aliases + prices |
| **IN** | `kb.surcharges` | object | `{ eggless: 80, extra_tier: 400 }` |
| **OUT** | `matchedFlavour` | string \| null | `"vanilla_sponge"` or `null` |
| **OUT** | `basePrice` | number | `1000` (1kg vanilla from KB) |
| **OUT** | `surcharges` | number | `400` (1 extra tier) |
| **OUT** | `totalPrice` | number | `1400` |
| **OUT** | `priceConfidence` | string | `"confident"` or `"none"` |
| **OUT** | `escalate` | boolean | `false` — `true` when no catalogue match |
| **OUT** | `human_gate_reason` | string | `"Flavour not in catalogue"` (if escalate) |

When `escalate: true`, no `basePrice` or `totalPrice` is emitted. The order routes to the Telegram node instead of the Reply node.

**Config specifics.** A Code node that reads the KB and prices against it:
```javascript
const kb   = $('Load Lumière KB').first().json.kb;
const o    = $input.first().json;
const text = (o.flavour || '').toLowerCase().replace(/[^a-z0-9 ]/g, '');

// fuzzy-match flavour -> catalogue key via aliases (token containment)
let matchedKey = null;
for (const [key, entry] of Object.entries(kb.catalogue)) {
  if (entry.aliases.some(a => text.includes(a.toLowerCase()))) { matchedKey = key; break; }
}

// no confident match -> escalate, never guess
if (!matchedKey) {
  return [{ json: { ...o, matchedFlavour: null, priceConfidence: 'none', escalate: true,
                    human_gate: true, human_gate_reason: 'Flavour not in catalogue — needs a human' } }];
}

const entry     = kb.catalogue[matchedKey];
const sizeKey   = (o.size || '').includes('1') ? '1kg' : '500g';
const basePrice = entry[sizeKey];
const surcharges = (o.eggless ? kb.surcharges.eggless : 0)
                 + (Math.max(0, (o.tiers || 1) - 1) * kb.surcharges.extra_tier);

return [{ json: { ...o, matchedFlavour: matchedKey, basePrice, surcharges,
                  totalPrice: basePrice + surcharges, priceConfidence: 'confident', escalate: false } }];
```

> **What you should see (standard order):** `matchedFlavour: "vanilla_sponge"`, a `basePrice` straight from the KB, surcharges added for the extra tier, and a `totalPrice`. Change the email's flavour to something off-catalogue ("matcha tiramisu") and confirm it returns `priceConfidence: "none"` and `escalate: true` instead of a made-up number.

> [SCREENSHOT: Calculate Price node output for the standard order showing matchedFlavour vanilla_sponge, basePrice from the KB, surcharges, and totalPrice]

> [SCREENSHOT: Calculate Price node output for an off-catalogue flavour showing priceConfidence "none" and escalate true — no guessed price]

---

### 2.2 — Reply to a message (Gmail auto-confirm)

**What & why.** Sends the standard confirmation back to the customer, using the KB's §4 confirmation template and the price the previous node calculated. Warm, specific, names the flavour and size, ends with the 2-hour SLA line. No human touches it.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: The order is complete and priced. I want to email the customer a warm confirmation that references their actual order and the calculated total, using my knowledge base confirmation template.
> TASK: Add a Gmail node on the standard path, after Calculate Price, that replies to the original sender with the standard confirmation.
> FORMAT: Name it "Reply to a message". TO = the original sender. Subject starts with a check mark and names the order. Body follows the KB standard-confirmation template, filling in customer, size, flavour, date, and the calculated total.
> CONSTRAINTS: Pull the recipient from the Gmail Trigger sender. Pull the total from the Calculate Price node. Use the exact voice and closing line from the KB template ("We'll confirm your slot within 2 hours.") and sign off as Lumière Bakery. Do not mention the automation or the classifier.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Notes |
|---|---|---|---|
| **IN** | `matchedFlavour` | string | `"vanilla_sponge"` — used in email body |
| **IN** | `size` | string | `"1kg"` |
| **IN** | `totalPrice` | number | `1400` |
| **IN** | `eggless` | boolean | Adds "(includes eggless)" note if true |
| **IN** | `customer` | string | `"Priya"` — used in greeting |
| **IN** | *(Gmail Trigger)* `from` | string | Recipient address |
| **OUT** | Email sent | — | Confirmation lands in Sent; execution ends |

This is a **terminal node** on the standard path — the execution completes here.

**Config specifics:**
- **Operation:** Reply to a message (or Send Email)
- **To:** `{{ $('Gmail Trigger').item.json.from }}`
- **Subject:** `Your Lumière order is confirmed ✓`
- **Message** (from KB §4 standard-confirmation template):
  ```
  Dear {{ $json.customer }},

  Thank you for your order with Lumière! We've got your {{ $json.size }} {{ $json.matchedFlavour }} cake noted. Your total comes to ₹{{ $json.totalPrice }}{{ $json.eggless ? ' (includes eggless)' : '' }}.

  We'll confirm your slot within 2 hours.

  Warmly,
  Lumière Bakery
  ```

Click **Test step** with a standard order flowing through.

> **What you should see:** a confirmation email in your Sent folder, addressed to the test customer, with the real flavour, size, and the KB-derived total in the body. That's a full standard order handled start to finish with no human.

> [SCREENSHOT: Gmail "Reply to a message" node output confirming the email was sent, plus the sent confirmation email showing the customer name, flavour, size, and total]

---

## Build Part 3 — The Human Gate

If1's **FALSE** branch is the careful half. The order is missing something or trips a KB rule, so a person decides before any reply goes out: **Telegram — Notify Manager** (summary + ✅/❌ buttons) → **Wait for approval** (the workflow sleeps) → **Reply to a message1** (Gmail, approved or declined).

This is Human-in-the-Loop. The manager never logs into n8n — they get a Telegram message with two buttons, and that tap is the entire interface.

---

### 3.1 — Telegram — Notify Manager

**What & why.** Sends the order to the manager's Telegram chat with a tidy summary (customer, what they asked for, why it was flagged) and two inline-keyboard buttons: **✅ Approve** and **❌ Reject**. The buttons are how the manager answers without typing anything.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: An order needs human review — it's missing details or trips one of my knowledge base rules (dietary restriction, short lead time, off-catalogue flavour, and so on). The bakery manager must approve or reject before any reply is sent. The manager uses Telegram, not n8n.
> TASK: Add a Telegram node on the If1 FALSE branch that sends the manager a message summarising the order and offering two inline keyboard buttons — Approve and Reject.
> FORMAT: Name it "Telegram — Notify Manager". Use Markdown parse mode. Inline keyboard: {"inline_keyboard":[[{"text":"✅ Approve","callback_data":"approve"},{"text":"❌ Reject","callback_data":"reject"}]]}. The summary should include the customer, the original request, and the reason it was flagged (human_gate_reason).
> CONSTRAINTS: Leave the chat_id field for me to fill with a NUMERIC chat id — the bot username will not work. Pull the customer and request from the Gmail Trigger, and the flag reason from the parsed classification.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Notes |
|---|---|---|---|
| **IN** | `human_gate_reason` | string | Why the order was flagged |
| **IN** | *(Gmail Trigger)* `from` | string | Who sent the order |
| **IN** | *(Gmail Trigger)* `text` | string | Full email body — pasted in the Telegram message |
| **OUT** | `message_id` | number | Telegram message ID (used by Wait node to route the callback) |

The node does not modify the order data — it sends a notification and passes everything through to the Wait node.

**Config specifics:**
- **Operation:** Send Message
- **Chat ID:** your numeric manager chat_id (see the box below)
- **Text:**
  ```
  🧁 *New order needs review* — from {{ $('Gmail Trigger').item.json.from }}

  {{ $('Gmail Trigger').item.json.text }}

  *Flagged because:* {{ $json.human_gate_reason }}
  ```
- **Reply Markup:** Inline Keyboard
  - Row 1 · Button 1: Text `✅ Approve` · Callback Data `approve`
  - Row 1 · Button 2: Text `❌ Reject` · Callback Data `reject`

> **Getting your chat_id (do this once).** The Telegram node needs a **numeric** chat_id — `@yourbotname` will not work. To find yours: open Telegram, send any message to your bot, then visit
> `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` in a browser. In the JSON that comes back, find `"chat":{"id": 123456789 …}` — that number is your chat_id. Paste the number (no quotes, no @) into the node.

> **What you should see:** a Telegram message on the manager's phone with the order summary and two tappable buttons. Don't tap yet — the next node has to be in place to catch the tap.

> [SCREENSHOT: Telegram chat on a phone showing the Lumière order-review message with the order details and two inline buttons, ✅ Approve and ❌ Reject]

---

### 3.2 — Wait for approval

**What & why.** The pause. After the Telegram message goes out, the workflow stops and does nothing until the manager taps a button. It doesn't time out, it doesn't cancel — it sleeps, holding the run in memory, until the button's callback wakes it.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: After the manager is notified on Telegram, the workflow must pause and wait — it should not send any reply until the manager taps Approve or Reject. This is the human-in-the-loop gate.
> TASK: Add a Wait node after the Telegram notify node, set to resume when the manager's button tap arrives.
> FORMAT: Name it "Wait for approval". Configure it to resume on the Telegram approval (resume on webhook / on a received Telegram callback).
> CONSTRAINTS: Do not set a timeout — it should wait as long as needed. The next node must be able to read which button was tapped (approve or reject).
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Notes |
|---|---|---|---|
| **IN** | all order fields + Telegram message_id | — | held in memory while paused |
| **OUT** | `callback_query.data` | string | `"approve"` or `"reject"` — set by the button tap |
| **OUT** | all IN fields | — | passed through to Reply node |

The execution is **paused here**. It resumes only when the manager taps a button — the callback delivers `callback_query.data` which the next node reads to choose the right reply.

**Config specifics:**
- **Resume:** On webhook call (n8n's "Wait for approval" / Telegram-resume option, depending on your n8n version). If you're wiring it manually, the Telegram callback resumes the run and carries `callback_query.data` (`approve` or `reject`) into the next node.
- **No timeout.**

> **What you should see:** the execution parks on this node — in Executions it shows as **Waiting**. It will sit there until a button is tapped. That paused state is the whole point: the workflow is alive, just asleep.

> [SCREENSHOT: n8n Executions list showing the workflow run in a "Waiting" state, paused on the Wait for approval node]

---

### 3.3 — Reply to a message1 (Gmail, after the decision)

**What & why.** Once the manager taps, the workflow wakes and sends the customer the right reply: the **post-approval confirmation** if they approved, or the **decline** if they rejected — both straight from the KB §4 templates.

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n workflow builder continuing the Lumière bakery automation.
> CONTEXT: The manager has tapped Approve or Reject on Telegram and the workflow has resumed. I need to email the customer the matching reply: an approval confirmation, or a polite decline. Both wordings live in my knowledge base templates.
> TASK: Add a Gmail node after the Wait node that replies to the original customer. Choose the approval template if the button was "approve", otherwise the decline template.
> FORMAT: Name it "Reply to a message1". TO = the original sender. Use the KB post-approval confirmation template for approvals and the KB decline template for rejections, both signed off as Lumière Bakery.
> CONSTRAINTS: Pick the body based on the tapped button (callback_query.data === "approve"). Reference one specific detail of the custom order in the approval message. Keep the KB voice and the "confirm your slot within 2 hours" line on approvals. Do not mention the automation.
> ```

**Variable contract — what flows in and out:**

| Direction | Field | Type | Notes |
|---|---|---|---|
| **IN** | `callback_query.data` | string | `"approve"` or `"reject"` — decides which KB template |
| **IN** | *(Code parse)* `customer` | string | For the greeting |
| **IN** | *(Gmail Trigger)* `from` | string | Recipient address |
| **OUT** | Email sent | — | Approval or decline email in Sent; execution ends |

This is a **terminal node** on the human-gate path — the execution completes here.

**Config specifics:**
- **To:** `{{ $('Gmail Trigger').item.json.from }}`
- **Subject:** `About your Lumière order`
- **Message** (branch on the tapped button, KB §4 templates):
  ```
  {{ $json.callback_query.data === 'approve'
     ? "Dear " + $('Code in JavaScript').item.json.customer + ",\n\nWonderful news — our team has reviewed your custom request and we'd love to make it. We'll confirm your slot within 2 hours.\n\nWarmly,\nLumière Bakery"
     : "Dear " + $('Code in JavaScript').item.json.customer + ",\n\nThank you for thinking of Lumière. Unfortunately we're unable to take on this particular request right now. We'd genuinely love to bake for you another time.\n\nWarmly,\nLumière Bakery" }}
  ```

> **What you should see:** tap **✅ Approve** and an approval email lands in Sent; re-run and tap **❌ Reject** and the decline email lands instead. Same node, two outcomes, decided by the human.

> [SCREENSHOT: Two sent emails side by side — the approval confirmation and the polite decline — both signed Lumière Bakery, showing the branch worked both ways]

---

## Build Part 4 — Test & Debug

You've wired the whole thing. Now prove it works on both paths, then learn the method for when it doesn't.

### Run a standard order

Send yourself (or pin — see below) this email, then **Test workflow**:

```
Subject: Cake order request
Body: Hi, I'd like to order a 2-tier vanilla sponge with buttercream frosting
for a birthday. About 20 people. Budget around ₹2,500.
Pick-up on Saturday afternoon. Thanks, Priya
```

**Expected path:** Gmail Trigger → Load KB → If (TRUE, it's an order) → Gemini (`hasAllRequired: true`, `human_gate: false`) → Code parse → If1 (TRUE) → Calculate Price (matches `vanilla_sponge`, adds the extra-tier surcharge) → Gmail auto-confirm. Every node green; a confirmation email in Sent naming the vanilla sponge and the KB total.

> [SCREENSHOT: full canvas after the standard-order run — every spine and standard-path node green, the FALSE/human-gate branch untouched]

### Run a complex order

Send (or pin) this, then **Test workflow**:

```
Subject: Custom fondant cake request
Body: Hi! I need a 3-tier fondant cake with sculpted sugar flowers,
completely dairy-free (my daughter has a severe milk allergy).
For Saturday — that's 2 days from now. Budget is flexible, around ₹3,000–₹3,500.
Can you confirm? — Meera
```

**Expected path:** … → Gemini sets `human_gate: true` (dairy-free **and** fondant **and** 3-tier **and** under 72 h — several rules fire at once) → If1 takes **FALSE** → Telegram message arrives with ✅/❌ → Wait parks the run → tap **✅** → approval email sends. Then re-run and tap **❌** to see the decline.

> [SCREENSHOT: full canvas after the complex-order run — spine green, human-gate branch green, run paused at Wait until the Telegram button is tapped]

### The 3-question debug method

Workflows break. The skill is finding the break fast. When a run fails, ask exactly three questions, in order:

> **n8n AI prompt** — paste into the ✨ AI button:
> ```
> ROLE: You are an n8n debugging assistant.
> CONTEXT: I have a workflow called "Lumière Order Triage". After a test run, one of my nodes shows a red error badge.
> TASK: Look at my latest execution and tell me (1) which node failed, (2) what input data it received, and (3) what error it returned — then suggest the single most likely fix.
> FORMAT: Answer as three bullets — Node / Received / Error — then one sentence with the fix.
> CONSTRAINTS: Do not guess. Base the answer only on the execution log. If you can't see the log, tell me which tab to open.
> ```

1. **Which node is red?** Open Executions, click the latest run, find the red node. Start there — not at the top of the workflow.
2. **What did it receive?** Click the red node → **Input** tab. Did the data from the previous node actually arrive, in the shape this node expected?
3. **What did it expect?** Read the error. The bug is almost always the gap between what arrived and what the node needed — a missing field, a string where a boolean was expected, an empty chat_id.

Fix the mismatch, re-run, confirm all green.

> [SCREENSHOT: n8n execution view with one node showing a red error badge, the Input tab open, and the error message panel visible — the three things the method asks for]

**Pin data so you're not emailing yourself every test.** Open the Gmail Trigger's output from a good run → **Pin data**. Now the trigger replays that pinned email on every run instead of polling Gmail — pin a standard order and a complex order and you can exercise both branches on demand.

---

## Make it live

Testing uses **Test workflow**, which runs once on demand. To make the bakery's inbox actually trigger the workflow on real email, you publish it:

1. Top-right of the canvas, flip the workflow from **Inactive** to **Active**.
2. The Gmail Trigger now polls the inbox every minute on its own — no clicking required.
3. Send a real order email from another address and watch it appear in Executions within a minute, flowing through the live workflow.

> **Active vs Test.** *Test workflow* fires once, now, for you. *Active* means the trigger runs continuously in the background. A workflow with a human gate should only go Active once you've confirmed the Telegram chat_id is correct and you're watching that chat — otherwise approvals will sit unanswered.

> [SCREENSHOT: n8n canvas top bar with the Active toggle switched on, plus the Executions list showing a real inbound email that triggered the live workflow]

---

## Take-home — make the KB your own

The workflow you built doesn't care that it's about cakes. The *pattern* — catch a request, load the rules, classify against them, branch to auto-handle or escalate — is the same everywhere. **What changes is the KB.** Swap Lumière's catalogue and rules for your own domain's, and the same node chain triages your work.

Take `lumiere_kb.md`, copy it, and rewrite the four sections for one of these:

| Role | The "catalogue" becomes | Escalate (human_gate) when |
|---|---|---|
| **Sales** | Product / plan pricing tiers | Enterprise account · budget > ₹10L · C-suite contact · competitor mentioned |
| **Finance** | Approved vendors + amount thresholds | Amount > ₹50K · new vendor · missing PO · currency mismatch |
| **HR** | Role bands + screening criteria | Senior hire (VP+) · counter-offer in play · internal referral · relocation required |
| **Healthcare** | Specialties + referral routing | Urgent flag · specialist out of network · paediatric patient · allergy noted |

Rewrite §1 (your catalogue/thresholds), §3 (your escalation rules), and §4 (your reply wording) for your chosen role. Point the **Load … KB**, **classifier**, and **Calculate Price / route** nodes at your file instead of Lumière's. The wiring doesn't move — only the ground truth does. That's the whole lesson: change the file, the workflow follows.

---

*Shantanu Chandra · [linkedin.com/in/chandrashantanu](https://linkedin.com/in/chandrashantanu)*
