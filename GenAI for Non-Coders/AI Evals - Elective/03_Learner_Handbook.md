# AI Evals — Handbook · *Verify first, Trust second*

**The keepsake reference for the elective.** Everything from the room is here, in full — plus the depth we only sampled on the slides. Keep this. It's built to be the one page you reopen the next time someone hands you an AI feature and asks "is it good enough to ship?"

You'll leave able to do two things: **create** an eval for an agent you own (build it from scratch), and **judge** an eval someone hands you. This handbook serves both.

---

## How this handbook is laid out

1. **The 5 words** — the vocabulary the whole field runs on.
2. **The qualifier** — does this agent even need an eval?
3. **Evaluating text, in depth** — the hardest modality, all three challenges in full.
4. **The prompts** — the framework as copy-ready LLM prompts (build + judge). *(Steal these.)*
5. **The Modality Metrics Reference** — the one-stop table: what to measure for text, audio, image, video. *(This is the part to bookmark.)*
6. **Evaluating a multimodal agent** — the finale, with the math.
7. **The Eval Plan template** — your build sheet (Deliverable 1).
8. **The critique checklist** — your judge sheet (Deliverable 2).
9. **This week** — what to actually do next.

---

# 1 · The 5 words

Every eval, for any kind of AI, is built from these five. If you can name all five, you can hold your own in any eval conversation.

> **To eval an agent you need a *golden set*, a *metric*, a *judge*, a *pass bar*, and a list of *failure modes*.**

### Golden set — *the questions you already know the right answer to*
A small, hand-picked set of inputs where you know what good looks like — written **before** you ship. Not "expected exact output" (AI outputs are fuzzy) but **expected behavior**.
- **Takeaway:** 10 hand-picked cases beat 1,000 random ones. Include the normal, the weird, and the hostile.
- **Anti-pattern:** *"We'll just watch live traffic."* That gives you no baseline and nothing to compare against.

### Metric — *what you're actually measuring*
The specific thing you score. Metrics come in shapes: **binary** (yes/no) vs **scored** (1–5), **one-shot** (per output) vs **aggregate** (across the set).
- **Takeaway:** one metric is never enough. Pick **three** — one for **correctness**, one for **quality**, one for **safety**.
- **Anti-pattern:** a single "accuracy" number on an open-ended output. It almost always hides more than it shows.

### Judge — *who decides whether the answer was good*
Three kinds, each with a cost:

| Judge | Cost | Fast? | Best for | Fails at |
|---|---|---|---|---|
| **Human** | High | No | Subjective calls, safety, taste | Scale — you can't watch 10,000 outputs |
| **Code** | ~Free | Yes | Structured/checkable outputs (format, length, a number, a banned word) | Anything open-ended or subjective |
| **LLM-as-judge** | Low | Yes | Open-ended quality at scale | Bias — it's lenient, verbose-loving, and can be gamed |

- **Takeaway:** LLM-as-judge is a *junior reviewer*. Useful, cheap, fast — and you **calibrate it against a human** before you trust its numbers.
- **Anti-pattern:** *"The LLM said the LLM did great."* Self-evaluation bias is real.

### Pass bar — *the number above which you ship*
The threshold, decided **before** you measure. It is almost never 100%.
- **Takeaway:** different metrics deserve different bars. **Safety = zero tolerance.** **Quality = good-enough.** Be explicit about which is which.
- **Anti-pattern:** *"We'll ship when it's better."* Better than what? By how much? A pass bar is a number.

### Failure modes — *the specific ways THIS agent breaks*
The named list of how it goes wrong: hallucinates a date, refuses a normal request, leaks personal info, drifts off-brand, answers in the wrong language.
- **Takeaway:** you can't test for a failure you haven't named. The **first** eval run exists to *discover* failure modes, not to score them.
- **Anti-pattern:** treating "the eval failed" as one fact. *How* it failed is the actual signal.

> **The Eval Stack (memorize this picture):** failure modes → metrics → pass bar → judge → golden set. The golden set is the exam; the metric is the grading scheme; the judge is the examiner; the pass bar is the cutoff; failure modes are the wrong answers you already know to look for.

---

# 2 · Does this agent even need an eval?

Not everything earns the cost of an eval suite. Run the **4-question qualifier**:

| # | Question | |
|---|---|---|
| 1 | Is it **user-facing**? | |
| 2 | Is the **cost of being wrong** high? | |
| 3 | Is the output **open-ended** (vs a closed set you can spot-check)? | |
| 4 | Will it **scale past you** (you can't eyeball every output)? | |

**Two or more "yes" → build an eval.**

- **Obvious yes:** a customer-facing support bot that answers in its own words, all day, to thousands of users. (4/4.)
- **Obvious no:** a one-off internal script that reformats a spreadsheet you check by hand each time. (0–1/4 — just look at it.)
- **Borderline:** an internal meeting-notes summarizer. Not user-facing, but open-ended and scaling. (2/4 → yes, a light eval.)

The qualifier protects you from both mistakes: over-engineering an eval for something trivial, and shipping something high-stakes with no eval at all.

---

# 3 · Evaluating text, in depth

Text is the **hardest** modality to grade, because there is usually no single right answer and a wrong answer can be perfectly fluent. This section goes deep — three challenges, all the way down.

## 3a · Fluent ≠ correct (the core problem)

Read these two replies from a real-estate email agent to the same question — *"Can I break my lease early?"*

- **Reply A:** "Yes! You can cancel anytime within 30 days, no penalty." *(Fluent. Confident. Invented. There is no such policy — this is a lawsuit.)*
- **Reply B:** "Early termination depends on your specific lease. I've flagged this for a human agent who can check your contract." *(Less exciting. Correct.)*

You **cannot** catch this by reading — both sound great. This is why text needs real evals, not a skim.

## 3b · The judge ladder — how to grade text, rung by rung

When there's no single right answer, you climb a ladder of judging methods. Each rung costs more and catches more.

| Rung | Method | What it is | Good for | What it misses | Cost |
|---|---|---|---|---|---|
| 1 | **Exact match** | Output must equal the expected string | Classification, yes/no, extraction ("what's the order number?") | Anything open-ended — "Sure!" ≠ "Yes" but both are right | ~Free |
| 2 | **Semantic similarity** | Embeddings: is the meaning close to a reference answer? | Paraphrase-tolerant correctness ("did it say roughly the right thing?") | Subtle but critical differences — "you may" vs "you may not" score as very similar | Low |
| 3 | **LLM-as-judge + rubric** | An LLM scores the output against a written rubric | Open-ended quality, tone, faithfulness, helpfulness — the only thing that scales here | Bias and inconsistency unless calibrated against a human | Low–medium |

**When to use which:** if your output is a closed value, stay on rung 1 — it's free and exact. The moment the output is a sentence someone *reads*, you're on rung 3, with rung 2 as a cheap pre-filter. Most PM-owned text agents live on rung 3.

## 3c · Faithfulness — making "is it grounded?" measurable

"Hallucination" sounds vague. You make it concrete by checking **faithfulness**: does every claim in the answer trace back to a real source?

**How it's done (the PM version):**
1. Take the answer and **decompose it into individual claims.** ("You can cancel anytime" / "within 30 days" / "no penalty" = three claims.)
2. For each claim, ask: **is this supported by the source material** (the lease, the policy doc, the knowledge base)?
3. **Faithfulness score** = supported claims ÷ total claims. One unsupported claim on a legal answer can be a zero-tolerance fail.

**Why the golden set matters here:** the only way to know a claim is *wrong* is to have cases where you already know the right answer. A golden set with known answers is your one real defense against confident nonsense.

> Tie-in: this is exactly the email agent's worst failure modes — "invents a policy" and "leaks personal info." Both are faithfulness failures. Both are invisible to a fluent-text skim.

## 3d · Rubric craft — turning "good" into a number

An LLM judge is only as good as the rubric you hand it. The skill is **decomposing a vague quality into scorable sub-criteria.**

**Vague:** "Is the reply on-brand?" → an LLM will give you a mushy 4/5 with no reasoning.

**Decomposed rubric (steal this shape):**
> Score the reply 1–5 on **brand voice**, where:
> - **5** = warm, concise, uses "we" not "I", no jargon, ends with a clear next step
> - **3** = clear and correct but generic; could be any company
> - **1** = cold, rambling, or off-tone (sales-y, robotic, or overly casual)
> Give the score and one sentence of reasoning citing the specific words that earned it.

The anchors (what a 5 vs a 3 vs a 1 looks like) are what make the score consistent. **This is the exact skill you use on your own agent in the Eval Plan.**

---

# 4 · The prompts — the framework, as copy-ready LLM prompts

The methods above (the judge ladder, faithfulness, rubric craft, the critique checklist) become real when you hand them to an LLM as a prompt. These are the actual prompts that run the framework — three for **building** an eval, one for **judging** one. Copy them, swap the `‹bracketed›` parts for your own, and you have a working eval harness with no code.

> **A note on all four:** an LLM scoring its own kind of work is a *junior reviewer*, not an oracle. Run each prompt at **temperature 0** for repeatability, and **calibrate it** — score 5–10 cases by hand first, run the same cases through the prompt, and only trust it where it agrees with you within ~1 point. Where it doesn't, fix the rubric, not the score.

## 4a · BUILD — the LLM-as-judge prompt (scores quality against a rubric)

The workhorse. This is how you grade open-ended text at scale (rung 3 of the judge ladder). The whole skill is in the **rubric** — vague rubric, useless scores; anchored rubric, reliable scores.

```text
SYSTEM:
You are a strict, consistent evaluator for ‹the agent's job, e.g. "a real-estate
customer-support email assistant"›. You score one output at a time against the
rubric below. Be specific and harsh — bland praise is useless. Output JSON only.

USER:
Score this output on a 1–5 scale for ‹the quality, e.g. "brand voice"›.

RUBRIC (anchor every point — this is what makes you consistent):
  5 = ‹what a perfect answer looks like — concrete, e.g. "warm, concise, uses
       'we' not 'I', no jargon, ends with a clear next step"›
  3 = ‹what a mediocre-but-acceptable answer looks like, e.g. "clear and correct
       but generic; could be any company"›
  1 = ‹what a failing answer looks like, e.g. "cold, rambling, or off-tone"›

INPUT (what the user asked):
‹the golden-set input›

OUTPUT (what the agent produced):
‹the agent's answer›

Return JSON only:
{ "score": <1-5>, "reason": "<one sentence citing the specific words that earned the score>" }
```

**Why it works:** the anchors pin the scale so two runs agree. The forced `reason` citing specific words stops the model from hand-waving a 4/5. The JSON shape makes it machine-aggregatable across your whole golden set.

## 4b · BUILD — the faithfulness / hallucination prompt (is every claim grounded?)

Use this for any agent that answers from a source (a policy doc, a knowledge base, a contract). It turns "did it hallucinate?" into a number.

```text
SYSTEM:
You are a fact-checker. You will be given a SOURCE and an ANSWER. Your job is to
break the ANSWER into individual factual claims and check each one against the
SOURCE only. Do not use outside knowledge. Output JSON only.

USER:
SOURCE (the only ground truth allowed):
‹paste the document / policy / retrieved context the agent was supposed to use›

ANSWER (what the agent said):
‹the agent's output›

Steps:
1. Split the ANSWER into atomic claims (one fact each).
2. For each claim, label it: "supported" (the SOURCE backs it),
   "unsupported" (the SOURCE doesn't mention it), or
   "contradicted" (the SOURCE says otherwise).

Return JSON only:
{
  "claims": [ { "claim": "<text>", "verdict": "supported|unsupported|contradicted" } ],
  "faithfulness": <supported ÷ total, 0.0-1.0>,
  "any_contradiction": <true|false>
}
```

**Pass-bar tip:** for a high-stakes answer (legal, medical, financial), treat `any_contradiction = true` OR `faithfulness < 1.0` as a **zero-tolerance fail** — one invented claim is one too many.

## 4c · BUILD — the failure-mode discovery prompt (find what breaks before you score it)

Run this on a batch of v0 outputs *before* you write your metrics. It surfaces the failure modes you didn't think to look for — the ones that become your watch list.

```text
SYSTEM:
You are a red-teamer reviewing outputs from ‹the agent's job›. You are looking
for patterns of failure, not scoring individual answers. Be concrete.

USER:
Here are ‹N› real outputs from the agent:
‹paste 10–20 outputs, ideally including weird and hostile inputs›

Identify the recurring ways this agent goes wrong. For each failure mode:
- name it in 2–4 words (e.g. "invents a policy", "leaks personal info", "too formal")
- say how many of the ‹N› outputs show it
- give one verbatim example

Return a ranked list, most frequent first. Then name the ONE failure mode that
would be most damaging in production, even if it's rare.
```

**Why it's first, not last:** you can't write a metric for a failure you haven't named. This prompt is the discovery run — its output becomes the failure-mode list in your Eval Plan (§7) and the safety metric you'd otherwise have missed.

## 4d · JUDGE — the eval-report critique prompt (turn the checklist into a prompt)

The mirror image: feed someone else's eval report to an LLM and have it run the §8 critique checklist for you. Useful as a first-pass before your own read — it never gets tired, and it catches the obvious gaps.

```text
SYSTEM:
You are a skeptical head of product reviewing an eval report before signing off
on shipping an AI feature. Assume the report is trying to look good. Your job is
to find what's missing or gamed. Be specific and cite the report.

USER:
Here is the eval report:
‹paste the report›

Check it against these six questions and answer each with a finding:
1. Golden set — is it real and hand-picked, or just live traffic?
2. Edge + hostile cases — present, or all happy-path?
3. Metrics — does it cover correctness AND quality AND safety? (A missing safety metric is the biggest red flag.)
4. Headline number — "X% of what?" Is it measured on the easy cases only?
5. Pass bar — is there a stated number, set before measuring? Or just "performs well"?
6. Modality coverage — for a voice/image/video agent, did they evaluate that modality, or only the text?

Return: a verdict (SHIP / DON'T SHIP / NOT ENOUGH INFO), then the 6 findings,
then the single most dangerous gap.
```

**Why a human still reads it after:** the LLM catches the structural gaps fast, but it can't know your business stakes — whether *this* failure mode is the one that ends a customer relationship. The prompt gets you 80% of the way; you bring the judgment.

---

# 5 · The Modality Metrics Reference

**The one-stop table.** What to measure for which modality, what "good" looks like, who judges it, and — the column that makes you dangerous in a review — **what each metric misses.**

> ⚠️ **The "typical good" numbers below are placeholders** (`‹BENCH-2026-06-11›`) being replaced with sourced figures. Treat the *shape* as final and the *numbers* as provisional until your facilitator confirms the swap.

## Text

| Metric | What it measures | Typical "good" | Who judges | What it MISSES |
|---|---|---|---|---|
| **Exact match** | Output equals the expected value | 100% on closed tasks `‹BENCH-2026-06-11›` | code | Everything open-ended — penalizes correct paraphrases |
| **Semantic similarity** | Meaning is close to a reference answer | > ~0.80 cosine `‹BENCH-2026-06-11›` | code (embeddings) | Critical small flips — "may" vs "may not" score as similar |
| **Faithfulness / groundedness** | Every claim traces to a source | > ~0.95 `‹BENCH-2026-06-11›` | LLM + human spot-check | A fluent answer that's confidently unsupported |
| **LLM-judge rubric score** | Quality/tone against a rubric | ≥ 4 / 5 `‹BENCH-2026-06-11›` | LLM (calibrated) | Judge bias — leniency, verbosity preference |
| **Toxicity / PII leak** | Harmful content or leaked personal data | 0 incidents (zero-tolerance) | code + human | Subtle leaks code misses; needs human review |

## Audio

| Metric | What it measures | Typical "good" | Who judges | What it MISSES |
|---|---|---|---|---|
| **WER (Word Error Rate)** | Transcription accuracy vs the intended script | < ~10% `‹BENCH-2026-06-11›` | code (ASR/whisper) | **Meaning** — a low WER can still be a nonsense sentence |
| **MOS / naturalness** | Does the voice sound human and pleasant? | > ~4.0 / 5 `‹BENCH-2026-06-11›` | human (or model proxy) | Correctness — a lovely voice reading wrong info |
| **Voice duration ratio** | Actual length vs expected for the script | ~0.9–1.1 `‹BENCH-2026-06-11›` | code | Whether the content was any good |
| **Max silence gap** | Longest dead-air stretch | < ~1.5s `‹BENCH-2026-06-11›` | code | Awkward pacing that's under the threshold |
| **Speaker consistency** | Same voice throughout | pass/fail | code (speaker embeddings) | Tone shifts within the same voice |
| **Latency** | Time to first audio | < ~1s `‹BENCH-2026-06-11›` | code | Quality of what's said once it starts |

## Image

| Metric | What it measures | Typical "good" | Who judges | What it MISSES |
|---|---|---|---|---|
| **CLIPScore** | Image matches the text prompt | > ~0.30 `‹BENCH-2026-06-11›` | model | Rewards generic matches — can miss that the **brand style** is wrong |
| **Aesthetic / quality score** | Is it well-composed, not muddy? | ≥ 4 / 5 `‹BENCH-2026-06-11›` | VLM (calibrated) | Subjective taste; brand fit |
| **Face / safety detection** | Unwanted faces, unsafe content | 0 incidents (zero-tolerance) | code + VLM | Context — a fine image in the wrong place |
| **OCR legibility** | Text rendered in the image is readable | > ~0.95 `‹BENCH-2026-06-11›` | code (OCR) | Whether the text is the *right* text |
| **Style adherence** | Matches the required house style | ≥ 4 / 5 `‹BENCH-2026-06-11›` | VLM (calibrated) | Drift the judge wasn't anchored on |

## Video

*All of the image + audio metrics, plus the temporal ones:*

| Metric | What it measures | Typical "good" | Who judges | What it MISSES |
|---|---|---|---|---|
| **Temporal coherence** | Frames flow; no flicker/morphing | ≥ 4 / 5 `‹BENCH-2026-06-11›` | VLM | Whether the story makes sense |
| **Cut-honored rate** | Edits land where intended | > ~0.80 `‹BENCH-2026-06-11›` | code (perceptual hash) | Whether the cut was a *good* cut |
| **A/V sync drift** | Audio aligned to video | < ~100ms `‹BENCH-2026-06-11›` | code | Cross-modal *meaning* mismatch (see below) |
| **Hook / retention proxy** | Does the opening earn a watch? | ≥ 3 / 5 `‹BENCH-2026-06-11›` | VLM + (later) real watch-time | Everything after the first 3 seconds |

## Multimodal (the agent that mixes them)

| Metric | What it measures | Typical "good" | Who judges | What it MISSES |
|---|---|---|---|---|
| **Cross-modal coherence** | Do the modalities agree? (voice says "lanterns," image shows lanterns) | ≥ 4 / 5 `‹BENCH-2026-06-11›` | VLM + human | Each part can be fine alone while the pairing fails |
| **Weakest-link aggregate** | The minimum across all modality scores | every stage ≥ its bar | code (rolls up the above) | Hides which stage broke unless you keep the per-stage scores |
| **Stage-gate pass rate** | Fraction of pipeline stages that passed | all gates pass | code | A passing average can still hide one fatal stage |

> **The "what it misses" column is the most important one.** It's the question you ask in a review: *"Great, your WER is 6% — but did you check the audio actually meant anything?"*

---

# 6 · Evaluating a multimodal agent (the finale)

A multimodal agent produces text **and** audio **and** image/video in one output. Three ideas decide whether it's any good. (All three are provable on one real, failing project — an AI that auto-generates a daily travel Reel: script, voiceover, images, captions, no human in the loop. Its real numbers below are marked `‹STAT-2026-06-11›`, pending a fresh run.)

## Idea 1 — Compounding error (why you eval every stage)
Chain the stages — text → audio → image → video. Even if each stage is **90% good**, the end-to-end output is `0.9 × 0.9 × 0.9 × 0.9 ≈ 0.66`. **Two times in three, something's off.** Your agent can be "pretty good at everything" and still fail most of the time. → **Eval every stage, not just the final video.**

## Idea 2 — The weakest link (a multimodal output is only as good as its worst part)
On the real Reel agent, the stage scores were:
- Audio timing: **~0.98** `‹STAT-2026-06-11›` (great)
- Composition: **4–5 / 5** `‹STAT-2026-06-11›` (great)
- **Hook strength: 1 / 5 — on all five reels** `‹STAT-2026-06-11›` (floor)

The great parts can't save the broken hook. The eval caught a **systemic** failure the creator had watched for weeks and thought was fine. → **That's the whole point of an eval: it catches your blind spot.** And stage-by-stage scoring is how you find *which* link broke.

## Idea 3 — Cross-modal coherence (some failures live *between* the parts)
A real note from that agent's golden set: *"the voice talks about lanterns but the image is of dusk without any lanterns."* The audio was fine alone. The image was fine alone. The **pairing** failed. → **Eval the relationships, not just the parts.**

## And: calibrate the judge
That eval uses an AI judge to score the hook. So how do you trust the judge? Every run, it **re-scores 5 hand-scored reels and checks it still agrees with the human within 1 point.** If the AI judge drifts from the human, the run flags itself. → **Calibrate your judge against a human before you trust its numbers.**

---

# 7 · The Eval Plan (your build sheet — Deliverable 1)

Fill this for an agent you own. *(Also handed out as a printed sheet in class.)*

**1. The agent** — what it does (one line) · job-to-be-done · modality(ies): ☐ text ☐ audio ☐ image ☐ video ☐ multimodal

**2. Qualifier** — user-facing? · high cost of wrong? · open-ended? · scales past you?  → **2+ = build.** Score __/4

**3. Golden set** — 5–10 cases you know the answer to. **Force in a weird one and a hostile one.** (input → expected behavior)

**4. Metrics — pick 3:** one **correctness**, one **quality**, one **safety**. *(Audio/image/video? Use §5 above.)*

**5. Judge per metric** — human / code / LLM, and *why*. If LLM: how will you calibrate it against a human?

**6. Pass bar per metric** — a number. Mark which one is **zero-tolerance** (usually safety).

**7. Top failure modes** — name at least 3. The specific ways THIS agent breaks.

---

# 8 · The critique checklist (your judge sheet — Deliverable 2)

Run this against any eval report someone hands you. Each "no" is a hole.

- [ ] **Golden set is real** — hand-picked known answers, not just live traffic?
- [ ] **Edge + hostile cases** — or is it all happy-path? (A set of only normal cases tests the easy 80%.)
- [ ] **All three kinds of metric** — correctness *and* quality *and* **safety**? (A missing safety metric is the most dangerous gap.)
- [ ] **The headline number is honest** — "98% of *what*?" Is it 98% of easy cases?
- [ ] **A stated pass bar** — a number, set *before* measuring? Or just "performs well"?
- [ ] **Failure modes covered** — are the known ways it breaks actually measured?
- [ ] **Judge is trustworthy** — if LLM-judged, was it calibrated against a human?
- [ ] **Every modality checked** — for a voice/image/video agent, did they score the audio/visual, or only the text?

> Most real eval reports aren't lying. They're *incomplete in ways that hide risk* — confident, numeric, and quietly missing the thing that matters. Spotting the gap is the PM's job.

---

# 9 · This week

One agent. One eval. This week.

1. **Pick one agent you own.** Fill the Eval Plan (§7) for it — even just the golden set and the three metrics.
2. **Finish the critique** you started in class. Mark up the planted-issue report; check it against the answer key when it's shared. (There were four issues plus one bonus: a whole modality they never checked.)

You don't need a test harness or an engineer to start. You need a golden set, three metrics, and a pass bar. That's the whole beginning.

---

*Field notes by **Shantanu Chandra** · [linkedin.com/in/chandrashantanu](https://linkedin.com/in/chandrashantanu)*
*Growth-X · A Field Guide to Generative AI*
