# AI Evals — Elective Class Design

**Status:** Approved (design phase, v2 — modality-focused). Ready for implementation planning.
**Date:** 2026-06-11
**Type:** Standalone elective (NOT part of the canonical 8-session GenAI & AI Agents for Non-Coders curriculum)
**Duration:** **Hard cap 4h00.** Designed to land at exactly 4:00 serial (see §3). The in-room critique is reduced to a 5-min preview with the full exercise as take-home — that's the trade that makes the cap fit while protecting deep-text, the finale, and the demo round.
**Audience:** 10 invited **Growth-X** participants, majority **Senior Product Managers** (non-coders). They sign off on AI features; they do not write code. Cohort appreciates depth — push rigor higher than a generic PM room.
**Title (working):** *AI Evals — Verify first, Trust second*

---

## 1. Positioning & constraints

- **Standalone elective.** No cohort dependency. Must land cold — assume nothing about prior sessions. **No callbacks** to S1–S8. **No "next session" bridge.**
- **PM lens throughout.** The job-to-be-done is **create AND judge** (not judgment alone): a PM should be able to (1) **create** — design an eval suite for an agent from scratch: pick the golden set, the metrics, the judges, the pass bars, the failure modes, and the modality-appropriate measures; and (2) **judge** — read an eval report, spot what's gamed or missing, push back on an engineer's claims, and decide whether to ship. The two deliverables map exactly to this split: the Eval Plan = **create**, the report critique = **judge**. Not building test harnesses by hand — but yes, designing what the harness must check.
- **The spine is two-part:** **Part I — eval fundamentals** (taught once, modality-agnostic), then **Part II — modality deep-dive** (how evals actually change across text / audio / image / video / multimodal). **Text gets maximum depth; audio/image/video are delivered as the metrics reference; the multimodal/agent finale is the big payoff.**
- **Two deliverables** (hard requirement):
  1. A filled-in **1-page Eval Plan** for an agent the PM actually owns (BYOA — bring your own agent).
  2. A **marked-up critique** of a planted-issue eval report.
- **Register:** follows the EdYoda presenter≠learner split and design system ([[edyoda_genai_design_system]], [[edyoda_presenter_vs_learner]]). Dark Console for presenter deck, Paper Editorial for learner deck. `say:` fields are spoken English. No timestamps or stage directions on learner-facing artifacts. Minute markers live in the facilitator run sheet only ([[feedback_no_minute_callouts]]).
- **Concept slides must SHOW, not describe** ([[feedback_visualize_concept_slides.md]]). Every concept gets a real visual (a spreadsheet that looks like a spreadsheet, a gauge with a needle, a 2×2, a three-column judge comparison, a stage-gate pipeline with leak points), never a row of text boxes with arrows.
- **Colophon** on the close page ([[edyoda_author_colophon]]).

### Explicit exclusions
- **The HR Screener case is forbidden in this class.** Do not reference it anywhere, in any artifact.
- No deep statistics, no code-writing exercises, no model-training content.

---

## 2. The running cases

### Case A — Email Reply Agent (the TEACHING anchor for Part I)
A fictional **AI email-reply agent for a real-estate firm**. Chosen because every PM instantly understands it and its output is open-ended (so "did it work?" is genuinely hard). Threaded through the five fundamentals in Part I. Kept strictly **PM-lens**.

Golden-set shape: 10 real customer emails the firm has answered before — **6 normal, 2 weird, 2 hostile.** Three metrics: (a) "did it answer the question?" (binary), (b) "did it sound on-brand?" (1–5), (c) "did it leak personal info?" (binary, single fail = catastrophe). This same agent is the worked example for the **deep text section** (hallucination & faithfulness centerpiece).

### Case B — Wasabi Travels IG Reel Eval (the REAL multimodal finale)
A real, running eval the facilitator built. Source: `/Users/shantanuchandra/Downloads/journey-weaver/marketing/`. An agent (`gemma4` / `qwen2.5-vl:7b` local models) auto-generates a daily Japan-travel Instagram **reel** — script, voiceover, images, captions — with no human in the loop. The eval scores it across **all three modalities at once.**

**Decision (v2):** the IG eval is NO LONGER a standalone early demo. It makes ONE powerful appearance — as the **multimodal/agent finale** (Part II climax), where it's most persuasive. Used **full-candor** (facilitator's own failing project). It is NOT the Part-I teaching anchor and NOT the critique target.

**Why it's the perfect multimodal teaching artifact:** it already evaluates text (script/caption → WER + hook), audio (voiceover → `voice_dur_ratio`, `silence_gap`), and video (frames → VLM `style_consistency`, `composition`, `face_leak`) — AND the cross-modal relationships. The three finale ideas (§4, Act F) are each provable on this one artifact with real data.

**Real eval architecture (verified from code 2026-06-11) — the stage-gate model:**

| Stage | Modality | What it scores | Judge type | Example metric |
|---|---|---|---|---|
| S1 | Image/asset | Asset quality, reuse, location fit | **Code** (deterministic) | `over_reused_count`, `location_fit_rate` |
| S2 | Audio | TTS / audio timing | **Code** (ffprobe) | `voice_dur_ratio`, `silence_gap_max_s` |
| S2b | Text↔Audio | Transcription accuracy | **Whisper** (model) | `wer` (Word Error Rate) |
| S3 | Audio↔Video | Beat alignment (cross-modal) | Code / perceptual hash | `vo_drift_mean_ms`, `cut_honored_rate` |
| S4 | Video/frames | Frame quality | **VLM-judged** (qwen2.5-vl) | `style_consistency`, `composition`, `face_count_max` |
| S5 | Text-on-screen | Captions | **Code** (ASS parse) | `min_display_violation`, `sync_delta_ms` |
| S6b | Text+Video | Hook strength | **VLM-judged** (qwen2.5-vl) | `hook_score` (1–5) |

This stage-gate table IS the finale's compounding-error argument: 6 gates, each a place to catch a different modality's failure.

**Golden set:** `marketing/evals/calibration/reel/golden.json` — 5 reels, hand-scored on `hook_score`, `style_consistency`, `composition`, `face_count_expected`, with brutally honest free-text notes (incl. the cross-modal coherence example below).

**Two pass-bar styles in one eval:**
- **Hard violations** (binary instant-fail): face leak in a faceless reel, silence gap > 1.5s, caption < 0.6s, caption line > 32 chars.
- **Distribution thresholds** (quality): a metric must beat the p10 of the last 5 runs' p50 values.

**Judge calibration (the killer PM lesson):** every run re-scores the 5 golden reels with the VLM and checks whether the machine still agrees with the human ground truth within ±1 point (±2pp for WER). Drift → `JUDGE_DRIFT_DETECTED`. → *"Calibrate your judge against a human before you trust its numbers."*

**Real findings for the finale (full candor):**
- **Weakest link:** `hook_score` = **1/5 across all 5 reels** while audio timing (`voice_dur_ratio` p50 ≈ 0.98) and composition (4–5/5) score well. The good parts can't save the bad hook.
- **Cross-modal coherence break (real golden-set note):** *"the voice talks about lanterns but the image is that of dusk without any lanterns."* Audio fine alone, image fine alone — the pairing fails.
- **Another real note:** *"the audio is complete garbage… the script is completely scrap and non-sensical."*

#### ⚠️ TOMORROW-MORNING STAT SWAP (2026-06-12)
A **fresh full eval run** lands tomorrow morning. Numbers are REAL as of 2026-06-11 but must be refreshed:
- **Deterministic metrics** (S1/S2/S3/S5) will be byte-identical — verify, don't assume.
- **LLM/VLM-judged metrics** (`hook_score`, `style_consistency`, `composition`, `wer`) may shift ±2–3pp.
- **`wer` is currently `null`** (whisper hadn't populated it). If the fresh run fills it, that row is the ONLY place a placeholder/fictitious stat exists today — mark and swap.
- **Action:** grep all artifacts for `‹STAT-2026-06-11›`, replace each. See [[project_ai_evals_stat_swap]] for the live checklist.

---

## 3. Session arc — HARD CAP 4h00 (two parts, 10 acts + 2 breaks)

Lands at **exactly 4:00 serial.** No overflow. Minute markers facilitator-only. The cap is bought by making the critique a 5-min in-room preview + take-home (the consistently-flagged flex variable), plus tight trims that cost nothing structural. Deep-text (35), the finale (20), and the demo round (30) are protected.

| # | Part | Act | Dur | Clock | Create/Judge | Deliverable |
|---|---|---|---|---|---|---|
| 1 | I | **Cold open: the silent failure** | 12 | 0:00–0:12 | — | — |
| 2 | I | **The eval vocabulary (5 words)** | 35 | 0:12–0:47 | — | — |
| 3 | I | **Does this agent even need an eval?** (qualifier) | 15 | 0:47–1:02 | — | — |
| — | | **Break** (coffee + bio) | 13 | 1:02–1:15 | — | — |
| 4 | II | **Evaluating TEXT (deep) — hallucination & faithfulness** | 35 | 1:15–1:50 | — | — |
| 5 | II | **Audio · Image · Video — the metrics reference** | 18 | 1:50–2:08 | — | — |
| 6 | II | **FINALE: evaluating a multimodal agent** (real IG reel) | 20 | 2:08–2:28 | — | — |
| 7 | III | **Build: design an eval suite for YOUR agent** | 40 | 2:28–3:08 | **CREATE** | **Deliverable 1** |
| — | | **Stretch + eat** (meal break) | 15 | 3:08–3:23 | — | — |
| 8 | III | **Demo round: 10 PMs showcase** | 30 | 3:23–3:53 | CREATE shared | Deliverable 1 shared |
| 9 | III | **Critique preview** (full exercise take-home) | 5 | 3:53–3:58 | **JUDGE** | **Deliverable 2** (take-home) |
| 10 | III | **Close + Monday-morning plan** | 2 | 3:58–4:00 | — | — |

> **The cap math:** v2 serial ran 4:55. To hit 4:00 we cut 55 min: critique 20→5 in-room (−15, rest take-home), vocabulary 40→35, qualifier 20→15, build 45→40, demo 35→30, break-2 20→15, cold-open 15→12, close 10→2 (the Monday plan is a one-pager they fill, not a lecture). Nothing in Part II's depth was sacrificed.
>
> **Both deliverables survive.** Eval Plan (create) is built and demoed in-room. The critique (judge) is taught + previewed live with the planted-issue report handed out; PMs complete the mark-up at home and the answer key is shared after. If a future run gets a longer block, the critique is the first thing to pull back in-room (restore to 20 min → 4:15).

**Key changes:** hard 4h cap enforced; JTBD is now **create + judge** (Build = create, Critique = judge — see the new column); critique moved to preview+take-home; all trims documented above.

---

## 4. Act detail

### PART I — FUNDAMENTALS

#### Act 1 — Cold open: the silent failure (12 min)
A real-feeling AI feature ships clean in the demo, fails quietly in production. Land the question the whole class answers: **"How would you have caught this before it shipped?"** Fire before the fire extinguisher. End on the promise: today you leave able to **build** an eval for your own agent AND **judge** anyone else's — plus a reference for what to measure no matter the modality.

#### Act 2 — The eval vocabulary, 5 words (35 min) — LOAD-BEARING
Goal: every PM can finish *"To eval an agent you need a **golden set**, a **metric**, a **judge**, a **pass bar**, and a list of **failure modes**."* One worked example (Email Reply Agent) threaded through all five. ~6 min each + recap.

| # | Concept | One-line | Visual (SHOW it) | PM takeaway | Anti-pattern |
|---|---|---|---|---|---|
| 1 | **Golden set** | Questions you already know the answer to | 10-row spreadsheet: input + *expected behavior* | "Your test, written before you ship. 10 hand-picked > 1000 random." | "We'll just watch live traffic" |
| 2 | **Metric** | What you're actually measuring | 2×2: binary↔scored × one-shot↔aggregate | "One metric is never enough — correctness, quality, safety." | "Accuracy" as one number on open output |
| 3 | **Judge** | Who decides if it was good | 3 columns: Human / Code / LLM (cost·speed·good-at·fails-at) | "LLM-as-judge is a junior reviewer — calibrate vs a human first." | "The LLM said the LLM did great" |
| 4 | **Pass bar** | The number above which you ship | Gauge, red/yellow/green, bar marked (NOT 100%) | "Different metrics, different bars. Safety = zero tolerance." | "We'll ship when it's better" |
| 5 | **Failure modes** | The specific ways THIS agent breaks | Tracker: agent center, 6 named failure bubbles + counts | "You can't eval failures you haven't named." | "The eval failed" as one fact |

Recap slide: **"The Eval Stack."** The picture every later act calls back to.

#### Act 3 — Does this agent even need an eval? (15 min)
The PM triage tool. A **4-question qualifier**: (1) user-facing? (2) cost of being wrong high? (3) output open-ended? (4) going to scale past you? **Two of four = yes → build an eval.** Two quick worked examples (one obvious-yes, one borderline). PMs leave with a triage rule, not just a build rule.

---

### PART II — MODALITY DEEP-DIVE

#### Act 4 — Evaluating TEXT (deep): hallucination & faithfulness (35 min)
The deepest section. Deck centerpiece = **hallucination & faithfulness** ("is the answer grounded, or did it make it up?") — the failure every Senior PM has been burned by. The other two text challenges (the **judge ladder** and **rubric design**) are referenced as the *mechanism* and live in full in the handbook.

**Deck flow:**
1. **Fluent ≠ correct (8 min).** Show two answers to the same customer email — both well-written; one invented a policy. The eye can't tell. This is why text is the hardest modality to grade.
2. **The judge ladder, briefly (7 min):** exact-match (great for classification, useless for open text) → semantic similarity (closer, still misses meaning) → **LLM-as-judge with a rubric** (the only thing that scales for open text). Name each rung, cost of each. *Full ladder + when-to-use → handbook.*
3. **Faithfulness, made measurable (12 min):** decompose "is it grounded?" into checkable claims; the groundedness check (does every claim trace to a source?); why a golden set with *known* answers is the only defense. Tie back to the Email Agent's "leak personal info" + "invent a policy" failure modes.
4. **Rubric craft, the transferable bit (8 min):** turning "on-brand" into 3 scorable sub-criteria — the exact skill they'll use in the Build. *Full rubric-writing guide → handbook.*

**Handbook (text):** all three challenges in full — judge ladder with examples, faithfulness/hallucination metric family, rubric-design worksheet.

#### Act 5 — Audio · Image · Video: the metrics reference (18 min)
You asked for "just share the metrics" here — so this act IS a guided walk through the **Modality Metrics Reference** (the handbook centerpiece). One slide per modality showing the headline metrics; the full table is the keepsake artifact. Goal: PMs know *what exists* and *what each metric misses*, fast.

**The Modality Metrics Reference (handbook artifact) — columns:**
**Metric name + what it measures · Typical "good" value / benchmark · Who/what judges it (code / model / human) · What it MISSES (failure mode).**

> ⚠️ **BENCHMARK NUMBERS ARE DUMMY-LOGICAL FOR NOW (swap in ~12h, by 2026-06-12).** Every "typical good value" below is a *plausible placeholder*, not a sourced figure. Each is tagged `‹BENCH-2026-06-11›` in the built artifacts. Real, current benchmark numbers (WER, MOS, CLIPScore, faithfulness norms) get researched and swapped within 12 hours — see [[project_ai_evals_stat_swap]] and §6. Do NOT present these as authoritative until swapped.

Coverage (dummy-logical numbers shown; replace with sourced values):
- **Text:** WER (for transcripts), semantic similarity (good > ~0.8 `‹BENCH›`), faithfulness/groundedness score (good > ~0.9 `‹BENCH›`), LLM-judge rubric score, toxicity/PII flags (zero-tolerance).
- **Audio:** WER (ASR accuracy, good < ~10% `‹BENCH›`), MOS / naturalness (good > ~4.0/5 `‹BENCH›`), `voice_dur_ratio` (~0.9–1.1), max silence gap (< ~1.5s), speaker consistency, latency.
- **Image:** CLIPScore (image-text alignment, good > ~0.3 `‹BENCH›`), aesthetic/quality score (VLM 1–5, good ≥ 4 `‹BENCH›`), face/safety detection (zero-tolerance), OCR-legibility for text-in-image, style adherence.
- **Video:** all of image PLUS temporal coherence, cut-honored rate (good > ~0.8 `‹BENCH›`), A/V sync drift (good < ~100ms `‹BENCH›`), hook/retention proxy.
- **Multimodal:** cross-modal coherence, weakest-link aggregate, stage-gate pass rate.

Each row's **"what it misses"** column is the one that makes a PM dangerous in a review (e.g., *"WER ignores meaning — a low WER can still be a nonsense sentence"*; *"CLIPScore rewards generic matches — it can miss that the brand style is wrong"*).

#### Act 6 — FINALE: evaluating a multimodal agent (20 min) — the real IG reel
The climax. Full-candor walk of Case B. **Leads with the scary number, then resolves it.** All three finale ideas are in the handbook; the deck tells the layered story on real data.

1. **Open with the compounding math (5 min) — the hook.** Chain text→audio→image→video; even ~90%-good per stage ≈ **66% end-to-end**. "Your agent can be 'pretty good' at everything and still fail two times in three." The fix this argues for: **eval every stage, not just the final output.**
2. **Resolve with weakest-link (7 min).** Show the real reel scores: audio timing ~0.98 (great), composition 4–5/5 (great), **hook 1/5 (sinks it).** A multimodal output is only as good as its worst modality — and stage-by-stage eval (S1–S6) is how you find *which* link broke. Map the 6 stages to the modalities.
3. **The coherence twist (5 min).** The real golden-set note: *"voice talks about lanterns but the image is dusk without any lanterns."* Each modality fine alone; the *relationship* failed. Some failures live between the parts — eval the pairings too.
4. **Land it (3 min).** "That's why my eval scores all 6 stages separately AND checks the cross-modal links — and why it re-checks its own AI judge against me every run." One artifact, every lesson from the day, proven on a real failing project.

---

### PART III — APPLY

#### Act 7 — Build: design an eval suite for YOUR agent (40 min) — DELIVERABLE 1 · **the CREATE half of the JTBD**
Each PM fills a **1-page Eval Plan template** for an agent they own. This is where they *create* an eval from scratch.
- **Step 0 (4 min):** run their agent through the Act-3 qualifier — does it even need this? (Fails qualifier → pick another agent or a hypothetical; facilitator floats.)
- **Solo (24 min):** fill the template — golden set (5–10 cases incl. weird + hostile), 3 metrics (correctness/quality/safety), **judge per metric**, **pass bar per metric**, 3+ named failure modes. **Modality prompt:** if their agent has audio/image/video, the template points them at the Metrics Reference to pick modality-appropriate metrics.
- **Pair-swap critique (12 min):** trade sheets, red-team a peer's plan against the five concepts.

**Template sections:** Agent + JTBD · Qualifier score (X/4) · **Modality(ies)** · Golden set (incl. edge/hostile) · Metrics ×3 (tagged correctness/quality/safety) · Judge per metric (human/code/LLM + why) · Pass bar per metric (which is zero-tolerance) · Top failure modes.

#### Act 8 — Demo round: 10 PMs showcase (30 min) — DELIVERABLE 1 shared
10 PMs × ~3 min (≈2 present their filled template + ≈1 one sharp note from cohort/facilitator). **Hard time-keeping — this is the binding act under the 4h cap.** *(Demo round is why BYOA was chosen — the cohort asked for showcase time.)* If a PM no-shows it's free buffer; do not let any single demo run long.

#### Act 9 — Critique preview + take-home (5 min in-room) — DELIVERABLE 2 · **the JUDGE half of the JTBD**
The *judge* skill. A facilitator-authored **1-page eval report that looks legitimate** with **3–4 planted issues**:
1. **Gamed metric** — 98% "accuracy" that's really just the easy 80% of cases.
2. **Cherry-picked golden set** — all normal cases, no edge/hostile.
3. **Missing failure-mode coverage** — a known break that isn't measured (bonus: a known *modality* not evaluated, e.g., "they scored the script but never checked the voiceover").
4. **Vague pass criteria** — "performs well," no number, no bar.

**In-room (5 min):** hand out the report, walk the *method* of critiquing one (run the 5 concepts against it as a checklist), find **one** planted issue together as a model. **Take-home:** PMs mark up the remaining issues solo; the answer key is shared after the session. Deliverable = the completed mark-up. *(If a future run gets a longer block, restore the full 20-min in-room version per §3 → ends 4:15.)*

#### Act 10 — Close + Monday-morning plan (2 min)
A one-page handout they fill (not a lecture): pin **one eval to one agent**, with the right metrics for its modality. No "next session" tease. Colophon ([[edyoda_author_colophon]]).

---

## 5. Artifacts to produce (implementation phase)

Following the EdYoda template set ([[edyoda_genai_design_system]] → `templates/`):
1. **`presenter_deck.html`** — Dark Console cockpit. `say:`/`doSteps:`/`note:`. Clock + timing (facilitator-only). Paired via `localStorage`.
2. **`learner_deck.html`** — Paper Editorial. Same slide count as presenter. No timestamps/stage directions.
3. **`01_Facilitator_Script.md`** — run sheet with minute markers, hard-stop discipline for the demo round (the binding act), the critique preview-vs-take-home script, what-if-X-breaks.
4. **`03_Learner_Handbook.md`** — the heavy reference (note: **Handbook**, the deeper artifact this cohort wants, not just a workbook). Contains: the 5 concepts, the qualifier, **all three text challenges in full** (judge ladder, faithfulness, rubric design), the **Modality Metrics Reference** (the one-stop table — the centerpiece), all three multimodal finale ideas with the math, the Eval Plan template, the critique checklist. Crisp recipe-card register ([[feedback_no_engagement_theater_in_workbook]]).
5. **The 1-page Eval Plan template** (fillable — handout + slide; modality-aware).
6. **The planted-issue eval report** (1-page handout) + facilitator answer key.
7. *(Optional)* **`linkedin_carousel.html`** — post-session recap.

**Modality Metrics Reference is the highest-value new artifact** — build it first and get the real numbers right (cross-check audio/image/video benchmarks against current sources; don't fabricate — [[feedback_ground_before_claiming]]).

**Slide-geometry pre-ship check** ([[feedback_slide_geometry_clipping]]) for arc text / decorative glyphs; visual QA via `pdftoppm`-style render before shipping.

---

## 6. Open items & scheduled swaps
- **DECIDED — Hard 4h cap.** Clock lands at exactly 4:00 (§3). Critique is preview + take-home. No overflow.
- **DECIDED — JTBD is create + judge.** Build = create, Critique = judge. Outcomes copy + template reflect both.
- **SCHEDULED SWAP 1 — IG eval stats** (§2, by 2026-06-12 AM): real today, refresh after tomorrow's run. Marker `‹STAT-2026-06-11›`. Only `wer` is a true placeholder.
- **SCHEDULED SWAP 2 — Modality benchmark numbers** (§4 Act 5, within ~12h): currently **dummy-logical placeholders**, tagged `‹BENCH-2026-06-11›`. Research + swap real current sourcing (WER, MOS, CLIPScore, faithfulness norms). Don't present as authoritative until done ([[feedback_ground_before_claiming]]).
- Folder name for this elective. Suggest `AI Evals - Elective/` at project root.
- Whether to produce the LinkedIn carousel (Artifact 7) for an internal Growth-X elective.

> Both scheduled swaps are tracked in [[project_ai_evals_stat_swap]] — grep artifacts for `‹STAT-2026-06-11›` and `‹BENCH-2026-06-11›`, replace, then delete the memory.
