# Founder's Guide to Agents — Source of Truth

**Status:** Living document. This is the canonical record of decisions, research, and open threads for the "Founder's Guide to Agents" hands-on session. Update this file as decisions change — do not let context live only in chat.

**Event:** Hands-on session with GrowthX community, this Saturday.
**Format:** 10am–2pm (4 hours), in-person/live, 10 founders.
**Audience:** Early-stage founders — either recently launched or actively building. Already comfortable with no-code tools and LLMs.
**Core framing:** Build agents for the founder's **ops** (sales, hiring, investor relations, marketing, product feedback, finance) — NOT their core product. This is deliberate: it's immediately achievable in one session and universally relevant regardless of what each founder is building.

---

## 1. Locked Decisions

| Decision | Answer | Status |
|---|---|---|
| Session structure | Option B: teach mental model → everyone builds ONE agent live → leave with templates for other domains | LOCKED |
| Build-vs-buy-vs-hire questionnaire | Repurposed as a **Friday pre-read** to solve the founders' "which ops domain is my bottleneck" clarity problem — NOT a live workshop centerpiece | LOCKED |
| Core mental model | A reusable framework founders can apply to ANY future task, not just the one built in the room. Working hypothesis: 2×2 of **Task Frequency** (daily vs occasional) × **Judgment Required** (low vs high). High-frequency + low-judgment = agent-worthy. High-freq + high-judgment = augment, don't automate. Low-freq + high-judgment = hire/consult. Low-freq + low-judgment = just buy a tool. *(Caveat acknowledged: tasks can migrate quadrants once a founder has done them 20 times — worth naming live.)* | LOCKED (framework), pending final naming/visual |
| What makes something an "agent" vs. a single LLM prompt | Verified via deep research (see §2): an agent (1) acts on **live data**, (2) takes **autonomous action in an external system**, (3) does not wait to be re-prompted each time. A single prompt that just extracts/drafts text is NOT an agent — it's a smart prompt. This distinction must be an explicit "aha moment" in the session. | LOCKED — this is the teaching spine |
| Build tool | ~~Make.com~~ **SUPERSEDED — see below.** No-code requirement was dropped. | SUPERSEDED |
| Build tool (revised) | **Hermes Agent** (github.com/NousResearch/hermes-agent) — a real, open-source, self-hosted agent platform by Nous Research. **Important nuance: this is CLI/config-based (shell installer + TUI/web dashboard), NOT a visual drag-and-drop canvas.** It supports 40+ built-in tools, MCP servers, a built-in cron scheduler, webhooks, and multiple LLM backends including OpenAI. Architecturally it's built as a persistent-memory personal/companion agent (messaging gateways: Telegram, Discord, Slack, WhatsApp, Signal, Email, Home Assistant) rather than a dedicated business-workflow orchestrator — but it is capable of the trigger → tool-call → action pattern we need. | LOCKED |
| LLM backend | **OpenAI API — GPT-5.6 Sol** (real model, released 2026-07-09, flagship/best-coding tier, $5/$30 per M tokens). Verified via TechCrunch/CNBC/Axios/Wikipedia. This session is not a scored hackathon — no eligibility rules or scoring tracks apply; setup focuses purely on getting Hermes + OpenAI working. | LOCKED |
| Setup timing | Hermes install/config happens **before** Saturday, as a pre-read/pre-work step — NOT live in the 4-hour session. This avoids burning workshop time on shell installs and config editing for non-engineer founders. Setup instructions sourced and verified — see [research/02_Hermes_Setup_Research.md](research/02_Hermes_Setup_Research.md). | LOCKED, RESEARCH COMPLETE |
| Relationship to "Hermes Buildathon" | The "World's Largest Hermes Buildathon" (GrowthX-organized, ~10-11 cities, ~2026-07-11, sponsor credits pooled from OpenAI/Convex/Cloudflare/ElevenLabs) was a **separate, earlier event**. Saturday's session is NOT that buildathon — it reuses the same tool (Hermes) and the same OpenAI credit perk, but is a distinct GrowthX session focused purely on founders building ops agents in their own domains. | CONFIRMED by user, 2026-07-16 |
| Live-build agents (FINAL, 2 agents) | (1) **Weekly Repo/Product Digest Agent** — watches GitHub commits/code pushes on **each founder's own repo** and writes a plain-language summary of new features/changes shipped that week (closest catalog match: Weekly Investor Pipeline Digest Agent, adapted from CRM-data to git-data as the live source). (2) **Investor Qualification + Outreach Agent** — founder describes their round in a short form; agent **live web-searches** for matching investors (stage/check-size/sector/geography fit), scores them, and drafts personalized outreach as Gmail drafts for the founder to read, validate, and send (closest catalog match: VC Fit-Scoring / Investor Qualification Agent, extended with live web-search sourcing + a Gmail-draft output step). | **LOCKED, 2026-07-16** |

---

## 2. Research Round 1 — Founder Ops Domain Landscape (Deep Research, verified)

**Method:** `deep-research` workflow. 5 parallel search angles (founder pain surveys, YC/accelerator content, VC practitioner playbooks — a16z/FirstRound, AI agent workflow implementations, founder time-use research). 23 sources fetched, 83 claims extracted, top 25 adversarially verified (3-vote system, needed 2/3 refute to kill).

**Result: 2 confirmed, 23 refuted, 0 unverified.** Most quantitative benchmarks (% of time lost, emails/week, hours/round, survey percentages) did NOT survive verification — treat all such numbers from founder-productivity content as directional folklore, not citable fact. Do not use specific stats from this space in the workshop without independent verification.

### Confirmed findings (safe to build on)

1. **[HIGH confidence] The Agent vs. Prompt distinction** — corroborated by Lenny's Newsletter, Anthropic MCP framing, IBM's agent definition, and MIT Sloan/arXiv 2025 literature (unanimous 3-0 vote):
   > An agent (a) acts proactively rather than waiting to be prompted, (b) draws on live data (web search, support queue, etc.), (c) takes real-world action in external systems (updates a CRM, runs code, comments on a ticket) — as opposed to only producing a recommendation.

   This is the single most load-bearing finding from the research. **Use this as the literal test we teach founders to apply.**

2. **[MEDIUM confidence, 2-1 vote] Sales/BD lead enrichment is a real, deployed multi-step agent pattern** — sourced from a16z's Speedrun Substack (SR006 cohort, March 2026): founders build lead lists in Clay/11x (pulling LinkedIn, Crunchbase, company DBs by ICP filter), then use AI enrichment to research each lead, write personalized first lines, and identify the right entry point at each org — all before a human writes anything. Minority dissent: this is not "zero human involvement" in practice — setup and periodic review are still required. Treat as illustrative, not literal turnkey.

3. **[Synthesized, not independently sourced] Structural fingerprint of an automation-ready task** — inferred by combining findings 1 and 2: automation-ready founder tasks are (a) templatable/pattern-following, (b) require pulling or pushing data across ≥2 external tools, (c) recur at least weekly, (d) don't require expert judgment at each instance. **This fingerprint — not "which domain" — is what actually predicts whether a task is agent-worthy.** This maps directly onto the 2×2 mental model in §1.

### What did NOT survive verification (do not cite these)

- Sales rep email/call volume baselines (a16z "Pipeline Cures All")
- Investor update cadence claims ("2 updates/quarter", weekly pipeline updates to investors) — FirstRound source claims refuted 1-2 and 0-3
- Series A fundraising time-consumption %, founder weekly hour claims (FirstRound "17,784 hours" piece) — refuted
- Founder time-waster survey percentages (Talker Research survey) — refuted 0-3 both claims
- Recruiting SLA claims (48-hour referral response, 200 onsite interviews/quarter) — FirstRound recruiting piece, refuted 0-3
- "20 AI agents replaced a 10-person sales team" (Lenny's Newsletter headline claim) — refuted 0-3, do not repeat this stat
- Claude Cowork/OpenAI Operator autonomously working LinkedIn Sales Navigator at scale — refuted 0-3, not currently accurate/verifiable
- "41% of founder time lost to repetitive tasks" (MindStudio blog) — refuted 0-3

### Open questions the research flagged (unresolved, useful for framing honesty in session)

- No domain besides Sales/BD produced a verified concrete automation example — Hiring, IR, Marketing, Product, Finance are all *plausible* but not evidence-backed at the same bar. This is fine for a workshop (we don't need academic certainty) but we should not overstate "proven" for those domains.
- Real human-oversight burden of Clay-style pipelines once deployed is unknown (setup + QA cost not measured).
- No verified examples specific to *pre-seed* founders (vs. Series A+) doing multi-step agent automation outside sales.
- Whether task judgment-requirements shift as a startup matures (a task that's low-judgment at pre-seed may become high-judgment at Series A) is an open question — worth a throwaway line in session, not a deep rabbit hole.

**Full raw output:** `/Users/shantanuchandra/.claude/projects/-Users-shantanuchandra-Downloads-Personal-EdYoda---GAI/72ec45cb-edae-4b5e-bc51-66b9497599fa/tool-results/bumxcazoo.txt` (workflow run `wf_20af3e35-e2a`, task id `wk7fpf9ol`) — **NOTE: this path is inside a temp/session directory and will not persist. If this research needs to survive beyond this machine session, copy the raw file into this folder.**

---

## 3. Research Round 2 — Concrete Agent Idea Catalog (COMPLETE)

Follow-up research requested because round 1's synthesis felt "polished but generic" — need a wider, more concrete, tabular list of specific buildable agent ideas per domain.

**Method:** 7-domain parallel fan-out (Sales/BD, Hiring, Investor Relations, Marketing, Product Feedback, Finance/Legal, Meetings/Comms/Personal Ops), each generating concrete named ideas with trigger/tools/action/why-agentic/feasibility/source, followed by adversarial concreteness+feasibility verification per idea.

**Result: 81 ideas collected → 51 survived verification**, spread across all 7 domains (Sales/BD 7, Hiring 7, Investor Relations 6, Marketing 7, Product Feedback 11, Finance/Legal 6, Meetings/Comms 7).

**Important caveat:** this research was originally scored against **Make.com** feasibility (before we dropped no-code in favor of Hermes). Treat the catalog as a **vetted idea bank** — real, sourced, concretely-specified trigger→tools→action shapes — not a literal Hermes build guide. Each idea still needs a Hermes-specific feasibility pass before being handed to founders as a guaranteed-buildable recipe.

**Full catalog:** [research/03_Agent_Idea_Catalog.md](research/03_Agent_Idea_Catalog.md) (all 51 surviving ideas, tabular, by domain)
**Raw data:** [research/raw_agent_catalog_round2.json](research/raw_agent_catalog_round2.json) (all 81 ideas + verdicts, for audit)

### Standout candidates relevant to the user's two-fold Investor Relations idea (2026-07-16)

From the Investor Relations domain (6 survivors), two map directly onto what the user proposed:
- **Weekly Investor Pipeline Digest Agent** / **Post-Meeting Investor Follow-Up Drafting Agent** — closest matches to the "Investor Update" half of the idea (pulls data, drafts update, sends/queues for approval)
- **VC Fit-Scoring / Investor Qualification Agent** — closest match to the "Investor Outreach/Personalizer" half (evaluates investors against round parameters — stage, check size, sector, geography — and scores/prioritizes fit)

These two informed the FINAL locked live-build pair (see §1) — both adapted with the user's specific refinements:

### Final live-build agent design decisions (2026-07-16)

**Agent 1 — Weekly Repo/Product Digest Agent:**
- Data source: **each founder's own GitHub repo** (not a shared demo repo) — more personally relevant, accepted tradeoff that some founders may have thin commit activity that week
- Trigger: scheduled (weekly) or on-demand for the live demo
- Action: reads commits/diffs, writes a plain-language "what shipped this week" summary — teaches founders they could point this at their own repo Monday morning

**Agent 2 — Investor Qualification + Outreach Agent:**
- Founder fills a short form describing their round (stage, sector, geography, check size wanted)
- Agent does **live web-search** (via Hermes's web-search tool) to find matching investors — the more ambitious, higher-wow-factor option vs. a static shared list
- **Risk accepted deliberately:** live web-search in front of 10 people in a fixed time block could return thin/wrong results for some founders
- **Hedge locked:** ship live web-search as the primary path, but bake a **curated fallback seed-stage investor list** into the recipe doc as backup — so nobody's demo breaks if search underperforms for their specific round/sector
- Output: drafts personalized outreach **directly into the founder's Gmail drafts folder** (not auto-sent) — founder reads, validates, sends manually. This human-in-the-loop gate is a deliberate design choice, not a limitation to fix.

---

## 5. Still Open / Next Decisions Needed

1. ~~Final live-build agent pick~~ **DONE** — see §1 and §3 "Final live-build agent design decisions."
2. ~~Hermes setup instructions for pre-read~~ **DONE (research)** — see [research/02_Hermes_Setup_Research.md](research/02_Hermes_Setup_Research.md). Still need to: (a) adapt this raw research into the actual founder-facing pre-read doc (friendlier tone, no internal notes), (b) decide whether Telegram-as-remote-control is acceptable for all 10 founders or if it introduces its own friction to flag in advance.
3. **Session minute-by-minute structure** — not yet designed. Per [[feedback_no_minute_callouts]], minute markers belong in the facilitator run sheet only, never in learner-facing narration.
4. **Pre-read questionnaire design** — needs to be built to diagnose "which ops domain is your bottleneck," sent before the Saturday session. Now has a second job: also carry the Hermes setup instructions.
5. ~~Templates for the other 4-5 domains~~ **Input ready** — Round 2 catalog (§3, [research/03_Agent_Idea_Catalog.md](research/03_Agent_Idea_Catalog.md)) has 51 vetted ideas across all domains to draw templates from. Still need to actually design the template hand-out format.
6. **Workbook / handbook design** — per [[feedback_no_engagement_theater_in_workbook]], keep this a crisp recipe card, no facilitator-side reassurance language.
7. **Verify Hermes actually supports the business-ops pattern we need** — trigger (webhook/schedule) → tool call (GitHub API / web-search) → LLM reasoning (draft digest/outreach) → action (Gmail draft / message). Confirmed Hermes has cron scheduler, webhooks, MCP servers, and 40+ tools in principle — but no concrete "hello world" business-ops example has been verified yet. Needs a dry-run build before Saturday to make sure the live demo actually works on this platform.
8. **Curated fallback investor list** — needs to be compiled (real seed-stage investors, sourced/verified — not fabricated) as the backup path for Agent 2 if live web-search underperforms in the room.

---

## 8. Asset Production Scope (locked 2026-07-16)

Per user direction — build these 5 artifacts, reusing the `templates/` design system where it fits a 4-hour hands-on session (not the 8-session cohort course it was built for):

1. **Pre-read** — sent before Saturday. Carries: (a) the "which ops domain is your bottleneck" diagnostic, (b) full Hermes + OpenAI setup instructions adapted from [research/02_Hermes_Setup_Research.md](research/02_Hermes_Setup_Research.md), (c) what to bring (own GitHub repo access, round details for the investor agent).
2. **Learner workbook** — crisp recipe-card companion for the room. Per [[feedback_no_engagement_theater_in_workbook]]: no emoji-reaction prompts, no reassurance paragraphs.
3. **Hermes-specific build recipe doc** — ONE combined doc, two sections: Part 1 = Weekly Repo/Product Digest Agent, Part 2 = Investor Qualification + Outreach Agent. This is the literal step-by-step "type this, configure that" reference founders follow while building.
4. **Learner deck** — paper/editorial mode, reading artifact, per `templates/learner_deck.template.html`.
5. **Presenter deck** — dark console/cockpit mode, JS-rendered from `slides` array, per `templates/presenter_deck.template.html`.

**Explicitly skipped for now:** LinkedIn carousel — to be built later, after the session has real outcomes/screenshots to show.

**Build order** (per `templates/README.md` recommended order, adapted): facilitator-script-equivalent structure first (embedded in the presenter deck's `slides` data + the build recipe doc), then workbook, then learner deck, then presenter deck. Carousel deferred entirely.

---

## 6. Related Memory Pointers

- [[feedback_ground_before_claiming]] — every stat in this doc has been through adversarial verification; anything NOT in §2's "confirmed findings" must not be presented as fact in the workshop.
- [[feedback_no_minute_callouts]] — keep minute markers out of learner scripts.
- [[feedback_no_engagement_theater_in_workbook]] — workbook tone discipline.
- [[edyoda_presenter_vs_learner]] — register rules for any presenter/learner materials built for this session.

---

## 7. Folder Map

- `00_Source_of_Truth.md` — this file
- `research/02_Hermes_Setup_Research.md` — verbatim Hermes install/config/troubleshooting research for the pre-read
- `research/hermes_buildathon_handbook_raw.txt` — full raw extracted handbook text (~880 lines), kept for reference/audit
- `research/03_Agent_Idea_Catalog.md` — Round 2 tabular agent idea catalog, 51 vetted ideas across all 7 domains
- `research/raw_agent_catalog_round2.json` — full raw JSON (all 81 ideas + verdicts), for audit
