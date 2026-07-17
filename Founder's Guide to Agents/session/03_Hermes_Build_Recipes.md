# Hermes Build Recipes — Founder's Guide to Agents

> **FACILITATOR NOTE — DRY-RUN COMPLETE (2026-07-17):** Both recipes below have been verified end-to-end on a real Hermes instance (v0.18.2, macOS, OpenAI GPT-5.6-sol, Telegram delivery). The "challenges + solutions" sections document what actually broke and exactly how it was fixed. Use these when founders hit the same walls — they will.

This doc has two parts — one recipe per agent.

---

## Part 1 — Weekly Repo/Product Digest Agent

**What you're building:** an agent that reads your GitHub repo's recent commits and writes a plain-language "what shipped this week" summary — for yourself, a non-technical co-founder, or as raw material for an investor update. Once scheduled, it runs every Monday morning without you touching it.

---

### Step 1 — Confirm Hermes can see your GitHub

Open a terminal and run:

```bash
gh auth status
```

You should see your GitHub account logged in with `repo` scope. If you see "not logged in", run:

```bash
gh auth login
```

Follow the browser flow. When it asks for scopes, make sure `repo` (read access) is checked.

> **Challenge we hit:** The Hermes `.env` had a `GITHUB_TOKEN` that had expired ("Bad credentials"). The `gh` CLI had a separate, valid token in the system keychain — that's the one that actually works. **Solution:** always test with `gh auth status` first, not by assuming the `.env` token is live.

---

### Step 2 — Confirm your repo is accessible

```bash
gh repo view <your-github-username>/<your-repo-name> --json name,isPrivate,updatedAt
```

You should see the repo name and metadata come back. If you get a 404:
- Double-check the exact repo name (case-sensitive)
- If the repo is private, make sure your token has `repo` scope (not just `public_repo`)

> **Challenge we hit:** The commits endpoint returned 404 even though the repo existed — because the repo had no commits on `main` (it was initialized without a first commit). The branches endpoint revealed it. **Solution:** always confirm the branch name first — `gh api "repos/<owner>/<repo>/branches" --jq '.[].name'`. If your default branch is `master` instead of `main`, use `master` in the script.

---

### Step 3 — Create the digest script

This script does the actual data-fetching. Create the file:

```bash
mkdir -p ~/.hermes/scripts
```

Then create `~/.hermes/scripts/all_repos_digest.sh` with this content:

```bash
#!/bin/bash
# Fetches last 7 days of commits across ALL your repos.
# Outputs per-repo commit lists for the agent to summarise.

OWNER="<your-github-username>"
SINCE=$(date -u -v-7d "+%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date -u -d "7 days ago" "+%Y-%m-%dT%H:%M:%SZ")
TODAY=$(date -u "+%Y-%m-%d")

echo "=== Weekly Repo Digest — All Repos for @$OWNER ==="
echo "Period: last 7 days (since $SINCE)"
echo "Generated: $TODAY"
echo ""

REPOS=$(gh api "users/$OWNER/repos" -X GET -f sort=updated -f per_page=50 \
  --jq '.[].name' 2>/dev/null)

ACTIVE_COUNT=0

for REPO in $REPOS; do
  COMMITS=$(gh api "repos/$OWNER/$REPO/commits" -X GET \
    -f sha=main -f since="$SINCE" -f per_page=50 \
    --jq '.[] | "[\(.sha[0:7])] \(.commit.author.date[0:10]) — \(.commit.message | split("\n")[0])"' \
    2>/dev/null)

  if [ -z "$COMMITS" ]; then
    COMMITS=$(gh api "repos/$OWNER/$REPO/commits" -X GET \
      -f sha=master -f since="$SINCE" -f per_page=50 \
      --jq '.[] | "[\(.sha[0:7])] \(.commit.author.date[0:10]) — \(.commit.message | split("\n")[0])"' \
      2>/dev/null)
  fi

  if [ -n "$COMMITS" ]; then
    ACTIVE_COUNT=$((ACTIVE_COUNT + 1))
    COUNT=$(echo "$COMMITS" | wc -l | tr -d ' ')
    echo "--- REPO: $REPO ($COUNT commits) ---"
    echo "https://github.com/$OWNER/$REPO"
    echo "$COMMITS"
    echo ""
  fi
done

if [ "$ACTIVE_COUNT" -eq 0 ]; then
  echo "No commits found across any repo in the last 7 days."
else
  echo "=== END: $ACTIVE_COUNT repo(s) had activity this week ==="
fi
```

Also create `~/.hermes/scripts/repo_menu.sh` for on-demand single-repo lookups:

```bash
#!/bin/bash
# Usage:
#   repo_menu.sh            — list all repos with numbers
#   repo_menu.sh <reponame> — fetch 7-day commits for that specific repo

OWNER="<your-github-username>"
SINCE=$(date -u -v-7d "+%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date -u -d "7 days ago" "+%Y-%m-%dT%H:%M:%SZ")

REPOS=$(gh api "users/$OWNER/repos" -X GET -f sort=updated -f per_page=50 \
  --jq '.[] | [.name, .updated_at[0:10]] | join("|")' 2>/dev/null)

if [ -z "$1" ]; then
  echo "=== @$OWNER GitHub Repos ==="
  echo "Reply with a number or repo name to get the 7-day digest."
  echo ""
  INDEX=1
  while IFS='|' read -r NAME UPDATED; do
    echo "$INDEX. $NAME  (last updated: $UPDATED)"
    INDEX=$((INDEX + 1))
  done <<< "$REPOS"
  echo ""
  echo "Or say 'all' for a digest of every repo with activity this week."
else
  REPO="$1"
  echo "=== 7-day digest: $REPO ==="
  echo "Repo: https://github.com/$OWNER/$REPO"
  echo "Period: last 7 days (since $SINCE)"
  echo ""

  COMMITS=$(gh api "repos/$OWNER/$REPO/commits" -X GET \
    -f sha=main -f since="$SINCE" -f per_page=50 \
    --jq '.[] | "[\(.sha[0:7])] \(.commit.author.date[0:10]) — \(.commit.message | split("\n")[0])"' \
    2>/dev/null)

  if [ -z "$COMMITS" ]; then
    COMMITS=$(gh api "repos/$OWNER/$REPO/commits" -X GET \
      -f sha=master -f since="$SINCE" -f per_page=50 \
      --jq '.[] | "[\(.sha[0:7])] \(.commit.author.date[0:10]) — \(.commit.message | split("\n")[0])"' \
      2>/dev/null)
  fi

  if [ -z "$COMMITS" ]; then
    echo "No commits in the last 7 days on this repo."
  else
    COUNT=$(echo "$COMMITS" | wc -l | tr -d ' ')
    echo "$COMMITS"
    echo ""
    echo "--- Total: $COUNT commit(s) ---"
  fi
fi
```

Make both scripts executable:

```bash
chmod +x ~/.hermes/scripts/all_repos_digest.sh
chmod +x ~/.hermes/scripts/repo_menu.sh
```

Test the menu script before wiring anything:

```bash
~/.hermes/scripts/repo_menu.sh
```

You should see a numbered list of your repos. If you see an error, check `gh auth status` again.

---

### Step 4 — Schedule the weekly digest

```bash
hermes cron create \
  "0 9 * * 1" \
  "The script below shows all commits across every GitHub repo in the last 7 days. Write a plain-English weekly digest — one short paragraph per repo that had activity. Group commits into themes. Skip repos with no commits. Lead with the most active repo. No git jargon." \
  --name "Weekly Repo Digest — All Repos" \
  --script all_repos_digest.sh \
  --deliver telegram \
  --skill github-repo-management
```

This schedules a digest every **Monday at 9am** delivered to Telegram.

> **Challenge we hit:** The `--deliver telegram` flag resolved to the wrong target — `TELEGRAM_HOME_CHANNEL` in `.env` was set to a username string (`shantanuchandra`) but Telegram requires a numeric chat ID. The cron job ran and produced a perfect digest, then failed at the delivery step with "Chat not found". **Solution:** send any message to your Hermes bot on Telegram first (say `/start` or `hi`). This makes the bot aware of your chat. Then find your numeric chat ID in the gateway log:

```bash
grep "Blocked unauthorized user" ~/.hermes/logs/gateway.log | tail -3
```

The number after "user" is your chat ID. Update `.env`:

```
TELEGRAM_ALLOWED_USERS=<your-numeric-id>
TELEGRAM_HOME_CHANNEL=<your-numeric-id>
```

Then restart the gateway:

```bash
hermes gateway restart
```

And re-run the job to confirm delivery:

```bash
hermes cron run <job-id>
```

> **Second challenge:** Even after seeing the bot on Telegram, it replied "Blocked unauthorized user" — our user ID was not in the allowlist. The root cause: Hermes's `TELEGRAM_ALLOWED_USERS` only accepts numeric user IDs, not usernames. A username string passes silently but blocks every incoming message. **Solution:** use the numeric ID from the log (same fix as above).

---

### Step 5 — Enable on-demand repo lookups via Telegram

Add standing instructions to Hermes's persistent system prompt so it knows how to handle repo requests interactively. Edit `~/.hermes/SOUL.md` and append the following two blocks — one for Agent 1 (repo digest) and one for Agent 2 (investor outreach):

```
## GitHub Repo Digest — standing instructions

When the user asks for a repo digest, repo update, or "what shipped", follow this routing:

"show my repos" / "list repos" / "repo menu":
Run: ~/.hermes/scripts/repo_menu.sh
Present the numbered list. Tell the user to reply with a number or repo name.

User replies with a number or a repo name:
Run: ~/.hermes/scripts/repo_menu.sh <reponame>
Write a 3-5 sentence plain-English digest of what shipped in the last 7 days.
Group commits into themes. No git jargon.

"digest all" / "all repos" / "everything this week":
Run: ~/.hermes/scripts/all_repos_digest.sh
Write one short paragraph per active repo. Skip repos with no activity.
```

Now in Telegram you can message your bot:
- `"show my repos"` → numbered list
- Reply `"2"` or `"cardcompass"` → 7-day digest for that repo
- `"digest all"` → summary of every repo with activity

> **Design decision made:** Telegram's native inline buttons cap at 4 choices. With 6 repos, buttons don't work cleanly. Number-reply navigation was chosen instead — it scales to any number of repos and is easier to explain to a room of founders.

Also append the following block to `~/.hermes/SOUL.md` for the Pragya → Varta pipeline. This gives Hermes standing instructions for both the short regional command format and the long-form round description:

```
## Pragya → Varta: Investor Qualification + Outreach pipeline

AGENTS: Pragya (प्रज्ञा, intelligence) handles search + scoring.
        Varta (वार्ता, communication) handles drafting + Gmail save.
This is a SEQUENTIAL pipeline. Complete each stage before the next.

─────────────────────────────────────────────
TRIGGER RECOGNITION
─────────────────────────────────────────────

SHORT COMMAND FORMAT (primary trigger):
Pattern: "get my <APP> app a <STAGE> investor from <REGION> region with checks around <CHECK>"
Example: "get my CardCompass app a pre-seed investor from Dubai region with checks around $500K"

When you receive this pattern, extract:
  APP     = the app/company name (e.g. CardCompass)
  STAGE   = the round stage (pre-seed / seed / Series A / Series B)
  REGION  = the geography (e.g. Dubai, India, Singapore, Global, Southeast Asia)
  CHECK   = the target check size (e.g. $500K, ₹4Cr, $1M–$2M)

Then proceed immediately to STEP 2 — do not ask for more information.

LONG-FORM FORMAT (fallback):
If the message describes a round without matching the short pattern, extract the same
four values (APP, STAGE, REGION, CHECK) from the description, confirm them in one line,
and proceed to STEP 2.

If any of STAGE, REGION, or CHECK is missing, ask for only the missing items before
proceeding. Ask for all missing items in ONE message, not separately.

─────────────────────────────────────────────
STEP 1 — Confirm extracted parameters (optional, skip if all four are clear)
─────────────────────────────────────────────
Reply: "Running Pragya for [APP] — [STAGE] round, [REGION], checks ~[CHECK]. Starting search..."
Then immediately begin STEP 2.

─────────────────────────────────────────────
STEP 2 (PRAGYA) — Two-pass investor search
─────────────────────────────────────────────
Run BOTH searches. Do not proceed to scoring until both are complete.

Search 1 — broad:
"Search for active [STAGE] investors in [REGION] who invest in startups in the same
space as [APP]. List 5-8 currently active funds or investors. For each: name, direct
source link (fund website or dated press article — not Crunchbase/Tracxn alone), typical
check size, stage focus, geography. Exclude any result without a direct source link."

Search 2 — recency-anchored (run immediately after Search 1):
"Now search for funds that made investments in the [APP] sector/space in the last 12
months, OR announced a new fund targeting [REGION] in the last 18 months. Add any new
names not already on the list. Same format."

Combine results, deduplicate by fund name. Proceed to STEP 3.

─────────────────────────────────────────────
STEP 3 (PRAGYA) — Per-criterion scoring
─────────────────────────────────────────────
For EACH investor on the combined list, score these four criteria independently:

  Stage fit   → HIGH / MED / LOW / UNKNOWN — does their typical stage match [STAGE]?
  Sector fit  → HIGH / MED / LOW / UNKNOWN — portfolio evidence in [APP]'s space?
  Geography   → HIGH / MED / LOW / UNKNOWN — invests in [REGION]-based companies, no flip?
  Check size  → HIGH / MED / LOW / UNKNOWN — target check [CHECK] within their range?

Overall fit: 3 = all HIGH, no UNKNOWN dealbreakers | 2 = mixed | 1 = any LOW

Rules:
  - Cite specific source evidence per criterion. If evidence is missing, mark UNKNOWN.
  - Do NOT guess or infer. UNKNOWN is better than a wrong LOW or HIGH.
  - Do NOT pass any investor with an overall score of 1 to Varta.
  - Do NOT pass any investor with LOW on Stage or Geography to Varta (these are dealbreakers).

─────────────────────────────────────────────
STEP 4 (VARTA) — Draft personalized outreach
─────────────────────────────────────────────
Draft ONLY for investors with overall score 3, or 2 with no LOW on Stage/Geography.

For each qualifying investor, draft an email meeting ALL of these requirements:
  - Under 150 words
  - First sentence: ONE specific sourced fact about this investor — a portfolio company name,
    a recent investment they made, or an exact quote from their thesis. NOT a generic claim
    like "you invest in [sector]." If no specific fact is sourced, do not draft.
  - Second sentence: "[APP] is [one-line description]. We are raising a [STAGE] round,
    targeting [CHECK] checks."
  - Final sentence: A single ask — "Would you have 20 minutes this week for a call?"
  - No: "I hope this finds you well," "I'm reaching out because," superlatives, buzzwords.

─────────────────────────────────────────────
STEP 5 (VARTA) — Save as Gmail draft
─────────────────────────────────────────────
For each draft, run:
  python3 ~/.hermes/scripts/gmail_draft_standalone.py \
    --to [founder's own email as placeholder — never an investor's email unless confirmed] \
    --subject "Introduction: [APP] — [STAGE] round, [CHECK]" \
    --body "[draft text]"

After each draft is saved, note the draft_id from the JSON response.

─────────────────────────────────────────────
FINAL REPLY (send to Telegram after all drafts saved)
─────────────────────────────────────────────
Reply in this format:
"Pragya → Varta complete.

Found [N] investors. [M] qualified for outreach (score 2+ on all key criteria).

[For each draft saved:]
• [Fund name] — Score: [overall]/3 (Stage: [H/M/L], Sector: [H/M/L], Geography: [H/M/L], Check: [H/M/L])
  Draft saved. Verify before sending: [one specific thing to verify, e.g. 'Confirm fund is still active — last confirmed press: Nov 2025']

Check your Gmail Drafts folder. Edit the subject line to add your name before sending."

─────────────────────────────────────────────
ABSOLUTE RULES — NEVER VIOLATE
─────────────────────────────────────────────
NEVER send email. NEVER call users.messages.send or users.drafts.send.
Only drafts().create() is permitted. Drafts go to the FOUNDER'S OWN email as recipient
placeholder unless they explicitly provide an investor's contact email.
NEVER invent investor names, fund sizes, or portfolio companies.
NEVER draft for an investor with a sourced LOW on Stage or Geography.
```

---

### Done-state checklist

- [ ] `gh auth status` shows your account with `repo` scope
- [ ] Menu script lists your repos correctly
- [ ] Test run of the cron job produced a real plain-English digest
- [ ] Digest delivered to your Telegram
- [ ] Typing `"show my repos"` in Telegram gives a numbered list
- [ ] Replying with a repo name gives a 7-day summary
- [ ] Weekly schedule confirmed (Monday 9am)

---

## Part 2 — Pragya + Varta: Investor Qualification + Outreach Agents

**Agent names:**
- **Pragya** (प्रज्ञा — *intelligence, insight*): finds and scores matching investors
- **Varta** (वार्ता — *communication, discourse*): drafts and saves the personalized outreach email

These are two stages of the same pipeline. Together: **Pragya → Varta**.

**What you're building:** a two-stage agent pipeline triggered from Telegram. You describe your app, round stage, region, and check size in a single Telegram message. Pragya runs a live two-pass web search, scores each investor per criterion, and hands the top matches to Varta. Varta drafts a personalized outreach email anchored to specific investor evidence and saves it to your Gmail Drafts — never sent automatically. You read, validate, and send it yourself.

---

### Step 1 — Set up Google OAuth (one-time)

Hermes ships a Google Workspace skill with an OAuth helper script. This step gives it permission to create Gmail drafts on your behalf.

**1a — Get your Google Cloud credentials**

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → select or create a project
2. Navigate to **APIs & Services → Credentials**
3. Click **Create Credentials → OAuth client ID → Desktop App**
4. Download the generated JSON file — it will be named something like `client_secret_<project-id>.apps.googleusercontent.com.json`
5. Copy it into the Hermes config folder:

```bash
cp ~/Downloads/client_secret_*.json ~/.hermes/google_client_secret.json
```

**1b — Enable the Gmail API**

In the same Google Cloud Console, go to **APIs & Services → Library**, search for "Gmail API", and click **Enable**.

> **Challenge we hit:** We had the OAuth client set up but the API itself was not enabled. When `gmail_draft.py` ran it returned `HttpError 403 — Gmail API has not been used in project <id>`. The fix is a single click in the Library page — took 30 seconds but would have killed momentum in the room. Enable this before the OAuth flow, not after.

**1c — Add your email as a test user**

If your OAuth app is in "Testing" mode (it will be, by default), you must explicitly whitelist your own Google account:

1. In Google Cloud Console → **APIs & Services → OAuth consent screen**
2. Scroll to **Test users → Add Users**
3. Add the Gmail address you'll be authenticating with

> **Challenge we hit:** Without this step, the browser OAuth screen shows "Access blocked: [your-app-name] has not completed the Google verification process" and blocks you entirely. Adding your own email as a test user takes 10 seconds and resolves it immediately.

**1d — Run the Hermes OAuth setup**

```bash
cd ~/.hermes/hermes-agent/skills/productivity/google-workspace/scripts
python3 setup.py --client-secret ~/.hermes/google_client_secret.json
```

This generates an auth URL. Copy it, open it in a browser, sign in with your Google account, grant the requested permissions, and copy the authorization code from the redirect URL back to the terminal.

> **The auth session expires in ~5 minutes** — complete the browser flow and run `--auth-code` promptly. If you get "No pending OAuth session found", just re-run `--auth-url` to get a fresh URL and start again.

```bash
python3 setup.py --auth-code <paste-code-here>
```

Verify the token was saved correctly **and check which scope was granted**:

```bash
python3 setup.py --check
```

You should see `AUTHENTICATED` and a list of granted scopes. If you see `NOT AUTHENTICATED`, re-run steps 1d from the top.

> **Critical — check the scope shown:** You need `https://www.googleapis.com/auth/gmail.modify` in the scope list, **not** `https://www.googleapis.com/auth/gmail.compose`. Here's why this matters: `gmail.compose` is commonly used for draft creation but it actually grants "Manage drafts **and send emails**" — it includes send capability. `gmail.modify` is the correct minimum scope: it covers `drafts.create` but has no send path, giving you a structural guarantee that this agent cannot auto-send. If `setup.py` granted `gmail.compose`, re-run the OAuth flow after updating the scope in `setup.py`'s configuration, or use the standalone script in the appendix which requests `gmail.modify` directly.

---

### Step 2 — Confirm Gmail draft creation works

Hermes's built-in `google_api.py` does not expose a draft subcommand — its email tools cover send and read, not create-draft. We use a custom helper script instead:

```bash
python3 ~/.hermes/scripts/gmail_draft.py \
  --to your.email@gmail.com \
  --subject "Hermes test draft" \
  --body "This confirms Gmail draft creation is working. Do not send."
```

You should see:

```json
{
  "status": "draft_created",
  "draft_id": "r-...",
  "message_id": "..."
}
```

Check your Gmail **Drafts** folder — the message should be there.

> **What this script does:** it imports Hermes's own `build_service` helper (from `google_api.py`) for auth, then calls `service.users().drafts().create()` directly. The script is at `~/.hermes/scripts/gmail_draft.py`. Source is in the appendix if you need to recreate it.

---

### Step 3 — Trigger Pragya via Telegram (regional command format)

Pragya understands a natural-language command format that encodes your app name, round stage, region, and check size in a single Telegram message. This is the **primary trigger** — one message starts the full Pragya → Varta pipeline.

**Command format:**
```
get my <app-name> app a <stage> investor from <region> region with checks around <check-size>
```

**Examples:**
```
get my CardCompass app a pre-seed investor from Dubai region with checks around $500K
get my Buildwise app a seed investor from India region with checks around $1M–$2M
get my Shoploop app a Series A investor from Singapore region with checks around $3M
```

**What Hermes does when it receives this command** (wired via SOUL.md — see Step 5):
1. Extracts: app name = `CardCompass`, stage = `pre-seed`, region = `Dubai`, check size = `$500K`
2. Runs Pragya's two-pass search — first broad, then recency-anchored for `Dubai`-active `pre-seed` funds
3. Scores each result per criterion (Stage / Sector / Geography / Check size)
4. Passes top matches (score 3, or 2 with no LOW on Stage/Geography) to Varta
5. Varta drafts an outreach email that mentions `CardCompass` specifically, saves to Gmail Drafts
6. Replies on Telegram: "Done — N draft(s) saved to your Gmail Drafts. Top match: [fund name], score 3/3. Verify: [one specific thing to check before sending]."

**If you want to describe your round in a longer form** (when detail matters), send this to Telegram instead:
> "I'm raising a [stage] round for [app-name] in [sector], based in [geography], looking for [check size] checks. Here's anything else that matters: [your notes]."

Both formats trigger the same Pragya → Varta pipeline.

---

### Step 4 — Live web-search for matching investors

Send two searches in sequence — a broad one, then a recency-anchored one. The second catches recent fund announcements and portfolio updates the broad query often misses:

**Search 1 — broad match:**
> "Search for active [stage] investors in [sector] who invest in [geography]-based startups, with check sizes around [your target]. Give me a list of 5-8 real, currently active funds or investors. For each: investor or fund name, a direct source link (fund website or dated press article, not a listicle), typical check size, stage focus, and geography. Do not include any investor without a direct source link."

**Search 2 — recency filter (run immediately after):**
> "Now search again with a focus on recent activity: funds that made investments in [sector] in the last 12 months, or announced a new fund in the last 18 months. Add any new names not already in your previous list. Same format — name, source link, check size, stage, geography."

Watch for results that are generic, cite no real source, or only link to aggregator sites (Crunchbase, Tracxn) rather than the fund's own site or a dated press article. **If this happens — switch immediately to the fallback list in the appendix below.** Live search coverage varies by sector and geography; the fallback exists for exactly this.

> **Why two searches:** A single broad query frequently returns the same 5-6 widely-covered funds regardless of sector specificity. The recency-anchored follow-up surfaces funds that have signaled active investment intent recently — which is what a founder actually wants to know before sending outreach. The two-pass approach consistently surfaces 2-3 names the first query misses.

---

### Step 5 — Score the matches

Score each criterion separately — this prevents a strong stage fit from masking a geography mismatch:

> "For each investor/fund on your list, evaluate fit across these four criteria using my round facts above. Score each criterion independently as HIGH / MED / LOW, then give an overall fit rating (1 = weak, 2 = moderate, 3 = strong):
>
> 1. **Stage fit** — does their typical investment stage match mine?
> 2. **Sector fit** — do they actively invest in my sector, with portfolio evidence?
> 3. **Geography** — do they invest in [geography]-based companies, or require a flip?
> 4. **Check size** — does my target check size fall within their range?
>
> For each, cite the specific source evidence (not inference). If you don't have sourced evidence for a criterion, mark it UNKNOWN rather than guessing."

> **Why per-criterion scoring:** A single 1-3 overall score lets a strong match on one dimension mask a dealbreaker on another (e.g., right stage, wrong geography). Scoring each criterion separately surfaces the specific reason a match is weak — which is also the thing to address in the outreach email.

---

### Step 6 — Draft personalized outreach

For your top 2-3 matches (score 3 overall, or 2 with no LOW on stage/geography):

> "For [investor/fund name], draft a short outreach email. Requirements:
> - Under 150 words
> - Open with one specific, sourced reason they fit my round — cite their portfolio, thesis statement, or a recent investment, not a generic statement about their sector focus
> - State my round facts in one sentence (stage, sector, check size)
> - One clear ask — a 20-minute call, not a pitch deck attachment
> - No superlatives, no 'I'm reaching out because...', no 'I hope this finds you well'
> Create it as a Gmail draft using the draft creation tool. Do not send it. After creating the draft, tell me what specific detail I should verify before sending."

Hermes will call `gmail_draft.py` via its tool layer. Check your **Gmail Drafts** folder for the result.

> **Why source-anchored opening:** Generic openings ("I admire your firm's focus on SaaS") are filtered immediately by investors who receive dozens of outreach emails per week. Anchoring the opening to a specific portfolio company, recent investment, or exact thesis quote forces the research step and signals the founder did their homework — the single highest-leverage change in cold outreach quality.

---

### Done-state checklist

- [ ] `google_client_secret.json` in `~/.hermes/`
- [ ] Gmail API enabled in Google Cloud Console
- [ ] Your email added as a test user on the OAuth consent screen
- [ ] `setup.py --check` returns `AUTHENTICATED`
- [ ] **Scope confirmed:** `gmail.modify` (not `gmail.compose`) in the granted scope list
- [ ] `gmail_draft.py` test returned `draft_created` and the draft appeared in Gmail
- [ ] Two-pass search completed (broad + recency-anchored)
- [ ] Got either live search results or switched cleanly to the fallback list
- [ ] At least one investor scored per-criterion (stage / sector / geography / check size)
- [ ] At least one personalized draft sitting in Gmail Drafts, unsent, with a source-anchored opening

---

## Hermes Dashboard — Local Monitor + Manual Trigger

**File:** `session/hermes_dashboard.py`  
**Run:** `python3 session/hermes_dashboard.py`  
**Opens at:** `http://localhost:7890`

The dashboard is a zero-dependency Python 3 web UI that gives you a visual control panel for both agents. No npm, no pip, no external libraries — stdlib only.

### What it does

**Drishti card (left, indigo)**
- Shows last run timestamp and IDLE / Running / OK / Error badge
- Editable Repo Owner field — pre-populated from `~/.hermes/drishti_config.json` on load
- Shows scheduled next run (Monday 9:00 AM)
- "Run Now" button → calls `hermes cron run "Weekly Repo Digest — All Repos"` → output streams into the collapsible terminal pane below

**Pragya + Varta card (right, cyan)**
- Four parameter fields: App Name, Round Stage (select), Region, Check Size
- Live-updating "Generated command" preview box — updates as you type. Shows the exact string that will be sent to Hermes:
  ```
  get my <app> app a <stage> investor from <region> region with checks around <checkSize>
  ```
- "Trigger Pragya → Varta" button → sends the command to `hermes chat` → output appears in the terminal pane

### Startup checklist

1. Run: `python3 session/hermes_dashboard.py`
2. Expected terminal output:
   ```
   ✓ Python 3.x found
   ✓ Hermes found (hermes version x.x.x)
   Starting Hermes Dashboard on http://localhost:7890
   Open this URL in your browser to monitor and trigger your agents.
   Press Ctrl+C to stop.
   ```
3. Open `http://localhost:7890` in Chrome or Safari
4. If Hermes is not installed yet, the script warns but still starts — the dashboard UI loads and becomes functional once Hermes is set up via `session/00_Pre_Read.md`

### Config persistence

Parameter values (repo owner, app name, stage, region, check size) are saved to `~/.hermes/drishti_config.json` and `~/.hermes/pragya_config.json` on every trigger. They reload automatically next time you open the dashboard — no re-entering parameters between sessions.

---

## General Troubleshooting (both agents)

| Problem | Fix |
|---|---|
| `gh auth status` shows not logged in | Run `gh auth login` and follow the browser flow |
| Commits endpoint returns 404 | Check the branch name — try `master` if `main` returns nothing |
| Hermes doesn't respond at all on Telegram | Check `hermes gateway` is still running — `cat ~/.hermes/gateway_state.json` |
| Telegram blocks your messages ("unauthorized user") | Your user ID is not in `TELEGRAM_ALLOWED_USERS` — use the numeric ID from the log, not your username |
| "Chat not found" on cron delivery | `TELEGRAM_HOME_CHANNEL` is set to a username — replace with numeric chat ID |
| Tool/skill not showing up after adding a token | Restart Hermes: `hermes gateway restart` |
| Response is generic / ignores your repo | Be more explicit — name the exact repo and date range in the prompt |
| "Access blocked" on Google OAuth screen | Your email is not in the OAuth app's test users list — Google Cloud Console → OAuth consent screen → Test users → Add your email |
| `HttpError 403 — Gmail API has not been used in project` | The Gmail API is not enabled — Google Cloud Console → APIs & Services → Library → search "Gmail API" → Enable |
| `setup.py --check` returns NOT AUTHENTICATED | Re-run `setup.py --client-secret` to get a fresh auth URL, complete the browser flow again, then `--auth-code` |
| `gmail_draft.py` command not found / import error | The script lives at `~/.hermes/scripts/gmail_draft.py` — check the path; if missing, recreate from the appendix |
| Gmail or Google auth fails generally | Re-run the `setup.py` flow from step 1d; confirm the Gmail API is enabled and your email is a test user |
| `setup.py --check` shows `gmail.compose` instead of `gmail.modify` | `gmail.compose` grants send capability — wrong scope for a never-auto-send pipeline. Use the `gmail_draft_standalone.py` in the appendix, which handles its own OAuth and explicitly requests `gmail.modify` |
| Draft created but want to verify it can't auto-send | `drafts().create()` posts to `/v1/users/{userId}/drafts` — a categorically separate endpoint from `users.messages.send`. A draft requires an explicit separate API call to send; there is no code path in `gmail_draft.py` that triggers that call |
| Dashboard shows blank page at `localhost:7890` | Check that `python3 session/hermes_dashboard.py` is still running in your terminal — the server exits if the terminal window closes |
| Dashboard: "Trigger Pragya → Varta" does nothing | Fill in all four parameter fields before triggering — app name, stage, region, check size. The terminal pane auto-opens below the card when a run starts |

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

**How to use this table live:** ask the founder for their stage + sector + geography, scan the matching section(s) above, and feed 3-5 relevant rows into Step 5 (scoring) and Step 6 (drafting) in place of live search results.

---

## Appendix — `gmail_draft_standalone.py` (recommended)

Use this instead of the Hermes-bundled `gmail_draft.py` when you want explicit control over the OAuth scope. This version handles its own auth flow and requests **only `gmail.modify`** — no send capability, structural draft-only guarantee.

**First-time setup:**

```bash
pip3 install google-auth google-auth-oauthlib google-api-python-client
```

Create `~/.hermes/scripts/gmail_draft_standalone.py`:

```python
#!/usr/bin/env python3
"""
Standalone Gmail draft creator — handles its own OAuth, requests gmail.modify only.
First run: opens browser for consent. Subsequent runs: uses stored token.
Usage:
  python3 gmail_draft_standalone.py --to EMAIL --subject SUBJECT --body BODY
"""
import argparse
import base64
import json
import os
from email.mime.text import MIMEText
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# gmail.modify: covers drafts.create, does NOT include send capability.
# Do NOT use gmail.compose — it grants "Manage drafts and send emails".
SCOPES = ["https://www.googleapis.com/auth/gmail.modify"]

TOKEN_PATH = Path.home() / ".hermes" / "gmail_modify_token.json"
CLIENT_SECRET = Path.home() / ".hermes" / "google_client_secret.json"


def get_service():
    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET), SCOPES)
            creds = flow.run_local_server(port=0)
        TOKEN_PATH.write_text(creds.to_json())
    return build("gmail", "v1", credentials=creds)


def create_draft(to, subject, body):
    service = get_service()
    message = MIMEText(body, "plain")
    message["To"] = to
    message["Subject"] = subject
    # RFC 2822 MIME → base64url — exact pattern verified against Google's API contract
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    draft = service.users().drafts().create(
        userId="me",
        body={"message": {"raw": raw}}
    ).execute()
    return draft


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a Gmail draft (gmail.modify scope only)")
    parser.add_argument("--to", required=True)
    parser.add_argument("--subject", required=True)
    parser.add_argument("--body", required=True)
    args = parser.parse_args()

    draft = create_draft(args.to, args.subject, args.body)
    print(json.dumps({
        "status": "draft_created",
        "draft_id": draft["id"],
        "message_id": draft["message"]["id"],
        "scope": "gmail.modify (no send capability)"
    }, indent=2))
```

Make it executable and test:

```bash
chmod +x ~/.hermes/scripts/gmail_draft_standalone.py
python3 ~/.hermes/scripts/gmail_draft_standalone.py \
  --to your.email@gmail.com \
  --subject "Hermes scope test" \
  --body "Scope: gmail.modify. This draft cannot be auto-sent. Do not send."
```

The first run opens a browser for consent — the consent screen will list only "View and manage your mail" (gmail.modify), not "Send email on your behalf" (gmail.compose). Check Gmail Drafts for the result.

**Wire it into Hermes's tool layer:** in `~/.hermes/SOUL.md`, update the Gmail tool reference to point to `gmail_draft_standalone.py` instead of `gmail_draft.py`.

---

## Appendix — `gmail_draft.py` source (Hermes-integrated version)

If `~/.hermes/scripts/gmail_draft.py` is missing or needs to be recreated:

```python
#!/usr/bin/env python3
"""
Create a Gmail draft via the Google Workspace token stored by Hermes.
Usage:
  python3 gmail_draft.py --to EMAIL --subject SUBJECT --body BODY
"""
import argparse
import base64
import json
import sys
from email.mime.text import MIMEText
from pathlib import Path

# Reuse Hermes's google_api helpers for auth
_SCRIPTS = Path.home() / ".hermes/hermes-agent/skills/productivity/google-workspace/scripts"
sys.path.insert(0, str(_SCRIPTS))

from google_api import build_service

def create_draft(to, subject, body):
    service = build_service("gmail", "v1")
    message = MIMEText(body, "plain")
    message["To"] = to
    message["Subject"] = subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    draft = service.users().drafts().create(
        userId="me",
        body={"message": {"raw": raw}}
    ).execute()
    return draft

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a Gmail draft")
    parser.add_argument("--to", required=True)
    parser.add_argument("--subject", required=True)
    parser.add_argument("--body", required=True)
    args = parser.parse_args()

    draft = create_draft(args.to, args.subject, args.body)
    print(json.dumps({
        "status": "draft_created",
        "draft_id": draft["id"],
        "message_id": draft["message"]["id"]
    }, indent=2))
```

After creating the file, make it executable:

```bash
chmod +x ~/.hermes/scripts/gmail_draft.py
```
