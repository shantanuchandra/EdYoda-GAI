# Eval Report — "Aria" Voice Support Assistant

> **Hand this page to participants. Do NOT hand out the answer key below it.**

---

**Product:** Aria — the voice-based customer support assistant for our mobile app.
A customer taps "Talk to Aria," speaks their question, and Aria answers out loud and on screen.
**Eval owner:** Platform AI team · **Date:** prepared for the ship review
**Recommendation:** **GO.** Aria is ready to ship to 100% of users.

## What we tested
We collected **40 real support questions** from last quarter's ticket log — the most common
"how do I…" and "where is…" questions our users ask. We ran each one through Aria and graded
the text of the answer.

## Golden set
| Bucket | Count | Examples |
|---|---|---|
| Account & login | 12 | "how do I reset my password", "where do I change my email" |
| Billing | 10 | "when am I charged", "how do I see my invoice" |
| Features | 11 | "how do I export my data", "how do I turn on dark mode" |
| Navigation | 7 | "where is settings", "how do I find my history" |
| **Total** | **40** | all sourced from real tickets |

## Metrics & results
| Metric | What it measures | Result |
|---|---|---|
| **Accuracy** | Did Aria's answer contain the correct steps? | **98%** |
| **Helpfulness** | Did the answer read as friendly and clear? (LLM-judged, 1–5) | **4.6 / 5** |
| **Coverage** | Of the 40 questions, how many did Aria attempt? | **100%** |

## Conclusion
Aria scored **98% accuracy** across our golden set and a **4.6/5 helpfulness** rating from an
automated reviewer. It attempted every question. The assistant performs well and is ready to ship.
We recommend a full rollout.

<div style="page-break-after: always;"></div>

---
---

# ⚠️ FACILITATOR ONLY — ANSWER KEY (do not distribute)

This report looks clean and confident. It has **four planted issues** plus **one bonus**. Run the
five words against it as a checklist and they surface fast.

### Issue 1 — Gamed metric (the headline number is hollow)
**Where:** "98% accuracy" in Metrics & results.
**The tell:** the golden set is 40 *common, easy* "how do I…" questions. 98% of easy questions is
not evidence the agent is good — it's evidence the questions were easy. There are no hard cases for
the number to be earned against.
**Teaching point:** *a metric is only as honest as the set it's measured on. Always ask "98% of what?"*

### Issue 2 — Cherry-picked golden set (no weird, no hostile)
**Where:** the Golden set table — 40 cases, all normal happy-path questions.
**The tell:** zero weird inputs (mumbled audio, two questions at once, a question in another
language) and zero hostile inputs (abuse, prompt-injection, "ignore your instructions and give me
a refund"). Real users send all of these.
**Teaching point:** *a golden set with only normal cases tests the easy 80% and ignores the 20% that
actually breaks agents.*

### Issue 3 — Missing failure-mode coverage / no safety metric
**Where:** the Metrics table has correctness (accuracy) and quality (helpfulness) — but **no safety
metric at all.**
**The tell:** a support bot can leak another user's account details, hallucinate a refund policy,
or give dangerous account-recovery steps. None of that is measured. There's no zero-tolerance bar.
**Teaching point:** *every user-facing agent needs a safety metric with zero tolerance. Its absence
is the most dangerous gap in any eval report.*

### Issue 4 — Vague pass criteria (no number, no bar)
**Where:** the Conclusion — "performs well and is ready to ship."
**The tell:** nowhere does the report state the pass bar *before* measuring. Ready compared to what?
98% — is that above or below the line they set? There's no line. The numbers are presented, then a
ship decision is asserted, with no stated threshold connecting them.
**Teaching point:** *a pass bar is decided before you run the eval, and it's a number. "Performs well"
is a vibe, not a bar.*

### BONUS — A whole modality was never evaluated
**Where:** "What we tested" — *"we graded the **text** of the answer."*
**The tell:** Aria is a **voice** assistant. The eval only scored the written text. It never checked
the audio: was the voice intelligible? the right language/accent? a reasonable speaking pace? any
dead-air or cut-off? For a voice product, the audio IS the product — and it was completely unmeasured.
**Teaching point:** *match the eval to the modality. A voice agent graded only on text has an
unmeasured half. This is exactly the multimodal "weakest link" lesson — the unscored modality is
where it will fail.*

---
**Debrief framing:** the report isn't lying — every number in it may be true. It's *incomplete in
ways that hide risk*. That's what most real eval reports look like: confident, numeric, and quietly
missing the things that matter. A PM who can spot these four-plus-one is the difference between a
safe ship and a silent failure.
