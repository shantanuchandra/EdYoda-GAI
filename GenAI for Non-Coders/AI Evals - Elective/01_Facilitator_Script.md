# Facilitator Script — AI Evals: Verify first, Trust second (standalone elective)

*A Field Guide to Generative AI — facilitator-only run sheet*

**Subtitle:** *By the end, you can design an eval suite for any AI agent you own — and tear apart an eval report someone hands you. You'll know what to measure for text, audio, image, and video.*
**Duration:** 4h00 (hard cap) · **Format:** Live (in-room / virtual) · **Audience:** 10 invited Growth-X participants, majority Senior Product Managers. Non-coders — they sign off on AI features, they don't write code. The cohort appreciates depth; push rigor higher than a generic PM room.
**Spine:** Fundamentals → Modality deep-dive → Apply (create + judge).
**Hands-on share:** ~19% (≈45 min: Build 40 + critique preview 5). The demo round (30 min) is also learner-driven.
**Two deliverables:** (1) a filled 1-page **Eval Plan** for the PM's own agent (CREATE); (2) a marked-up **critique** of a planted-issue report (JUDGE — finished as take-home).
**Tools assumed available:** presenter deck (your laptop), learner deck (shared screen), printed Eval Plan templates ×10, printed planted-issue reports ×10, the real Wasabi IG-reel eval open in a terminal/editor for the finale.

> **This is a standalone elective — not a numbered course session.** No callbacks to prior sessions. No "next session" bridge. It must land cold.

---

## Pre-Class Checklist (24 hours before)

- [ ] Email the 10 participants: the join link, and one line — *"Bring one AI agent or feature you own or are shipping. You'll design a real eval for it."*
- [ ] Send the **Learner Handbook** (`03_Learner_Handbook.md`) as a view-only doc. Confirm the link is in the invite.
- [ ] Print **10× Eval Plan templates** (`eval_plan_template.md`) and **10× planted-issue reports** (`planted_issue_report.md`, report page only — NOT the answer key).
- [ ] Open the real eval in a tab/editor: `journey-weaver/marketing/evals/calibration/reel/golden.json` and `evals/runs/reel/_history.json`. This is the finale's live exhibit.
- [ ] ⚠️ **Stat check:** the IG numbers in the deck are real as of 2026-06-11. If the fresh run has landed, swap the `‹STAT-2026-06-11›` values first. Likewise the modality benchmark numbers carry `‹BENCH-2026-06-11›` — confirm they've been swapped to real sourced figures before you teach Act 5.
- [ ] Test screen-share + audio. Mute notifications.
- [ ] Water, printed script, a visible timer (the demo round lives or dies on the timer).

---

## Opening Hook Slide (up 5 min before start)

> **"An AI feature that demoed perfectly shipped — and quietly started failing two days later. Nobody noticed for nine days."**

Soft music until you start.

**The one rule for today:** *"You will not leave with notes. You'll leave with an eval you built and a report you tore apart."*

---

# THE 4-HOUR RUN SHEET (HARD CAP 4:00)

Each act notes: the **slide index** (from the deck), **what you say** (full spoken lines are in the presenter deck `say:` fields — summarized here), **what you do**, and the **timing guard**. The demo round (Act 8) is the binding act — protect the cap there.

---

## BLOCK 0 — FUNDAMENTALS (0:00 – 1:02)
**Goal:** plant the 5 words and the qualifier so the rest of the day has a shared vocabulary.

### Act 1 — Cold open: the silent failure · 0:00 – 0:12 · (slides 1–2)

*Open with the silent-failure story (slide 1). An AI feature that passed its demo, shipped, and failed quietly — no error, no alert, just slowly-wrong outputs nobody caught for over a week.* Then ask the room: **"How would you have caught this before it shipped?"** Take 3–4 chat/voice answers. Don't resolve them — name that today's whole point is the answer.

→ Slide 2: the promise. *"By the end you'll be able to do two things: BUILD an eval for your own agent, and JUDGE an eval someone hands you."* Land create AND judge explicitly.

**Analogy (memorize):** *"A demo is a handshake. An eval is a background check."*

> ⏱ **0:12.** If late, cut the number of cold-open answers, not the question.

### Act 2 — The eval vocabulary: 5 words · 0:12 – 0:47 · (slides 3–8)

The load-bearing act. One worked example — the **email reply agent for a real-estate firm** — threaded through all five. ~6 min each.

- Slide 3 **The Eval Stack** (overview): the five words as one picture. *"To eval anything you need a golden set, a metric, a judge, a pass bar, and a list of failure modes."*
- Slide 4 **Golden set:** the 10 emails you already know the right answer to (6 normal, 2 weird, 2 hostile). *"Your test, written before you ship. Ten hand-picked beats a thousand random."*
- Slide 5 **Metric:** pick 3 — correctness, quality, safety. *"One number is never enough — and 'accuracy' on an open-ended answer is almost always a lie."*
- Slide 6 **Judge (3 kinds):** human / code / LLM. *"The LLM-as-judge is a junior reviewer. Useful, cheap, fast — and you calibrate it against a human before you trust it."*
- Slide 7 **Pass bar:** not 100%. *"Different metrics get different bars. Safety is zero-tolerance. Quality is good-enough."*
- Slide 8 **Failure modes:** the specific ways THIS agent breaks. *"You can't test for a failure you haven't named. The first eval run is to discover them."*

→ Close on the Eval Stack recap (back to slide 3's picture in your words).

**Analogy (memorize):** *"The golden set is the exam. The metric is the grading scheme. The judge is the examiner. The pass bar is the cutoff. Failure modes are the answers you know students get wrong."*

> ⏱ **0:47.** This is the act that overruns. If you hit 0:42 still on slide 6, speed through pass bar + failure modes — they're in the handbook in full.

### Act 3 — Does this agent even need an eval? · 0:47 – 1:02 · (slide 9)

The triage tool. The **4-question qualifier**: user-facing? high cost of being wrong? open-ended output? going to scale past you? **Two of four = yes → build an eval.** Run two quick examples live: one obvious-yes (a customer-facing support bot) and one borderline (an internal draft-summarizer). *"This stops you from over-engineering an eval for something that doesn't need one — and from shipping something that does."*

> ⏱ **1:02 → BREAK.**

---

## 🟢 HARD BREAK (1:02 – 1:15) — 13 MINUTES

→ Break slide with countdown. *"Thirteen minutes. Step away — coffee, screens off. When we're back, we go deep on the hardest modality to evaluate: text."*

---

## BLOCK 1 — MODALITY DEEP-DIVE (1:15 – 2:28)
**Goal:** text in depth, the other modalities as a reference, then the multimodal finale that ties it together.

### Act 4 — Evaluating TEXT (deep): hallucination & faithfulness · 1:15 – 1:50 · (slides 11–14)

The deepest section. Deck centerpiece = **hallucination & faithfulness**.

- Slide 11 **Fluent ≠ correct:** show two answers to the same customer email — both well-written; one invented a policy. *"You cannot catch this by reading. Both sound great. One is a lawsuit."* This is why text is the hardest modality to grade.
- Slide 12 **The judge ladder:** exact-match → semantic similarity → LLM-as-judge. Name each rung and its cost. *"Exact match is great for a yes/no classifier and useless for an open answer. The only thing that scales for open text is an LLM judge with a rubric."* (Full ladder is in the handbook.)
- Slide 13 **Faithfulness, made measurable:** break "is it grounded?" into checkable claims; every claim must trace to a source. *"A golden set with known answers is your only real defense against confident nonsense."* Tie to the email agent's "invent a policy" + "leak personal info" failure modes.
- Slide 14 **Rubric craft:** turn "on-brand" into 3 scorable sub-criteria. *"This is the exact skill you'll use in twenty minutes on your own agent."* (Full worksheet in the handbook.)

> ⏱ **1:50.** Protected — do not cut text. If behind, cut from Act 5 next.

### Act 5 — Audio · Image · Video: the metrics reference · 1:50 – 2:08 · (slide 15)

"Just share the metrics." Walk the **Modality Metrics Reference** table (slide 15; full version in their handbook). One pass per modality: name the headline metric, the typical good value, who judges it, and — the important column — **what it misses.** *"WER tells you the words were heard right. It tells you nothing about whether the sentence meant anything. CLIPScore says the image matches the words — and misses that your brand style is completely wrong."*

→ Point them at the handbook table as the keepsake. Goal is recognition, not memorization.

> ⏱ **2:08.** If behind, this is the act to compress (12 min) — the table is in the handbook.
> ⚠️ The benchmark numbers are `‹BENCH-2026-06-11›` placeholders until swapped — don't present them as authoritative if the swap hasn't happened.

### Act 6 — FINALE: evaluating a multimodal agent · 2:08 – 2:28 · (slides 16–18) — the real IG reel

The climax. Full candor — this is your own failing project. Open with the scary number, then resolve it.

- Slide 16 **Compounding math:** chain text→audio→image→video; even ~90%-good per stage ≈ **66% end-to-end**. *"Your agent can be pretty good at everything and still fail two times in three. That's the argument for evaluating every stage, not just the final video."*
- Slide 17 **Weakest link (real scores):** open `golden.json`. Audio timing ~0.98 (great), composition 4–5/5 (great) — **hook 1 out of 5. On all five reels.** *"I watched these for weeks. I thought they were fine. The eval found a systemic failure my own eyes missed. That is the entire reason evals exist — to catch your blind spot."*
- Slide 18 **The coherence twist + judge calibration:** the real note — *"the voice talks about lanterns but the image is dusk without any lanterns."* Each part fine alone; the pairing failed. Then: *"And how do I trust the AI judge? Every run it re-scores my five hand-scored reels and checks it still agrees with me within one point. Calibrate the judge against a human before you trust its numbers."*

→ Land it: *"One eval. Every lesson from today — golden set, three judge types, two pass bars, failure modes, and the modality split — all of it, proven on a real project that was failing."*

**Watch-out:** the hook=1/5 reveal (slide 17) is the emotional peak. Don't rush it, don't soften it. Let the room sit with "I thought they were fine."

> ⏱ **2:28.**

---

## BLOCK 2 — APPLY (2:28 – 4:00)
**Goal:** they create one eval and judge one report.

### Act 7 — Build: design an eval suite for YOUR agent · 2:28 – 3:08 · (slide 19) — DELIVERABLE 1 (CREATE)

Hand out the printed Eval Plan templates.

- **Step 0 (4 min):** each PM runs their agent through the qualifier. *"Score it out of four. Two or more, you're building. If your agent doesn't qualify, grab a hypothetical or a product you know well — don't stall."*
- **Solo (24 min):** fill the template — golden set (5–10 cases, force in a weird and a hostile one), 3 metrics (correctness/quality/safety), judge per metric, pass bar per metric, 3+ failure modes. If their agent has audio/image/video, send them to the Metrics Reference for the right measures.
- **Pair-swap (12 min):** trade sheets, red-team a partner's plan against the five words. *"Be the skeptic. Find the missing hostile case. Find the metric with no real pass bar."*

→ Float the room. Common gaps to catch: golden sets with only happy-path cases; "accuracy" as the only metric; no zero-tolerance safety bar.

> ⏱ **3:08 → EAT.** If PMs aren't done, the pair-swap is the cut — fold it into the start of the demo round.

### 🍽 STRETCH + EAT (3:08 – 3:23) — 15 MINUTES

→ Real food break. *"Fifteen minutes. Eat, stretch. When we're back, every one of you gets the floor for three minutes."*

### Act 8 — Demo round: 10 PMs showcase · 3:23 – 3:53 · (slide 19 stays up) — DELIVERABLE 1 shared — ⏱ BINDING ACT

**This is where the 4h cap is won or lost.** 10 PMs × 3 minutes = 30 minutes, no slack.

→ Set the timer to 3:00 per person. Say it out loud up front: *"Three minutes each. I will cut you off — not because you're wrong, because there are ten of us. Two minutes to show your plan, one for one sharp note from the room."*

→ For each PM: they show their filled template (the agent, the golden set, the three metrics, the riskiest failure mode). One note from cohort or you — the sharpest single thing, not a list.

**Hard rules:**
- A PM who's a no-show is free buffer — bank it, don't fill it.
- Never let one demo run long "because it's interesting." The cost is someone at the end loses their turn.
- If you're at 3:50 with two left, compress to 2 min each. Everyone presents.

> ⏱ **3:53.**

### Act 9 — Critique preview + take-home · 3:53 – 3:58 · (slide 20) — DELIVERABLE 2 (JUDGE)

Hand out the printed planted-issue report (report page only).

→ *"This is an eval report someone on your team might send you. It looks fine. It has at least four things wrong with it. Here's how you read one: run the five words against it like a checklist."* Find **one** planted issue together as a model (the easiest: the vague "performs well, ready to ship" with no number). *"The rest is yours tonight. Mark it up. I'll share the answer key after — there are four issues plus one bonus: a whole modality they never checked."*

> ⏱ **3:58.** This is the flex variable — if a future run has a longer block, restore the full 20-min in-room critique.

### Act 10 — Close + this-week plan · 3:58 – 4:00 · (slide 21)

→ One-page handout they fill (not a talk): *"Before you close your laptop tonight — one agent, one eval, this week. Write down which agent and the first metric you'll measure."* 

→ Colophon slide. *"Everything today is in your handbook — the five words, all the text depth, the full metrics table for every modality. Go verify something."*

→ Thank the room, specifically, for what they built today.

> ⏱ **4:00. Hard stop.**

---

# FACILITATOR CONTINGENCY GUIDE

## Running long at the break (past 1:15)
Cut Act 5 (Audio·Image·Video) from 18→12 min — read the metrics table faster; it's in their handbook in full anyway. Never cut the deep-text act (Act 4).

## Build running hot (PMs not done at 3:08)
The pair-swap (last 12 min of Act 7) is the cut. Go straight to eat, run the swaps as the first 5 minutes of the demo round.

## A PM's agent fails the qualifier
Have them pick a hypothetical or a well-known product (a support chatbot, a meeting-notes summarizer, a code assistant). Don't let them stall hunting for the perfect agent.

## Finale tech fails (can't open the real eval files)
The handbook has the numbers and the story. Narrate from there. The hook=1/5 reveal and the lanterns/dusk note work fully without the live files.

## Demo round overrunning
You're at 3:50 with three PMs left → compress to 2 min flat, drop the cohort note, you give the one note yourself. Everyone presents. The cap is non-negotiable.

## Fewer than 10 PMs
The demo round shrinks. Bank the time into deeper per-demo feedback — two notes instead of one — not into padding earlier acts.

## Someone challenges "evals are just bureaucracy / slow us down"
Acknowledge it — evals do cost time. Then the qualifier IS the answer: you only eval what's user-facing, high-stakes, open-ended, and scaling. For everything else, don't. Evals are how you ship *faster* with confidence, not slower. Pivot to the finale (a real failure a quick eval caught).

## Energy crash after eat
Open the demo round by calling on the PM with the most interesting agent first (you'll have spotted it while floating). Momentum carries the rest.

---

# YOUR PRE-CLASS PRACTICE RECOMMENDATION

- **Read the finale aloud once** with `golden.json` open. The hook=1/5 reveal is the emotional peak — land it without flinching, let "I thought they were fine" hang.
- **Time the 5-word block** (Act 2). It's the one that overruns. Know where you'll compress (pass bar + failure modes) if you're behind at 0:42.
- **Rehearse the demo-round opener** — the "I will cut you off" line. Saying it warmly up front is what makes the hard stops feel fair, not rude.
- **Pre-print** 10 Eval Plan templates and 10 planted reports (report page only).
- **Confirm both swaps are done** (`‹STAT-2026-06-11›`, `‹BENCH-2026-06-11›`) or know which numbers are still provisional.
- Estimated practice time: 60 minutes.
