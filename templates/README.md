# EdYoda GenAI for Non-Coders — Templates

Drop-in scaffolds for any future session (Session 3 Prompt Engineering, Session 4, Session 5…). Every file in this folder is **already wired to the canonical design system** — dark/teal for cockpits, paper/terra for editorial. You will never have to re-derive a color, a font weight, or a layout primitive. Copy, fill placeholders, ship.

The design system itself is locked in: see `~/.claude/projects/-Users-shantanuchandra-Downloads-Personal-EdYoda---GAI/memory/edyoda_genai_design_system.md`. Session 1 is the source of truth. Session 2 mirrored it. These templates extract it for Session 3+.

---

## The 6 files in this folder

| File | Use for | Mode |
|---|---|---|
| `README.md` | This file. How to use the rest. | — |
| `01_Facilitator_Script.template.md` | The minute-by-minute facilitator run sheet | text |
| `02_Learner_Workbook.template.md` | The learner-facing markdown workbook | text |
| `presenter_deck.template.html` | The facilitator cockpit (dark/teal, JS-rendered) | dark |
| `learner_deck.template.html` | The editorial reading deck (paper/terra, static sections) | paper |
| `linkedin_carousel.template.html` | 10-slide 1080×1080 LinkedIn carousel — fundamentals-first thought leadership under the author's byline (NOT EdYoda-branded). Cover → thesis → mechanism → proof → receipt → generalise → 3-4 defences → CTA. | paper |

**Critical distinction (memorize this):**
- **Presenter deck = COCKPIT.** Dark, dense, screen-first, JS-driven, clock + timing badges + chat-watch contingencies. Built from a `slides` JS data array, not from hardcoded `<section>` markup.
- **Learner deck = READING ARTIFACT.** Paper, generous, contemplative, static `<section class="slide">` per slide, folio numbers + magazine running head. **Do not blur the two.**

---

## Quick start — making Session N from these templates

```bash
# 1. Make the session folder (use the EdYoda naming convention)
mkdir "Session 03 - Prompt Engineering Context Engineering for Agents"
cd    "Session 03 - Prompt Engineering Context Engineering for Agents"

# 2. Copy each template, dropping the `.template` infix
cp ../templates/01_Facilitator_Script.template.md   01_Facilitator_Script.md
cp ../templates/02_Learner_Workbook.template.md     02_Learner_Workbook.md
cp ../templates/presenter_deck.template.html        presenter_deck.html
cp ../templates/learner_deck.template.html          learner_deck.html
cp ../templates/linkedin_carousel.template.html     linkedin_carousel.html

# 3. Fill in placeholders (see token reference below)
#    Open each file, search for "{{", replace with real content.

# 4. Open every HTML in a browser to verify before sharing
open *.html
```

That's it. The CSS, the keyboard nav, the timer, the clock, the slide-rendering function, the noise overlay, the vignette, the folio numerals — all already in place.

---

## Placeholder token reference

Every placeholder uses double curly braces: `{{TOKEN_NAME}}`. Search for `{{` in any template to find them all.

### Top-level session metadata (used in nearly every file)

| Token | Description | Session 2 example |
|---|---|---|
| `{{SESSION_NUMBER}}` | Numeric, no padding | `2` |
| `{{SESSION_NUMBER_PADDED}}` | Two-digit, used in folio + running head | `02` |
| `{{SESSION_NUMBER_WORD}}` | English word, used in spine label | `Two` |
| `{{SESSION_TITLE}}` | Full session title | `Why Agents? The Case for Autonomous AI` |
| `{{SESSION_SUBTITLE}}` | One-sentence promise of what learner will be able to do | `By the end of this session, you'll identify chatbot gaps, classify business problems into AI patterns, quantify the cost of under-investing in agentic AI — and you'll build your first agent (no code).` |
| `{{SESSION_SUBTITLE_SHORT}}` | 1–3 words for learner-deck cover slide / carousel hero | `The Case for Agents` |
| `{{PUB_TITLE}}` | The magazine-style pub title in running heads | `A Field Guide to Generative AI` |
| `{{NEXT_SESSION_NUMBER}}` | The session after this one | `3` |
| `{{NEXT_SESSION_TITLE}}` | Title of the next session — look it up, do not infer | `Prompt Engineering & Context Engineering for Agents` |
| `{{TOTAL_SLIDES}}` | Used in folio `<sup>/40</sup>` style | `40` |

> **Course is 8 sessions total** (not 3). Full session list and "next session is X" reference in memory: `edyoda_course_curriculum.md`. Always look up `{{NEXT_SESSION_TITLE}}` rather than infer it from context.

### Facilitator script tokens

| Token | Description | Example |
|---|---|---|
| `{{AUDIENCE_DESCRIPTION}}` | One-paragraph audience profile | `Same room as Session 1 — mixed India + international; marketing/sales, finance/consulting, at least one doctor.` |
| `{{SESSION_SPINE}}` | 3–4 phase arc of the session | `Concept Sprint → Long Build → Pattern Debrief` |
| `{{HANDS_ON_PERCENT}}` / `{{HANDS_ON_MINUTES}}` | Activity-share metric | `58` / `70` |
| `{{BUILD_ARTIFACT}}` | One-line description of the walk-out deliverable | `Every learner walks out with a working AI Pattern Advisor agent, role-customized.` |
| `{{TOOLS_LIST}}` | All browser tabs the facilitator needs | `EdYoda Agent Builder (primary), n8n (referenced), ChatGPT / Claude / Gemini, demo agent, backup agents per track.` |
| `{{OPENING_HOOK_LINE}}` | The one-sentence visceral opener on the pre-class slide | `Last session you watched a chatbot fail 4 out of 6 steps. Today you build the thing that doesn't.` |
| `{{ONE_RULE}}` | The single load-bearing rule for the day | `You will not leave with notes. You will leave with a working agent.` |
| `{{BLOCK_N_NAME}}` / `{{BLOCK_N_RANGE}}` / `{{BLOCK_N_GOAL}}` | Per-block metadata; repeat for blocks 0–5 | `CONCEPT SPRINT` / `0:10 – 0:30` / `Plant the vocabulary fast.` |
| `{{BUILD_STEP_LETTER_1..5}}` | Steps named with LETTERS (A–E) for build sessions, NUMBERS (1–N) for concept sessions | `A`, `B`, `C`, `D`, `E` |
| `{{CONTINGENCY_*}}` | One per contingency case at the end of the script | see Session 2's contingency guide |
| `{{PRACTICE_RECOMMENDATION}}` | Self-contained dry-run plan for the day before | `Run the bakery prompt twice in ChatGPT. Build the demo agent end-to-end in the Builder. Practice the 4-Question Funnel speech aloud — it's the hardest transition.` |

### Workbook tokens

| Token | Description | Example |
|---|---|---|
| `{{WORKBOOK_HOOK_LINE}}` | Welcome-back line that calls back the prior session | `Welcome back. Last time you watched. This time you build.` |
| `{{LEARNER_DELIVERABLE}}` | The concrete artifact described from the learner POV | `a working AI Pattern Advisor agent, yours, customized to your job` |
| `{{TRACK_1..4_NAME}}` | Track names (industry verticals) | `Marketing/Sales`, `Finance/Consulting`, `Doctor/Healthcare`, `Generic` |
| `{{ARTIFACT_NOUN}}` | What learners call the thing they're building | `agent`, `prompt`, `workflow` |
| `{{STEP_LABEL_A..E}}` | Step labels referenced by the facilitator | `BUILD STEP A`, `BUILD STEP B`, … (or `EXERCISE 1`, `EXERCISE 2`, …) |
| `{{TRACK_N_STEP_X_STARTER}}` | The per-track starter content for each step | starter system prompts, scenarios, tool picks, memory seeds, goals |
| `{{REFERENCE_N_NAME}}` / `{{REFERENCE_N_BODY}}` | Cross-track reference sheets | `ACTION TOOL MENU`, `MEMORY SEEDS`, `MULTI-STEP GOAL TEMPLATES` |
| `{{TAKEHOME_PROMPT_1..2}}` | Specific take-home reflection prompts | `One process at your job where this would help.`, `One place where deploying it without guardrails would be dangerous.` |

### Presenter deck tokens (HTML)

The presenter deck is **JS-rendered from a `slides` array**. Each slide in the array is an object with this shape (see file comments for full schema):

```js
{
  num: 1,
  when: "0:00 – 0:02",        // displayed in time-pill
  duration: "2 min",
  tag: "title" | "demo" | "exercise" | "break",
  title: "...",
  say: "...",                 // .section.say block (warm)
  afterPause: "...",          // optional
  sayAfter: "...",            // optional followup
  doSteps: ["...", "..."],    // .section.do block (green)
  watch: "...",               // .section.watch block (hot)
  deeper: ["...", "..."],     // .section.deeper block (blue) — use if asked
  note: "...",                // .section.note block (purple) — sidebar
  bridge: "...",              // .section.bridge block (pink)
  prompt: "..."               // optional .prompt-box monospace block
}
```

Replace the three placeholder slides in the data array with the real deck. The template also includes `{{SLIDE_N_*}}` tokens inside each placeholder slide and a `const BREAK_SLIDE_INDEX = 0;` declaration near the top of the script — change `0` to the array index of your break slide so pressing `B` jumps to it.

### Learner deck tokens (HTML)

The learner deck is **static — one `<section class="slide">` per slide**. The template includes:

- A cover slide (`{{COVER_TITLE}}`, `{{COVER_BYLINE}}`)
- A standard content slide (`{{SLIDE_2_*}}`)
- A display/quote slide (`{{SLIDE_3_DISPLAY}}` with `{{DROP_CAP_LETTER}}`)
- An exercise slide variant (`{{EXERCISE_LETTER}}`, `{{EXERCISE_DURATION}}`, `{{EXERCISE_PROMPT}}` — oversized terra Fraunces letter A/B/C/D/E, paste-ready code block, timer pinned bottom-right, folio shifts to bottom-left)

Duplicate, rename, and fill the slide blocks to add more. The CSS already supports `.lede`, `.display`, `.mega`, `.prompt`, `.eyebrow` (+ `.cool` `.warn` `.danger` modifiers), `.terra`, `.marked`, `.drop`, `.grid.g-2`/`g-3`.

### Carousel tokens (HTML)

**Read [[linkedin_carousel_hook_research]] in memory BEFORE drafting the cover.** The cover is the only KPI that matters; the data is unambiguous (specific headlines drive ~3× swipe; ≤200 chars; no AI-feel openers; pick one archetype from contrarian / research / story-confession / specific-stakes).

The 10-slide carousel follows a fundamentals-first arc:

| # | Job | Token prefix |
|---|---|---|
| 1 | **Cover** — hook + SVG hero + sub-caption + headline + subhead | `HOOK_*`, `SVG_*`, `HERO_BOX_*`, `ISSUE_NUMBER`, `TOTAL_SLIDES` |
| 2 | **Thesis** — the one-line universal claim (pull-quote) | `S2_*` |
| 3 | **Mechanism** — numbered steps showing WHY (`.mechanism` component) | `S3_STEP_*`, `S3_HONEST_REFRAME` |
| 4 | **Proof** — a real case, compressed onto one slide (`.build-card`) | `S4_NODE_*`, `S4_FLOW_NARRATION`, `S4_PIVOT_TO_FAILURE` |
| 5 | **Receipt** — expected vs actual side-by-side (`.vs-cards`) | `S5_EXP_*`, `S5_ACT_*`, `S5_HUMAN_COST` |
| 6 | **Generalise** — beyond the specific case (`.platforms` matrix) | `S6_ROW_*` + status: `blocked\|paid\|open\|tos` |
| 7 | **Defence #1** — copy-ready snippet (`.snippet-block`, dark code-card) | `S7_SNIPPET_*` |
| 8 | **Defence #2** — second snippet (WEAK/STRONG comparison works well) | `S8_SNIPPET_*` |
| 9 | **Defences #3+#4** — compressed two-on-one slide | `S9A_*`, `S9B_*` |
| 10 | **CTA close** — primary + secondary DM-keyword offers | `S10_PRIMARY_*`, `S10_SECONDARY_*`, `AUTHOR_*` |

**Component palette available in the template's `<style>` block:**

`.pipeline` (N-node horizontal flow) · `.node-detail` (single node with inputs/output) · `.vs-cards` (expected vs actual) · `.platforms` (access matrix) · `.mechanism` (numbered step list with one .failure highlight) · `.snippet-block` (dark code-card) · `.defence-num` (giant background numeral) · `.hallucination-receipt` (receipt-style failure proof) · `.build-card` (compressed N-node build) · `.tip-list` (large-numeral takeaways) · `.pull-quote` + `.quote-sub` (big italic with terra glyph) · `.stat-strip` (N-cell stat row) · `.change-divider` (chatbot-vs-agent two-column) · `.funnel` (decision row stack).

**Cover-layout warning (load-bearing).** The cover SVG uses `overflow: visible` + `margin-top: 40px` on the SVG element itself — NOT `padding-top` on the parent flex slot. If you add padding to the parent, the cover-footer disappears. See [[feedback_slide_geometry_clipping]] memory for the math.

**Sub-caption rule.** The SVG sub-caption (the all-caps mono line under the diagram) narrates the visual; it must NOT echo the headline. If your headline says "the failure mode every builder meets," your sub-caption is a process-flow ("X → Y → Z"), not a restatement.

---

## Hard rules — do not violate

1. **Two modes. Do not mix.** Dark/teal (presenter) and paper/terra (learner deck / carousel) are not interchangeable. Don't put terra on a dark deck, don't put teal on a paper carousel.
2. **Copy `:root` blocks verbatim** from these templates. The token values came from Session 1; they are locked.
3. **Fonts are fixed:** Inter + JetBrains Mono for dark, Fraunces + Geist + Geist Mono for paper. No exceptions.
4. **Presenter deck is a cockpit, not a slideshow.** Do not convert the JS data-driven render into hardcoded `<section>` markup. If you find yourself building one slide per `<section>`, you have built the wrong artifact — that's the learner deck.
5. **Noise SVG + radial vignette are load-bearing** on paper artifacts. Don't remove them — they give the paper its texture.
6. **EdYoda wordmark stays — on internal materials.** Always present in running head + footer of the presenter deck, learner deck, facilitator script, and workbook. **EXCEPTION: public-facing LinkedIn carousels do NOT carry EdYoda branding** — they ship under the author's own byline as a numbered "Field Notes / A Field Guide to Generative AI" series. This is deliberate: the carousel works as standalone thought-leadership, not as a course recap.
7. **All templates are self-contained.** Inline CSS, inline JS, fonts via Google CDN. Don't introduce a build step.
8. **Pairing must be symmetric.** Presenter and learner decks must have identical `slides.length` with 1:1 index alignment. If a beat needs a standalone editorial treatment on the learner side, give the presenter a matching slide — even if skeletal. The clamp in the learner's storage listener is a safety net, not a feature; if it ever triggers, you broke the contract.
9. **Break slide is required.** Every 2-hour session has a hard 10-min break at ~0:55. Both templates ship with sample break slides — keep them, just retitle/reposition. The `.break-slide` class auto-fires the countdown on the learner; the `tag: "break"` auto-fires the sidebar timer on the presenter. Detect by class/tag, never by hardcoded index.

### Register rules — presenter vs learner (see `edyoda_presenter_vs_learner` memory)

10. **`say:` fields in the presenter deck are spoken English.** Whatever sits in a slide's `say:` is the literal sentence the facilitator reads aloud. Read it out before shipping — if it sounds like a textbook, rewrite it as speech. Stage directions ("wait 30 sec", "read every name") belong in `doSteps:` / `watch:` / `note:`, never in `say:`.
11. **No timestamps on learner-facing artifacts.** The learner deck, workbook, and carousel must not show "0:30 – 0:45" or "minute 47" style slot ranges. Those live in the facilitator script's run sheet only. Learners don't run the clock — the facilitator does.
12. **No facilitator stage directions in learner-visible copy.** Lines like "*If we're on time, the room sees X. If we're not, this slide skips.*" do not belong on a learner slide. Use a small `(optional)` tag instead — no explanation of why.
13. **"Next session" tease lives on the final close slide only.** Do not sprinkle "Next: RAG" mentions through middle slides. The bridge to S(N+1) belongs in Block 5's close, never earlier.

### Grounding rules (see `feedback_ground_before_claiming` memory)

14. **What the cohort actually built in the prior session is canon, not the curriculum template.** Before writing any S(N+1) callback to S(N), confirm what *this cohort* shipped. The memory's session-curriculum row tells you the canonical artifact; the cohort-actual artifact may differ. Anchor callbacks on the cohort-actual one. If unknown — ask, do not invent.
15. **Session topic boundaries are hard. See `edyoda_session_boundaries` memory.** The most common failure is pulling RAG/document-grounding mechanics from S4 into S3. If an S3 build is reaching for RAG Docs, redesign it to stay in prompt territory (few-shot, CoT, ToT, constraint sharpening).

---

## Cross-deck wiring — pairing + PDF export

Both decks talk through the browser's `localStorage` channel (same-origin only — both must be loaded from the same folder or the same dev server). Two messages flow:

| Key | Direction | Trigger | What happens |
|---|---|---|---|
| `genai_s{N}_slide_master` | Presenter → Learner | Every `show()` call | Learner clamps to its own `totalSlides-1` and navigates |
| `genai_s{N}_print_request` | Presenter → Learner | Facilitator presses `P` on presenter | Learner calls `window.print()` → Chrome's Save-as-PDF dialog opens on the learner tab |

**Exporting the learner deck to PDF (P shortcut):**

1. Open the presenter deck. The learner deck can be either already-open (preferred) or closed.
2. Press `P`. If the learner tab is open, it gets the print signal instantly. If not, the presenter opens a new learner tab and resends the signal after a 1.5s render delay.
3. The learner tab opens Chrome's print dialog. Choose **Save as PDF**, **Background graphics ON**, default margins (already zero via `@page`), Layout: Landscape (already forced via `@page`).
4. Save. You get one landscape 16:9 page per slide, paper-editorial styling preserved minus the noise overlay (dropped for sharper print).

The `@page { size: 11.25in 6.33in; margin: 0; }` rule in the learner deck sets a 1080×608 px landscape page at 96dpi — same shape as the 16:9 viewport. Use `@media print` to override anything else for print mode (we already strip nav, hide the progress thread, and disable transitions).

If you want a print *without* the presenter — just open the learner deck and use Chrome's regular print dialog. The `@page` and `@media print` rules apply regardless of how print was triggered.

---

## Workflow — recommended order when building a new session

1. **Write the facilitator script first.** That nails down the run sheet, the build steps, the blocks, the contingencies. Everything else flows from this.
2. **Write the workbook second**, mirroring the step labels (`BUILD STEP A`, `BUILD STEP B`, etc.) so the facilitator can call out one label and every learner finds it on their page.
3. **Build the learner deck third.** This is the reading artifact — it's what learners will skim during class and re-read after. Match its slide structure to the facilitator script's run sheet, but keep the language editorial (lede, body, pull-quote), not operational.
4. **Build the presenter deck fourth**, by copying the run sheet into the `slides` JS array, one object per slide. Speak the script aloud while filling each `say:` field — it should sound like talk, not prose.
5. **Make the carousel last**, after the session has been delivered once. The carousel is a recap, not a preview — it lands best when it points to concrete moments from the actual run.

---

## Updating templates

If you find yourself fixing the same thing across both Session 2 and Session 3, fix it in the template here. Then the next session inherits the fix automatically.

If you find yourself writing a new component three times across sessions, promote it into the template's CSS.

Memory file (`edyoda_genai_design_system.md`) is the source of truth for design *rules*. These templates are the source of truth for design *artifacts*. Keep them in sync.
