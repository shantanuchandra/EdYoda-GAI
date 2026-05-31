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

*"Welcome back. Quick one before I say anything else — type one word in the chat: how did Session 4 land for you? The Lumière agent, the knowledge base, the whole build. One word."*

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

*"And I want to start with something specific. The HR Screener you built in Session 2 — the 3-node pipeline, Node 1 searches, Node 2 extracts skills, Node 3 scores candidates. That agent hallucinated LinkedIn URLs when Node 1 came back empty. Some of you caught it. Some of you didn't. Either way — today we name exactly why it happened. Not a Claude problem. An architecture problem — one of the agent's parts was the wrong tool for the job, and nothing was there to catch it. By the end of this session, you'll know exactly which part, and how you'd build it right."*

→ Pause. Let that land.

> **Facilitator note:** The hallucination callback is the emotional hook of this session. Don't rush through it. The pause after "architecture problem" is load-bearing.

### 0:08 – 0:12 — Norms + The One Rule

*"Quick norms — same room, same rules."*

| Norm | What it means |
|---|---|
| **Cameras** | Encouraged, optional. |
| **Chat** | Use freely — questions, reactions, welcome. |
| **Mics** | Stay muted unless called on. |
| **Break** | Real 10 minutes, halfway through. Promise. |
| **Stuck** | Ask live. If it needs more, I'll email it. |
| **Today's tool** | Claude Projects — same one from Session 4. |

*"One rule for today. You came in knowing what agents can do. You leave knowing how they work. The Architecture Card is the proof."*

*"Three moves to get there. Autopsy — we open the HR Screener and the Lumière agent and name every part. Inside the Loop — three exercises that put you in the agent's seat. Design Your Own — you draft the architecture for an agent you'd actually deploy at work. Let's go."*

> ⏱ **Time check: 0:12.** If past 0:10, shorten the one-word check-in debrief. The course story table and the hallucination callback are non-negotiable.

---

## BLOCK 1 — CONCEPT SPRINTS 1–3 (0:12 – 0:42)

**Goal:** Three concepts, each anchored to an agent this cohort built. No new tools. Pure naming — vocabulary for things they already experienced.

**Pacing rule:** ~10 min per sprint. WHAT → WHY → HOW. The HOW is always the cohort's own work. Cut the analogy before you cut the callback.

*"Three fast concepts. Each one is something you've already seen — we're just finally naming it. Same two agents the whole way: the HR Screener from Session 2, and the Lumière Knowledge Agent from Session 4."*

### 0:12 – 0:22 — Sprint 1: Anatomy — Five Components, One Machine

→ Show the anatomy diagram slide.

*"Every agent — any agent, not just yours — is five parts. LLM, Memory, Tools, Planner, Executor. That's it. Five parts, one machine."*

*"LLM is the brain. It reads, reasons, decides. Memory is what it knows — what it can look up or remember. Tools are what it can do — the hands. Planner is the strategy — it decides what to do in what order. Executor is the runner — it takes the plan and actually runs it."*

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

*"Here's the real cause, and I want to be precise about it. Node 1's job was to fetch real, verified LinkedIn profiles. But LinkedIn allows no scraping, no public API, no MCP — there is no legal tool that can pull those profiles. So the web search Node 1 was handed physically could not do the job. It came back empty. That's a TOOL problem — Gap #3 from Session 2."*

*"Now — why did an empty tool become a hallucination? Because there was no guardrail telling it what to do with nothing. With no working tool AND no refusal rule, the model did what models do with a gap: it filled it. Plausible-looking LinkedIn URLs that don't exist."*

*"So two things, kept straight: the cause was the tool — there was no real tool for the job. The fix that was missing was a refusal guardrail — a line that says 'I can't verify these, escalate to a recruiter' instead of inventing. Not a memory problem. A tool problem with no guardrail."*

**Analogy (memorize):** *"Hand someone a job their tools can't do, with no permission to say 'I can't' — and they'll bluff. That's the screener."*

> ⏱ **0:22.** If past it, cut the analogy. Keep the failure walk and the HR Screener mapping.

### 0:22 – 0:34 — Sprint 2: The Loop — Perceive → Reflect

→ Show the loop diagram slide.

*"Agents don't respond once. They loop. Six stages — and they repeat until the goal is met."*

*"Perceive: receive the input. Reason: interpret it in context of memory, tools, and goal. Plan: decide the sequence of actions needed. Act: execute the first action — call a tool, write to a database. Observe: receive the result — success, failure, partial data. Reflect: evaluate — did we meet the goal? If not, loop back to Reason."*

*"The analogy: a great consultant doesn't give up when their first call fails. They try the next contact. That instinct — built in — is what the loop does."*

→ Show the overdue-invoice trace slide.

*"Watch this. Cron trigger fires at 8am — 'run daily overdue check.' The agent Perceives it, Reasons it needs an invoice list, Plans: query NetSuite, draft emails, send each. Acts: sends 14 reminders. Observes: 13 sent, 1 bounced — acme@old.com. Reflects: goal not met for that invoice. Loops back. Plans v2: query Salesforce for a new contact. Acts: resends to cfo@acme-new.com. 14 of 14 sent. Goal achieved."*

*"That's the loop saving you. One bounce, no crash, no apology — replanned and closed it."*

*"Now let's trace your HR Screener through the same loop."*

→ Walk it verbally:

- *"PERCEIVE: job title, location, years of experience — the parameters you gave it."*
- *"REASON: need 5 candidate profiles from LinkedIn."*
- *"PLAN: call web_search with those parameters."*
- *"ACT: called web_search. Returned sparse results — or nothing."*
- *"OBSERVE: the results were empty or useless."*
- *"REFLECT: nothing. No reflection node. No recovery. No 'results were empty, I should stop or escalate.' It filled in what was missing. Invented URLs."*

*"The loop existed in theory. But there was no REFLECT node to catch the failure. Without a reflection step, the agent can't recover."*

*"One more thing. When should an agent stop looping? Three conditions — and you need all three. Goal achieved. Max iterations reached. Human escalation triggered. Without all three, agents loop forever and burn tokens. Your screener had none of the three."*

**Analogy (memorize):** *"The loop is the consultant instinct. The exit conditions are the project manager saying 'stop and escalate if this takes more than three tries.'"*

> ⏱ **0:34.** This sprint earns its full time. Don't rush the invoice trace — it's the visual that makes the loop concrete.

### 0:34 – 0:42 — Sprint 3: Memory — Desk · Notebook · Archive · Library

→ Show the memory types slide.

*"Four memory types. Each solves a different problem. Missing the wrong one breaks a specific thing."*

→ Walk each type (~30 sec each):

- *"Short-term — the desk. The prompt window, the current session. When the chat closes, the desk is cleared. Use case: multi-turn chat, mid-task context."*
- *"Long-term — the notebook. A database — SQL, NoSQL — that persists across sessions. The agent knows who you are the next time you talk. Use case: personalization, customer history."*
- *"Episodic — the archive. Logs and summaries of past interactions. Not just facts — events. 'Last Tuesday the search came back empty.' Use case: audit trails, learning from patterns."*
- *"Semantic — the library. A vector database of domain knowledge. This is what you built in Session 4 — the RAG Docs tab IS semantic memory. Use case: accurate answers from a specific knowledge base."*

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
> **Step 1:** Open your Lumière Knowledge Agent in Claude Projects (same one from Session 4).
>
> **Step 2:** Add this instruction ABOVE your question — copy it exactly:
>
> *"Before answering, trace your own reasoning step by step. Label each stage:*
> *PERCEIVE — what information did you receive?*
> *REASON — what did you interpret from it?*
> *PLAN — what sequence will you follow to answer?*
> *ACT — what did you retrieve from your knowledge?*
> *OBSERVE — what did the results tell you?*
> *REFLECT — what would you do if one part of the answer was missing?"*
>
> **Step 3:** Then ask this question (copy it exactly):
>
> *"A customer wants a 2kg eggless chocolate cake for this Saturday. They also want to know whether the 15% discount code applies to eggless cakes. And they want to know if the Andheri West branch delivers to their area. What's the full answer?"*
>
> **Step 4:** Read the response. Fill in the Loop Trace Sheet in your workbook — one box per stage. If a stage is missing, write: "not visible — add to prompt."
>
> **Step 5:** One reflection: Which stage did the agent skip or compress? What would break if you asked a harder version of this question?
>
> **Fallback (no Lumière agent):** Fresh Claude chat + attach Lumiere_KB.md with the paperclip. Same exercise, same result.

→ Start timer. **Key: 13 min.**

→ Walk the room. Watch for:
- Instruction pasted after the question instead of before — nudge: *"Instruction goes above the question — it shapes the whole response."*
- Agent labels PERCEIVE and REASON but stops there — the prompt may not be strong enough. Nudge: add "Be thorough on every label."
- Clean 6-stage output — call it out by name: *"[Name]'s agent labelled all six stages. That's the architecture working."*
- REFLECT is most often the thinnest or missing stage — that's the design lesson.

*"Let's hear a few of these. [Name] — which stage was missing or thin for you?"*

→ Read 2–3 traces aloud by name. The room should converge on REFLECT as the weakest.

*"Every agent that skips REFLECT has a version of the HR Screener problem — it can't catch its own failures. That's architectural. And now you know how to fix it: add a reflection step. That trace is Section 1 of your Architecture Card."*

> ⏱ **Pre-break anchor at 0:54:**
> *"If your loop trace has all 6 boxes filled — even the 'not visible' ones — that's the milestone. Real break, now."*

---

## HARD BREAK (0:55 – 1:05) — 10 MINUTES, NON-NEGOTIABLE

→ Show break slide with countdown timer.

*"Real ten minutes. Cameras off, mics off, get away from the screen. Back at the exact clock time on the slide. Go."*

→ **Use the break:**
- DM any learner whose loop trace showed blank REFLECT. Send: *"Try adding 'If any part of the answer is missing from the document, say what you'd search for next' to the instruction line. That forces a reflection output."*
- If two or more learners had the same fallback issue, plan a 30-second mention at the top of Block 3.

→ When you return: *"Welcome back. You just traced an agent's reasoning loop. Now we give it hands — tools — and a strategy for thinking."*

---

## BLOCK 3 — CONCEPT SPRINTS 4–5 + EXERCISE B (1:05 – 1:40)

**Goal:** Tools and planning concepts, then the Tool Manifest exercise — the governance document every deployed agent needs.

### 1:05 – 1:15 — Sprint 4: Tools — The Agent's Hands

→ Show the tools slide.

*"Tools are the agent's hands. The LLM is the mind that picks them up. Four categories."*

→ Walk the grid:

- *"Information tools — read, search, query. Web search, database query, document reader, calendar reader."*
- *"Action tools — write, send, update. Email sender, CRM updater, form submitter, code executor."*
- *"Communication tools — notify, message. Slack, Teams, webhook."*
- *"Computation tools — calculate, transform. Calculator, data transformer, spreadsheet processor."*

*"How tool-calling works in five steps. LLM decides a tool is needed. Generates a structured call — name plus parameters. Executor runs the tool. Result returns to LLM. LLM uses it in the next reasoning step."*

→ Show the Recruitment Agent manifest:

*"Here's a real tool manifest. Recruitment agent. Five tools. Watch the scope and permission columns."*

→ Walk each row:

- *"Resume Reader — read-only, parse PDFs. Can it write? No."*
- *"Calendar API — read and write, but only the recruiter's calendar. Not the whole company."*
- *"Email Sender — send, but templated only. No free text. The agent picks from approved templates."*
- *"ATS Writer — write, audited. Every write is logged. Candidate records only."*
- *"Slack Notifier — post, templated, #hiring-ops channel only."*

*"Every row has a boundary — something it explicitly cannot do. That's the point."*

→ Ask the room: *"Which of those five tools would make your legal team nervous if it weren't scoped — and why?"*

→ Let 2–3 respond. Usually Calendar API or Email Sender — validate both.

*"Wrong tool — error — reflect — right tool. The loop saves you from wrong tool calls. But a tool with no scope boundary? That's a different failure — the loop runs the wrong-scoped tool correctly, and you've already changed something in the world. No recovery."*

*"Scope every tool. Permission every tool. If you can't describe in one sentence what a tool cannot do — it's not scoped enough."*

**Analogy (memorize):** *"A tool manifest is the employment contract for each of the agent's hands."*

> ⏱ **1:15.** If past it, cut the tool-calling mechanics (5-step sequence). The manifest walkthrough and the legal question are non-negotiable.

### 1:15 – 1:23 — Sprint 5: Planning — Three Ways to Think

→ Show the planning strategies slide.

*"Three ways an agent can think through a task. Same task — three different paths, three different outputs, three different costs."*

- *"ReAct — Reason plus Act, interleaved. Think. Do something. See what happened. Think again. Best for tool-heavy tasks where you need live data."*
- *"Chain-of-Thought — pure reasoning chain. No tools. Step 1, step 2, step 3, conclusion. Best for complex analysis where the answer is already in the agent's knowledge."*
- *"Self-Reflection — draft, critique, redraft. The agent writes something, critiques itself, improves it. Best for high-stakes outputs — reports, proposals, anything that needs to be right before it ships."*

→ One example, three paths: *"Should we expand into Southeast Asia?"*

- *"ReAct: web search for GDP growth, CRM lookup for competitors, finance API for cash runway. Live data brief."*
- *"Chain-of-Thought: define criteria, list markets, score each on six factors, rank and recommend. No tools."*
- *"Self-Reflection: v1 says 'yes, expand to Vietnam.' Critique: 'why not Indonesia?' v2: 'Vietnam first, then Indonesia.' Critique: 'cash for two markets?' v3: 'Vietnam Q1, Indonesia if ARR target hit.' Each pass tightens it."*

*"Three questions to pick the right strategy. Task complexity — simple lookup? CoT. Multi-source live data? ReAct. Open-ended, high-stakes? Reflection. Tool dependency — needs live tools? ReAct. Internal reasoning only? CoT or Reflection. Output quality — high-stakes deliverable? Reflection. Internal analysis? CoT. Speed matters? ReAct."*

*"You don't memorize strategy names. You answer three questions and the right strategy picks itself."*

**Analogy (memorize):** *"ReAct is the detective who interviews witnesses. CoT is the analyst at the whiteboard. Self-Reflection is the lawyer who reads the brief twice before signing."*

> ⏱ **1:23.** Keep this to 8 minutes. The 3-question selector is the only thing that needs to land.

### 1:23 – 1:40 — EXERCISE B: Tool Manifest (17 min)

*"Exercise B — 17 minutes. You're going to design the employment contracts for your agent's hands. Think of a real agent you'd want at work. One sentence to describe its job. Use the Claude prompt to generate a first draft — then narrow it."*

→ Paste in chat:

> **EXERCISE B — Tool Manifest (17 min):**
>
> **Step 1:** Think of a real agent you'd want at your job. One sentence to describe what it does.
>
> **Step 2:** Use this Claude prompt (paste into a fresh chat, replace the bracketed part):
>
> *"I want to design an agent that [describe the job — one sentence]. List 5 tools it would need. For each tool: name it, describe what it does in one sentence, suggest the narrowest possible scope (what it explicitly cannot access), recommend the minimum permission level required (read / read+write / send / execute), and tell me what breaks if this tool is removed."*
>
> **Step 3:** Edit the output into the Tool Manifest table in your workbook. The first draft is always too broad on scope and too permissive on permission. Narrow both.
>
> **Step 4:** Circle one tool that makes you nervous. That's the one your legal team will ask about first.

→ Start timer. **Key: 17 min.**

→ Walk the room. Watch for:
- Scope written as "access to CRM" — not a scope. *"What specifically can't it touch? Write that."*
- Permission written as "full access" — *"Minimum means: what's the least access it needs to do its job?"*
- A send or execute tool with no scope boundary — *"That's your nervous tool. Circle it."*

*"Let's hear the nervous tools. [Name] — what's yours and why?"*

→ Each learner reads their nervous tool aloud.

*"Every nervous tool is a write or send tool with scope that's still too broad. The fix is always the same: narrow the scope to one sentence, or add a human approval gate before the tool runs. That manifest is Section 2 of your Architecture Card — and the first document you show anyone who asks 'what can this agent do?'"*

> ⏱ **1:40.** If learners are still writing at 1:38, give a 2-minute warning. A 4-row manifest is fine.

---

## BLOCK 4 — MULTI-AGENT + EXERCISE C (1:40 – 1:55)

**Goal:** Name the three multi-agent patterns. Show the cohort they already built one. Exercise C: pattern choice for their own agent.

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

*"When one agent isn't enough. Three patterns."*

→ Walk each pattern + analogy:

- *"Orchestrator-Worker — a project manager delegating to a team of specialists. The orchestrator receives the task, breaks it into subtasks, routes each to a worker. Workers do focused work. Orchestrator synthesizes. Best for complex tasks with sequential dependencies."*
- *"Parallel Agents — multiple analysts splitting a shared queue. Same task, divided into batches, each agent takes one batch. Speed is the win. Best for independent sub-tasks where volume is the bottleneck."*
- *"Specialist Handoffs — a relay race. Each agent handles one phase, then hands to the next. Ticket → Classifier → Resolver → Escalate → Follow-up. Best for distinct sequential phases where each phase needs different expertise."*

*"Now — the callback I've been waiting to make."*

*"Your HR Screener from Session 2 was a Specialist Handoffs pattern. Node 1 searched for candidates. Node 2 extracted the top 5 skills for the job title. Node 3 scored the candidates. Three specialists, in sequence, each handing to the next. You built a multi-agent architecture in Session 2 without knowing what to call it. Now you know."*

→ Pause. Let that land.

*"Design question: would your agent get faster with more agents running in parallel — or more reliable with one agent checking the other's work? That one question picks the pattern."*

**Analogy (memorize):** *"Orchestrator-Worker is the manager. Parallel Agents is the assembly line. Specialist Handoffs is the relay race."*

> ⏱ **1:50.** Sprint 6 is deliberately short. The HR Screener callback is the moment — everything else supports it.

### 1:50 – 1:55 — EXERCISE C: Pattern Choice (5 min)

*"Exercise C — 5 minutes. Pattern choice for your own agent. Use the prompt in your workbook. I'll call on each of you while you work."*

→ Paste in chat:

> **EXERCISE C — Pattern Choice (5 min):**
>
> **Step 1:** Use this Claude prompt (replace the bracketed part):
>
> *"I want to build an agent that [describe the same job as Exercise B]. Which of these three patterns fits best — Orchestrator-Worker, Parallel Agents, or Specialist Handoffs — and why? Walk me through the choice. Then tell me: what breaks if I use the wrong pattern?"*
>
> **Step 2:** Read the recommendation. Agree or push back. Write in your workbook: "I'm using [pattern name] because [one sentence]. The risk if I use the wrong pattern: [one sentence]."

→ Start timer. **Key: 5 min.** While they work, call on each learner by name:

*"[Name] — what pattern does Claude recommend for your agent? Do you agree?"*

→ The disagreements are often the best moments — when the learner knows their use case better than the model's first answer. Praise those explicitly.

> ⏱ **1:55.** Pivot to close.

---

## BLOCK 5 — CLOSE (1:55 – 2:00)

### 1:55 – 1:57 — Synthesis

*"Step back. The HR Screener hallucinated LinkedIn URLs. We now know why — the tool couldn't do the job (no legal way to fetch real profiles) and there was no guardrail to catch the gap. That's not a bug in the model. It's a design choice — the wrong tool, no refusal rule. And a choice is something you can make differently. You now know how."*

*"Flip to your workbook. Three sections. Loop Trace — you read an agent's reasoning, named every stage, found the gap. Tool Manifest — you designed the governance layer, found your nervous tool, wrote the scope. Pattern Choice — you picked the architecture and defended it in one sentence."*

*"That card is not a demo exercise. It is the blueprint for any agent you want to build — not for Lumière, not for a classroom, for your job."*

### 1:57 – 1:58 — Forward Bridge

*"Session 6: EdYoda Agent Builder — Build and Host Your First Agent. Bring the Architecture Card. The system prompt in Section 1, the nodes in Section 2, the pattern in Section 3 — they all go into the Builder."*

### 1:58 – 2:00 — Reflection + Goodbye

→ Paste in chat:

> **Take with you (reply by Friday — two sentences each):**
> 1. Which of the 5 architecture components was missing from the S2 HR Screener — and what specifically broke because of it?
> 2. What's the one tool in your manifest you'd add a human approval gate to — and what's the trigger for escalation?

*"Five sessions. You've watched an agent fail, built one that works, grounded it in documents, and today opened it up and named every part. See you for architecture in action — Session 6."*

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
