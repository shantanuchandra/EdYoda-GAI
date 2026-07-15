# Hermes Setup — Research Notes (for the Pre-Read)

**Purpose:** Raw, verbatim-sourced material on how to install and configure Hermes Agent, pulled from the Hermes Buildathon Builder Handbook and corroborated against the official Nous Research docs/README. This is the input for the founder-facing pre-read — do not hand this raw doc to founders, adapt it into the pre-read's setup section.

**Sources (all fetched 2026-07-16):**
1. Buildathon Builder Handbook — `https://growthx.club/docs/hermes-buildathon-builder-handbook` (event-specific, authoritative for this cohort)
2. Hermes Agent GitHub README — `https://github.com/NousResearch/hermes-agent/blob/main/README.md`
3. Official Hermes docs — `https://hermes-agent.nousresearch.com/docs/getting-started/installation` and `.../quickstart`

Full raw extracted handbook text (~880 lines, all 12 sections): [`hermes_buildathon_handbook_raw.txt`](hermes_buildathon_handbook_raw.txt)

---

## 1. Model/provider: OpenAI (Step A)

Hermes needs an LLM behind it — it talks to anything OpenAI-API-compatible. This session standardizes on **OpenAI — GPT-5.6 Sol**: best frontier model, best coding performance.

### To get OpenAI working:

1. Get an API key from `platform.openai.com/api-keys`
2. Put it in `~/.hermes/.env`:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Set the provider in `~/.hermes/config.yaml` — **provider id is `openai-api`, NOT `openai`**:
   ```yaml
   model:
     provider: "openai-api"
     default: "gpt-5.6-sol"
   ```
4. Or one-line it: `hermes chat --provider openai-api --model gpt-5.6-sol`

---

## 2. Install (Step B.01)

Works on Linux, macOS, WSL2, Termux (Android). Windows has a separate PowerShell path.

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```
Windows: `iex (irm https://hermes-agent.nousresearch.com/install.ps1)`

Then, in a fresh terminal:
```bash
hermes model      # pick your model provider
hermes status     # verify
```

**Prerequisites:**
- Non-Windows: Git required. Linux also needs `curl`, `xz-utils`.
- Auto-installed by the installer (no need to pre-install): `uv`, Python 3.11, Node.js v22, `ripgrep`, `ffmpeg`.
- Windows: portable Git Bash/MinGit auto-bundled if Git missing, no admin rights needed.
- Install locations: per-user code at `~/.hermes/hermes-agent/`, binary at `~/.local/bin/hermes`.

---

## 3. Wire up Telegram (Step B.02)

Hermes runs locally; Telegram is the remote control.

1. **Create a bot**: message `@BotFather` on Telegram, send `/newbot`, give it a display name + username ending in `bot`. Save the token it returns, privately.
2. **Get your numeric Telegram user ID**: via `@userinfobot` or `@get_id_bot`. The number matters, not your username.
3. **Configure the gateway**: `hermes gateway setup` → select Telegram → paste bot token + numeric user ID.
4. **Start + test**: `hermes gateway` (leave running), then DM the bot: *"Hello Hermes. Reply in one sentence and tell me what tools are active."*

**Fallback if the wizard fails** — put directly in `~/.hermes/.env`, then restart:
```
TELEGRAM_BOT_TOKEN=<your-bot-token>
TELEGRAM_ALLOWED_USERS=<your-numeric-user-id>
```

Telegram is recommended over WhatsApp for first setup — "less ceremony."

---

## 4. Memory and skills (Step B.03 — only after chat works)

Not required for setup to be "done," but relevant once founders start building:

- **Tier 0 (always-on)**: `USER.md` + `MEMORY.md`, injected into every system prompt
- **Tier 1 (session history)**: raw `.jsonl` sessions, indexed in SQLite with FTS5 full-text search
- **Tier 2 (pluggable, pick ONE)**: Holographic (local, free) or Honcho (self-improving user model)

```bash
hermes memory setup
hermes skills browse
```

---

## 5. Checkpoint — "is your agent alive?" (this is the literal hello-world / done-state test)

Run through before moving to the actual build:
- [ ] `hermes status` shows your provider and model (or Nous Tool Gateway)
- [ ] Telegram DM responds from your bot
- [ ] A web-search prompt works
- [ ] A Telegram image test works, or the URL fallback works
- [ ] `hermes memory status` is clear if external memory enabled

**Final test — send the bot this exact prompt:**
> "Give me a one-paragraph setup report: model, tool route, channel, memory, and one thing still missing."

If the answer is coherent, setup is alive.

---

## 6. Common breaks + fixes

| Problem | Fix |
|---|---|
| Provider not authenticated | Re-run `hermes model`, finish login. Check the OpenAI key is in `~/.hermes/.env` with no trailing spaces. |
| OpenAI key set but Hermes won't start | Check provider id is `openai-api` (not `openai`) and model id is `gpt-5.6-sol` in `~/.hermes/config.yaml`. Verify: `hermes status` |
| Telegram bot token copied wrong | Re-run `hermes gateway setup`, paste again |
| Telegram user ID wrong | Get numeric ID from `@userinfobot`/`@get_id_bot`, re-run `hermes gateway setup` |
| Group messages don't appear | Fix BotFather privacy mode or make bot a group admin; remove/re-add bot after changing |
| Vision over SSH can't see clipboard | Use Telegram or a URL instead: "Analyze this image URL: `<url>`" |
| Memory provider confusion | Only one external provider active at a time — pick Holographic OR Honcho |
| Ollama context window too small | Hermes needs ≥64K token context; set `num_ctx` to ≥65536 via a Modelfile |
| MCP tools not showing up | Restart Hermes or run `/reload-mcp` inside chat after config changes |
| (Windows) Antivirus quarantines `uv.exe` | False positive — whitelist `%LOCALAPPDATA%\hermes\bin` |

**Note on existing CLAUDE.md setups** (relevant — several founders likely already use Claude Code): Hermes reads a repo's `.hermes.md`, then `AGENTS.md`, then `CLAUDE.md` — first one found, in that order. It does **not** read the global `~/.claude/CLAUDE.md`. Durable global instructions need to move to `~/.hermes/SOUL.md` and `~/.hermes/memories/MEMORY.md` (capped ~2,200 characters). No one-click importer exists — `hermes import` restores Hermes backups only, not Claude setups.

---

## 7. Timing constraints for the pre-read

- Handbook recommends: **run the full setup before 10:00 AM day-of** if porting an existing Claude Code/Codex setup, then check `hermes skills browse` shows what's expected.
- The $200 OpenAI credit + Codex Pro perk (where applicable) was tied to org-ID submission at the original buildathon registration — not relevant to this session's setup flow.

---

## What this means for the pre-read document

The pre-read should walk founders through, in order:
1. Set up OpenAI/GPT-5.6 Sol as the provider
2. Run the install one-liner
3. Run `hermes model`, `hermes status`
4. Set up Telegram bot + gateway
5. Run the checkpoint list + final coherence-test prompt
6. Arrive Saturday with a green checkmark on all 5 checkpoint items

This should be framed as "come with your agent already breathing" — setup is homework, Saturday is 100% building.
