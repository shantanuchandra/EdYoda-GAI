# S3 Decks · Patch Plan for ChatGPT-only Mode

**Purpose:** convert `learner_deck.html` and `presenter_deck.html` so every Agent Builder hands-on step is replaced with a ChatGPT-executable equivalent. The session's pedagogy, slide count, pairing symmetry, and visual design stay intact. Only the *what-students-do* on the build slides changes.

**Files affected:**
- [`learner_deck.html`](learner_deck.html) — 23 slides (paper editorial)
- [`presenter_deck.html`](presenter_deck.html) — 23 slides (dark console)

**Hard rules (do NOT break these):**
1. **`slides.length` must stay at 23 in BOTH decks.** The pairing logic in `show()` + the storage listener depends on identical indices.
2. **Tags must stay aligned per slide.** Slide N in presenter has a `tag:` value (`title`, `demo`, `exercise`, `break`); slide N in learner has a matching CSS class on its `<div class="slide ...">` (`exercise-slide`, `break-slide`, or none). Do not change tag/class mapping.
3. **`localStorage.setItem` in presenter `show()` and the `storage` listener in learner — do not touch.**
4. **Do not introduce new fonts, palette tokens, or component classes.** Reuse existing.
5. **The break slide (slide 17) is untouched.** Timer logic depends on its exact structure.
6. **Colophon on both decks' final slide (slide 23)** — see Section D below.

---

## A · Slide-by-slide change table

| # | Tag / class | Current build/demo content | New ChatGPT-mode content | Notes |
|---|---|---|---|---|
| 1 | `title` | Pre-start cover | **No change.** | Visual cover only. |
| 2 | `demo` | "Show us yours · peer agent share" — assumes learners have a published Builder agent from S2 | **Change to:** "Show us yours · peer prompt share — paste your weakest prompt of the week into Zoom chat. We'll roast one." Removes Builder-share dependency. | Presenter `say:` field needs to be rewritten to no longer ask for agent share links. |
| 3 | `demo` | **Cold open · bakery returns · v1 (Builder agent) cites a fake source** — facilitator runs their v1 agent in Builder | **Change to:** **Cold open · bakery returns · weak ChatGPT prompt cites a fake source.** Facilitator pastes a generic campaign-planning prompt into ChatGPT live, asks for benchmarks, demonstrates the fabricated source. | Critical narrative slide — preserves the bakery hinge. Only the live tool changes from Builder→ChatGPT. |
| 4 | `title` | "Today's arc · norms · the One Rule" | **Add a row** to the norms table: `Today's tool · ChatGPT (free is fine). Builder is offline for us — every move translates.` Otherwise unchanged. | Small additive change. |
| 5 | `demo` | "Sprint 1 · RCTFC anatomy · live ChatGPT demo" | **No change.** Already ChatGPT-based. | This slide was already ChatGPT-native — good. |
| 6 | `title` | "Sprint 2 · System vs User · the handbook layer" — explains where prompts live in Builder | **Reframe:** keep the "two-layer" mental model, but add a callout: *"In ChatGPT today, we paste the full system-prompt stack as message 1 of a fresh chat. Then the user query as message 2. Same two layers, served from a single chat."* | Adds the ChatGPT workaround explicitly. Both decks. |
| 7 | `title` | Sprint 3 · Four techniques · overview | **No change.** Tool-agnostic content. | — |
| 8 | `title` | Rung 01 · Zero-shot | **No change.** | — |
| 9 | `title` | Rung 02 · Few-shot | **No change.** | — |
| 10 | `title` | Rung 03 · Chain-of-Thought | **No change.** | — |
| 11 | `title` | Rung 04 · Tree-of-Thought | **No change.** | — |
| 12 | `title` | Sprint 4 · Three failure modes | **No change.** Tool-agnostic. | — |
| 13 | `title` | Sprint 5 · The Iteration Flywheel | **No change.** | — |
| 14 | `exercise` / `.exercise-slide` | Exercise 1 · Paper rewrite in ChatGPT | **No change.** Already ChatGPT-only. | The cleanest existing slide. |
| 15 | `exercise` / `.exercise-slide` | **Build A · Node 2 RCTFC rewrite** — instructs learners to open Configure tab, edit Node 2, Publish | **Rewrite to:** **Build A · RCTFC elements extractor — in ChatGPT.** Instructions: (1) fresh ChatGPT chat, (2) paste the Build A prompt from workbook with your CONTEXT line filled in, (3) send bakery brief as message 2, (4) paste the 5 elements in Zoom chat. | **Largest content change.** See Section B for full slide HTML. |
| 16 | `title` | Pre-break anchor · thumbs check | **Tiny change:** "Thumbs up if your 5-element list landed clean in ChatGPT" (was: "if Node 2 republished"). | — |
| 17 | `break` / `.break-slide` | Hard break · 10 min | **No change.** Timer logic untouched. | — |
| 18 | `exercise` / `.exercise-slide` | **Build B · Node 3 few-shot scoring** — instructs Builder edit | **Rewrite to:** **Build B · Few-shot scoring — in ChatGPT.** Fresh chat, paste Build B prompt (Build A + EXAMPLES + scoring task), send track-specific second query, paste branch scores in Zoom chat. | Mirrors Build A structure. |
| 19 | `exercise` / `.exercise-slide` | **Build C · Node 3 chain-of-thought** — instructs Builder edit | **Rewrite to:** **Build C · Chain-of-thought — in ChatGPT.** Fresh chat, paste Build C prompt (Build B + REASONING task), send universal bakery query, count reasoning paragraphs. | — |
| 20 | `exercise` / `.exercise-slide` | **Build D · Node 3 tree-of-thought · climax** — instructs Builder edit | **Rewrite to:** **Build D · Tree-of-thought — in ChatGPT.** Fresh chat, paste Build D prompt (Build C's reasoning *replaced* by BRANCHES + RECONCILE), send universal bakery query, paste 3 branch scores. | — |
| 21 | `exercise` / `.exercise-slide` | Challenge · red-team your own agent | **Reframe:** "red-team your own *prompt*." Same probe payloads — they paste as the brief in the same ChatGPT chat where Build D is loaded. Patch by starting a fresh chat with the CONSTRAINTS line added. | Probe content unchanged. |
| 22 | `title` | Six dimensions · iteration log close · verbal go-around | **Tiny change:** "final v2 prompt" instead of "final v2 system prompts" (no longer node-by-node). | — |
| 23 | `title` | Course thread · take-home · goodbye | **Add colophon** (see Section D). Update the close line: "*Same model. Six engineering moves. No code.*" (was: "*Same agent shape. Six edits. No code.*") | — |

---

## B · Reference HTML — slides 15, 18, 19, 20 (the four "Build" slides)

Use these as the new bodies for the four build slides. Mirror the existing visual structure of each deck (paper editorial classes for learner, dark console classes for presenter); only the textual content and the "what learners do" instructions change.

### Slide 15 — Build A (learner deck body)

```html
<div class="slide exercise-slide">
  <div class="slide-body">
    <div class="kicker">Build A · 0:40 – 0:51 · 11 min</div>
    <h2>RCTFC elements extractor</h2>
    <p class="lede">Assemble your first full RCTFC prompt in ChatGPT. Send the bakery brief. Read the clean 5-element output.</p>

    <ol class="do-list">
      <li>Open a <strong>fresh ChatGPT chat</strong> (+ New chat).</li>
      <li>Open the <strong>Build A</strong> section of your workbook. Fill in your track's CONTEXT line.</li>
      <li>Paste the full RCTFC prompt as <strong>message 1</strong>. Send.</li>
      <li>Paste the <strong>universal bakery query</strong> as message 2. Send.</li>
      <li>Read the output — RESEARCH NOTES + ELEMENTS (JSON array of 5).</li>
      <li>Paste your <strong>5 elements</strong> in Zoom chat.</li>
    </ol>

    <div class="callout">
      <strong>If the output is prose, not JSON:</strong> your FORMAT slot is too soft. Add "JSON array of exactly 5 strings, ≤6 words each. No preamble." and re-run.
    </div>
  </div>
</div>
```

### Slide 18 — Build B (learner deck body)

```html
<div class="slide exercise-slide">
  <div class="slide-body">
    <div class="kicker">Build B · 1:08 – 1:16 · 8 min</div>
    <h2>Few-shot scoring</h2>
    <p class="lede">Build A returned clean structure. Now add few-shot examples that teach the scoring shape.</p>

    <ol class="do-list">
      <li>Open a <strong>fresh ChatGPT chat.</strong></li>
      <li>Workbook → Build B section. Build B prompt = Build A + EXAMPLES + scoring task.</li>
      <li>Paste your track's <strong>3 few-shot examples</strong> under EXAMPLES.</li>
      <li>Paste the full Build B prompt as message 1. Send.</li>
      <li>Send your <strong>track-specific second query</strong> as message 2.</li>
      <li>Read the response: same RESEARCH NOTES + ELEMENTS, <strong>plus</strong> Audience / Budget / Brand scores + composite.</li>
      <li>Paste your <strong>composite + 3 branch scores</strong> in Zoom chat.</li>
    </ol>
  </div>
</div>
```

### Slide 19 — Build C (learner deck body)

```html
<div class="slide exercise-slide">
  <div class="slide-body">
    <div class="kicker">Build C · 1:16 – 1:26 · 10 min</div>
    <h2>Chain-of-thought reasoning</h2>
    <p class="lede">Build B scored — but the scores have no working attached. Make the prompt show its reasoning.</p>

    <ol class="do-list">
      <li>Open a <strong>fresh ChatGPT chat.</strong></li>
      <li>Workbook → Build C section. Build C prompt = Build B + REASONING task inserted before scoring.</li>
      <li>Paste the full Build C prompt as message 1.</li>
      <li>Send the <strong>universal bakery query</strong> as message 2.</li>
      <li>Read the response — REASONING (5+ short paragraphs) should now precede SCORING.</li>
      <li>Paste <strong>how many reasoning paragraphs</strong> the model produced in Zoom chat.</li>
    </ol>

    <div class="callout">
      <strong>You just made the model slow down.</strong> That's the whole point. Thinking out loud = auditable = trustable = shippable.
    </div>
  </div>
</div>
```

### Slide 20 — Build D (learner deck body)

```html
<div class="slide exercise-slide">
  <div class="slide-body">
    <div class="kicker">Build D · 1:26 – 1:38 · 12 min · climax</div>
    <h2>Tree-of-thought branching</h2>
    <p class="lede">Build C reasoned in a single chain. Replace it with three parallel branches + a reconciled composite.</p>

    <ol class="do-list">
      <li>Open a <strong>fresh ChatGPT chat.</strong></li>
      <li>Workbook → Build D section. Build D prompt = Build B + BRANCHES + RECONCILE (replacing Build C's REASONING).</li>
      <li>Paste the full Build D prompt as message 1.</li>
      <li>Send the <strong>universal bakery query</strong> as message 2.</li>
      <li>Read the response: 3 branch scores + 1-line reasoning each, composite (40/35/25 weighted), 1-sentence recommendation.</li>
      <li>Paste your <strong>3 branch scores</strong> in Zoom chat.</li>
    </ol>

    <div class="callout strong">
      Three branches. One pick. <em>Same model. Six engineering moves. No code.</em>
    </div>
  </div>
</div>
```

### Presenter-deck mirrors (slides 15, 18, 19, 20)

Each presenter slide has a `slides[]` data object with fields like `num`, `when`, `duration`, `tag`, `block`, `title`, `say`, `do`, `watch`, `bridge`. For each of the four build slides:

- **Keep**: `num`, `when`, `duration`, `tag: "exercise"`, `block` — unchanged.
- **Update**: `title` (e.g. "Build A · Node 2 RCTFC rewrite" → "Build A · RCTFC extractor in ChatGPT").
- **Update**: `say:` field — rewrite the spoken narration to refer to ChatGPT instead of Builder. See Section C below for verbatim replacement strings keyed to the facilitator script's matching block.
- **Update**: `do:` field — replace "Open Configure → Node N → Publish" steps with "Fresh chat → paste prompt → send brief" steps mirroring the learner-deck `do-list` above.
- **Update**: `watch:` field — what to watch for in chat (e.g. "5 elements landing" stays, "Publish thumbs" → "5-element paste").

---

## C · Verbatim `say:` field replacements (presenter deck)

Pull these from the rewritten facilitator script (`01_Facilitator_Script.md`) — every block's "what you say (italics)" is the source of truth. The presenter deck's `say:` field on each build slide should quote the matching block's opening narration, kept to 1–2 short sentences for the cockpit display.

**Slide 3 (Cold open · slide deck `say:`):**
> *"Quick story to start. Remember the bakery campaign from Session 1? This morning I asked ChatGPT to plan it with a generic prompt — and asked it to cite benchmarks. Watch."*

**Slide 4 (Today's arc):** add to the existing norms list line — *"Today's tool: ChatGPT, free is fine. Builder is offline for us — every move translates."*

**Slide 6 (Sprint 2):** append to existing `say:` — *"In ChatGPT we paste the full system-prompt stack as message 1 of a fresh chat. Same two layers, served from one chat."*

**Slide 15 (Build A `say:`):**
> *"Fresh ChatGPT chat. Paste the Build A RCTFC prompt as message 1, your track's CONTEXT filled in. Send the bakery brief as message 2. Five clean elements should land."*

**Slide 18 (Build B `say:`):**
> *"Fresh chat again. Build B prompt is Build A plus your track's three scoring examples plus a scoring task. Send your track's second query. Three branch scores + composite should land."*

**Slide 19 (Build C `say:`):**
> *"Fresh chat. Build C = Build B + a REASONING block before the scoring. Send the bakery query. The output should now show 5+ short paragraphs of working before the score."*

**Slide 20 (Build D `say:`):**
> *"Fresh chat. Build D replaces Build C's single reasoning chain with three parallel branches and a weighted reconciliation. Send the bakery query. Three branch scores + composite + recommendation."*

**Slide 21 (Challenge `say:`):**
> *"Two probes. Pick one. Paste the probe payload as the brief in your Build D chat. Observe. If you fail — start a fresh chat with the CONSTRAINTS patch added. Re-run."*

**Slide 23 (Close `say:`):** update the closing line — *"You came in with v1 that cited a fake source. You leave with v2 that doesn't. Same model. Six engineering moves. No code."*

---

## D · Colophon — both decks, slide 23

Per `[[edyoda_author_colophon]]` memory: every artifact ends with a Shantanu Chandra credit + LinkedIn.

**Learner deck (paper editorial, slide 23):** add at the bottom of the slide body, above the swipe indicator:

```html
<div class="colophon">
  <div class="by">
    Written &amp; facilitated by
    <span class="name">Shantanu Chandra</span>
    <span class="linkedin">linkedin.com/in/chandrashantanu</span>
  </div>
  <div class="course-mark">
    EdYoda<br>
    <span class="terra">GenAI &amp; AI Agents</span><br>
    for Non-Coders · S03
  </div>
</div>
```

Use the colophon CSS already proven in [`CoT_ToT_Exercise_Live_ChatGPT.html`](CoT_ToT_Exercise_Live_ChatGPT.html) — copy the `.colophon`, `.colophon .by`, `.colophon .name`, `.colophon .linkedin`, `.colophon .course-mark` rule set into the learner deck's `<style>` block.

**Presenter deck (dark console, slide 23):** add to the slide's `body:` rendered HTML. Use dark-mode color tokens — `var(--text)` for the name, `var(--accent)` (teal) for the LinkedIn URL, `var(--text-muted)` for the kicker.

```html
<div class="colophon dark">
  <div class="by">
    Written &amp; facilitated by
    <span class="name">Shantanu Chandra</span>
    <span class="linkedin">linkedin.com/in/chandrashantanu</span>
  </div>
  <div class="course-mark">
    EdYoda · <span class="accent">GenAI &amp; AI Agents</span><br>
    for Non-Coders · S03
  </div>
</div>
```

Mirror the rule set with dark-palette colors; same structural CSS.

---

## E · Verification checklist (run after applying patches)

Before considering the deck patches done:

1. [ ] Open `learner_deck.html` in browser. Walk all 23 slides via the keyboard arrows. No JS errors in console.
2. [ ] Open `presenter_deck.html` in a second tab. Walk all 23 slides. Confirm pairing — when you advance the presenter, the learner advances.
3. [ ] Slide 17 (break) — confirm the 10-min timer still fires on both decks.
4. [ ] Slides 15, 18, 19, 20 — confirm the new `do-list` reads cleanly and the visual hierarchy matches the existing `.exercise-slide` style.
5. [ ] Slide 23 — confirm colophon is visible on both decks and the LinkedIn URL uses the brand accent (terra on learner, teal on presenter).
6. [ ] Confirm `slides.length === 23` in the presenter deck's runtime (open console, type `slides.length`).
7. [ ] Confirm no slide references "Node 1 / Node 2 / Node 3" in the *learner* hands-on instructions on slides 15, 18, 19, 20. (Conceptual references in titles slides 6, 7 are fine — those explain the agent model.)

---

## F · What this patch does NOT do

- Does not delete the Node 1/2/3 conceptual frame. Slides that explain *what an agent is* still reference the 3-node pipeline — that's the conceptual model and it's correct. Only the hands-on instructions change tool.
- Does not change pairing storage keys, slide indices, or timer logic.
- Does not change palette, fonts, or any visual identity.
- Does not touch S2 or any other session's deck.

---

## G · Estimated work

Applying this patch is ~90 minutes of focused HTML editing — most of it on slides 15, 18, 19, 20 (the four build slides on both decks = 8 slide bodies), plus the colophon block on slide 23 of each deck (2 small additions), plus minor `say:`/norms-table edits on 4 other slides.

If you want me to execute this patch end-to-end in a follow-up session, hand me this document + the two deck files and I'll do it with full attention.

---

**Written by Shantanu Chandra · linkedin.com/in/chandrashantanu**
*EdYoda · GenAI & AI Agents for Non-Coders · Session 03*
