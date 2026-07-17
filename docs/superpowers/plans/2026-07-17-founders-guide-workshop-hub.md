# Founder's Guide Workshop Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a founder-facing presenter deck, a deep handbook, and a public-but-unlinked facilitator runbook within the existing Vercel workshop site.

**Architecture:** Keep each artifact as self-contained static HTML so it can be opened, printed, and deployed without a build system. Use `vercel.json` rewrites to map clear routes to source files. Use the existing pre-read as the founder-facing visual reference, while preserving a distinct dark presenter mode and a compact operations-oriented runbook mode.

**Tech Stack:** Static HTML, inline CSS, inline SVG, vanilla JavaScript, Vercel static deployment, Node script parsing, curl route checks.

## Global Constraints

- Canonical content comes only from `Founder's Guide to Agents/00_Source_of_Truth.md` and the three existing session documents.
- Keep the locked 10am–2pm flow and 15-minute 11:35 break.
- Founder-facing content never exposes facilitator-only talk tracks or contingencies.
- Gmail drafts are created for review, never automatically sent.
- Do not add secrets, dependencies, build steps, or unsupported factual claims.
- The public founder route must not link to `/runbook`.
- Respect `prefers-reduced-motion` and provide visible keyboard focus.

---

### Task 1: Add the workshop-hub route shell

**Files:**
- Modify: `Founder's Guide to Agents/session/vercel.json`
- Create: `Founder's Guide to Agents/session/presenter.html`
- Create: `Founder's Guide to Agents/session/handbook.html`
- Create: `Founder's Guide to Agents/session/runbook.html`
- Test: inline Node validation command executed in the session directory

**Interfaces:**
- Consumes: existing `00_Pre_Read.html` at `/`.
- Produces: `/presenter`, `/handbook`, and `/runbook` Vercel routes.

- [ ] **Step 1: Write the route test command before altering deployment config**

```bash
node -e "const fs=require('fs'); const c=JSON.parse(fs.readFileSync('vercel.json','utf8')); const targets=c.rewrites.map(r=>r.destination); for (const target of ['/00_Pre_Read.html','/presenter.html','/handbook.html','/runbook.html']) if(!targets.includes(target)) throw new Error('missing '+target); console.log('all workshop routes declared')"
```

Expected before implementation: FAIL because the three new route destinations do not exist.

- [ ] **Step 2: Add the exact rewrite contract**

```json
{
  "rewrites": [
    { "source": "/", "destination": "/00_Pre_Read.html" },
    { "source": "/presenter", "destination": "/presenter.html" },
    { "source": "/handbook", "destination": "/handbook.html" },
    { "source": "/runbook", "destination": "/runbook.html" }
  ]
}
```

- [ ] **Step 3: Create minimal route files with document titles**

```html
<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Founder's Guide to Agents</title></head><body></body></html>
```

Use page-specific titles: `Presenter Deck`, `Founder Handbook`, and `Facilitator Runbook`.

- [ ] **Step 4: Run the route test after implementation**

Run the Step 1 command.

Expected: `all workshop routes declared`.

- [ ] **Step 5: Commit the independently deployable route shell**

```bash
git add "Founder's Guide to Agents/session/vercel.json" "Founder's Guide to Agents/session/presenter.html" "Founder's Guide to Agents/session/handbook.html" "Founder's Guide to Agents/session/runbook.html"
git commit -m "feat: add workshop hub routes"
```

### Task 2: Build the founder-facing presenter deck

**Files:**
- Modify: `Founder's Guide to Agents/session/presenter.html`
- Test: `node` inline-script parser

**Interfaces:**
- Consumes: locked session beats from `01_Facilitator_Script.md` and concepts from `02_Learner_Workbook.md`.
- Produces: keyboard-navigable deck with slide counter, progress bar, and visual teaching sequence.

- [ ] **Step 1: Write the content-contract test**

```bash
node -e "const s=require('fs').readFileSync('presenter.html','utf8'); for(const phrase of ['Agent or prompt?','Weekly Repo/Product Digest','Investor Qualification + Outreach','Human review before action','Your next agent']) if(!s.includes(phrase)) throw new Error('missing slide beat: '+phrase); console.log('presenter content contract passes')"
```

Expected before implementation: FAIL with a missing slide beat.

- [ ] **Step 2: Implement a full-screen dark deck with this slide data contract**

```js
const slides = [
  { tag:'Saturday / 10:00–14:00', title:'Build agents that earn their keep.', body:'Two working agents for founder operations.' },
  { tag:'The decision', title:'Agent, prompt, tool—or human?', body:'Frequency × judgement chooses the move.' },
  { tag:'The test', title:'Agent or prompt?', body:'Live data + external action + trigger.' },
  { tag:'Build 01', title:'Weekly Repo/Product Digest', body:'Commits → plain English → weekly delivery.' },
  { tag:'Build 02', title:'Investor Qualification + Outreach', body:'Round → research → fit score → Gmail draft.' },
  { tag:'Safety', title:'Human review before action', body:'Drafts are not sends. You decide.' },
  { tag:'Generalise', title:'Your next agent', body:'Name a recurring task and draw its trigger, data, reasoning, and action.' }
];
```

Add arrow-key navigation, clickable previous/next controls, a progress indicator, keyboard focus styles, and `prefers-reduced-motion` CSS.

- [ ] **Step 3: Run the presenter content-contract test**

Run the Step 1 command.

Expected: `presenter content contract passes`.

- [ ] **Step 4: Parse the deck script**

```bash
node -e "const s=require('fs').readFileSync('presenter.html','utf8'); new Function(s.match(/<script>([\\s\\S]*?)<\\/script>/)[1]); console.log('presenter script parses')"
```

Expected: `presenter script parses`.

- [ ] **Step 5: Commit the deck**

```bash
git add "Founder's Guide to Agents/session/presenter.html"
git commit -m "feat: add founder presenter deck"
```

### Task 3: Build the founder handbook

**Files:**
- Modify: `Founder's Guide to Agents/session/handbook.html`
- Test: handbook content-contract command

**Interfaces:**
- Consumes: `02_Learner_Workbook.md`, `03_Hermes_Build_Recipes.md`, and public teaching context from `01_Facilitator_Script.md`.
- Produces: searchable-in-browser, anchor-linked reference with recipe prompts and a distinct facilitator-operations chapter.

- [ ] **Step 1: Write the handbook content-contract test**

```bash
node -e "const s=require('fs').readFileSync('handbook.html','utf8'); for(const phrase of ['The agent test','Weekly Repo/Product Digest','Investor Qualification + Outreach','Curated fallback investor list','Facilitator operations']) if(!s.includes(phrase)) throw new Error('missing handbook section: '+phrase); console.log('handbook content contract passes')"
```

Expected before implementation: FAIL with a missing handbook section.

- [ ] **Step 2: Implement the handbook chapters**

Create six anchor-linked chapters:

```html
<nav aria-label="Handbook contents">
  <a href="#mental-model">Mental model</a>
  <a href="#digest">Build 01</a>
  <a href="#outreach">Build 02</a>
  <a href="#fallback">Fallback investors</a>
  <a href="#troubleshooting">Troubleshooting</a>
  <a href="#facilitator-ops">Facilitator operations</a>
</nav>
```

Include the complete prompt sequence for both agents, the six investor fallback categories from the recipe document, checklist states saved only in local storage, copyable prompt controls, and expandable operations notes. Mark the recurring schedule as optional and the Gmail action as draft-only.

- [ ] **Step 3: Confirm founder navigation excludes the runbook route**

```bash
node -e "const s=require('fs').readFileSync('handbook.html','utf8')+require('fs').readFileSync('00_Pre_Read.html','utf8')+require('fs').readFileSync('presenter.html','utf8'); if(s.includes('href=\"/runbook\"')) throw new Error('runbook leaked into founder navigation'); console.log('runbook remains unlinked')"
```

Expected: `runbook remains unlinked`.

- [ ] **Step 4: Run the handbook content-contract test and script parser**

Run the Step 1 command, then:

```bash
node -e "const s=require('fs').readFileSync('handbook.html','utf8'); new Function(s.match(/<script>([\\s\\S]*?)<\\/script>/)[1]); console.log('handbook script parses')"
```

Expected: `handbook content contract passes` and `handbook script parses`.

- [ ] **Step 5: Commit the handbook**

```bash
git add "Founder's Guide to Agents/session/handbook.html"
git commit -m "feat: add founder handbook"
```

### Task 4: Build the public-but-unlinked facilitator runbook

**Files:**
- Modify: `Founder's Guide to Agents/session/runbook.html`
- Test: runbook content-contract command

**Interfaces:**
- Consumes: every timed block, spoken line, and contingency in `01_Facilitator_Script.md`.
- Produces: operational timeline with `say`, `do`, `watch`, pre-session checks, and contingency disclosures.

- [ ] **Step 1: Write the runbook content-contract test**

```bash
node -e "const s=require('fs').readFileSync('runbook.html','utf8'); for(const phrase of ['10:00','11:35','11:50','1:05','If a demo fails live','Pre-session checklist']) if(!s.includes(phrase)) throw new Error('missing runbook item: '+phrase); console.log('runbook content contract passes')"
```

Expected before implementation: FAIL with a missing runbook item.

- [ ] **Step 2: Implement the operational timeline**

Use a block schema that preserves the runbook’s live-use information architecture:

```html
<article class="block">
  <div class="time">10:35–11:35</div>
  <div><p class="eyebrow">Build block A</p><h2>Weekly Repo/Product Digest</h2></div>
  <section><h3>Say</h3><p>We are building a weekly shipping translation layer, not a git-log reader.</p></section>
  <section><h3>Do</h3><ul><li>Open the Build 01 prompt.</li><li>Circulate while founders validate real commit data.</li></ul></section>
  <section><h3>Watch</h3><p>Generic output, missing repository permissions, and no recent commits.</p></section>
</article>
```

Include the 10:00 opener, 10:10 mental model, 10:20 agent test, both build blocks, mandatory 11:35 break, 1:05 generalisation, 1:50 close, pre-session practice, and every contingency heading in the source script.

- [ ] **Step 3: Run the runbook content-contract test and parser**

Run the Step 1 command, then:

```bash
node -e "const s=require('fs').readFileSync('runbook.html','utf8'); new Function(s.match(/<script>([\\s\\S]*?)<\\/script>/)[1]); console.log('runbook script parses')"
```

Expected: `runbook content contract passes` and `runbook script parses`.

- [ ] **Step 4: Commit the runbook**

```bash
git add "Founder's Guide to Agents/session/runbook.html"
git commit -m "feat: add facilitator runbook"
```

### Task 5: Deploy and verify the complete hub

**Files:**
- Modify: Vercel production deployment for `founders-guide-to-agents`
- Test: public route checks

**Interfaces:**
- Consumes: four static HTML artifacts and `vercel.json` rewrites.
- Produces: public routes under the existing project alias.

- [ ] **Step 1: Run local completeness checks**

```bash
for f in 00_Pre_Read.html presenter.html handbook.html runbook.html; do test -f "$f" || exit 1; node -e "const s=require('fs').readFileSync('$f','utf8'); if(/\{\{[^}]+\}\}/.test(s)) throw new Error('$f has unfinished template tokens')"; done; echo 'local artifacts complete'
```

Expected: `local artifacts complete`.

- [ ] **Step 2: Deploy production**

```bash
npx --yes vercel deploy --prod --yes
```

Expected: output contains `readyState` with `READY`.

- [ ] **Step 3: Verify every route returns public HTML**

```bash
for route in / /presenter /handbook /runbook; do curl -sS -o /dev/null -w "$route %{http_code}\\n" "https://founders-guide-to-agents-shantanuchandras-projects.vercel.app$route"; done
```

Expected: four `200` lines.

- [ ] **Step 4: Commit deployment configuration only if it changed in this task**

```bash
git status --short
```

Expected: no uncommitted deployment configuration changes.

