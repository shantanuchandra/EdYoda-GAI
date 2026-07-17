# Founder's Guide to Agents — Pre-Read

**Read this before Saturday. Setup is homework — Saturday is 100% building.**

You're building two working agents this Saturday: one that summarizes what shipped in your own codebase, and one that finds and drafts outreach to investors who actually fit your round. Both run on a tool called Hermes, powered by OpenAI's GPT-5.6 Sol.

This document has two jobs: (1) help you name your own biggest ops bottleneck before you walk in, and (2) get Hermes running on your machine so none of Saturday's 4 hours gets spent on installation.

---

## Part 1 — Name Your Bottleneck

You'll build two specific agents on Saturday. But the real skill you're leaving with is a pattern you can point at anything. Before you arrive, answer this honestly:

**What's the one ops task — not your product, the stuff around it — that's eating your week right now?**

Think across these domains:
- **Sales & business development** — outreach, lead research, pipeline follow-up
- **Hiring & talent** — screening applications, scheduling interviews, drafting rejections
- **Investor relations** — updates, outreach, tracking who said what
- **Marketing & content** — competitor watching, social monitoring, content repurposing
- **Product & customer feedback** — support triage, review monitoring, feedback synthesis
- **Finance & legal ops** — invoicing, expense tracking, contract renewals

Write down:

```
My domain:        _____________________________________________
The specific task: _____________________________________________
How often it happens: _____________________________________________
```

Bring this with you. You'll use it in the last block of the session, where you sketch your own third agent using the exact same pattern you build twice on Saturday.

---

## Part 2 — Get Hermes Running

### Step 1 — Install Hermes

Works on Linux, macOS, WSL2, and Termux (Android). Windows has a separate path below.

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Windows:
```
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

**You don't need to pre-install anything else** — the installer handles Python, Node.js, and everything else it needs. You do need Git already on your machine (Linux also needs `curl` and `xz-utils`).

Open a fresh terminal after install and confirm it worked:
```bash
hermes --version
```

### Step 2 — Connect OpenAI as your model provider

1. Get an API key from `platform.openai.com/api-keys`
2. Add it to `~/.hermes/.env` (this file now exists after install):
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Set the provider in `~/.hermes/config.yaml` — **the provider id is `openai-api`, not `openai`**:
   ```yaml
   model:
     provider: "openai-api"
     default: "gpt-5.6-sol"
   ```
4. Verify it's wired up:
   ```bash
   hermes model      # should show openai-api / gpt-5.6-sol
   hermes status     # should show healthy connection
   ```

If you'd rather do it in one line without editing files:
```
hermes chat --provider openai-api --model gpt-5.6-sol
```

### Step 3 — Wire up Telegram

Hermes runs on your machine; Telegram is how you talk to it.

1. **Create a bot**: message `@BotFather` on Telegram, send `/newbot`. Give it a name and a username ending in `bot`. Save the token it gives you.
2. **Get your numeric Telegram user ID**: message `@userinfobot` or `@get_id_bot`. You need the number, not your username.
3. **Configure the gateway**: run `hermes gateway setup`, select Telegram, paste in your bot token and numeric user ID.
4. **Start and test it**: run `hermes gateway` and leave it running. Then message your bot: *"Hello Hermes. Reply in one sentence and tell me what tools are active."*

If the setup wizard doesn't work, you can do it directly — put this in `~/.hermes/.env` and restart:
```
TELEGRAM_BOT_TOKEN=<your-bot-token>
TELEGRAM_ALLOWED_USERS=<your-numeric-user-id>
```

### Step 4 — Checkpoint: is your agent alive?

Confirm all five before Saturday:

- [ ] `hermes status` shows your provider and model
- [ ] Telegram DM gets a response from your bot
- [ ] A web-search prompt works
- [ ] `hermes memory status` runs without error
- [ ] Final test passed (below)

**Final test — send your bot this exact message:**
> "Give me a one-paragraph setup report: model, tool route, channel, memory, and one thing still missing."

If the answer is coherent, you're done. Arrive Saturday with all five checked.

### Common setup snags

| Problem | Fix |
|---|---|
| `hermes: command not found` after install | Open a brand-new terminal window — the PATH update from the installer only takes effect in a fresh shell. |
| Install fails on macOS | Make sure Git is installed (`git --version`). If you're on Apple Silicon, run `softwareupdate --install-rosetta` first. |
| Provider not authenticated | Check the OpenAI key is in `~/.hermes/.env` with no trailing spaces or extra quotes. Re-run `hermes model` to re-select. |
| OpenAI key set but Hermes won't use it | Check the provider id is `openai-api` (not `openai`) and the model id is `gpt-5.6-sol` in `~/.hermes/config.yaml`. Verify with `hermes status`. |
| `SSL: CERTIFICATE_VERIFY_FAILED`, `unable to get local issuer certificate`, or `self-signed certificate in certificate chain` | This usually means a work, school, or VPN network is inspecting HTTPS traffic and Hermes does not yet trust that network's certificate. Do **not** disable certificate verification. Switch to an unrestricted network if possible; otherwise ask your IT team for the organisation CA certificate and add it through the approved Hermes/IT process. Restart Hermes, then test in a new session. |
| `API call failed after 3 retries: Connection error` | First distinguish network from provider issues: check that normal web access works, then run `hermes status` and confirm the selected provider/model. On a managed network, check the certificate issue above before changing keys or reinstalling. |
| Hermes asks to configure a different provider or says a subscription/credential is exhausted | The current provider is unavailable, even if another key exists on your machine. Select the intended provider explicitly, confirm it in `hermes status`, and use the approved credential for that provider. For this workshop, the intended route is direct OpenAI API access. |
| A new chat works but an older chat still shows errors or outdated setup advice | Chats can retain the state that existed when they were created. After changing a provider, credentials, or network certificate settings, fully restart Hermes and begin a **new session**. Keep the earlier chat only as a record; do not use it to judge whether the current setup works. |
| Telegram bot token copied wrong | Re-run `hermes gateway setup`, paste the token again carefully — no spaces at either end. |
| Telegram user ID wrong | Get the numeric ID (not your username) from `@userinfobot` or `@get_id_bot`, then re-run `hermes gateway setup`. |

---

## Part 3 — What to Bring

- [ ] Hermes installed and checkpoint-tested (Part 2 above)
- [ ] Access to a real GitHub repo you can point an agent at — ideally one with commits from the last week or two (no repo with recent activity? No problem, we'll have a fallback — but tell your facilitator in advance if this is you)
- [ ] A rough sense of your current or next fundraising round: stage, sector, geography, target check size — doesn't need to be exact, a best guess is fine
- [ ] Your laptop, charger, and this document's Part 1 answer written down

See you Saturday, 10am.
