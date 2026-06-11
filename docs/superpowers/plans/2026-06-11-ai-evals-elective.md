# AI Evals Elective — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full artifact set for the standalone "AI Evals — Verify first, Trust second" elective (Growth-X Senior PMs, hard 4h cap, two-part modality-focused structure) from the approved spec.

**Architecture:** Six content artifacts in a new `AI Evals - Elective/` folder, derived from the EdYoda template set. The class is NOT a canonical numbered session, so templates are *adapted* (no prior-session callbacks, no next-session bridge, no per-track build starters, mostly-text content) rather than token-filled verbatim. Two running cases: Email Reply Agent (Part-I teaching anchor) and the real Wasabi IG-reel eval (multimodal finale). Two scheduled number swaps are seeded with markers (`‹STAT-2026-06-11›`, `‹BENCH-2026-06-11›`) for replacement within ~12h.

**Tech Stack:** Markdown (facilitator script, handbook) + self-contained HTML/CSS/JS (presenter deck = dark cockpit JS-rendered; learner deck = paper editorial static sections; LinkedIn carousel = paper, 1080×1080). Fonts via Google CDN. No build step. Verification = `pdftoppm`/browser visual QA + per-artifact checklists.

**Spec:** `docs/superpowers/specs/2026-06-11-ai-evals-elective-design.md`

---

## Verification model (read before starting)

These are **content artifacts, not code** — there is no `pytest`. The verification gate for each artifact is a **checklist + visual render**, which the EdYoda design-system memory mandates. Every build task ends with:

1. **Render check:** open the HTML in a browser (`open <file>`) OR render to PNG with `pdftoppm`-style tooling and eyeball it. For Markdown, read it back top-to-bottom.
2. **Checklist pass:** the artifact-specific checklist in its task (pairing symmetry, register rules, geometry math, swap markers present, no forbidden content).
3. **Commit** only after both pass.

**Global invariants every artifact must satisfy** (from spec §1 + design-system memory):
- ❌ **No HR Screener** anywhere (grep each artifact for "HR", "screener", "candidate" before commit — must be zero).
- ❌ **No prior-session callbacks, no "next session" bridge** (standalone elective).
- ❌ **No timestamps / stage directions on learner-facing artifacts** (learner deck, handbook, carousel).
- ✅ **Swap markers present** where the spec says (`‹STAT-2026-06-11›` on IG numbers, `‹BENCH-2026-06-11›` on modality benchmarks).
- ✅ **Create + judge JTBD** reflected (Build = create, Critique = judge).
- ✅ **Colophon** on close pages (presenter, learner, carousel) — Shantanu Chandra + linkedin.com/in/chandrashantanu ([[edyoda_author_colophon]]).
- ✅ **EdYoda wordmark** on internal artifacts (script, handbook, both decks); **NOT** on the public carousel (author byline only).

---

## File Structure

All under a new folder `AI Evals - Elective/` at project root (folder name confirmed by user).

| File | Responsibility | Mode | Source template |
|---|---|---|---|
| `01_Facilitator_Script.md` | Minute-by-minute run sheet for the 4h00 capped session: blocks, the 10 acts, demo-round hard-stop discipline, critique preview-vs-take-home script, contingencies, dry-run plan | text | `01_Facilitator_Script.template.md` |
| `03_Learner_Handbook.md` | The heavy keepsake reference: 5 concepts, qualifier, **all 3 text challenges in full**, the **Modality Metrics Reference table** (centerpiece), the 3 finale ideas + math, the Eval Plan template, the critique checklist | text | `02_Learner_Workbook.template.md` (adapted + renamed Handbook) |
| `eval_plan_template.md` | The fillable 1-page Eval Plan (Deliverable 1) — also embedded in handbook + as a learner-deck slide | text | new (small) |
| `planted_issue_report.md` | The 1-page fake eval report with 3–4 planted issues (Deliverable 2) + a separate facilitator answer key | text | new |
| `learner_deck.html` | Paper-editorial reading deck, static sections, paired to presenter | paper | `learner_deck.template.html` |
| `presenter_deck.html` | Dark-console cockpit, JS `slides` array, clock + timers, paired to learner | dark | `presenter_deck.template.html` |
| `linkedin_carousel.html` | 10-slide 1080×1080 public recap under author byline (no EdYoda brand) | paper | `linkedin_carousel.template.html` |

**Build order** (per design-system memory workflow): script → handbook → eval-plan template → planted report → learner deck → presenter deck → carousel. Decks come after the text artifacts so their content is settled; carousel last.

**Pairing contract:** `learner_deck.html` and `presenter_deck.html` MUST have identical slide counts with 1:1 index alignment, wired via `localStorage` key `genai_aievals_slide_master` (adapt the template's `genai_s{N}_*` key to a non-numbered elective key). The slide list is fixed in Task 6 and both decks build to it.

---

## The fixed slide list (locked here so both decks match)

Both decks build to exactly this list. **22 slides.** Index is 0-based (for `BREAK_SLIDE_INDEX` etc.).

| idx | Act | Slide | tag |
|---|---|---|---|
| 0 | — | Cover (title + pre-class timer on learner) | title |
| 1 | 1 | Cold open: the silent failure | demo |
| 2 | 1 | The question + today's promise (create AND judge) | title |
| 3 | 2 | The Eval Stack (overview of the 5 words) | concept |
| 4 | 2 | Golden set | concept |
| 5 | 2 | Metric | concept |
| 6 | 2 | Judge (3 kinds) | concept |
| 7 | 2 | Pass bar | concept |
| 8 | 2 | Failure modes | concept |
| 9 | 3 | The 4-question qualifier | concept |
| 10 | — | BREAK | break |
| 11 | 4 | Text is hardest: fluent ≠ correct | concept |
| 12 | 4 | The judge ladder (exact → semantic → LLM) | concept |
| 13 | 4 | Faithfulness, made measurable | concept |
| 14 | 4 | Rubric craft: turn "good" into a number | concept |
| 15 | 5 | The Modality Metrics Reference (audio·image·video) | concept |
| 16 | 6 | Finale: the compounding-error math | demo |
| 17 | 6 | Finale: weakest link (real reel scores) | demo |
| 18 | 6 | Finale: the coherence twist + judge calibration | demo |
| 19 | 7 | Build: design an eval for YOUR agent (create) | exercise |
| 20 | 9 | Critique: judge a report (preview + take-home) | exercise |
| 21 | 10 | Close + Monday plan + colophon | title |

> Note: Act 8 (demo round) has no dedicated content slide — it runs on slide 19 (the Build/exercise slide stays up while PMs present). The presenter slide 19 carries the demo-round `doSteps`/timing in its fields. This keeps the count symmetric without a dead slide.

---

## Task 1: Scaffold the folder and copy templates

**Files:**
- Create: `AI Evals - Elective/` (folder)
- Copy: all 5 templates into it (renaming workbook → handbook), plus create 2 new stubs

- [ ] **Step 1: Create the folder and copy templates**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI"
mkdir -p "AI Evals - Elective"
cp templates/01_Facilitator_Script.template.md  "AI Evals - Elective/01_Facilitator_Script.md"
cp templates/02_Learner_Workbook.template.md    "AI Evals - Elective/03_Learner_Handbook.md"
cp templates/learner_deck.template.html         "AI Evals - Elective/learner_deck.html"
cp templates/presenter_deck.template.html       "AI Evals - Elective/presenter_deck.html"
cp templates/linkedin_carousel.template.html    "AI Evals - Elective/linkedin_carousel.html"
```

- [ ] **Step 2: Create the two new stub files**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/AI Evals - Elective"
printf '# Eval Plan — 1-page template\n\n(to be filled in Task 3)\n' > eval_plan_template.md
printf '# Planted-issue eval report + answer key\n\n(to be filled in Task 4)\n' > planted_issue_report.md
```

- [ ] **Step 3: Verify the folder contents**

Run: `ls -1 "AI Evals - Elective/"`
Expected output (7 files):
```
01_Facilitator_Script.md
03_Learner_Handbook.md
eval_plan_template.md
learner_deck.html
linkedin_carousel.html
planted_issue_report.md
presenter_deck.html
```

- [ ] **Step 4: Commit the scaffold**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI"
git add "AI Evals - Elective/"
git commit -m "chore(evals): scaffold AI Evals elective folder from templates"
```

---

## Task 2: Facilitator Script

**Files:**
- Modify: `AI Evals - Elective/01_Facilitator_Script.md` (fill all `{{...}}` tokens, adapt for standalone elective)

The script is the run sheet. It carries the minute markers (facilitator-only — allowed here), the block structure, and the contingencies. Build it from the spec §3 capped clock and §4 act detail.

- [ ] **Step 1: Replace the session-metadata tokens**

Open the file, replace these tokens (the template was built for numbered sessions — adapt):
- `{{SESSION_NUMBER}}` → `Elective` (this is not a numbered session)
- `{{SESSION_TITLE}}` → `AI Evals — Verify first, Trust second`
- `{{SESSION_SUBTITLE}}` → `By the end, you can design an eval suite for any AI agent you own — and tear apart an eval report someone hands you. You'll know what to measure for text, audio, image, and video.`
- `{{AUDIENCE_DESCRIPTION}}` → `10 invited Growth-X participants, majority Senior Product Managers. Non-coders — they sign off on AI features, they don't write code. The cohort appreciates depth; push rigor higher than a generic PM room.`
- `{{SESSION_SPINE}}` → `Fundamentals → Modality deep-dive → Apply (create + judge)`
- `{{NEXT_SESSION_NUMBER}}` / `{{NEXT_SESSION_TITLE}}` → **delete these lines entirely** (standalone elective — no next-session bridge).
- `{{HANDS_ON_MINUTES}}` → `45` (Build 40 + critique preview 5); `{{HANDS_ON_PERCENT}}` → `19`
- `{{BUILD_ARTIFACT}}` → `Every PM walks out with a filled 1-page Eval Plan for their own agent, plus a marked-up critique (finished as take-home).`
- `{{TOOLS_LIST}}` → `Presenter deck (own laptop), learner deck (shared screen), printed Eval Plan templates ×10, printed planted-issue reports ×10, the real Wasabi IG-reel eval open in a terminal/editor for the finale.`
- `{{OPENING_HOOK_LINE}}` → `An AI feature that demoed perfectly shipped Monday — and quietly started failing by Wednesday. Nobody noticed for nine days.`
- `{{ONE_RULE}}` → `You will not leave with notes. You'll leave with an eval you built and a report you tore apart.`
- `{{PUB_TITLE}}` → `A Field Guide to Generative AI`

- [ ] **Step 2: Write the block structure to match the capped 4h00 clock**

Replace the `{{BLOCK_N_*}}` tokens. The elective has 3 blocks mapping to the 3 parts. Use these exact ranges (from spec §3):

```
BLOCK 0 — FUNDAMENTALS · 0:00 – 1:02 · Plant the 5 words + the qualifier.
  Act 1 Cold open ........... 0:00 – 0:12
  Act 2 The 5 words ......... 0:12 – 0:47
  Act 3 Qualifier ........... 0:47 – 1:02
BREAK ...................... 1:02 – 1:15
BLOCK 1 — MODALITY DEEP-DIVE · 1:15 – 2:28 · Text deep, then metrics, then the finale.
  Act 4 Text (deep) ......... 1:15 – 1:50
  Act 5 Audio·Image·Video ... 1:50 – 2:08
  Act 6 Multimodal finale ... 2:08 – 2:28
BLOCK 2 — APPLY · 2:28 – 4:00 · Create one, judge one.
  Act 7 Build (create) ...... 2:28 – 3:08
  EAT ....................... 3:08 – 3:23
  Act 8 Demo round .......... 3:23 – 3:53   ← BINDING ACT: hard 3-min/PM stop
  Act 9 Critique preview .... 3:53 – 3:58   ← rest is take-home
  Act 10 Close .............. 3:58 – 4:00
```

- [ ] **Step 3: Write the per-act facilitator detail**

For each of the 10 acts, write a run-sheet block with: what's on screen (slide idx from the locked list), what the facilitator does, the spoken beats (summarized — full spoken lines live in the presenter deck `say:`), and the watch-outs. Pull content from spec §4. Key specifics that MUST appear:
- Act 6 finale: the three beats (compounding math → weakest link with real `hook_score` 1/5 → coherence twist "lanterns vs dusk"), and the note that the IG numbers are real-as-of-2026-06-11 pending tomorrow's swap.
- Act 8: explicit hard-stop script — "3 minutes each, I will cut you off, that's 10 people in 30 minutes." Note: no-show = free buffer; never let one run long.
- Act 9: the preview script — hand out the report, run the 5 concepts as a checklist, find ONE planted issue together, the rest is take-home, answer key shared after.

- [ ] **Step 4: Write the contingency guide**

Replace `{{CONTINGENCY_*}}` with these real cases:
- **Running long at the break (>1:15):** cut Act 5 from 18→12 by reading the metrics table faster (it's in their handbook anyway).
- **Build running hot (PMs not done at 3:08):** the pair-swap (last 12 min of Act 7) is the cut — go straight to eat, do swaps as the first 5 min of the demo round.
- **A PM's agent fails the qualifier:** have them pick a hypothetical or a well-known product (e.g., a support chatbot); don't let them stall.
- **Finale tech fails (can't open the real eval):** the handbook has the screenshots/numbers; narrate from there. The story works without the live files.
- **Fewer than 10 PMs:** demo round shrinks; bank the time into deeper per-demo feedback, do not pad.

- [ ] **Step 5: Write the dry-run plan**

Replace `{{PRACTICE_RECOMMENDATION}}`: `Read the finale aloud once with the real golden.json open — the hook_score=1/5 reveal is the emotional peak; land it without flinching. Time the 5-word block; it's the one that overruns. Pre-print 10 Eval Plan templates and 10 planted reports. Open the Wasabi eval folder in a tab before going live.`

- [ ] **Step 6: Verify — read top to bottom + checklist**

Read the whole file. Checklist:
- [ ] Clock blocks sum to exactly 4:00.
- [ ] No `{{` tokens remain (`grep -c '{{' "AI Evals - Elective/01_Facilitator_Script.md"` → 0).
- [ ] No "next session" / "Session N+1" content.
- [ ] No HR Screener (`grep -ci 'screener\|candidate' ...` → 0).
- [ ] EdYoda wordmark reference present (internal artifact).
- [ ] Create + judge framing present in the subtitle/one-rule.

- [ ] **Step 7: Commit**

```bash
git add "AI Evals - Elective/01_Facilitator_Script.md"
git commit -m "feat(evals): facilitator script — 4h00 capped run sheet, 10 acts, contingencies"
```

---

## Task 3: Eval Plan template (Deliverable 1)

**Files:**
- Modify: `AI Evals - Elective/eval_plan_template.md`

The fillable 1-pager. Must be modality-aware (spec §4 Act 7 template sections). This same content gets embedded in the handbook (Task 5) and rendered as learner-deck slide 19 (Task 6).

- [ ] **Step 1: Write the template**

Write this exact content:

```markdown
# Eval Plan — 1 page · fill this for an agent you own

**Your name:** ________________   **Date:** ____________

## 1. The agent
- **What it does (one line):** _______________________________________________
- **Job-to-be-done for its user:** __________________________________________
- **Modality(ies):** ☐ text ☐ audio ☐ image ☐ video ☐ multimodal

## 2. Does it even need an eval? (circle)
| Question | | |
|---|---|---|
| User-facing? | YES | no |
| High cost of being wrong? | YES | no |
| Open-ended output? | YES | no |
| Will it scale past you? | YES | no |

**2+ YES → build the eval.** Score: ___ / 4

## 3. Golden set (your test, written before you ship)
5–10 cases you already know the right answer to. Include weird + hostile.
| # | Input | Expected behavior |
|---|---|---|
| 1 (normal) | | |
| 2 (normal) | | |
| 3 (normal) | | |
| 4 (weird) | | |
| 5 (hostile) | | |

## 4. Metrics — pick 3 (one each)
| Metric | What it measures | Type |
|---|---|---|
| **Correctness:** | | |
| **Quality:** | | |
| **Safety:** | | |

> If audio/image/video: pick modality-appropriate metrics from the Modality Metrics Reference.

## 5. Judge per metric
| Metric | Judge: human / code / LLM | Why |
|---|---|---|
| Correctness | | |
| Quality | | |
| Safety | | |

## 6. Pass bar per metric (which is ZERO-tolerance?)
| Metric | Pass bar | Zero-tolerance? |
|---|---|---|
| Correctness | | |
| Quality | | |
| Safety | | ☐ yes |

## 7. Top failure modes to watch (name 3+)
1. ____________________________________
2. ____________________________________
3. ____________________________________
```

- [ ] **Step 2: Verify + commit**

Read it back. Checklist: modality row present; qualifier present; golden set has weird+hostile rows; metrics tagged correctness/quality/safety; judge + pass-bar per metric; zero-tolerance flagged. Then:

```bash
git add "AI Evals - Elective/eval_plan_template.md"
git commit -m "feat(evals): 1-page Eval Plan template (Deliverable 1, modality-aware)"
```

---

## Task 4: Planted-issue report + answer key (Deliverable 2)

**Files:**
- Modify: `AI Evals - Elective/planted_issue_report.md`

A fake-but-legitimate-looking 1-page eval report with exactly 4 planted issues (spec §4 Act 9), plus a facilitator answer key in the same file (clearly separated, marked facilitator-only).

- [ ] **Step 1: Write the fake report (looks real, has 4 planted issues)**

Use a NON-IG, non-HR fictional agent (a customer-support chatbot) so it doesn't collide with the two running cases. Plant exactly these 4 issues:
1. **Gamed metric** — headline "98% accuracy" computed only over the easy/normal cases.
2. **Cherry-picked golden set** — 40 cases, all normal; zero weird/hostile.
3. **Missing failure-mode coverage** — known PII-leak risk never measured (no safety metric at all).
4. **Vague pass criteria** — "the model performs well and is ready to ship" with no number, no bar.

Write a realistic 1-page report (title, agent description, "golden set" summary, "metrics" table with the 98% headline, a "conclusion" with the vague ship claim). Make it look credible — the issues should be findable but not labeled.

- [ ] **Step 2: Write the facilitator answer key (same file, clearly fenced)**

Add a page break and a `> FACILITATOR ONLY — ANSWER KEY` section listing the 4 planted issues, where each hides, and the one-line teaching point for each. Add a 5th "bonus" prompt: "what modality did they never check?" (answer: they only scored text; no latency/audio even though it's a voice bot — adjust the report so this holds).

- [ ] **Step 3: Verify + commit**

Checklist: exactly 4 planted issues present and findable; report reads as credible; answer key fenced + marked facilitator-only; uses the support-chatbot (not IG, not HR); the bonus modality-gap holds. Then:

```bash
git add "AI Evals - Elective/planted_issue_report.md"
git commit -m "feat(evals): planted-issue eval report + answer key (Deliverable 2)"
```

---

## Task 5: Learner Handbook (the heavy reference)

**Files:**
- Modify: `AI Evals - Elective/03_Learner_Handbook.md`

The keepsake. This is where the depth lives (the cohort wants a one-stop reference). Adapt the workbook template heavily — it's a Handbook, not a camp-counselor workbook ([[feedback_no_engagement_theater_in_workbook]]: crisp recipe-card register, no emoji-reaction prompts, no reassurance paragraphs).

- [ ] **Step 1: Header + the 5 concepts**

Replace template tokens. `{{WORKBOOK_HOOK_LINE}}` → `You'll leave able to build an eval and judge one. This is the reference you keep.` (no prior-session callback). Then write the **5 concepts** section: golden set, metric, judge (3 kinds), pass bar, failure modes — each with the one-line def, the PM takeaway, and the anti-pattern (from spec §4 Act 2 table). Crisp, reference-style.

- [ ] **Step 2: The qualifier**

Write the 4-question qualifier as a checklist with the "2 of 4 = yes → build" rule and the 3 worked examples (obvious-yes, obvious-no, borderline).

- [ ] **Step 3: ALL THREE text challenges in full** (the deep-text depth that the deck only samples)

Write three subsections:
- **The judge ladder:** exact-match → semantic similarity → LLM-as-judge with rubric. For each: what it is, when to use, what it costs, what it misses. Include a worked example on the Email Reply Agent.
- **Hallucination & faithfulness:** fluent ≠ correct; decompose "grounded?" into checkable claims; the groundedness check; why a golden set with known answers is the defense.
- **Rubric design worksheet:** how to turn "on-brand" into 3 scorable sub-criteria; a fill-in worked example.

- [ ] **Step 4: The Modality Metrics Reference table (THE CENTERPIECE)**

Write the full table. Columns: **Metric · What it measures · Typical "good" value · Who judges (code/model/human) · What it MISSES.** Rows grouped by modality: Text, Audio, Image, Video, Multimodal. Use the metric list from spec §4 Act 5. **Every numeric "good value" carries the marker `‹BENCH-2026-06-11›`** (dummy-logical, to be swapped). Example row:

```
| WER (audio) | Word Error Rate of the transcript vs script | < ~10% ‹BENCH-2026-06-11› | code (whisper) | Ignores meaning — a low WER can still be a nonsense sentence |
```

Fill every modality with its metrics + the "what it misses" column (that's the column that makes a PM dangerous — write it carefully for each).

- [ ] **Step 5: The three finale ideas + the math**

Write all three multimodal ideas (weakest-link, cross-modal coherence, compounding error) in full, with the compounding math worked out (e.g., 0.9^4 ≈ 0.66 → 66% end-to-end) and the real Wasabi reel as the example. Mark IG-specific numbers with `‹STAT-2026-06-11›`.

- [ ] **Step 6: Embed the Eval Plan template + the critique checklist**

Paste the Eval Plan template (from Task 3) as a section. Then write the **critique checklist**: the 5-concept lens to run against any eval report (does it have a real golden set? edge/hostile cases? metrics for all 3 of correctness/quality/safety? a stated pass bar with a number? coverage of known failure modes? all modalities checked?).

- [ ] **Step 7: Take-home + colophon**

`{{TAKEHOME_PROMPT_1}}` → `Pick one agent you own. Fill the Eval Plan for it this week.` `{{TAKEHOME_PROMPT_2}}` → `Finish marking up the planted-issue report; check against the answer key when it's shared.` Add the author colophon ([[edyoda_author_colophon]]). Keep EdYoda wordmark (internal artifact).

- [ ] **Step 8: Verify — read top to bottom + checklist**

- [ ] No `{{` tokens remain.
- [ ] No HR Screener (`grep -ci 'screener\|candidate'` → 0).
- [ ] No timestamps anywhere (learner-facing).
- [ ] No engagement-theater (no "drop an emoji", no "you won't be left behind").
- [ ] `‹BENCH-2026-06-11›` present on every benchmark number; `‹STAT-2026-06-11›` on IG numbers.
- [ ] The Modality Metrics Reference has all 4 columns incl. "what it misses" for every row.
- [ ] All 3 text challenges present in full.
- [ ] Colophon + EdYoda wordmark present.

- [ ] **Step 9: Commit**

```bash
git add "AI Evals - Elective/03_Learner_Handbook.md"
git commit -m "feat(evals): learner handbook — 5 concepts, deep text, modality metrics reference, finale"
```

---

## Task 6: Learner Deck (paper editorial, 22 slides)

**Files:**
- Modify: `AI Evals - Elective/learner_deck.html`

Build the 22 slides from the locked list. Static `<section class="slide">` per slide. Paper/terra. No timestamps, no stage directions. **This deck's slide count (22) is the contract the presenter deck must match in Task 7.**

- [ ] **Step 1: Cover + metadata tokens**

Replace `{{COVER_TITLE}}` → `AI Evals`, `{{COVER_BYLINE}}` → `Verify first, Trust second`, `{{PUB_TITLE}}` → `A Field Guide to Generative AI`, `{{TOTAL_SLIDES}}` → `22`. Keep the pre-class countdown timer on the cover (default 5:00). Set the running head to "AI Evals — Verify first, Trust second".

- [ ] **Step 2: Adapt the localStorage pairing key**

The template uses `genai_s{N}_slide_master`. Change to `genai_aievals_slide_master` (and the print key to `genai_aievals_print_request`). Find the listener in this file and update the key string. (Presenter must use the same key — Task 7.)

- [ ] **Step 3: Build slides 1–9 (Part I)**

One `<section class="slide">` each, matching the locked list idx 1–9. Editorial register (lede, body, pull-quote). Content from spec §4 Acts 1–3:
- idx 1 cold open, idx 2 the promise (create AND judge), idx 3 The Eval Stack overview, idx 4–8 the five concepts (each SHOWS its visual per [[feedback_visualize_concept_slides]] — a real spreadsheet, a 2×2, a 3-column judge table, a gauge, a failure-mode tracker), idx 9 the qualifier.

- [ ] **Step 4: Build slide 10 (break)**

Keep the template's `.break-slide` (auto-fires the learner countdown). Retitle to the elective break.

- [ ] **Step 5: Build slides 11–18 (Part II)**

idx 11 fluent≠correct, idx 12 judge ladder, idx 13 faithfulness, idx 14 rubric craft, idx 15 the Modality Metrics Reference (a real table on the slide — abbreviated; full version in handbook; benchmark cells carry `‹BENCH-2026-06-11›`), idx 16 compounding-math (SHOW the 0.9^4→0.66 visual), idx 17 weakest-link (real reel scores, `‹STAT-2026-06-11›` on numbers), idx 18 coherence twist + judge calibration.

- [ ] **Step 6: Build slides 19–21 (Part III)**

idx 19 = exercise slide variant (the Build — use the template's `.exercise` slide; oversized terra letter, the Eval Plan template as the paste-ready block, timer pinned). idx 20 = critique exercise (the planted-report preview + "rest is take-home"). idx 21 = close (Monday plan + colophon).

- [ ] **Step 7: Verify — render + checklist**

Run: `open "AI Evals - Elective/learner_deck.html"` and click through all 22.
- [ ] Exactly 22 `<section class="slide">` (`grep -c 'class="slide' ...`).
- [ ] No `{{` tokens remain.
- [ ] No timestamps / stage directions visible.
- [ ] Noise overlay + vignette present (don't remove).
- [ ] Every concept slide SHOWS a real visual (not a text-box row).
- [ ] Swap markers present on benchmark + IG cells.
- [ ] Colophon on close; EdYoda wordmark in running head/footer.
- [ ] Arc text / decorative glyph geometry correct ([[feedback_slide_geometry_clipping]]) — verify visually.

- [ ] **Step 8: Commit**

```bash
git add "AI Evals - Elective/learner_deck.html"
git commit -m "feat(evals): learner deck — 22 paper-editorial slides, modality-focused"
```

---

## Task 7: Presenter Deck (dark cockpit, 22 slides — MUST match learner)

**Files:**
- Modify: `AI Evals - Elective/presenter_deck.html`

JS-rendered from a `slides` array. Dark/teal cockpit. **Exactly 22 slide objects** (1:1 with the learner deck). Every `say:` is spoken English (read aloud before shipping — [[edyoda_presenter_vs_learner]]).

- [ ] **Step 1: Metadata + pairing key + break index**

Replace the session-title tokens (title "AI Evals — Verify first, Trust second"). Change the localStorage key to `genai_aievals_slide_master` (match Task 6). Set `const BREAK_SLIDE_INDEX = 10;` (the break is idx 10 in the locked list).

- [ ] **Step 2: Write the 22 slide objects with the capped `when` ranges**

Build the `slides` array, one object per locked-list index, with `when`/`duration` from the spec §3 capped clock. Each object: `num`, `when`, `duration`, `tag`, `title` (MUST match the learner slide's on-screen headline — [[edyoda_presenter_vs_learner]] rule 6), `say` (spoken), `doSteps`, `watch`/`note`/`bridge` as needed. Critical `say:` fields to get right (warm, speakable):
- idx 1 cold open: the silent-failure story, told as talk.
- idx 16–18 finale: the three beats as spoken narration. The weakest-link reveal (idx 17) `say:` must land the "every single reel scored 1 out of 5 on the hook — I'd watched them for weeks and thought they were fine" line.
- idx 19 Build: `doSteps` carries the 40-min structure (qualifier 4, solo 24, pair-swap 12) AND the demo-round (Act 8) hard-stop instructions, since Act 8 runs on this slide.
- idx 20 critique: `doSteps` = hand out report, run the checklist, find ONE issue together, rest take-home.

- [ ] **Step 3: Verify — render + checklist**

Run: `open "AI Evals - Elective/presenter_deck.html"` and arrow through all 22; press `B` (jumps to break at idx 10); press `P` (print signal).
- [ ] Exactly 22 objects in the `slides` array.
- [ ] `slides.length` === learner deck's section count (22). **Pairing contract.**
- [ ] No `{{` tokens remain.
- [ ] Every `say:` reads as speech, not prose (read each aloud).
- [ ] No stage directions inside `say:` (they're in doSteps/note).
- [ ] `BREAK_SLIDE_INDEX` = 10; `B` jumps correctly.
- [ ] `when` ranges sum to the 4h00 capped clock.
- [ ] Titles match learner headlines 1:1.
- [ ] Colophon slide present; EdYoda wordmark present.

- [ ] **Step 4: Test the pairing live**

Open both decks in two tabs from the same folder. Navigate the presenter; confirm the learner follows. Press `P` on presenter; confirm the learner opens its print dialog.
Expected: learner mirrors presenter slide index; print dialog appears on learner.

- [ ] **Step 5: Commit**

```bash
git add "AI Evals - Elective/presenter_deck.html"
git commit -m "feat(evals): presenter deck — 22-slide dark cockpit, paired, spoken say: fields"
```

---

## Task 8: LinkedIn Carousel (public, author byline)

**Files:**
- Modify: `AI Evals - Elective/linkedin_carousel.html`

10-slide 1080×1080 public recap. **NO EdYoda branding** — author byline only ([[edyoda_author_colophon]], template hard-rule 6). **Read [[linkedin_carousel_hook_research]] BEFORE writing the cover.**

- [ ] **Step 1: Read the hook research, then write the cover**

Read the carousel hook research memory. Pick ONE archetype. The strongest available hook is **story-confession** (the facilitator's own agent failed): e.g., a cover hook around "I built an AI that posts to Instagram every night. An eval told me all 5 of my hooks scored 1 out of 5. I'd thought they were fine." — specific, concrete, sub-200-char, no AI-feel opener. Fill `HOOK_*`, the SVG hero, `ISSUE_NUMBER`, `TOTAL_SLIDES` = 10. Sub-caption narrates the visual (does NOT echo the headline).

- [ ] **Step 2: Fill slides 2–10 (fundamentals-first arc)**

- S2 thesis: "You can't tell if an AI feature is good by looking at it. You need an eval."
- S3 mechanism: the 5 words (golden set → metric → judge → pass bar → failure modes), with one `.failure` highlight.
- S4 proof: the real reel agent (compressed — the multimodal stage-gate).
- S5 receipt: expected vs actual — "I thought the hooks were fine" vs "1/5 across all 5" (`.vs-cards`). Mark IG numbers `‹STAT-2026-06-11›`.
- S6 generalise: the Modality Metrics Reference compressed (`.platforms`-style matrix: text/audio/image/video × headline metric). Benchmark cells `‹BENCH-2026-06-11›`.
- S7 defence #1: a copy-ready snippet — the 4-question qualifier.
- S8 defence #2: the create-vs-judge framing (or a WEAK/STRONG eval comparison).
- S9 defences #3+#4: "calibrate your judge against a human" + "different metrics, different pass bars".
- S10 CTA: author byline + a DM-keyword offer (e.g., "DM EVALS for the 1-page template").

- [ ] **Step 3: Verify — render + checklist**

Run: `open "AI Evals - Elective/linkedin_carousel.html"`.
- [ ] Exactly 10 slides.
- [ ] **NO EdYoda wordmark** anywhere (public artifact — author byline only). `grep -ci 'edyoda' ...` → 0.
- [ ] Cover hook ≤200 chars, specific, no AI-feel opener.
- [ ] Sub-caption narrates (doesn't echo headline).
- [ ] No HR Screener (`grep -ci 'screener\|candidate'` → 0).
- [ ] Cover SVG uses `overflow: visible` + `margin-top` (NOT parent padding) — footer must be visible ([[feedback_slide_geometry_clipping]]).
- [ ] Swap markers present on benchmark + IG cells.
- [ ] Author colophon on S10.

- [ ] **Step 4: Commit**

```bash
git add "AI Evals - Elective/linkedin_carousel.html"
git commit -m "feat(evals): LinkedIn carousel — story-confession hook, fundamentals-first recap"
```

---

## Task 9: Final cross-artifact consistency pass

**Files:** all 7 in `AI Evals - Elective/`

A whole-set review before handoff. No new content — just consistency + the global invariants.

- [ ] **Step 1: Run the global grep gates across the whole folder**

```bash
cd "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/AI Evals - Elective"
echo "HR screener (must be 0):"; grep -rci 'screener\|candidate' . | grep -v ':0' || echo "  clean"
echo "Stray template tokens (must be 0):"; grep -rc '{{' . | grep -v ':0' || echo "  clean"
echo "STAT markers present (should be >0 in handbook/decks/carousel):"; grep -rl '‹STAT-2026-06-11›' .
echo "BENCH markers present (should be >0 in handbook/decks/carousel):"; grep -rl '‹BENCH-2026-06-11›' .
echo "EdYoda on carousel (must be 0):"; grep -ci 'edyoda' linkedin_carousel.html
```

Expected: HR clean, tokens clean, both marker sets present in the content artifacts, EdYoda absent from the carousel.

- [ ] **Step 2: Verify the create+judge JTBD is consistent everywhere**

Confirm every artifact frames the JTBD as create AND judge (not judgment alone): script subtitle, handbook hook, learner deck idx 2, presenter deck idx 2. Fix any that still say "judgment" alone.

- [ ] **Step 3: Verify pairing symmetry one more time**

```bash
echo "Learner slides:"; grep -c 'class="slide' learner_deck.html
echo "Presenter slides (count 'num:' in the array):"; grep -c 'num:' presenter_deck.html
```
Expected: both 22 (presenter may count +1 if a `num:` appears in a comment — eyeball if mismatched).

- [ ] **Step 4: Render all three HTML artifacts once more**

```bash
open learner_deck.html presenter_deck.html linkedin_carousel.html
```
Click through each. Confirm: paper artifacts have texture (noise+vignette), dark deck is a cockpit, carousel cover footer is visible, no clipping on arc text/glyphs.

- [ ] **Step 5: Commit any fixes**

```bash
git add "AI Evals - Elective/"
git commit -m "fix(evals): cross-artifact consistency pass — JTBD, pairing, swap markers"
```

---

## Task 10: Update the swap memory with the artifact paths

**Files:**
- Modify: `~/.claude/projects/-Users-shantanuchandra-Downloads-Personal-EdYoda---GAI/memory/project_ai_evals_stat_swap.md`

Now that artifacts exist, record exactly which files carry the swap markers so tomorrow's swap is mechanical.

- [ ] **Step 1: Add the file list to the memory**

Append a section listing which files contain `‹STAT-2026-06-11›` and which contain `‹BENCH-2026-06-11›` (from Task 9 Step 1 output), with their paths under `AI Evals - Elective/`.

- [ ] **Step 2: Commit (memory is outside the repo — no git, just save)**

Memory files are not in the project git repo. Saving the file is sufficient. Confirm the file is written.

---

## Self-Review (completed during planning)

**1. Spec coverage** — every spec section maps to a task:
- §1 positioning/constraints → enforced as global invariants + per-task checklists ✓
- §2 Case A (email) → Task 5 (handbook deep text), Task 6 (learner deck Part I) ✓
- §2 Case B (IG reel) → Task 5 (finale section), Tasks 6/7 (finale slides), Task 8 (carousel proof) ✓
- §2 stat swap → markers seeded in Tasks 5/6/7/8, tracked in Task 10 ✓
- §3 capped clock → Task 2 (script blocks), Task 7 (presenter `when`) ✓
- §4 all 10 acts → Tasks 2/5/6/7 (each act has a slide + script block) ✓
- §4 Act 5 dummy benchmarks → Task 5 Step 4 with `‹BENCH›` markers ✓
- §5 all 7 artifacts → Tasks 1–8 ✓
- §5 Modality Metrics Reference (highest-value) → Task 5 Step 4 ✓
- §6 open items → folder name (Task 1), carousel (Task 8), both decided ✓

**2. Placeholder scan** — no "TBD/handle appropriately/similar to Task N"; every content step shows the actual text or exact tokens. The two intentional swap markers are spec-mandated, not placeholders. ✓

**3. Type/name consistency** — pairing localStorage key is `genai_aievals_slide_master` in BOTH Task 6 and Task 7; slide count is 22 in the locked list, Task 6, and Task 7; `BREAK_SLIDE_INDEX = 10` matches the locked-list break index; swap markers spelled identically (`‹STAT-2026-06-11›`, `‹BENCH-2026-06-11›`) across all tasks. ✓
