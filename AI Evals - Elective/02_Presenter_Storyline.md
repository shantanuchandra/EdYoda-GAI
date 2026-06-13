# AI Evals in the Wild — Presenter Storyline

> A one-page cheat-sheet for delivering the session. The spine of the talk is the
> spine of the field guide: **the breaks are the curriculum.** Don't teach evals as
> theory — teach them as a build diary where every failure forced a concept into existence.
>
> Companion page: **wasabitravels.com/ai_evals** (learners run the prompt kits live).

---

## The one thread to repeat all session

> **A metric you can't name, a judge you haven't validated, and a report nobody can act on
> are all the same failure — and you only find them by looking at real output.**

Say a version of this at the start, in the middle, and at the end. It's the takeaway you
want them to leave with.

---

## The 5-beat arc

### 1. Hook — 2 min
"I built an AI that makes Instagram reels. How do I know if it's any good? I can't write
`assert reel_quality == 0.85` — there's no right answer." → That gap is the entire reason
evals exist. Contrast with traditional tests: deterministic, binary, exact ground truth.
Evals are graded, distributional, judged.

### 2. The 5 words — 5 min
**Golden set · Metric · Judge · Pass bar · Failure modes.** Every eval — Google's,
Anthropic's, yours — reduces to these five. Everything else is detail.
- *Visual:* the **calibration + rubric** screenshot — "this is a golden set and an anchored
  rubric, made real. Ten reels a human scored before any judge ran."

### 3. The method — 5 min (your differentiator)
You don't invent metrics in a meeting room. You read real outputs and let the failures name
themselves: **traces → open codes → theoretical saturation → axial codes → automated
evaluators.** Most talks skip this. It's what separates "I have a vibe" from "I have a metric."
- One line to land: *"Stop reading when new traces stop producing new kinds of notes. Then
  group, count, and attack the most prevalent failure first."*

### 4. The war stories — 15–20 min (the heart)
Pick **4–5, not all 12.** Each one: *what broke → what we did → the one-line lesson.*
Strongest set for a room:

| # | Story | Lesson |
|---|-------|--------|
| 01 | The judge that didn't speak the language (Hindi fine-tune transcribing English) | **Eval the eval first** — validate the judge on knowns before trusting it. |
| 05 | The script that read "(4 seconds)" aloud — and our guard *excused* it | **Every guard can mask a true positive.** |
| 06 | 32 false positives → 0 in three iterations | **Error analysis, not speculation** — fix the most prevalent cause, re-run. |
| 12 | An eval nobody can triage changes nothing | **The product is a decision, not a number.** ← show the **triage drawer** screenshot here. |

Optional swap-ins if the room is technical: **#09** (judge–human disagreement = rubric-drift
alarm) or **#11** (16GB of reality — evals are infrastructure, budget for crashes).

### 5. Land it — 3 min
- The **before/after**: the vibes loop (generate → watch → forget → can't attribute) becomes
  the eval loop (generate N → one command → read distributions → attribute the change).
- The **eval run** screenshot: repeatable, comparable, attributable — the upgrade over vibes.
- The call to action: **"Pick one metric this week. Build the golden set for it. That's the
  whole start."** Point them at the page to run the kits and fill the eval-plan worksheet.

---

## Timing cheat-sheet

| Beat | Minutes | Cumulative |
|------|--------:|-----------:|
| Hook | 2 | 2 |
| The 5 words | 5 | 7 |
| The method | 5 | 12 |
| War stories (4–5) | 18 | 30 |
| Land it + CTA | 3 | 33 |
| Q&A / live kit demo | flex | — |

~33 min of content; pad to your slot with Q&A or a live walk-through of Kit 01 (the
LLM-as-judge prompt) in ChatGPT/Claude using the "open in" buttons.

---

## Screenshots to have on hand (all on the v2 page)

- **Calibration + rubric** → beat 2 (golden set / pass bar made real)
- **Triage drawer** (Tokyo Canal Night Walk) → beat 4, story 12
- **Reel keyframe poster** (faceless) → the hook / "the agent under test"
- **Eval run results** (100% pass, distributions) → beat 5

---

## If you only have 10 minutes

Hook → the 5 words → **one** war story (#06, the 32→0 arc — it contains the whole method) →
"pick one metric this week." Everything else is bonus.

---

## Audience-read adjustments

- **Senior PMs / leaders:** lean on #12 (decisions over dashboards) and the before/after.
  De-emphasize the model/infra detail.
- **Engineers / builders:** lean on #06, #09, #11. Show the cost-ordered pipeline (Stage A
  deterministic → B Whisper → C vision). Offer the live kit demo.
- **Mixed / non-coders:** stay in the 5-words framing; every war story has a plain-English
  lesson that lands without code.

---

*Drafted for the "AI Evals in the Wild" session by Shantanu Chandra. Built on the Wasabi
Travels faceless-reel pipeline. Live guide: wasabitravels.com/ai_evals.*
