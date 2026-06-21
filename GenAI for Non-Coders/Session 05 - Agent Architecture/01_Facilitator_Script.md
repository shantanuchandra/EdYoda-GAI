# Facilitator Script — Agent Architecture: How Agents Think, Remember & Act (Session 5 of 8)

**Subtitle:** *By the end of this session, you'll trace the reasoning loop of any agent, design its memory and tool architecture, choose the right multi-agent pattern, and walk out with a complete Architecture Card for an agent you want to deploy at work.*
**Duration:** 120 minutes · **Format:** Live virtual (Zoom/Meet) · **Audience:** Same room as S1–S4 — mixed India + international; marketing/sales, finance/consulting, at least one doctor.
**Spine:** Autopsy → Inside the Loop → Design Your Own
**Hands-on share:** ~45% (≈54 min across 3 exercises)
**Build artifact:** Every learner completes their Agent Architecture Card — three sections in the workbook: Loop Trace (Exercise A) + Tool Manifest (Exercise B) + Pattern Choice (Exercise C), each with a reusable Claude prompt they keep for S6.
**Tools assumed:** Claude Projects (same as S4 — no new onboarding), Claude.ai fresh chat (for optional self-reflection demo).

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] Send a 1-line email to all learners: *"Tomorrow, open your Session 4 Lumière Knowledge Agent in Claude Projects. We'll be using it in the first exercise. See you at [time]."* Include the calendar link.
- [ ] Send the **Session 5 Learner Workbook** as a Google Doc (view-only). Confirm the link is in the calendar invite and the day-of email.
- [ ] **Run Exercise A yourself end-to-end.** Open your Lumière Knowledge Agent. Paste the loop-trace instruction line above the three-constraint question. Read what the agent returns and fill in the 6-box trace yourself. Know which stages it skips — that's your debrief material.
- [ ] **Run Exercise B yourself.** Pick an agent scenario from your own work. Use the Claude prompt to generate a tool manifest. Narrow every scope. Circle your nervous tool. This is your model in the debrief.
- [ ] **Optional: Prepare the Self-Reflection demo** (Block 4 opener, 3 min). Open a fresh Claude chat. Prepare the Pune branch recommendation prompt and the critique prompt. Confirm the critique comes back sharp and specific.
- [ ] Pre-load browser tabs:
  1. **Lumière Knowledge Agent** — Claude Projects, your own S4 agent, open and ready
  2. **Fresh Claude chat** — for the optional self-reflection demo
  3. **Session 5 Learner Workbook** — open to Exercise A
  4. **Backup: Lumiere_KB.md** — open in a text editor in case anyone's S4 agent is unavailable
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] **Cohort note (this run):** ~6 learners expected. Call every learner by name in every exercise debrief. Go verbal throughout — no chat scoreboard.
- [ ] Have water, a printed copy of this script, and a visible timer.

---

## Opening Hook Slide (have this up 5 min before class starts)

> **"Session 4 gave your agent a brain made of Lumière's own documents. Today we open that brain up and learn exactly how it thinks."**

Play soft instrumental music until you start.

---

# THE 120-MINUTE RUN SHEET

Each block has: **what you say (italics)**, **what you do**, **what learners do**, and **timing guard**.

---

## BLOCK 0 — OPENING (0:00 – 0:12)

**Goal:** Re-establish the room with the cumulative course story. Name the S2 hallucination bug precisely — this is the hook that makes the session personal. Set today's promise.

### 0:00 – 0:03 — Cold Open · one-word check-in

*"Welcome back, everyone. Before we dive in — quick one. Drop a single word in the chat: how did last session land for you? The Lumière agent, the whole build. Just one word, whatever's honest."*

→ Wait 30 seconds. Read **every response** out loud, **by name**. With this cohort size, every name gets called.

*"Thank you [Name], thank you [Name]… I'm hearing 'useful', 'dense', 'eye-opening.' That's the right baseline. Last session gave your agent a brain — Lumière's own documents, cited, grounded. Today we open that brain up."*

> **Why this works:** Same cold-open ritual as every session. Continuity signals "we're picking up where we left off." Everyone who typed in the first 90 seconds stays engaged.

### 0:03 – 0:08 — The Course Story So Far

*"Before we go anywhere new — let me show you how far we've actually come."*

→ Show the Course Story slide. Walk each row — one breath per row:

| Session | Promise | What you built |
|---|---|---|
| S1 | LLMs can generate — but they can't act | Watched the bakery campaign fail 4 of 6 steps |
| S2 | An agent can do what a chatbot can't | Built the HR Candidate Screener — 3 nodes: search → skills → score |
| S3 | The right prompt makes an agent reliable | Wrote system prompts for tone, format, and refusal |
| S4 | Ground the agent in your own documents | Built the Lumière Knowledge Agent — cited its source, refused when it didn't know |
| **S5** | **Open the hood — understand WHY agents work, break, and scale** | **Your Agent Architecture Card** |

*"That's four sessions of building. What we've never done is open one of those agents up and name every part. Today we do that."*

*"And I want to start somewhere specific — because it's the whole reason we're here today. Remember the candidate screener you built back in Session 2? The one that searched for people, pulled out their skills, and scored them. Well, when that search came up empty, it didn't tell you it found nothing — it made up LinkedIn links that don't exist. Some of you caught it at the time; some didn't. Either way, today we figure out exactly why it happened. And here's the thing — it wasn't the AI being dumb. It was something missing in how the agent was put together: one of its parts was the wrong tool for the job, and nothing was there to catch the gap. By the end of today, you'll be able to point at the exact part that failed, and tell me how you'd build it right."*

→ Pause. Let that land.

> **Facilitator note:** The hallucination callback is the emotional hook of this session. Don't rush through it. The pause after "architecture problem" is load-bearing.

### 0:08 – 0:12 — Norms + The One Rule

*"Same room as always, so just a quick reminder on how we run."*

| Norm | What it means |
|---|---|
| **Cameras** | Encouraged, optional. |
| **Chat** | Use freely — questions, reactions, welcome. |
| **Mics** | Stay muted unless called on. |
| **Break** | Real 10 minutes, halfway through. Promise. |
| **Stuck** | Ask live. If it needs more, I'll email it. |
| **Today's tool** | Claude Projects — same one from Session 4. |

*"One rule for today. You came in knowing what agents can do. You'll leave knowing how they actually work — and that card you fill in is the proof."*

*"Here's how we get there. First we open the hood — we take the screener and the Lumière agent apart and name every piece. Then you get inside one yourself, with a few hands-on exercises. And by the end, you'll sketch the design for an agent you'd genuinely want at your own work. Let's go."*

> ⏱ **Time check: 0:12.** If past 0:10, shorten the one-word check-in debrief. The course story table and the hallucination callback are non-negotiable.

---

## BLOCK 1 — CONCEPT SPRINTS 1–3 (0:12 – 0:42)

**Goal:** Three concepts, each anchored to an agent this cohort built. No new tools. Pure naming — vocabulary for things they already experienced.

**Pacing rule:** ~10 min per sprint. WHAT → WHY → HOW. The HOW is always the cohort's own work. Cut the analogy before you cut the callback.

*"Three quick concepts coming up — and here's the nice part: each one is something you've already lived through. We're just putting names to it. And I'll keep coming back to the same two agents you already know — the candidate screener from Session 2, and the Lumière agent from Session 4."*

### 0:12 – 0:22 — Sprint 1: Anatomy — Five Components, One Machine

→ Show the anatomy diagram slide.

*"Here's the good news: every agent ever built — simple or fancy, yours or anyone's — is really just five parts working together. Five parts, one machine. Let me walk you through them."*

*"There's the brain — the AI model that reads, reasons, and decides. There's its memory — what it knows, what it can look up or remember. There's its hands — the tools, the things it can actually do. There's the planner — the part that decides what to do, and in what order. And there's the runner — the part that takes that plan and actually carries it out."*

*"Now — remove any one of these. What happens?"*

→ Walk the failure column one line at a time. Pause on each:

- *"No memory — it forgets every session. Starts from zero every time you talk to it."*
- *"No tools — it can only talk. It can describe sending an email. It cannot send one."*
- *"No planner — it gets stuck on anything complex. It doesn't know what to do first."*
- *"No executor — plans never run. It knows what to do and doesn't do it."*
- *"No LLM — no reasoning at all. It's just a script."*

*"Now — let's map this to the HR Screener you built."*

→ Walk the mapping:

- *"LLM: Claude Sonnet running each node — and it reasoned fine."*
- *"Planner: the 3-node sequence you designed. Implicit plan, baked into the pipeline. Fine."*
- *"Executor: the Agent Builder pipeline runner. Fine."*
- *"Tools: native web search on Node 1 — and this is the one that broke."*
- *"Memory: none configured. Worth noting — but it's not what caused the hallucination. Hold that thought."*

*"So here's what actually went wrong, and I want to be precise about it. That first step's job was to go fetch real, verified LinkedIn profiles — but here's the catch: LinkedIn doesn't let anyone do that. No scraping, no open door, no official way in. So the plain web search it was handed simply couldn't do the job. It came back empty-handed. That's a tool problem — the same Gap #3 we talked about in Session 2."*

*"And why did coming up empty turn into a made-up answer? Because nobody had given it a rule for what to do with nothing. No working tool, and no instruction to just admit it — so the model did what models do with a blank: it filled it in. Links that look completely real, and aren't."*

*"So keep these two straight. The cause was the tool — there was no real tool for the job. And the thing that was missing was a simple rule: 'if you can't verify these, say so and hand it to a person,' instead of inventing. It was never a memory problem. It was a tool problem, with nothing to catch the gap."*

**Analogy (memorize):** *"Hand someone a job their tools can't do, with no permission to say 'I can't' — and they'll bluff. That's the screener."*

> ⏱ **0:22.** If past it, cut the analogy. Keep the failure walk and the HR Screener mapping.

### 0:22 – 0:34 — Sprint 2: The Loop — Perceive → Reflect

→ Show the loop diagram slide.

*"Here's the big difference between a chatbot and an agent. A chatbot answers you once and stops. An agent goes around in a loop — it takes something in, thinks it over, makes a plan, does one thing, looks at what came back, and asks itself 'are we there yet?' If not, it goes around again. Six stages, repeating until the job's actually done."*

*"Let me name them as we go: it takes in the request, thinks about it, makes a plan, does the first thing, sees what happened, and then decides — done, or go around again."*

*"Think of a really good consultant. They don't give up when the first phone call doesn't pan out — they just try the next contact. That instinct to keep going is baked right into the loop."*

→ Show the overdue-invoice trace slide.

*"Let me show you. Picture an agent whose job is to chase up overdue invoices every morning. It sends out fourteen reminder emails — and one bounces straight back, because that customer's email on file is out of date. Now, a plain chatbot would stop right there and just tell you 'one failed.' But watch what this one does instead: it notices the bounce, goes and digs up a fresh contact from the system, and sends it again. Fourteen out of fourteen, done."*

*"That's the loop saving you. One email bounced, and it didn't crash or give up — it just found another way and finished the job. The bounce wasn't a dead end. It was a clue."*

*"Now let's trace your HR Screener through the same loop."*

→ Walk it verbally:

- *"PERCEIVE: job title, location, years of experience — the parameters you gave it."*
- *"REASON: need 5 candidate profiles from LinkedIn."*
- *"PLAN: call web_search with those parameters."*
- *"ACT: called web_search. Returned sparse results — or nothing."*
- *"OBSERVE: the results were empty or useless."*
- *"REFLECT: nothing. No reflection node. No recovery. No 'results were empty, I should stop or escalate.' It filled in what was missing. Invented URLs."*

*"The loop was there on paper. But there was nothing at that last step — nothing to stop and say 'hang on, I came up empty, let me do something about it.' And without that, the agent just can't recover. It plows ahead and bluffs."*

*"One more thing about loops — they also need to know when to stop. Three ways, and you want all three: when the job's actually done, when it's tried enough times and should give up, or when it's stuck and should hand off to a person. Leave those out and the agent loops forever, burning money. Your screener had none of them."*

**Analogy (memorize):** *"The loop is the consultant instinct. The exit conditions are the project manager saying 'stop and escalate if this takes more than three tries.'"*

> ⏱ **0:34.** This sprint earns its full time. Don't rush the invoice trace — it's the visual that makes the loop concrete.

### 0:34 – 0:42 — Sprint 3: Memory — Desk · Notebook · Archive · Library

→ Show the memory types slide.

*"Memory isn't one single thing — it comes in four kinds. And the easiest way to picture them is an office."*

→ Walk each type (~30 sec each):

- *"There's the desk — what you're working on right this second. 'You just told me the cake's for Saturday.' When the chat closes, the desk gets cleared."*
- *"There's the notebook — things worth keeping across days. It's what lets the agent say 'welcome back, Priya' next week, instead of treating you like a stranger."*
- *"There's the archive — a log of what's actually happened before. Not just facts, but events: 'last Tuesday that search came back empty.' It's how an agent learns from what went wrong."*
- *"And there's the library — a whole shelf of reference documents it can look things up in. That's exactly what you built in Session 4 when you loaded the Lumière file. That's this kind of memory."*

*"Now the side-by-side that matters."*

→ Walk both agents:

- *"HR Screener — had short-term only. (Quick note so we keep the earlier lesson straight: its hallucination was the broken tool, not missing memory. But it's true it also had no archive — so even on a good day it couldn't remember what it searched yesterday.)"*
- *"Lumière Knowledge Agent — had semantic memory. The RAG Docs you uploaded. It answers the Saturday cake question correctly. But ask it 'what did we discuss last week?' and it has nothing. No episodic, no long-term. It knows Lumière's policies. It forgets every conversation."*

*"You built semantic memory in Session 4. You've been using short-term memory in every session since Session 1. Today you learn the names for all four — so you can design the ones that are missing."*

**Analogy (memorize):** *"Desk, notebook, archive, library. Every office has all four. Agents do too — they just don't come configured."*

> ⏱ **0:42.** If Sprint 3 is running short, prioritize the side-by-side. The analogies are optional if time is tight.

*"Concepts are named. Now we stop talking about agents and we get inside one. Open your workbook to Exercise A."*

---

## EXERCISE A — LOOP TRACE (0:42 – 0:55)

**Goal:** Every learner runs a multi-constraint question against their Lumière agent, makes the loop visible, and fills in the 6-box Loop Trace Sheet.

*"Exercise A — 13 minutes. You're going to read an agent's mind. Two things to paste: the loop-trace instruction, then the question."*

→ Paste in chat:

> **EXERCISE A — Loop Trace (13 min):**
>
> **Step 1:** Re-upload the latest `Lumiere_KB.md` (it now has a branch-coupons section), then open your Lumière Knowledge Agent in Claude Projects.
>
> **Step 2:** Add this instruction ABOVE your question — copy it exactly:
>
> *"Before answering, trace your reasoning one stage at a time. Label each: PERCEIVE (list every separate request) / REASON (for each: YES, NO, or PARTIAL from the document) / PLAN / ACT (quote the section) / OBSERVE / REFLECT (what will you do about anything you can't answer). Then write the customer reply."*
>
> **Step 3:** Then paste this customer message (copy it exactly):
>
> *"Hi! I want a 2kg eggless chocolate cake for pickup at your Bandra branch this Saturday. Can I use the 'BANDRA 10' code on it — or my friend said 'POWAI10' gives a better deal, does that work at Bandra? Also, can you deliver it to Sector 90, Gurgaon, and is it safe for my child with a severe nut allergy?"*
>
> **Step 4:** Fill the 6-box Loop Trace in your workbook.
>
> **Step 5:** Note: did it (a) fix "BANDRA 10" → BANDRA10, and (b) refuse POWAI10 at Bandra AND point the customer to the code that *does* work there (BANDRA10)?
>
> **Fallback (no Lumière agent):** Fresh Claude chat + attach the latest Lumiere_KB.md with the paperclip. Same exercise.

→ Start timer. **Key: 13 min.**

→ Walk the room. Correct behaviours to look for — the agent should treat the requests *differently*:
- **Corrects** the mistyped code → BANDRA10 (semantic match, not exact-string lookup).
- **Refuses POWAI10 at Bandra and redirects** — "POWAI10 is Powai-only; at Bandra, use BANDRA10." The best agents use the customer's location to name the right coupon. A flat "no" is only half-credit.
- **Refuses** the Gurgaon delivery (Mumbai-only) and **refuses to certify** nut-allergy safety.
- **Flags** the eggless-coupon eligibility as not specified — doesn't assume "yes."
- Accepts POWAI10 at Bandra, or echoes "BANDRA 10" back unchanged → the agent didn't re-read the updated KB. Have them re-upload and retry.

*"Let's hear a few. [Name] — did your agent just refuse POWAI10, or did it also tell the customer BANDRA10 is the one that works at their branch?"*

→ Read 2–3 traces aloud by name.

*"Notice what a good loop did: it corrected the typo, redirected the wrong-branch coupon to the right one for Bandra, flagged the eggless gap, and refused the delivery and the safety question — four different behaviours, not one confident paragraph. Correct, redirect, flag, refuse. And the redirect is the standout: it used the customer's location to pick the coupon that actually works. That trace is Section 1 of your Architecture Card."*

> ⏱ **Pre-break anchor at 0:54:**
> *"If your loop trace has all 6 boxes filled — even the 'not visible' ones — that's the milestone. Real break, now."*

---

## HARD BREAK (0:55 – 1:05) — 10 MINUTES, NON-NEGOTIABLE

→ Show break slide with countdown timer.

*"Real ten minutes. Cameras off, mics off, get away from the screen. Back at the exact clock time on the slide. Go."*

→ **Use the break:**
- DM any learner whose agent accepted POWAI10 at Bandra or echoed "BANDRA 10" unchanged. Send: *"Re-upload the latest Lumiere_KB.md — it has the branch-coupons section. Then retry; the agent should fix the spelling and refuse the wrong-branch code."*
- If two or more learners hit the same KB-upload issue, plan a 30-second mention at the top of Block 3.

→ When you return: *"Welcome back. You just traced an agent's reasoning loop. Now we give it hands — tools — and a strategy for thinking."*

---

## BLOCK 3 — CONCEPT SPRINTS 4–5 + EXERCISE B (1:05 – 1:40)

**Goal:** Tools and planning concepts, then the Tool Manifest exercise — the governance document every deployed agent needs.

### 1:05 – 1:15 — Sprint 4: Tools — The Agent's Hands

→ Show the tools slide.

*"So — tools. Think of these as the agent's hands. The brain decides which hand to reach for, and the runner actually moves it. They come in four families."*

→ Walk the grid:

- *"First, information tools — for looking things up. Searching the web, querying a database, reading a document, checking a calendar."*
- *"Second, action tools — for doing things. Sending an email, updating a record, submitting a form."*
- *"Third, communication tools — for telling people things. A Slack message, a Teams post, a notification."*
- *"And fourth, computation tools — for crunching numbers. A calculator, a spreadsheet processor."*

*"And the way it actually works is simple: the brain decides it needs a tool, it spells out which one and what to pass it, the runner goes and uses it, the result comes back, and the brain picks up from there."*

→ Show the Recruitment Agent manifest:

*"Here's what that looks like written down — a real tool list for a recruiting agent. Five tools, and I want you to watch the limits on each."*

→ Walk each row:

- *"The resume reader can only read — never write anything."*
- *"The calendar tool can book things, but only on the recruiter's own calendar — not the whole company's."*
- *"The email sender can send, but only pre-approved templates — it can't write whatever it wants."*
- *"The record-keeper can write, but every change is logged, and only to candidate records."*
- *"And the notifier posts to exactly one channel — nowhere else."*

*"See the pattern? Every single one has a line it's not allowed to cross. That's the whole point."*

→ Ask the room: *"Which of those five tools would make your legal team nervous if it weren't scoped — and why?"*

→ Let 2–3 respond. Usually Calendar API or Email Sender — validate both.

*"And here's why the limits matter so much. If the agent grabs the wrong tool, the loop saves you — it sees the error and tries the right one. But if a tool has no limit and does its job a little too well? The loop can't undo that. By the time you notice, it's already changed something out in the real world."*

*"So: give every tool a clear boundary. My rule of thumb — if you can't say in one sentence what a tool is NOT allowed to do, you haven't pinned it down yet."*

**Analogy (memorize):** *"A tool manifest is the employment contract for each of the agent's hands."*

> ⏱ **1:15.** If past it, cut the tool-calling mechanics (5-step sequence). The manifest walkthrough and the legal question are non-negotiable.

### 1:15 – 1:23 — Sprint 5: Planning — Three Ways to Think

→ Show the planning strategies slide.

*"There are three different ways an agent can work through the same problem — and they give you different results, at different costs."*

- *"The first is think-then-do, over and over: it thinks, takes an action, sees what came back, thinks again. Best when it needs fresh, live information as it goes."*
- *"The second is just careful step-by-step reasoning — no tools at all, one step leading to the next. Best when it already has all the facts it needs."*
- *"And the third is draft, then criticize its own draft, then rewrite. Best for anything important enough that it has to be right before it goes out."*

→ Give a Lumière example of each (these match the learner slide):

- *"Think-then-do: 'should we run a delivery promo this weekend?' It checks the weather, checks the order backlog, and decides — live information, gathered as it goes."*
- *"Step-by-step reasoning: 'which three cakes should we feature this month?' It weighs margin, prep time, and season, and recommends — no tools, just thinking it through."*
- *"Draft-and-fix: writing an apology to a customer whose cake showed up late. It drafts it, decides the tone's off, and rewrites before it goes out."*

*"And you don't have to memorize the names. You just ask three questions: how hard is the task, does it need fresh live information, and how much does getting it exactly right matter? Answer those, and the right approach picks itself."*

**Analogy (memorize):** *"ReAct is the detective who interviews witnesses. CoT is the analyst at the whiteboard. Self-Reflection is the lawyer who reads the brief twice before signing."*

> ⏱ **1:23.** Keep this to 8 minutes. The 3-question selector is the only thing that needs to land.

### 1:23 – 1:40 — EXERCISE B: Tool Manifest (17 min)

*"Exercise B — 17 minutes, and it's two manifests, both for Lumière. First the Order Assistant — the agent that takes a cake order end to end. Then the harder one, the FSSAI Regulation Monitor. You'll write each tool in RCTFC — same five-part discipline from Session 3 — then narrow every scope and permission."*

→ Paste in chat:

> **EXERCISE B — Tool Manifest (17 min):**
>
> **Part 1 (~7 min) — Lumière Order Assistant.** Use this prompt:
>
> *"Help me design the TOOL MANIFEST for a Lumière Bakery Order Assistant — it takes a cake order end to end (checks the spec, confirms lead time, books the slot, sends confirmation). List 5 tools. Write each in RCTFC — Role / Context / Task / Format / Constraints (narrowest scope + minimum permission) — and one line on what breaks if it's removed."*
>
> **Part 2 (~10 min) — FSSAI Regulation Monitor.** Use this prompt:
>
> *"Help me design the TOOL MANIFEST for a Lumière FSSAI Regulation Monitor. It MUST have: two triggers (auto nightly + manual 'check now'); a rule that auto-applies and logs only cosmetic/procedural updates but escalates anything about allergens/ingredients/safety to a human and never applies it itself; and a Seen-Rules Log so it never re-alerts on the same rule twice. List 4–5 tools in RCTFC."*
>
> **Then:** narrow every scope to one sentence; circle the one tool that makes you nervous.

→ Start timer. **Key: 17 min.** Give a 2-min warning at Part 1 → Part 2 (~1:30).

→ Walk the room. Watch for:
- Scope written as "access to the calendar" — not a scope. *"What specifically can't it touch? Write that."*
- Permission written as "full access" — *"Minimum means: what's the least it needs?"*
- The monitor missing a memory tool — *"Add the Seen-Rules Log, or it re-alerts every night."*
- **The one hard line:** anyone letting the monitor auto-apply an allergen or safety rule — stop them. *"Allergen and safety always escalate to a human. Never auto-apply."*

*"Let's hear the nervous tools. [Name] — what's yours and why?"*

→ Each learner reads their nervous tool aloud.

*"Every nervous tool is a write or send tool — the Slot Booker, the Confirmation Sender, the regulation Auto-Apply. The fix is always the same: narrow the scope, or add a human gate. Those two manifests are Section 2 of your Architecture Card."*

> ⏱ **1:40.** If learners are still writing at 1:38, give a 2-minute warning. A 4-row monitor manifest is fine as long as it has the memory tool and the escalation rule.

---

## BLOCK 4 — MULTI-AGENT + EXERCISE C (1:40 – 1:55)

**Goal:** Name the three multi-agent patterns. Show the cohort they already built one (the screener was a Specialist Handoff). Exercise C: the London-branch expansion forces a multi-agent pattern choice.

### 1:40 – 1:43 — Optional: Self-Reflection Demo (3 min — CUT if behind on time)

*"One fast live demo — Self-Reflection in a tool you already use."*

→ Open fresh Claude chat. Type and run:

> *"Write a 2-sentence recommendation for whether Lumière Bakery should open a fourth branch in Pune."*

Read draft aloud. Then type and run:

> *"Critique that recommendation. What's the weakest claim? What data is missing? What would make a CFO push back?"*

Read critique aloud.

*"Draft. Critique. Redraft. The agent is its own reviewer. That's Self-Reflection — and you can do it right now, in a plain Claude chat, with no extra tools."*

> **Cut entirely if you're behind at 1:40.** Additive only. Don't let it eat Exercise C.

### 1:43 – 1:50 — Sprint 6: Multi-Agent Patterns

→ Show the multi-agent patterns slide.

*"Sometimes one agent isn't enough, and you split the work across a few. There are three ways to do that."*

→ Walk each pattern + analogy:

- *"The first is a manager and its team. One agent takes the job, hands pieces to specialist agents, and pulls their answers back together. Good when each piece needs different expertise."*
- *"The second is a row of identical agents working side by side. You've got a big pile of work, so you split it up and let them all chew through it at once. The win here is speed."*
- *"And the third is a relay race. Each agent does one leg of the job and passes the baton to the next — classify it, resolve it, escalate it, close it. Good when the work has clear stages, each needing a different skill."*

*"Now — here's the callback I've been waiting to make."*

*"That candidate screener you built in Session 2? It was a relay. The first agent searched, and handed off to a second that pulled out the skills, which handed off to a third that scored everyone. Three specialists, each running one leg and passing the baton. You built a multi-agent system months ago — you just didn't have a name for it. Now you do."*

→ Pause. Let that land.

*"And when you're deciding which pattern to use, it comes down to one question: do you want it faster, with agents working side by side — or safer, with one agent checking another's work?"*

**Analogy (memorize):** *"Orchestrator-Worker is the manager. Parallel Agents is the assembly line. Specialist Handoffs is the relay race."*

> ⏱ **1:50.** Sprint 6 is deliberately short. The HR Screener callback is the moment — everything else supports it.

### 1:50 – 1:55 — EXERCISE C: Pattern Choice (5 min)

*"Exercise C — 5 minutes. Here's the scenario: Lumière opens a branch in London. New country, new regulator — the FSA, not FSSAI. Your one Regulation Monitor knew only FSSAI. So how do you split the work? Use the prompt in your workbook. I'll call on each of you while you work."*

→ Paste in chat:

> **EXERCISE C — Pattern Choice (5 min):**
>
> **Step 1:** Use this Claude prompt:
>
> *"Lumière is opening a London branch — the regulator there is the FSA, not FSSAI. My current monitor only knows FSSAI. Keeping multiple branches compliant across DIFFERENT regulators — which fits best: Orchestrator-Worker, Parallel Agents, or Specialist Handoffs? Why? What breaks if I pick wrong? Where must a human stay in the loop?"*
>
> **Step 2:** Read the recommendation. Agree or push back. Write in your workbook: "I'm using [pattern] because [one sentence]. The risk of the wrong pattern: [one sentence]. The human stays in the loop at: [where]."

→ Start timer. **Key: 5 min.** While they work, call on each learner by name:

*"[Name] — what pattern, and where does the human stay in the loop?"*

→ The strong answer: one monitor per regulator (each with its own memory), an orchestrator that only *routes* by branch, and the allergen/safety human gate firing inside every one. Praise anyone who pushes back on "one agent runs the whole country launch" — that refusal is the judgment being taught.

> ⏱ **1:55.** Pivot to close.

---

## BLOCK 5 — CLOSE (1:55 – 2:00)

### 1:55 – 1:57 — Synthesis

*"Let's step back for a second. That screener made up answers — and now we know exactly why. The tool couldn't do the job, because there was no legal way to get those profiles, and nothing was there to catch the gap. That wasn't the AI being broken. It was a choice in how it was built. And the whole point of today is this: those are choices — and now they're yours to make."*

*"Flip to the back of your workbook — you've got three sections filled in. You read a real agent's thinking and watched it fix, refuse, and flag instead of bluffing. You designed two agents' tools, found the one that worried you, and drew the line where a human has to step in. And you split the work for a second country and can defend the call in a sentence."*

*"That's not a classroom exercise. That's a real blueprint — for an agent you'd actually want, at your own work."*

### 1:57 – 1:58 — Forward Bridge

*"Next time, it stops being paper. In Session 6 — the EdYoda Agent Builder — you'll build a real, live agent, and everything on this card goes straight in: your loop trace becomes the system prompt, your tool list becomes its tools, and your pattern choice decides how you wire it together. So bring the card."*

### 1:58 – 2:00 — Reflection + Goodbye

→ Paste in chat:

> **Take with you (reply by Friday — two sentences each):**
> 1. Which of the 5 architecture components was missing from the S2 HR Screener — and what specifically broke because of it?
> 2. What's the one tool in your manifest you'd add a human approval gate to — and what's the trigger for escalation?

*"Five sessions in. You've watched an agent fail, built one that works, taught it to read your own documents, and today you opened it right up and named every part. Lovely work today, all of you. See you next time, when we build a real one."*

→ Wave. Stop recording. End meeting.

> **Post-class:** within 24h, send — the workbook (PDF or Google Doc link) · individual replies to the take-home · the calendar invite for Session 6.

---

# FACILITATOR CONTINGENCY GUIDE

## If the Lumière agent is unavailable (S4 not completed or Claude Projects inaccessible)

Have them open a fresh Claude chat and attach Lumiere_KB.md with the paperclip. Paste the loop-trace instruction + the three-constraint question as message 1. The exercise is identical. Say: *"Paperclip fallback — same exercise, same result. The architecture lesson is the same whether the knowledge comes from a Project or a pasted file."*

## If Exercise A runs long (>15 min)

Cut the reflection question (Step 5). Let the filled trace stand without the verbal debrief. Move to break. The trace is the deliverable — the debrief is bonus.

## If Exercise B generates a manifest that's too vague

Use this prompt in the room: *"Now ask Claude: 'For each tool you listed — narrow the scope to ONE sentence describing what it cannot access. And set the permission to the minimum possible.' Paste the output and update your table."*

## If running over at 1:50

Collapse Exercise C to a verbal go-around only — skip the Claude prompt. Ask each learner: *"Orchestrator-Worker, Parallel, or Handoff? One sentence." The pattern choice still goes in the workbook.*

## If running under (at 1:45 with everything done)

Expand Exercise B: *"Add a sixth row — the approval gate itself. When does a human have to sign off? What triggers escalation? What's the timeout if the human doesn't respond?"*

## If the Self-Reflection demo fails (Claude gives a weak critique)

Add to the critique prompt: *"Be specific. Name at least one claim with no data source, one assumption that could be wrong, and one question a skeptical CFO would immediately ask."* If it still fails — skip the demo entirely. It's additive.

## If the HR Screener callback lands badly (learners don't remember it)

Don't push it. Say: *"Any agent that doesn't log what happened when a search fails will eventually invent something. That's the memory gap."* Move on. The hallucination story is the hook, not the lesson.

## Small cohort (≤6 learners — this run)

Call every name in every debrief. No chat scoreboard. Go verbal throughout. Read every Loop Trace stage by name. Get a verbal pattern choice from every learner.

## If someone challenges ("agents are dangerous / will replace my job")

*"That's a real concern and I don't want to wave it away. Here's what I'd say: every tool manifest you wrote today has a human approval gate for the tool that makes you nervous. The architecture you designed today has a human escalation exit condition built in. Understanding how agents work — which is what you did today — is exactly what gives you the ability to scope them, govern them, and decide when they run. That's not something an agent can do for itself."*

---

# PRACTICE RECOMMENDATION

Do a full dry-run alone with a stopwatch the day before.

1. **Run Exercise A yourself.** Use your own Lumière Knowledge Agent. Paste the loop-trace instruction above the three-constraint question. Fill in the 6-box trace yourself — know which boxes the agent fills naturally and which it skips. That's your debrief material.

2. **Run Exercise B yourself.** Draft both manifests — the Lumière Order Assistant and the FSSAI Regulation Monitor — with the workbook prompts. Narrow every scope until you can write the boundary in one sentence. Confirm the monitor escalates every allergen/safety rule and auto-applies only cosmetic ones. Circle your nervous tool.

3. **Time Sprint 2 (The Loop)** — the longest sprint. The invoice recovery trace + the screener gap trace run about 8 minutes. Exit conditions need 2 minutes. Know which sentence to cut if you're 1 minute over.

4. **Know these lines cold:**
   - The anatomy verdict (corrected): *"It wasn't a memory problem — it was a tool problem. No legal tool could fetch real LinkedIn profiles, and no guardrail caught the gap. So it invented."*
   - The loop exit: *"Goal achieved. Max iterations. Human escalation. All three. Without all three, it loops forever."*
   - The tool manifest: *"Scope every tool. Permission every tool. If you can't describe what a tool cannot do — it's not scoped."*
   - The multi-agent callback: *"You built a multi-agent architecture in Session 2 without knowing what to call it. Now you know."*
   - The close: *"That card is not a demo exercise. It is the blueprint for any agent you want to build."*

5. **Estimated dry-run time: 45 minutes.** 20 to run Exercises A and B in the actual tools. 15 to drill the four sprints at pacing. 10 for the HR Screener callbacks — rehearse the anatomy mapping and the loop trace out loud.

---

**Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu**
**EdYoda · GenAI & AI Agents for Non-Coders · S05**
