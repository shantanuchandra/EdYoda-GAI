#!/usr/bin/env python3
"""
Hermes Dashboard — Founder's Guide to Agents
Local web dashboard for Drishti (Agent 1) and Pragya + Varta (Agent 2).
Run with: python3 hermes_dashboard.py
"""

import sys
import subprocess
import json
import pathlib
import urllib.parse
import urllib.request
import urllib.error
import threading
import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler

# ---------------------------------------------------------------------------
# Preflight checks
# ---------------------------------------------------------------------------

def run_preflight():
    # 1. Python version
    major, minor = sys.version_info[:2]
    if major < 3 or (major == 3 and minor < 8):
        print(
            f"Error: Python 3.8+ required, found {major}.{minor}\n"
            "Install from: https://www.python.org/downloads/"
        )
        sys.exit(1)
    print(f"✓ Python {major}.{minor} found")

    # 2. Hermes
    try:
        result = subprocess.run(
            ["hermes", "--version"],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode != 0:
            raise FileNotFoundError
        version = result.stdout.strip() or result.stderr.strip()
        print(f"✓ Hermes found ({version})")
    except (FileNotFoundError, subprocess.TimeoutExpired):
        print(
            "⚠  Hermes not found — dashboard UI will load but agent triggers won't fire.\n"
            "   Run the pre-read setup at session/00_Pre_Read.md to install Hermes."
        )


# ---------------------------------------------------------------------------
# Config helpers
# ---------------------------------------------------------------------------

HERMES_DIR = pathlib.Path.home() / ".hermes"

def load_github_token():
    """Read GITHUB_TOKEN from ~/.hermes/.env if present."""
    env_path = HERMES_DIR / ".env"
    if not env_path.exists():
        return None
    for line in env_path.read_text(errors="replace").splitlines():
        line = line.strip()
        if line.startswith("GITHUB_TOKEN=") and not line.startswith("#"):
            return line.split("=", 1)[1].strip()
    return None

def github_api(path, token):
    """Call GitHub REST API, return parsed JSON or raise."""
    url = f"https://api.github.com{path}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "hermes-dashboard/1.0",
    })
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read())

def fetch_push_count(full_name, token, since_iso, results, idx):
    """Fetch number of commits pushed to a repo in the last 7 days. Writes into results[idx]."""
    try:
        commits = github_api(
            f"/repos/{full_name}/commits?since={since_iso}&per_page=100",
            token
        )
        results[idx] = len(commits) if isinstance(commits, list) else 0
    except Exception:
        results[idx] = 0

def fetch_all_repos(token):
    """Fetch every repo the token can see, enriched with 7-day push count."""
    repos = []
    seen = set()
    page = 1
    while True:
        batch = github_api(
            f"/user/repos?affiliation=owner,collaborator,organization_member"
            f"&sort=updated&per_page=100&page={page}",
            token
        )
        if not batch:
            break
        for r in batch:
            key = r.get("full_name", "")
            if key and key not in seen:
                seen.add(key)
                repos.append({
                    "name": r["name"],
                    "nameWithOwner": r["full_name"],
                    "isPrivate": r.get("private", False),
                    "updatedAt": r.get("updated_at", ""),
                    "pushedAt": r.get("pushed_at", ""),
                })
        if len(batch) < 100:
            break
        page += 1

    # Fetch 7-day push counts in parallel (one thread per repo, capped at 20)
    since = (datetime.datetime.utcnow() - datetime.timedelta(days=7)).strftime("%Y-%m-%dT%H:%M:%SZ")
    push_counts = [0] * len(repos)
    threads = []
    sem = threading.Semaphore(20)

    def worker(full_name, idx):
        with sem:
            fetch_push_count(full_name, token, since, push_counts, idx)

    for i, repo in enumerate(repos):
        t = threading.Thread(target=worker, args=(repo["nameWithOwner"], i), daemon=True)
        threads.append(t)
        t.start()
    for t in threads:
        t.join(timeout=12)

    for i, repo in enumerate(repos):
        repo["pushCount7d"] = push_counts[i]

    return repos

def read_config(filename):
    path = HERMES_DIR / filename
    if path.exists():
        try:
            return json.loads(path.read_text())
        except Exception:
            return {}
    return {}

def write_config(filename, data):
    HERMES_DIR.mkdir(parents=True, exist_ok=True)
    path = HERMES_DIR / filename
    path.write_text(json.dumps(data, indent=2))

# ---------------------------------------------------------------------------
# Run log helpers
# ---------------------------------------------------------------------------

LOG_FILE = "run_log.json"

def read_log():
    path = HERMES_DIR / LOG_FILE
    if path.exists():
        try:
            return json.loads(path.read_text())
        except Exception:
            return []
    return []

def append_log(entry):
    """Append one run record; keep last 200."""
    HERMES_DIR.mkdir(parents=True, exist_ok=True)
    log = read_log()
    log.append(entry)
    log = log[-200:]
    (HERMES_DIR / LOG_FILE).write_text(json.dumps(log, indent=2))


# ---------------------------------------------------------------------------
# Inline HTML dashboard
# ---------------------------------------------------------------------------

DASHBOARD_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hermes Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #05091a;
    --surface: rgba(255,255,255,.04);
    --card-bg: rgba(255,255,255,.06);
    --card-bg2: rgba(255,255,255,.04);
    --border: rgba(255,255,255,.09);
    --border-bright: rgba(255,255,255,.18);
    --border-accent1: rgba(129,140,248,.35);
    --border-accent2: rgba(52,211,153,.28);
    --text: #f0f4ff;
    --text-muted: #7a8ab8;
    --text-sub: #a0b0d0;
    --accent1: #a5b4fc;
    --accent1-glow: rgba(165,180,252,.22);
    --accent2: #6ee7b7;
    --accent2-glow: rgba(110,231,183,.18);
    --green-raw: #4ade80;
    --red-raw: #f87171;
    --amber-raw: #fbbf24;
    --term-bg: rgba(0,0,0,.55);
    --term-text: #a3e635;
    --term-prompt: #67e8f9;
    --radius: 18px;
    --radius-sm: 11px;
    --glass-blur: blur(24px) saturate(180%);
    --glass-blur-lg: blur(40px) saturate(200%);
    --shadow-card: 0 0 0 1px var(--border), 0 8px 40px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.3);
    --shadow-glow1: 0 0 60px rgba(129,140,248,.1);
    --shadow-glow2: 0 0 60px rgba(52,211,153,.1);
    --green: var(--green-raw);
    --red: var(--red-raw);
    --grey: #4b5a7a;
  }

  /* ── Base — rich dark mesh background ── */
  body {
    font-family: "Fira Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-image:
      radial-gradient(ellipse 120% 80% at 15% -10%, rgba(99,102,241,.22) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 85% 110%, rgba(16,185,129,.18) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,.06) 0%, transparent 70%);
    background-attachment: fixed;
  }

  /* ── Top bar — full glass ── */
  header {
    background: rgba(5,9,26,.7);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 58px;
    display: flex;
    align-items: center;
    gap: 16px;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .logo-mark {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: "Fira Code", monospace;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -.01em;
    color: var(--text);
  }
  .logo-bolt {
    width: 28px; height: 28px;
    background: linear-gradient(135deg, var(--accent1) 0%, var(--accent2) 100%);
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    box-shadow: 0 0 16px rgba(129,140,248,.3);
    flex-shrink: 0;
  }
  .logo-name { color: var(--text); }
  .logo-name em { color: var(--accent1); font-style: normal; }
  .header-sep { width: 1px; height: 20px; background: var(--border); }
  .header-subtitle {
    font-size: 11px;
    font-family: "Fira Code", monospace;
    color: var(--text-muted);
    letter-spacing: .06em;
    text-transform: uppercase;
  }
  .header-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .header-pill {
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 99px;
    border: 1px solid var(--border);
    color: var(--text-muted);
    letter-spacing: .05em;
  }

  /* ── Layout ── */
  main {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 24px 28px;
    align-items: start;
  }

  /* ── Cards — glassmorphism ── */
  .card {
    background: var(--card-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-card);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: box-shadow .25s, border-color .25s, transform .2s;
  }
  .card:hover { transform: translateY(-2px); }
  .card.drishti-card {
    border-color: var(--border-accent1);
    box-shadow: var(--shadow-card), var(--shadow-glow1);
  }
  .card.pragya-card  {
    border-color: var(--border-accent2);
    box-shadow: var(--shadow-card), var(--shadow-glow2);
  }
  .card.drishti-card:hover { border-color: rgba(165,180,252,.55); box-shadow: var(--shadow-card), 0 0 80px rgba(129,140,248,.18); }
  .card.pragya-card:hover  { border-color: rgba(110,231,183,.45); box-shadow: var(--shadow-card), 0 0 80px rgba(52,211,153,.16); }

  .card-header {
    padding: 22px 24px 18px;
    border-bottom: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,.025);
  }
  .card-header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
  }
  .drishti-card .card-header::before { background: linear-gradient(90deg, var(--accent1) 0%, rgba(165,180,252,.3) 50%, transparent 80%); }
  .pragya-card  .card-header::before { background: linear-gradient(90deg, var(--accent2) 0%, rgba(110,231,183,.3) 50%, transparent 80%); }

  .agent-name-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 3px;
  }
  .agent-name {
    font-family: "Fira Code", monospace;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -.02em;
  }
  .agent-name.drishti { color: var(--accent1); }
  .agent-name.pragya  { color: var(--accent2); }
  .agent-devanagari {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 400;
    letter-spacing: .02em;
  }
  .card-subtitle {
    font-size: 11px;
    font-family: "Fira Code", monospace;
    color: var(--text-muted);
    letter-spacing: .07em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .status-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: .07em;
    border: 1px solid transparent;
  }
  .badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .badge.green  { background: rgba(34,197,94,.12); color: #4ade80; border-color: rgba(34,197,94,.2); }
  .badge.green::before  { background: #4ade80; box-shadow: 0 0 6px #4ade80; }
  .badge.grey   { background: rgba(75,90,122,.2); color: var(--text-muted); border-color: rgba(75,90,122,.3); }
  .badge.grey::before   { background: var(--text-muted); }
  .badge.red    { background: rgba(248,113,113,.12); color: #f87171; border-color: rgba(248,113,113,.2); }
  .badge.red::before    { background: #f87171; }
  .badge.running { background: rgba(129,140,248,.12); color: var(--accent1); border-color: rgba(129,140,248,.25); }
  .badge.running::before { background: var(--accent1); animation: pulse-dot 1s infinite; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: .3; }
  }

  .meta-kv {
    font-size: 11px;
    font-family: "Fira Code", monospace;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .meta-kv span { color: var(--text-sub); }

  /* ── Card body ── */
  .card-body {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .field-group { display: flex; flex-direction: column; gap: 5px; }
  .field-group label {
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: .09em;
  }
  .field-group input,
  .field-group select {
    font-family: "Fira Sans", sans-serif;
    font-size: 13px;
    padding: 10px 13px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: rgba(255,255,255,.06);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--text);
    width: 100%;
    outline: none;
    transition: border-color .18s, box-shadow .18s, background .18s;
  }
  .field-group input::placeholder { color: var(--text-muted); opacity: .7; }
  .field-group select option { background: #0f172a; color: var(--text); }
  .field-group input:focus,
  .field-group select:focus {
    border-color: var(--accent1);
    background: rgba(165,180,252,.08);
    box-shadow: 0 0 0 3px rgba(165,180,252,.14), 0 0 20px rgba(129,140,248,.1);
  }
  .pragya-card .field-group input:focus,
  .pragya-card .field-group select:focus {
    border-color: var(--accent2);
    background: rgba(110,231,183,.07);
    box-shadow: 0 0 0 3px rgba(110,231,183,.12), 0 0 20px rgba(52,211,153,.08);
  }

  /* ── Command preview ── */
  .cmd-preview-label {
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: .09em;
    margin-bottom: 6px;
  }
  .cmd-preview {
    background: rgba(0,0,0,.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(163,230,53,.2);
    border-radius: var(--radius-sm);
    padding: 12px 15px;
    font-family: "Fira Code", monospace;
    font-size: 12px;
    color: var(--term-text);
    word-break: break-all;
    line-height: 1.6;
  }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: "Fira Code", monospace;
    font-size: 12px;
    font-weight: 600;
    padding: 11px 18px;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: opacity .15s, transform .12s, box-shadow .15s;
    width: 100%;
    letter-spacing: .02em;
    position: relative;
    overflow: hidden;
  }
  .btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background .15s;
  }
  .btn:hover::after { background: rgba(255,255,255,.06); }
  .btn:active { transform: scale(.985); }
  .btn:disabled { opacity: .35; cursor: not-allowed; transform: none; }
  .btn-secondary {
    background: rgba(255,255,255,.07);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid var(--border);
    color: var(--text-sub);
  }
  .btn-secondary:hover { background: rgba(255,255,255,.11); border-color: var(--border-bright); color: var(--text); }
  .btn-drishti {
    background: linear-gradient(135deg, rgba(99,102,241,.8) 0%, rgba(139,92,246,.8) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: #fff;
    border: 1px solid rgba(165,180,252,.3);
    box-shadow: 0 2px 16px rgba(99,102,241,.35), inset 0 1px 0 rgba(255,255,255,.15);
  }
  .btn-drishti:hover { box-shadow: 0 4px 28px rgba(99,102,241,.55), inset 0 1px 0 rgba(255,255,255,.2); }
  .btn-copy {
    background: linear-gradient(135deg, rgba(6,95,70,.85) 0%, rgba(5,150,105,.85) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: #d1fae5;
    font-size: 12px;
    border: 1px solid rgba(110,231,183,.25);
    box-shadow: 0 2px 16px rgba(5,150,105,.3), inset 0 1px 0 rgba(255,255,255,.12);
  }
  .btn-copy:hover { box-shadow: 0 4px 28px rgba(5,150,105,.5), inset 0 1px 0 rgba(255,255,255,.18); }

  /* ── Repo chips ── */
  .chips-label {
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: .09em;
    margin-bottom: 6px;
  }
  .repo-chip {
    font-family: "Fira Code", monospace;
    font-size: 11px;
    font-weight: 500;
    padding: 4px 11px;
    border: 1px solid rgba(129,140,248,.35);
    border-radius: 99px;
    background: rgba(129,140,248,.05);
    color: var(--accent1);
    cursor: pointer;
    transition: background .15s, border-color .15s, color .15s, box-shadow .15s;
    position: relative;
  }
  .repo-chip:hover {
    background: rgba(129,140,248,.15);
    border-color: var(--accent1);
    box-shadow: 0 0 10px rgba(129,140,248,.2);
  }
  .repo-chip.selected {
    background: var(--accent1);
    color: #0f1730;
    border-color: var(--accent1);
    box-shadow: 0 0 14px rgba(129,140,248,.35);
  }
  .repo-chip .chip-tip {
    display: none;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: #1a2744;
    border: 1px solid var(--border-bright);
    color: var(--text-sub);
    font-size: 10px;
    font-weight: 400;
    white-space: nowrap;
    padding: 6px 11px;
    border-radius: 7px;
    pointer-events: none;
    z-index: 20;
    line-height: 1.6;
    text-align: center;
    box-shadow: 0 4px 16px rgba(0,0,0,.5);
  }
  .repo-chip .chip-tip::after {
    content: '';
    position: absolute;
    top: 100%; left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #1a2744;
  }
  .repo-chip:hover .chip-tip { display: block; }

  /* ── How-to box — glass tinted ── */
  .howto-box {
    background: rgba(52,211,153,.06);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(110,231,183,.2);
    border-radius: var(--radius-sm);
    padding: 12px 15px;
    font-size: 12px;
    line-height: 1.7;
    color: var(--text-sub);
  }
  .howto-box strong { color: var(--accent2); font-family: "Fira Code", monospace; font-size: 11px; letter-spacing: .05em; text-transform: uppercase; }
  .howto-box ol { padding-left: 16px; margin-top: 5px; }
  .howto-box li { margin-bottom: 2px; }

  /* ── Terminal ── */
  .term-wrap {
    border-top: 1px solid var(--border);
  }
  .term-toggle {
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 600;
    color: var(--text-muted);
    padding: 8px 22px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: .08em;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: color .15s;
  }
  .term-toggle:hover { color: var(--text-sub); }
  .term-toggle .arrow { transition: transform .2s; display: inline-block; font-size: 12px; }
  .term-toggle.open .arrow { transform: rotate(90deg); }
  .terminal {
    display: none;
    background: rgba(0,0,0,.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    color: var(--term-text);
    font-family: "Fira Code", monospace;
    font-size: 11.5px;
    padding: 14px 18px;
    max-height: 220px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.65;
    border-top: 1px solid var(--border);
  }
  .terminal.open { display: block; }
  .terminal::-webkit-scrollbar { width: 4px; }
  .terminal::-webkit-scrollbar-track { background: transparent; }
  .terminal::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 99px; }

  /* ── History section — glass ── */
  #history-section {
    grid-column: 1 / -1;
    background: rgba(255,255,255,.05);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-card);
    overflow: hidden;
  }
  .history-header {
    padding: 18px 26px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,.03);
  }
  .history-label-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .history-eyebrow {
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: .09em;
  }
  .history-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -.01em;
  }
  .btn-clear {
    font-size: 10px;
    font-family: "Fira Code", monospace;
    padding: 5px 13px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: border-color .15s, color .15s;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
  .btn-clear:hover { border-color: var(--red-raw); color: var(--red-raw); }
  #history-empty {
    padding: 32px 24px;
    font-size: 13px;
    font-family: "Fira Code", monospace;
    color: var(--text-muted);
    text-align: center;
  }
  #history-table {
    width: 100%;
    border-collapse: collapse;
    display: none;
  }
  #history-table th {
    padding: 10px 18px;
    font-size: 10px;
    font-family: "Fira Code", monospace;
    font-weight: 600;
    letter-spacing: .09em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: left;
    border-bottom: 1px solid var(--border);
    background: rgba(255,255,255,.03);
    white-space: nowrap;
  }
  #history-table td {
    padding: 12px 18px;
    font-size: 12px;
    color: var(--text-sub);
    border-bottom: 1px solid rgba(255,255,255,.05);
    vertical-align: top;
  }
  #history-table tr:last-child td { border-bottom: none; }
  #history-table tr:hover td { background: rgba(255,255,255,.04); }
  .agent-tag {
    font-family: "Fira Code", monospace;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 99px;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
  .agent-tag.drishti {
    background: rgba(129,140,248,.12);
    color: var(--accent1);
    border: 1px solid rgba(129,140,248,.2);
  }
  .agent-tag.pragya {
    background: rgba(52,211,153,.1);
    color: var(--accent2);
    border: 1px solid rgba(52,211,153,.18);
  }
  .outcome-ok   { color: #4ade80; font-family: "Fira Code", monospace; font-size: 11px; }
  .outcome-err  { color: var(--red-raw); font-family: "Fira Code", monospace; font-size: 11px; }
  .outcome-copy { color: var(--accent2); font-family: "Fira Code", monospace; font-size: 11px; }
  .note-input {
    font-family: "Fira Sans", sans-serif;
    font-size: 12px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    color: var(--text-sub);
    padding: 4px 7px;
    width: 100%;
    transition: border-color .15s, background .15s;
  }
  .note-input:focus { outline: none; border-color: var(--border-bright); background: var(--surface); }
  .note-input::placeholder { color: rgba(107,127,168,.4); }
  .btn-rerun {
    font-family: "Fira Code", monospace;
    font-size: 10px;
    font-weight: 600;
    padding: 4px 10px;
    border: 1px solid var(--border);
    border-radius: 5px;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: border-color .15s, color .15s;
    white-space: nowrap;
    letter-spacing: .04em;
  }
  .btn-rerun:hover { border-color: var(--accent1); color: var(--accent1); }

  /* ── Footer ── */
  footer {
    text-align: center;
    font-size: 10px;
    font-family: "Fira Code", monospace;
    color: var(--text-muted);
    padding: 14px;
    border-top: 1px solid var(--border);
    letter-spacing: .06em;
  }

  /* ── Scrollbar global ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 99px; }

  /* ── Animations ── */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card { animation: fadeInUp .35s ease both; }
  .card.drishti-card { animation-delay: .05s; }
  .card.pragya-card  { animation-delay: .12s; }
  #history-section   { animation: fadeInUp .35s ease .2s both; }

  /* ── Responsive ── */
  @media (max-width: 820px) {
    main { grid-template-columns: 1fr; padding: 16px; gap: 16px; }
    #history-section { grid-column: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .card, #history-section { animation: none; }
    .badge.running::before { animation: none; }
  }
</style>
</head>
<body>

<header>
  <div class="logo-mark">
    <div class="logo-bolt">&#9889;</div>
    <span class="logo-name"><em>Hermes</em> Dashboard</span>
  </div>
  <div class="header-sep"></div>
  <span class="header-subtitle">Founder&#8217;s Guide to Agents</span>
  <div class="header-right">
    <span class="header-pill">2026-07-19</span>
    <span class="header-pill">Local Control Panel</span>
  </div>
</header>

<main>

  <!-- ── DRISHTI CARD ── -->
  <div class="card drishti-card">
    <div class="card-header">
      <div class="agent-name-row">
        <span class="agent-name drishti">Drishti</span>
        <span class="agent-devanagari">&#x2022; &#2342;&#x943;&#2359;&#2381;&#2335;&#2367;</span>
      </div>
      <div class="card-subtitle">Agent 1 &#x2022; Weekly Repo Digest</div>
      <div class="status-row">
        <span class="badge grey" id="drishti-badge">Idle</span>
        <span class="meta-kv">Last run: <span id="drishti-last-run">&#8212;</span></span>
        <span class="meta-kv">Next: <span>Mon 9:00 AM</span></span>
      </div>
    </div>
    <div class="card-body">
      <div class="field-group">
        <label>GitHub Username</label>
        <input type="text" id="drishti-repo-owner" placeholder="your-github-username" oninput="clearRepoList()" />
      </div>
      <button class="btn btn-secondary" id="drishti-list-btn" onclick="listRepos()" style="margin-bottom:2px">
        &#x27F3; List My Repos
      </button>
      <div id="drishti-repo-list" style="display:none">
        <div class="chips-label">Select a repo &#x2192; populates Pragya app name</div>
        <div id="drishti-repo-chips" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
      </div>
      <button class="btn btn-drishti" id="drishti-run-btn" onclick="runDrishti()">
        &#x25B6; Run Digest Now
      </button>
    </div>
    <div class="term-wrap">
      <button class="term-toggle" id="drishti-toggle" onclick="toggleTerm('drishti')">
        <span class="arrow">&#x203A;</span> Terminal Output
      </button>
      <div class="terminal" id="drishti-terminal"># Waiting for run&#8230;</div>
    </div>
  </div>

  <!-- ── PRAGYA + VARTA CARD ── -->
  <div class="card pragya-card">
    <div class="card-header">
      <div class="agent-name-row">
        <span class="agent-name pragya">Pragya + Varta</span>
        <span class="agent-devanagari">&#x2022; &#2346;&#x94D;&#2352;&#2332;&#2381;&#2334;&#2366; &#x2022; &#2357;&#2366;&#2352;&#x94D;&#2340;&#2366;</span>
      </div>
      <div class="card-subtitle">Agent 2 &#x2022; Investor Intel + Outreach</div>
      <div class="status-row">
        <span class="badge grey" id="pragya-badge">Idle</span>
        <span class="meta-kv">Last run: <span id="pragya-last-run">&#8212;</span></span>
      </div>
    </div>
    <div class="card-body">
      <div class="field-group">
        <label>App Name</label>
        <input type="text" id="pragya-app" placeholder="CardCompass" oninput="updatePreview()" />
      </div>
      <div class="field-group">
        <label>Round Stage</label>
        <select id="pragya-stage" onchange="updatePreview()">
          <option value="Pre-seed">Pre-seed</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
        </select>
      </div>
      <div class="field-group">
        <label>Region</label>
        <input type="text" id="pragya-region" placeholder="Dubai / India / Singapore / Global" oninput="updatePreview()" />
      </div>
      <div class="field-group">
        <label>Check Size</label>
        <input type="text" id="pragya-check-size" placeholder="$500K / &#x20B9;4Cr / $1M&#x2013;$2M" oninput="updatePreview()" />
      </div>

      <div>
        <div class="cmd-preview-label">Generated Telegram command</div>
        <div class="cmd-preview" id="pragya-preview">get my &lt;app&gt; app a &lt;stage&gt; investor from &lt;region&gt; region with checks around &lt;checkSize&gt;</div>
      </div>

      <button class="btn btn-copy" id="pragya-copy-btn" onclick="copyTelegramCmd()">
        &#x2398; Copy command &#x2192; paste into Telegram
      </button>
      <div class="howto-box">
        <strong>How to trigger</strong>
        <ol>
          <li>Click <em>Copy command</em> above</li>
          <li>Open your Hermes Telegram bot</li>
          <li>Paste and send &#x2014; Pragya &#x2192; Varta runs automatically</li>
          <li>Drafts appear in <strong>Gmail Drafts</strong> within ~2 min</li>
        </ol>
      </div>
    </div>
    <div class="term-wrap">
      <button class="term-toggle" id="pragya-toggle" onclick="toggleTerm('pragya')">
        <span class="arrow">&#x203A;</span> Terminal Output
      </button>
      <div class="terminal" id="pragya-terminal"># Copy the command above &#x2192; paste into your Hermes Telegram bot
# Pragya searches investors, scores them, Varta saves drafts to Gmail.
# Output from Hermes will appear in Telegram, not here.</div>
    </div>
  </div>

  <!-- ── RUN HISTORY ── -->
  <section id="history-section">
    <div class="history-header">
      <div class="history-label-row">
        <div class="history-eyebrow">Agent Memory</div>
        <div class="history-title">Run History</div>
      </div>
      <button class="btn-clear" onclick="clearLog()">Clear</button>
    </div>
    <div id="history-empty">// no runs recorded yet &#x2014; trigger an agent above</div>
    <div style="overflow-x:auto;">
      <table id="history-table">
        <thead>
          <tr>
            <th>When</th>
            <th>Agent</th>
            <th>Inputs</th>
            <th>Outcome</th>
            <th>Notes</th>
            <th>Re-run</th>
          </tr>
        </thead>
        <tbody id="history-body"></tbody>
      </table>
    </div>
  </section>

</main>

<script>
const MAX_LINES = 200;

// ── Utility ───────────────────────────────────────────────────────────────

function appendToTerm(id, text) {
  const el = document.getElementById(id + '-terminal');
  const lines = el.textContent.split('\\n');
  const merged = [...lines, ...(text || '').split('\\n')].slice(-MAX_LINES);
  el.textContent = merged.join('\\n');
  el.scrollTop = el.scrollHeight;
  const toggle = document.getElementById(id + '-toggle');
  if (!toggle.classList.contains('open')) toggleTerm(id);
}

function toggleTerm(id) {
  const term   = document.getElementById(id + '-terminal');
  const toggle = document.getElementById(id + '-toggle');
  const isOpen = term.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
}

function setBadge(id, status) {
  const el = document.getElementById(id + '-badge');
  el.textContent = status;
  el.className = 'badge';
  if (status === 'Running') el.classList.add('running');
  else if (status === 'OK') el.classList.add('green');
  else if (status === 'Error') el.classList.add('red');
  else el.classList.add('grey');
}

function fmtTime(iso) {
  if (!iso) return 'Never';
  try { return new Date(iso).toLocaleString(); } catch(e) { return iso; }
}

// ── Preview ───────────────────────────────────────────────────────────────

function updatePreview() {
  const app    = document.getElementById('pragya-app').value.trim()        || '<app>';
  const stage  = document.getElementById('pragya-stage').value             || '<stage>';
  const region = document.getElementById('pragya-region').value.trim()     || '<region>';
  const size   = document.getElementById('pragya-check-size').value.trim() || '<checkSize>';
  document.getElementById('pragya-preview').textContent =
    `get my ${app} app a ${stage} investor from ${region} region with checks around ${size}`;
}

// ── Drishti — list repos ──────────────────────────────────────────────────

function clearRepoList() {
  document.getElementById('drishti-repo-list').style.display = 'none';
  document.getElementById('drishti-repo-chips').replaceChildren();
}

async function listRepos() {
  const owner = document.getElementById('drishti-repo-owner').value.trim();
  if (!owner) { appendToTerm('drishti', '\\n⚠  Enter a GitHub username first.'); return; }

  const btn = document.getElementById('drishti-list-btn');
  btn.disabled = true;
  btn.textContent = '⟳ Fetching…';
  appendToTerm('drishti', `\\n$ gh repo list ${owner} --limit 50  (+ affiliated repos)`);

  // Save owner
  try { await fetch('/api/drishti/config', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ repoOwner: owner }) }); } catch(e){}

  try {
    const r = await fetch('/api/drishti/repos', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ owner }) });
    const d = await r.json();

    if (d.error) {
      appendToTerm('drishti', `Error: ${d.error}`);
      setBadge('drishti', 'Error');
    } else {
      const repos = d.repos || [];
      appendToTerm('drishti', repos.map(r => `  ${r.isPrivate ? '🔒' : '🌐'} ${r.name}  (updated ${r.updatedAt ? r.updatedAt.slice(0,10) : '—'})`).join('\\n'));
      appendToTerm('drishti', `\\n${repos.length} repos found. Click one to use as app name in Pragya →`);

      const chips = document.getElementById('drishti-repo-chips');
      chips.replaceChildren();
      repos.forEach(repo => {
        const chip = document.createElement('button');
        chip.className = 'repo-chip';

        // Label
        const label = document.createElement('span');
        label.textContent = repo.name;
        chip.appendChild(label);

        // Tooltip
        const tip = document.createElement('span');
        tip.className = 'chip-tip';
        const updated = repo.updatedAt ? repo.updatedAt.slice(0,10) : '—';
        const pushed  = repo.pushedAt  ? repo.pushedAt.slice(0,10)  : '—';
        const pushCount = typeof repo.pushCount7d === 'number' ? repo.pushCount7d : '—';
        const pushLabel = pushCount === 1 ? 'commit' : 'commits';
        tip.textContent = `Last updated: ${updated}  •  Last push: ${pushed}\\n${pushCount} ${pushLabel} in last 7 days`;
        tip.style.whiteSpace = 'pre';
        chip.appendChild(tip);

        chip.onclick = () => selectRepo(repo.name, chip);
        chips.appendChild(chip);
      });
      document.getElementById('drishti-repo-list').style.display = 'block';
      setBadge('drishti', 'OK');
    }
  } catch(e) {
    appendToTerm('drishti', 'Request failed: ' + e.message);
    setBadge('drishti', 'Error');
  }
  btn.disabled = false;
  btn.textContent = '⟳ List My Repos';
}

function selectRepo(name, chipEl) {
  // Highlight selected chip
  document.querySelectorAll('.repo-chip').forEach(c => c.classList.remove('selected'));
  chipEl.classList.add('selected');
  // Populate Pragya app name
  document.getElementById('pragya-app').value = name;
  updatePreview();
  appendToTerm('drishti', `\\n✓ "${name}" sent to Pragya`);
}

// ── Drishti — run digest ──────────────────────────────────────────────────

async function runDrishti() {
  const btn = document.getElementById('drishti-run-btn');
  btn.disabled = true;
  setBadge('drishti', 'Running');
  const owner = document.getElementById('drishti-repo-owner').value.trim();
  appendToTerm('drishti', `\\n$ hermes cron run "Weekly Repo Digest — All Repos"`);

  try { await fetch('/api/drishti/config', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ repoOwner: owner }) }); } catch(e){}

  try {
    const r = await fetch('/api/drishti/run', { method:'POST' });
    const d = await r.json();
    appendToTerm('drishti', [d.stdout, d.stderr].filter(Boolean).join('\\n') || '(no output)');
    const outcome = d.returncode === 0 ? 'ok' : 'error';
    setBadge('drishti', d.returncode === 0 ? 'OK' : 'Error');
    document.getElementById('drishti-last-run').textContent = fmtTime(new Date().toISOString());
    await logRun('drishti', { repoOwner: owner }, outcome);
  } catch(e) {
    appendToTerm('drishti', 'Request failed: ' + e.message);
    setBadge('drishti', 'Error');
    await logRun('drishti', { repoOwner: owner }, 'error');
  }
  btn.disabled = false;
}

// ── Pragya — copy Telegram command ───────────────────────────────────────

async function copyTelegramCmd() {
  const cmd = document.getElementById('pragya-preview').textContent.trim();
  const btn = document.getElementById('pragya-copy-btn');

  // Validate
  if (cmd.includes('<app>') || cmd.includes('<region>') || cmd.includes('<checkSize>')) {
    btn.textContent = '⚠  Fill in all fields first';
    setTimeout(() => { btn.textContent = '⎘ Copy command → paste into Telegram'; }, 2000);
    return;
  }

  // Save config
  const cfg = {
    app:       document.getElementById('pragya-app').value.trim(),
    stage:     document.getElementById('pragya-stage').value,
    region:    document.getElementById('pragya-region').value.trim(),
    checkSize: document.getElementById('pragya-check-size').value.trim(),
  };
  try { await fetch('/api/pragya/config', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(cfg) }); } catch(e){}

  const now = new Date().toLocaleTimeString();
  try {
    await navigator.clipboard.writeText(cmd);
    btn.textContent = '✓ Copied! Paste into Telegram now';
    appendToTerm('pragya', `\\n[${now}] ✓ Command copied to clipboard:\\n  ${cmd}\\n\\nNext: paste into your Hermes Telegram bot.\\nPragya will search, score, and Varta will save drafts to Gmail Drafts.`);
    setBadge('pragya', 'Ready');
    document.getElementById('pragya-last-run').textContent = now;
    await logRun('pragya', { ...cfg, command: cmd }, 'copied');
    setTimeout(() => { btn.textContent = '⎘ Copy command → paste into Telegram'; }, 3000);
  } catch(e) {
    // Fallback: select the preview text so user can Cmd+C manually
    const el = document.getElementById('pragya-preview');
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    btn.textContent = 'Text selected — Cmd+C to copy';
    appendToTerm('pragya', `\\n[${now}] Clipboard blocked — text selected above. Press Cmd+C.`);
    await logRun('pragya', { ...cfg, command: cmd }, 'copied (manual)');
    setTimeout(() => { btn.textContent = '⎘ Copy command → paste into Telegram'; }, 3000);
  }
}


// ── Run history ───────────────────────────────────────────────────────────

async function loadHistory() {
  try {
    const r = await fetch('/api/log');
    const log = await r.json();
    renderHistory(log.reverse()); // newest first
  } catch(e) {}
}

function renderHistory(log) {
  const empty = document.getElementById('history-empty');
  const table = document.getElementById('history-table');
  const tbody = document.getElementById('history-body');

  if (!log || log.length === 0) {
    empty.style.display = 'block';
    table.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  table.style.display = 'table';

  tbody.replaceChildren();
  log.forEach(entry => {
    const tr = document.createElement('tr');

    // When
    const tdWhen = document.createElement('td');
    tdWhen.style.whiteSpace = 'nowrap';
    tdWhen.textContent = entry.triggeredAt ? new Date(entry.triggeredAt).toLocaleString() : '—';

    // Agent badge
    const tdAgent = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'agent-tag ' + (entry.agent === 'drishti' ? 'drishti' : 'pragya');
    badge.textContent = entry.agent === 'drishti' ? 'Drishti' : 'Pragya+Varta';
    tdAgent.appendChild(badge);

    // Inputs
    const tdInputs = document.createElement('td');
    tdInputs.style.maxWidth = '260px';
    if (entry.agent === 'drishti') {
      tdInputs.textContent = `Repo owner: ${entry.inputs?.repoOwner || '—'}`;
    } else {
      const inp = entry.inputs || {};
      const lines = [
        inp.app      ? `App: ${inp.app}` : null,
        inp.stage    ? `Stage: ${inp.stage}` : null,
        inp.region   ? `Region: ${inp.region}` : null,
        inp.checkSize? `Check: ${inp.checkSize}` : null,
      ].filter(Boolean);
      lines.forEach((line, i) => {
        const d = document.createElement('div');
        d.textContent = line;
        if (i > 0) d.style.color = 'var(--text-muted)';
        tdInputs.appendChild(d);
      });
      if (inp.command) {
        const cmd = document.createElement('div');
        cmd.style.cssText = 'font-family:"Fira Code",monospace;font-size:11px;color:var(--text-muted);margin-top:4px;word-break:break-all;';
        cmd.textContent = inp.command;
        tdInputs.appendChild(cmd);
      }
    }

    // Outcome
    const tdOutcome = document.createElement('td');
    const oc = document.createElement('span');
    const outcome = (entry.outcome || '').toLowerCase();
    oc.className = outcome === 'ok' ? 'outcome-ok' : outcome.includes('copied') ? 'outcome-copy' : outcome === 'error' ? 'outcome-err' : '';
    oc.textContent = entry.outcome || '—';
    tdOutcome.appendChild(oc);

    // Notes (editable inline)
    const tdNotes = document.createElement('td');
    tdNotes.style.minWidth = '160px';
    const noteInput = document.createElement('input');
    noteInput.type = 'text';
    noteInput.placeholder = 'Add result notes…';
    noteInput.value = entry.notes || '';
    noteInput.className = 'note-input';
    noteInput.addEventListener('change', async () => {
      try {
        await fetch('/api/log/note', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ id: entry.id, notes: noteInput.value })
        });
      } catch(e) {}
    });
    tdNotes.appendChild(noteInput);

    // Re-run button
    const tdRerun = document.createElement('td');
    const rerunBtn = document.createElement('button');
    rerunBtn.textContent = '\\u21BA Re-run';
    rerunBtn.className = 'btn-rerun';
    rerunBtn.onclick = () => prefillFromHistory(entry);
    tdRerun.appendChild(rerunBtn);

    tr.append(tdWhen, tdAgent, tdInputs, tdOutcome, tdNotes, tdRerun);
    tbody.appendChild(tr);
  });
}

function prefillFromHistory(entry) {
  if (entry.agent === 'drishti') {
    if (entry.inputs?.repoOwner) {
      document.getElementById('drishti-repo-owner').value = entry.inputs.repoOwner;
      clearRepoList();
    }
    document.getElementById('drishti-run-btn').scrollIntoView({behavior:'smooth', block:'center'});
  } else {
    const inp = entry.inputs || {};
    if (inp.app)       { document.getElementById('pragya-app').value        = inp.app; }
    if (inp.stage)     { document.getElementById('pragya-stage').value      = inp.stage; }
    if (inp.region)    { document.getElementById('pragya-region').value     = inp.region; }
    if (inp.checkSize) { document.getElementById('pragya-check-size').value = inp.checkSize; }
    updatePreview();
    document.getElementById('pragya-copy-btn').scrollIntoView({behavior:'smooth', block:'center'});
  }
}

async function logRun(agent, inputs, outcome) {
  const entry = {
    id: Date.now().toString(),
    agent,
    triggeredAt: new Date().toISOString(),
    inputs,
    outcome,
    notes: ''
  };
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(entry)
    });
    await loadHistory();
  } catch(e) {}
}

async function clearLog() {
  if (!confirm('Clear all run history?')) return;
  try {
    await fetch('/api/log/clear', { method: 'POST' });
    await loadHistory();
  } catch(e) {}
}

// ── Boot ──────────────────────────────────────────────────────────────────

async function init() {
  try {
    const r = await fetch('/api/status');
    const d = await r.json();
    if (d.drishti) { setBadge('drishti', d.drishti.status || 'Idle'); document.getElementById('drishti-last-run').textContent = fmtTime(d.drishti.lastRun); }
    if (d.pragya)  { setBadge('pragya',  d.pragya.status  || 'Idle'); document.getElementById('pragya-last-run').textContent  = fmtTime(d.pragya.lastRun); }
  } catch(e) {}

  try {
    const r = await fetch('/api/drishti/config');
    const d = await r.json();
    if (d.repoOwner) document.getElementById('drishti-repo-owner').value = d.repoOwner;
  } catch(e) {}

  try {
    const r = await fetch('/api/pragya/config');
    const d = await r.json();
    if (d.app)       document.getElementById('pragya-app').value        = d.app;
    if (d.stage)     document.getElementById('pragya-stage').value      = d.stage;
    if (d.region)    document.getElementById('pragya-region').value     = d.region;
    if (d.checkSize) document.getElementById('pragya-check-size').value = d.checkSize;
  } catch(e) {}

  updatePreview();
  await loadHistory();
}

init();
</script>
<footer>Hermes Dashboard &#x2022; Founder&#x2019;s Guide to Agents &#x2022; Saturday 2026-07-19</footer>
</body>
</html>
"""


# ---------------------------------------------------------------------------
# Request handler
# ---------------------------------------------------------------------------

class DashboardHandler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        # Quiet access log — just method + path
        print(f"  {self.command} {self.path}")

    # ── helpers ──────────────────────────────────────────────────────────

    def send_json(self, data, status=200):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        self.wfile.write(body)

    def send_html(self, html, status=200):
        body = html.encode()
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_body_json(self):
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw)
        except Exception:
            return {}

    def run_cmd(self, cmd):
        try:
            result = subprocess.run(
                cmd, capture_output=True, text=True, timeout=120
            )
            return {
                "returncode": result.returncode,
                "stdout": result.stdout,
                "stderr": result.stderr,
            }
        except subprocess.TimeoutExpired:
            return {"returncode": -1, "stdout": "", "stderr": "Command timed out after 120s"}
        except Exception as e:
            return {"returncode": -1, "stdout": "", "stderr": str(e)}

    # ── routing ──────────────────────────────────────────────────────────

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/":
            self.send_html(DASHBOARD_HTML)

        elif path == "/api/status":
            drishti_cfg = read_config("drishti_config.json")
            pragya_cfg  = read_config("pragya_config.json")
            self.send_json({
                "drishti": {
                    "lastRun":    drishti_cfg.get("lastRun"),
                    "nextRun":    "Monday 9:00 AM",
                    "status":     drishti_cfg.get("status", "Idle"),
                    "configPath": str(HERMES_DIR / "drishti_config.json"),
                },
                "pragya": {
                    "lastRun":    pragya_cfg.get("lastRun"),
                    "status":     pragya_cfg.get("status", "Idle"),
                    "configPath": str(HERMES_DIR / "pragya_config.json"),
                },
            })

        elif path == "/api/drishti/config":
            self.send_json(read_config("drishti_config.json"))

        elif path == "/api/pragya/config":
            self.send_json(read_config("pragya_config.json"))

        elif path == "/api/log":
            self.send_json(read_log())

        else:
            self.send_json({"error": "Not found"}, 404)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/drishti/repos":
            token = load_github_token()
            if token:
                try:
                    repos = fetch_all_repos(token)
                    self.send_json({"repos": repos, "source": "api"})
                except Exception as e:
                    self.send_json({"error": f"GitHub API error: {e}"})
                return

            # Fallback: gh CLI (covers only the authenticated account)
            body = self.read_body_json()
            owner = body.get("owner", "").strip()
            whoami = self.run_cmd(["gh", "api", "user", "--jq", ".login"])
            authed_user = whoami["stdout"].strip() if whoami["returncode"] == 0 else ""
            handles = list({h for h in [owner, authed_user] if h})

            repos, seen, last_err = [], set(), ""
            for handle in handles:
                result = self.run_cmd([
                    "gh", "repo", "list", handle,
                    "--json", "name,nameWithOwner,isPrivate,updatedAt",
                    "--limit", "100"
                ])
                if result["returncode"] != 0:
                    last_err = result["stderr"] or f"gh repo list {handle} failed"
                    continue
                try:
                    for r in json.loads(result["stdout"] or "[]"):
                        key = r.get("nameWithOwner") or r.get("name", "")
                        if key and key not in seen:
                            seen.add(key)
                            repos.append(r)
                except Exception:
                    pass

            if not repos:
                self.send_json({"error": last_err or "No repos found"})
                return
            repos.sort(key=lambda r: r.get("updatedAt") or "", reverse=True)
            self.send_json({"repos": repos, "source": "gh-cli", "accounts": handles})

        elif path == "/api/drishti/run":
            cmd = ["hermes", "cron", "run", "Weekly Repo Digest — All Repos"]
            result = self.run_cmd(cmd)
            # Persist last-run timestamp
            cfg = read_config("drishti_config.json")
            import datetime
            cfg["lastRun"] = datetime.datetime.utcnow().isoformat() + "Z"
            cfg["status"]  = "OK" if result["returncode"] == 0 else "Error"
            write_config("drishti_config.json", cfg)
            self.send_json(result)

        elif path == "/api/log":
            entry = self.read_body_json()
            if entry:
                append_log(entry)
            self.send_json({"ok": True})

        elif path == "/api/log/note":
            body = self.read_body_json()
            run_id = body.get("id", "")
            notes  = body.get("notes", "")
            log = read_log()
            for entry in log:
                if entry.get("id") == run_id:
                    entry["notes"] = notes
                    break
            HERMES_DIR.mkdir(parents=True, exist_ok=True)
            (HERMES_DIR / LOG_FILE).write_text(json.dumps(log, indent=2))
            self.send_json({"ok": True})

        elif path == "/api/log/clear":
            HERMES_DIR.mkdir(parents=True, exist_ok=True)
            (HERMES_DIR / LOG_FILE).write_text("[]")
            self.send_json({"ok": True})

        elif path == "/api/drishti/config":
            data = self.read_body_json()
            cfg  = read_config("drishti_config.json")
            cfg.update(data)
            write_config("drishti_config.json", cfg)
            self.send_json({"ok": True})

        elif path == "/api/pragya/config":
            data = self.read_body_json()
            cfg  = read_config("pragya_config.json")
            cfg.update(data)
            write_config("pragya_config.json", cfg)
            self.send_json({"ok": True})

        else:
            self.send_json({"error": "Not found"}, 404)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    run_preflight()

    PORT = 7890
    url  = f"http://localhost:{PORT}"
    print(f"Starting Hermes Dashboard on {url}")
    print("Open this URL in your browser to monitor and trigger your agents.")
    print("Press Ctrl+C to stop.")

    server = HTTPServer(("", PORT), DashboardHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nDashboard stopped.")
