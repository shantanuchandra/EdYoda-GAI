# Session 2 "From Chatbot to Agent" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the complete asset set for Session 2 of the "Generative AI for Non-Coders" 2-session course — facilitator script, learner workbook, two presenter decks, LinkedIn carousel, and cover options — that delivers the build-first, concept-woven 120-minute experience defined in the design spec.

**Architecture:** Document-and-asset production project (not software). Each deliverable is a self-contained file. Order matters: the **facilitator script is the spine** — every other artifact references its block/step numbers. Workbook references script's exact build steps; decks reference workbook page numbers; learner deck is derived from presenter deck; carousel and covers are independent.

**Tech Stack:** Markdown (script, workbook), single-file HTML + inline CSS (decks, carousel, covers — matches Session 1 pattern), Google Fonts (Inter + JetBrains Mono for decks; Fraunces + Geist for carousel — preserving Session 1's dual-palette design system). No build tools, no JS frameworks. Decks open directly in browser; carousel exports to PDF via browser print.

**Source of truth:** `docs/superpowers/specs/2026-05-17-session-2-chatbot-to-agent-design.md`. Read it before starting. If anything in this plan contradicts the spec, the spec wins — flag and revisit before proceeding.

**Reference artifacts to match:** `Session 01 - Generative AI Foundations/` contains the Session 1 versions of every deliverable. Open the corresponding Session 1 file BEFORE writing each Session 2 file to match voice, structure, length, and visual language.

**Critical user feedback to honor throughout:** NO "by minute X" promises in facilitator-spoken italicized lines. Internal run-sheet timing markers (`### 0:10 – 0:14`, `⏱ Time check`) stay. See `~/.claude/projects/-Users-shantanuchandra-Downloads-Personal-EdYoda---GAI/memory/feedback_no_minute_callouts.md`.

---

## File Structure

All paths relative to repo root `/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/`.

**Directory to create:** `Session 02 - From Chatbot to Agent/`

**Files to create (in dependency order):**

| # | Path | Responsibility |
|---|---|---|
| 1 | `Session 02 - From Chatbot to Agent/01_Facilitator_Script.md` | Minute-by-minute run sheet. Foundation document — all others reference its block/step IDs. |
| 2 | `Session 02 - From Chatbot to Agent/02_Learner_Workbook.md` | 11-page learner workspace. Pages 4-7 are role-track-specific. References script's BUILD STEPS by letter (A/B/C/D/E). |
| 3 | `Session 02 - From Chatbot to Agent/presenter_deck.html` | ~20-slide facilitator deck. References workbook page numbers. Dark palette (matches Session 1 deck design tokens). |
| 4 | `Session 02 - From Chatbot to Agent/learner_deck.html` | Slimmer learner-facing version of presenter deck. No facilitator notes; exercise prompts as full-screen cards. |
| 5 | `Session 02 - From Chatbot to Agent/linkedin_carousel.html` | 10-card LinkedIn carousel. Paper/terra palette (matches Session 1 carousel design tokens). 1080×1080 cards. |
| 6 | `Session 02 - From Chatbot to Agent/linkedin_carousel.pdf` | PDF export of carousel via browser print. |
| 7 | `Session 02 - From Chatbot to Agent/cover_options.html` | 3-4 cover image options (16:9 and 1:1 ratios) for Zoom waiting room, LinkedIn hero, email header. |

**File NOT to create (YAGNI cuts from spec §11):** supplementary reading PDF, video recordings, standalone reference PDF, Session 3 tease deck, separate decks per track.

---

## Naming Conventions Used Across Files (must be consistent)

These IDs appear across multiple files. Lock them now; keep identical everywhere.

- **Block numbers:** BLOCK 0 (Opening), BLOCK 1 (Concept Sprint), BLOCK 2 (Build Part 1), BLOCK 3 (Build Part 2), BLOCK 4 (Pattern Debrief + Peer Demos), BLOCK 5 (What's Next + Close). 6 blocks total, numbered 0-5. (HARD BREAK is between Block 2 and Block 3, not numbered.)
- **Sprint numbers (inside Block 1):** Sprint 1 (5 Gaps), Sprint 2 (Goal→Plan→Act loop), Sprint 3 (Maturity Model L0-L3), Sprint 4 (Decision Quadrant), Sprint 5 (Cost), Sprint 6 (Patterns).
- **Build step letters:** STEP A (system prompt + first tool), STEP B (first run), STEP C (add action tool), STEP D (turn on memory), STEP E (multi-step goal). 5 steps, lettered A-E. A and B are in Block 2; C, D, E are in Block 3.
- **Track names (exact strings):** "Marketing/Sales", "Finance/Consulting", "Doctor/Healthcare", "Generic". Use these exact strings everywhere — workbook headings, script chat-prompts, deck callouts.
- **Track agent names:** "Weekly campaign recap agent" (Marketing), "Variance commentary agent" (Finance), "Patient handover agent" (Doctor), "Weekly status report agent" (Generic).
- **The 4 lenses (debrief, Block 4):** Lens 1 (5 Gaps Scorecard), Lens 2 (Maturity Ladder), Lens 3 (Decision Quadrant), Lens 4 (Pattern You Used).

---

# TASKS

## Task 0: Setup

**Files:**
- Create directory: `Session 02 - From Chatbot to Agent/`

- [ ] **Step 1: Verify Session 1 reference assets are accessible**

Run: `ls "Session 01 - Generative AI Foundations/"`

Expected output: 8 files including `01_Facilitator_Script.md`, `02_Learner_Workbook.md`, `presenter_deck.html`, `learner_deck.html`, `linkedin_carousel.html`, `linkedin_carousel.pdf`, `cover_options.html`, and the source PDF.

If any file is missing, STOP and report — Session 2 production depends on Session 1 as reference.

- [ ] **Step 2: Read the design spec end-to-end**

Read: `docs/superpowers/specs/2026-05-17-session-2-chatbot-to-agent-design.md`

Hold all 14 sections in mind before starting Task 1. The spec is the single source of truth.

- [ ] **Step 3: Create the Session 02 directory**

Run: `mkdir -p "Session 02 - From Chatbot to Agent"`
Verify: `ls -d "Session 02 - From Chatbot to Agent"`
Expected: directory exists.

---

## Task 1: Facilitator Script (Pre-Class + BLOCK 0)

**Files:**
- Create: `Session 02 - From Chatbot to Agent/01_Facilitator_Script.md`

**Reference to mirror:** `Session 01 - Generative AI Foundations/01_Facilitator_Script.md` — lines 1-101 (header + pre-class + Block 0). Match structure, density, and tone exactly.

- [ ] **Step 1: Read Session 1's script header + Block 0 (lines 1-101)**

Read: `Session 01 - Generative AI Foundations/01_Facilitator_Script.md` offset 1, limit 101.

Note the structural elements: title with session number, duration/format/spine/hands-on metadata, pre-class checklist, opening hook slide quote, the run-sheet preamble line ("Each block has: what you say (italics), what you do, what learners do, and timing guard."), Block 0's micro-segments (0:00-0:02, 0:02-0:04, etc.) with norms table, parking lot mechanic, predict-the-output meta-demo, self-intro + roadmap.

- [ ] **Step 2: Write the script header + pre-class checklist**

Create `Session 02 - From Chatbot to Agent/01_Facilitator_Script.md` with this exact content:

```markdown
# Facilitator Script — Generative AI for Non-Coders (Session 2 of 2)
**Duration:** 120 minutes · **Format:** Live virtual (Zoom/Meet) · **Audience:** Same cohort as Session 1 (working professionals, mixed India + international; marketing/sales, finance/consulting, at least one doctor).
**Spine:** Concept Sprint → Long Build → Pattern Debrief
**Hands-on share:** ~58% (≈70 min of learner activity — build + mini-exercise + reflection)
**Tools assumed available:** EdYoda Agent Builder (primary), ChatGPT / Claude / Gemini (comparison points), one pre-built EdYoda demo agent ready, pre-built backup agents per track in your account ready to clone.

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] Send a 1-line email: *"Tomorrow's Session 2 — please log into EdYoda Agent Builder (your account from Session 1) and re-open chat.openai.com, claude.ai, gemini.google.com. Have your Session 1 workbook handy. We're building."* Include the calendar link.
- [ ] Send the **Session 2 Learner Workbook** as a Google Doc (view-only, in-class link in chat).
- [ ] In EdYoda Agent Builder, pre-build the following:
  1. **The demo agent** (the one you teased at end of Session 1) — verify it runs end-to-end on a 3-step goal.
  2. **One backup agent per track** (Marketing, Finance, Doctor, Generic) — saved in your account, ready to share/clone to stuck learners.
- [ ] Pre-load 5 browser tabs on your machine:
  1. EdYoda Agent Builder (logged in, demo agent open)
  2. ChatGPT (for the Bakery Campaign re-run in Sprint 1)
  3. Claude.ai (backup)
  4. Gemini (backup)
  5. The Parking Lot Google Doc from Session 1 (with new section "Session 2 — Open Questions" added)
- [ ] Open the Parking Lot Google Doc, paste link in your chat-ready clipboard.
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] Have water, printed copy of this script, visible timer.
- [ ] (Optional but recommended) Recruit a co-pilot / TA to monitor chat for stuck learners during build steps. Solo-facilitating is possible; co-facilitator makes the 70% rule (Block 2 pre-break) much smoother.

---

## Opening Hook Slide (have this up 5 min before class starts)

> **"Last session ended with a chatbot failing the bakery campaign. Today, you'll fix it. You'll leave with a working agent — yours, customized to your job. No code."**

Play soft instrumental music until you start. Welcoming, not awkward silence.

---

# THE 120-MINUTE RUN SHEET

Each block has: **what you say (italics)**, **what you do**, **what learners do**, and **timing guard**.

---
```

- [ ] **Step 3: Write BLOCK 0 — Opening (0:00–0:10)**

Append to `01_Facilitator_Script.md`:

```markdown
## BLOCK 0 — OPENING (0:00 – 0:10)
**Goal:** Re-establish the room. Anchor in Session 1's promise. Set up the build expectation.

### 0:00 – 0:02 — Cold Open (re-warm the room)

*"Hi everyone — welcome back. Quick request before anything else. **In one word in the chat — how did Session 1 land for you?** Stuck? Curious? Inspired? Confused? Just one word."*

→ Wait 30 seconds. Read 6-8 out loud, **by name**.

*"Thank you Priya, thank you Rajesh, thank you Anita… Stuck AND curious — perfect. That's exactly the energy this session is built for."*

> **Why this works:** Returning learners need the same trust-building open as first-time learners. Names + chat in the first 90 seconds re-establishes the contract.

### 0:02 – 0:04 — The Session 1 Callback

*"Quick callback. Last time we ended with a demo — I asked ChatGPT to launch a bakery marketing campaign. Remember what happened? Type 🥐 in chat if you remember the bakery scene."*

→ Wait. Croissants will come. *"Four out of six steps it couldn't do. Couldn't research live. Couldn't schedule. Couldn't email. Couldn't remember. That was the chatbot ceiling — the brain in a jar. Today, we give it hands."*

### 0:04 – 0:06 — Norms Refresh (show this on screen)

Read aloud, briskly:

| Norm | What it means |
|---|---|
| **Cameras** | Encouraged but optional. I will not call out off-camera folks. |
| **Chat** | Use it freely — questions, reactions, even jokes. |
| **Mics** | Stay muted unless I call on you or you want to share. |
| **Questions** | Hot ones in chat — I'll answer live or save them for our **Parking Lot** doc, link coming. |
| **Break** | A real 10-minute break at the 55-minute mark. Promise. |
| **NEW today** | You will spend more time in EdYoda Builder than watching me. That's the point. |

→ Paste the **Parking Lot Google Doc link** in chat right now. (Same doc as Session 1, new section.)

### 0:06 – 0:08 — The Promise

*"Here's the promise for today. You'll build a working agent — your own, customized to your job. By the end of this session it'll do three things ChatGPT physically cannot: use multiple tools, remember across runs, and execute a multi-step plan on its own."*

*"You'll know exactly when to use it, when not to, and what to build next. You'll leave with the thing — not the notes."*

### 0:08 – 0:10 — Roadmap

→ Show the roadmap slide: **Concepts → Build → Debrief → Done.**

*"Four phases. Twenty minutes of concepts — fast, so you have the vocabulary. About an hour of building — split by a real break. Fifteen minutes of debrief, where you'll see why those concepts weren't academic. Then close."*

*"One more thing — every learner will pick a track in a few minutes. Marketing, finance, doctor, or generic. Same agent shape; different words. Your workbook has track pages — pages 4 through 7. Don't open it yet."*

> ⏱ **Time check: 0:10.** If you're at 0:12, cut one of the cold-open readouts next time.

---
```

- [ ] **Step 4: Verify Block 0 length and tone**

Read what you just wrote. Check:
- No "by minute X" in italicized spoken lines (none should appear)
- Each micro-block has italicized speech + paste-able instructions + "what you do" / "what learners do" parallel to Session 1
- Total Block 0 length ≈ Session 1's Block 0 length (Session 1's was ~58 lines)

If the section drifts longer than ~70 lines, tighten — cut narration, keep instructions.

- [ ] **Step 5: Commit checkpoint (no git in this repo, so just verify state)**

Run: `ls -la "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md"`
Expected: file exists, non-zero size.

If git is initialized later (`git init`), commit message would be: `feat(session-2): facilitator script header + Block 0`

---

## Task 2: Facilitator Script (BLOCK 1 — Concept Sprint)

**Files:**
- Modify: `Session 02 - From Chatbot to Agent/01_Facilitator_Script.md` (append BLOCK 1)

**Reference to mirror:** Spec §5 (Block 1 detail) — 6 sprints × ~3 min each. Each sprint has a one-line setup, a demo or visual callout, an analogy line.

**Pacing discipline:** This block is the biggest risk for time overrun. Every sprint MUST be writeable within 25-30 script lines. If you find yourself writing 50 lines for one sprint, you're over-explaining — cut.

- [ ] **Step 1: Write the Block 1 opener and Sprint 1 (5 Gaps)**

Append to `01_Facilitator_Script.md`:

```markdown
## BLOCK 1 — CONCEPT SPRINT (0:10 – 0:30)
**Goal:** Plant the vocabulary fast. Each topic = one visceral demo + one analogy line. NOT mastery — recognition. So when you say "this closes Gap #2" during the build, learners know what you mean.

**Pacing rule:** 3 minutes per topic. Set a stopwatch on your screen if you tend to over-explain.

### 0:10 – 0:13 — Sprint 1: The 5 Gaps That Agents Close

*"Cards on the table. Why do we even need agents? Because chatbots have five hard limits. Watch."*

→ Share screen. Open ChatGPT. Paste the **Bakery Campaign prompt from Session 1** (have it copied):
> *"I run a small bakery in Mumbai. Help me launch a new product line. I need you to: (1) research what's trending in the Mumbai bakery scene this month, (2) draft three Instagram posts, (3) generate three images for those posts, (4) schedule them across the next week, (5) email the schedule to my partner sneha@bakery.com, and (6) set a reminder to review performance in 30 days."*

→ Hit enter. Same failure pattern as Session 1.

→ Show the **5-Gaps slide** on screen (deck slide 4):

| What ChatGPT couldn't do | The Gap |
|---|---|
| Research what's trending | **Tools** (no live web) |
| Remember Sneha across sessions | **Memory** |
| Schedule across next week | **Autonomy** (can't act without per-step approval) |
| Set a 30-day reminder | **Planning** (no time horizon) |
| All 6 steps in one go | **Multi-step reasoning** |

**Analogy (memorize):** *"A chatbot is a smart intern who forgets you between conversations, can't open any apps, and won't do anything without you typing the next instruction. An agent fixes all five."*
```

- [ ] **Step 2: Write Sprint 2 (Goal→Plan→Act loop)**

Append:

```markdown
### 0:13 – 0:16 — Sprint 2: From Prompt→Response to Goal→Plan→Act→Reflect→Iterate

*"Here's the shape of the difference. A chatbot does this:"*

→ Show deck slide 5 — left side: **Prompt → Response → (you type next thing)**.

*"You drive every step. Now an agent does this:"*

→ Show right side of slide 5: **Goal → Plan → Act → Reflect → Iterate → (loops until goal met)**.

*"You set the goal. It figures out the steps. Let me show you live."*

→ Switch to EdYoda Builder tab. Run your **pre-built demo agent** with this goal:
> *"Find one news headline about generative AI from this week and email it to me."*

→ Point at the trace log as it unfolds. *"Step 1, called the search tool. Step 2, picked the top headline. Step 3, drafted the email. Step 4, sent it. Four steps, one goal."*

**Analogy:** *"A chatbot is a vending machine — one coin, one snack. An agent is a personal assistant — one goal, and it figures out the path."*
```

- [ ] **Step 3: Write Sprint 3 (Maturity Model)**

Append:

```markdown
### 0:16 – 0:19 — Sprint 3: The Agent Maturity Model (L0 → L1 → L2 → L3)

*"Four levels of autonomy. Think self-driving cars."*

→ Show deck slide 6 — the maturity ladder:

- **L0 Chatbot:** Pure conversation. ChatGPT default.
- **L1 Copilot:** Suggests, you approve every action. Gmail Smart Reply, GitHub Copilot.
- **L2 Agent:** Acts on its own within a defined goal. *(Today's build.)*
- **L3 Multi-Agent:** Multiple agents collaborate, hand off, specialize. Cursor background agents, Devin.

→ Point at each level with a real product (screenshots embedded in slide).

**Analogy (memorize):** *"Like the self-driving levels. L0 is you driving. L1 is lane assist. L2 is the car driving on the highway while you supervise. L3 is the car driving itself across the city. We're not building L3 today — and you probably don't need it. L2 solves most of what you'd want to automate."*
```

- [ ] **Step 4: Write Sprint 4 (Decision Quadrant) — includes mini-exercise**

Append:

```markdown
### 0:19 – 0:22 — Sprint 4: The Decision Quadrant — Chatbot vs RAG vs Agent vs Multi-Agent

*"Critical framework. Don't bring a chainsaw to butter your toast."*

→ Show deck slide 7 — the 2×2:

| | Just answer | Act on the world |
|---|---|---|
| **Static knowledge** | **Chatbot** ("write a poem") | **Agent** ("book a flight") |
| **Your data matters** | **RAG** ("answer from our PDFs") | **Multi-Agent** ("research, draft, brief team") |

*"Quick check. I'll give you three prompts. Type C, R, A, or M in chat — what does each one need?"*

→ Read each slowly, wait 10 sec for chat to fill, then call out the answer:

1. *"Summarize this Wikipedia article."* → **C** (chatbot)
2. *"What's our refund policy?" — against company docs.* → **R** (RAG)
3. *"Book me a flight and add it to my calendar."* → **A** (agent)

*"You're now better at the AI decision than 90% of executives buying AI products. Use this quadrant before saying 'let's use AI for X' at work."*
```

- [ ] **Step 5: Write Sprint 5 (Cost of NOT using agents)**

Append:

```markdown
### 0:22 – 0:25 — Sprint 5: The Real Business Cost of NOT Using Agents

*"Here's why this matters at work. Take a common task — processing 50 inbound leads this week."*

→ Show deck slide 8 — the two-column comparison:

| Process 50 leads this week | Chatbot-only | With an agent |
|---|---|---|
| Time | 6 hrs (you copy/paste each one) | 20 min (you review drafts) |
| Context lost | Every conversation restarts | Memory carries across leads |
| Follow-through | You forget 3 of them | Agent schedules all 50 |

*"Companies using agents report 30 to 60 percent time savings on repetitive knowledge work. The chatbot-only orgs are paying that tax silently."*

**Analogy:** *"Using only chatbots in 2026 is like using a calculator in a spreadsheet world. It works — but you're doing the integration in your head."*
```

- [ ] **Step 6: Write Sprint 6 (Patterns) + Bridge to Build**

Append:

```markdown
### 0:25 – 0:28 — Sprint 6: Agentic Architecture Patterns

*"Last one. Four patterns you'll hear named. We're using the first one today."*

→ Show deck slide 9 — four pattern cards:

- **Single-agent + tools** — one brain, many tools. *(Today's build.)*
- **Reflection** — agent critiques its own output, retries.
- **Planner-Executor** — one agent plans, another executes.
- **Multi-agent orchestration** — specialists coordinated by a router.

*"You'll feel the first one today. The other three are the path forward."*

**Analogy:** *"Patterns are recipes. You're learning the base recipe — sandwich. Once you can make a sandwich, you can make a burger, a wrap, a bento box. Same skill, more sophistication."*

### 0:28 – 0:30 — Bridge to Build

*"You've seen the gaps, the loop, the ladder, the decision tree, the cost, and the patterns. That's the vocabulary. Now stop watching me — open EdYoda Agent Builder. We're building yours."*

→ Paste in chat: **EdYoda Agent Builder link.**

> ⏱ **Time check: 0:30.** If at 0:32, cut the Sprint 4 mini-exercise next time — move the C/R/A/M to workbook only.

---
```

- [ ] **Step 7: Verify Block 1 length and consistency**

Read what you wrote for Block 1. Check:
- 6 sprints, each ~25-30 lines of script
- Every sprint has setup line + demo/visual instruction + analogy line
- Deck slide numbers (4, 5, 6, 7, 8, 9) are referenced — these will become real slide IDs in Task 6
- No "by minute X" in spoken italicized lines

---

## Task 3: Facilitator Script (BLOCK 2 — Build Part 1)

**Files:**
- Modify: `Session 02 - From Chatbot to Agent/01_Facilitator_Script.md` (append BLOCK 2)

**Reference to mirror:** Spec §6. BLOCK 2 contains the EdYoda walkthrough, track pick, BUILD STEP A, BUILD STEP B, and pre-break anchor.

- [ ] **Step 1: Write BLOCK 2 opener + Builder walkthrough**

Append to `01_Facilitator_Script.md`:

```markdown
## BLOCK 2 — BUILD PART 1: SKELETON AGENT (0:30 – 0:55)
**Goal:** Every learner has a running, role-customized agent on screen by 0:55. System prompt + 1 tool + 1 successful run.

### 0:30 – 0:34 — EdYoda Builder Walkthrough (you on screen, learners watching)

*"Quick orientation. Four panels. That's the whole product. Don't build yet — just follow my screen."*

→ Share screen on EdYoda Agent Builder. Walk through, 60 seconds per panel:

1. **Role / System Prompt panel** — *"This is the agent's job description. Plain English. What it is, what it does, what it doesn't do."*
2. **Tools panel** — *"This is where you give it hands. Search, email, calendar, file reader. Each one is a checkbox."*
3. **Memory panel** — *"This is what it remembers across runs. We'll turn this on after the break — leave it off for now."*
4. **Test / Run panel** — *"This is where you talk to it. Like a chat window, but it can DO things now."*

*"Four panels. Now you build."*
```

- [ ] **Step 2: Write the track-pick segment**

Append:

```markdown
### 0:34 – 0:38 — Pick Your Track (4 min)

→ Paste in chat:

> **STEP 1 — Pick your track. Type the number in chat:**
> 1. **Marketing/Sales** → Weekly campaign recap agent
> 2. **Finance/Consulting** → Variance commentary agent
> 3. **Doctor/Healthcare** → Patient handover agent
> 4. **Generic** → Weekly status report agent
>
> Once you've picked, **open the workbook to your track's page (pages 4-7).** Each track has a copy-paste-ready system prompt to start with.

→ Wait for chat to fill. Count: *"I see 12 marketing, 4 finance, 1 doctor, 8 other — got it. Everyone's building the same shape; the words just differ. If you're not sure which track fits, pick Generic — it works for any office role."*

> **Why pre-written system prompts:** This is a no-code class. Spending 15 min crafting a system prompt loses them. Give them a known-good starter, let them tweak.
```

- [ ] **Step 3: Write BUILD STEP A**

Append:

```markdown
### 0:38 – 0:48 — BUILD STEP A: System Prompt + First Tool (10 min hands-on)

→ Paste in chat:

> **BUILD STEP A (10 min):**
> 1. In EdYoda Builder, click **"+ New Agent."**
> 2. Name it: `[YourName]'s Weekly [Track] Agent`
> 3. Paste the system prompt from your workbook page into the **Role** panel.
> 4. In the **Tools** panel, enable ONE tool: **Web Search** (or **Document Reader** for the doctor track).
> 5. Click **Save**. Don't run it yet.

→ Set a visible 8-min timer.

→ **Build alongside them on your screen.** Pick a track (e.g., Marketing) and build it live, sparsely narrating: *"I'm pasting the marketing prompt now. Note I'm enabling only Web Search — one tool is enough for the first run. Less is more."*

→ Watch chat for stuck learners. Common stumbles:
- Can't find the Tools panel → walk through it on screen again
- Pasted prompt has weird formatting → tell them "paste as plain text" (Cmd+Shift+V / Ctrl+Shift+V)
- Account / login issue → DM your co-pilot to help 1:1, or clone your backup agent into their account

**Concept callout when 80% are done (anchor to Sprint 1, Gap #1):**

*"Right now you've just closed Gap #1 — Tools. Your agent can search the web. ChatGPT free tier can't. Feel the difference."*
```

- [ ] **Step 4: Write BUILD STEP B + pre-break anchor**

Append:

```markdown
### 0:48 – 0:54 — BUILD STEP B: First Run (6 min hands-on)

→ Paste in chat:

> **BUILD STEP B (6 min):**
> 1. In the **Test panel**, paste the **starter goal** from your workbook (each track has one).
> 2. Hit **Run**.
> 3. **Watch the trace log** — see it call the search tool, read results, draft the answer.
> 4. When done, paste the **first line of your agent's output** in chat.

→ Set a 5-min timer. While they work, run yours too.

→ Read 5-6 outputs aloud, **by name.** *"Sneha's marketing agent pulled three trending topics in fintech and wrote a one-paragraph recap. That output didn't exist 90 seconds ago."*

**Concept callout (anchor to Sprint 2):**

*"Look at what just happened. You gave it a goal. It made a plan. It acted — called the search tool. It reflected on the results. It drafted. **That's the loop. You just ran your first agent.**"*

### 0:54 – 0:55 — Pre-Break Anchor

*"Quick check before break — type 👍 in chat if you have a running agent on screen right now."*

→ Wait 30 sec. Count thumbs.

→ **If <80% are done:** *"If you're stuck, DM me or stay 2 min into the break — I'll fix it with you 1:1. Everyone else — real 10-minute break starts now."*

→ **If ≥80%:** *"Beautiful. Break time. Real 10 minutes. Come back ready to give your agent memory and a second tool."*

> ⏱ **Time check: 0:55.** Honor the break.

---

## 🟢 HARD BREAK (0:55 – 1:05) — 10 MINUTES, NON-NEGOTIABLE

→ Put a slide up: **"Back at [time]. Music playing."**
→ Play music. Mute yourself.
→ **Use the break to DM stragglers and clone backup agents into their accounts.** (This is why the backup agents in your pre-class checklist matter.)
→ Come back at minute 8 of the break, sip water, prepare.

> **Why non-negotiable:** Same Bailenson Zoom-fatigue research as Session 1. Skipping the break costs you the second hour.

---
```

---

## Task 4: Facilitator Script (BLOCK 3 — Build Part 2)

**Files:**
- Modify: `Session 02 - From Chatbot to Agent/01_Facilitator_Script.md` (append BLOCK 3)

**Reference to mirror:** Spec §8. BUILD STEPS C, D, E. The climactic block.

- [ ] **Step 1: Write BLOCK 3 opener + checkpoint visual**

Append:

```markdown
## BLOCK 3 — BUILD PART 2: TOOLS, MEMORY, MULTI-STEP (1:05 – 1:35)
**Goal:** Take their skeleton agent from L1-ish copilot to L2 agent. Multiple tools, persistent memory, multi-step plan. By end of block, every learner has crossed the line.

### 1:05 – 1:08 — Welcome Back + Frame

*"Welcome back. Type a 🚀 in chat if you're back."*

→ Wait 15 sec. Energy reset.

*"Before the break you built a one-tool agent. It searches and drafts. Now three things: give it a second tool, give it memory, and give it a multi-step plan. After each one, you'll feel an unlock."*

→ Show the checkpoint slide (deck slide 12 — visible throughout this block):

- ✅ **Done:** Role + 1 tool + 1 goal
- ⏳ **Next:** Add a second tool (acts, doesn't just read)
- ⏳ **Then:** Turn on memory
- ⏳ **Then:** Give it a multi-step goal
```

- [ ] **Step 2: Write BUILD STEP C (action tool)**

Append:

```markdown
### 1:08 – 1:16 — BUILD STEP C: Add an Action Tool (8 min hands-on)

*"Right now your agent can READ the world — search. It cannot CHANGE the world. We're about to fix that."*

→ Paste in chat:

> **BUILD STEP C (7 min):**
> 1. In the **Tools** panel, enable a SECOND tool — pick from your track menu (workbook page 8):
>    - **Marketing/Sales:** Email Draft (or Slack Post)
>    - **Finance/Consulting:** Spreadsheet Writer (or Email Draft)
>    - **Doctor/Healthcare:** Calendar (schedule follow-up) — or Document Writer
>    - **Generic:** Email Draft
> 2. Update your system prompt — add this line:
>    `When the draft is ready, [send it via Email / write to the spreadsheet / schedule the follow-up].`
> 3. Re-run the **same goal as before.** Watch the trace log.
> 4. Paste in chat: **what tool the agent called second** (not the output — just the tool name).

→ Set a 6-min timer. Build alongside.

→ Watch for:
- Learners who skip the system prompt update → *"You added the tool but didn't tell the agent it exists. Update the prompt."*
- Agent ignores the second tool → *"The model decides when to use a tool based on the prompt. If it didn't fire, make the instruction more explicit."*

**Concept callout (anchor to Sprint 1, Gap #3 — Autonomy):**

*"Your agent just did something on its own. It didn't ask you per step. That's autonomy — bounded, defined, but real. ChatGPT can't do this without you babysitting every keystroke."*
```

- [ ] **Step 3: Write BUILD STEP D (memory)**

Append:

```markdown
### 1:16 – 1:23 — BUILD STEP D: Turn On Memory (7 min hands-on)

*"Run your agent again right now with a totally new goal — like 'what did you do last time?' Try it."*

→ Wait 30 sec. *"It doesn't know. Fresh slate. Just like the Session 1 'no memory' demo. Let's fix that."*

→ Paste in chat:

> **BUILD STEP D (5 min):**
> 1. In the **Memory** panel, toggle **"Persistent Memory"** ON.
> 2. Choose memory type: **Conversation Memory** (remembers prior runs of this agent).
> 3. Add a memory seed from workbook page 9 (track-specific). Example for marketing:
>    `Always remember: my company is [X], my audience is [Y], my brand voice is [Z]. Use these in every draft.`
> 4. Run a NEW goal — e.g., *"Draft this week's newsletter intro."*
> 5. Notice it uses your seeded context automatically.
> 6. Now run a SECOND new goal in the same agent. Notice it remembers the first run.

→ Set a 5-min timer.

**Concept callout (anchor to Sprint 1, Gap #2 — Memory):**

*"That's the second gap closed. Memory. Your agent now has context that survives the conversation. The next colleague who runs this agent inherits everything you've taught it."*
```

- [ ] **Step 4: Write BUILD STEP E (multi-step) — the climax**

Append:

```markdown
### 1:23 – 1:33 — BUILD STEP E: The Multi-Step Goal (10 min hands-on) — THE CLIMAX

*"One agent. One goal. Multiple steps. This is what Session 1's bakery campaign couldn't do. Watch."*

→ On your screen, run YOUR pre-built demo agent against a 4-step goal. Show the trace log unfolding step by step — let learners SEE the agent plan, act, reflect, iterate. Don't narrate over it. Let it breathe.

→ Then paste in chat:

> **BUILD STEP E (8 min) — The Real Test:**
>
> Give your agent a goal with **at least 3 steps** using this template (workbook page 10):
>
> ```
> I need you to:
> 1. [research/read something]
> 2. [draft something based on step 1]
> 3. [send/save/schedule the draft]
> ```
>
> Track-specific examples (workbook page 10):
> - **Marketing:** *"(1) Find 3 trending topics in fintech this week. (2) Draft a LinkedIn post for each. (3) Email all three drafts to me with subject 'Weekly content options'."*
> - **Finance:** *"(1) Look up this week's USD/INR movement. (2) Draft a 5-bullet client note explaining impact on import-heavy portfolios. (3) Save the note to a Google Doc titled 'Weekly FX Brief'."*
> - **Doctor:** *"(1) Read these 3 patient case notes [from workbook]. (2) Draft a handover SOAP for each. (3) Schedule a 15-min follow-up review for tomorrow 9am."*
> - **Generic:** *"(1) Search for 3 recent updates in [my industry]. (2) Draft a 5-line internal status update. (3) Email it to me with subject 'Weekly status'."*
>
> Hit Run. **Watch the trace log unfold.**
>
> When done, paste in chat: **how many tool calls** the agent made (look at the trace log count).

→ Set a 7-min timer.

**Concept callout (anchor to Sprint 1, Gap #5 — Multi-step reasoning):**

*"Look at your trace log. 4 tool calls. 6 tool calls. Some of you got 9. Every one of those was a decision your agent made on its own. You gave it a goal. It made a plan. It executed. **That's the line you just crossed — from chatbot to agent.**"*
```

- [ ] **Step 5: Write the build-anchor close**

Append:

```markdown
### 1:33 – 1:35 — Build Anchor + Pre-Debrief Pause

*"Last anchor before we step back. Type in chat — **what's the most surprising thing your agent did?** One line."*

→ Read 4-5 aloud by name. Common patterns:
- "It asked me a clarifying question first!" → *"That's reflection. The R in our loop."*
- "It used a tool I didn't enable" / "It got stuck" → *"That's where the Reflection pattern comes in. Hold that thought."*
- "It actually emailed me" → *"It actually did the thing. That's the unlock."*

*"Step back from your screen for 30 seconds. Just look at it. You built an agent. From a blank canvas. In an hour. No code."*

> ⏱ **Time check: 1:35.** Hard pivot to debrief.

---
```

---

## Task 5: Facilitator Script (BLOCK 4 + BLOCK 5 + Contingency Guide)

**Files:**
- Modify: `Session 02 - From Chatbot to Agent/01_Facilitator_Script.md` (append BLOCK 4, BLOCK 5, contingency guide, close)

**Reference to mirror:** Spec §9, §10, §12, §13. Plus Session 1's facilitator script lines 475-518 for the contingency guide format.

- [ ] **Step 1: Write BLOCK 4 — Pattern Debrief (4 lenses)**

Append:

```markdown
## BLOCK 4 — PATTERN DEBRIEF + PEER DEMOS (1:35 – 1:50)
**Goal:** Make the frameworks STICK by mapping them onto the agent learners just built.

### 1:35 – 1:43 — Pattern Debrief: 4 Lenses (8 min)

*"You built it. Now let's name what you built. Two minutes ago you had an agent. Now look at it through the four lenses from the start of class — and you'll see why those frameworks weren't academic. They were a map."*

#### Lens 1 — The 5 Gaps Scorecard (90 sec)

→ Show deck slide 14 — the same 5-gap matrix from Sprint 1, now with checkmarks:

| Gap | Your agent |
|---|---|
| Tools | ✅ You added 2 |
| Memory | ✅ You enabled persistent memory |
| Autonomy | ✅ It acted without per-step approval |
| Planning | ✅ It executed a 3+ step goal |
| Multi-step reasoning | ✅ Trace log proves it |

*"Five for five. You closed every gap from Session 1 in 90 minutes. That's not hype — that's what you literally just did."*

#### Lens 2 — Maturity Ladder: Where Did You Land? (90 sec)

→ Show deck slide 15 — the L0→L3 ladder.

*"Type in chat — where on the ladder is the agent you just built? L1, L2, or L3?"*

→ Wait for chat. Most will say L2.

*"L2. Correct. You built a Level 2 agent — one brain, multiple tools, bounded autonomy. Notice you didn't try to build L3. You didn't need to. **L2 solves probably 80% of the workflows you'd actually want to automate at work.** Don't over-engineer."*

#### Lens 3 — Decision Quadrant: Where Does Your Agent Belong? (90 sec)

→ Show deck slide 16 — the 2×2.

*"Walk through with me. Your agent: does it need to DO things? Yes — emails, schedules, writes. Does the answer change with new info? Yes — it pulls live data. So you're in the Agent quadrant. Not RAG. Not chatbot. Agent."*

*"Discipline: next time someone at work says 'let's use AI for X,' put it through this quadrant first. Half the time the answer is 'this is a chatbot problem, don't over-engineer.' The other half — it's an agent."*

#### Lens 4 — The Pattern You Used (90 sec)

→ Show deck slide 17 — the 4 pattern cards.

*"You built the **Single-Agent + Tools** pattern. The simplest one. The base recipe. From here the upgrade path is clear:"*

- *"Hit the same wall twice? → Add a **Reflection** loop."*
- *"Goal too complex for one agent? → Split into **Planner + Executor**."*
- *"Need different specialists? → **Multi-agent orchestration**."*

*"You don't need any of these yet. But now you know what they're called and when to reach for them. That's the literacy."*
```

- [ ] **Step 2: Write BLOCK 4 peer demos**

Append:

```markdown
### 1:43 – 1:50 — Peer Demos: 3 Show-and-Tells (7 min)

*"We're going to hear from 3 of you. Two minutes each. Camera on, screen-share on, show your agent run live."*

> **Critical pre-work:** During Build Step E (~1:30), DM 3 learners privately: *"Would you be willing to demo at 1:43? 2 minutes, your screen, your agent."* Pick for **variety, not virtuosity** — one marketing, one finance, one doctor/other.

For each demo (2 min × 3):
1. **30 sec:** Volunteer says their name, role, what their agent does.
2. **60 sec:** They share screen, run it live, narrate the trace log.
3. **30 sec:** You react and name the pattern. *"Look — Priya's agent reflected when the search returned nothing useful and retried with a different query. That's the Reflection pattern emerging spontaneously. Beautiful."*

**If no one volunteers:** Have 2 backup learners pre-identified from chat activity in earlier blocks. DM them privately at 1:30. Backup: a screenshot of your own agent's run.

**If a peer demo breaks live:** 30-sec recovery: *"Agents break — let's debug together for 60 sec, then I'll show mine."* Never let dead air stretch.

> ⏱ **Time check: 1:50.** Move to close.

---
```

- [ ] **Step 3: Write BLOCK 5 — close**

Append:

```markdown
## BLOCK 5 — WHAT'S NEXT + REFLECTION + CLOSE (1:50 – 2:00)

### 1:50 – 1:55 — What to Build Next (5 min)

*"You have an agent. You'll go back to work tomorrow. What now?"*

→ Show deck slide 18 — single slide, three concrete next-steps:

1. **This week:** Run your agent 5 times on real work. Not toy goals — actual things you'd do anyway. Track time saved in workbook page 11.
2. **Next 2 weeks:** Iterate the system prompt. When the agent does something dumb, don't blame the tool — fix the prompt. Add memory. Add a tool. Treat it like a junior employee you're coaching.
3. **Next month:** Show it to one colleague. Not to evangelize — to find a workflow THEY'd want. The fastest way to learn what agents can do is to build the second one.

*"You don't need another course to do any of this. You need 30 minutes a week and a real problem."*

### 1:55 – 1:58 — Parking Lot Q&A (3 min)

→ Open the Parking Lot Google Doc on screen — same one from Session 1, new section heading "Session 2 — Open Questions."

→ Answer top 2 questions, 45 sec each. For longer ones: *"In the doc, answered by tomorrow morning."*

### 1:58 – 2:00 — Reflection + Goodbye (2 min)

→ Paste in chat:

> **Take with you (reply to today's email by Friday):**
> 1. ONE workflow at your job you'll automate with your agent this month.
> 2. ONE workflow you WON'T — because it's a chatbot job, a RAG job, or too sensitive for an agent today.
>
> Two sentences each. I read every reply.

*"Two sessions ago, this was a vending machine. One session ago, a chatbot was a brain in a jar. Today you gave it hands. That's the journey."*

*"You did the hard part — you showed up, you stayed, you built. Go run your agent on something real this week. That's the only homework that matters."*

*"Thank you. See you online. Bye."*

→ Wave. Stop recording. End the meeting.

---
```

- [ ] **Step 4: Write the contingency guide**

Append:

```markdown
# FACILITATOR CONTINGENCY GUIDE

## If a demo fails live

- **Bakery Campaign re-run produces a different failure pattern:** Pivot to the screenshots in your slides — *"In Session 1 this is what happened. Today the model behaved differently — that's exactly why agents matter; chatbot behavior is unpredictable."*
- **Pre-built EdYoda demo agent breaks during Sprint 2:** Have a 30-sec screen recording of it running successfully. *"Let me show you the recorded run — same agent, ran fine yesterday."*
- **EdYoda Agent Builder is down for the whole class:** This is the catastrophic risk. Pivot to a longer concept block (extend Block 1 to ~40 min, add a 10-min "build it on paper" exercise where learners design their agent in their workbook — system prompt, tools, memory seed, multi-step goal). Send the live build as homework with a recorded walkthrough.
- **One learner's account is broken:** DM them, clone your backup agent of their track into their account. They proceed from Step B onward with your skeleton.

## If <70% finish a build step on time

- **Build Step A (skeleton):** Pull stragglers into 1:1 DM during the break. Move the rest forward.
- **Build Step C, D, or E:** Move on at the time guard regardless. The next concept callout helps stragglers catch up by hearing what they're working toward.

## If no one volunteers for peer demos

- Pre-identify 2 strong chat-active learners during Build Step E. DM them at ~1:30.
- Worst case: show your own agent's run as a "demo of the kind of thing we just built" — still works.

## If you're running over

- **At 0:30, if you're at 0:33:** Cut the Sprint 4 mini-exercise next time. Move C/R/A/M to workbook only.
- **At 0:55, if you're at 1:00:** Take the break anyway. Cut 3 min from Block 3 by combining BUILD STEP C and D into one 12-min hands-on.
- **At 1:35, if you're at 1:40:** Cut Lens 4 (the patterns lens) — combine it into the close as a single line.
- **At 1:50, if you're at 1:55:** Cut "What's Next" to 2 min (skip points 2 and 3); keep close intact.

## If you're running under

- Add live Q&A after each block. Open the parking lot doc, answer 2 questions per block.
- During Build Step E, encourage learners to try a SECOND multi-step goal of their own design.

## If energy crashes after the break

- *"I can see this is dense. Stand up wherever you are. Stretch. Take 30 seconds."* Then continue.

## If someone is dominating the chat

- *"Love the energy [Name] — let's hear from a few others first."*

## If someone challenges you ("AI agents are dangerous / overhyped")

- *"Real concern. The decision quadrant we covered is exactly for this — not every problem is an agent problem. Today's build is the agent CASE. The discipline of when NOT to use one is in your homework prompt at the end."*

---

# YOUR PRE-CLASS PRACTICE RECOMMENDATION

Do **one full dry run** alone, with a stopwatch, the night before. Especially:

1. **Test all 4 track backup agents end-to-end** — pick one goal per track, run it, confirm tools fire and trace log displays.
2. **Time Block 1.** This is the tightest block. 3 minutes per sprint is unforgiving — practice the analogies until they're crisp.
3. **Time Block 3.** 30 minutes of hands-on requires you to facilitate without filler. Practice the concept callouts so they land in 60 seconds, not 3 minutes.

Good luck. You've got this.
```

- [ ] **Step 5: Verify the complete script**

Run: `wc -l "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md"`

Expected: ~500-600 lines. (Session 1 script is 519 lines.) If significantly shorter than 450 lines, the script is too thin — re-read each block and add missing facilitator-cue details. If significantly longer than 650 lines, tighten.

Read final 30 lines to confirm the contingency guide and closing are intact.

---

## Task 6: Learner Workbook

**Files:**
- Create: `Session 02 - From Chatbot to Agent/02_Learner_Workbook.md`

**Reference to mirror:** `Session 01 - Generative AI Foundations/02_Learner_Workbook.md` (read the full file before writing) — tone, format, exercise card structure, reflection prompt format.

**Page count target:** 11 pages (per spec §11). Pages here mean conceptual sections separated by `---`, not physical PDF pages — same convention as Session 1.

- [ ] **Step 1: Read Session 1's workbook end-to-end**

Read: `Session 01 - Generative AI Foundations/02_Learner_Workbook.md` (entire file).

Note: opening welcome + tab checklist, warm-up prompt, exercise cards with goal/steps/reflection structure, parking lot link reference, take-home prompt at end.

- [ ] **Step 2: Write workbook pages 1-3 (Welcome + Checklist + Warm-up)**

Create `Session 02 - From Chatbot to Agent/02_Learner_Workbook.md` with:

```markdown
# Generative AI for Non-Coders — Session 2 Workbook

**Welcome back.** This is your workspace for the next 2 hours. Keep it open in a tab.

Today is different from Session 1. Last time you watched. Today you build. By the end of this session, you'll have a working agent — your own, customized to your job, that does things ChatGPT physically cannot.

---

## Before we start — confirm you have these ready

**Required (we'll use all four):**

- [ ] **EdYoda Agent Builder** → logged in (same account as Session 1)
- [ ] **ChatGPT** → chat.openai.com (we'll use this in Sprint 1 only)
- [ ] **Your Session 1 workbook** → open in another tab, for callback reference
- [ ] **The Parking Lot Google Doc** → link will be in chat

**Optional (helpful if you have time):**

- [ ] **Claude.ai** and **Gemini.com** → backup, in case EdYoda is laggy

---

## 🟢 OPENING WARM-UP (Block 0)

In the Zoom chat, type **ONE word** that describes how Session 1 landed for you.

> Stuck · Curious · Inspired · Confused · Skeptical · Excited · Surprised · Other

*(There are no wrong answers. Type what's true.)*

**Then, type 🥐 if you remember the bakery campaign demo from Session 1.**

---
```

- [ ] **Step 3: Write workbook pages 4-7 (Track pages, one per track)**

Append, one section per track. Each track page contains: starter system prompt (copy-paste-ready), starter goal (for Build Step B), action tool choice (for Build Step C), memory seed (for Build Step D), multi-step goal example (for Build Step E), and a one-line reflection prompt.

```markdown
## 📒 TRACK 1 — MARKETING/SALES

**Your agent will become:** *Weekly campaign recap agent.*

### Starter System Prompt (paste into the Role panel)

```
You are a senior marketing operations assistant working with [YourName].
Your job is to scan the week's most relevant industry trends, draft short marketing communications, and prepare campaign updates.
You always cite sources when you reference external information.
You keep drafts under 200 words unless asked otherwise.
You use [YourName]'s brand voice: clear, warm, slightly playful, never corporate jargon.
```

### Starter Goal (for BUILD STEP B)

```
Find 3 trending topics in [your industry — e.g., fintech, SaaS, B2C ecommerce] this week, and draft a one-paragraph weekly recap email summarizing them.
```

### Action Tool Pick (for BUILD STEP C)

Enable **Email Draft** (or **Slack Post** if your team uses Slack more).

Add this line to your system prompt:
```
When the draft is ready, send it via Email Draft to me with subject "Weekly content options."
```

### Memory Seed (for BUILD STEP D)

```
Always remember: my company is [X], my audience is [Y, e.g., D2C founders], my brand voice is [Z — e.g., warm, jargon-free, with one strong opinion per post]. Use these defaults in every draft.
```

### Multi-Step Goal (for BUILD STEP E)

```
I need you to:
1. Find 3 trending topics in fintech this week.
2. Draft a LinkedIn post for each (under 150 words).
3. Email all three drafts to me with subject "Weekly content options."
```

### One-Line Reflection

> *What's the most surprising thing your agent did during BUILD STEP E?* __________________________________

---

## 📒 TRACK 2 — FINANCE/CONSULTING

**Your agent will become:** *Variance commentary agent.*

### Starter System Prompt (paste into the Role panel)

```
You are a senior financial analyst supporting [YourName].
Your job is to look up market and economic information, then draft short executive-facing commentary that explains impact.
You always use precise numbers (cite the source) and you keep bullet points to 5 max.
You never speculate beyond what the data supports. You flag uncertainty explicitly.
Your output is suitable for a busy CFO who has 60 seconds.
```

### Starter Goal (for BUILD STEP B)

```
Search for this week's RBI rate decision (or most recent major central bank decision in your region), and explain its impact on our [loan book / equity portfolio / import costs] in 3 bullets.
```

### Action Tool Pick (for BUILD STEP C)

Enable **Spreadsheet Writer** (or **Email Draft** if you prefer).

Add this line to your system prompt:
```
When the analysis is ready, save it as a row in the weekly variance spreadsheet (or email it to me with subject "Weekly variance brief").
```

### Memory Seed (for BUILD STEP D)

```
Always remember: I work in [sector, e.g., retail banking], my portfolio focus is [X], my key risk metrics are [Y, e.g., NIM, NPA ratio]. Default to these unless I override.
```

### Multi-Step Goal (for BUILD STEP E)

```
I need you to:
1. Look up this week's USD/INR movement.
2. Draft a 5-bullet client note explaining impact on import-heavy portfolios.
3. Save the note to a Google Doc titled "Weekly FX Brief."
```

### One-Line Reflection

> *What's the most surprising thing your agent did during BUILD STEP E?* __________________________________

---

## 📒 TRACK 3 — DOCTOR/HEALTHCARE

**Your agent will become:** *Patient handover agent.*

### Starter System Prompt (paste into the Role panel)

```
You are a senior clinical assistant supporting Dr. [YourName].
Your job is to read patient notes, structure them as handover SOAP notes, and flag any urgent follow-ups or red flags.
You use precise clinical language. You never fabricate findings. If information is missing, you say "Not documented."
Your output is suitable for the next-shift physician — concise, scannable, clinically accurate.
```

### Starter Goal (for BUILD STEP B)

```
Read this sample patient note and draft a handover SOAP:
"55yo F, c/o intermittent chest pain x3 weeks. No radiation. Worse with stress, better with rest. No SOB. Vitals stable. EKG normal. Started on PPI trial pending GI workup."
```

### Action Tool Pick (for BUILD STEP C)

Enable **Document Writer** (or **Calendar** if your EdYoda account supports clinical calendar integration).

Add this line to your system prompt:
```
When the SOAP note is ready, write it to a new document titled "[PatientID] Handover [Date]."
```

### Memory Seed (for BUILD STEP D)

```
Always remember: I work in [department, e.g., internal medicine, ED], my ward's red-flag protocols are [list 2-3]. Default to these in handover flags.
```

### Multi-Step Goal (for BUILD STEP E)

```
I need you to:
1. Read these 3 patient case notes [paste 3 short cases from your day, or use the workbook samples on page 12].
2. Draft a handover SOAP for each.
3. Schedule a 15-min follow-up review for tomorrow 9am (or write a single document with all three SOAPs).
```

### One-Line Reflection

> *What's the most surprising thing your agent did during BUILD STEP E?* __________________________________

---

## 📒 TRACK 4 — GENERIC (works for any office role)

**Your agent will become:** *Weekly status report agent.*

### Starter System Prompt (paste into the Role panel)

```
You are a senior executive assistant supporting [YourName].
Your job is to scan the week's relevant updates in [my industry / company / function], summarize them concisely, and prepare short status communications.
You keep summaries under 200 words. You use plain language, no buzzwords.
You always make clear what's a fact vs an opinion.
```

### Starter Goal (for BUILD STEP B)

```
Search for 3 recent updates in [my industry] this week, and draft a one-paragraph weekly status update summarizing what changed and why it matters.
```

### Action Tool Pick (for BUILD STEP C)

Enable **Email Draft**.

Add this line to your system prompt:
```
When the draft is ready, send it via Email Draft to me with subject "Weekly status."
```

### Memory Seed (for BUILD STEP D)

```
Always remember: I work in [function — e.g., operations, HR, product], my company is [X], my team's top priorities this quarter are [Y]. Default to these in every status update.
```

### Multi-Step Goal (for BUILD STEP E)

```
I need you to:
1. Search for 3 recent updates in [my industry] this week.
2. Draft a 5-line internal status update.
3. Email it to me with subject "Weekly status."
```

### One-Line Reflection

> *What's the most surprising thing your agent did during BUILD STEP E?* __________________________________

---
```

- [ ] **Step 4: Write workbook pages 8-10 (Tool menus + memory seeds reference + multi-step examples reference)**

Append:

```markdown
## 📋 PAGE 8 — Action Tool Menu (for BUILD STEP C)

Pick the SECOND tool that matches your track. If your tool isn't listed, ask the facilitator in chat.

| Track | Recommended action tool | Alternative |
|---|---|---|
| Marketing/Sales | Email Draft | Slack Post |
| Finance/Consulting | Spreadsheet Writer | Email Draft |
| Doctor/Healthcare | Document Writer | Calendar |
| Generic | Email Draft | Document Writer |

**Important:** After enabling the tool, you MUST update your system prompt to mention it. The agent uses the prompt to decide when to fire each tool. If you skip this step, your agent will ignore the new tool.

---

## 🧠 PAGE 9 — Memory Seeds Reference (for BUILD STEP D)

Pick the memory seed for your track. Edit the bracketed parts to match your real context.

**Marketing/Sales:**
```
Always remember: my company is [X], my audience is [Y], my brand voice is [Z]. Use these defaults in every draft.
```

**Finance/Consulting:**
```
Always remember: I work in [sector], my portfolio focus is [X], my key risk metrics are [Y]. Default to these unless I override.
```

**Doctor/Healthcare:**
```
Always remember: I work in [department], my ward's red-flag protocols are [list 2-3]. Default to these in handover flags.
```

**Generic:**
```
Always remember: I work in [function], my company is [X], my team's top priorities this quarter are [Y]. Default to these in every status update.
```

---

## 🎯 PAGE 10 — Multi-Step Goal Templates (for BUILD STEP E)

**Template (works for all tracks):**

```
I need you to:
1. [research/read something]
2. [draft something based on step 1]
3. [send/save/schedule the draft]
```

**Track-specific worked examples:** See your track page (4-7) for the exact goal to paste into your agent.

**If your agent fails on a step:**

- It didn't use the tool you expected → Your system prompt didn't explicitly tell it to. Add a line.
- It hallucinated a fact in step 2 → Reduce its creativity by adding "Use only verified sources. Say 'unverified' if uncertain."
- It got stuck in a loop → Restart the agent. Reduce the goal to 2 steps. Build complexity gradually.

---
```

- [ ] **Step 5: Write workbook page 11 (5-run tracker) and page 12 (sample case notes for doctors + close)**

Append:

```markdown
## 📊 PAGE 11 — Your Week-After Tracker

Over the next 7 days, run your agent on 5 real tasks. Track results.

| # | Task you ran it on | Time without agent (est) | Time with agent (actual) | Did it work? (Yes / Partial / No) | What you'd change in the prompt |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

**At the end of the week, ask yourself:**

- Which task was the biggest time saver?
- Which task surprised you (the agent did better than expected)?
- Which task isn't an agent task — should be a chatbot, a RAG system, or a human?

---

## 📋 PAGE 12 — Sample Case Notes (Doctor Track Only)

Use these if you don't want to paste real patient data into a public tool during the build.

**Case 1:**
```
62yo M, post-op day 3, total knee replacement. Pain controlled on PCA, transitioning to oral. Ambulating 30 ft with walker. No fever. INR 1.4 (on prophylactic enoxaparin). Plan: D/C PCA, start oxycodone PRN, continue PT bid.
```

**Case 2:**
```
34yo F, admitted overnight for syncope. No prior cardiac history. Workup: EKG NSR, troponin negative x2, orthostatics positive. Likely vasovagal. Plan: hydration, cardiac monitor x12h, outpatient Holter, D/C home today if stable.
```

**Case 3:**
```
78yo M, COPD exacerbation day 4. On IV methylprednisolone, neb tx q4h. Improving — sats now 94% on 2L NC (was 88% on admission). Plan: convert to oral prednisone taper, switch to inhalers, target D/C tomorrow if no setback.
```

---

## ✏️ TAKE-HOME (reply to today's class email by Friday)

Two sentences each:

1. **ONE workflow at your job you'll automate with your agent this month.**
2. **ONE workflow you WON'T** — because it's a chatbot job, a RAG job, or too sensitive to entrust to an agent today.

The discipline of knowing what NOT to use an agent for is half the literacy. I read every reply.

---

## 🅿️ PARKING LOT

Same Google Doc as Session 1. Find the new section: **"Session 2 — Open Questions."** I'll answer the top ones live; everything else, in writing by tomorrow.

---

*See you online. Go build.*
```

- [ ] **Step 6: Verify workbook**

Run: `wc -l "Session 02 - From Chatbot to Agent/02_Learner_Workbook.md"`

Expected: ~350-450 lines. (Session 1 workbook is similar length.)

Verify the 4 track pages each have the same 5 sub-sections (system prompt, starter goal, action tool, memory seed, multi-step goal, reflection). Use Read to scan the file.

---

## Task 7: Presenter Deck (HTML scaffold + topbar/clock + slides 1-9)

**Files:**
- Create: `Session 02 - From Chatbot to Agent/presenter_deck.html`

**Reference to mirror:** `Session 01 - Generative AI Foundations/presenter_deck.html` — read it before starting. Copy the `:root` CSS variable block exactly (preserves visual continuity). Match topbar pattern (clock-box with real / planned / delta), keyboard nav, slide-content structure.

**Visual continuity contract:** Use the same dark palette (`--bg-0: #07090f`, `--accent: #5eead4`, etc.) and same font stack (Inter + JetBrains Mono).

**Slide count target:** ~20 slides total. This task covers structure + slides 1-9 (Cover, Promise, Roadmap, 5 Gaps, Loop, Maturity, Decision Quadrant, Cost, Patterns).

- [ ] **Step 1: Read Session 1's presenter deck end-to-end (or at least structure)**

Read: `Session 01 - Generative AI Foundations/presenter_deck.html` offset 1, limit 300 (structural CSS + topbar).

Then read the slide markup section to see how individual slides are structured. Note: `.slide`, `.slide-content`, `.slide.active`, the slide-counter pattern, the keyboard nav script at the bottom.

- [ ] **Step 2: Create the deck shell — copy palette + structure from Session 1**

Create `Session 02 - From Chatbot to Agent/presenter_deck.html` with this scaffold. Copy the `:root`, topbar, slide-base CSS from Session 1's deck verbatim. Then add Session-2-specific structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Presenter · GenAI for Non-Coders · Session 2</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  /* COPY EVERYTHING from Session 1's :root block (lines 11-49) — same palette, same spacing, same easing */
  :root {
    --bg-0: #07090f;
    --bg-1: #0d111a;
    --bg-2: #131826;
    --surface: rgba(255, 255, 255, 0.03);
    --surface-hover: rgba(255, 255, 255, 0.05);
    --surface-strong: rgba(255, 255, 255, 0.06);
    --border: rgba(255, 255, 255, 0.08);
    --border-strong: rgba(255, 255, 255, 0.14);
    --text: #f4f6fb;
    --text-soft: #c9d0de;
    --text-muted: #8993a6;
    --text-dim: #5a6377;
    --accent: #5eead4;
    --accent-soft: rgba(94, 234, 212, 0.14);
    --accent-line: rgba(94, 234, 212, 0.35);
    --warm: #fbbf24;
    --warm-soft: rgba(251, 191, 36, 0.12);
    --hot: #fb7185;
    --hot-soft: rgba(251, 113, 133, 0.12);
    --green: #4ade80;
    --green-soft: rgba(74, 222, 128, 0.12);
    --purple: #a78bfa;
    --purple-soft: rgba(167, 139, 250, 0.12);
    --s-1: 8px;  --s-2: 16px;  --s-3: 24px;  --s-4: 32px;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --dur-fast: 180ms;
    --dur-med: 280ms;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
  }

  /* COPY all base/topbar/slide CSS from Session 1's presenter_deck.html.
     This is the visual continuity contract.
     Then add Session-2-specific additions below. */

  /* === Session 2 additions === */

  /* Maturity ladder visual */
  .maturity-ladder { display: flex; flex-direction: column; gap: var(--s-2); }
  .maturity-rung {
    display: flex; align-items: center; gap: var(--s-3);
    padding: var(--s-2) var(--s-3); border-radius: var(--radius-md);
    background: var(--surface); border: 1px solid var(--border);
  }
  .maturity-rung.active { border-color: var(--accent-line); background: var(--accent-soft); }
  .rung-label { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-weight: 600; min-width: 4ch; }

  /* Decision quadrant 2x2 */
  .quadrant { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
  .quadrant-cell { padding: var(--s-3); background: var(--bg-1); display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 160px; text-align: center; }
  .quadrant-cell .qlabel { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.12em; margin-bottom: var(--s-1); }
  .quadrant-cell .qname { font-size: 1.5rem; font-weight: 700; color: var(--accent); }
  .quadrant-cell .qex { font-size: 0.9rem; color: var(--text-muted); margin-top: var(--s-1); }

  /* Pattern cards */
  .pattern-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--s-2); }
  .pattern-card { padding: var(--s-3); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); }
  .pattern-card.you-built { border-color: var(--accent-line); background: var(--accent-soft); }
  .pattern-card .pname { font-weight: 600; color: var(--text); margin-bottom: var(--s-1); }
  .pattern-card .pdesc { font-size: 0.9rem; color: var(--text-muted); }

  /* Checkpoint progress (Block 3) */
  .checkpoint-list { list-style: none; padding: 0; }
  .checkpoint-list li { padding: var(--s-1) 0; font-size: 1.1rem; }
  .checkpoint-list li.done { color: var(--green); }
  .checkpoint-list li.next { color: var(--accent); font-weight: 600; }
  .checkpoint-list li.pending { color: var(--text-dim); }

  /* Build sprint timer panel */
  .timer-panel { position: fixed; bottom: var(--s-3); right: var(--s-3); padding: var(--s-2) var(--s-3); background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-md); font-family: 'JetBrains Mono', monospace; font-size: 1.4rem; color: var(--accent); z-index: 100; display: none; }
  .timer-panel.visible { display: block; }
</style>
</head>
<body>

<div class="topbar">
  <!-- COPY topbar contents from Session 1's deck (lines 64+). Keep clock-box.real, clock-box.planned, clock-box.delta. Update the title to read "GENAI · S2 · CHATBOT → AGENT" -->
</div>

<div class="stage">
  <!-- Slides go here. Each slide is <section class="slide" data-block="0">...</section> -->
</div>

<script>
  // COPY keyboard nav (←→ for prev/next, space for next), slide-counter, clock script from Session 1.
</script>

</body>
</html>
```

> **Implementation note:** When the engineer encounters "COPY from Session 1" comments, they should actually copy the corresponding blocks from `Session 01 - Generative AI Foundations/presenter_deck.html`. The full copy is omitted from this plan to avoid duplication and keep the plan readable — the source file is authoritative.

- [ ] **Step 3: Write slide 1 (Cover/Title)**

Append inside `<div class="stage">`:

```html
<section class="slide active" data-block="0" data-slide="1">
  <div class="slide-content cover">
    <div class="kicker">Session 2 of 2</div>
    <h1>From Chatbot to Agent</h1>
    <p class="lede">Building your first no-code AI agent — yours, customized to your job.</p>
    <div class="cover-meta">
      <span>Generative AI for Non-Coders</span>
      <span class="dot">·</span>
      <span>120 min</span>
      <span class="dot">·</span>
      <span>Live virtual</span>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Write slide 2 (Promise) and slide 3 (Roadmap)**

```html
<section class="slide" data-block="0" data-slide="2">
  <div class="slide-content">
    <div class="kicker">The promise for today</div>
    <h2>Last session, a chatbot failed the bakery campaign.</h2>
    <h2 class="accent-h">Today, you fix it.</h2>
    <ul class="promise-list">
      <li>You'll build a working agent — yours, customized to your job</li>
      <li>It will do three things ChatGPT physically cannot: use multiple tools, remember across runs, execute multi-step plans</li>
      <li>You'll know exactly when to use it, when not to, and what to build next</li>
    </ul>
  </div>
</section>

<section class="slide" data-block="0" data-slide="3">
  <div class="slide-content">
    <div class="kicker">Today's flow</div>
    <h2>Concepts → Build → Debrief → Done</h2>
    <div class="roadmap-strip">
      <div class="phase"><div class="phase-time">20 min</div><div class="phase-name">Concepts</div></div>
      <div class="phase-arrow">→</div>
      <div class="phase"><div class="phase-time">~55 min</div><div class="phase-name">Build (split by break)</div></div>
      <div class="phase-arrow">→</div>
      <div class="phase"><div class="phase-time">15 min</div><div class="phase-name">Debrief</div></div>
      <div class="phase-arrow">→</div>
      <div class="phase"><div class="phase-time">10 min</div><div class="phase-name">Close</div></div>
    </div>
    <p class="footnote">You will not leave with notes. You will leave with a working agent.</p>
  </div>
</section>
```

- [ ] **Step 5: Write slide 4 (5 Gaps)**

```html
<section class="slide" data-block="1" data-slide="4">
  <div class="slide-content">
    <div class="kicker">Sprint 1 · The 5 Gaps That Agents Close</div>
    <h2>Chatbots have five hard limits.</h2>
    <table class="gaps-table">
      <thead>
        <tr><th>What ChatGPT couldn't do (the bakery demo)</th><th>The Gap</th></tr>
      </thead>
      <tbody>
        <tr><td>Research what's trending this month</td><td><span class="gap-pill">Tools</span></td></tr>
        <tr><td>Remember "my partner is Sneha"</td><td><span class="gap-pill">Memory</span></td></tr>
        <tr><td>Schedule across next week</td><td><span class="gap-pill">Autonomy</span></td></tr>
        <tr><td>Set a 30-day reminder</td><td><span class="gap-pill">Planning</span></td></tr>
        <tr><td>All 6 steps in one go</td><td><span class="gap-pill">Multi-step reasoning</span></td></tr>
      </tbody>
    </table>
    <p class="analogy">A chatbot is a smart intern who forgets you between conversations, can't open any apps, and won't do anything without you typing the next instruction. An agent fixes all five.</p>
  </div>
</section>
```

Add minimal CSS for `.gaps-table`, `.gap-pill`, `.analogy` to the `<style>` block — keep them in the visual idiom (accent pill, muted analogy footer).

- [ ] **Step 6: Write slides 5-9 (remaining Sprint slides + checkpoint)**

For each sprint, one slide. Use this pattern:

```html
<section class="slide" data-block="1" data-slide="5">
  <div class="slide-content">
    <div class="kicker">Sprint 2 · Goal → Plan → Act → Reflect → Iterate</div>
    <h2>Two loops.</h2>
    <div class="loop-compare">
      <div class="loop-box">
        <div class="loop-title">Chatbot loop</div>
        <div class="loop-diagram">Prompt → Response → <span class="loop-hint">(you type next)</span></div>
      </div>
      <div class="loop-box accent">
        <div class="loop-title">Agent loop</div>
        <div class="loop-diagram">Goal → Plan → Act → Reflect → Iterate →<br><span class="loop-hint">(loops until goal met)</span></div>
      </div>
    </div>
    <p class="analogy">A chatbot is a vending machine — one coin, one snack. An agent is a personal assistant — one goal, and it figures out the path.</p>
  </div>
</section>

<section class="slide" data-block="1" data-slide="6">
  <div class="slide-content">
    <div class="kicker">Sprint 3 · Agent Maturity Model</div>
    <h2>Four levels of autonomy. Think self-driving cars.</h2>
    <div class="maturity-ladder">
      <div class="maturity-rung"><span class="rung-label">L0</span><div><strong>Chatbot</strong> — pure conversation. (ChatGPT default.)</div></div>
      <div class="maturity-rung"><span class="rung-label">L1</span><div><strong>Copilot</strong> — suggests, you approve every action. (Gmail Smart Reply, GitHub Copilot.)</div></div>
      <div class="maturity-rung active"><span class="rung-label">L2</span><div><strong>Agent</strong> — acts on its own within a defined goal. <em>(Today's build.)</em></div></div>
      <div class="maturity-rung"><span class="rung-label">L3</span><div><strong>Multi-Agent</strong> — multiple agents collaborate, hand off, specialize. (Cursor background agents, Devin.)</div></div>
    </div>
    <p class="analogy">L0 = you driving. L1 = lane assist. L2 = car drives on highway, you supervise. L3 = car drives across the city.</p>
  </div>
</section>

<section class="slide" data-block="1" data-slide="7">
  <div class="slide-content">
    <div class="kicker">Sprint 4 · Decision Quadrant</div>
    <h2>Don't bring a chainsaw to butter your toast.</h2>
    <div class="quadrant">
      <div class="quadrant-cell">
        <div class="qlabel">Static · Just answer</div>
        <div class="qname">Chatbot</div>
        <div class="qex">"Write me a poem"</div>
      </div>
      <div class="quadrant-cell">
        <div class="qlabel">Static · Acts on world</div>
        <div class="qname">Agent</div>
        <div class="qex">"Book me a flight"</div>
      </div>
      <div class="quadrant-cell">
        <div class="qlabel">Your data · Just answer</div>
        <div class="qname">RAG</div>
        <div class="qex">"What's our refund policy?"</div>
      </div>
      <div class="quadrant-cell">
        <div class="qlabel">Your data · Acts on world</div>
        <div class="qname">Multi-Agent</div>
        <div class="qex">"Research, draft, brief the team"</div>
      </div>
    </div>
    <p class="footnote">Type C / R / A / M in chat for each prompt I read out.</p>
  </div>
</section>

<section class="slide" data-block="1" data-slide="8">
  <div class="slide-content">
    <div class="kicker">Sprint 5 · Cost of NOT Using Agents</div>
    <h2>Process 50 inbound leads this week.</h2>
    <table class="cost-table">
      <thead>
        <tr><th></th><th>Chatbot-only</th><th class="accent-col">With an agent</th></tr>
      </thead>
      <tbody>
        <tr><td>Time</td><td>6 hours (copy/paste each)</td><td class="accent-col">20 min (review drafts)</td></tr>
        <tr><td>Context</td><td>Every convo restarts</td><td class="accent-col">Memory carries across</td></tr>
        <tr><td>Follow-through</td><td>You forget 3 of them</td><td class="accent-col">Agent schedules all 50</td></tr>
      </tbody>
    </table>
    <p class="analogy">Using only chatbots in 2026 is like using a calculator in a spreadsheet world. It works — but you're doing the integration in your head.</p>
  </div>
</section>

<section class="slide" data-block="1" data-slide="9">
  <div class="slide-content">
    <div class="kicker">Sprint 6 · Agentic Architecture Patterns</div>
    <h2>Four patterns. We're using the first one today.</h2>
    <div class="pattern-grid">
      <div class="pattern-card you-built"><div class="pname">Single-Agent + Tools</div><div class="pdesc">One brain, many tools. <em>(Today.)</em></div></div>
      <div class="pattern-card"><div class="pname">Reflection</div><div class="pdesc">Agent critiques its own output, retries.</div></div>
      <div class="pattern-card"><div class="pname">Planner-Executor</div><div class="pdesc">One agent plans, another executes.</div></div>
      <div class="pattern-card"><div class="pname">Multi-Agent Orchestration</div><div class="pdesc">Specialists coordinated by a router.</div></div>
    </div>
    <p class="analogy">Patterns are recipes. You're learning the base recipe — sandwich. Once you can make a sandwich, you can make a burger, a wrap, a bento box.</p>
  </div>
</section>
```

Add minimal supporting CSS to the `<style>` block for `.loop-compare`, `.loop-box`, `.cost-table`, `.gaps-table`, `.promise-list`, `.roadmap-strip`, `.phase`, `.cover-meta`, etc. Style in the same idiom as Session 1's deck (surface backgrounds, accent borders, JetBrains Mono labels).

- [ ] **Step 7: Test the deck opens in a browser**

Run: `open "Session 02 - From Chatbot to Agent/presenter_deck.html"` (macOS).

Visually verify:
- Topbar with clock displays
- Slide 1 shows the cover
- Arrow keys navigate to slides 2-9
- Visual feels continuous with Session 1's deck (dark bg, teal accent, Inter font)

If anything looks broken, fix CSS inline in the file.

---

## Task 8: Presenter Deck (slides 10-20 — Build phase + Debrief + Close)

**Files:**
- Modify: `Session 02 - From Chatbot to Agent/presenter_deck.html` (append slides 10-20)

- [ ] **Step 1: Write slide 10 (Builder walkthrough overview)**

```html
<section class="slide" data-block="2" data-slide="10">
  <div class="slide-content">
    <div class="kicker">Block 2 · EdYoda Builder Walkthrough</div>
    <h2>Four panels. That's the whole product.</h2>
    <div class="panel-grid">
      <div class="panel-card"><div class="pnum">1</div><div class="pname">Role / System Prompt</div><div class="pdesc">The agent's job description, in plain English.</div></div>
      <div class="panel-card"><div class="pnum">2</div><div class="pname">Tools</div><div class="pdesc">Where you give it hands.</div></div>
      <div class="panel-card"><div class="pnum">3</div><div class="pname">Memory</div><div class="pdesc">What it remembers across runs. <em>(Off for now.)</em></div></div>
      <div class="panel-card"><div class="pnum">4</div><div class="pname">Test / Run</div><div class="pdesc">Where you talk to it — but it can DO things.</div></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write slide 11 (Track pick) and slide 12 (Checkpoint progress — visible during Block 3)**

```html
<section class="slide" data-block="2" data-slide="11">
  <div class="slide-content">
    <div class="kicker">Block 2 · Pick Your Track</div>
    <h2>Same agent shape. Different words.</h2>
    <div class="track-grid">
      <div class="track-card"><div class="tnum">1</div><div class="tname">Marketing/Sales</div><div class="tag">Weekly campaign recap agent</div></div>
      <div class="track-card"><div class="tnum">2</div><div class="tname">Finance/Consulting</div><div class="tag">Variance commentary agent</div></div>
      <div class="track-card"><div class="tnum">3</div><div class="tname">Doctor/Healthcare</div><div class="tag">Patient handover agent</div></div>
      <div class="track-card"><div class="tnum">4</div><div class="tname">Generic</div><div class="tag">Weekly status report agent</div></div>
    </div>
    <p class="footnote">Type your track number in chat. Open the workbook to your track's page.</p>
  </div>
</section>

<section class="slide" data-block="3" data-slide="12">
  <div class="slide-content">
    <div class="kicker">Block 3 · Build Checkpoints</div>
    <h2>Three more steps to L2.</h2>
    <ul class="checkpoint-list">
      <li class="done">✅ Done: Role + 1 tool + 1 goal</li>
      <li class="next">⏳ Next: Add a second tool (acts, doesn't just read)</li>
      <li class="pending">⏳ Then: Turn on memory</li>
      <li class="pending">⏳ Then: Give it a multi-step goal</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 3: Write slide 13 (transition to debrief)**

```html
<section class="slide" data-block="4" data-slide="13">
  <div class="slide-content">
    <div class="kicker">Block 4 · Pattern Debrief</div>
    <h2>You built it. Now let's name what you built.</h2>
    <p class="subhead">Four lenses from the start of class. Map your agent onto each.</p>
  </div>
</section>
```

- [ ] **Step 4: Write slides 14-17 (Lens 1-4 of debrief)**

```html
<section class="slide" data-block="4" data-slide="14">
  <div class="slide-content">
    <div class="kicker">Debrief · Lens 1</div>
    <h2>The 5 Gaps Scorecard.</h2>
    <table class="gaps-table">
      <thead><tr><th>Gap</th><th>Your agent</th></tr></thead>
      <tbody>
        <tr><td>Tools</td><td><span class="check">✅</span> You added 2</td></tr>
        <tr><td>Memory</td><td><span class="check">✅</span> Persistent memory on</td></tr>
        <tr><td>Autonomy</td><td><span class="check">✅</span> Acted without per-step approval</td></tr>
        <tr><td>Planning</td><td><span class="check">✅</span> 3+ step goal executed</td></tr>
        <tr><td>Multi-step reasoning</td><td><span class="check">✅</span> Trace log proves it</td></tr>
      </tbody>
    </table>
    <p class="analogy accent-h">Five for five. In 90 minutes.</p>
  </div>
</section>

<section class="slide" data-block="4" data-slide="15">
  <div class="slide-content">
    <div class="kicker">Debrief · Lens 2 · Maturity</div>
    <h2>Where did you land?</h2>
    <!-- Same maturity-ladder as slide 6, but with the L2 row pulsing/highlighted -->
    <div class="maturity-ladder">
      <div class="maturity-rung"><span class="rung-label">L0</span><div>Chatbot</div></div>
      <div class="maturity-rung"><span class="rung-label">L1</span><div>Copilot</div></div>
      <div class="maturity-rung active"><span class="rung-label">L2</span><div><strong>Agent — you are here.</strong></div></div>
      <div class="maturity-rung"><span class="rung-label">L3</span><div>Multi-Agent — you don't need this yet.</div></div>
    </div>
    <p class="footnote">L2 solves probably 80% of the workflows you'd want to automate at work. Don't over-engineer.</p>
  </div>
</section>

<section class="slide" data-block="4" data-slide="16">
  <div class="slide-content">
    <div class="kicker">Debrief · Lens 3 · Decision Quadrant</div>
    <h2>Where does your agent belong?</h2>
    <!-- Same quadrant as slide 7, but with the Agent cell highlighted -->
    <div class="quadrant">
      <div class="quadrant-cell"><div class="qlabel">Static · Answer</div><div class="qname">Chatbot</div></div>
      <div class="quadrant-cell active"><div class="qlabel">Static · Act</div><div class="qname">Agent</div><div class="qex">← your agent</div></div>
      <div class="quadrant-cell"><div class="qlabel">Your data · Answer</div><div class="qname">RAG</div></div>
      <div class="quadrant-cell"><div class="qlabel">Your data · Act</div><div class="qname">Multi-Agent</div></div>
    </div>
    <p class="footnote">Next time someone at work says "let's use AI for X" — put it through this quadrant first.</p>
  </div>
</section>

<section class="slide" data-block="4" data-slide="17">
  <div class="slide-content">
    <div class="kicker">Debrief · Lens 4 · The Pattern You Used</div>
    <h2>Single-Agent + Tools. The base recipe.</h2>
    <div class="pattern-grid">
      <div class="pattern-card you-built"><div class="pname">Single-Agent + Tools</div><div class="pdesc">You are here.</div></div>
      <div class="pattern-card"><div class="pname">Reflection</div><div class="pdesc">Same wall twice? → Add this.</div></div>
      <div class="pattern-card"><div class="pname">Planner-Executor</div><div class="pdesc">Goal too complex? → Split this way.</div></div>
      <div class="pattern-card"><div class="pname">Multi-Agent Orchestration</div><div class="pdesc">Need specialists? → This.</div></div>
    </div>
  </div>
</section>
```

Add CSS for `.quadrant-cell.active` (use `--accent-soft` background, `--accent-line` border).

- [ ] **Step 5: Write slide 18 (What's Next) and slide 19 (Close)**

```html
<section class="slide" data-block="5" data-slide="18">
  <div class="slide-content">
    <div class="kicker">Block 5 · What to Build Next</div>
    <h2>Go do this.</h2>
    <ol class="next-steps">
      <li><strong>This week:</strong> Run your agent 5 times on real work. Track time saved (workbook page 11).</li>
      <li><strong>Next 2 weeks:</strong> Iterate the system prompt. Treat it like a junior employee you're coaching.</li>
      <li><strong>Next month:</strong> Show it to one colleague. Find ONE workflow they'd want. Build the second.</li>
    </ol>
    <p class="footnote">You don't need another course. You need 30 minutes a week and a real problem.</p>
  </div>
</section>

<section class="slide" data-block="5" data-slide="19">
  <div class="slide-content close-slide">
    <h1>Two sessions ago, this was a vending machine.</h1>
    <h1>One session ago, a brain in a jar.</h1>
    <h1 class="accent-h">Today, you gave it hands.</h1>
    <p class="lede">Go run your agent on something real this week.</p>
    <p class="footnote">That's the only homework that matters.</p>
  </div>
</section>
```

- [ ] **Step 6: Optional slide 20 — peer demo placeholder**

```html
<section class="slide" data-block="4" data-slide="20">
  <div class="slide-content">
    <div class="kicker">Block 4 · Peer Demos</div>
    <h2>Three of you. Two minutes each.</h2>
    <p class="subhead">Show your agent run live. Name, role, what it does, run, narrate the trace log.</p>
  </div>
</section>
```

Move this to its position between slide 17 and slide 18 in the document so the slide-counter sequence reads naturally (1→20 in order).

- [ ] **Step 7: Verify all 20 slides render**

Open the deck in a browser. Use arrow keys to step through all slides. Verify:
- No CSS errors
- No raw HTML/markdown leaking through
- Slide counter in topbar increments correctly
- All slides use the same dark palette
- Mobile-narrow widths: at least readable (deck is desktop-first, mobile is best-effort)

---

## Task 9: Learner Deck

**Files:**
- Create: `Session 02 - From Chatbot to Agent/learner_deck.html`

**Reference to mirror:** `Session 01 - Generative AI Foundations/learner_deck.html` — read first. Learner deck is a stripped version of the presenter deck: no facilitator notes (kicker stays as section label), no clock, exercise prompts get full-screen treatment.

- [ ] **Step 1: Read Session 1's learner deck**

Read: `Session 01 - Generative AI Foundations/learner_deck.html`. Note the differences vs presenter deck.

- [ ] **Step 2: Copy presenter_deck.html and trim**

Run: `cp "Session 02 - From Chatbot to Agent/presenter_deck.html" "Session 02 - From Chatbot to Agent/learner_deck.html"`

Then edit `learner_deck.html`:
- Remove the clock/delta widgets from the topbar (keep only the title)
- Remove the `.timer-panel` CSS and any timer JS
- Update `<title>` to `Learner · GenAI for Non-Coders · Session 2`
- For each build step slide (would be inserted if not present), add full-screen exercise cards. If presenter deck doesn't have these, add them now for the learner deck only:

```html
<section class="slide exercise-slide" data-block="2" data-slide="11a">
  <div class="slide-content">
    <div class="exercise-tag">BUILD STEP A</div>
    <h2>Skeleton agent — system prompt + first tool</h2>
    <ol class="exercise-steps">
      <li>Open EdYoda Builder. Click <strong>+ New Agent.</strong></li>
      <li>Name it: <code>[YourName]'s Weekly [Track] Agent</code></li>
      <li>Paste the system prompt from your workbook page (4-7) into the <strong>Role</strong> panel.</li>
      <li>In the <strong>Tools</strong> panel, enable ONE tool: <strong>Web Search</strong> (or <strong>Document Reader</strong> for doctors).</li>
      <li>Click <strong>Save</strong>. Don't run yet.</li>
    </ol>
    <p class="exercise-time">⏱ 10 minutes</p>
  </div>
</section>
```

Add equivalent slides for BUILD STEP B, C, D, E. Keep CSS-class `exercise-slide` for full-screen card treatment (larger type, accent border, prominent timer hint).

- [ ] **Step 3: Verify learner deck renders**

Open in browser. Step through. Compare side-by-side with presenter deck. Learner deck should have the same Concept Sprint slides, NEW full-screen exercise slides for each build step, and the SAME debrief slides.

---

## Task 10: LinkedIn Carousel (HTML + PDF)

**Files:**
- Create: `Session 02 - From Chatbot to Agent/linkedin_carousel.html`
- Create: `Session 02 - From Chatbot to Agent/linkedin_carousel.pdf` (exported via browser print)

**Reference to mirror:** `Session 01 - Generative AI Foundations/linkedin_carousel.html` — paper/terra palette, Fraunces serif + Geist sans, 1080×1080 cards, noise overlay. Read it before starting.

**Theme:** *"5 things changed when we stopped using ChatGPT and started using agents."* Post-session recap that funnels readers toward the next cohort.

**Card count:** 10 cards (Session 1 carousel had ~10).

- [ ] **Step 1: Read Session 1's carousel end-to-end**

Read: `Session 01 - Generative AI Foundations/linkedin_carousel.html`. Note the card structure, the noise SVG inline, the `.square::before` and `.square::after` overlays, the typography pairings (Fraunces for big editorial, Geist for body, Geist Mono for labels).

- [ ] **Step 2: Create carousel scaffold with paper palette**

Create `Session 02 - From Chatbot to Agent/linkedin_carousel.html`. Copy the `:root`, `html/body`, `.stage`, `.square`, `.square::before`, `.square::after`, `.square-content` CSS from Session 1's carousel verbatim. Update `<title>` to `LinkedIn Carousel — GenAI for Non-Coders · Session 2 Recap`.

The 10 cards:

1. **Cover** — bold title: *"5 things changed when we stopped using ChatGPT — and started using agents."*
2. **Card 2** — Change 1: *Tools — agents can search, send, schedule. Chatbots can't.* Visual: simple icon row.
3. **Card 3** — Change 2: *Memory — agents remember across runs. Each chatbot conversation is a fresh slate.*
4. **Card 4** — Change 3: *Autonomy — agents act inside bounded goals. Chatbots wait for permission per keystroke.*
5. **Card 5** — Change 4: *Planning — agents handle 3+ step goals end-to-end. Chatbots handle one prompt at a time.*
6. **Card 6** — Change 5: *Multi-step reasoning — agents loop through plan/act/reflect/iterate. Chatbots just respond.*
7. **Card 7** — The decision quadrant (mini version): when to use Chatbot vs RAG vs Agent vs Multi-Agent.
8. **Card 8** — Big quote: *"Using only chatbots in 2026 is like using a calculator in a spreadsheet world."*
9. **Card 9** — *"We just ran a 2-hour live workshop where 25 working professionals — marketers, finance folks, even a doctor — built their own agents. No code."* (Social proof + credibility.)
10. **Card 10** — CTA: *"Next cohort opens [DATE]. DM for a seat. Or reply to this post with the one workflow you'd most want to automate — I'll suggest the shape of the agent."*

Use the same card structure as Session 1:

```html
<section class="square">
  <div class="square-content">
    <header class="card-header">
      <span class="card-count">02 / 10</span>
      <span class="card-tag">Change · 01</span>
    </header>
    <div class="card-body">
      <div class="card-eyebrow">Tools</div>
      <h2 class="card-title">Agents can search, send, schedule.</h2>
      <p class="card-lede">Chatbots can't. That's the whole game.</p>
    </div>
    <footer class="card-footer">
      <span class="brand">GenAI for Non-Coders · Session 2</span>
      <span class="cta">Swipe →</span>
    </footer>
  </div>
</section>
```

Match Session 1's exact tagging conventions (card-count, card-tag, card-eyebrow, brand mark).

- [ ] **Step 3: Write all 10 cards with content**

Fill in card content for cards 1-10 per the outline above. Pull tone from Session 1 carousel — editorial, confident, declarative. Avoid hype.

- [ ] **Step 4: Test in browser at full 1080×1080 scale**

Run: `open "Session 02 - From Chatbot to Agent/linkedin_carousel.html"`

Verify each card:
- Fits 1080×1080 frame
- Typography hierarchy is clear from across the room (LinkedIn carousels are scrolled past in 2 seconds)
- Noise overlay is visible but not overwhelming
- Card counts in headers are sequential and correct

- [ ] **Step 5: Export to PDF**

Open the HTML in Chrome. Print → Save as PDF → Layout: Portrait, Pages: All, Margins: None, Scale: 100%, Background graphics: ON. Save to `Session 02 - From Chatbot to Agent/linkedin_carousel.pdf`.

Verify: `ls -la "Session 02 - From Chatbot to Agent/linkedin_carousel.pdf"` — file should be ~500KB-2MB.

---

## Task 11: Cover Options

**Files:**
- Create: `Session 02 - From Chatbot to Agent/cover_options.html`

**Reference to mirror:** `Session 01 - Generative AI Foundations/cover_options.html` — read first. Note: shows 3-4 different cover design options on one HTML page so the user can pick.

- [ ] **Step 1: Read Session 1's cover_options**

Read: `Session 01 - Generative AI Foundations/cover_options.html`. Identify the variants (likely different ratios: 16:9 for Zoom waiting room and LinkedIn post hero, 1:1 for email/social square, etc).

- [ ] **Step 2: Create 3-4 cover variants for Session 2**

Create `Session 02 - From Chatbot to Agent/cover_options.html` with cover variants. Each variant uses the same Session 2 message but different visual treatments. Suggested variants:

1. **Variant A — Dark deck-style (matches presenter deck):** Dark bg, teal accent, big editorial title "From Chatbot to Agent." 16:9.
2. **Variant B — Paper/terra (matches carousel):** Warm paper bg, terra cotta accent, serif title. 16:9.
3. **Variant C — Minimal monospace:** Pure typography, JetBrains Mono, dark grid. 16:9.
4. **Variant D — Square 1:1:** Best variant scaled to 1080×1080 for square posts.

Use a simple `<style>` per variant, contained in `.cover-variant.variant-a`, `.variant-b`, etc. Render all variants stacked on one page so the user picks visually.

- [ ] **Step 3: Test in browser**

Run: `open "Session 02 - From Chatbot to Agent/cover_options.html"`

Verify all variants render side-by-side. Verify both 16:9 and 1:1 ratios are present.

---

## Task 12: Final Pass — Cross-Reference Validation

**Files:** All Session 2 files

This task catches integration bugs: workbook references that don't match script, deck slide numbers that don't match facilitator callouts, etc.

- [ ] **Step 1: Verify track name consistency across all files**

Run:
```bash
grep -c "Marketing/Sales" "Session 02 - From Chatbot to Agent/"*.md "Session 02 - From Chatbot to Agent/"*.html
grep -c "Finance/Consulting" "Session 02 - From Chatbot to Agent/"*.md "Session 02 - From Chatbot to Agent/"*.html
grep -c "Doctor/Healthcare" "Session 02 - From Chatbot to Agent/"*.md "Session 02 - From Chatbot to Agent/"*.html
grep -c "Generic" "Session 02 - From Chatbot to Agent/"*.md "Session 02 - From Chatbot to Agent/"*.html
```

Expected: Each track name appears in `01_Facilitator_Script.md`, `02_Learner_Workbook.md`, `presenter_deck.html`, `learner_deck.html`. If any file has 0 matches, the file is missing track references.

- [ ] **Step 2: Verify BUILD STEP letter consistency**

Run:
```bash
grep -c "BUILD STEP A\|BUILD STEP B\|BUILD STEP C\|BUILD STEP D\|BUILD STEP E" "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md"
grep -c "BUILD STEP A\|BUILD STEP B\|BUILD STEP C\|BUILD STEP D\|BUILD STEP E" "Session 02 - From Chatbot to Agent/02_Learner_Workbook.md"
```

Expected: Script has 5+ references; workbook has 5+ references (one per step).

- [ ] **Step 3: Verify workbook page references in script are valid**

Run: `grep -o 'workbook page[s]* [0-9-]*' "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md" | sort -u`

For each unique page reference, verify the workbook actually has content there. Workbook has pages 1-12. Any reference to page >12 is a bug.

- [ ] **Step 4: Verify deck slide references in script are valid**

Run: `grep -o 'deck slide [0-9]*' "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md" | sort -u`

For each slide number referenced, verify the deck has a `data-slide="N"` matching it.

- [ ] **Step 5: Verify "no minute X callouts" rule**

Scan facilitator script for the anti-pattern. Look for italicized lines (delimited by `*"..."*`) that contain explicit minute numbers like "by minute 105" or "in 47 minutes":

Run: `grep -n '\*".*minute [0-9]' "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md"`

Expected: ZERO matches. If any matches, rewrite those lines to use conversational time language ("by the end of today," "before we break," etc).

- [ ] **Step 6: Verify Session 1 callbacks are present**

Run:
```bash
grep -c "Session 1\|bakery\|brain in a jar" "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md"
grep -c "Session 1\|Session 1 workbook" "Session 02 - From Chatbot to Agent/02_Learner_Workbook.md"
```

Expected: 5+ references in script, 2+ in workbook. The whole spine of Session 2 depends on this connective tissue.

- [ ] **Step 7: File completeness check**

Run: `ls -la "Session 02 - From Chatbot to Agent/"`

Expected files present:
- `01_Facilitator_Script.md`
- `02_Learner_Workbook.md`
- `presenter_deck.html`
- `learner_deck.html`
- `linkedin_carousel.html`
- `linkedin_carousel.pdf`
- `cover_options.html`

7 files total. If any is missing, the corresponding task wasn't completed.

- [ ] **Step 8: Open every HTML file in browser for visual sanity check**

Open each HTML file. Spend 60 seconds on each. Look for:
- Layout breakage
- Missing fonts
- Console errors (open dev tools)
- Visual continuity with Session 1 (open Session 1 file side-by-side; compare)

---

## Task 13: Acceptance Check Against Spec §13 (Success Criteria)

The spec defines 4 success criteria. Verify each.

- [ ] **Criterion 1: Hands-on hits ≥58% by minutes**

Manually compute: total learner-active minutes / 120. Read script's block timings. Verify ≈70 min of learner activity (Block 2 + Block 3 + peer demos + reflection prompts).

If <58%, the script has drifted into too much lecture. Re-tighten Block 1.

- [ ] **Criterion 2: Take-home prompt forces "automate AND won't" reflection**

Open workbook page (last section, TAKE-HOME). Verify it has both:
- "ONE workflow you'll automate"
- "ONE workflow you WON'T — because it's a chatbot job, a RAG job, or too sensitive"

If only one prompt, add the other.

- [ ] **Criterion 3: All 6 deliverables exist**

Already checked in Task 12 Step 7. Re-confirm: 7 files (6 deliverable types, since carousel is HTML + PDF).

- [ ] **Criterion 4: Script can be run end-to-end in dry-run within ±10 min of 120**

This is a manual check the FACILITATOR does. Document this as a recommended step in the facilitator script's pre-class checklist (already there in Task 1, Step 2). Just verify the checklist item is present.

Run: `grep "dry run\|dry-run" "Session 02 - From Chatbot to Agent/01_Facilitator_Script.md"`

Expected: ≥1 match (the pre-class practice recommendation at the end).

---

## Done.

When all tasks above are checked off:

1. The 7 deliverables exist in `Session 02 - From Chatbot to Agent/`.
2. Cross-references between files are validated.
3. Visual continuity with Session 1 is preserved (decks share dark/teal palette; carousel shares paper/terra palette).
4. The script honors the "no minute X in italicized lines" feedback rule.
5. All success criteria from spec §13 are met.

Final manual step (out of scope for this plan): **Facilitator dry-run.** Block 2 hours. Run the entire script alone with a stopwatch. Adjust pacing notes inline based on actual delivery time. This is the only way to find pacing bugs.

---

# Self-Review (executed before plan handoff)

**Spec coverage check:**

| Spec section | Plan task(s) covering it |
|---|---|
| §1 Identity & Promise | Task 1 (header + Block 0); Task 7 (slides 1-3) |
| §2 Pedagogical decisions | Honored throughout — no contradictions |
| §3 Run sheet | Tasks 1-5 (script blocks 0-5) |
| §4 Block 0 | Task 1 |
| §5 Block 1 (Concept Sprint) | Task 2 (script) + Task 7 (slides 4-9) |
| §6 Block 2 (Build Part 1) | Task 3 (script) + Task 7 (slides 10-12) |
| §7 Hard Break | Task 3 Step 4 |
| §8 Block 3 (Build Part 2) | Task 4 (script) + Task 8 (slide 12 checkpoint) |
| §9 Block 4 (Debrief) | Task 5 Steps 1-2 + Task 8 (slides 13-17, 20) |
| §10 Block 5 (Close) | Task 5 Step 3 + Task 8 (slides 18-19) |
| §11 Deliverables | Tasks 1-11 (one per file) |
| §12 Risks/Contingencies | Task 5 Step 4 (contingency guide in script) |
| §13 Success Criteria | Task 13 |
| §14 Open Questions | Acknowledged in script pre-class checklist (EdYoda feature verification) |

All spec sections have task coverage.

**Placeholder scan:** All `[YourName]`, `[Track]`, `[X]`, `[Y]`, `[Z]`, `[your industry]`, `[YOUR DATE]` placeholders in this plan are INTENTIONAL — they are content that learners or facilitators fill in. No "TBD," "TODO," or "implement later" placeholders remain.

**Type/naming consistency:**
- Track names: "Marketing/Sales", "Finance/Consulting", "Doctor/Healthcare", "Generic" — used consistently in Tasks 3, 4, 6.
- Build step letters: A, B (Block 2), C, D, E (Block 3) — used consistently in Tasks 3, 4, 6.
- Sprint numbers: 1-6 (Block 1 only) — used consistently in Tasks 2, 7.
- Lens numbers: 1-4 (Block 4 only) — used consistently in Tasks 5, 8.
- Deck slide numbers: 1-20, referenced in script and workbook with `data-slide="N"`.

No conflicts found.
