# Production AI PM Program Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip EdYoda-specific assumptions from the reusable template folder and use the cleaned template structure to build the full Production AI PM program package.

**Architecture:** Keep `templates/` as generic reusable course scaffolding. Create a new `AI-PM/Production AI PM Program/` package containing program-level docs plus one folder per week with a facilitator script and learner workbook generated from the template structure.

**Tech Stack:** Markdown templates and self-contained HTML templates. No build step. Manual verification with text search and file inventory.

## Global Constraints

- Do not position the course as founder-led.
- Keep each live session as one 120-minute blended strategy + studio / critique session.
- Keep optional premium add-ons: 1:1 capstone review, mock AI PM interview, resume/LinkedIn/portfolio positioning review.
- Remove EdYoda-specific copy, naming rules, memory references, and branding rules from the generic template folder.
- Preserve the visual-mode distinction in the templates: presenter deck is dark cockpit, learner deck and carousel are paper/editorial.
- Build for senior PMs targeting global or remote AI PM roles.
- Avoid heavy ML math, generic PM basics, coding bootcamp positioning, and prompt-engineering-only framing.

---

### Task 1: Clean The Generic Template Folder

**Files:**
- Modify: `templates/README.md`
- Modify: `templates/01_Facilitator_Script.template.md`
- Modify: `templates/02_Learner_Workbook.template.md`
- Modify: `templates/presenter_deck.template.html`
- Modify: `templates/learner_deck.template.html`
- Modify: `templates/linkedin_carousel.template.html`

**Interfaces:**
- Consumes: current EdYoda-oriented template folder.
- Produces: brand-neutral templates that can generate Production AI PM sessions.

- [ ] **Step 1: Replace EdYoda-specific README content**

Rewrite the README as a generic course-production template guide:
- Title: `Course Production Templates`
- Remove references to EdYoda, memory files, session 1/session 2, micro-degree, and GenAI for Non-Coders.
- Keep the six-file inventory.
- Keep the presenter-vs-learner distinction.
- Update quick start to use `Week 01 - Session Title`.
- Update placeholder examples to Production AI PM.
- Replace `EdYoda wordmark stays` with `Branding is configurable`.
- Keep cross-deck wiring, PDF export, and workflow guidance in generic language.

- [ ] **Step 2: Update facilitator script template**

Change title and metadata:
- `Facilitator Script — {{SESSION_TITLE}} (Session {{SESSION_NUMBER}} of {{TOTAL_SESSIONS}})`
- `Duration: 120 minutes`
- Replace audience example with senior PMs / product leaders.
- Replace build-session language with blended strategy + studio language.
- Remove references to Session N-1 where they assume old cohort history; keep callback placeholders generic.

- [ ] **Step 3: Update workbook template**

Change title and setup:
- `{{PROGRAM_TITLE}} — Session {{SESSION_NUMBER}} Workbook`
- Replace "two hours" with "120-minute session".
- Replace "Builder" examples with generic tool stack language.
- Remove EdYoda-specific facilitation assumptions.

- [ ] **Step 4: Update HTML template metadata**

Change titles:
- Presenter deck: `Presenter · {{PROGRAM_TITLE}} · Session {{SESSION_NUMBER}}`
- Learner deck: `{{PROGRAM_TITLE}} — Session {{SESSION_NUMBER}}`
- Carousel title: `LinkedIn Carousel — {{HOOK_HEADLINE}} · {{PUB_TITLE}}`

Update localStorage keys from `genai_s{N}` to `course_s{N}`.

- [ ] **Step 5: Verify template cleanup**

Run:

```bash
rg -n "EdYoda|edyoda|EDYODA|GenAI for Non-Coders|Non-Coders|Micro Degree|micro-degree|\\.claude|memory/" templates
```

Expected: no matches.

---

### Task 2: Create Production AI PM Program Package

**Files:**
- Create: `AI-PM/Production AI PM Program/README.md`
- Create: `AI-PM/Production AI PM Program/00_Cohort_Operating_Plan.md`
- Create: `AI-PM/Production AI PM Program/00_Portfolio_Packet_Template.md`
- Create: `AI-PM/Production AI PM Program/00_Tool_Stack_and_Setup.md`

**Interfaces:**
- Consumes: `AI-PM/Production_AI_PM_Curriculum.md`
- Produces: program-level operating docs for the full course.

- [ ] **Step 1: Create package README**

Include:
- Program promise.
- 8-week structure.
- Weekly 120-minute blended session format.
- Portfolio packet outputs.
- Folder map.

- [ ] **Step 2: Create cohort operating plan**

Include:
- Recommended cohort size.
- Weekly rhythm.
- Feedback checkpoints.
- Optional premium add-ons.
- Pre-cohort prep.
- Post-session workflow.

- [ ] **Step 3: Create portfolio packet template**

Include sections for:
- AI Product Strategy Memo.
- AI PRD.
- Agent/RAG workflow prototype.
- Eval plan and golden dataset.
- Technical architecture brief.
- Production readiness review.
- Executive narrative and interview story.

- [ ] **Step 4: Create tool stack setup doc**

Include:
- Core no-code/low-code stack.
- Optional advanced stack.
- Account setup checklist.
- Tool principles.

---

### Task 3: Generate Week-By-Week Session Materials

**Files:**
- Create weekly folders under `AI-PM/Production AI PM Program/Week 01 - AI Product Judgment for Senior PMs/` through `Week 08 - Executive Narrative Portfolio and AI PM Interview Readiness/`
- Create in each folder:
  - `01_Facilitator_Script.md`
  - `02_Learner_Workbook.md`

**Interfaces:**
- Consumes: cleaned facilitator and workbook template structure plus the approved curriculum.
- Produces: complete run sheets and learner workbooks for all eight weeks.

- [ ] **Step 1: Create Week 01 materials**

Generate the facilitator script and workbook for AI Product Judgment:
- AI opportunity filter.
- Three-idea critique.
- Portfolio artifact: AI Opportunity One-Pager.

- [ ] **Step 2: Create Week 02 materials**

Generate the facilitator script and workbook for AI Strategy, Moats, and Business Case:
- Strategy memo critique.
- Data/workflow/distribution advantage.
- Portfolio artifact: AI Product Strategy Memo v1.

- [ ] **Step 3: Create Week 03 materials**

Generate the facilitator script and workbook for GenAI System Design:
- GenAI system map.
- Prompt/context/RAG/tool decisions.
- Portfolio artifact: AI PRD v1.

- [ ] **Step 4: Create Week 04 materials**

Generate the facilitator script and workbook for Agentic Product Design:
- Autonomy map.
- Approval gates.
- Portfolio artifacts: Agent/RAG workflow prototype v1 and autonomy map.

- [ ] **Step 5: Create Week 05 materials**

Generate the facilitator script and workbook for Evals:
- Golden dataset.
- Rubric.
- Failure mode taxonomy.

- [ ] **Step 6: Create Week 06 materials**

Generate the facilitator script and workbook for Working with AI/ML Engineering:
- Architecture review.
- Engineering-facing questions.
- Portfolio artifact: technical architecture brief.

- [ ] **Step 7: Create Week 07 materials**

Generate the facilitator script and workbook for Production Readiness:
- Cost and latency.
- Safety/security.
- Risk register.
- Launch readiness review.

- [ ] **Step 8: Create Week 08 materials**

Generate the facilitator script and workbook for Executive Narrative and Portfolio:
- Final portfolio critique.
- Interview narrative.
- Executive version and interview version of capstone story.

---

### Task 4: Verify Generated Program

**Files:**
- Verify all created and modified files.

**Interfaces:**
- Consumes: generated program package and cleaned templates.
- Produces: confirmation that the program is complete and EdYoda-free.

- [ ] **Step 1: Check file inventory**

Run:

```bash
find "AI-PM/Production AI PM Program" -maxdepth 2 -type f | sort
```

Expected:
- 4 program-level files.
- 16 weekly files.

- [ ] **Step 2: Check EdYoda cleanup**

Run:

```bash
rg -n "EdYoda|edyoda|EDYODA|GenAI for Non-Coders|Non-Coders|Micro Degree|micro-degree|\\.claude|memory/" templates "AI-PM/Production AI PM Program"
```

Expected: no matches.

- [ ] **Step 3: Check session format consistency**

Run:

```bash
rg -n "120-minute blended|Duration: 120 minutes|Live Strategy \\+ Studio" "AI-PM/Production AI PM Program"
```

Expected: every facilitator script references 120-minute blended format.

