# Facilitator Script — Why Agents? The Case for Autonomous AI (Session 2 of 8)
**Subtitle:** *By the end of this session, you'll identify chatbot gaps, classify business problems into AI patterns, quantify the cost of under-investing in agentic AI — and you'll build your first agent (no code).*
**Duration:** 120 minutes · **Format:** Live virtual (Zoom/Meet) · **Audience:** Same room as Session 1 — mixed India + international; marketing/sales, finance/consulting, at least one doctor.
**Spine:** Concept Sprint → Long Build → Pattern Debrief
**Hands-on share:** ~58% (≈70 min of learner activity — build + mini-exercise + reflection).
**Build artifact:** Every learner walks out with a working **AI Pattern Advisor** agent, role-customized (Marketing/Sales · Finance/Consulting · Doctor/Healthcare · Generic).
**Tools assumed available:** EdYoda Agent Builder (primary build platform), n8n (orchestration, referenced for multi-step / cross-tool workflows), ChatGPT / Claude / Gemini (open as comparison points), one pre-built EdYoda demo agent, one pre-built backup agent per track in the facilitator account.

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] Send a 1-line email to all learners: *"Tomorrow, log into your EdYoda Agent Builder account (free tier is fine) and keep ChatGPT open in a second tab. We're building your first agent — no code. See you at [time]."* Include the calendar link.
- [ ] Send the **Session 2 Learner Workbook** as a Google Doc (view-only). Confirm the link is in the calendar invite and the day-of email.
- [ ] In **EdYoda Agent Builder**, pre-build the demo agent you'll use in Sprint 2 (the Agent Loop trace-log demo) and Build Step E (multi-step goal demo). Then pre-build ONE backup agent **per track** — Marketing/Sales, Finance/Consulting, Doctor/Healthcare, Generic — ready to clone into a learner's account if they're stuck after the break.
- [ ] Confirm n8n is reachable from your account (referenced in Sprint 6 as the orchestration layer; not required for the in-class build, but a stuck demo here costs trust).
- [ ] Pre-load 4 browser tabs on your machine:
  1. **EdYoda Agent Builder** — logged in, demo agent open, backup agents one click away
  2. **ChatGPT** — logged in, ready to re-run the Bakery Campaign prompt from Session 1
  3. **Claude.ai** — logged in, backup
  4. **Gemini** — logged in, backup
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] **Cohort note (this run):** 10 learners enrolled, ~6 expected (Session 1 attendance pattern). With this size you can call on **every** learner by name; chat will be quiet, that's fine — go verbal whenever you'd normally read chat aloud. If the cohort grows (or all 10 show), see the small/large-cohort note in the Contingency Guide.
- [ ] Have water, a printed copy of this script, and a visible timer.

---

## Opening Hook Slide (have this up 5 min before class starts)

> **"Last session you watched a chatbot fail 4 out of 6 steps. Today you build the thing that doesn't."**

Play soft instrumental music until you start. Welcoming, not awkward silence.

---

# THE 120-MINUTE RUN SHEET

Each block has: **what you say (italics)**, **what you do**, **what learners do**, and **timing guard**.

---

## BLOCK 0 — OPENING (0:00 – 0:10)
**Goal:** Re-establish the room. Anchor in Session 1's promise. Set the build expectation.
**Deck mapping:** Block 0 is 5 paired slots — 1 (pre-start hook, up before class) · 2 (one-word check-in) · 3 (croissant + Promise) · 4 (norms + roadmap) · 5 (The One Rule). Every chat-prompt moment has a learner-side visual; you do not narrate against a stale slide.

### 0:00 – 0:02 — Cold Open · one-word check-in *(Deck slide 2)*

*"Welcome back, everyone. Before I say anything else — quick one in the chat. **In one word, how did Session 1 land for you?** Useful? Overwhelming? Surprising? Sticky? Just one word. Type it in."*

→ The learner deck shows the prompt + word-chip examples on its own slide 2 — off-camera learners can see exactly what's being asked.

→ Wait 30 seconds. Read **every response** out loud, **by name**. With this room size, everyone gets that moment.

*"Thank you Priya, thank you Rajesh, thank you Anita, thank you Daniel… 'sticky', 'useful', 'a lot' — I'll take it. That's exactly the right baseline for today."*

> **Why this works:** Same opener-shape as Session 1 — learners who type in the first 90 seconds stay engaged. Re-using the cold-open ritual signals continuity: we're picking up where we left off, not starting over.

### 0:02 – 0:06 — Session 1 Callback + The Promise *(Deck slide 3)*

→ Advance to slide 3. The croissant chat-prompt is at the top of the learner slide; the Promise card is below it.

*"Quick one. **Hands up in the chat — type 🥐 — if you remember the bakery campaign demo from the end of last session.** The one where I asked ChatGPT to plan a bakery launch and it failed on 4 of the 6 steps."*

→ Wait. Croissants will come. Read 3–4 names. *"Good, you remember. Hold that scene in your head — that's the problem we're solving today. A chatbot couldn't do the job. We're going to figure out why, and we're going to build the thing that can."*

→ Now deliver The Promise (~2 min). The learner slide lists what they walk out with — point at it as you read:

*"Here's what you're walking out with today. The **five gaps** every chatbot has — named, numbered, severity-ranked. The **four-question funnel** that tells you when to use a chatbot, a RAG system, an agent, or a multi-agent system. The **real business cost** of staying on chatbots. And a working **AI Pattern Advisor** agent on your screen — yours, role-customized, no code. This is **session 2 of 8** in the course — the case for autonomous AI. Session 3 takes you to the next layer: **Prompt Engineering & Context Engineering for Agents**, so your agents are reliable."*

→ Pause. Let it land.

### 0:06 – 0:09 — Norms + Roadmap *(Deck slide 4)*

→ Advance to slide 4. The 6-norm grid + the one-arrow flow (Concepts → Build → Debrief → Done) is on the learner side.

Walk the norms briskly (~60 sec):

| Norm | What it means |
|---|---|
| **Cameras** | Encouraged but optional. I will not call out off-camera folks. |
| **Chat** | Use it freely — questions, reactions, even jokes. Welcome. |
| **Mics** | Stay muted unless I call on you or you want to share. |
| **Break** | A real 10-minute break partway through. Promise. (Same as last time.) |
| **Stuck questions** | Ask live. With this room size everyone gets airtime. If a question needs a longer answer than fits, I'll DM or reply by email after class. |
| **NEW for today** | You will spend **more time in the Builder than watching me.** That's by design. Bring your hands. |

Then pivot to the Roadmap (~90 sec):

*"Four moves today. We start with a fast concept sprint — six ideas in twenty minutes. Then we build. The thing you're building is called the **AI Pattern Advisor** — an agent that takes any business problem you describe and tells you which AI pattern fits: chatbot, RAG, agent, or multi-agent. Same skeleton for everyone, role-customized to your work — there's a track for marketing and sales, one for finance and consulting, one for healthcare, and a generic track. You pick yours when we get there. Then we debrief — we look at what you built through four lenses, so the frameworks actually stick. Then we close."*

### 0:09 – 0:10 — The One Rule *(Deck slide 5)*

→ Advance to slide 5 — a single-line editorial slide. Pause 2 seconds before delivering.

*"One rule for today."*

→ Then, slowly, even cadence:

*"**You will not leave with notes. You will leave with a working agent.**"*

→ Pause 2 seconds. Don't fill the silence. The learner slide is one pull-quote — let it sit.

> ⏱ **Time check: 0:10.** If you're at 0:12, cut one of the cold-open readouts next time. Never cut The One Rule — it's the contract for the session.

---

## BLOCK 1 — CONCEPT SPRINT (0:10 – 0:30)
**Goal:** Plant the vocabulary fast. Six ideas in twenty minutes. Each sprint = one visceral demo or visual + one analogy line. Not mastery — **recognition.** You're loading the words they'll need during the build: *Gap, Loop, Maturity, Funnel, Cost, Pattern.*

**Pacing rule:** 3 minutes per topic. ~60s setup → ~90s demo/visual → ~30s analogy. If a sprint runs long, cut the analogy, not the demo.

*"Six ideas. Twenty minutes. I'm going to move fast — your job is to recognize, not memorize. Every one of these comes back during the build. Ready?"*

### 0:10 – 0:13 — Sprint 1: The 5 Gaps That Agents Close (USE REFERENCE SLIDE 6)

*"Let's start where we ended last time. The bakery campaign. I'm going to run it again — live — and this time, we're going to name exactly what's missing."*

→ Switch to **ChatGPT tab**. Paste the **same bakery campaign prompt from Session 1** (have it copied in your clipboard). The 6-step ask. Same model.

→ Let it run. Same failure pattern: it drafts copy, but can't research, can't remember Sneha, can't schedule, can't set a reminder, can't run the whole thing end-to-end.

*"Watch what it can't do. Now look at slide 6 — the matrix overlays right onto the failure. Read it in severity order — that's how the learner deck shows it, and that's the numbering we'll use every time we close one during the build."*

| # | The Gap | What ChatGPT couldn't do | Severity |
|---|---|---|---|
| **#1** | **Memory** | Remember "my partner is Sneha" across sessions | **Critical** |
| **#2** | **Multi-step reasoning** | Run all 6 steps in one go | **Critical** |
| **#3** | **Tools** — no live web | "Research what's trending this month" | **High** |
| **#4** | **Autonomy** — won't act without you typing | "Schedule across the next week" | **High** |
| **#5** | **Planning** — no time horizon | "Set a 30-day reminder" | **Medium** |

*"Five gaps. Memory. Multi-step. Tools. Autonomy. Planning. Two Critical, two High, one Medium. These are the five things a chatbot can't do — and the five things an agent fixes. Hold onto the numbers — we'll close Gap #3 in Step A, #4 in Step C, #1 in Step D, and #2 + #5 together in Step E."*

**Analogy (memorize):** *"A chatbot is a smart intern who forgets you between conversations, can't open any apps, and won't do anything without you typing the next instruction. An agent fixes all five."*

### 0:13 – 0:16 — Sprint 2: The Agent Loop — Goal → Plan → Act → Observe → Reflect → Iterate (USE REFERENCE SLIDE 7)

*"If you only remember one thing from today's concepts, remember this loop. Six steps. This is the heartbeat of every agent you'll ever build."*

→ Show slide 7: two side-by-side diagrams. **Left:** Chatbot loop — *Prompt → Response → dead end.* **Right:** Agent loop — *Goal → Plan → Act → Observe → Reflect → Iterate*, with an arrow looping back until the goal is complete.

*"Chatbot on the left — one prompt, one response, nothing happens next. Agent on the right — six steps, and it keeps going until the job is done. Let me walk you through a real example."*

→ Click to the worked-example card: **"Weekly Sales Summary, Fridays 9am."**

- **Goal:** Prepare a weekly sales performance summary, send it every Friday at 9am.
- **Plan:** (1) Fetch CRM data, (2) Aggregate KPIs, (3) Generate report, (4) Schedule send.
- **Act:** Fetch. Compute. Draft. Schedule.
- **Observe:** Check delivery status. Track opens. Monitor feedback.
- **Reflect:** Evaluate success. Identify issues. Note improvements.
- **Iterate:** Adjust parameters. Optimize timing. Refine content.

→ Switch to **EdYoda Agent Builder**. Open the **pre-built demo agent's trace log** on a tiny goal you ran before class.

→ Walk through the trace, **pausing on each of the 6 steps as the agent executes.** *"Goal — there. Plan — there. Act — there. Observe — see the agent reading its own output? Reflect — that's the agent deciding whether it's done. Iterate — back to the top."*

**Analogy (memorize):** *"A chatbot is a vending machine — one coin, one snack, no follow-up. An agent is a **project manager** — you give it a goal, they plan steps, execute, check results, and adjust."*

### 0:16 – 0:19 — Sprint 3: The Agent Maturity Model — L0 → L1 → L2 → L3 (USE REFERENCE SLIDE 8)

*"Not every agent is an agent. There's a ladder. Four rungs. Where you sit on this ladder determines what's possible."*

→ Show slide 8: maturity ladder with progress bars. Walk down the rungs, **20 seconds each.**

| Level | Name | What it does | Example | Bar |
|---|---|---|---|---|
| **L0** | Chatbot | Single turn. No memory. No tools. | FAQ bot on a website | 25% |
| **L1** | Copilot | Tool-use + retrieval. Assists humans. | GitHub Copilot · Sales email assistant | 50% |
| **L2** | Agent | Planning + memory + multi-step execution. | Recruitment screening agent | 75% |
| **L3** | Multi-Agent | Multiple specialists, orchestrator coordinates. | End-to-end market research pipeline | 100% |

**Key insight — deliver verbatim:** *"Most enterprises are at Level 0–1 today. The competitive advantage is in moving to Level 2–3."*

**Analogy:** *"Like the self-driving levels. L0 = you driving. L1 = lane assist. L2 = car drives on the highway while you supervise. L3 = car drives across the city."*

→ Paste in chat:
> **THOUGHT CHALLENGE:** Where does your organization sit on this model today? Type **L0, L1, L2, or L3** in chat.

→ Wait 30 seconds. Read **every answer** aloud, **by name.** *"Priya says L1. Rajesh says L0. Anita says L2 in pockets. Honest answers. By the end of today, you'll all be running an L2 yourself."*

### 0:19 – 0:22 — Sprint 4: The 4-Question Funnel (USE REFERENCE SLIDE 9)

*"Now the most useful slide of the day. When a problem lands on your desk, how do you know whether it's a chatbot, a RAG, an agent, or a multi-agent system? You ask four questions. In order."*

→ Show slide 9: four stacked numbered question cards. Read each aloud as you click down the funnel.

1. **Does the answer exist in a fixed document or database?** → **YES = RAG.** No = continue.
2. **Does the task need a single response with no follow-up action?** → **YES = Chatbot.** No = continue.
3. **Does the task require multiple steps, memory, or tool use?** → **YES = Agent.** No = continue.
4. **Does the task require multiple specialized capabilities working in parallel?** → **YES = Multi-Agent.**

*"Pattern comparison, right side of the slide: RAG = document retrieval. Chatbot = single response. Agent = multi-step. Multi-Agent = parallel execution. Four patterns. Four questions. That's the whole framework."*

→ Paste in chat:
> **MINI-EXERCISE (2 min):** I'll read 4 scenarios. For each, type the pattern in chat — **R / C / A / M**.

→ Read each aloud. Wait ~15 sec between for chat. Call out the winning answer **by name**.

1. *"Answer customer questions about return policy."* → **R** (RAG — fixed knowledge.)
2. *"Generate a one-time product description."* → **C** (Chatbot — single response.)
3. *"Screen 200 resumes and schedule interviews."* → **A** (Agent — multi-step + tools.)
4. *"Run a competitive intelligence report."* → **M** (Multi-Agent — parallel specialties.)

**Key insight — deliver verbatim:** *"Pattern matching success rate when teams use this discipline: **95%.** That's why we're spending three minutes on it."*

**Analogy:** *"Don't bring a chainsaw to butter your toast. Match the tool to the job."*

### 0:22 – 0:25 — Sprint 5: The Real Business Cost of NOT Using Agents (USE REFERENCE SLIDE 10)

*"Why does any of this matter on a Monday morning? Because there's a number attached to staying on chatbots. Three failure scenarios. Real money."*

→ Show slide 10: three failure-scenario cards.

- **Missed Context** — *Customer Support.* Agent gives wrong advice because it has no memory of prior interactions. **+15% customer churn · $50K–100K revenue loss. Severity: HIGH.**
- **No Follow-Through** — *Sales.* Chatbot drafts the proposal but can't send it, can't track it. **-30% deal velocity · $25K–50K loss. Severity: MEDIUM.**
- **Zero Persistence** — *Data Management.* Session times out, all context is lost. **Compliance risk · $100K+ loss. Severity: CRITICAL.**

→ Click to the headline stat strip. Read these **slowly, with eye contact** — no rushing.

- **73%** of enterprises report chatbot limitations.
- **$2.4M** average annual cost of manual workflows.
- **4.2 hours** saved per workflow with agentic AI.
- **Total estimated cost of not using agents: $175K–$250K per year** for a mid-size enterprise.
- **ROI: 2.4x.** Implementation: 3–6 months. Time saved: **45%.** Error reduction: **78%.**

*"Read those numbers again on your own time. The point isn't the exact dollar — it's that the cost of NOT moving is now larger than the cost of moving. That math flipped this year."*

**Analogy:** *"Using only chatbots in 2026 is like using a calculator in a spreadsheet world — it works, but you're doing the integration in your head."*

### 0:25 – 0:30 — Sprint 6: The 5 Agentic Architecture Patterns (USE REFERENCE SLIDE 11)

*"Last sprint. Five patterns. These are the shapes every agent system takes. Twenty seconds each — recognize, don't memorize."*

→ Show slide 11: 3×2 grid of five pattern cards.

- **Single Agent** — *Self-contained.* Sequential task, no parallel work. **Example: Email drafting agent.** *(This is what you're building today.)*
- **RAG Agent** — *Document-based.* Task needs grounding in your documents. **Example: Support FAQ bot.**
- **Tool-Calling Agent** — *API integration.* Task reads from or writes to external systems. **Example: CRM data sync.**
- **Orchestrator-Worker** — *Multi-agent.* Parallel workstreams, different expertise. **Example: Market research pipeline.**
- **Human-in-the-Loop** — *High-stakes.* Regulated or irreversible actions. **Example: Financial approvals.**

*"Today's build is a **Single Agent** with tool-calling and an embedded decision-logic system prompt — the foundation pattern. The other four are extensions of this one. Once you can build this, the rest is configuration."*

**Bridge to Session 3 — deliver verbatim:** *"Now that you can identify patterns, the next layer is mastering the language of agent communication — **Prompt Engineering.** That's Session 3."*

**Analogy:** *"Patterns are recipes. You're learning the base recipe — sandwich. Once you can make a sandwich, you can make a burger, a wrap, a bento box."*

### 0:28 – 0:30 — Sprint Close: Bridge to Build

*"Six sprints. Let me say them back to you. The five **gaps.** The six-step **loop.** The four-rung **ladder.** The four-question **funnel.** The business **cost.** The five **patterns.** That's the vocabulary for the rest of today — and honestly, for the rest of the year."*

→ Pause. Let it land. Then drop the energy and pivot.

*"Now stop watching me. Open EdYoda Agent Builder — link in the chat right now. We're building yours."*

→ Paste in chat:
> **🛠 EdYoda Agent Builder:** [paste your EdYoda Agent Builder link here]
> Open it now. Log in. We start the build at the top of the next minute.

→ Watch chat. Confirm 60-70% of cameras/names show movement. If 3+ learners are stuck on login, take 60 seconds to address it room-wide: *"If you're stuck on login, drop the exact error in chat — I'll handle the common ones now and the rest during the break."* Then move on. Do not pause the room for a single learner.

> ⏱ **Time check: 0:30.** If you're at 0:32, cut the Sprint 4 mini-exercise next time — move the R/C/A/M to the workbook only.

---

## BLOCK 2 — BUILD PART 1: SKELETON AGENT (0:30 – 0:55)
**Goal:** Every learner ends this block with a **running, role-customized AI Pattern Advisor agent** on their own screen — system prompt + one tool + one successful run. No spectators. If a learner walks into the break without an agent that ran, the second hour breaks.

**Facilitator stance:** Build alongside on shared screen. Sparse narration only. Your job is to set the pace, not to teach — the workbook is teaching. Watch chat like a hawk. **You are flying solo on this session — no TA.** The workbook has been hardened to support self-recovery (per-track troubleshooting tables on every track page, plus generic troubleshooting on pages 8–11). Push learners to those first; intervene directly only when they're truly stuck.

### 0:30 – 0:34 — EdYoda Builder Walkthrough (USE REFERENCE SLIDE 12)

→ Share screen on **EdYoda Agent Builder.** Have your pre-built **Bakery Launch Agent** open as the demo. Show slide 12 in a corner if your setup allows, or talk to the builder UI directly.

*"Before you touch anything — sixty seconds each on the four places you'll spend time today, and one button. Watch where I click."*

→ Walk the four tabs + the publish button, **~60 seconds each.** Point with your cursor. Don't click anything yet.

- **Tab 1 — Overview.** *"This is the agent's identity. Name, Description — which is the agent's role — Welcome Message, and one toggle for whether learners can attach files in chat. You write the Description once when you create the agent; you'll come back here only to tweak the welcome line."*
- **Tab 2 — Configure → No-Code.** *"This is the load-bearing one. You're going to build a pipeline of nodes — each node is a small LLM brain with one job, and its output feeds the next. Today you'll build five nodes."* Open your published Bakery Agent's Configure tab. Scroll the five nodes briefly: Trend Scout, Audience Profiler, Campaign Planner, Reminder Drafter, Summary Composer. *"Five nodes. One prompt from the user. Five small jobs done in order."*
- **Tab 3 — RAG Docs.** *"This is how you give your agent memory. You upload a doc — your company, your context, your stack — and the agent retrieves from it on every run. There is no separate Memory toggle on this platform. The doc IS the memory."*
- **Tab 4 — Logs.** *"After you publish, every run shows up here. You don't need it during the build, but it's where you'll go this week when you want to know what your agent actually did."*
- **The button — Share Config (top right).** *"When you publish, this gives you a public chat URL. That's how learners or colleagues actually use your agent. It's also our recovery plan today — if your account breaks, I'll share the URL of my Bakery Agent and you ride along while we fix yours."*

*"Four places, one button. No code. Now stop watching me — your turn."*

### 0:34 – 0:38 — Pick Your Track (USE REFERENCE SLIDE 13)

→ Show slide 13. Paste in chat:

> **PICK YOUR TRACK — type the number in chat:**
> 1. **Marketing/Sales** — AI Pattern Advisor for marketing/sales workflows
> 2. **Finance/Consulting** — AI Pattern Advisor for finance workflows
> 3. **Doctor/Healthcare** — AI Pattern Advisor for clinical workflows
> 4. **Generic** — AI Pattern Advisor for general knowledge-work workflows

*"Pick the one closest to your day job. If two fit, pick the one you'd use this week. Once you've picked, open the workbook to your track's page — pages 4 through 7. Each track has a copy-paste-ready system prompt to start with."*

→ Wait 30 seconds. Read the picks **by name and track**. With a small cohort, name every learner.

*"Daniel — healthcare, workbook page 6. Priya — marketing, page 4. Rajesh — finance, page 5. Anita — generic, page 7. Vikram — marketing, page 4. Sneha — finance, page 5. Everyone builds the same shape; the words just differ."* *(Adjust names + tracks to what actually shows up.)*

> **Why pre-written prompts:** This is a no-code class. Spending 15 minutes crafting a system prompt loses the room. The workbook prompts are deliberate — they encode the 4-question funnel as decision logic, and they're good enough to ship. Learners customize *language* during Block 4, not structure.

### 0:38 – 0:48 — BUILD STEP A: Create the agent + Node 1 (10 min hands-on)

→ Paste in chat:

> **🛠 BUILD STEP A (10 min):**
> 1. Agents list → click **+ New**.
> 2. Fill the modal:
>    • Agent Name: `[YourName]'s AI Pattern Advisor — [Track]`
>    • Description: paste the role line from your workbook page (4–7)
>    • Welcome Message: paste the welcome line from your workbook page
>    • Framework: `anthropic`
> 3. Click **Create Agent → Confirm & Create.**
> 4. On the agent page, open **Configure → No-Code.**
> 5. Node 1: Name = `Web Search Tool Agent` · Model = Claude Sonnet 4.6 · Max Tokens = 1024 · System Prompt = paste Node 1 from your workbook page.
> 6. **Stop here.** Do not click Proceed yet — we run Step B before adding more nodes.

→ Press **0** in the presenter cockpit to start the visible **10-minute exercise timer.**

→ Build alongside on your screen. Sparse narration only — every 90 seconds or so:

- *"I'm pasting the marketing-track Node 1 prompt. Notice it explicitly says 'use web search' — that's what triggers the real web tool."*
- *"One node so far. Just research. We'll add four more by Step E — that's how we get to the full AI Pattern Advisor."*
- *"Naming the node `Web Search Tool Agent` — that name shows up in the trace log, so use something you'll recognise."*

→ Watch chat. Common stumbles and your one-line fixes:

| Stumble | Fix |
|---|---|
| *"Where's the No-Code mode?"* | *"Configure tab, then click the **No-Code** chip next to Code."* |
| *"My paste came in weird — formatted"* | *"Paste as plain text — **Cmd+Shift+V** on Mac, **Ctrl+Shift+V** on Windows."* |
| *"Login / account issue"* | First reply in chat: *"Try logging out and back in, then refresh."* If still stuck in 60s, tell them: *"Follow along on my shared screen for now — I'll share my Bakery Agent's public chat URL so you can experiment in parallel. I'll fix your login at the break."* Don't stop the room. |
| *"Which page in the workbook?"* | *"Marketing 4, Finance 5, Healthcare 6, Generic 7."* |

→ Concept callout when ~80% of chat shows "saved" or thumbs (anchor to Sprint 1, Gap #3):

*"Pause for one beat. Look at what you just built. One node, with web search instructed in the prompt. Your agent can now read the live internet — ChatGPT free tier can't. You just closed **Gap #3 — Tools.** First High-severity gap from Sprint 1, done. Feel the difference. Keep going."*

→ At 8 minutes, two-minute warning: *"Two minutes. If your Node 1 isn't saved, raise a hand in chat — I'll jump in. If you've checked the troubleshooting on your track page and you're still stuck, that's the moment to flag it."*

### 0:48 – 0:54 — BUILD STEP B: First Run (6 min hands-on)

→ Paste in chat:

> **🛠 BUILD STEP B (6 min):**
> 1. Configure → No-Code → click **Proceed (Generate Code).**
> 2. Click **Publish Agent** (top right).
> 3. Copy the **public chat URL** from Share Config. Open it in a new tab.
> 4. Paste your track's **starter problem** (workbook page 4–7) into the chat input. Hit send.
> 5. Watch Node 1 fire: web search → structured research output (problem restated, current practice, tools, sources).
> 6. Paste in chat: the **HEADLINE INSIGHT line** from your Node 1 output.

→ Press **6** in the presenter cockpit to start the visible **6-minute exercise timer.** Run yours alongside on shared screen — pick the marketing starter problem so the largest sub-group sees their flow.

→ Narrate as your trace fires:

*"Goal received — that's Node 1 firing. Web search call going out. Results coming back. Node 1 producing structured research output — problem restated, current practice, tools named, case, sources. That's one node of the agent loop, running in front of you."*

→ Important framing for the room (deliver before learners run):

*"Heads up — Node 1 only researches. It does NOT classify yet. The classifier is Node 2, which we add after the break. So when you run this, you should see structured research, not a pattern recommendation. If you're confused that your agent didn't say 'Agent' or 'RAG' — that's not a bug. It's because we haven't built that node yet."*

→ As headline insights land in chat, read **every one by name.**

*"Priya — found three Mumbai cafés already using AI for lead qualification. Rajesh — found a SOX-automation case study from a Big Four firm. Anita — found a Notion-based status-update playbook from Coda's team. Daniel — found NHS handover-summary pilots at Imperial."*

→ Concept callout (anchor to Sprint 2 — the loop):

*"Look at what just happened on your screen. You gave it a goal — classify this business problem. It made a plan. It acted — called Web Search. It observed the results. It reflected. It output the answer. **That's the six-step loop you saw in Sprint 2 — running on your agent. Right now. On your screen.** Not a slide. Yours."*

> **70% rule:** If 70% of the chat has posted a pattern, move on. Do not wait for 100% — the stragglers will catch up over the break when you can clone backup agents into stuck accounts. Holding the room for the last 1–2 learners burns the energy of the other 4–5.

### 0:54 – 0:55 — Pre-Break Anchor (1 min)

→ Paste in chat:

> **👍 in chat if you have a running agent on screen right now.**

→ Wait 30 seconds. Count thumbs against your roster.

- **If ≥80% thumbs:** *"Beautiful. Break time. Real ten minutes. Come back ready to add Node 2 and grow the pipeline."*
- **If <80% thumbs:** *"If you're stuck, stay two minutes into the break — I'll fix it with you. Grab my Bakery Agent's chat URL from the pinned message and ride along while we fix yours. Everyone else — real ten-minute break starts now. Cameras off, get up, water."*

> ⏱ **Time check: 0:55.** Honor the break. Do not start Block 3 early even if everyone's ready — the rest is the work.

---

## 🟢 HARD BREAK (0:55 – 1:05) — 10 MINUTES, NON-NEGOTIABLE

*"Real ten-minute break. Cameras off. Get up. Stretch. Water. We come back at [actual clock time]. I'll start sharp."*

→ Put a slide up: **"Back at [time]. Music playing."** Play music. Mute yourself.

→ **Use the break to work, not rest:** DM stragglers, walk them through Proceed (Generate Code) + Publish if their published URL isn't returning real output. If their account is genuinely broken, share your published Bakery Agent's chat URL so they can experiment with the platform while you help them rebuild Node 1 in the background. If two or more learners are stuck on the same issue, plan a 30-second mention at the top of Block 3 so everyone benefits from the answer.

→ Come back at minute 8 of the break, sip water, prepare slide 17 (build checkpoint) for the Block 3 open.

> **Why non-negotiable:** Same Bailenson Zoom-fatigue research as Session 1 — screen fatigue compounds non-linearly after 50 minutes. Skipping this break costs you the second hour, which is the harder hour (Node 2 + RAG Docs + Nodes 3-5 + pattern debrief). The break is not a courtesy. It's the design.

---

## BLOCK 3 — BUILD PART 2: PIPELINE COMPLETION (1:05 – 1:35)
**Goal:** Grow the pipeline from one node to five, swap the agent's generic memory for grounded RAG context, and publish a live agent that ships a full structured brief on one prompt. By the end of this block, every learner has a working L2 agent at a public URL.

**Facilitator stance:** The published chat URL is the star of this block. Every checkpoint, point at it. Sparse narration, dense doing. Three unlocks back-to-back — let each one land before pushing the next.

### 1:05 – 1:08 — Welcome Back + Frame (3 min)

→ Paste in chat:

> **🚀 in chat if you're back at your desk.**

→ Wait 15 seconds. Don't wait longer — momentum.

*"Before the break your pipeline had one node — research. It searches the web, returns structured findings. Now we grow it. Three moves — add Node 2 to classify, upload a RAG doc to ground the agent in your real context, then add Nodes 3, 4, 5 to compose a full brief. After each one, you'll feel an unlock."*

→ Show **slide 17 — the build checkpoint visual.** Keep this visible in a corner for the entire block.

| Step | Status |
|---|---|
| Node 1 (Web Search Tool Agent) · published & running | ✅ Done |
| Add Node 2 — the Pattern Classifier | ⏳ Next |
| Upload a RAG Doc with your real context | ⏳ Then |
| Add Nodes 3, 4, 5 · Proceed · Republish | ⏳ Then |

*"Three checkpoints. Thirty minutes. By the end of this block, you have a five-node pipeline at a public URL."*

### 1:08 – 1:16 — BUILD STEP C: Add Node 2, the Pattern Classifier (8 min hands-on)

*"Right now Node 1 reads the world. Node 2 decides. The decision logic is the four-question funnel from Sprint 4 — and Node 2's job is to apply it to whatever Node 1 returned. Two nodes, one button-press, no human in the middle. That's autonomy."*

→ Paste in chat:

> **🛠 BUILD STEP C (8 min):**
> 1. Configure → No-Code → click **+ Add Node.**
> 2. Node 2: Name = `Pattern Classifier` · Model = Claude Sonnet 4.6 · Max Tokens = 1024 · System Prompt = paste Node 2 from your workbook page (4–7).
> 3. Click **Proceed (Generate Code).**
> 4. Open your published chat URL. Re-run the **same starter problem** from Step B.
> 5. Paste in chat: the **PATTERN** your agent classified (RAG / Chatbot / Agent / Multi-Agent).

→ Press **8** in the presenter cockpit to start the visible **8-minute exercise timer.** Build alongside on shared screen — add Node 2 to your demo Marketing agent so the largest sub-group sees their flow.

→ Watch chat. Common stumbles and one-line fixes:

| Stumble | Fix |
|---|---|
| Published URL still shows one-node output | *"You added Node 2 but forgot to click **Proceed (Generate Code)**. Go back to No-Code, click Proceed, then refresh your chat URL."* |
| Node 2 ignores Node 1's output | *"Open Node 2's prompt. Confirm the literal line 'The Web Search Tool Agent's output is your input' (or equivalent) is in there. If not, add it."* |
| Agent classifies everything as 'Multi-Agent' | *"Node 2 is skipping to Q4. Re-paste the prompt — confirm 'Stop at the first YES. Do not skip questions' is in it."* |
| *"I can't find + Add Node"* | *"Scroll down past Node 1 in the No-Code editor — the button is at the bottom, just above Proceed."* |

→ Concept callout when ~70% of chat has posted a pattern (anchor to Sprint 1, Gap #4 — Autonomy):

*"Look at what your agent just did. Node 1 read the problem. Node 2 classified it. Two nodes, one button-press, no babysitting. The chatbot in Sprint 1 needed you between every step — your agent doesn't. That's bounded autonomy — **Gap #4 closed.** Second High-severity gap done."*

### 1:16 – 1:23 — BUILD STEP D: Upload a RAG Doc (7 min hands-on)

*"Before we touch RAG Docs — let me show you the goldfish. On my agent, watch what happens when I re-run the starter problem WITHOUT my context doc uploaded."*

→ Share screen. Re-run YOUR demo agent's starter problem on its public URL with the RAG doc REMOVED. Read the Node 2 output aloud.

*"Reasonable. But generic. The agent has no idea who I am, what company I work at, what stack I use. That's the goldfish — fresh slate every run. On this platform there's no Persistent Memory toggle to fix that. The fix is a doc."*

→ Paste in chat:

> **🛠 BUILD STEP D (7 min):**
> 1. Open the **RAG Docs** tab on your agent.
> 2. Use the template on **workbook page 8**. Fill it in with your real:
>    • Company name
>    • Audience
>    • Brand voice (if marketing) / Key metrics (if finance) / Red-flag protocols (if healthcare) / Stack (if generic)
>    • Top 3 priorities this quarter
> 3. Save as a `.txt` or `.pdf` file. Upload it.
> 4. Re-run the **same starter problem** on your published chat URL.
> 5. Paste in chat: **ONE specific phrase** from the new output that proves the agent used your RAG doc.

→ Press **7** in the presenter cockpit to start the visible **7-minute exercise timer.** While they upload, on your shared screen re-add your RAG doc, re-run the starter problem, and show the before-and-after outputs side by side.

→ Watch chat. Stumbles:

| Stumble | Fix |
|---|---|
| RAG Docs upload won't finish | *"Don't debug live. Have a short pre-prepared RAG doc ready and share it as a placeholder. Move on; circle back at the next break."* |
| *"My output didn't change"* | *"Confirm the doc shows up on the RAG Docs tab. Then open Node 2 — add the line: 'Use the company context from RAG Docs to ground the rationale.'"* |
| Vague RAG doc | *"Specific over abstract. Name your stack. Name your audience. Generic docs make generic outputs."* |

→ Concept callout (anchor to Sprint 1, Gap #1 — Memory):

*"First Critical gap closed — **Gap #1, Memory.** Your agent has context that survives the conversation. And here's the kicker — the next colleague who runs this agent inherits everything you've taught it. You're not just building an agent. You're building an asset."*

### 1:23 – 1:33 — BUILD STEP E: Add Nodes 3, 4, 5 + Republish (10 min hands-on) — THE CLIMAX

*"Right now your pipeline has two nodes — research and classify. By the end of this step it has five, the pipeline is publish-ready, and one prompt from the user runs the entire chain end-to-end. This is the bakery agent from Session 1 finally working. Watch."*

→ On YOUR screen, open the public chat URL of your **pre-built Bakery Launch Agent**. Paste the Monsoon Croissant brief from the workbook's Bakery section. Hit send.

→ **Don't narrate** the run. Let the five nodes fire in silence. Watch the room watch it. When the Summary Composer outputs the final brief, one line only: *"Five nodes. One prompt. Zero from me. Your turn."*

→ Paste in chat:

> **🛠 BUILD STEP E (10 min) — The Real Test:**
> 1. Configure → No-Code → click **+ Add Node** three times.
> 2. From your workbook page (4–7), paste in order:
>    • **Node 3** — Implementation Sketch
>    • **Node 4** — Risk & Compliance
>    • **Node 5** — Executive Brief
> 3. Click **Proceed (Generate Code).**
> 4. Click **Publish Agent** (or **Republish** if already published).
> 5. Open your published chat URL. Paste your starter problem.
> 6. Watch **all 5 nodes** fire in order.
> 7. Paste in chat: the **NEXT STEP FOR THE FOUNDER** line from your Node 5 output.

→ Press **0** in the presenter cockpit to start the visible **10-minute exercise timer.** Walk between participants on chat — call out node-5 outputs by name as they finish.

→ As "next step for the founder" lines land in chat, read **2–3 by name.** *"Priya — 'Approve the Day 0 post copy by Wednesday so the team can build the assets.' That's executive output. Rajesh — 'Sign off on the 90-day sandbox pilot scope before the next IC.' That's the agent acting like a consultant. Daniel — 'Schedule the IRB conversation for next week so we can pilot in Q3.' Look at what your agent just did."*

→ Concept callout (anchor to Sprint 1, Gaps #2 — Multi-step reasoning + #5 — Planning):

*"Look at what you built. Five nodes, in order, each one feeding the next. You gave the agent one prompt. It researched, classified, planned, flagged risks, composed a brief. **Every step was a decision your agent made on its own.** That's the second Critical gap closed — **Gap #2, Multi-step reasoning.** And the Medium one — **Gap #5, Planning.** Five gaps from Sprint 1, five for five closed. **That's the line you just crossed — from chatbot to agent.**"*

→ Pause. Let it land. Don't fill the silence.

> **70% rule reminder:** If 70% of the chat has posted a node-5 line by 1:33, move on. Stragglers finish during the debrief — the unlock has already landed for them too just by watching the Bakery Agent demo.

### 1:33 – 1:35 — Build Anchor + Pre-Debrief Pause (2 min)

*"Last anchor before we step back. Type in chat — **what's the most surprising thing your published agent did?** One line."*

→ Read **every "surprising thing" aloud, by name.** Common patterns and your one-line responses:

| What they paste | Your line back |
|---|---|
| *"It asked me a clarifying question first!"* | *"That's the agent reflecting before acting. Hold that — it shows up in the debrief."* |
| *"Node 3 contradicted Node 1"* | *"That's the agent doing what a real consultant does — pressure-testing its own research. Hold that thought — we'll name it in the debrief."* |
| *"The Node 5 brief was actually usable"* | *"Five nodes in a row, each doing one job well. That's the unlock."* |
| *"It used my company name and stack from the RAG doc"* | *"That's memory paying compound interest. Every future run is smarter than the last."* |

*"Step back from your screen for thirty seconds. Just look at it. **You built a five-node agent. From a blank canvas. In an hour. No code.**"*

→ Pause. Ten seconds of real silence. Let them sit with it.

> ⏱ **Time check: 1:35.** Hard pivot to debrief.

> **Facilitator notes for Block 3:**
> - The **published chat URL is the star** of this block. Every checkpoint, point at it. Learners who watched their five-node pipeline fire end-to-end remember this session for years.
> - **The #1 failure mode in Block 3 is forgetting to click Proceed (Generate Code)** after adding/editing nodes. The published URL silently runs the OLD pipeline until they click Proceed. Surface this proactively, especially after Step C and Step E.
> - If the RAG Docs upload is finicky: have a **short pre-prepared RAG doc ready** and share it as a placeholder. Don't let a product hiccup derail the unlock.
> - If a learner's agent does something brilliant — or something dumb — **stop and screen-share their result (with permission).** Failures debugged live are gold. A learner whose Node 3 contradicted Node 1's research is the best teaching moment of the day.
> - The **70% rule still applies.** If 70% finish Step E by 1:33, move on. The debrief is where the rest of the learning happens — don't trade it for the last 1–2 stragglers.
> - If a track has only one learner (often the lone doctor), drop into a DM check at the start of Step D and Step E — solo-track learners drift fastest in this block.

---

# BLOCK 4 — PATTERN DEBRIEF + PEER DEMOS (1:35–1:52)

### 1:35 – 1:45 — Pattern Debrief Frame + 4 Lenses (10 min)

> Slide-by-slide: **slide 21** = 2-min frame, then **slides 22–25** = four lenses (90 sec each).

→ Frame:

*"You built it. Now let's name what you built. Two minutes ago you had an agent. Now look at it through the four lenses from the start of class — and you'll see why those frameworks weren't academic. They were a map."*

---

**Lens 1 — The 5 Gaps Scorecard (90 sec)** *(Deck slide 22)*

→ Show the same matrix from Sprint 1, in the same canonical severity order, now with checkmarks filled in:

| # | Gap from Sprint 1 | Severity | Closed in | Status |
|---|---|---|---|---|
| **#1** | Memory | Critical | Step D | ✅ Persistent memory on |
| **#2** | Multi-step reasoning | Critical | Step E | ✅ Trace log proves it |
| **#3** | Tools | High | Steps A + C | ✅ You added two |
| **#4** | Autonomy | High | Step C onwards | ✅ Acted without per-step approval |
| **#5** | Planning | Medium | Step E | ✅ Executed a 3+ step goal |

*"Five for five. Two Critical, two High, one Medium. You closed every gap from Session 1 in 90 minutes."*

---

**Lens 2 — The Maturity Ladder: Where Did You Land? (90 sec)** *(Deck slide 23)*

*"Type in chat — where on the ladder is the agent you just built? L1, L2, or L3?"*

→ Wait for chat. Most will say L2. Read **every answer by name.**

*"L2. Correct. You built a Level 2 agent — one brain, multiple tools, bounded autonomy. Notice you didn't try to build L3. You didn't need to. L2 solves probably 80% of the workflows you'd actually want to automate at work."*

→ Re-deliver EdYoda's verbatim key insight:

*"Most enterprises are at Level 0–1 today. The competitive advantage is in moving to Level 2–3. You just made that move on your screen."*

---

**Lens 3 — The 4-Question Funnel: Where Does Your Agent Belong? (90 sec)** *(Deck slide 24)*

*"Walk through with me. Your agent: does the answer exist in a fixed document? No. Does it just need a single response? No. Does it need multiple steps, memory, tools? Yes — Agent. You're in the Agent quadrant of the funnel. Not RAG. Not chatbot. Agent."*

*"Next time someone at work says 'let's use AI for X' — put it through this funnel first. Pattern matching success rate when teams use this discipline: 95%."*

---

**Lens 4 — The Pattern You Built (90 sec)** *(Deck slide 25)*

*"You built **Single Agent + Tool-Calling** — the foundation pattern from EdYoda's five. Look at where you can go from here:"*

| When you hit this | Reach for this pattern |
|---|---|
| Hit the same wall twice? | Reflection loop (handled by Single Agent self-critique) |
| Need to ground in proprietary documents? | RAG Agent pattern |
| Need parallel specialists? | Orchestrator-Worker pattern |
| High-stakes / regulated? | Human-in-the-Loop pattern |

*"You don't need any of these yet. But now you know what they're called and when to reach for them. That's the literacy."*

---

### 1:45 – 1:52 — Peer Demos: 3 Show-and-Tells (7 min) *(Deck slide 26)*

> **Critical pre-work:** During Build Step E (~1:30), DM 3 learners privately:
> *"Would you be willing to demo at 1:45? Two minutes, your screen, your agent."*
> Pick for **variety, not virtuosity** — ideally one marketing, one finance, one doctor/other. **In a small cohort (≤6 learners) you're effectively asking half the room — pick the 3 whose agents fired the cleanest builds during Step E so they walk in confident.**

→ For each demo (2 min × 3):

1. **30 sec** — Volunteer says their name, role, and what their agent does
2. **60 sec** — Screen share, run it live, narrate the trace log as it fires
3. **30 sec** — You react and **name the pattern.** Example:
   *"Look — Priya's agent reflected when the search returned nothing useful and retried with a different query. That's the **Reflection pattern** emerging spontaneously."*

→ **Backup plan:** If a picked volunteer balks, ask the room verbally — at this size, someone will say yes. Worst case, screenshot of your own agent.

→ **If a peer demo breaks live:** 30-sec recovery — *"Agents break — let's debug together for 60 sec, then I'll show mine."* **Never let dead air stretch.**

> ⏱ **Time check: 1:52.** Move to close.

---

# BLOCK 5 — WHAT'S NEXT + REFLECTION + CLOSE (1:52–2:00)

### 1:52 – 1:55 — What to Build Next + Bridge to Session 3 (3 min) *(Deck slide 27)*

*"You have an agent. You'll go back to work tomorrow. What now?"*

→ Show 3 next-steps on slide:

1. **This week:** Run your agent **5 times** on real business problems. Track time saved (workbook page 11).
2. **Next 2 weeks:** Iterate the system prompt. Treat it like a junior employee you're coaching.
3. **Next month:** Show it to one colleague. Find ONE workflow **they'd** want classified. Build the second.

*"You don't need another course to do any of this. You need 30 minutes a week and a real problem."*

---

**Bridge to Session 3 — deliver verbatim:**

*"And — quick preview of where we're going. Session 3 is **Prompt Engineering**. You'll learn how to communicate with agents precisely enough to make them reliable. Today you built one. Next time, we make sure it does what you actually meant."*

---

### 1:55 – 1:58 — Open Q&A (3 min)

*"Three minutes of open Q&A — any lingering question from today, throw it at me. Anything I can't answer in 45 seconds, I'll reply to by email tomorrow."*

→ Go around the room verbally or take chat questions in order. Answer **2–3 questions, ~45 sec each.** For deeper ones:

*"Great question — let me write that up properly and email you tomorrow."*

---

### 1:58 – 2:00 — Reflection + Crescendo (2 min) *(Deck slide 28)*

→ Before delivering the crescendo, **advance the presenter deck to slide 28.** The learner deck follows automatically — both decks show the close screen together.

→ Paste in chat:

> **Take with you (reply to today's email by Friday):**
> 1. ONE business problem at your job you'll classify with your AI Pattern Advisor this month.
> 2. ONE workflow you **won't** automate with an agent — because it's a chatbot job, a RAG job, or too sensitive for an agent today.
>
> Two sentences each. I read every reply.

→ Close (deliver slowly, eye contact through the camera):

*"Three lines, slowly. Last session, a chatbot was a brain in a jar. Today, you gave it hands. Next time, we teach it to listen. Two down, six more to go — the arc gets sharper from here. You did the hard part — you showed up, you stayed, you built. Go run your agent on something real this week. That's the only homework that matters."*

*"Thank you. See you for Session 3. Bye."*

→ Wave. Stop recording. End the meeting.

---

# FACILITATOR CONTINGENCY GUIDE

## If a demo fails live

- **Bakery Campaign re-run produces a different failure pattern:** Pivot to slide screenshots. *"In Session 1 this is what happened. Today the model behaved differently — that's exactly why agents matter."*
- **Pre-built EdYoda demo agent breaks during Sprint 2:** Have a **30-sec screen recording** of it running successfully as backup. Play it. Move on.
- **EdYoda Agent Builder is fully down:** Pivot to a longer concept block. Extend Block 1 to ~40 min, add a 10-min "build it on paper" exercise where learners design their agent in the workbook. Live build becomes homework with a recorded walkthrough.
- **A learner's account is broken:** Clone your backup agent of their track into their account. They proceed from Step B onward with your skeleton.

## If <70% finish a build step on time

- **Build Step A:** Pull stragglers into 1:1 DM during the break. Move the rest forward.
- **Build Steps C / D / E:** Move on at the time guard. The next concept callout helps stragglers catch up.

## If no one volunteers for peer demos

- Pre-identify strong learners during Build Step E. DM them at ~1:30.
- In a small cohort (≤6), you can ask the room verbally — someone usually says yes.
- Worst case: show your own agent's run as *"the kind of thing we just built."*

## If the cohort is small (≤6 learners) — DEFAULT FOR THIS RUN

- **Skip the chat-as-scoreboard mechanic.** Go verbal: instead of "type in chat," ask the room directly and call on each person by name.
- **Read every response.** No "top 3" filtering — you have time to honor every voice.
- **Polls become go-arounds.** No need to launch Zoom polls; just go around the room.
- **Track-pick narration** uses real names + real tracks, not fabricated counts. Adjust the example line in Block 2 (0:34–0:38).
- **Peer demos still work** — 3 of 6 means half the room demos. That's a feature, not a bug.

## If the cohort is larger than expected (≥12 learners)

- **Chat becomes the scoreboard again.** Restore the "read 4–5 by name" pattern instead of reading every response.
- **Track distribution narration:** use real counts from chat ("I see 5 marketing, 3 finance, 2 healthcare, 4 generic…").
- **Polls:** use Zoom polls for L0/L1/L2/L3 and R/C/A/M votes (faster than reading chat).
- **Peer demos still 3** — pick for variety, not virtuosity.

## If you're running over

- **At 0:30, if you're at 0:33:** Cut Sprint 4 mini-exercise next time. Move R/C/A/M to workbook only.
- **At 0:55, if you're at 1:00:** Take the break anyway. Combine Steps C and D into one 12-min hands-on.
- **At 1:35, if you're at 1:40:** Cut Lens 4. Combine the patterns into close as a single line.
- **At 1:52, if you're at 1:55:** Cut "What's Next" to 2 min (skip points 2 and 3). Keep Session 3 bridge + crescendo (slide 28) intact.

## If you're running under

- Add live Q&A after each block — verbal go-around, 2 questions per block. With a small cohort, you have time.
- During Build Step E, encourage learners to try a **second multi-step goal** of their own design.

## If energy crashes after the break

- *"I can see this is dense. Stand up wherever you are. Stretch. Take 30 seconds."* Then continue.

## If someone is dominating the conversation

- *"Love the energy [Name] — let's hear from a few others first."*
- (In a small cohort, this is less likely — but if a learner monopolizes voice time, redirect verbally.)

## If someone challenges you ("AI agents are dangerous / overhyped")

- *"Real concern. The 4-question funnel we covered is exactly for this — not every problem is an agent problem. Today's build is the agent case. The discipline of when NOT to use one is in your take-home prompt."*

---

# YOUR PRE-CLASS PRACTICE RECOMMENDATION

Do **one full dry run** alone, with a stopwatch, the night before. Especially:

1. **Test all 4 track backup agents end-to-end** — pick one starter problem per track, run it, confirm tools fire and trace log displays correctly.
2. **Time Block 1.** This is the tightest block. 3 minutes per sprint is unforgiving — practice the analogies until they're crisp.
3. **Time Block 3.** 30 minutes of hands-on requires facilitating without filler. Practice the concept callouts so they land in 60 seconds, not 3 minutes.

Good luck. You've got this.
