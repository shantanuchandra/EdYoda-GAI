# Session 2 Design Spec — Why Agents? The Case for Autonomous AI

**Course:** Generative AI for Non-Coders (EdYoda, 3-session live virtual — see §14 below; Session 3 is Prompt Engineering)
**This document specifies:** Session 2 of 3
**Status:** Reconciled against EdYoda canonical content brief (`why_agents_autonomous_ai_20260521125403.pdf`) on 2026-05-18. PDF content is canon; our design philosophy carries the UX/pedagogy.
**Date:** 2026-05-17 (reconciled 2026-05-18)
**Author:** Shantanu Chandra (designed in collaboration with Claude)

---

## 0. EdYoda Canon Reconciliation (read first)

This spec was originally written before the EdYoda canonical content brief (`Session 02 - From Chatbot to Agent/why_agents_autonomous_ai_20260521125403.pdf`) was supplied. On 2026-05-18 the spec was updated to honor the PDF as canon for **content, terminology, and key data points** while keeping our design philosophy and pedagogy.

**From the PDF (canon — must honor verbatim):**

- **Title:** *"Why Agents? The Case for Autonomous AI"*
- **The 6 sub-topics (in order):** 5 Gaps · Agent Loop · Maturity Model · Decision Framework · Business Cost · Architecture Patterns
- **Agent Loop = 6 steps:** Goal → Plan → Act → Observe → Reflect → Iterate (NOT the 5-step version)
- **Analogy:** Chatbot = Vending Machine; Agent = **Project Manager** (NOT "personal assistant")
- **The 5 Architecture Patterns:** Single Agent · RAG Agent · Tool-Calling Agent · Orchestrator-Worker · Human-in-the-Loop (NOT the 4-pattern version)
- **Decision Framework = 4-question funnel** (NOT a 2×2 quadrant):
  1. Does the answer exist in a fixed document/database? → YES → RAG
  2. Does the task require a single response with no follow-up? → YES → Chatbot
  3. Does the task require multiple steps, memory, or tool use? → YES → Agent
  4. Does the task require multiple specialized capabilities working in parallel? → YES → Multi-Agent
- **Maturity Model:** L0 Chatbot (25%, FAQ bot) · L1 Copilot (50%, GitHub Copilot / Sales email assistant) · L2 Agent (75%, Recruitment screening agent) · L3 Multi-Agent (100%, End-to-end market research pipeline)
- **Business Cost stats (use verbatim):** 73% of enterprises report chatbot limitations · $2.4M avg annual cost of manual workflows · 4.2h avg time saved with agentic AI · Total estimated cost of NOT using agents: **$175K–$250K annually** for mid-size enterprise · 2.4x ROI · 45% time saved · 78% error reduction · Implementation: 3-6 months
- **Three business cost failure scenarios:** Missed Context (Customer Support — +15% churn, $50K-100K revenue loss, HIGH) · No Follow-Through (Sales — -30% deal velocity, $25K-50K loss, MEDIUM) · Zero Persistence (Data Management — compliance risk, $100K+ loss, CRITICAL)
- **Build artifact:** "AI Pattern Advisor" agent (NOT "Weekly Workflow Agent") — an agent that recommends the optimal AI pattern (Chatbot / RAG / Agent / Multi-Agent) for any business problem. Inputs: free-text problem description. Outputs: pattern + level + rationale + risk flag. Architecture: User Input → System Prompt (role: AI architect) → Decision Logic (4-question framework) → LLM (pattern analysis) → Structured Output.
- **Platform stack:** EdYoda Agent Builder + n8n orchestration
- **Session 3 bridge:** "Prompt Engineering — Learn how to communicate with agents precisely enough to make them reliable."

**From our spec (kept — pedagogy and UX):**

- Build-first spine (~58% hands-on)
- 4 role tracks (Marketing/Sales, Finance/Consulting, Doctor/Healthcare, Generic) — each builds their own AI Pattern Advisor variant
- Two-phase build (skeleton before break, depth after)
- 5 build steps lettered A-E
- 4-lens debrief (5 Gaps Scorecard, Maturity Ladder, Decision Funnel, Pattern Used)
- 3 peer demos at 1:43
- 70% rule at checkpoints
- "What's Next" close + mirrored take-home prompt
- All facilitator-script craftsmanship (timing guards, contingency guide, dry-run recommendation)
- Two distinct visual palettes: dark/teal for decks, paper/terra for carousel
- No "by minute X" in spoken italicized lines

**Visual elements to lift from PDF into our decks (Tasks 7-8):**

- EdYoda wordmark top-right of every slide
- Sub-topic kicker tag top-left ("SUB-TOPIC N · Name")
- Maturity Model with horizontal progress bars (25/50/75/100%)
- Side-by-side success/fail comparison cards (used in "In Practice — Competitor Analysis Request")
- 4-question funnel as stacked numbered cards
- "Key Insight" / "Thought Prompt" / "Bridge to Next Topic" callout boxes
- Stat headline numbers (73%, $2.4M, 4.2h) as oversized type with mono-font

---

---

## 1. Session Identity & Promise

**Title:** *"Why Agents? The Case for Autonomous AI"* (per EdYoda canon)
**Subtitle / one-liner:** *"By the end of this session, you'll identify chatbot gaps, classify business problems into AI patterns, quantify the cost of under-investing in agentic AI — and you'll build your first agent (no code)."*

**Duration:** 120 minutes
**Format:** Live virtual (Zoom/Meet), same audience as Session 1 (mixed India + international; marketing/sales, finance/consulting, at least one doctor)
**Hands-on share:** ~58% (≈70 min of learner activity — build + mini-exercise + reflection). See §3 for the time math.

**Spine:** Concept Sprint → Long Build → Pattern Debrief

**The Promise (delivered at session open):**

> *"Last session ended with a chatbot failing the bakery campaign — 4 out of 6 steps it couldn't do. By the end of today, you'll know why that happens — the five gaps every chatbot has. You'll learn the four-question framework that tells you when to use a chatbot, a RAG system, an agent, or a multi-agent system. You'll see the real business cost of staying on chatbots. And you'll build your first agent — no code. Three sessions in this course. This is the middle one — the case for autonomous AI. Session 3 takes you to the next layer: prompt engineering, so your agents are reliable."*

**Explicit callbacks to Session 1** (anchored throughout, not just at open):

- *"Brain in a jar"* → today we give it hands
- Session 1's four limitations (hallucination, static knowledge, no memory, no action) → today we patch three of them (memory, action, multi-step) with agent architecture
- The Bakery Campaign demo (Block 6 of Session 1, the 6-step failure) → today's build is the "fix"

**Tools assumed available (per EdYoda canon):**

- **EdYoda Agent Builder** — primary build platform
- **n8n** — orchestration (referenced by EdYoda PDF; used for multi-step / cross-tool workflows)
- ChatGPT / Claude / Gemini — still open as comparison points
- One pre-built EdYoda demo agent — used in Sprint 2 (Agent Loop demo) and Build Step E (multi-step goal demo)
- Pre-built backup agents per track in the facilitator's account, ready to clone if a learner gets stuck

**The Build Artifact:** Every learner builds an **AI Pattern Advisor** agent (per EdYoda canon), role-customized:

The AI Pattern Advisor is an intelligent recommendation system: given a free-text business problem description, it returns *pattern + maturity level + rationale + risk flag*. It uses the 4-question decision framework from Sprint 4 as its decision logic. Architecture: User Input → System Prompt (role: AI architect) → Decision Logic (4-question framework) → LLM (pattern analysis) → Structured Output.

| Track | AI Pattern Advisor — flavor + sample inputs |
|---|---|
| Marketing/Sales | Advises on AI patterns for marketing/sales workflows (lead routing, content personalization, campaign ops) |
| Finance/Consulting | Advises on AI patterns for financial workflows (variance commentary, compliance review, deal pipelines) |
| Doctor/Healthcare | Advises on AI patterns for clinical workflows (intake, handovers, follow-up scheduling) |
| Generic (fallback) | Advises on AI patterns for general knowledge-work workflows |

All four tracks share the same agent skeleton (same system-prompt structure, same decision logic, same output schema). Role customization happens via the **workbook** (track-specific pages with pre-written system prompts, starter problems, memory seeds, multi-step goal templates) — NOT via separate decks.

---

## 2. Pedagogical Design Decisions

These are the load-bearing decisions. Implementation must not deviate without revisiting the spec.

| Decision | Choice | Rationale |
|---|---|---|
| Spine | Build-first, concepts woven in | Session 1 promised learners they'd build an agent; honoring the promise is mandatory |
| Build artifact | ONE shared skeleton, role-customized via workbook | Easier solo-facilitation than 3-track parallel build; concepts land uniformly; high relevance via workbook customization |
| Concept structure | Quick concept block upfront (~20 min, 6 sprints), then build | Plants vocabulary before learners need it; allows callback-style anchoring during build (*"This closes Gap #2 from earlier"*) |
| Build split | Two halves separated by hard break | Skeleton before break = everyone hits same checkpoint; meaty steps after break when brains are fresh |
| Frameworks retention mechanism | 4-lens debrief AFTER build (1:35–1:43) | Concepts taught at 0:10 are seeds; concepts taught with a working agent on screen are roots |
| Voice in facilitator script | NO "by minute X" promises in spoken italicized lines | User feedback — these break the conversational flow; run sheet timing markers stay |
| Stragglers | 70% rule at each checkpoint | Don't hold the room for the slowest 30%; catch them async via DM/break |
| Session 3 tease | None — close as end of arc | Avoid diluting the "you're ready to run" message |

---

## 3. The 120-Minute Run Sheet (Block Outline)

| Block | Time | Length | Title | Mode |
|---|---|---|---|---|
| 0 | 0:00–0:10 | 10 min | Opening + Session 1 callback | Live, facilitator |
| 1 | 0:10–0:30 | 20 min | Concept Sprint (6 topics × ~3 min) | Demos + 1 mini-exercise |
| 2 | 0:30–0:55 | 25 min | Build Part 1: Skeleton Agent (role + 1 tool + first run) | Hands-on |
| — | 0:55–1:05 | 10 min | 🟢 HARD BREAK | Non-negotiable |
| 3 | 1:05–1:35 | 30 min | Build Part 2: Action Tool + Memory + Multi-Step | Hands-on, escalating |
| 4 | 1:35–1:50 | 15 min | Pattern Debrief (4 lenses) + Peer Demos (3 × 2 min) | Sense-making + show-and-tell |
| 5 | 1:50–2:00 | 10 min | What's Next + Reflection + Close | Conversational, intentional fade |

**Hands-on time math:** Block 2 (25) + Block 3 (30) + parts of Block 4 (peer demos = 7) + Block 5 reflection (3) = ~65 min direct learner activity. With Block 1's mini-exercise and Block 0's opening chat prompts (~5 min), total ≈ 70 min, or **~58% hands-on by minutes**. The script header uses ~58% for honesty. (For comparison: Session 1's script claimed ~60%.)

---

## 4. BLOCK 0 — Opening (0:00–0:10)

**Goal:** Re-establish the room. Anchor in Session 1's promise. Set up the build expectation.

- 0:00–0:02 — Cold open: one-word check-in in chat ("In one word, how did Session 1 land for you?"). Read 6–8 aloud by name.
- 0:02–0:04 — The callback: "Last time we built up to a chatbot failing the bakery campaign. Hands up in chat if that scene stuck with you." Reset stakes.
- 0:04–0:06 — Norms slide (same as Session 1: cameras optional, chat freely, mics muted, real break, parking lot link).
- 0:06–0:08 — The Promise (delivered as in Section 1 above).
- 0:08–0:10 — Roadmap: show today's flow as a single visual — *Concepts → Build → Debrief → Done.* Mention the build artifact (Weekly Workflow Agent, role-customized). Set the expectation: *"You will not leave with notes. You will leave with a working agent."*

⏱ **Time guard:** 0:10. If at 0:12, cut one of the cold-open readouts next time.

---

## 5. BLOCK 1 — Concept Sprint (0:10–0:30)

**Goal:** Plant vocabulary fast. Each topic = one visceral demo or visual + one analogy line. NOT mastery — recognition.

**Pacing rule:** 3 minutes per topic = ~60s setup + ~90s demo/visual + ~30s analogy line.

### Sprint 1 — The 5 Gaps That Agents Close (0:10–0:13)

**Demo:** Re-run the Bakery Campaign prompt from Session 1 live in ChatGPT. Same 6-step ask. Same failure pattern.

**Overlay matrix:**

| What ChatGPT couldn't do | The Gap |
|---|---|
| "Research what's trending this month" | **Tools** (no live web) |
| Remember "my partner is Sneha" across sessions | **Memory** |
| "Schedule across the next week" | **Autonomy** (can't act without permission per turn) |
| "Set a reminder in 30 days" | **Planning** (no time horizon) |
| All 6 steps in one go | **Multi-step reasoning** |

**Analogy:** *"A chatbot is a smart intern who forgets you between conversations, can't open any apps, and won't do anything without you typing the next instruction. An agent fixes all five."*

### Sprint 2 — From Prompt→Response to Goal→Plan→Act→Observe→Reflect→Iterate (0:13–0:16) (per EdYoda canon)

**Visual:** Two side-by-side diagrams in deck:
- **Chatbot loop:** Prompt → Response → (dead end, no follow-through)
- **Agent loop (6 steps per EdYoda):** Goal → Plan → Act → **Observe** → Reflect → Iterate → (loops until goal complete)

**Worked example (per EdYoda PDF page 7):** *"Weekly Sales Summary, Fridays 9am."* Walk the 6 steps as cards:
- **Goal:** Prepare weekly sales performance summary and send to team every Friday at 9am
- **Plan:** (1) Fetch CRM data, (2) Aggregate KPIs, (3) Generate report, (4) Schedule send
- **Act:** Fetch data, compute metrics, draft email, schedule
- **Observe:** Check delivery status, track opens, monitor feedback
- **Reflect:** Evaluate success, identify issues, note improvements
- **Iterate:** Adjust parameters, optimize timing, refine content

**Demo:** Show pre-built EdYoda demo agent's **trace log** running on a tiny goal. Pause on each of the 6 steps as the agent executes. Learners *see* each loop stage.

**Analogy (per EdYoda canon):** *"A chatbot is a vending machine — you press a button, you get one thing, no follow-up. An agent is a **project manager** — you give it a goal, they plan steps, execute, check results, and adjust."*

### Sprint 3 — Agent Maturity Model: L0 → L1 → L2 → L3 (0:16–0:19) (per EdYoda canon)

**Visual:** Maturity ladder with horizontal progress bars (per EdYoda PDF page 8). Each rung shows: name + tag + example + progress bar.

| Level | Name | Tag | Example | Maturity bar |
|---|---|---|---|---|
| **L0** | Chatbot | Single turn, no memory, no tools | FAQ bot on website — answers one question at a time | 25% |
| **L1** | Copilot | Tool-use + retrieval, assists humans | GitHub Copilot, Sales email assistant — helps but doesn't execute | 50% |
| **L2** | Agent | Planning + memory + multi-step execution | Recruitment screening agent — works autonomously until goal complete | 75% |
| **L3** | Multi-Agent | Multiple specialists coordinated by orchestrator | End-to-end market research pipeline | 100% |

**Key insight to deliver verbatim (per PDF):** *"Most enterprises are at Level 0–1 today. The competitive advantage is in moving to Level 2–3."*

**Analogy:** *"Like the self-driving levels. L0 = you driving. L1 = lane assist. L2 = car drives on the highway while you supervise. L3 = car drives across the city."*

**Thought challenge (deliver as chat prompt, 30 sec):** *"Where does your organization sit on this model today? Type L0, L1, L2, or L3 in chat."* Read 3-4 aloud.

### Sprint 4 — Decision Framework: 4-Question Funnel (0:19–0:22) (per EdYoda canon)

**Visual:** Stacked numbered question cards (per EdYoda PDF page 9). The funnel:

1. **Does the answer exist in a fixed document or database?**
   - YES → **RAG**
   - NO → Continue
2. **Does the task require a single response with no follow-up action?**
   - YES → **Chatbot**
   - NO → Continue
3. **Does the task require multiple steps, memory, or tool use?**
   - YES → **Agent**
   - NO → Continue
4. **Does the task require multiple specialized capabilities working in parallel?**
   - YES → **Multi-Agent**

**Pattern comparison panel (right side of slide):**
- RAG → Document retrieval
- Chatbot → Single response
- Agent → Multi-step tasks
- Multi-Agent → Parallel execution

**Mini-exercise (2 min — apply the framework to 4 scenarios, per EdYoda PDF page 11):** Read each aloud, learners type the pattern in chat (R / C / A / M):
1. *"Answer customer questions about return policy."* → **R** (RAG — fixed knowledge in documents)
2. *"Generate one-time product description."* → **C** (Chatbot — single response, no follow-up)
3. *"Screen 200 resumes and schedule interviews."* → **A** (Agent — multi-step + tools + memory)
4. *"Run competitive intelligence report."* → **M** (Multi-Agent — parallel specialties)

**Key insight to deliver verbatim:** *"Use this framework to match your business problem to the right AI pattern. Pattern matching success rate when teams use this discipline: 95%."*

**Analogy:** *"Don't bring a chainsaw to butter your toast. Match the tool to the job."*

### Sprint 5 — Real Business Cost of NOT Using Agents (0:22–0:25) (per EdYoda canon)

**Visual:** Three failure-scenario cards (per EdYoda PDF page 12) + headline stat strip.

**Three failure scenarios (each gets a card on the slide):**

| Scenario | Function | Symptom | Business Impact | Severity |
|---|---|---|---|---|
| **Missed Context** | Customer Support | Agent gives wrong advice due to no memory of prior interactions | +15% customer churn rate · $50K-100K revenue loss | HIGH |
| **No Follow-Through** | Sales | Chatbot drafts proposal but cannot send or track it | -30% deal velocity · $25K-50K revenue loss | MEDIUM |
| **Zero Persistence** | Data Management | Session times out, all context is lost | Compliance risk — audit failures, legal penalties, $100K+ loss | CRITICAL |

**Headline stat strip (use verbatim — per EdYoda PDF pages 2 + 12 + 13):**
- **73%** of enterprises report chatbot limitations
- **$2.4M** average annual cost of manual workflows
- **4.2h** average time saved per workflow with agentic AI
- **Total estimated cost of not using agents: $175K–$250K annually** (mid-size enterprise)
- **ROI: 2.4x return on investment** · Implementation timeline: 3-6 months
- Pattern matching success rate: 95% · Time saved: 45% · Error reduction: 78%

**Analogy:** *"Using only chatbots in 2026 is like using a calculator in a spreadsheet world — it works, but you're doing the integration in your head."*

### Sprint 6 — Agentic Architecture Patterns: 5 Patterns & When to Use Each (0:25–0:28) (per EdYoda canon)

**Visual:** Five pattern cards in 3×2 deck grid (per EdYoda PDF page 14).

| Pattern | Tag | When to use | Example |
|---|---|---|---|
| **Single Agent** | Self-contained | Task is self-contained, sequential, no parallel processing | Email drafting agent |
| **RAG Agent** | Document-based | Task requires grounding in documents or proprietary data | Support FAQ bot |
| **Tool-Calling Agent** | API integration | Task requires reading from or writing to external systems | CRM data sync |
| **Orchestrator-Worker** | Multi-agent | Task has parallel workstreams requiring different expertise | Market research pipeline |
| **Human-in-the-Loop** | High-stakes | Task involves high-stakes decisions or regulated actions | Financial approvals |

**Highlight today's build:** *"You're about to build a **Single Agent** with tool calling and an embedded decision-logic system prompt — the foundation pattern. The other four are extensions of this one."*

**Bridge to Session 3 (deliver verbatim per EdYoda PDF page 14):** *"Now that you can identify patterns, the next layer is mastering the language of agent communication — Prompt Engineering. That's Session 3."*

**Analogy:** *"Patterns are recipes. You're learning the base recipe — sandwich. Once you can make a sandwich, you can make a burger, a wrap, a bento box. Same skill, more sophistication."*

### Sprint Close — Bridge to Build (0:28–0:30)

*"You've seen the gaps, the loop, the ladder, the decision tree, the cost, and the patterns. Now stop watching me. Open EdYoda Agent Builder. We're building yours."*

⏱ **Time guard:** 0:30. If at 0:32, cut the Sprint 4 mini-exercise next time and move the C/R/A/M to the workbook.

---

## 6. BLOCK 2 — Build Part 1: Skeleton Agent (0:30–0:55)

**Goal:** Every learner has a running, role-customized L1-ish agent (system prompt + 1 tool + 1 successful run) by 0:55.

### 0:30–0:34 — EdYoda Builder Walkthrough (no learner action)

Share screen. Walk the 4 panels in 60 sec each:
1. **Role / System Prompt** — "the agent's job description, plain English"
2. **Tools** — "where you give it hands"
3. **Memory** — "what it remembers across runs — we'll turn this on after the break"
4. **Test / Run** — "where you talk to it"

### 0:34–0:38 — Pick Your Track

Paste in chat:
> Pick your track, type the number in chat: (1) Marketing/Sales, (2) Finance/Consulting, (3) Doctor/Healthcare, (4) Generic. Then open workbook to your track's page.

Read out distribution: *"12 marketing, 4 finance, 1 doctor, 8 other — got it. Everyone builds the same shape; the words just differ."*

### 0:38–0:48 — BUILD STEP A: System Prompt + First Tool (10 min)

Learner steps (from workbook):
1. New Agent → name it `[YourName]'s AI Pattern Advisor — [Track]`
2. Paste track's pre-written system prompt into Role panel. The system prompt encodes the 4-question decision framework as the agent's decision logic (role: "AI architect").
3. Enable ONE tool: **Web Search** (used to research business problems described by the user before classifying)
4. Save. Don't run yet.

Facilitator builds alongside on screen, narrating sparsely.

Watch for: missing Tools panel, paste formatting issues, login glitches.

**Concept callout (anchor to Sprint 1, Gap #1):** *"You just closed Gap #1 — Tools. Your agent can search the web. ChatGPT free tier can't. Feel the difference."*

### 0:48–0:54 — BUILD STEP B: First Run (6 min)

Paste in chat:
> In Test panel, paste your track's **starter goal** from workbook. Hit Run. Watch the trace log. Paste the **first line of your agent's output** in chat.

Read 5–6 outputs aloud by name.

**Concept callout (anchor to Sprint 2):** *"You gave it a goal. It made a plan. It acted. It reflected. It drafted. That's the loop. You ran your first agent."*

### 0:54–0:55 — Pre-Break Anchor

Type 👍 if you have a running agent. Count thumbs.
- ≥80% → break.
- <80% → "DM me or stay 2 min into break, I'll fix it with you. Everyone else: real 10-minute break starts now."

⏱ **Time guard:** 0:55. Honor the break.

### Facilitator notes for Block 2

- **Pre-built backup agent per track** in your account. If a learner is stuck, clone yours to their account post-break so they can continue.
- **70% rule.** Move on. Don't punish the room for stragglers.
- **No concept teaching during build steps.** Save callouts for AFTER each step.

---

## 7. 🟢 HARD BREAK (0:55–1:05) — 10 MINUTES, NON-NEGOTIABLE

Music. Slide up: *"Back at [time]."* Mute yourself. (Use the break to DM stragglers and clone backup agents.)

Research note (kept from Session 1): Bailenson Zoom-fatigue research — screen fatigue compounds non-linearly after 50 min.

---

## 8. BLOCK 3 — Build Part 2: Tools, Memory, Multi-Step (1:05–1:35)

**Goal:** Take the skeleton from L1-ish copilot to L2 agent. By 1:35, every learner has an agent with multiple tools, persistent memory, and a successful multi-step run.

**Visible checkpoints on screen throughout this block:**
- ✅ Done: Role + 1 tool + 1 goal
- ⏳ Next: Add a second tool (acts, doesn't just read)
- ⏳ Then: Turn on memory
- ⏳ Then: Multi-step goal

### 1:05–1:08 — Welcome Back

Type 🚀 if back. Frame: three things — second tool, memory, multi-step. Each closes a gap.

### 1:08–1:16 — BUILD STEP C: Add an Action Tool (8 min)

Setup: *"Right now your agent can READ the world. It cannot CHANGE the world. We're fixing that."*

Learner steps:
1. Enable a SECOND tool from track menu:
   - Marketing → Email Draft (or Slack Post)
   - Finance → Spreadsheet Writer (or Email Draft)
   - Doctor → Calendar (or Document Writer)
   - Generic → Email Draft
2. Update system prompt — add a line that explicitly invokes the new tool ("When the draft is ready, [send via Email / write to spreadsheet / schedule the follow-up].")
3. Re-run the same goal. Watch trace log.
4. Paste in chat: name of the tool the agent called second.

Watch for: skipped prompt update; agent ignores new tool (prompt not explicit enough).

**Concept callout (Gap #3 — Autonomy):** *"Your agent just did something on its own. It didn't ask you per step. That's autonomy — bounded, defined, but real."*

### 1:16–1:23 — BUILD STEP D: Turn On Memory (7 min)

Setup: Have learners run their agent with "what did you do last time?" — it doesn't know. Reference Session 1 "no memory" demo.

Learner steps:
1. Memory panel → toggle **Persistent Memory** ON
2. Type: **Conversation Memory** (remembers prior runs)
3. Add memory seed from workbook page 8 (track-specific). Example for marketing: *"Always remember: my company is [X], my audience is [Y], my brand voice is [Z]. Use these in every draft."*
4. Run a NEW goal. Notice it uses seeded context automatically.
5. Run a SECOND new goal. Notice it remembers the first.

**Concept callout (Gap #2 — Memory):** *"Second gap closed. Memory. Your agent now has context that survives the conversation. The next colleague who runs this agent inherits everything you've taught it."*

### 1:23–1:33 — BUILD STEP E: The Multi-Step Goal (10 min) — THE CLIMAX

Setup: Run YOUR pre-built agent against a 4-step goal on screen. Show trace log unfolding. Don't narrate over it.

Learner steps (from workbook page 9):
1. Give your agent a goal with **at least 3 steps** using template:
   ```
   I need you to:
   1. [research/read something]
   2. [draft something based on step 1]
   3. [send/save/schedule the draft]
   ```
2. Use track-specific examples in workbook
3. Run. Watch trace log unfold.
4. Paste in chat: number of tool calls (from trace log).

**Concept callout (Gap #5 — Multi-step reasoning):** *"Look at your trace log. 4 tool calls. 6 tool calls. Some of you got 9. Every one was a decision your agent made on its own. You gave it a goal. It made a plan. It executed. **That's the line you just crossed — from chatbot to agent.**"*

### 1:33–1:35 — Build Anchor

"What's the most surprising thing your agent did? One line." Read 4–5 aloud. Common patterns:
- "Asked me a clarifying question first" → *"That's reflection. The R in our loop."*
- "Got stuck" → *"Where the Reflection pattern would fix it. Hold that thought."*
- "Actually emailed me" → *"It actually did the thing. That's the unlock."*

*"Step back from your screen for 30 seconds. You built an agent. From a blank canvas. In an hour. No code."*

### Facilitator notes for Block 3

- **Trace log is the star.** Every checkpoint, point at it.
- **If memory toggle is finicky in EdYoda:** Have a screenshot ready, verbally walk through. Don't let a product hiccup derail the unlock.
- **If a learner's agent does something brilliant:** Stop and screen-share their result (with permission). Peer wins land harder than facilitator demos.
- **If a learner's agent does something dumb:** Same — debug live. Failures are gold.

⏱ **Time guard:** 1:35. Pivot.

---

## 9. BLOCK 4 — Pattern Debrief + Peer Demos (1:35–1:50)

**Goal:** Make frameworks STICK by mapping them onto the agent learners just built.

### 1:35–1:43 — PATTERN DEBRIEF: 4 Lenses (8 min)

Frame: *"You built it. Now let's name what you built. Two minutes ago you had an agent. Now look at it through the four lenses from the start of class — and see why those frameworks weren't academic."*

**Lens 1 — 5 Gaps Scorecard (90 sec):** Same matrix from Sprint 1, now with checkmarks:

| Gap | Your agent |
|---|---|
| Tools | ✅ 2 tools |
| Memory | ✅ Persistent memory on |
| Autonomy | ✅ Acted without per-step approval |
| Planning | ✅ 3+ step goal executed |
| Multi-step reasoning | ✅ Trace log proves it |

*"Five for five. You closed every Session 1 gap in 90 minutes."*

**Lens 2 — Maturity Ladder (90 sec):** Pull up ladder. Ask in chat: where did you land?

Most will say L2. *"Correct. L2 solves probably 80% of workflows you'd want to automate at work. Don't over-engineer."*

**Lens 3 — Decision Quadrant (90 sec):** Walk learners' agent through the quadrant live. *"Acts on the world? Yes. Answer changes with new info? Yes. You're in the Agent quadrant. Not RAG. Not chatbot. Agent."*

*"Next time someone at work says 'let's use AI for X,' put it through this quadrant first."*

**Lens 4 — The Pattern You Just Used (90 sec):** Pull up 4 pattern cards. *"You built Single-Agent + Tools. The base recipe. Upgrade path:"*
- Same wall twice → Reflection loop
- Goal too complex → Planner + Executor
- Need specialists → Multi-agent

*"You don't need any of these yet. But now you know what they're called."*

### 1:43–1:50 — PEER DEMOS: 3 Show-and-Tells (7 min)

Pre-pick 3 volunteers during Build Step E (DM at ~1:30). Pick for **variety** (one marketing, one finance, one doctor/other), not virtuosity.

Each demo (2 min):
1. 30 sec: name, role, what their agent does
2. 60 sec: live screen-share, run it, narrate trace log
3. 30 sec: you react, name the pattern

If no volunteers: pre-identify 2 strong chat-active learners, DM at 1:30. Backup: a screenshot of your own agent.

---

## 10. BLOCK 5 — What's Next + Reflection + Close (1:50–2:00)

### 1:50–1:55 — WHAT TO BUILD NEXT (5 min)

Single slide, three next-steps:

1. **This week:** Run your agent 5 times on real work. Track time saved (workbook page 10).
2. **Next 2 weeks:** Iterate the system prompt. Treat the agent like a junior employee you're coaching.
3. **Next month:** Show it to one colleague. Find ONE workflow they'd want. Build the second agent.

*"You don't need another course. You need 30 minutes a week and a real problem."*

### 1:55–1:58 — Parking Lot Q&A (3 min)

Same Parking Lot Google Doc from Session 1, with new section "Session 2 — Open Questions." Answer top 2 in ~45 sec each.

### 1:58–2:00 — Close (2 min)

Paste in chat:
> **Take with you (reply by Friday):**
> 1. ONE workflow at your job you'll automate with your agent this month.
> 2. ONE workflow you WON'T — because it's a chatbot job, a RAG job, or too sensitive for an agent today.
>
> Two sentences each. I read every reply.

*"Two sessions ago, this was a vending machine. One session ago, a chatbot was a brain in a jar. Today you gave it hands. That's the journey. You did the hard part — you showed up, you stayed, you built. Go run your agent on something real this week. That's the only homework that matters."*

*"Thank you. See you online. Bye."*

Wave. Stop recording. End meeting.

### Facilitator notes for Block 5

- 4-lens debrief is the highest-leverage moment of the session. Don't rush it. If running 2 min over, steal from parking lot — not this.
- Peer demos can implode. 30-sec recovery: *"Agents break — let's debug for 60 sec, then I'll show mine."*
- The close mirrors Session 1 intentionally. Session 1: "one to automate AND one where it'd be dangerous." Session 2: "one to automate AND one NOT to." Symmetry signals: we taught both sides of the decision.
- **No Session 3 tease.** Close the arc.

---

## 11. Deliverables (Asset File Plan)

All files live in `Session 02 - From Chatbot to Agent/`.

| # | File | Format | Purpose |
|---|---|---|---|
| 1 | `01_Facilitator_Script.md` | Markdown | Minute-by-minute run sheet. Same structure as Session 1: BLOCK 0–5, what you say (italics), what you do, what learners do, timing guards. Includes pre-class checklist, contingency guide. Target length ~500 lines. |
| 2 | `02_Learner_Workbook.md` | Markdown | 11 pages. Pages 1–3: welcome, checklist, opening. Pages 4–7: track pages (1 per track) with pre-written system prompts, starter goals. Page 8: memory seeds. Page 9: multi-step templates. Page 10: 5-run tracking table. Page 11: reflection prompt + parking lot. |
| 3 | `presenter_deck.html` | HTML/CSS | ~20 slides. Hero, Promise, Session 1 callback, 6 Sprint slides, Build checkpoint slide, 4 Debrief lens slides, Peer demo placeholder, What's Next, Close. Visual continuity with Session 1 deck. |
| 4 | `learner_deck.html` | HTML/CSS | Stripped version of presenter deck — no facilitator notes, exercise prompts as full-screen cards. |
| 5 | `linkedin_carousel.html` + `.pdf` | HTML → PDF | 10-card carousel for post-session promotion. Theme: *"5 things changed when we stopped using ChatGPT and started using agents."* |
| 6 | `cover_options.html` | HTML | 3–4 cover image options for Zoom waiting room, LinkedIn post hero, email header. |

### Explicit NON-deliverables (YAGNI cuts)

- ❌ Separate "supplementary reading" PDF — workbook is the reference
- ❌ Video recordings of demos — facilitator builds live; screenshots only as backup
- ❌ Standalone reference PDF — Session 1's PDF was source material, not a deliverable
- ❌ Session 3 tease deck
- ❌ Separate decks per track — role customization lives in the workbook

### Implementation dependency order

1. Facilitator Script (foundation; everything else references its block/step numbers)
2. Learner Workbook (references script's build steps verbatim)
3. Presenter Deck (references workbook page numbers)
4. Learner Deck (stripped from Presenter Deck)
5. LinkedIn Carousel + Cover Options (independent of script, can be done in parallel)

---

## 12. Risks & Contingencies

| Risk | Mitigation |
|---|---|
| EdYoda Agent Builder is down or laggy at session time | Backup: pre-built agents in facilitator account that can be cloned to learner accounts; static screenshots of every key UI panel; verbal walkthrough fallback |
| 3-min-per-topic concept sprint is too fast | Pre-recorded "extended cut" of any sprint can be linked in workbook for after-class deep dive; mini-exercise in Sprint 4 can be cut if running over |
| Memory toggle in EdYoda doesn't behave as designed | Have a screenshot showing it working; verbally walk through; don't let one product hiccup derail unlock |
| Multi-step goal fails for many learners | Pre-tested goal templates per track in workbook; facilitator runs same goal on screen so learners can copy; have a "known-good" goal as fallback |
| Peer demo volunteer's screen-share fails or agent breaks live | 30-sec recovery script: *"Agents break — let's debug for 60 sec, then I'll show mine"*; backup screenshot of own agent ready |
| Energy crashes after the break | Same as Session 1 — stand-up stretch break, 30 sec |
| Someone is dominating chat | Same as Session 1 — *"Love the energy [Name] — let's hear from others first"* |
| Running over at 1:35 (debrief about to start) | Cut the 1:33–1:35 "surprising thing" anchor; go straight to debrief |
| Running over at 1:50 (close about to start) | Cut "What's Next" slide to 2 min (skip detail on points 2 and 3); keep close intact |
| <70% finished by checkpoint | Move on anyway; pull stragglers into 1:1 DMs during next block |

---

## 13. Success Criteria

Session 2 succeeds if, at session end:

1. **≥80% of learners have a running agent on their screen** that:
   - Uses ≥2 tools
   - Has persistent memory enabled
   - Has successfully completed at least one multi-step (3+ step) goal
2. **≥70% of learners can articulate** (in the take-home reflection):
   - One workflow at their job they'd automate with an agent
   - One workflow they would NOT — and which framework (chatbot / RAG / agent / multi-agent) it belongs to instead
3. **All 6 deliverables** in Section 11 are produced and reviewed before the session date.
4. The facilitator script can be run end-to-end in a solo dry-run within ±10 min of the 120-min target.

---

## 14. Open Questions / Out of Scope

- **EdYoda Agent Builder feature parity:** This spec assumes EdYoda supports persistent memory, multi-tool agents, and a visible trace log. If any of these are missing or named differently in the product, the facilitator script must be updated during implementation to match actual UI labels. Verify during pre-class checklist.
- **Track #4 (Generic) demand:** If <3 learners pick "Generic," consider consolidating into a sister track to reduce facilitator load.
- **Async/recorded version:** Out of scope for this spec. If created later, will need its own design — peer demos and live build checkpoints don't translate.
