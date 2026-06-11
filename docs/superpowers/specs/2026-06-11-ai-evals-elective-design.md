# AI Evals — Elective Class Design

**Status:** Approved (design phase). Ready for implementation planning.
**Date:** 2026-06-11
**Type:** Standalone elective (NOT part of the canonical 8-session GenAI & AI Agents for Non-Coders curriculum)
**Duration:** 4 hours 15 minutes (runs intentionally 15 min over a 4h block — flex accepted)
**Audience:** 10 invited participants, majority **Product Managers** (non-coders). They sign off on AI features; they do not write code.
**Title (working):** *AI Evals — Trust, but Verify*

---

## 1. Positioning & constraints

- **Standalone elective.** No cohort dependency. Must land cold — assume nothing about prior sessions. **No callbacks** to S1–S8. **No "next session" bridge.**
- **PM lens throughout.** The job-to-be-done is *judgment*: name the eval parts, read an eval report, push back on an engineer's eval claims, and decide whether to ship. Not building test harnesses by hand.
- **Two deliverables** (hard requirement):
  1. A filled-in **1-page Eval Plan** for an agent the PM actually owns (BYOA — bring your own agent).
  2. A **marked-up critique** of a planted-issue eval report.
- **Register:** follows the EdYoda presenter≠learner split and design system ([[edyoda_genai_design_system]], [[edyoda_presenter_vs_learner]]). Dark Console for presenter deck, Paper Editorial for learner deck. `say:` fields are spoken English. No timestamps or stage directions on learner-facing artifacts. Minute markers live in the facilitator run sheet only ([[feedback_no_minute_callouts]]).
- **Concept slides must SHOW, not describe** ([[feedback_visualize_concept_slides.md]]). Each of the five vocabulary concepts gets a real visual (a spreadsheet that looks like a spreadsheet, a gauge with a needle, a 2×2, a three-column judge comparison), never a row of text boxes with arrows.
- **Colophon** on the close page ([[edyoda_author_colophon]]).

### Explicit exclusions
- **The HR Screener case is forbidden in this class.** Do not reference it anywhere, in any artifact.
- No deep statistics, no code-writing exercises, no model-training content.

---

## 2. The two running cases

### Case A — Email Reply Agent (the TEACHING anchor)
A fictional **AI email-reply agent for a real-estate firm**. Chosen because every PM instantly understands it and its output is open-ended (so "did it work?" is genuinely hard). Threaded through all five vocabulary concepts in Act 2. Kept strictly **PM-lens** — framed as a product a PM would own and sign off on, not an engineering artifact.

Golden-set shape for the anchor: 10 real customer emails the firm has answered before — **6 normal, 2 weird, 2 hostile.** Three metrics: (a) "did it answer the question?" (binary), (b) "did it sound on-brand?" (1–5), (c) "did it leak personal info?" (binary, single fail = catastrophe).

### Case B — Wasabi Travels IG Reel Eval (the REAL live demo)
A real, running eval the facilitator built. Source: `/Users/shantanuchandra/Downloads/journey-weaver/marketing/`. An agent (`gemma4` / `qwen2.5-vl:7b` local models) auto-generates a daily Japan-travel Instagram **reel** — script, voiceover, images, captions — with no human in the loop. The eval scores it.

This case is used **full-candor** (facilitator's own failing project) as a 15-min "here's one I built for real" demo, AFTER the vocabulary act. It is NOT the teaching anchor and NOT the critique target.

**Real eval architecture (verified from code 2026-06-11):**

| Stage | What it scores | Judge type | Example metric |
|---|---|---|---|
| S1 | Asset quality | **Code** (deterministic) | `over_reused_count`, `location_fit_rate` |
| S2 | TTS / audio timing | **Code** (ffprobe) | `voice_dur_ratio`, `silence_gap_max_s` |
| S2b | Transcription accuracy | **Whisper** (model) | `wer` (Word Error Rate) |
| S3 | Beat alignment | Code / perceptual hash | `vo_drift_mean_ms`, `cut_honored_rate` |
| S4 | Frame quality | **VLM-judged** (qwen2.5-vl) | `style_consistency`, `composition`, `face_count_max` |
| S5 | Captions | **Code** (ASS parse) | `min_display_violation`, `sync_delta_ms` |
| S6b | Hook strength | **VLM-judged** (qwen2.5-vl) | `hook_score` (1–5) |

**Golden set:** `marketing/evals/calibration/reel/golden.json` — 5 reels, hand-scored by the facilitator on `hook_score`, `style_consistency`, `composition`, `face_count_expected`, with brutally honest free-text notes.

**Two pass-bar styles in one eval:**
- **Hard violations** (binary instant-fail): face leak in a faceless reel, silence gap > 1.5s, caption < 0.6s, caption line > 32 chars.
- **Distribution thresholds** (quality): a metric must beat the p10 of the last 5 runs' p50 values.

**Judge calibration (the killer PM lesson):** every run re-scores the 5 golden reels with the VLM and checks whether the machine still agrees with the human ground truth within ±1 point (±2pp for WER). If the AI judge drifts from the human, the run flags `JUDGE_DRIFT_DETECTED`. → *"Calibrate your judge against a human before you trust its numbers."*

**The headline finding (REAL, full candor):** `hook_score` is **1/5 across all 5 golden reels.** A systemic failure the creator could not see by eyeballing — exactly what an eval exists to catch.

#### ⚠️ TOMORROW-MORNING STAT SWAP (2026-06-12)
A **fresh full eval run** lands tomorrow morning. The numbers in this class are REAL as of 2026-06-11 but must be refreshed:
- **Deterministic metrics** (S1/S2/S3/S5) will be byte-identical — no change expected.
- **LLM/VLM-judged metrics** (`hook_score`, `style_consistency`, `composition`, `wer`) may shift ±2–3pp.
- **`wer` is currently `null`** in the golden set (whisper didn't populate it). If tomorrow's run fills it, that row is the ONLY place a placeholder/fictitious stat exists today — mark it clearly in every artifact and swap it.
- **Action:** after the run, grep all class artifacts for the marker `‹STAT-2026-06-11›` and replace each with the fresh number. See [[project_ai_evals_stat_swap]] memory for the live checklist.

---

## 3. Session arc (8 acts + 2 breaks)

Clock runs to 4:15 (15 min over a 4h block — accepted). Minute markers are facilitator-only; they never appear on learner artifacts.

| # | Act | Dur | Clock | Deliverable touchpoint |
|---|---|---|---|---|
| 1 | **Cold open: the silent failure** | 15 | 0:00–0:15 | — |
| 2 | **The eval vocabulary (5 words)** | 45 | 0:15–1:00 | — |
| 3 | **"Here's one I built" — real IG eval demo** | 15 | 1:00–1:15 | — |
| — | **Break** (coffee + bio) | 15 | 1:15–1:30 | — |
| 4 | **Does this agent even need an eval?** (qualifier) | 25 | 1:30–1:55 | — |
| 5 | **Build: design an eval suite for YOUR agent** | 50 | 1:55–2:45 | **Deliverable 1** |
| 6 | **Demo round: 10 PMs showcase** | 40 | 2:45–3:25 | Deliverable 1 shared |
| — | **Stretch + eat** (meal break) | 20 | 3:25–3:45 | — |
| 7 | **Critique: tear apart a fake report** | 20 | 3:45–4:05 | **Deliverable 2** |
| 8 | **Close + Monday-morning plan** | 10 | 4:05–4:15 | — |

---

## 4. Act detail

### Act 1 — Cold open: the silent failure (15 min)
A real-feeling AI feature ships clean in the demo, then quietly fails in production. Land the single question the whole class answers: **"How would you have caught this before it shipped?"** PMs need the fire before the fire extinguisher. End by naming the promise: by the end of today you'll have a 1-page plan that catches this for your own agent.

### Act 2 — The eval vocabulary (45 min) — LOAD-BEARING
Goal: every PM can finish *"To eval an agent you need a **golden set**, a **metric**, a **judge**, a **pass bar**, and a list of **failure modes**."* One worked example (Email Reply Agent) threaded through all five. ~8 min each + 3-min closer ("The Eval Stack" recap slide).

| # | Concept | One-line definition | Visual (SHOW it) | PM takeaway | Anti-pattern to name |
|---|---|---|---|---|---|
| 1 | **Golden set** | The questions you already know the right answer to | A 10-row spreadsheet: input + *expected behavior* | "Your test, written before you ship. 10 hand-picked > 1000 random." | "We'll just watch live traffic" (no baseline) |
| 2 | **Metric** | What you're actually measuring | A 2×2: binary↔scored × one-shot↔aggregate, with examples in each cell | "One metric is never enough — pick 3: correctness, quality, safety." | "Accuracy" as a single number on open-ended output |
| 3 | **Judge** (10 min, longest) | Who decides if the answer was good | Three columns: Human / Code / LLM — cost, speed, good-at, fails-at | "LLM-as-judge is a junior reviewer — calibrate it against a human first." | "The LLM said the LLM did great" (self-eval bias) |
| 4 | **Pass bar** | The number above which you ship | A gauge with red/yellow/green zones and the bar marked (NOT at 100%) | "Different metrics, different bars. Safety = zero tolerance. Quality = good-enough." | "We'll ship when it's better" (than what? by how much?) |
| 5 | **Failure modes** | The specific ways THIS agent breaks | A tracker: agent in the center, 6 named failure bubbles around it with counts | "You can't eval failures you haven't named. First pass discovers them." | Treating "the eval failed" as one fact — *how* it failed is the signal |

Closer: a single **"The Eval Stack"** slide stacking all five terms. This is the picture every later act calls back to.

### Act 3 — "Here's one I built" — real IG eval demo (15 min)
Full-candor walk-through of Case B. Four beats:
1. **The product** (2): the nightly auto-reel generator; the terrifying PM question.
2. **The five words on a real screen** (7): map each Act-2 term to the actual `golden.json` / `_history.json` / scorer code. Show the three judge types co-existing (code / VLM / human).
3. **The gut-punch** (4): hook_score 1/5 across all 5 reels — a blind spot the eval caught.
4. **The pro move** (2): judge calibration — the eval re-checks its own AI judge against the human every run.

### Act 4 — Does this agent even need an eval? (25 min)
The PM triage tool — stops the "eval everything" reflex. A **4-question qualifier**:
1. Is it **user-facing**?
2. Is the **cost of being wrong** high?
3. Is the output **open-ended** (vs a closed set you can spot-check)?
4. Is it going to **scale past you** (you can't eyeball every output)?

**Two of four = yes → build an eval.** Worked through 3 quick agent examples (one obvious-yes, one obvious-no, one borderline). PMs leave with a triage rule, not just a build rule.

### Act 5 — Build: design an eval suite for YOUR agent (50 min) — DELIVERABLE 1
Each PM fills a **1-page Eval Plan template** for an agent they actually own.
- **Step 0 (5 min):** run their agent through the Act-4 qualifier — does it even need this? (If a PM's agent fails the qualifier, they pick a different agent or a hypothetical — facilitator floats to catch this.)
- **Solo (30 min):** fill the template — golden set sketch (5–10 cases incl. weird + hostile), 3 metrics (correctness/quality/safety), judge choice per metric, pass bar per metric, 3+ named failure modes.
- **Pair-swap critique (15 min):** trade sheets, each PM red-teams a peer's plan against the five concepts.

**Template sections:** Agent + JTBD · Qualifier score (X/4) · Golden set (cases, incl. edge/hostile) · Metrics (3, each tagged correctness/quality/safety) · Judge per metric (human/code/LLM + why) · Pass bar per metric (incl. which is zero-tolerance) · Top failure modes to watch.

### Act 6 — Demo round: 10 PMs showcase (40 min) — DELIVERABLE 1 shared
10 PMs × ~3.5 min (≈2 min present their filled template on one slide + ≈1.5 min one sharp note from cohort/facilitator). Hard time-keeping. 40 min absorbs transition slop; if a PM no-shows it's free buffer; if all run long, cut to 3 min flat. *(This demo round is the reason BYOA was chosen over a shared case — the participants explicitly asked for showcase time.)*

### Act 7 — Critique: tear apart a fake report (20 min) — DELIVERABLE 2
A facilitator-authored **1-page eval report that looks legitimate** but has **3–4 planted issues**:
1. A **gamed metric** (e.g., 98% "accuracy" that's really just the easy 80% of cases).
2. A **cherry-picked golden set** (all normal cases, no edge/hostile).
3. **Missing failure-mode coverage** (a known break that isn't measured).
4. **Vague pass criteria** ("performs well" — no number, no bar).

Solo mark-up (10) → reveal + group debrief (10). Deliverable = their marked-up critique.

### Act 8 — Close + Monday-morning plan (10 min)
One-page "what I'll do this week": pin **one eval to one agent**. No "next session" tease (standalone elective). Colophon ([[edyoda_author_colophon]]).

---

## 5. Artifacts to produce (implementation phase)

Following the EdYoda template set ([[edyoda_genai_design_system]] → `templates/`):
1. **`presenter_deck.html`** — Dark Console cockpit. `say:`/`doSteps:`/`note:` fields. Clock + timing badges (facilitator-only). Paired via `localStorage`.
2. **`learner_deck.html`** — Paper Editorial. Same slide count as presenter (pairing rule). No timestamps, no stage directions.
3. **`01_Facilitator_Script.md`** — run sheet with the minute markers, what-if-X-breaks notes.
4. **`02_Learner_Workbook.md`** — crisp recipe card ([[feedback_no_engagement_theater_in_workbook]]): the 5 concepts, the qualifier, the Eval Plan template, the critique checklist.
5. **The 1-page Eval Plan template** (fillable — handout + slide).
6. **The planted-issue eval report** (1-page handout) + an answer key (facilitator-only).
7. *(Optional)* **`linkedin_carousel.html`** — post-session recap.

**Slide-geometry pre-ship check** ([[feedback_slide_geometry_clipping]]) for any arc text / decorative glyphs. Visual QA via `pdftoppm`-style render before shipping.

---

## 6. Open items
- **Tomorrow's stat swap** (§2) — blocking for final artifact numbers; not blocking for the implementation plan.
- Folder name for this elective (not a numbered session). Suggest `AI Evals - Elective/` at project root.
- Whether the facilitator wants the LinkedIn carousel (Artifact 7) or to skip it for an internal elective.
