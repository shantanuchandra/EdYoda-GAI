# Course Production Templates

Reusable scaffolds for building live cohort-course materials. The templates preserve two distinct artifact modes:

- **Presenter deck = cockpit.** Dark, dense, screen-first, JS-rendered, built for the facilitator.
- **Learner deck = reading artifact.** Paper/editorial, static slide sections, built for learners to skim during class and revisit after.

The templates are intentionally self-contained. HTML files keep inline CSS and JS, with fonts loaded from Google CDN. There is no build step.

---

## Files In This Folder

| File | Use for | Mode |
|---|---|---|
| `README.md` | This guide | text |
| `01_Facilitator_Script.template.md` | Minute-by-minute facilitator run sheet | text |
| `02_Learner_Workbook.template.md` | Learner-facing workbook | text |
| `presenter_deck.template.html` | Facilitator cockpit | dark |
| `learner_deck.template.html` | Learner reading deck | paper |
| `linkedin_carousel.template.html` | 10-slide LinkedIn carousel | paper |

---

## Quick Start

```bash
mkdir "Week 01 - AI Product Judgment for Senior PMs"
cd "Week 01 - AI Product Judgment for Senior PMs"

cp ../../templates/01_Facilitator_Script.template.md 01_Facilitator_Script.md
cp ../../templates/02_Learner_Workbook.template.md 02_Learner_Workbook.md
cp ../../templates/presenter_deck.template.html presenter_deck.html
cp ../../templates/learner_deck.template.html learner_deck.html
cp ../../templates/linkedin_carousel.template.html linkedin_carousel.html
```

Then open each copied file and replace every `{{TOKEN_NAME}}` placeholder with session-specific content.

---

## Placeholder Token Reference

Every placeholder uses double curly braces. Search for `{{` in a copied template to find unfinished fields.

### Program And Session Metadata

| Token | Description | Example |
|---|---|---|
| `{{PROGRAM_TITLE}}` | Program name | `Production AI PM` |
| `{{PROGRAM_SUBTITLE}}` | Program promise | `Lead GenAI and agentic products from strategy to launch` |
| `{{SESSION_NUMBER}}` | Numeric session number | `1` |
| `{{SESSION_NUMBER_PADDED}}` | Two-digit session number | `01` |
| `{{SESSION_NUMBER_WORD}}` | English word for visual labels | `One` |
| `{{TOTAL_SESSIONS}}` | Total number of sessions | `8` |
| `{{SESSION_TITLE}}` | Full session title | `AI Product Judgment for Senior PMs` |
| `{{SESSION_SUBTITLE}}` | One-sentence learner promise | `Decide which AI ideas deserve to be built and which should be killed early.` |
| `{{SESSION_SUBTITLE_SHORT}}` | Short label for covers | `AI Product Judgment` |
| `{{PUB_TITLE}}` | Magazine-style running-head title | `Production AI PM Field Notes` |
| `{{NEXT_SESSION_NUMBER}}` | Next session number | `2` |
| `{{NEXT_SESSION_TITLE}}` | Next session title | `AI Strategy, Moats, and Business Case` |
| `{{TOTAL_SLIDES}}` | Used in slide folios | `36` |

### Facilitator Script Tokens

| Token | Description | Example |
|---|---|---|
| `{{AUDIENCE_DESCRIPTION}}` | Cohort profile | `Senior PMs and product leaders building AI product judgment.` |
| `{{SESSION_SPINE}}` | 3-4 phase arc | `Judgment Reset -> Framework Walkthrough -> Studio Critique -> Portfolio Assignment` |
| `{{HANDS_ON_PERCENT}}` / `{{HANDS_ON_MINUTES}}` | Learner activity share | `45` / `54` |
| `{{BUILD_ARTIFACT}}` | Walk-out deliverable | `AI Opportunity One-Pager` |
| `{{TOOLS_LIST}}` | Tools to pre-load | `Claude, ChatGPT, Perplexity, shared workbook, portfolio template.` |
| `{{OPENING_HOOK_LINE}}` | Pre-class slide hook | `Most AI product failures start before the model is chosen.` |
| `{{ONE_RULE}}` | Single session rule | `Do not defend the AI idea. Test whether it deserves to exist.` |
| `{{BLOCK_N_NAME}}` / `{{BLOCK_N_RANGE}}` / `{{BLOCK_N_GOAL}}` | Block metadata | `STUDIO CRITIQUE` / `0:52 - 1:20` / `Pressure-test learner choices.` |
| `{{PRACTICE_RECOMMENDATION}}` | Dry-run plan | `Run the shared case through the opportunity filter twice before class.` |

### Workbook Tokens

| Token | Description | Example |
|---|---|---|
| `{{WORKBOOK_HOOK_LINE}}` | Welcome line | `Today you turn AI enthusiasm into product judgment.` |
| `{{LEARNER_DELIVERABLE}}` | Learner-facing artifact | `an AI Opportunity One-Pager for your capstone problem` |
| `{{TRACK_1..4_NAME}}` | Learner tracks | `Enterprise Copilot`, `Agentic Workflow`, `Decision Support`, `Personal Capstone` |
| `{{ARTIFACT_NOUN}}` | Artifact being built | `memo`, `workflow`, `eval plan` |
| `{{STEP_LABEL_A..E}}` | Step labels | `EXERCISE 1`, `EXERCISE 2`, `STUDIO REVIEW` |
| `{{REFERENCE_N_NAME}}` / `{{REFERENCE_N_BODY}}` | Reference sheets | `AI Opportunity Filter`, `Production Readiness Gate` |
| `{{TAKEHOME_PROMPT_1..2}}` | Follow-up prompts | `What would make this AI product unsafe to launch?` |

---

## Presenter Deck Template

The presenter deck is JS-rendered from a `slides` array. Each slide object supports:

```js
{
  num: 1,
  when: "0:00 - 0:05",
  duration: "5 min",
  tag: "title" | "demo" | "exercise" | "break",
  title: "...",
  say: "...",
  afterPause: "...",
  sayAfter: "...",
  doSteps: ["...", "..."],
  watch: "...",
  deeper: ["...", "..."],
  note: "...",
  bridge: "...",
  prompt: "..."
}
```

The `say:` field is spoken English. Stage directions belong in `doSteps:`, `watch:`, or `note:`.

---

## Learner Deck Template

The learner deck is static: one `<section class="slide">` per slide. It includes:

- Cover slide with pre-class countdown timer.
- Standard content slide.
- Display/quote slide.
- Exercise slide variant.
- Break slide support.
- Print-to-PDF support.

No facilitator-only stage directions should appear in the learner deck.

---

## LinkedIn Carousel Template

The carousel is a 10-slide 1080x1080 editorial artifact:

| # | Job | Token prefix |
|---|---|---|
| 1 | Cover | `HOOK_*`, `SVG_*`, `HERO_BOX_*` |
| 2 | Thesis | `S2_*` |
| 3 | Mechanism | `S3_*` |
| 4 | Proof | `S4_*` |
| 5 | Receipt | `S5_*` |
| 6 | Generalise | `S6_*` |
| 7 | Toolkit / defence 1 | `S7_*` |
| 8 | Toolkit / defence 2 | `S8_*` |
| 9 | Toolkit / defences 3 and 4 | `S9A_*`, `S9B_*` |
| 10 | CTA close | `S10_*`, `AUTHOR_*` |

Make the cover specific, concrete, and under 200 characters. Avoid vague "AI is changing everything" openers.

---

## Hard Rules

1. **Two modes. Do not mix them.** Dark/teal is for presenter cockpit. Paper/terra is for learner deck and carousel.
2. **Presenter deck is a cockpit, not a normal slideshow.** Keep the JS data-driven render.
3. **Learner deck is a reading artifact.** Use editorial language, not stage directions.
4. **All templates are self-contained.** Do not introduce a build step.
5. **Branding is configurable.** Use `{{PROGRAM_TITLE}}`, `{{PUB_TITLE}}`, and author tokens. Do not hardcode platform branding unless the course owner asks for it.
6. **Pair presenter and learner decks.** Presenter and learner decks should have matching slide counts and matching conceptual beats.
7. **Break slide is required.** Every 120-minute session should include a 10-minute break around the midpoint.
8. **No timestamps in learner-facing artifacts.** Timing belongs in the facilitator script and presenter cockpit.
9. **No stage directions in learner-facing copy.** Learners should see tasks, prompts, and explanations, not facilitation instructions.
10. **Final slide points forward.** Mention the next session only in the close.

---

## Cross-Deck Wiring And PDF Export

Both decks communicate through browser `localStorage` when loaded from the same folder or dev server.

| Key | Direction | Trigger | Result |
|---|---|---|---|
| `course_s{N}_slide_master` | Presenter to learner | Every presenter `show()` call | Learner moves to the same slide index |
| `course_s{N}_print_request` | Presenter to learner | Facilitator presses `P` | Learner opens print dialog |

To export the learner deck, open the presenter deck, open or allow it to open the learner deck, press `P`, and save from Chrome's print dialog with background graphics enabled.

---

## Recommended Build Order

1. Write the facilitator script first.
2. Write the workbook second.
3. Build the learner deck third.
4. Build the presenter deck fourth.
5. Make the carousel last, after the session has been delivered or dry-run.

The facilitator script establishes the run sheet. The workbook mirrors the learner steps. The decks then become delivery and reading artifacts rather than parallel drafts.

