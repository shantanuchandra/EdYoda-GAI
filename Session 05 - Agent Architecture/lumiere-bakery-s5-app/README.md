# Lumière — Session 5 Agent Architecture Demo

**Companion app for EdYoda · Generative AI for Non-Coders · Session 5 — Agent Architecture.**

Two agents in one floating chatbot:

| Mode | What it does | S2 gaps it closes |
|---|---|---|
| **Order Assistant** | Customer-facing. Takes a cake order end to end: reads the rules, confirms lead time, applies branch coupons, books a slot, sends a templated confirmation. Refuses out-of-zone delivery, late orders, unknown flavours. | #3 Tools + #4 Autonomy |
| **Regulation Monitor** | Operations. Polls FSSAI (simulated) on a 60-second auto-timer or manual trigger. Auto-applies cosmetic rules; escalates anything about allergens, ingredients, or safety to a human. Remembers what it's seen across reloads. | #1 Memory + #5 Planning |

## One-time setup

1. Install Ollama from **ollama.com/download**
2. Pull the model: `ollama pull qwen2.5:3b-instruct`
3. (Optional — Ollama usually starts automatically) `ollama serve`

## Running the demo

- **Mac/Linux:** double-click `start.command`
- **Windows:** double-click `start.bat`

The launcher will: verify Ollama, free port 8000 if busy, start a local server, and open your browser. The model dropdown auto-picks the smallest installed chat model. The Lumière KB is fetched from the parent folder.

## Live demo script — 6 moves

> Each move is one beat on the projector. Pause for the room to react before the next.

### Move 1 — Show the website (Block 0)
- Open the app, show the Lumière site, the two agent cards, the three branches each with their own coupon code.
- Click the chat bubble. Welcome message appears explaining the two modes.

### Move 2 — Order Assistant: clean happy path (Exercise B, Order tools)
- Stay in **Order Assistant** mode (default).
- Click the chip: *"I need a 1kg eggless chocolate cake for Saturday at Andheri"*.
- Watch the bot walk the loop. Open the **Agent steps** trace under the reply.
- Point at each line: PERCEIVE → REASON → TOOL (`orderRulesReader`, `weatherTool`, `meltWindowCalc`, `slotBooker`, `confirmationSender`).
- *"Five tools. Each one narrow. The agent didn't decide the lead-time rule — it called a tool that read the rule from the document. That's the difference between an agent and a chatbot pretending to be one."*

### Move 3 — Order Assistant: the refusal (Make It Refuse callback)
- Click the chip: *"I want a same-day chocolate cake at Powai"*.
- Watch it refuse cleanly with the actual lead-time numbers (`required 48h, have 6h`).
- Click the chip: *"Cake for delivery to Gurgaon"*.
- Watch it refuse with the delivery-zones rule. **No invention.**
- *"That refusal isn't a failure mode — it's the point. The agent looked, found the rule, and quoted it. Compare to the S2 Screener that invented LinkedIn URLs because nobody narrowed its scope."*

### Move 4 — Monitor: the empty-log first run (Episodic Memory)
- Switch to **Regulation Monitor** mode in the chat header.
- Show the Admin tab's **Regulation Monitor · live** panel on the right.
- Click **Check now** (or use the chip in chat).
- The bot processes the full FSSAI rule pool: ~3–5 auto-applied (cosmetic), 3–4 escalated (allergen/ingredient/safety).
- Open the Agent steps trace. Walk the bucketing.
- Show the **Escalation Feed** in the admin panel. Red ESCALATED chips, green AUTO-APPLIED chips.

### Move 5 — Monitor: re-run (the memory does its job)
- Click **Check now** again.
- Bot replies: *"Checked FSSAI — no new rules since last run."*
- *"That second run isn't impressive — it's the lesson. The agent saw nothing new because the **Seen-Rules Log** remembered every ID. Without that one tool, this bot would re-alert your operations team every 60 seconds, every night, forever. That's S2 Gap #1 (Memory) made into code."*

### Move 6 — The escalation rule, in plain English (Risk bucketing)
- In chat, type: *"How do you decide what to escalate?"*
- Bot explains: cosmetic auto-applies, allergen/ingredient/safety always escalate, and **the agent never invents a bucket** — the human pre-defined them.
- *"The single hardest thing to get right with autonomous agents: who decides the risk threshold? Answer: the human, up front. The agent only sorts. The day the agent starts deciding which allergen rule is 'minor enough to skip' is the day a child eats a hazelnut they shouldn't have."*

### (Optional) Move 7 — Reset the log, watch it re-process
- Click **Reset Seen-Rules Log** in the admin panel.
- Click **Check now**.
- Same rules come back as new. *"Memory matters. Wipe the log, the agent has no past."*

## File layout

```
lumiere-bakery-s5-app/
├── index.html       ← the whole app
├── start.command    ← Mac/Linux launcher
├── start.bat        ← Windows launcher
└── README.md        ← this file

../Lumiere_KB.md     ← v2 with branch coupons (used by Order Assistant)
```

## What's intentionally NOT in this demo

- **No cloud APIs.** Local Ollama only. Show your laptop, not your wallet.
- **No real FSSAI feed.** Eight hardcoded sample rules — mix of cosmetic / allergen / ingredient / safety. The teaching is the bucketing, not the integration.
- **No real slot booking.** `slotBooker` returns a fake `LUM-2026-…` ID. Real production would write to a calendar.
- **No real WhatsApp send.** `confirmationSender` returns the templated string only — surfaced in the chat bubble.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "no connection — is Ollama running?" | Open a terminal: `ollama serve`. Click **Re-test** in Admin. |
| Chat answers slowly | The dropdown defaults to the smallest chat model. If you have only large models, expect 10–30 s/reply on CPU. |
| "Couldn't fetch Lumiere_KB.md" | You double-clicked the HTML instead of using the launcher. Close the tab and use `start.command`. |
| Seen-Rules Log doesn't persist | Browser is in private/incognito mode (localStorage is sandboxed). Use a normal window. |
| Auto-run timer not firing | Check the `auto-run every 60s` checkbox in the admin panel. The countdown shows the seconds until the next run. |

## What this maps to in the workbook

- **Exercise A (Loop Trace)** — every Agent steps panel under every reply is a live 6-stage trace. Pause on any one of them and you can name PERCEIVE / REASON / TOOL / OBSERVE / REFLECT / FINAL.
- **Exercise B Part 1 (Order Assistant)** — the five tools listed in the Admin panel are exactly the five tools learners draft in their manifest. The `slotBooker` (write), `confirmationSender` (send), `weatherTool` + `meltWindowCalc` (read+compute), `orderRulesReader` (read) — RCTFC by code.
- **Exercise B Part 2 (FSSAI Monitor)** — the five tools, the two triggers (auto + manual), the risk bucketing, and the Seen-Rules Log (the "memory tool you must not skip") are all here.
- **Exercise C (Pattern Choice)** — two specialised agents sharing one chat, each with their own tools and memory, never coordinating directly. This is the simplest **Orchestrator / Specialist** pattern made minimal.

---

**Written & maintained by Shantanu Chandra · linkedin.com/in/chandrashantanu**
*EdYoda · GenAI & AI Agents for Non-Coders · S05*
