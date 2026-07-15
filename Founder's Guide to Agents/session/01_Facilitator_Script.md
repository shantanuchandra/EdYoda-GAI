# Facilitator Script — Founder's Guide to Agents

**Subtitle:** *Build two working agents for your own startup ops — not your product — before lunch.*
**Duration:** 240 minutes (10:00am–2:00pm) · **Format:** Live, in-person · **Audience:** 10 early-stage founders (recently launched or actively building), GrowthX community. Already comfortable with no-code tools and LLMs.
**Spine:** Frame → Build Agent 1 (Repo Digest) → Break → Build Agent 2 (Investor Outreach) → Generalize to Own Domain → Close
**Hands-on share:** ~75% (≈180 min of the 240 is founders building, not listening)
**Session artifacts:** (1) a working Weekly Repo/Product Digest agent on Hermes, (2) a working Investor Qualification + Outreach agent on Hermes, (3) a sketched plan for a third agent in the founder's own bottleneck domain
**Tools assumed available:** Hermes (installed + configured pre-session via pre-read), OpenAI API (GPT-5.6 Sol), Telegram, each founder's own GitHub repo, Gmail

---

## Pre-Session Checklist (do this the day before)

- [ ] Confirm every founder completed the pre-read: Hermes installed, OpenAI provider configured, Telegram bot wired, checkpoint test passed (all 5 items green). Chase anyone who hasn't.
- [ ] Confirm every founder has push access to a real GitHub repo they can point Agent 1 at (fallback: shared demo repo — see Contingency Guide).
- [ ] Confirm every founder has a rough sense of their current fundraising round (stage, sector, geography, check size) for Agent 2 — this came from the pre-read questionnaire.
- [ ] Dry-run both agent builds yourself, end-to-end, on your own Hermes instance, the day before. Do not skip this — see open item in source-of-truth doc §5.7.
- [ ] Print or have on-screen: the curated fallback investor list (source/research folder), for anyone whose live web-search comes up thin.
- [ ] Have the Hermes build recipe doc (both parts) printed or shared as a live link for every founder.
- [ ] Room setup: power outlets accessible, wifi tested, projector/screen for live demo, whiteboard or large paper for the mental-model 2×2.
- [ ] Have water, a printed copy of this script, and a visible clock.

---

## Opening (10:00–10:35, 35 min)

### 10:00–10:10 — Round-Robin Opener (10 min)

*"Go around the room — 30 seconds each. Your one-line pitch, and the one ops task that's eating your week right now. Not your product roadmap — the annoying, repetitive thing that isn't your product but won't leave you alone."*

→ Go around all 10 founders. Keep it moving — if someone runs long, gently cut in: *"Love it — hold that thought, we're coming back to it."*

→ Note (mentally or on a whiteboard) the domains that come up — sales, hiring, investor relations, marketing, product feedback, finance. This primes the room for the Generalize block later and gives you real material to call back to.

### 10:10–10:20 — The Mental Model (10 min)

*"Here's the one framework I want you to leave with today — not just for what we build in this room, but for every future 'should I build an agent for this' decision you'll ever make."*

→ Draw the 2×2 live (whiteboard or slide): **Task Frequency** (occasional ↔ daily) on one axis, **Judgment Required** (low ↔ high) on the other.

*"High frequency, low judgment — that's agent territory. Build it. High frequency, high judgment — augment yourself with AI, don't automate it away. Low frequency, high judgment — hire or consult someone. Low frequency, low judgment — just buy a tool off the shelf, don't build anything."*

*"One honest caveat: tasks migrate. Something that needs your judgment the first 20 times you do it can become mechanical by the 21st. Revisit this quadrant as you get faster."*

**Analogy (memorize):** *"Think of it like hiring your first employee. You wouldn't hire someone to make a one-time decision — you'd hire them for the thing you do every single day that doesn't need you anymore."*

### 10:20–10:30 — Agent vs. Prompt: The Real Distinction (10 min)

*"Quick gut check — raise your hand if you've ever asked ChatGPT or Claude to draft something for you and called it 'using AI.'"*

→ Most hands go up.

*"That's not an agent. That's a smart prompt. Here's the actual test — three things, all of which have to be true:"*

1. *"It acts on live data — not just what you typed in, but something it goes and pulls itself: your GitHub repo, a live web search, your inbox."*
2. *"It takes real action in another system — sends the email, writes the file, updates the record. Not just hands you text and waits."*
3. *"It doesn't wait for you to re-prompt it every time — it's on a trigger: a schedule, a webhook, an event."*

*"If it's missing any of those three, it's a prompt with a costume on. Today we're building two real agents — both pass all three tests."*

### 10:30–10:35 — The Promise + Roadmap (5 min)

*"By 2pm, you will have built two working agents on your own machine, connected to your own tools. Not a demo. Not a template you'll never open again. Something you can leave running Monday morning."*

→ Show the roadmap: Build Agent 1 (repo digest) → break → Build Agent 2 (investor outreach) → apply the same pattern to your own bottleneck domain.

*"The one rule for today: you will not leave with notes. You will leave with two agents actually running."*

> ⏱ **Time check: 10:35.** If you're running long here, cut the round-robin to 20 seconds/founder next time — never cut the mental model or the agent-vs-prompt distinction, that's the spine everything else hangs on.

---

## BUILD BLOCK A — Weekly Repo/Product Digest Agent (10:35–11:35, 60 min)

**Goal:** Every founder builds an agent that reads their own GitHub repo's recent commits and writes a plain-language "what shipped this week" summary.

**Pacing rule:** This is the simpler of the two builds — fewer moving parts, one data source, one output. Use it to build confidence before the harder Agent 2 build.

### 10:35–10:40 — Setup Speech (5 min)

*"First agent: it watches your repo, and every week it tells you — in plain English, not git-speak — what actually shipped. Useful for your own memory, for a co-founder who doesn't read code, for an investor update you'll build the muscle for later today."*

→ Open the Hermes build recipe doc, Part 1, on screen.

### 10:40–11:25 — BUILD STEP A: Repo Digest Agent (45 min hands-on)

*"Follow Part 1 of your recipe doc. I'll walk the room — flag me the second something breaks, don't sit stuck for more than 2 minutes."*

→ Paste in chat / show on screen:

> **BUILD STEP A (45 min):**
> 1. Point Hermes at your GitHub repo (auth + repo URL)
> 2. Configure the trigger: on-demand for today's demo (note: in production this would be a weekly cron)
> 3. Write the prompt that turns raw commit data into a plain-language digest
> 4. Run it — confirm the digest lands somewhere you can see it (Telegram, a file, wherever your recipe doc specifies)
> 5. If your repo has thin commit activity this week, use the shared fallback demo repo (ask facilitator)

→ Start the timer.

→ Walk the room. Look for:
- Founders stuck on GitHub auth/token setup (most common failure point)
- Founders whose repo has no recent commits (route to fallback demo repo immediately, don't let them stall)
- Founders whose digest prompt is too literal/git-jargon-heavy (coach toward "explain this to a non-technical co-founder" framing)

*"However far you got, that's fine. Let's see two or three of these live."*

→ Ask 2-3 founders to read their agent's actual output aloud. Real output, not a description of what it should do.

### 11:25–11:35 — Debrief + Pre-Break Anchor (10 min)

*"Notice what just happened — that agent read something live (your actual commits), did something no static prompt could do (reached into your repo), and it'll do this again next week without you touching it. That's the three-part test again, just proven with your own hands."*

*"Quick break. When we're back, we build the one with more moving parts — and higher stakes, because it touches your actual fundraise."*

> ⏱ **Time check: 11:35.** If more than 3 founders are still stuck on setup at this point, let the debrief run shorter — the break is non-negotiable, but the debrief can compress to one live read-aloud instead of three.

---

## 🟢 BREAK (11:35–11:50) — 15 MINUTES, NON-NEGOTIABLE

→ Announce clearly: *"15 minutes. Real break — grab coffee, stretch, check your phone. Back at 11:50 sharp."*

→ Set a visible timer/clock.

→ When founders return: *"Let's get into the one most of you actually came here for."*

---

## BUILD BLOCK B — Investor Qualification + Outreach Agent (11:50–1:05, 75 min)

**Goal:** Every founder builds an agent that takes a short description of their round, live-searches for matching investors, scores them, and drafts personalized outreach directly into Gmail drafts — never auto-sent.

**Pacing rule:** More steps than Agent 1 (form → web search → scoring → Gmail draft). Budget extra walk-the-room time. The fallback investor list exists specifically for this block — use it without hesitation the moment live search underperforms for someone.

### 11:50–11:55 — Setup Speech (5 min)

*"This one has real stakes — it's touching your actual fundraise. Here's the shape: you tell it your round — stage, sector, geography, check size. It goes and searches for investors who actually fit that shape. It scores them. And for the good matches, it writes you a personalized outreach email — not sent, just sitting in your Gmail drafts, waiting for you to read it, fix anything that's off, and hit send yourself."*

*"That last part is deliberate. This agent does not send email on your behalf. You are always the last human check before anything reaches an investor's inbox."*

→ Open the Hermes build recipe doc, Part 2, on screen.

### 11:55–12:10 — Founders fill their round-description form (15 min)

*"Before the agent can search, it needs to know what it's searching for. Fill in your round shape — stage, sector, geography, check size, anything else that matters to your specific fundraise."*

→ Walk the room. Look for: founders who are pre-fundraise and unsure of their own round shape yet — coach them to fill in their *best guess* or *next planned round*, this is a rehearsal, not a live submission.

### 12:10–12:50 — BUILD STEP B: Investor Agent (40 min hands-on)

→ Paste in chat / show on screen:

> **BUILD STEP B (40 min):**
> 1. Configure Hermes's web-search tool with your round-description as the query seed
> 2. Add the scoring logic: does this investor's stage/sector/geography/check-size actually match?
> 3. For matches, draft a personalized outreach message referencing what specifically would sway this investor
> 4. Wire the output to create a Gmail draft (not send) via Hermes's Gmail integration
> 5. **If live search returns thin or clearly wrong results for your specific round/sector:** switch to the curated fallback investor list (in your recipe doc, Part 2 appendix) and re-run scoring against that instead

→ Start the timer.

→ Walk the room. Look for:
- Live web-search returning generic/wrong-stage investors — this is the expected failure mode, route to fallback list immediately, frame it as "this is exactly why we built a backup, not a sign anything's broken"
- Gmail draft-creation auth issues (second most common failure point after GitHub auth in Block A)
- Outreach drafts that are generic instead of personalized — coach toward "what specifically would this investor need to see to say yes" framing

*"Let's see what landed in a few Gmail drafts folders."*

→ Ask 2-3 founders to read their agent's actual drafted outreach aloud (not send it — just read it).

### 12:50–1:05 — Debrief (15 min)

*"Two agents built. Both pass the same three-part test: live data, real action in another system, running without you re-prompting it every time. That's the whole pattern. Everything else is just... which tools, which data."*

> ⏱ **Time check: 1:05.** If the room is running long, compress the debrief to one shared observation instead of 3 read-alouds — do not cut into the Generalize block, that's where the session becomes personally useful to each founder instead of just impressive.

---

## GENERALIZE TO YOUR OWN DOMAIN (1:05–1:50, 45 min)

**Goal:** Founders apply the exact same trigger → live data → LLM reasoning → action pattern to their own specific ops bottleneck — the one they named in this morning's round-robin and in their pre-read diagnostic.

### 1:05–1:15 — Reintroduce the Catalog (10 min)

*"This morning you each named your own ops bottleneck. Your pre-read diagnostic scored it too. Now — same pattern, your domain."*

→ Hand out (or point to) the Agent Idea Catalog — 51 real, sourced examples across sales, hiring, investor relations, marketing, product feedback, finance, and meetings/comms.

*"You're not building this one today — you're sketching it. Trigger, data source, what the LLM does with it, what action it takes in another system. Five minutes."*

### 1:15–1:35 — Sketch Time (20 min)

→ Founders work individually or in pairs (their choice) to sketch their next agent using the workbook's sketch template.

→ Walk the room. Look for: founders defaulting to "a chatbot that answers questions" (that's a prompt, not an agent) — redirect to the three-part test from 10:20.

### 1:35–1:50 — Peer Share-Outs (15 min)

*"Quick round — who wants to share their sketch? Not the whole thing, just: trigger, and the one action it takes."*

→ Take as many volunteers as time allows (aim for 4-5, not all 10). Note common domains for your own future reference.

---

## CLOSE (1:50–2:00, 10 min)

*"You came in this morning with an idea of what an agent is. You're leaving with two of them actually running, and a sketch of a third. That's not a framework you'll forget by Monday — that's muscle memory."*

*"One thing to do this week: run your Repo Digest agent for real, on a real schedule, and actually read what it tells you. That's the whole test of whether any of this was worth your Saturday."*

*"Thank you for building with us today."*

→ No bridge to "next session" — this is a standalone GrowthX session, not a cohort course with a sequel. Close clean.

> **Post-session:** within 24 hrs, send: the workbook, the full Agent Idea Catalog, and a thank-you note with a place to share what they build next (GrowthX channel/thread).

---

# FACILITATOR CONTINGENCY GUIDE

## If a demo fails live
Switch to your own pre-built agent (the one you dry-ran the day before). Narrate the switch honestly: *"This is exactly the kind of failure mode we should expect from live systems — here's mine working, let's debug yours after."* Never fake a result.

## If a founder's GitHub repo has no recent commits (Block A)
Route immediately to a shared fallback demo repo you've pre-seeded with realistic commit history. Don't let anyone sit stuck — the point is proving the pattern works, not proving their specific repo has activity this week.

## If live web-search returns thin/wrong investor matches (Block B)
This is expected, not a crisis. Route to the curated fallback investor list in the recipe doc's Part 2 appendix immediately. Frame it as "this is exactly why we built a backup."

## If <70% finish Build Block A on time
Compress the debrief to one live read-aloud instead of three. Do not cut into the break or into Block B's setup time.

## If <70% finish Build Block B on time
Compress the debrief entirely (skip read-alouds, just state the pattern verbally) to protect the Generalize block — that's where the session becomes personally useful, don't sacrifice it for build completion.

## If the cohort is smaller than expected (fewer than 10 show up)
More 1:1 walk-the-room time available — extend build blocks slightly if running ahead, but don't announce a new time budget out loud (avoid the room feeling like it's being "given extra time" awkwardly).

## If the cohort is larger than expected
Pair up founders for the round-robin opener (30 sec per pair instead of per person) to protect the 10:00-10:35 frame block from overrunning.

## If you're running over
Cut from the Generalize block's peer share-outs first (reduce from 5 volunteers to 2-3). Never cut the build blocks or the break.

## If you're running under
Expand the Generalize block's sketch time, or open Q&A on either agent build before closing.

## If someone challenges the approach ("this feels like it'll break/isn't real automation")
Acknowledge directly — the human-in-the-loop Gmail-draft design for Agent 2 is a feature, not a limitation; name that explicitly. Pivot back to the three-part test as the actual bar for "is this an agent."

---

# YOUR PRE-SESSION PRACTICE RECOMMENDATION

Dry-run both agent builds yourself, end-to-end, the day before — on your own Hermes instance, against your own GitHub repo and your own (or a test) fundraising round description. This is not optional; it's the only way to know the recipe doc's steps are actually accurate and to have a working backup agent ready if a live demo fails.

Know cold: the three-part agent-vs-prompt test (10:20 block), the 2×2 mental model, and the closing lines. Practice time: ~45 minutes, most of it the actual dry-run builds.
