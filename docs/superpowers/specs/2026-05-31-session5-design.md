# Session 5 Design Spec — Agent Architecture: How Agents Think, Remember & Act

**Date:** 2026-05-31
**Course:** EdYoda GenAI & AI Agents for Non-Coders (Session 5 of 8)
**Author:** Shantanu Chandra · linkedin.com/in/chandrashantanu
**Status:** Approved — proceed to implementation

---

## 1. Session Identity

| Field | Value |
|---|---|
| **Title** | Agent Architecture — How Agents Think, Remember & Act |
| **Subtitle** | By the end of this session, you'll trace the reasoning loop of any agent, design its memory and tool architecture, choose the right multi-agent pattern, and walk out with a complete Architecture Card for an agent you want to deploy at work. |
| **Duration** | 120 min · Live virtual · Same cohort as S1–S4 |
| **Spine** | Autopsy → Inside the Loop → Design Your Own |
| **Hands-on share** | ~45% (~54 min across 3 exercises) |
| **Walk-out artifact** | Agent Architecture Card — three sections completed in workbook: Loop Trace (Exercise A) + Tool Manifest (Exercise B) + Pattern Choice (Exercise C). All three sections contain structured Claude prompts learners keep and reuse. This card becomes the blueprint for S6's EdYoda Agent Builder build. |
| **Platform** | Claude Projects (same as S4, no new tool onboarding needed) |
| **Session number** | 5 of 8 |
| **Next session** | S6 — EdYoda Agent Builder: Build & Host Your First Agent |

---

## 2. Cohort Context

- Same room as S1–S4. ~6 learners expected (consistent with prior attendance).
- Mixed India + international; marketing/sales, finance/consulting, at least one doctor.
- **S4 cohort-actual artifact:** Lumière Knowledge Agent (Claude Projects) + completed Knowledge Base Design Sheet. Platform was Claude Projects (not Agent Builder). The build matched the canonical S4 arc: A (feed) → B (cite) → C (refuse) → D (tune) → E (stress and ship).
- **S2 cohort-actual artifact:** HR Candidate Screener — 3-node pipeline (Node 1: profile search by location + experience + job_title → 5 profiles; Node 2: top-5-skills extraction; Node 3: score profiles against parameters + skills). The agent **hallucinated LinkedIn URLs** when Node 1's source returned no data. This is the canonical cold-open story for S5.
- Small cohort rule: call every learner by name in every exercise debrief. Go verbal, not chat scoreboard.

---

## 3. The Core Teaching Problem

S5 is the most concept-heavy session in the arc. Every prior session had a new tool to anchor hands-on work (Agent Builder in S2, Claude system prompts in S3, Claude Projects in S4). S5 has no new tool — the concepts ARE the session. This makes it the hardest session to keep from going passive.

**The solution:** use what the cohort already built as the teaching specimen. The HR Screener (S2) and the Lumière Knowledge Agent (S4) are not examples from a textbook — they are this cohort's own work. Every concept in S5 is taught by opening those artifacts up and reading what was there, what was missing, and what would be different if they added it now.

The reference PDF (deck-agent.pdf) is conceptually strong and provides visual templates (anatomy diagram, loop trace, memory grid, tool manifest, multi-agent patterns). It should not be the session structure — it is a slide asset library.

---

## 4. Session Arc

### BLOCK 0 — Opening (0:00–0:12)

**Goal:** Re-establish the room with a cumulative course story. Name the S2 hallucination bug precisely. Set today's promise.

**Format:** The "Course Story So Far" is not a recap slide. It is a promise-and-proof table — each session lands as what was promised + what the cohort actually built to prove it.

| Session | Promise | Proof — what this cohort built |
|---|---|---|
| S1 | LLMs can generate — but they can't act | Watched the bakery campaign fail 4 of 6 steps |
| S2 | An agent can do what a chatbot can't | Built the HR Candidate Screener (3 nodes: search → skills → score) |
| S3 | The right prompt makes an agent reliable | Wrote system prompts that controlled tone, format, and refusal |
| S4 | Ground the agent in your own documents | Built the Lumière Knowledge Agent — cited its source, refused when it didn't know |
| **S5** | **Open the hood — understand WHY agents work, break, and scale** | **You'll build the Architecture Card for an agent you want to deploy at work** |

**Cold open hook (the hallucination callback):**
> *"Your HR Screener from Session 2 hallucinated LinkedIn URLs. That wasn't a hallucination problem. It was an architecture problem. Today we name the exact component that was missing — and by the end you'll know how to add it."*

**The One Rule:** *"You came in knowing what agents can do. You leave knowing how they work. The Architecture Card is the proof."*

---

### BLOCK 1 — Concept Sprints 1–3 (0:12–0:42)

**Pacing rule:** ~10 min per sprint. Each sprint follows WHAT → WHY → HOW, anchored to the HR Screener or Lumière agent. No sprint introduces a new platform or tool. Cut the analogy before you cut the callback.

#### Sprint 1 — Anatomy (0:12–0:22) · 10 min

**WHAT:** Every agent is 5 parts: LLM (brain) · Memory (what it knows) · Tools (what it can do) · Planner (what it decides) · Executor (what it runs).

**WHY:** Remove any one — the agent breaks in a specific, predictable way. No memory → forgets every session. No tools → can only talk. No planner → stuck on complex tasks. No executor → plans never run.

**HOW — map to the HR Screener:**
- LLM → Claude Sonnet (the reasoning)
- Memory → **nothing** (this is the bug — no episodic memory meant no place to store "I already looked this up" → hallucinated URLs when results were empty)
- Tools → web search (Node 1's native search)
- Planner → the 3-node sequence (implicit plan baked into the pipeline structure)
- Executor → Agent Builder pipeline runner

**Key line:** *"The screener had no memory. That's not a Claude problem. That's a design choice you didn't know you were making."*

#### Sprint 2 — The Loop (0:22–0:34) · 12 min

**WHAT:** Agents don't respond once — they loop. Six stages: Perceive → Reason → Plan → Act → Observe → Reflect. Repeat until goal achieved.

**WHY:** A one-shot agent can't recover from failure. The loop is what makes an agent resilient — it can observe a bad result, reflect, and try again. A chatbot that gets a wrong API response just apologizes. An agent tries a different path.

**HOW — trace the overdue-invoice agent (PDF slide 07):**
Walk all 6 stages with the bounced-email example. The loop replanned, found the correct contact in Salesforce, resent, closed 14/14. Show the replan arc.

Then trace the HR Screener:
- PERCEIVE: job title + parameters
- REASON: need 5 profiles from LinkedIn
- PLAN: web_search(...)
- ACT: called search
- OBSERVE: returned sparse/no results
- REFLECT: **nothing** — no reflection node → no recovery → hallucinated URLs to fill the gap

**Loop exit conditions (critical add):** goal achieved / max iterations / human escalation. *"Without exit conditions, agents loop forever and burn tokens. Your S2 screener had no exit condition — when search failed, it didn't know to stop or escalate. It guessed."*

**Analogy:** *"A great consultant doesn't give up when their first call fails. They try the next contact. The loop is that instinct — built in."*

#### Sprint 3 — Memory (0:34–0:42) · 8 min

**WHAT:** 4 memory types — desk · notebook · archive · library.

| Type | Also called | Storage | Lives | Use case |
|---|---|---|---|---|
| Short-term (desk) | Working memory | Prompt window | Current session | Multi-turn chat, mid-task context |
| Long-term (notebook) | Persistent | Database (SQL/NoSQL) | Across sessions | Personalization, customer history |
| Episodic (archive) | Logs & episodes | Log store / summaries | Past interactions | Audit trails, learning from mistakes |
| Semantic (library) | Knowledge / RAG | Vector database | Domain knowledge | Accurate answers, domain Q&A |

**WHY:** Missing the wrong type breaks a specific user experience. Missing episodic memory = can't audit what happened. Missing semantic = hallucinates facts. Missing long-term = forgets who you are between sessions.

**HOW — the side-by-side:**
- HR Screener: had short-term only (prompt window). No episodic → couldn't log that it got empty results → hallucinated.
- Lumière Knowledge Agent: had semantic (RAG Docs = the vector store). No episodic → answered "What's the lead time?" correctly but couldn't answer "What did we discuss last week?"
- Key line: *"You built semantic memory in S4. You've been using short-term memory in every session. Today you learn the names — so you can design the rest."*

> **Time check: 0:42.** Three concepts, all grounded in what this cohort built. No new tools introduced.

---

### EXERCISE A — Loop Trace (0:42–0:55) · 13 min

**WHAT:** Run a hard multi-constraint question against your S4 Lumière Knowledge Agent. Read the response carefully. Fill in the 6-box Loop Trace Sheet in the workbook — one box per stage.

**WHY it matters:** Most people treat agents as black boxes. The moment you can trace an agent's reasoning out loud — "it perceived X, reasoned Y, planned Z" — you can diagnose any failure and improve any design. This is the skill that separates an agent user from an agent designer.

**HOW:**

1. Open your Lumière Knowledge Agent in Claude Projects (same one from S4).

2. First: add this instruction line ABOVE your question (this is your structured Claude prompt — it makes the loop visible):
   > *"Before answering, trace your own reasoning step by step. Label each stage: PERCEIVE (what information did you receive?) / REASON (what did you interpret?) / PLAN (what sequence will you follow?) / ACT (what did you retrieve?) / OBSERVE (what did the results tell you?) / REFLECT (what would you do if one answer was missing?)."*

3. Then ask the multi-constraint question:
   > *"A customer wants a 2kg eggless chocolate cake for this Saturday. They also want to know whether the 15% discount code applies to eggless cakes. And they want to know if the Andheri West branch delivers to their area. What's the full answer?"*

4. Read the response. Fill in the Loop Trace Sheet in your workbook — one box per stage. Use the agent's own labelled output as the source; if a stage is missing, write "not visible — add to prompt."

5. One reflection question: *"Which stage did the agent skip or compress? What would break if you asked a harder version of this question?"*

**Facilitator read 2–3 traces aloud by name. Key watch-for:** learners who find the agent skipped OBSERVE or REFLECT — that's the architectural gap they're now equipped to name.

**Walk-out line:** *"You just read an agent's mind. That trace is Section 1 of your Architecture Card."*

---

### BREAK (0:55–1:05) · 10 min

*Real break. Cameras off. Use break time to DM any learner whose loop trace showed a blank REFLECT box — send the structured prompt tweak.*

---

### BLOCK 3 — Concept Sprints 4–5 + Exercise B (1:05–1:40)

#### Sprint 4 — Tools (1:05–1:15) · 10 min

**WHAT:** Tools are the agent's hands. 4 categories: Information (read/search/query) · Action (write/send/update) · Communication (notify/message) · Computation (calculate/transform). The LLM decides which hand to pick up. The Executor runs it.

**WHY:** Scope and permission define what can go wrong. Broad tool access = security risk. The tool manifest is the governance layer — the contract between your agent and your organization.

**HOW:** Walk the Recruitment Agent manifest (PDF slide 11):
- Resume Reader: read-only, parse PDF · Calendar API: read+write, recruiter's calendar only · Email Sender: templated only, no free text · ATS Writer: write audited, candidate records only · Slack Notifier: post templated, #hiring-ops only.

Key question to the room: *"Which of these tools would you be comfortable giving an agent at YOUR company — and which would make your legal team nervous?"*

**Tool failure pattern:** Wrong tool → error → reflect → right tool. The loop saves you. But a tool with no scope boundary? That's a different failure — one the loop can't fix, because the damage is already done.

**Key line:** *"Scope every tool. Permission every tool. If you can't describe in one sentence what a tool cannot do — it's not scoped enough."*

#### Sprint 5 — Planning (1:15–1:23) · 8 min

**WHAT:** 3 strategies for how an agent thinks through a task: ReAct (Reason + Act, interleaved) · Chain-of-Thought (pure reasoning chain, no tools) · Self-Reflection (draft → critique → redraft loop).

**WHY:** Same task, three strategies, three different outputs and costs. Wrong choice = slower results, wasted tokens, or lower quality.

**HOW — one worked example, three paths (PDF slide 13):**
*"Should we expand into Southeast Asia?"*
- ReAct → live-data brief (web search + CRM + finance API, iterative)
- Chain-of-Thought → structured framework decision (6-criteria scoring, no tools)
- Self-Reflection → board-ready nuanced memo (draft → critique "why not Indonesia?" → redraft)

**3-question selector (the takeaway):**
1. Task complexity: simple lookup → CoT. Multi-source live data → ReAct. Open-ended high-stakes → Reflection.
2. Tool dependency: needs live tools → ReAct. Internal reasoning only → CoT or Reflection.
3. Output quality: high-stakes deliverable → Reflection. Internal analysis → CoT. Speed matters → ReAct.

**Key line:** *"You don't memorize strategy names. You answer three questions and the right strategy picks itself."*

#### EXERCISE B — Tool Manifest (1:23–1:40) · 17 min

**WHAT:** Design a 5-row Tool Manifest for the agent you want to deploy at work. Every row forces a governance decision.

**WHY it matters:** Every agent deployed without a tool manifest either does too little (no tools configured) or too much (no permissions scoped). Writing the manifest forces you to think about governance before deployment — the conversation most teams have only after something breaks.

**HOW:**

1. Open the Tool Manifest template in the workbook (5-row table):

| Tool name | What it does | Scope — narrow it to one sentence | Permission level (read / read+write / send / execute) | What breaks if you remove it |
|---|---|---|---|---|
| | | | | |

2. Use this structured Claude prompt to generate a first draft — then edit it into your manifest:
   > *"I want to design an agent that [describe the job your agent would do at your work]. List 5 tools it would need. For each tool: name it, describe what it does in one sentence, suggest the narrowest possible scope, recommend the minimum permission level required, and tell me what breaks if this tool is removed."*

3. Paste the output. Edit — the first draft is always too broad on scope and too permissive on permission. Narrow both.

4. Circle one tool in your manifest that makes you nervous. That's the tool your legal team will ask about first.

**Debrief:** Each learner reads their "nervous tool" aloud. Facilitator names the pattern: *"Every nervous tool is a write or send tool with broad scope. That's the design signal — narrow it or add a human approval gate."*

**Walk-out line:** *"That manifest is Section 2 of your Architecture Card. It's also the first document you share when someone asks 'what can this agent do?'"*

> **Time check: 1:40.** Two sprints + one substantial exercise.

---

### BLOCK 4 — Multi-Agent + Exercise C (1:40–1:55)

#### Sprint 6 — Multi-Agent Patterns (1:40–1:47) · 7 min

**WHAT:** When one agent isn't enough — 3 patterns for splitting work across agents.

| Pattern | Analogy | Best for |
|---|---|---|
| Orchestrator-Worker | Project manager delegating to specialists | Complex tasks with sequential dependencies |
| Parallel Agents | Multiple analysts splitting a shared queue | Independent sub-tasks where speed matters |
| Specialist Handoffs | Relay race — each runner specialized | Distinct sequential phases needing different expertise |

**WHY:** Wrong pattern = bottlenecks (orchestrator bottleneck on parallel work) or chaos (parallel agents on dependent tasks). Right pattern = speed + reliability + clear accountability.

**HOW — the callback that lands:** *"Your HR Screener from S2 was already a Specialist Handoffs pattern. Node 1 searched. Node 2 extracted skills. Node 3 scored. Three specialists in sequence, each one handing to the next. You built a multi-agent architecture in S2 without knowing what to call it. Now you know."*

**Key design question:** *"Would your agent get faster with more agents running in parallel — or more reliable with one agent checking the other's work? That answer picks the pattern."*

#### EXERCISE C — Pattern Choice (1:47–1:55) · 8 min

**WHAT:** Pick a multi-agent pattern for your agent scenario. Write one sentence defending the choice.

**WHY it matters:** Pattern selection is the first architectural decision. Most teams skip it and end up with a brittle single-agent trying to do everything — or a sprawling multi-agent system with no clear owner. Naming the pattern forces clarity about what each agent does, what it hands off, and when a human steps in.

**HOW:**

1. Use this structured Claude prompt:
   > *"I want to build an agent that [describe the job]. Which of these three patterns fits best — Orchestrator-Worker, Parallel Agents, or Specialist Handoffs — and why? Walk me through the choice. Then tell me: what breaks if I use the wrong pattern?"*

2. Read the recommendation. Agree or push back. Write your final choice + one sentence in the workbook Pattern Choice box:
   > *"I'm using [pattern name] because [one sentence reason]. The risk if I use the wrong pattern: [one sentence]."*

**Verbal go-around (small cohort: every learner):** *"[Name] — what pattern did you pick and what's the one sentence?"*

**Walk-out line:** *"That's Section 3 of your Architecture Card. You now have a complete blueprint."*

---

### BLOCK 5 — Close (1:55–2:00)

**The Architecture Card synthesis (2 min):**
*"Flip to the back of your workbook. Three sections. Loop Trace — you read an agent's reasoning, named every stage, found the gap. Tool Manifest — you scoped 5 tools, found your nervous one, wrote the governance contract. Pattern Choice — you picked the architecture and defended it in one sentence. That card is the blueprint for any agent you want to build. Not for Lumière. Not for a demo. For your job."*

**Forward bridge (final slide only — one sentence):**
*"Session 6: EdYoda Agent Builder — Build & Host Your First Agent. Bring the Architecture Card. The system prompt you wrote tonight, the nodes you designed, the RAG Docs from S4 — they all go in."*

**Take-home (paste in chat):**
> *Reply by Friday — two sentences:*
> *1. Which of the 5 architecture components was missing from the S2 HR Screener, and what specifically broke because of it?*
> *2. What's the one tool in your manifest you'd add a human approval gate to — and what's the trigger for escalation?*

---

## 5. Walk-Out Artifact — Agent Architecture Card

**Three sections, all in the workbook, all containing reusable Claude prompts:**

### Section 1 — Loop Trace
- 6-box table: PERCEIVE / REASON / PLAN / ACT / OBSERVE / REFLECT
- Filled from Exercise A using the Lumière agent
- Contains the structured prompt: *"Before answering, trace your reasoning step by step. Label each stage..."*

### Section 2 — Tool Manifest
- 5-row table: Tool name / What it does / Scope / Permission / What breaks if removed
- Filled from Exercise B for the learner's own agent scenario
- Contains the structured prompt: *"I want to design an agent that... List 5 tools..."*

### Section 3 — Pattern Choice
- One-paragraph: chosen pattern + one-sentence defence + one-sentence risk
- Filled from Exercise C
- Contains the structured prompt: *"I want to build an agent that... Which of the three patterns fits best..."*

**S6 bridge:** The Architecture Card maps directly to EdYoda Agent Builder:
- Loop Trace → system prompt + node sequence
- Tool Manifest → Configure tab node instructions + RAG Docs
- Pattern Choice → single-agent vs. multi-node pipeline decision

---

## 6. Facilitator Self-Reflection Demo (Optional — Block 4 opener, 3 min)

If time permits at 1:40, run a live 3-minute demo before Sprint 6:

Open a fresh Claude chat. Node 1 prompt: *"Write a 2-sentence recommendation for whether Lumière should open a fourth branch in Pune."* Read the draft aloud. Then Node 2 prompt: *"Critique this recommendation. What's the weakest claim? What data is missing? What would make a CFO push back?"* Read the critique. Then: *"That's a Self-Reflection loop. Draft. Critique. Redraft. The agent is its own reviewer."*

This makes Sprint 5's Self-Reflection strategy visceral before Exercise C. If time is tight, cut this — it's additive, not load-bearing.

---

## 7. Contingency Guide (abbreviated — full version in Facilitator Script)

| Situation | Response |
|---|---|
| Lumière agent unavailable / S4 not done | Use a fresh Claude chat. Paste Lumiere_KB.md as context. Same loop trace exercise works identically. |
| Exercise A runs long (>15 min) | Cut the reflection question ("Which stage did the agent skip?"). Let the trace stand without the debrief question. |
| Exercise B draft is too broad | Prompt: *"Now narrow every scope to ONE sentence. Every permission to the minimum. If you wrote 'full access' — that's not a scope, that's a blank cheque."* |
| Running over at 1:50 | Collapse Exercise C to 4 minutes. Skip the Claude prompt — learners write their pattern choice directly from the verbal go-around. |
| Running under | Expand Exercise B: *"Add a sixth tool — the approval gate itself. When does a human have to sign off before the agent proceeds?"* |

---

## 8. Hard Constraints (from session boundaries memory)

- S5 DOES own: anatomy / loop / memory types / tool use / planning strategies / multi-agent patterns
- S5 does NOT own: RAG specifics (S4 prerequisite — reference only, do not re-teach) · Builder hosting mechanics (S6) · n8n workflow chaining (S7)
- All callbacks point backward. No pre-teaching of S6 mechanics beyond naming the tool.
- "Next session" tease lives on the final close slide only.

---

## 9. Assets to Build (Implementation Order)

Per README workflow:
1. `01_Facilitator_Script.md` — run sheet with full say/do/watch/timing
2. `02_Learner_Workbook.md` — Architecture Card template (3 sections with structured Claude prompts)
3. `learner_deck.html` — paper/terra editorial reading deck
4. `presenter_deck.html` — dark/teal cockpit deck (JS data array)
5. `linkedin_carousel.html` — post-delivery

Session folder: `Session 05 - Agent Architecture`
The file `deck - Agent.pdf` should be moved into this folder as reference material.

---

*Spec approved 2026-05-31. Proceed to writing-plans.*
