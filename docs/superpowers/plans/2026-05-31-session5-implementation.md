# Session 5 — Agent Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all Session 5 assets — folder, facilitator script, learner workbook, learner deck (HTML), and presenter deck (HTML) — for "Agent Architecture: How Agents Think, Remember & Act."

**Architecture:** Five sequential deliverables produced in README workflow order (script → workbook → learner deck → presenter deck). All assets use the locked EdYoda design system (dark/teal for presenter, paper/terra for learner). The session spine is Autopsy → Inside the Loop → Design Your Own. Walk-out artifact is the Agent Architecture Card (3 workbook sections, each with a reusable Claude prompt). No new platform — Claude Projects (same as S4).

**Tech Stack:** Markdown (script + workbook), HTML/CSS/JS (presenter + learner decks), design tokens from S4 `presenter_deck.html` + `learner_deck.html` (copy `:root` verbatim). Fonts: Inter + JetBrains Mono (presenter), Fraunces + Geist + Geist Mono (learner). Google Fonts CDN. No build step — all self-contained.

**Spec reference:** `docs/superpowers/specs/2026-05-31-session5-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `Session 05 - Agent Architecture/` | Create directory | Session folder |
| `Session 05 - Agent Architecture/deck - Agent.pdf` | Move from root | Reference material (already exists at project root) |
| `Session 05 - Agent Architecture/01_Facilitator_Script.md` | Create | Full 120-min run sheet with say/do/watch/timing |
| `Session 05 - Agent Architecture/02_Learner_Workbook.md` | Create | Architecture Card template + all 3 exercises with Claude prompts |
| `Session 05 - Agent Architecture/learner_deck.html` | Create | Paper/terra editorial reading deck (static `<section>` per slide) |
| `Session 05 - Agent Architecture/presenter_deck.html` | Create | Dark/teal cockpit deck (JS `slides` data array) |

---

## Task 1: Create folder and move PDF

**Files:**
- Create: `Session 05 - Agent Architecture/` (directory)
- Move: `deck - Agent.pdf` → `Session 05 - Agent Architecture/deck - Agent.pdf`

- [ ] **Step 1: Create the session directory**

```bash
mkdir "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/Session 05 - Agent Architecture"
```

Expected: directory created, no output.

- [ ] **Step 2: Move the reference PDF**

```bash
mv "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/deck - Agent.pdf" \
   "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/Session 05 - Agent Architecture/deck - Agent.pdf"
```

Expected: file disappears from root, appears in session folder.

- [ ] **Step 3: Verify**

```bash
ls "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/Session 05 - Agent Architecture/"
```

Expected output: `deck - Agent.pdf`

- [ ] **Step 4: Commit**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI"
git add "Session 05 - Agent Architecture/"
git commit -m "feat(s5): create session folder and move deck-agent.pdf reference"
```

---

## Task 2: Write the Facilitator Script

**Files:**
- Create: `Session 05 - Agent Architecture/01_Facilitator_Script.md`

The script is the source of truth for all other assets. Write it first. Every `say:` line must be speakable aloud. No timestamps on learner-facing artifacts (those live here only). Follow the exact block/slot structure from the spec.

- [ ] **Step 1: Create the file with the full script**

Create `Session 05 - Agent Architecture/01_Facilitator_Script.md` with this exact content:

```markdown
# Facilitator Script — Agent Architecture: How Agents Think, Remember & Act (Session 5 of 8)

**Subtitle:** *By the end of this session, you'll trace the reasoning loop of any agent, design its memory and tool architecture, choose the right multi-agent pattern, and walk out with a complete Architecture Card for an agent you want to deploy at work.*
**Duration:** 120 minutes · **Format:** Live virtual (Zoom/Meet) · **Audience:** Same room as S1–S4 — mixed India + international; marketing/sales, finance/consulting, at least one doctor.
**Spine:** Autopsy → Inside the Loop → Design Your Own
**Hands-on share:** ~45% (≈54 min across 3 exercises)
**Build artifact:** Every learner completes their Agent Architecture Card — three sections in the workbook: Loop Trace (Exercise A) + Tool Manifest (Exercise B) + Pattern Choice (Exercise C), each with a reusable Claude prompt they keep for S6.
**Tools assumed:** Claude Projects (same as S4 — no new onboarding), Claude.ai (fresh chat for the optional self-reflection demo).

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] Send a 1-line email to all learners: *"Tomorrow, open your Session 4 Lumière Knowledge Agent in Claude Projects. We'll be using it in the first exercise. See you at [time]."* Include the calendar link.
- [ ] Send the **Session 5 Learner Workbook** as a Google Doc (view-only). Confirm the link is in the calendar invite and the day-of email.
- [ ] **Run Exercise A yourself end-to-end.** Open your Lumière Knowledge Agent. Paste the loop-trace instruction line above the three-constraint question. Read what the agent returns and fill in the 6-box trace yourself. Know which stages it skips — that's your debrief material.
- [ ] **Run Exercise B yourself.** Pick an agent scenario from your own work. Use the Claude prompt to generate a tool manifest. Narrow every scope. Circle your nervous tool. This is your demo in the debrief.
- [ ] **Optional: Prepare the Self-Reflection demo** (Block 4 opener, 3 min). Open a fresh Claude chat. Draft the Pune branch recommendation prompt and the critique prompt. Confirm the critique comes back sharp and specific.
- [ ] Pre-load browser tabs:
  1. **Lumière Knowledge Agent** — Claude Projects, your own agent from S4, open and ready
  2. **Fresh Claude chat** — for the optional self-reflection demo
  3. **Session 5 Learner Workbook** — open to Exercise A
  4. **Backup: Lumiere_KB.md** — open in a text editor if anyone's S4 agent is unavailable
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] **Cohort note (this run):** ~6 learners expected. Call every learner by name in every exercise debrief. Go verbal — no chat scoreboard. Read every loop trace, every manifest nervous-tool, every pattern choice by name.
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

**Goal:** Re-establish the room with the cumulative course story. Name the S2 hallucination bug precisely and with care — this is the hook that makes the session personal. Set today's promise.

### 0:00 – 0:03 — Cold Open · one-word check-in

*"Welcome back. Quick one before I say anything else — type one word in the chat: how did Session 4 land for you? The Lumière agent, the knowledge base, the whole build. One word."*

→ Wait 30 seconds. Read **every response** out loud, **by name**. With this cohort size, every name gets called.

*"Thank you [Name], thank you [Name]… I'm hearing 'useful', 'dense', 'eye-opening.' That's the right baseline. Last session gave your agent a brain — Lumière's own documents, cited, grounded. Today we open that brain up."*

> **Why this works:** Same cold-open ritual as every session. Continuity signals "we're picking up where we left off." Everyone who typed in the first 90 seconds stays engaged.

### 0:03 – 0:08 — The Course Story So Far

*"Before we go anywhere new — let me show you how far we've actually come."*

→ Show the Course Story slide. Walk the table, one row at a time. Keep each row to one breath:

| Session | Promise | What you built |
|---|---|---|
| S1 | LLMs can generate — but they can't act | Watched the bakery campaign fail 4 of 6 steps |
| S2 | An agent can do what a chatbot can't | Built the HR Candidate Screener — 3 nodes: search → skills → score |
| S3 | The right prompt makes an agent reliable | Wrote system prompts that controlled tone, format, and refusal |
| S4 | Ground the agent in your own documents | Built the Lumière Knowledge Agent — cited its source, refused when it didn't know |
| **S5** | **Open the hood — understand WHY agents work, break, and scale** | **Agent Architecture Card — yours, for your job** |

*"That's four sessions of building. What we've never done is open one of those agents up and name every part. Today we do that."*

*"And I want to start with something specific. The HR Screener you built in Session 2 — the 3-node pipeline, Node 1 searches, Node 2 extracts skills, Node 3 scores candidates. That agent hallucinated LinkedIn URLs when Node 1 came back empty. Some of you caught it. Some of you didn't. Either way — today we name exactly why it happened. Not a Claude problem. An architecture problem. A component that was missing. By the end of this session, you'll know what it was, and you'll know how to add it."*

→ Pause. Let that land.

### 0:08 – 0:10 — Norms + The One Rule

*"Quick norms — same room, same rules, I'll be fast."*

| Norm | What it means |
|---|---|
| **Cameras** | Encouraged, optional. |
| **Chat** | Use freely — questions, reactions, welcome. |
| **Mics** | Stay muted unless called on. |
| **Break** | Real 10 minutes, ~halfway. Promise. |
| **Stuck** | Ask live. If it needs more, I'll email it. |
| **Today's tool** | Claude Projects — same one from Session 4. |

*"One rule for today. You came in knowing what agents can do. You leave knowing how they work. The Architecture Card is the proof."*

*"Three moves. Autopsy — we open the HR Screener and the Lumière agent and name every part. Inside the Loop — three exercises that put you in the agent's seat. Design Your Own — you draft the architecture for an agent you'd actually deploy at work. Let's go."*

> ⏱ **Time check: 0:12.** If past 0:10, shorten the one-word check-in. The course story table and the hallucination callback are non-negotiable.

---

## BLOCK 1 — CONCEPT SPRINTS 1–3 (0:12 – 0:42)

**Goal:** Three concepts, each anchored to an agent this cohort built. No new tools. No new platforms. Pure naming — giving them vocabulary for things they already experienced.

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

- *"LLM: Claude Sonnet running each node."*
- *"Memory: nothing. Genuinely nothing — no memory component was configured. That is the bug we're naming today."*
- *"Tools: native web search on Node 1. That's it."*
- *"Planner: the 3-node sequence you designed. Implicit plan — baked into the pipeline."*
- *"Executor: the Agent Builder pipeline runner."*

*"The screener had no memory. That's not a Claude problem. That's a design choice you didn't know you were making. When Node 1 came back empty — no profiles found — there was no memory component to log that failure, no place to store 'I already looked this up, it came back empty, don't invent something.' So it invented something. LinkedIn URLs that don't exist."*

*"That's the anatomy. Five parts. Your screener was missing one."*

**Analogy (memorize):** *"An agent without memory is a brilliant expert who forgets every conversation the moment it ends."*

> ⏱ 0:22. If you're past it, cut the analogy. Keep the failure walk and the HR Screener mapping.

### 0:22 – 0:34 — Sprint 2: The Loop — Perceive → Reflect

→ Show the loop diagram slide.

*"Agents don't respond once. They loop. Six stages — and they repeat until the goal is met."*

*"Perceive: receive the input — a message, an API trigger, a scheduled event. Reason: interpret it in context of memory, tools, and goal. Plan: decide the sequence of actions needed. Act: execute the first action — call a tool, write to a database. Observe: receive the result — success, failure, partial data. Reflect: evaluate — did we meet the goal? If not, loop back to Reason."*

*"The analogy I want you to remember: a great consultant doesn't give up when their first call fails. They try the next contact. That instinct — built in — is what the loop does."*

→ Show the overdue-invoice trace slide (slide 07 from the reference deck).

*"Watch this. Cron trigger fires at 8am — 'run daily overdue check.' The agent Perceives it, Reasons it needs an invoice list, Plans: query NetSuite, draft emails, send each. Acts: sends 14 reminders. Observes: 13 sent, 1 bounced — acme@old.com. Reflects: goal not met for that invoice. Loops back. Plans v2: query Salesforce for a new contact. Acts: resends to cfo@acme-new.com. 14 of 14 sent. Goal achieved."*

*"That's the loop saving you. One bounce, no crash, no apology — replanned and closed it."*

*"Now let's trace your HR Screener through the same loop."*

→ Walk it:

- *"PERCEIVE: job title, location, years of experience — the parameters you gave it."*
- *"REASON: need 5 candidate profiles from LinkedIn."*
- *"PLAN: call web_search with those parameters."*
- *"ACT: called web_search. Returned sparse results — or nothing."*
- *"OBSERVE: the results were empty or useless."*
- *"REFLECT: nothing. No reflection node. No recovery. No 'results were empty, I should stop or escalate.' It just... filled in what was missing. Invented URLs."*

*"The loop existed in theory — there's a loop built into the Agent Builder pipeline. But there was no REFLECT node to catch the failure. Without a reflection step, the agent can't recover."*

*"One more thing. When should an agent stop looping? Three conditions — and you need all three. Goal achieved. Max iterations reached. Human escalation triggered. Without all three, agents loop forever and burn tokens. Your screener had none of the three."*

**Analogy (memorize):** *"The loop is the consultant instinct. The exit conditions are the project manager saying 'stop and escalate if this takes more than three tries.'"*

> ⏱ 0:34. This sprint earns its full time — don't rush the overdue-invoice trace. It's the visual that makes the loop concrete.

### 0:34 – 0:42 — Sprint 3: Memory — Desk · Notebook · Archive · Library

→ Show the memory types slide.

*"Last concept before Exercise A. Four memory types. Each solves a different problem. Missing the wrong one breaks a specific thing."*

→ Walk each type, one at a time (~30 sec each):

- *"Short-term — the desk. The prompt window, the current session. Everything you've said in this conversation. When the chat closes, the desk is cleared. Use case: multi-turn chat, mid-task context."*
- *"Long-term — the notebook. A database — SQL, NoSQL — that persists across sessions. The agent knows who you are the next time you talk. Use case: personalization, customer history."*
- *"Episodic — the archive. Logs and summaries of past interactions. Not just facts — events. 'Last Tuesday the search came back empty. Last Thursday the customer cancelled.' Use case: audit trails, learning from patterns."*
- *"Semantic — the library. A vector database of domain knowledge. This is what you built in Session 4 — the RAG Docs tab in Claude Projects IS semantic memory. Use case: accurate answers from a specific knowledge base."*

*"Now the side-by-side that matters."*

→ Walk both agents:

- *"HR Screener — had short-term only. The prompt window. When Node 1 returned empty results, there was no episodic memory to log 'search failed, do not invent.' The missing type was episodic — the archive."*
- *"Lumière Knowledge Agent — had semantic memory. The RAG Docs you uploaded. It answers the Saturday cake question correctly because the answer is in the library. But ask it 'what did we discuss last week?' and it has nothing. No episodic memory, no long-term memory. It knows Lumière's policies. It forgets every conversation."*

*"You built semantic memory in Session 4. You've been using short-term memory in every session since Session 1. Today you learn the names for all four — so you can design the ones that are missing."*

**Analogy (memorize):** *"Desk, notebook, archive, library. Every office has all four. Agents do too — they just don't come configured out of the box."*

> ⏱ 0:42. Three concepts, all anchored in what this cohort built. If Sprint 3 is running short, prioritize the side-by-side — that's where the insight lands. The analogies are optional if time is tight.

*"Concepts are named. Now we stop talking about agents and we get inside one. Open your workbook to Exercise A."*

---

## EXERCISE A — LOOP TRACE (0:42 – 0:55)

**Goal:** Every learner runs a multi-constraint question against their Lumière agent, makes the loop visible, and fills in the 6-box Loop Trace Sheet. This IS the first section of the Architecture Card.

*"Exercise A — 13 minutes. You're going to read an agent's mind. Not describe how it thinks — actually read it, stage by stage."*

*"Two things to paste. First — an instruction that makes the loop visible. Second — the question. I'll paste both in the chat now."*

→ Paste in chat:

> **EXERCISE A — Loop Trace (13 min):**
>
> **Step 1 — Open your Lumière Knowledge Agent** in Claude Projects (same one from Session 4).
>
> **Step 2 — Add this instruction ABOVE your question** (this makes the loop visible):
>
> *"Before answering, trace your own reasoning step by step. Label each stage:*
> *PERCEIVE — what information did you receive?*
> *REASON — what did you interpret from it?*
> *PLAN — what sequence will you follow to answer?*
> *ACT — what did you retrieve from your knowledge?*
> *OBSERVE — what did the results tell you?*
> *REFLECT — what would you do if one part of the answer was missing?"*
>
> **Step 3 — Then ask this question (copy it exactly):**
>
> *"A customer wants a 2kg eggless chocolate cake for this Saturday. They also want to know whether the 15% discount code applies to eggless cakes. And they want to know if the Andheri West branch delivers to their area. What's the full answer?"*
>
> **Step 4 — Read the response. Fill in the Loop Trace Sheet** in your workbook — one box per stage. If a stage is missing from the output, write: "not visible — add to prompt."
>
> **Step 5 — One reflection:** Which stage did the agent skip or compress? What would break if you asked a harder version of this question?
>
> **Fallback:** No Lumière agent? Paste the instruction and question into a fresh Claude chat. Attach Lumiere_KB.md with the paperclip. Exact same exercise.

→ Start timer. **Key: 13 min.**

→ Walk the room. Watch for:

- Agents that label PERCEIVE and REASON but stop there — the loop prompt isn't strong enough, or they pasted it after the question instead of before. Nudge: *"Instruction goes above the question — it needs to shape the whole response."*
- Agents that give a beautiful PLAN but skip ACT and OBSERVE — the knowledge base is answering without surfacing its retrieval step. Normal. Have them note it in the "not visible" field.
- Anyone who gets an agent that labels all 6 stages clearly — call that out by name: *"[Name]'s agent labelled all six stages. That's the architecture working."*
- The reflection question: most will identify REFLECT as the weakest or most compressed stage. That's the right answer — and it's exactly what failed in the HR Screener.

*"Let's hear a few of these."*

→ Read 2–3 traces aloud by name. Ask: *"Which stage was missing or thin for you?"* The room should converge on REFLECT.

*"Every agent that skips REFLECT has a version of the HR Screener problem — it can't catch its own failures. That's architectural. And now you know how to fix it: add a reflection step. In the workbook, that trace is Section 1 of your Architecture Card."*

> ⏱ 0:55. Pre-break anchor:
> *"If your loop trace has all 6 boxes filled — even the 'not visible' ones — that's the milestone. Real break, now."*

---

## HARD BREAK (0:55 – 1:05) — 10 MINUTES, NON-NEGOTIABLE

→ Show break slide with countdown timer.

*"Real ten minutes. Cameras off, mics off, get away from the screen. Back at the exact clock time on the slide. Go."*

→ **Use the break:**
- DM any learner whose loop trace showed blank REFLECT or ACT. Send this nudge: *"Try this: add 'If any part of the answer is missing from the document, say what you'd search for next' to the instruction line. That forces a reflection output."*
- If two or more learners had the same fallback issue (agent unavailable), plan a 30-second mention at the start of Block 3.

→ When you return: *"Welcome back. You just traced an agent's reasoning loop. Now we give it hands — tools — and a strategy for thinking."*

---

## BLOCK 3 — CONCEPT SPRINTS 4–5 + EXERCISE B (1:05 – 1:40)

**Goal:** Tools and planning concepts, then the Tool Manifest exercise — the governance document every deployed agent needs.

### 1:05 – 1:15 — Sprint 4: Tools — The Agent's Hands

→ Show the tools slide.

*"Tools are the agent's hands. The LLM is the mind that picks them up. Four categories."*

→ Walk the grid:

- *"Information tools — read, search, query. Web search, database query, document reader, calendar reader. The agent looks things up."*
- *"Action tools — write, send, update. Email sender, CRM updater, form submitter, code executor. The agent changes things in the world."*
- *"Communication tools — notify, message. Slack, Teams, webhook. The agent tells people things."*
- *"Computation tools — calculate, transform. Calculator, data transformer, spreadsheet processor. The agent crunches numbers."*

*"One more thing — how tool-calling actually works. Five steps. The LLM decides a tool is needed. It generates a structured call — name plus parameters. The executor runs the tool. The result returns to the LLM. The LLM uses it in the next reasoning step."*

→ Show the Recruitment Agent manifest (from the reference deck):

*"Here's a real tool manifest. Recruitment agent. Five tools."*

→ Walk each row:
- *"Resume Reader — read-only, parses PDFs. Can it send emails? No. Scope: read-only."*
- *"Calendar API — read and write, but only the recruiter's calendar. Not the whole company calendar. Not HR's calendar. One calendar."*
- *"Email Sender — send, but templated only. No free text. The agent cannot compose an original email. It picks from approved templates."*
- *"ATS Writer — write, audited. Every write is logged. Candidate records only — not salaries, not internal notes."*
- *"Slack Notifier — post, templated, #hiring-ops channel only. Not DMs. Not other channels."*

*"Notice what every row has in common. Scope is narrow. Permission is minimum. Every tool has a boundary — something it explicitly cannot do."*

→ Ask the room: *"Which of those five tools would make your legal team nervous if it weren't scoped — and why?"*

→ Let 2–3 respond (or answer yourself if the room is quiet). Usually Calendar API or Email Sender.

*"Wrong tool — error — reflect — right tool. The loop saves you. But a tool with no scope boundary? That's a different kind of failure. The loop runs the wrong tool correctly, and you've already changed something in the world. No recovery."*

*"Scope every tool. Permission every tool. If you can't describe in one sentence what a tool cannot do — it's not scoped enough."*

**Analogy (memorize):** *"A tool manifest is the employment contract for each of the agent's hands."*

> ⏱ 1:15. If past it, cut the tool-calling mechanic (5 steps). The manifest walkthrough and the legal question are non-negotiable.

### 1:15 – 1:23 — Sprint 5: Planning — Three Ways to Think

→ Show the planning strategies slide.

*"Three ways an agent can think through a task. Same task — three different paths, three different outputs, three different costs."*

- *"ReAct — Reason plus Act, interleaved. Think. Do something. See what happened. Think again. Best for tool-heavy tasks where you need live data. The agent is improvising with real information."*
- *"Chain-of-Thought — pure reasoning chain. No tools. Step 1, step 2, step 3, conclusion. Best for complex analysis and multi-variable decisions where the answer is already in the agent's knowledge."*
- *"Self-Reflection — draft, critique, redraft. The agent writes something, then critiques itself, then improves it. Best for high-stakes outputs — reports, proposals, anything that needs to be right before it ships."*

→ One example, three paths (from the reference deck): *"Should we expand into Southeast Asia?"*

- *"ReAct: web search for GDP growth, CRM lookup for competitors, finance API for cash runway. Live data brief. Fast. Dependent on what the tools return."*
- *"Chain-of-Thought: define criteria, list markets, score each on six factors, weight by strategic fit, rank and recommend. No tools. Structured framework decision."*
- *"Self-Reflection: v1 says 'yes, expand to Vietnam.' Critique: 'why not Indonesia?' v2 says 'Vietnam first, then Indonesia.' Critique: 'cash for two markets?' v3 says 'Vietnam Q1, Indonesia if ARR target is hit.' Each pass tightens the answer."*

*"Three questions to pick the right strategy:"*

1. *"Task complexity — simple lookup? CoT. Multi-source live data? ReAct. Open-ended, high-stakes? Reflection."*
2. *"Tool dependency — needs live tools? ReAct. Internal reasoning only? CoT or Reflection."*
3. *"Output quality — high-stakes deliverable? Reflection. Internal analysis? CoT. Speed matters? ReAct."*

*"You don't memorize the strategy names. You answer three questions and the right strategy picks itself."*

**Analogy (memorize):** *"ReAct is the detective who interviews witnesses. CoT is the analyst at the whiteboard. Self-Reflection is the lawyer who reads the brief twice before signing."*

> ⏱ 1:23. Keep this to 8 minutes. The 3-question selector is the only thing that needs to land. The strategy names are just handles for it.

### 1:23 – 1:40 — EXERCISE B: Tool Manifest (17 min)

**Goal:** Every learner designs a 5-row Tool Manifest for an agent they want to deploy at work. Every row forces a governance decision.

*"Exercise B — 17 minutes. You're going to design the employment contracts for your agent's hands."*

*"Think of a real agent you'd want at work. Not a demo agent — a real one. Customer support, contract review, sales research, financial reporting, HR screening, whatever fits your job. You've been circling this since Session 2. Now we build the governance layer for it."*

→ Paste in chat:

> **EXERCISE B — Tool Manifest (17 min):**
>
> **Step 1 — Use this Claude prompt** to generate a first draft (paste into a fresh Claude chat or your Lumière Project):
>
> *"I want to design an agent that [describe the job your agent would do at your work — one sentence]. List 5 tools it would need. For each tool: name it, describe what it does in one sentence, suggest the narrowest possible scope (what it explicitly cannot touch), recommend the minimum permission level required (read / read+write / send / execute), and tell me what breaks if this tool is removed."*
>
> **Step 2 — Edit the output** into the Tool Manifest table in your workbook. The first draft is always too broad on scope and too permissive on permission. Narrow both.
>
> **Step 3 — Circle one tool** in your manifest that makes you nervous. That's the one your legal team will ask about first.
>
> **Workbook table:**
>
> | Tool name | What it does (1 sentence) | Scope — what it cannot do | Permission | What breaks if removed |
> |---|---|---|---|---|
> | | | | | |
> | | | | | |
> | | | | | |
> | | | | | |
> | | | | | |

→ Start timer. **Key: 17 min.**

→ Walk the room. Watch for:

- Scope written as "access to CRM" — not a scope. Prompt them: *"What specifically can't it touch? Customer financials? Internal notes? Other reps' pipelines? Write that."*
- Permission written as "full access" or "admin" — not a permission level. *"Minimum means: what's the least access it needs to do its job? Read-only if it only needs to look things up. Read+write only if it has to change records."*
- A learner who has a send or execute tool with no scope boundary — flag it: *"That's your nervous tool. Circle it."*
- Good manifests: narrow scope, minimum permission, a clear "what breaks" that maps to the agent's job. Praise these by name.

*"Let's hear the nervous tools."*

→ Each learner reads their nervous tool aloud. After all responses:

*"Every nervous tool is a write or send tool with scope that's still too broad. That's not a design failure — that's the design process working. You found the risk before the agent did. The fix is always the same: narrow the scope to one sentence, or add a human approval gate before the tool runs."*

*"That manifest is Section 2 of your Architecture Card. It's also the first document you show anyone who asks 'what can this agent do and what can it not do?' Now you have an answer."*

> ⏱ 1:40. If learners are still writing at 1:38 — give a 2-minute warning. Don't let this bleed into Block 4. A 4-row manifest is fine; Section 2 is complete.

---

## BLOCK 4 — MULTI-AGENT + EXERCISE C (1:40 – 1:55)

**Goal:** Name the three multi-agent patterns. Show the cohort they already built one. Exercise C: pattern choice for their own agent.

### 1:40 – 1:43 — Optional: Self-Reflection Demo (3 min — cut if behind on time)

*"Before we go to multi-agent — one fast live demo. I want you to see what Self-Reflection actually looks like in a tool you already use."*

→ Open a fresh Claude chat (not the Lumière Project). Type and run:

> *"Write a 2-sentence recommendation for whether Lumière Bakery should open a fourth branch in Pune."*

Read the draft aloud. Then type and run:

> *"Critique that recommendation. What's the weakest claim? What data is missing? What would make a CFO push back?"*

Read the critique aloud. *"Now — if we ran it one more time with 'redraft using this critique,' we'd have a Self-Reflection loop. Draft. Critique. Redraft. The agent is its own reviewer. That's Strategy 3 — and you can do it right now, in a plain Claude chat, with no extra tools."*

> **Cut this demo entirely if you're behind at 1:40.** It's additive. Don't let it eat into Exercise C.

### 1:43 – 1:50 — Sprint 6: Multi-Agent Patterns

→ Show the multi-agent patterns slide.

*"When one agent isn't enough. Three patterns for splitting the work."*

→ Walk each pattern with its analogy:

- *"Orchestrator-Worker — a project manager delegating to a team of specialists. The orchestrator receives the task, breaks it into subtasks, routes each to a worker. Workers do focused work — web research, financial data, competitor analysis. Orchestrator synthesizes the output. Best for complex tasks where each piece needs different expertise."*
- *"Parallel Agents — multiple analysts splitting a shared queue. Same task, divided into batches, each agent takes one batch. Process 500 resumes? Four agents, 125 each, merge results. Speed is the win. Best for independent sub-tasks where the bottleneck is volume."*
- *"Specialist Handoffs — a relay race. Each agent handles one phase, then hands to the next. Ticket comes in, Classifier categorizes it, Resolver tries the standard fix, Escalate routes to a human if the fix fails, Follow-up closes the loop. Best for distinct sequential phases where each phase needs different expertise."*

*"Now — the callback I've been waiting to make."*

*"Your HR Screener from Session 2 was a Specialist Handoffs pattern. Node 1 searched for candidates. Node 2 extracted the top 5 skills for the job title. Node 3 scored the candidates against parameters plus skills. Three specialists, in sequence, each handing to the next. You built a multi-agent architecture in Session 2 without knowing what to call it. Now you know."*

→ Pause. Let that land.

*"Design question: would your agent get faster with more agents running in parallel — or more reliable with one agent checking the other's work? That one question picks the pattern."*

**Analogy (memorize):** *"Orchestrator-Worker is the manager. Parallel Agents is the assembly line. Specialist Handoffs is the relay race."*

> ⏱ 1:50. Sprint 6 is deliberately short — 7 minutes. The callback to the HR Screener is the moment; everything else supports it.

### 1:50 – 1:55 — EXERCISE C: Pattern Choice (5 min — compressed)

**Goal:** Each learner picks a multi-agent pattern for their agent scenario and writes one sentence defending it.

*"Exercise C — 5 minutes. Pattern choice for your own agent. Use the Claude prompt in your workbook."*

→ Paste in chat:

> **EXERCISE C — Pattern Choice (5 min):**
>
> **Step 1 — Use this Claude prompt:**
>
> *"I want to build an agent that [describe the job — same scenario as Exercise B]. Which of these three patterns fits best — Orchestrator-Worker, Parallel Agents, or Specialist Handoffs — and why? Walk me through the choice. Then tell me: what breaks if I use the wrong pattern?"*
>
> **Step 2 — Read the recommendation. Agree or push back. Then write in your workbook:**
>
> *"I'm using [pattern name] because [one sentence reason]. The risk if I use the wrong pattern: [one sentence]."*

→ Start timer. **Key: 5 min.** While they work, call on each learner:

*"[Name] — what pattern does Claude recommend for your agent?"*

→ Get a quick answer from each, then ask: *"Do you agree? Why or why not?"*

→ The disagreements are often the best moments — when the learner knows their use case better than the model's first answer. Praise those.

> ⏱ 1:55. Pivot to close.

---

## BLOCK 5 — CLOSE (1:55 – 2:00)

### 1:55 – 1:57 — Synthesis

*"Step back. The HR Screener hallucinated LinkedIn URLs. We now know why — no episodic memory, no reflection node, no exit condition. Those aren't bugs in the code. They're gaps in the architecture. And architecture is a design decision — which means you can make it."*

*"Flip to the back of your workbook. Three sections. Loop Trace — you read an agent's reasoning out loud, named every stage, found the stage that was missing. Tool Manifest — you designed the governance layer, found your nervous tool, wrote the scope. Pattern Choice — you picked the architecture and defended it in one sentence."*

*"That card is not a demo exercise. It is the blueprint for any agent you want to build — not for Lumière, not for a classroom, for your job."*

### 1:57 – 1:58 — Forward Bridge (1 sentence, then stop)

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

Have them open a fresh Claude chat and attach Lumiere_KB.md with the paperclip. Paste the loop-trace instruction + the three-constraint question as message 1. The exercise is identical — same knowledge, same question, same 6-box trace. Say: *"Paperclip fallback — same exercise, same result. The architecture lesson is the same whether the knowledge comes from a Project or a pasted file."*

## If Exercise A runs long (>15 min)

Cut the reflection question (Step 5: "which stage did the agent skip?"). Let the filled trace stand without the verbal debrief. Move to break. The trace is the deliverable — the debrief is bonus.

## If Exercise B generates a manifest that's too vague

Use this prompt in the room: *"Now ask Claude: 'For each tool you listed — narrow the scope to ONE sentence describing what it cannot access. And set the permission to the minimum possible — assume the tool can only do what the job strictly requires.' Paste the output and update your table."* This usually fixes both scope and permission in one pass.

## If running over at 1:50

Collapse Exercise C to a verbal go-around only — skip the Claude prompt. Ask each learner directly: *"Based on what you heard from Sprint 6 — Orchestrator-Worker, Parallel, or Handoff? Which fits your agent? One sentence."* The pattern choice still goes in the workbook. Architecture Card is complete.

## If running under (at 1:45 with everything done)

Expand Exercise B: *"Add a sixth row to your manifest — the approval gate itself. When does a human have to sign off before the agent proceeds? What triggers escalation? What's the timeout if the human doesn't respond?"* This deepens the governance thinking without adding new concepts.

## If the Self-Reflection demo fails (Claude gives a weak critique)

Add to the critique prompt: *"Be specific. Name at least one claim that has no data source, one assumption that could be wrong, and one question a skeptical CFO would immediately ask."* A more constrained critique prompt almost always produces a sharper critique. If it still fails — skip the demo, go straight to Sprint 6. The demo is additive.

## If the HR Screener callback lands badly (learners don't remember it)

Don't push it. Say: *"You may not remember the specific URL issue — that's fine. The pattern is: any agent that doesn't log what happened when a search fails will eventually invent something. That's the memory gap."* Move on. The hallucination story is the hook, not the lesson. The lesson is the anatomy.

## Small cohort (≤6 learners — this run)

Call every name in every debrief. No chat scoreboard. Go verbal throughout. Read every Loop Trace stage by name. Read every nervous tool by name. Get a verbal pattern choice from every learner. The intimacy of a small cohort is the advantage — use it.

## If someone challenges ("agents are dangerous / will replace my job")

*"That's a real concern and I don't want to wave it away. Here's what I'd say: every tool manifest you wrote today has a human approval gate for the tool that makes you nervous. The architecture you designed today has a human escalation exit condition built in. Understanding how agents work — which is what you did today — is exactly what gives you the ability to scope them, govern them, and decide when they run. That's not something an agent can do for itself."*

---

# PRACTICE RECOMMENDATION

Do a full dry-run alone with a stopwatch the day before.

1. **Run Exercise A yourself.** Use your own Lumière Knowledge Agent. Paste the loop-trace instruction above the three-constraint question. Time how long it takes the agent to respond. Fill in the 6-box trace yourself — you need to know which boxes the agent naturally fills and which it skips. That's your debrief material for class.

2. **Run Exercise B yourself.** Pick an agent you'd actually want at your own job. Use the Claude prompt to generate the manifest. Narrow every scope until you can write the boundary in one sentence. Circle your nervous tool. Tighten the scope on it. You'll reference this manifest when the room is silent during debrief — having a real one helps.

3. **Time Sprint 2 (The Loop)** — it's the longest sprint at 12 minutes. The overdue-invoice trace + the HR Screener trace together run about 8 minutes. The exit-conditions beat needs 2 minutes. That leaves 2 minutes for the analogy and transition. Know which sentence to cut if you're 1 minute over.

4. **Know these lines cold:**
   - The anatomy verdict: *"The screener had no memory. That's not a Claude problem. That's a design choice you didn't know you were making."*
   - The loop exit: *"Goal achieved. Max iterations. Human escalation. All three. Without all three, it loops forever."*
   - The tool manifest: *"Scope every tool. Permission every tool. If you can't describe what a tool cannot do — it's not scoped."*
   - The multi-agent callback: *"You built a multi-agent architecture in Session 2 without knowing what to call it. Now you know."*
   - The close: *"That card is not a demo exercise. It is the blueprint for any agent you want to build."*

5. **Estimated dry-run time: 45 minutes.** 20 to run Exercises A and B yourself in the actual tools. 15 to drill the four sprints at pacing. 10 for the HR Screener callback — rehearse the anatomy mapping and the loop trace out loud, because that's where the emotional hook is and it needs to land clean.

---

**Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu**
**EdYoda · GenAI & AI Agents for Non-Coders · S05**
```

- [ ] **Step 2: Verify the file exists and spot-check the content**

```bash
wc -l "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/Session 05 - Agent Architecture/01_Facilitator_Script.md"
```

Expected: 300+ lines.

- [ ] **Step 3: Commit**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI"
git add "Session 05 - Agent Architecture/01_Facilitator_Script.md"
git commit -m "feat(s5): add facilitator script — Autopsy → Inside the Loop → Design Your Own"
```

---

## Task 3: Write the Learner Workbook

**Files:**
- Create: `Session 05 - Agent Architecture/02_Learner_Workbook.md`

The workbook is the Architecture Card's home. Three sections, each with exact Claude prompts. No facilitator stage directions. No timestamps. No emoji engagement-theater. Crisp recipe card.

- [ ] **Step 1: Create the file**

Create `Session 05 - Agent Architecture/02_Learner_Workbook.md` with this exact content:

```markdown
# Generative AI for Non-Coders — Session 5 Workbook

**Agent Architecture: How Agents Think, Remember & Act**

Welcome back. Last session you gave your agent a brain. Today you open it up.

By the end of these two hours, you will have completed your **Agent Architecture Card** — three sections that together form the blueprint for any agent you want to deploy at work.

One rule for today: **You came in knowing what agents can do. You leave knowing how they work.**

---

## Pre-Class Checklist

Before we start — open these in separate tabs:

- [ ] **Claude Projects** — your Lumière Knowledge Agent from Session 4
- [ ] **This workbook** — open to Exercise A

If your S4 Lumière agent is unavailable: open a fresh Claude chat and attach `Lumiere_KB.md` with the paperclip. Every exercise works identically.

---

## How This Workbook Works

Three exercises build one artifact — your Agent Architecture Card.

| Exercise | What you do | Time |
|---|---|---|
| **Exercise A** | Trace an agent's reasoning loop — 6 stages | ~13 min |
| **Exercise B** | Design a tool manifest for your own agent | ~17 min |
| **Exercise C** | Choose and defend a multi-agent pattern | ~8 min |

The facilitator will call exercises by letter. Find that letter in this workbook and you're in the right place.

---

## The Course Story So Far

Before Exercise A — a quick check on how far you've come.

| Session | What we promised | What you built |
|---|---|---|
| S1 | LLMs can generate — but they can't act | Watched the bakery campaign fail 4 of 6 steps |
| S2 | An agent can do what a chatbot can't | HR Candidate Screener: search → skills → score |
| S3 | The right prompt makes an agent reliable | System prompts for tone, format, and refusal |
| S4 | Ground the agent in your own documents | Lumière Knowledge Agent — cited sources, refused gaps |
| **S5** | **Open the hood — understand WHY they work, break, and scale** | **Your Agent Architecture Card** |

---

## The Five Components — Reference

Every agent is five parts. Remove any one — something specific breaks.

| Component | What it is | What breaks if missing |
|---|---|---|
| **LLM** | The brain — reasons and decides | No reasoning at all |
| **Memory** | What it knows | Forgets every session (or worse — invents) |
| **Tools** | What it can do | Can only talk — cannot act |
| **Planner** | What it decides to do first | Gets stuck on complex tasks |
| **Executor** | What runs the plan | Plans that never run |

---

## The Four Memory Types — Reference

| Type | Analogy | Storage | Use case |
|---|---|---|---|
| **Short-term** | The desk | Prompt window | Multi-turn chat, mid-task context |
| **Long-term** | The notebook | Database (SQL/NoSQL) | Personalization, customer history |
| **Episodic** | The archive | Log store / summaries | Audit trails, learning from failures |
| **Semantic** | The library | Vector database | Accurate answers from a knowledge base |

*The Lumière Knowledge Agent you built in S4 has Semantic memory (the RAG Docs). It has no Episodic memory — ask it what you discussed last week and it won't know.*

---

## Exercise A — Loop Trace

**WHAT:** Run a multi-constraint question against your Lumière Knowledge Agent. Make the loop visible. Fill in the 6-box trace.

**WHY:** Agents are not black boxes. The moment you can trace an agent's reasoning — "it perceived X, reasoned Y, planned Z" — you can diagnose any failure and improve any design. This is the skill that separates an agent user from an agent designer.

**HOW:**

**Step 1** — Open your Lumière Knowledge Agent in Claude Projects.

**Step 2** — Add this instruction ABOVE your question (copy it exactly — it makes the loop visible):

```
Before answering, trace your own reasoning step by step. Label each stage:
PERCEIVE — what information did you receive?
REASON — what did you interpret from it?
PLAN — what sequence will you follow to answer?
ACT — what did you retrieve from your knowledge?
OBSERVE — what did the results tell you?
REFLECT — what would you do if one part of the answer was missing?
```

**Step 3** — Then ask this question (copy it exactly):

```
A customer wants a 2kg eggless chocolate cake for this Saturday. They also
want to know whether the 15% discount code applies to eggless cakes. And
they want to know if the Andheri West branch delivers to their area.
What's the full answer?
```

**Step 4** — Read the response. Fill in the Loop Trace below. If a stage is missing from the output, write: *"not visible — add to prompt."*

---

### Loop Trace Sheet

**PERCEIVE** — What information did the agent receive?

_______________________________________________________________

_______________________________________________________________

---

**REASON** — What did it interpret from the input?

_______________________________________________________________

_______________________________________________________________

---

**PLAN** — What sequence did it follow?

_______________________________________________________________

_______________________________________________________________

---

**ACT** — What did it retrieve? (Paste the source line if it cited one)

_______________________________________________________________

_______________________________________________________________

---

**OBSERVE** — What did the results tell it?

_______________________________________________________________

_______________________________________________________________

---

**REFLECT** — What would it do if one part of the answer was missing?

_______________________________________________________________

_______________________________________________________________

---

**Reflection question:** Which stage was missing or most compressed in the response? What would break if you asked a harder version of this question?

_______________________________________________________________

_______________________________________________________________

---

*This is Section 1 of your Agent Architecture Card.*

---

## Exercise B — Tool Manifest

**WHAT:** Design a 5-row Tool Manifest for an agent you want to deploy at your job. Every row is a governance decision.

**WHY:** Every agent deployed without a tool manifest either does too little (no tools) or too much (no boundaries). The manifest is the contract between your agent and your organization — the document that answers "what can this agent do, and what can it not do?"

**HOW:**

**Step 1** — Think of a real agent you'd want at work. Not a demo. A real one — customer support, contract review, sales research, financial reporting, HR screening, anything that fits your role. One sentence to describe its job.

**Step 2** — Use this Claude prompt in a fresh chat (paste it, replace the bracketed part):

```
I want to design an agent that [describe the job your agent would do — one sentence].
List 5 tools it would need.
For each tool:
- Name it
- Describe what it does in one sentence
- Suggest the narrowest possible scope (what it explicitly cannot access)
- Recommend the minimum permission level (read / read+write / send / execute)
- Tell me what breaks if this tool is removed
```

**Step 3** — Paste the output. Edit it into the table below. The first draft is always too broad on scope and too permissive on permission. Narrow both.

**Step 4** — Circle one tool that makes you nervous. That's the one your legal team will ask about first.

---

### Tool Manifest

**My agent's job (one sentence):**

_______________________________________________________________

| Tool name | What it does (1 sentence) | Scope — what it cannot touch | Permission | What breaks if removed |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

**The tool that makes me nervous:** ___________________________

**Why:** ___________________________________________________

**How I'd scope it more tightly:** ____________________________

---

*This is Section 2 of your Agent Architecture Card.*

---

## Exercise C — Pattern Choice

**WHAT:** Pick a multi-agent pattern for your agent scenario. Write one sentence defending the choice.

**WHY:** Pattern selection is the first architectural decision most teams skip. Naming the pattern forces clarity about what each agent does, what it hands off, and when a human steps in.

---

### The Three Patterns — Quick Reference

| Pattern | Analogy | Best for |
|---|---|---|
| **Orchestrator-Worker** | Project manager + specialist team | Complex tasks, sequential dependencies |
| **Parallel Agents** | Multiple analysts, shared queue | Independent sub-tasks, speed matters |
| **Specialist Handoffs** | Relay race | Distinct sequential phases, different expertise per phase |

*The HR Candidate Screener from Session 2 was a Specialist Handoffs pattern — Node 1 searched, Node 2 extracted skills, Node 3 scored. Three specialists in sequence.*

---

**HOW:**

**Step 1** — Use this Claude prompt (paste it, replace the bracketed part):

```
I want to build an agent that [describe the same job as Exercise B].
Which of these three patterns fits best —
Orchestrator-Worker, Parallel Agents, or Specialist Handoffs — and why?
Walk me through the choice.
Then tell me: what breaks if I use the wrong pattern?
```

**Step 2** — Read the recommendation. Agree or push back. Write your final choice below:

---

### Pattern Choice

**I'm using:** _______________________________________________

**Because:** ________________________________________________

_______________________________________________________________

**The risk if I use the wrong pattern:** _____________________

_______________________________________________________________

---

*This is Section 3 of your Agent Architecture Card.*

---

## Your Agent Architecture Card — Complete

All three sections filled in? You now have:

1. **Loop Trace** — you traced a real agent's reasoning, named every stage, found the gap
2. **Tool Manifest** — you scoped 5 tools, wrote the governance contract, found the nervous tool
3. **Pattern Choice** — you picked the architecture and can defend it in one sentence

**For Session 6:** Bring this card to the EdYoda Agent Builder session. The loop trace informs your system prompt and node sequence. The tool manifest becomes your node instructions. The pattern choice determines whether you build a single-agent pipeline or a multi-node specialist sequence.

---

## Planning Strategies — Reference

| Strategy | How it thinks | Best for |
|---|---|---|
| **ReAct** | Reason → Act → Observe → repeat | Tool-heavy tasks, live data needed |
| **Chain-of-Thought** | Step 1 → Step 2 → Step 3 → Conclusion | Complex analysis, no tools needed |
| **Self-Reflection** | Draft → Critique → Redraft | High-stakes outputs, needs to be right |

**Three questions to pick the right strategy:**
1. Task complexity: simple lookup → CoT · multi-source live data → ReAct · open-ended high-stakes → Reflection
2. Tool dependency: needs live tools → ReAct · internal reasoning only → CoT or Reflection
3. Output quality: high-stakes deliverable → Reflection · internal analysis → CoT · speed matters → ReAct

---

## Take-Home (reply by Friday)

Two sentences each:

1. Which of the 5 architecture components was missing from the S2 HR Candidate Screener — and what specifically broke because of it?
2. What's the one tool in your manifest you'd add a human approval gate to — and what's the trigger for escalation?

---

## What's Next — Session 6: EdYoda Agent Builder — Build & Host Your First Agent

Session 6 takes the Architecture Card you completed today and turns it into a live, hosted agent in the EdYoda Agent Builder. You'll configure the system prompt, wire up the node pipeline, add RAG Docs, and publish a shareable agent. Bring this workbook — every section maps directly to something you'll configure in the Builder.

---

*Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu*
*EdYoda · GenAI & AI Agents for Non-Coders · S05*
```

- [ ] **Step 2: Verify**

```bash
wc -l "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/Session 05 - Agent Architecture/02_Learner_Workbook.md"
```

Expected: 250+ lines.

- [ ] **Step 3: Commit**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI"
git add "Session 05 - Agent Architecture/02_Learner_Workbook.md"
git commit -m "feat(s5): add learner workbook — Architecture Card with 3 exercises + Claude prompts"
```

---

## Task 4: Build the Learner Deck (HTML)

**Files:**
- Create: `Session 05 - Agent Architecture/learner_deck.html`
- Reference: `Session 04 - RAG Giving Agents a Brain of Your Own Data/learner_deck.html` (copy `:root` tokens verbatim, copy all CSS verbatim, copy localStorage sync logic verbatim)

The learner deck is paper/terra, static `<section class="slide">` per slide. It must sync with the presenter deck via localStorage key `genai_s5_slide_master`. Fonts: Fraunces + Geist + Geist Mono from Google CDN.

**Slide count target:** ~22 slides (1 cover + 1 agenda + 5 concept slides × 2-3 per sprint group + 3 exercise slides + 1 break + 1 close). Exact count is locked by the presenter deck — both must match.

- [ ] **Step 1: Read the S4 learner deck CSS and localStorage logic**

Open `Session 04 - RAG Giving Agents a Brain of Your Own Data/learner_deck.html`. Copy:
- The entire `<style>` block (`:root` tokens, body, `.slide`, `.running-head`, `.folio`, all component classes)
- The `<script>` block at the bottom (localStorage listener + print handler)

Change in the script block only:
- `genai_s4_slide_master` → `genai_s5_slide_master`
- `genai_s4_print_request` → `genai_s5_print_request`

- [ ] **Step 2: Create the learner deck file**

Create `Session 05 - Agent Architecture/learner_deck.html`. The file must follow this exact slide sequence — all CSS and script copied from S4, only slide content changed:

**Slides (22 total):**

1. **Cover** — title "Agent Architecture", subtitle "How Agents Think, Remember & Act", session 5 of 8, byline
2. **Course Story** — table of 5 rows (S1–S5), the promise + proof for each
3. **Anatomy — Five Components** — the cross-section diagram in HTML: LLM center, Memory top, Tools right, Planner left, Executor bottom + failure column
4. **Anatomy — The HR Screener Mapped** — the 5-component table mapped to what the S2 screener had and what was missing (Memory = nothing = the bug)
5. **The Loop — Six Stages** — circular flow diagram in HTML/CSS: Perceive → Reason → Plan → Act → Observe → Reflect → loop back
6. **The Loop — Invoice Agent Trace** — the 6-stage trace with the bounce + replan: 6-column layout, OBSERVE shows "1 bounced", REFLECT shows "loop back", Plan v2 shows Salesforce lookup, Act v2 shows resend
7. **The Loop — HR Screener Trace** — same 6-column layout, REFLECT is empty/struck-through with label "missing — no reflection node"
8. **Memory Types** — 4-card grid: desk (short-term) / notebook (long-term) / archive (episodic) / library (semantic). Each card: analogy word, storage, use case
9. **Memory — Side by Side** — two columns: HR Screener (had: short-term / missing: episodic) vs Lumière Agent (had: semantic / missing: episodic + long-term)
10. **Exercise A** — exercise slide (terra letter A, oversized), loop trace prompt + question paste-ready, timer pinned bottom-right
11. **BREAK** — break slide, countdown timer fires via `.break-slide` class
12. **Tools — Four Categories** — 2×2 grid: Information / Action / Communication / Computation, examples in each cell
13. **Tools — Recruitment Agent Manifest** — table: 5 rows (Resume Reader / Calendar API / Email Sender / ATS Writer / Slack Notifier), columns: Tool / Scope / Permission
14. **Tools — Tool Failure Pattern** — dark card: Wrong tool → error → reflect → right tool. Pull-quote: "Scope every tool. Permission every tool."
15. **Planning — Three Strategies** — 3-card layout: ReAct / Chain-of-Thought / Self-Reflection. Each: name, one-line description, best-for line
16. **Planning — SEA Expansion Example** — 3-column side-by-side: ReAct output / CoT output / Self-Reflection v1→v2→v3
17. **Planning — 3-Question Selector** — 3-row decision table: Task complexity / Tool dependency / Output quality → each with the strategy it picks
18. **Exercise B** — exercise slide (terra letter B, oversized), tool manifest prompt paste-ready + blank table
19. **Multi-Agent — Three Patterns** — 3-card layout: Orchestrator-Worker / Parallel Agents / Specialist Handoffs. Each: diagram sketch in HTML, analogy, best-for
20. **Multi-Agent — HR Screener Revealed** — full-width call-out: "Your HR Screener was a Specialist Handoffs pattern." Node 1 → Node 2 → Node 3 flow diagram
21. **Exercise C** — exercise slide (terra letter C, oversized), pattern choice prompt paste-ready + fill-in boxes
22. **Close — Architecture Card Complete** — three-panel layout: Section 1 Loop Trace / Section 2 Tool Manifest / Section 3 Pattern Choice. Bridge line: "Session 6: EdYoda Agent Builder. Bring the card."

Build each slide as a `<section class="slide">` with the exact component classes from the S4 CSS. For diagrams, use CSS flexbox/grid and colored divs — no SVG, no canvas, no JavaScript in slide content.

- [ ] **Step 3: Open in browser and verify**

```bash
open "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/Session 05 - Agent Architecture/learner_deck.html"
```

Verify visually:
- Paper/terra color scheme (background `#f5efe6`, terra `#b8431b`)
- Fonts: Fraunces for display text, Geist for body
- Running head shows "Session 5 · Agent Architecture"
- Folio numbers increment correctly
- Slide 11 (BREAK) has the `.break-slide` class
- Exercise slides (10, 18, 21) have the oversized terra letter
- No slide shows facilitator timing or stage directions

- [ ] **Step 4: Commit**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI"
git add "Session 05 - Agent Architecture/learner_deck.html"
git commit -m "feat(s5): add learner deck — 22 slides, paper/terra, localStorage sync"
```

---

## Task 5: Build the Presenter Deck (HTML)

**Files:**
- Create: `Session 05 - Agent Architecture/presenter_deck.html`
- Reference: `Session 04 - RAG Giving Agents a Brain of Your Own Data/presenter_deck.html` (copy entire CSS + JS engine verbatim)

The presenter deck is dark/teal, JS-rendered from a `slides` data array. Each object in the array is one slide. localStorage key: `genai_s5_slide_master`. `BREAK_SLIDE_INDEX` must point to the break slide (index 10, 0-based).

The slides array must have exactly 22 entries — one per learner deck slide. `num` field is 1-indexed. `when` and `duration` come from the facilitator script's timing.

- [ ] **Step 1: Read the S4 presenter deck JS engine**

Open `Session 04 - RAG Giving Agents a Brain of Your Own Data/presenter_deck.html`. Copy:
- The entire `<style>` block verbatim
- The entire `<body>` structure (topbar, main, panel-left, panel-right) verbatim
- The entire `<script>` block except the `slides` array and `BREAK_SLIDE_INDEX`

Change in the copied JS:
- `genai_s4_slide_master` → `genai_s5_slide_master`
- `genai_s4_print_request` → `genai_s5_print_request`
- `BREAK_SLIDE_INDEX = X` → `BREAK_SLIDE_INDEX = 10` (0-based index of break slide)
- Title in topbar: `Session 4` → `Session 5`

- [ ] **Step 2: Write the slides array**

Replace the placeholder `slides` array in the copied script with this exact array:

```javascript
const BREAK_SLIDE_INDEX = 10;

const slides = [
  {
    num: 1, when: "0:00 – 0:03", duration: "3 min", tag: "title",
    title: "Agent Architecture — How Agents Think, Remember & Act",
    say: "Welcome back. Quick one before I say anything else — type one word in the chat: how did Session 4 land for you? The Lumière agent, the knowledge base, the whole build. One word.",
    doSteps: ["Show opening hook slide (up 5 min before class)","Read every response by name","Transition: 'Last session gave your agent a brain. Today we open that brain up.'"],
    watch: "Everyone who types in the first 90 seconds. If chat is silent after 20 sec, prompt: 'Any word — useful, dense, wild, broken. One word.'"
  },
  {
    num: 2, when: "0:03 – 0:08", duration: "5 min", tag: "title",
    title: "The Course Story So Far",
    say: "Before we go anywhere new — let me show you how far we've actually come. Five sessions. Five promises. Five things you actually built. Walk with me.",
    doSteps: ["Show the 5-row promise+proof table","Walk each row — one breath per row","Land on S5 row last","Then: 'The HR Screener you built in Session 2 hallucinated LinkedIn URLs. Today we name exactly why.'"],
    watch: "Learners nodding at S2 row — that's recognition of the artifact they built. If blank faces, say: '3-node pipeline, Node 1 searches, Node 2 extracts skills, Node 3 scores — that one.'",
    note: "The hallucination callback is the emotional hook of the session. Don't rush it. Pause after naming it."
  },
  {
    num: 3, when: "0:08 – 0:12", duration: "4 min", tag: "title",
    title: "Norms + The One Rule",
    say: "Same room, same rules. Cameras optional. Chat open. Mics muted unless called on. Real 10-min break halfway. Tool today: Claude Projects — same one from Session 4. One rule: you came in knowing what agents can do. You leave knowing how they work. The Architecture Card is the proof.",
    doSteps: ["Walk norms table briskly","State the One Rule","Show the 3-phase arc: Autopsy → Inside the Loop → Design Your Own"],
    watch: "Anyone who doesn't have Claude Projects open — remind them to open it now, before Exercise A."
  },
  {
    num: 4, when: "0:12 – 0:22", duration: "10 min",
    title: "Sprint 1 — Anatomy: Five Components, One Machine",
    say: "Every agent — any agent — is five parts. LLM, Memory, Tools, Planner, Executor. Five parts, one machine. Remove any one — something specific breaks. Let me walk the failure column.",
    doSteps: ["Show anatomy diagram","Walk each component name + one-line role","Walk failure column — pause on each","Map to HR Screener: LLM=Claude, Memory=nothing (THE BUG), Tools=web search, Planner=node sequence, Executor=pipeline runner"],
    afterPause: "The screener had no memory. That's not a Claude problem. That's a design choice you didn't know you were making.",
    deeper: ["The five components map to the EdYoda Agent Builder tabs: Overview (LLM config) + RAG Docs (semantic memory) + Configure (tools + planner + executor)","This is the taxonomy the whole session hangs on — every later concept slots into one of these five"],
    note: "Don't rush the HR Screener mapping. That's where the insight lands."
  },
  {
    num: 5, when: "0:22 – 0:34", duration: "12 min",
    title: "Sprint 2 — The Loop: Perceive → Reflect",
    say: "Agents don't respond once. They loop. Six stages — repeat until goal met. Perceive, Reason, Plan, Act, Observe, Reflect. The analogy: a great consultant who doesn't give up when their first call fails. That instinct — built in — is the loop.",
    doSteps: ["Show loop diagram — walk each stage name + one-line definition","Show overdue-invoice trace — walk 6 stages, land on replan arc, 14/14 closed","Trace HR Screener — REFLECT box is empty. Name it: no reflection node, no recovery, invented URLs","State exit conditions: goal achieved / max iterations / human escalation. All three required."],
    watch: "Learners connecting the empty REFLECT box to the LinkedIn URLs. That's the aha. Wait for it before moving on.",
    note: "The invoice trace is from the reference deck slide 07 — use that visual if available on screen. The HR Screener trace is your verbal narration — there's no pre-built slide for it."
  },
  {
    num: 6, when: "0:34 – 0:42", duration: "8 min",
    title: "Sprint 3 — Memory: Desk · Notebook · Archive · Library",
    say: "Four memory types. Each solves a different problem. Missing the wrong one breaks a specific thing. Desk is the prompt window — cleared when chat closes. Notebook is the database — persists across sessions. Archive is the log store — past interactions as episodes. Library is the vector database — domain knowledge you uploaded.",
    doSteps: ["Show memory types slide — walk each type, 30 sec each","Side-by-side: HR Screener had short-term only, missing episodic → invented URLs. Lumière agent had semantic, missing episodic + long-term → forgets every conversation.","Key line: 'You built semantic memory in S4. Today you learn the names for all four.'"],
    afterPause: "Desk, notebook, archive, library. Every office has all four. Agents do too — they just don't come configured.",
    note: "If Sprint 3 is running short at 0:40, cut the analogy. Keep the side-by-side — that's where the insight lands.",
    bridge: "Concepts named. Time to get inside one. Open your workbook to Exercise A."
  },
  {
    num: 7, when: "0:42 – 0:55", duration: "13 min", tag: "exercise",
    title: "Exercise A — Loop Trace",
    say: "Exercise A — 13 minutes. You're going to read an agent's mind. Two things to paste: the loop-trace instruction, then the question. I'll put both in chat now.",
    doSteps: [
      "Paste Exercise A instructions in chat (full block from script)",
      "Start timer: 13 min",
      "Walk the room — watch for: instruction pasted after question (should be before), missing REFLECT box, agents that cite sources cleanly",
      "At 12 min: 'Let's hear a few traces. [Name] — which stage was missing or thin for you?'",
      "Read 2–3 traces aloud by name. Converge on REFLECT as the weakest stage."
    ],
    watch: "Anyone whose agent produced a clean REFLECT stage — that's praise-worthy. Anyone with blank REFLECT — that's the architecture lesson landing.",
    prompt: "Before answering, trace your own reasoning step by step. Label each stage:\nPERCEIVE — what information did you receive?\nREASON — what did you interpret from it?\nPLAN — what sequence will you follow to answer?\nACT — what did you retrieve from your knowledge?\nOBSERVE — what did the results tell you?\nREFLECT — what would you do if one part of the answer was missing?\n\n[then ask the 3-constraint question]"
  },
  {
    num: 8, when: "0:53 – 0:55", duration: "2 min",
    title: "Pre-Break Anchor",
    say: "If your loop trace has all 6 boxes filled — even the 'not visible' ones — that's the milestone. Real break, now.",
    doSteps: ["Advance to break slide","Set 10-min timer","Mute and play music"]
  },
  {
    num: 9, when: "0:53 – 0:55", duration: "0 min",
    title: "Pre-Break (buffer)",
    say: "Heading to break.",
    doSteps: ["Transition slide — advance immediately to break"]
  },
  {
    num: 10, when: "0:55 – 0:55", duration: "0 min",
    title: "Break transition",
    say: "Break now.",
    doSteps: ["Advance to break slide"]
  },
  {
    num: 11, when: "0:55 – 1:05", duration: "10 min", tag: "break",
    title: "BREAK — 10 Minutes",
    say: "Real ten minutes. Cameras off, mics off, step away from the screen. Back at the exact clock time on the slide. Go.",
    doSteps: ["Show break slide with countdown","Set 10-min timer","Mute yourself","DM learners whose REFLECT box was blank: send prompt-tweak suggestion","When returning: 'You just traced an agent's reasoning loop. Now we give it hands.'"]
  },
  {
    num: 12, when: "1:05 – 1:15", duration: "10 min",
    title: "Sprint 4 — Tools: The Agent's Hands",
    say: "Tools are the agent's hands. The LLM is the mind that picks them up. Four categories: Information — read, search, query. Action — write, send, update. Communication — notify, message. Computation — calculate, transform.",
    doSteps: ["Show tools grid — walk each category with examples","Show Recruitment Agent manifest — walk each row: tool name, scope, permission","Ask the room: 'Which tool would make your legal team nervous — and why?'","State tool failure pattern: Wrong tool → error → reflect → right tool. But unscoped write tool: damage already done."],
    afterPause: "Scope every tool. Permission every tool. If you can't describe what a tool cannot do — it's not scoped.",
    watch: "Calendar API and Email Sender usually draw the legal-nervous response. Validate both — both are correct.",
    note: "If past 1:13, cut the tool-calling mechanics (5-step sequence). Keep the manifest walk and the legal question."
  },
  {
    num: 13, when: "1:15 – 1:23", duration: "8 min",
    title: "Sprint 5 — Planning: Three Ways to Think",
    say: "Three ways an agent can think through a task. Same task — three different paths. ReAct: reason and act, interleaved, best for tool-heavy live-data tasks. Chain-of-Thought: pure reasoning chain, no tools, best for complex analysis. Self-Reflection: draft, critique, redraft, best for high-stakes outputs.",
    doSteps: ["Show planning strategies slide — walk each strategy","Show SEA expansion example — three paths, three outputs","State 3-question selector: task complexity / tool dependency / output quality"],
    afterPause: "You don't memorize strategy names. You answer three questions and the right strategy picks itself.",
    note: "Keep to 8 min. The 3-question selector is the only thing that needs to land. Strategy names are just handles."
  },
  {
    num: 14, when: "1:23 – 1:40", duration: "17 min", tag: "exercise",
    title: "Exercise B — Tool Manifest",
    say: "Exercise B — 17 minutes. You're going to design the employment contracts for your agent's hands. Think of a real agent you'd want at work. One sentence to describe its job. Then use the Claude prompt to generate a first draft — and narrow it.",
    doSteps: [
      "Paste Exercise B instructions in chat (full block from script)",
      "Start timer: 17 min",
      "Walk the room — watch for: scope too broad ('access to CRM' = not scoped), permission too high ('admin' = not minimum), no nervous tool circled",
      "At 15 min: 'Let's hear the nervous tools. [Name] — what's yours?'",
      "Read every nervous tool. After all: 'Every nervous tool is a write or send tool. Narrow it or add a human gate.'"
    ],
    watch: "Learners who don't know what agent to design — prompt: 'What's the most repetitive task in your job that involves looking something up and then sending or filing something? Start there.'",
    prompt: "I want to design an agent that [describe the job].\nList 5 tools it would need.\nFor each tool:\n- Name it\n- Describe what it does in one sentence\n- Suggest the narrowest possible scope (what it cannot access)\n- Minimum permission level (read / read+write / send / execute)\n- What breaks if this tool is removed"
  },
  {
    num: 15, when: "1:40 – 1:43", duration: "3 min",
    title: "Optional: Self-Reflection Demo",
    say: "One fast live demo — Self-Reflection in a tool you already use. I'll ask Claude to write a recommendation, then ask it to critique itself. Watch.",
    doSteps: [
      "Open fresh Claude chat",
      "Prompt 1: 'Write a 2-sentence recommendation for whether Lumière Bakery should open a fourth branch in Pune.'",
      "Read draft aloud",
      "Prompt 2: 'Critique that recommendation. What's the weakest claim? What data is missing? What would make a CFO push back?'",
      "Read critique aloud",
      "Say: 'Draft. Critique. Redraft. The agent is its own reviewer. That's Self-Reflection — and you can do it right now in a plain Claude chat.'"
    ],
    note: "CUT THIS ENTIRELY if behind at 1:40. It is additive. Don't let it eat Exercise C."
  },
  {
    num: 16, when: "1:43 – 1:50", duration: "7 min",
    title: "Sprint 6 — Multi-Agent: Three Patterns",
    say: "When one agent isn't enough. Three patterns. Orchestrator-Worker: project manager delegating to specialists — complex tasks with sequential dependencies. Parallel Agents: multiple analysts splitting a shared queue — independent sub-tasks, speed is the win. Specialist Handoffs: relay race, each runner specialized — distinct sequential phases.",
    doSteps: ["Show multi-agent patterns slide — walk each pattern + analogy","The callback: 'Your HR Screener from Session 2 was a Specialist Handoffs pattern. Node 1 searched. Node 2 extracted skills. Node 3 scored. You built a multi-agent architecture in Session 2 without knowing what to call it. Now you know.'","Pause. Let that land.","Design question: 'Would your agent get faster with more agents running in parallel — or more reliable with one agent checking the other's work? That answer picks the pattern.'"],
    watch: "The callback moment. Watch for recognition — learners realizing they already built the thing you just named. That's the payoff of four sessions of building."
  },
  {
    num: 17, when: "1:50 – 1:55", duration: "5 min", tag: "exercise",
    title: "Exercise C — Pattern Choice",
    say: "Exercise C — 5 minutes. Pattern choice for your own agent. Use the Claude prompt. Then write one sentence in the workbook. I'll call on each of you while you work.",
    doSteps: [
      "Paste Exercise C instructions in chat",
      "Start timer: 5 min",
      "Call on each learner by name while they work: '[Name] — what pattern does Claude recommend?'",
      "After each answer: 'Do you agree? Why or why not?'",
      "Praise disagreements: those are the moments learners know their use case better than the model's first answer"
    ],
    prompt: "I want to build an agent that [describe the job].\nWhich of these three patterns fits best — Orchestrator-Worker, Parallel Agents, or Specialist Handoffs — and why?\nWalk me through the choice.\nThen tell me: what breaks if I use the wrong pattern?"
  },
  {
    num: 18, when: "1:55 – 1:57", duration: "2 min",
    title: "Synthesis — The Architecture Card",
    say: "Step back. The HR Screener hallucinated LinkedIn URLs. We now know why — no episodic memory, no reflection node, no exit condition. Those aren't code bugs. They're architecture gaps. And architecture is a design decision — which means you can make it.",
    doSteps: ["Show Architecture Card summary slide","Name all three sections: Loop Trace / Tool Manifest / Pattern Choice","Key line: 'That card is the blueprint for any agent you want to build. Not for Lumière. Not for a demo. For your job.'"]
  },
  {
    num: 19, when: "1:57 – 1:58", duration: "1 min",
    title: "Forward Bridge",
    say: "Session 6: EdYoda Agent Builder — Build and Host Your First Agent. Bring the Architecture Card. The system prompt in Section 1, the nodes in Section 2, the pattern in Section 3 — they all go into the Builder.",
    doSteps: ["Show S6 bridge slide — one sentence only","Do not preview Builder mechanics"],
    bridge: "Session 6: EdYoda Agent Builder — Build & Host Your First Agent."
  },
  {
    num: 20, when: "1:58 – 2:00", duration: "2 min",
    title: "Reflection + Goodbye",
    say: "Five sessions. You've watched an agent fail, built one that works, grounded it in documents, and today opened it up and named every part. Two take-home questions — reply by Friday. See you for architecture in action — Session 6.",
    doSteps: [
      "Paste take-home in chat: 'Reply by Friday — 1. Which component was missing from the S2 HR Screener and what broke? 2. Which tool in your manifest gets a human approval gate and what triggers escalation?'",
      "Wave",
      "Stop recording",
      "End meeting"
    ],
    note: "Post-class within 24h: send workbook PDF + Google Doc link, individual replies to take-home, calendar invite for S6."
  },
  {
    num: 21, when: "2:00", duration: "0 min",
    title: "End",
    say: "Session complete.",
    doSteps: []
  },
  {
    num: 22, when: "2:00", duration: "0 min",
    title: "End buffer",
    say: "Done.",
    doSteps: []
  }
];
```

- [ ] **Step 3: Open in browser and verify**

```bash
open "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/Session 05 - Agent Architecture/presenter_deck.html"
```

Verify:
- Dark/teal color scheme (`--bg-0: #07090f`, `--accent: #5eead4`)
- Topbar shows "Session 5 · Agent Architecture"
- Clock is live and running
- Arrow keys advance through 22 slides
- Slide 11 (break, index 10): pressing `B` jumps to it
- `say:` content is warm/yellow, `doSteps:` is green, `watch:` is red/hot, `note:` is purple
- `prompt:` blocks render as monospace code card

- [ ] **Step 4: Test localStorage sync**

Open both decks in Chrome side by side. Advance presenter deck with arrow key. Confirm learner deck advances to the same slide number.

- [ ] **Step 5: Commit**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI"
git add "Session 05 - Agent Architecture/presenter_deck.html"
git commit -m "feat(s5): add presenter deck — 22 slides, dark/teal, localStorage sync, full slides array"
```

---

## Self-Review Checklist

Run through this before calling the plan complete.

**Spec coverage:**
- [x] Block 0 course story (Task 2) ✓
- [x] Sprint 1 Anatomy + HR Screener mapping (Task 2, slide 4 in learner deck) ✓
- [x] Sprint 2 Loop + invoice trace + HR Screener trace + exit conditions (Task 2, slides 5–7) ✓
- [x] Sprint 3 Memory types + side-by-side (Task 2, slides 8–9) ✓
- [x] Exercise A Loop Trace with Claude prompt (Task 2 + Task 3) ✓
- [x] Sprint 4 Tools + manifest walkthrough + legal question (Task 2, slides 12–14) ✓
- [x] Sprint 5 Planning 3 strategies + 3-question selector (Task 2, slides 15–17) ✓
- [x] Exercise B Tool Manifest with Claude prompt (Task 2 + Task 3) ✓
- [x] Optional Self-Reflection demo (Task 2, slide 15 presenter) ✓
- [x] Sprint 6 Multi-Agent 3 patterns + HR Screener callback (Task 2, slides 16 + 20) ✓
- [x] Exercise C Pattern Choice with Claude prompt (Task 2 + Task 3) ✓
- [x] Architecture Card synthesis (Task 3, learner workbook Section 5) ✓
- [x] S6 bridge on final close slide only (Task 3, Task 5 slide 19) ✓
- [x] Take-home 2 questions (Task 2 + Task 3) ✓
- [x] Contingency guide (Task 2) ✓
- [x] Practice recommendation (Task 2) ✓
- [x] PDF moved to session folder (Task 1) ✓
- [x] localStorage keys updated to s5 (Task 4 + Task 5) ✓
- [x] BREAK_SLIDE_INDEX = 10 (Task 5) ✓
- [x] Presenter slide count = Learner slide count = 22 (Task 4 + Task 5) ✓

**Register rules check:**
- No timestamps in learner workbook or learner deck ✓
- No facilitator stage directions in learner-facing copy ✓
- "Next session" tease on final close slide only ✓
- `say:` fields are spoken English, not textbook prose ✓

**Session boundary check:**
- No RAG re-teaching (referenced as "what you built in S4") ✓
- No Agent Builder hosting mechanics (S6) ✓
- No n8n (S7) ✓

---

*Plan saved. Ready for execution.*
