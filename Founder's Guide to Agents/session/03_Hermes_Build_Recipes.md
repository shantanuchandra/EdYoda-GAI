# Hermes Build Recipes — Founder's Guide to Agents

> ⚠️ **FACILITATOR NOTE — READ BEFORE SATURDAY:** These recipes are written from Hermes's documentation and README, not from a live end-to-end dry-run (no dry-run was performed — see source-of-truth doc §5.7 for why). **Someone must run through both recipes on a real Hermes instance before Saturday** to confirm the exact commands, config keys, and tool names below are accurate. Treat every command in this doc as "best available from docs, unverified in practice" until that dry-run happens. If commands differ once tested, update this doc and note what changed.

This doc has two parts — one recipe per agent. Both assume you've already completed the pre-read: Hermes installed, OpenAI configured, Telegram wired, checkpoint passed.

---

## Part 1 — Weekly Repo/Product Digest Agent

**What you're building:** an agent that reads your GitHub repo's recent commits and writes a plain-language "what shipped this week" summary.

### Step 1 — Give Hermes access to your repo

Hermes needs to read your GitHub repo. The most direct path is a GitHub personal access token (read-only is enough).

1. Generate a token: GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens. Scope: **read-only, Contents + Metadata**, limited to the one repo you're using today.
2. Add it to `~/.hermes/.env`:
   ```
   GITHUB_TOKEN=ghp_...
   ```
3. Confirm Hermes can see your tools: inside a chat, run `/reload-mcp` if you've just added a GitHub MCP server, or check `hermes skills browse` for a built-in git/GitHub tool.

*(If Hermes's built-in tool set includes a native git/GitHub reader, prefer that over a manual token setup — check `hermes skills browse` first. This is one of the things the pre-Saturday dry-run needs to confirm: which path is actually simplest on the current Hermes build.)*

### Step 2 — Point it at your repo

Message your Hermes bot on Telegram:

> "Look at the last 7 days of commits on `<your-github-username>/<your-repo-name>`. List what changed."

Confirm it returns real commit data — actual commit messages and file changes, not a generic non-answer. If it can't reach the repo, check:
- Token scope includes the right repo
- Repo isn't private in a way the token doesn't cover
- `hermes status` still shows a healthy connection

### Step 3 — Write the digest prompt

This is the part that turns raw commits into something a non-technical co-founder or investor could read. Send this to your bot, adjusting the repo name:

> "You just read the commits on `<repo>`. Now write a 3-5 sentence summary of what shipped this week, in plain English. No git jargon — explain it like you're telling a co-founder who doesn't read code what's new. Group related commits into one story if they're part of the same feature."

Iterate on this prompt live — if the output still sounds like commit messages, add: *"Rewrite this as if you're explaining it to someone outside the company for the first time."*

### Step 4 — (Optional, if time allows) Make it recurring

In production, this agent should run weekly without you asking. Check if your Hermes build supports a cron-style schedule:

> "Set up a weekly schedule: every Monday at 9am, do the last-7-days commit summary for `<repo>` and send it to me here."

Hermes has a built-in cron scheduler per its docs — the exact command may be `hermes schedule add` or a conversational instruction like the one above. **Confirm the actual mechanism during the pre-Saturday dry-run** and update this step.

### Done-state checklist

- [ ] Hermes successfully read real commit data from your repo
- [ ] The digest reads like plain English, not git log output
- [ ] (Stretch) A recurring schedule is configured

### If your repo has no recent commits

Ask your facilitator for the shared fallback demo repo. This is a rehearsal of the pattern, not a test of your shipping velocity this week.

---

## Part 2 — Investor Qualification + Outreach Agent

**What you're building:** an agent that takes your round description, searches for matching investors, scores them, and drafts personalized outreach directly into your Gmail drafts — never sent automatically.

### Step 1 — Give Hermes access to Gmail

1. Set up Gmail access per Hermes's gateway/tool docs — check `hermes gateway setup` for a Gmail/Google option, or `hermes skills browse` for a Gmail MCP tool.
2. Confirm it can create (not send) a draft:

> "Create a Gmail draft addressed to me, subject 'Hermes test', body 'This is a test draft.' Do not send it."

Check your Gmail drafts folder. If nothing appears, this is the most likely failure point of this whole build — flag your facilitator immediately, don't sit stuck.

### Step 2 — Describe your round

Message your bot with your own round details from the pre-read:

> "I'm raising a [stage] round in [sector], based in [geography], looking for [check size] checks. Here's anything else that matters: [your notes]."

### Step 3 — Live web-search for matching investors

> "Search for active [stage] investors in [sector] who invest in [geography]-based startups, with check sizes around [your target]. Give me a list of 5-8 real, currently active funds or investors with their typical check size, stage focus, and a source link for each."

**Watch for:** results that are generic, outdated, or don't cite a real source. If this happens — **switch immediately to the fallback list in the appendix below.** This isn't a sign anything is broken; live search coverage varies a lot by sector and geography.

### Step 4 — Score the matches

> "For each investor/fund you just found, score how well they fit my round on a scale of 1-3 (low/medium/high fit) based on stage, sector, geography, and check size match. Explain the score in one sentence."

### Step 5 — Draft personalized outreach

For your top 2-3 matches:

> "For [investor/fund name], draft a short, personalized outreach email. Reference what specifically about their thesis or portfolio makes them a fit for my round. Keep it under 150 words. Create it as a Gmail draft — do not send it."

Check your Gmail drafts folder for the result.

### Done-state checklist

- [ ] Gmail draft-creation test succeeded (Step 1)
- [ ] Got either live search results or switched cleanly to the fallback list
- [ ] At least one scored investor match
- [ ] At least one personalized draft sitting in Gmail drafts, unsent

### If live search underperforms

Switch to the appendix below. Feed the same list format into Step 4 (scoring) and Step 5 (drafting) instead of live search results.

---

## Appendix — Curated Fallback Investor List

Real, independently sourced seed/pre-seed investors, verified via official fund sites and dated press coverage (research conducted 2026-07-16). Feed this list into Steps 4-5 above if live search underperforms for your round/sector. Confidence notes are included — weigh "medium" entries with a little more scrutiny than "high."

**Sourcing note:** check-size figures marked "third-party" come from aggregators (Tracxn, Crunchbase, PitchBook) rather than the fund's own published materials — still real funds, just slightly less precise on the exact number.

### India — Generalist, Seed/Pre-Seed

| Fund | Check Size | Stage | Geography | Confidence |
|---|---|---|---|---|
| **Blume Ventures** | $1M–$3M (seed/pre-Series A) | Seed, pre-Series A | India | High — official Fund V announcement, Oct 2025 |
| **India Quotient** | $500K–$2.5M seed; $150K–$500K via "First Cheque" pre-seed | Pre-seed, seed | India | High — official site + Dec 2025 press on active 5th fund |
| **Stellaris Venture Partners** | $500K–$5M typical (range up to $10M) | Seed, Series A | India | Medium-high — stage/sector official, check size third-party |
| **3one4 Capital** | $0.5M–$5M, median $1.5M–$3M | Early-stage/seed | India | Medium-high — stage/sector official, check size third-party |
| **Titan Capital** | $300K–$500K | Seed (often first institutional check) | India | High — official site + Crunchbase, 13 new investments confirmed June 2026 |
| **100X.VC** | ₹1.25 Cr (~$150K) via iSAFE notes | Pre-seed, seed | India | High — official site, active cohort (Class 07, 2025) |
| **Antler India** | ~₹4 Cr (~$470K) for ~11% equity | Pre-seed | India (Bangalore Residency) | High — official page, confirms AI-leaning thesis but open to other sectors |

### India — Sector-Specific

| Fund | Check Size | Stage | Sector | Confidence |
|---|---|---|---|---|
| **pi Ventures** | $250K–$3M | Seed, Series A | AI/ML, deep tech, robotics | High — official site states range directly |
| **Speciale Invest** | ~$500K–$1M | Pre-seed, seed | Deep tech (space, defense, semiconductors, AI infra) | High — official site + third-party corroboration |
| **Fireside Ventures** | $1M–$12M | Early-stage/seed | Consumer/D2C (F&B, beauty, wellness) | Medium-high — press-sourced check size, official site confirms sector |
| **Sauce.vc** | ₹4–5 Cr (~$480K–$600K) | Pre-seed | Consumer/D2C only | High — dedicated feature article + official site |

### India — Angel Networks / Syndicates

| Network | Check Size | Stage | Geography | Confidence |
|---|---|---|---|---|
| **Indian Angel Network (IAN)** | Seed avg $679K; Series A avg $3.15M | Pre-seed, seed, Series A | India-primary | High — Tracxn, 24 deals YTD 2026 |
| **We Founder Circle** | $300K–$1M | Seed through Series B | India-based, 80+ countries | High — official site + PitchBook, active April 2026 deal |
| **Venture Catalysts** | Angel avg $823K; seed avg $1.1M | Angel/seed, extends to Series A | Pan-India + Hong Kong, Qatar | High — Tracxn, 9 investments YTD June 2026 |

### Global — Relevant to Indian Founders (with caveats)

| Fund | Check Size | Stage | Geography Caveat | Confidence |
|---|---|---|---|---|
| **Antler** (global) | ~$470K via India Residency | Pre-seed | Direct India program (Bangalore) — no flip required | High |
| **SOSV** | $250K–$550K (HAX/IndieBio programs) | Pre-seed | Global, physical India office (Pune) — deep tech only | High |
| **Village Global (Velocity)** | Up to $1M | Pre-seed, seed | Explicitly geography-agnostic, "anywhere in the world" | Medium-high |
| **Y Combinator** | $500K standard ($125K + $375K SAFE) | Pre-seed (3-month program) | ⚠️ Requires re-incorporating in US/Canada/Cayman/Singapore — not a direct-to-India-entity option | High |

**How to use this table live:** ask the founder for their stage + sector + geography, scan the matching section(s) above, and feed 3-5 relevant rows into Step 4 (scoring) and Step 5 (drafting) in place of live search results.

**Full research trail:** five parallel research threads (India micro-VC, India seed generalist, India sector-specific, India angel networks, global/US funds) were run and cross-verified against official fund sites and dated press coverage on 2026-07-16. Entries with weaker sourcing (single aggregator, no official confirmation) were deliberately dropped rather than included — see source-of-truth doc §5.8 for the full drop list if a specific fund is expected here and missing.

---

## General Troubleshooting (both agents)

| Problem | Fix |
|---|---|
| Hermes doesn't respond at all | Check `hermes gateway` is still running in a terminal — it must stay open |
| Tool/skill not showing up after adding a token | Restart Hermes, or run `/reload-mcp` inside chat |
| Response is generic / ignores your specific repo or round | Be more explicit in the prompt — name the exact repo, exact round terms, don't rely on Hermes inferring context from earlier messages |
| Gmail or GitHub auth fails | Double check token scope and that it's in `~/.hermes/.env` with no trailing spaces or quotes issues |
