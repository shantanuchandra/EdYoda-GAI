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
# Inline HTML dashboard
# ---------------------------------------------------------------------------

DASHBOARD_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hermes Dashboard</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f8f9fa;
    --card-bg: #ffffff;
    --border: #e2e8f0;
    --text: #1a202c;
    --text-muted: #718096;
    --accent1: #4f46e5;   /* Drishti — indigo */
    --accent2: #0891b2;   /* Pragya — cyan */
    --green: #16a34a;
    --red: #dc2626;
    --grey: #9ca3af;
    --term-bg: #0f172a;
    --term-text: #a3e635;
    --shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
    --radius: 10px;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 14px 28px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  header .logo {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  header .logo span { color: var(--accent1); }
  header .tagline {
    font-size: 12px;
    color: var(--text-muted);
    margin-left: auto;
  }

  main {
    flex: 1;
    display: flex;
    gap: 24px;
    padding: 28px;
    align-items: flex-start;
  }

  .card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
  }

  .card-header {
    padding: 20px 22px 16px;
    border-bottom: 1px solid var(--border);
  }
  .card-header h2 {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.2px;
  }
  .card-header h2.drishti { color: var(--accent1); }
  .card-header h2.pragya  { color: var(--accent2); }
  .card-header .subtitle {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
  }
  .status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .badge::before { content: ""; width: 7px; height: 7px; border-radius: 50%; }
  .badge.green  { background: #dcfce7; color: var(--green); }
  .badge.green::before  { background: var(--green); }
  .badge.grey   { background: #f3f4f6; color: #6b7280; }
  .badge.grey::before   { background: var(--grey); }
  .badge.red    { background: #fee2e2; color: var(--red); }
  .badge.red::before    { background: var(--red); }

  .meta-row {
    font-size: 12px;
    color: var(--text-muted);
  }
  .meta-row strong { color: var(--text); }

  .card-body {
    padding: 18px 22px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .field-group { display: flex; flex-direction: column; gap: 5px; }
  .field-group label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
  .field-group input,
  .field-group select {
    font-size: 14px;
    padding: 8px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    width: 100%;
    outline: none;
    transition: border-color .15s;
  }
  .field-group input:focus,
  .field-group select:focus { border-color: var(--accent1); }
  .card.pragya-card .field-group input:focus,
  .card.pragya-card .field-group select:focus { border-color: var(--accent2); }

  .cmd-preview {
    background: #f1f5f9;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 12px;
    font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
    font-size: 12px;
    color: #334155;
    word-break: break-all;
    line-height: 1.5;
  }
  .cmd-preview-label { font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 18px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    transition: opacity .15s, transform .1s;
    width: 100%;
    letter-spacing: 0.01em;
  }
  .btn:hover { opacity: .88; }
  .btn:active { transform: scale(.98); }
  .btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }
  .btn-drishti { background: var(--accent1); color: #fff; }
  .btn-pragya  { background: var(--accent2); color: #fff; }

  .term-wrap {
    border-top: 1px solid var(--border);
  }
  .term-toggle {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    padding: 8px 22px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .term-toggle:hover { background: var(--bg); }
  .term-toggle .arrow { transition: transform .2s; }
  .term-toggle.open .arrow { transform: rotate(90deg); }

  .terminal {
    display: none;
    background: var(--term-bg);
    color: var(--term-text);
    font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
    font-size: 12px;
    padding: 12px 16px;
    max-height: 240px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.6;
  }
  .terminal.open { display: block; }

  footer {
    text-align: center;
    font-size: 11px;
    color: var(--text-muted);
    padding: 14px;
    border-top: 1px solid var(--border);
    background: #fff;
  }

  .divider { width: 1px; background: var(--border); align-self: stretch; flex-shrink: 0; }

  @media (max-width: 768px) {
    main { flex-direction: column; padding: 16px; }
    .divider { display: none; }
  }
</style>
</head>
<body>

<header>
  <div class="logo">⚡ <span>Hermes</span> Dashboard</div>
  <div class="tagline">Founder's Guide to Agents · Local Control Panel</div>
</header>

<main>

  <!-- ── DRISHTI CARD ── -->
  <div class="card drishti-card">
    <div class="card-header">
      <h2 class="drishti">Drishti · दृष्टि</h2>
      <div class="subtitle">Weekly Repo Digest</div>
      <div class="status-row">
        <span class="badge grey" id="drishti-badge">Idle</span>
        <span class="meta-row"><strong>Last run:</strong> <span id="drishti-last-run">—</span></span>
      </div>
      <div class="meta-row" style="margin-top:4px">
        <strong>Next run:</strong> Monday 9:00 AM
      </div>
    </div>
    <div class="card-body">
      <div class="field-group">
        <label>Repo Owner</label>
        <input type="text" id="drishti-repo-owner" placeholder="e.g. your-github-username" />
      </div>
      <div class="field-group">
        <label>Run Time</label>
        <input type="text" id="drishti-run-time" value="Monday 9:00 AM" readonly style="opacity:.6;cursor:default;" />
      </div>
      <button class="btn btn-drishti" id="drishti-run-btn" onclick="runDrishti()">
        ▶ Run Now
      </button>
    </div>
    <div class="term-wrap">
      <button class="term-toggle" id="drishti-toggle" onclick="toggleTerm('drishti')">
        <span class="arrow">›</span> Terminal Output
      </button>
      <div class="terminal" id="drishti-terminal"># Waiting for run…</div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- ── PRAGYA + VARTA CARD ── -->
  <div class="card pragya-card">
    <div class="card-header">
      <h2 class="pragya">Pragya · प्रज्ञा + Varta · वार्ता</h2>
      <div class="subtitle">Investor Intel + Outreach</div>
      <div class="status-row">
        <span class="badge grey" id="pragya-badge">Idle</span>
        <span class="meta-row"><strong>Last run:</strong> <span id="pragya-last-run">—</span></span>
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
        <input type="text" id="pragya-check-size" placeholder="$500K / ₹4Cr / $1M–$2M" oninput="updatePreview()" />
      </div>

      <div>
        <div class="cmd-preview-label">Generated command</div>
        <div class="cmd-preview" id="pragya-preview">get my &lt;app&gt; app a &lt;stage&gt; investor from &lt;region&gt; region with checks around &lt;checkSize&gt;</div>
      </div>

      <button class="btn btn-pragya" id="pragya-run-btn" onclick="runPragya()">
        ▶ Trigger Pragya → Varta
      </button>
    </div>
    <div class="term-wrap">
      <button class="term-toggle" id="pragya-toggle" onclick="toggleTerm('pragya')">
        <span class="arrow">›</span> Terminal Output
      </button>
      <div class="terminal" id="pragya-terminal"># Waiting for trigger…</div>
    </div>
  </div>

</main>

<footer>Hermes Dashboard · Founder's Guide to Agents · Saturday 2026-07-19</footer>

<script>
const MAX_LINES = 200;

// ── Utility ──────────────────────────────────────────────────────────────

function appendToTerm(id, text) {
  const el = document.getElementById(id + '-terminal');
  const lines = el.textContent.split('\\n');
  const newLines = (text || '').split('\\n');
  const merged = [...lines, ...newLines].slice(-MAX_LINES);
  el.textContent = merged.join('\\n');
  el.scrollTop = el.scrollHeight;
  // Auto-open terminal
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
  if (status === 'Running')  el.classList.add('green');
  else if (status === 'Error') el.classList.add('red');
  else                         el.classList.add('grey');
}

function fmtTime(iso) {
  if (!iso) return 'Never';
  try { return new Date(iso).toLocaleString(); } catch(e) { return iso; }
}

// ── Live preview ──────────────────────────────────────────────────────────

function updatePreview() {
  const app   = document.getElementById('pragya-app').value.trim()       || '<app>';
  const stage = document.getElementById('pragya-stage').value            || '<stage>';
  const region= document.getElementById('pragya-region').value.trim()    || '<region>';
  const size  = document.getElementById('pragya-check-size').value.trim()|| '<checkSize>';
  document.getElementById('pragya-preview').textContent =
    `get my ${app} app a ${stage} investor from ${region} region with checks around ${size}`;
}

// ── On page load ──────────────────────────────────────────────────────────

async function init() {
  // Status
  try {
    const r = await fetch('/api/status');
    const d = await r.json();
    if (d.drishti) {
      setBadge('drishti', d.drishti.status || 'Idle');
      document.getElementById('drishti-last-run').textContent = fmtTime(d.drishti.lastRun);
    }
    if (d.pragya) {
      setBadge('pragya', d.pragya.status || 'Idle');
      document.getElementById('pragya-last-run').textContent = fmtTime(d.pragya.lastRun);
    }
  } catch(e) { console.warn('Status fetch failed', e); }

  // Drishti config
  try {
    const r = await fetch('/api/drishti/config');
    const d = await r.json();
    if (d.repoOwner) document.getElementById('drishti-repo-owner').value = d.repoOwner;
    if (d.runTime)   document.getElementById('drishti-run-time').value   = d.runTime;
  } catch(e) {}

  // Pragya config
  try {
    const r = await fetch('/api/pragya/config');
    const d = await r.json();
    if (d.app)       document.getElementById('pragya-app').value        = d.app;
    if (d.stage)     document.getElementById('pragya-stage').value      = d.stage;
    if (d.region)    document.getElementById('pragya-region').value     = d.region;
    if (d.checkSize) document.getElementById('pragya-check-size').value = d.checkSize;
  } catch(e) {}

  updatePreview();
}

// ── Drishti run ───────────────────────────────────────────────────────────

async function runDrishti() {
  const btn = document.getElementById('drishti-run-btn');
  btn.disabled = true;
  setBadge('drishti', 'Running');
  appendToTerm('drishti', '\\n$ hermes cron run "Weekly Repo Digest — All Repos"');

  // Save config first
  const cfg = {
    repoOwner: document.getElementById('drishti-repo-owner').value.trim(),
    runTime:   document.getElementById('drishti-run-time').value.trim(),
  };
  try { await fetch('/api/drishti/config', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(cfg) }); } catch(e){}

  try {
    const r   = await fetch('/api/drishti/run', { method: 'POST' });
    const d   = await r.json();
    const out = [d.stdout, d.stderr].filter(Boolean).join('\\n');
    appendToTerm('drishti', out || '(no output)');
    setBadge('drishti', d.returncode === 0 ? 'OK' : 'Error');
    document.getElementById('drishti-last-run').textContent = fmtTime(new Date().toISOString());
  } catch(e) {
    appendToTerm('drishti', 'Request failed: ' + e.message);
    setBadge('drishti', 'Error');
  }
  btn.disabled = false;
}

// ── Pragya run ────────────────────────────────────────────────────────────

async function runPragya() {
  const btn = document.getElementById('pragya-run-btn');
  btn.disabled = true;
  setBadge('pragya', 'Running');

  const app       = document.getElementById('pragya-app').value.trim();
  const stage     = document.getElementById('pragya-stage').value;
  const region    = document.getElementById('pragya-region').value.trim();
  const checkSize = document.getElementById('pragya-check-size').value.trim();
  const msg       = `get my ${app} app a ${stage} investor from ${region} region with checks around ${checkSize}`;

  appendToTerm('pragya', `\\n$ hermes chat "${msg}"`);

  // Save config
  const cfg = { app, stage, region, checkSize };
  try { await fetch('/api/pragya/config', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(cfg) }); } catch(e){}

  try {
    const r   = await fetch('/api/pragya/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app, stage, region, checkSize })
    });
    const d   = await r.json();
    const out = [d.stdout, d.stderr].filter(Boolean).join('\\n');
    appendToTerm('pragya', out || '(no output)');
    setBadge('pragya', d.returncode === 0 ? 'OK' : 'Error');
    document.getElementById('pragya-last-run').textContent = fmtTime(new Date().toISOString());
  } catch(e) {
    appendToTerm('pragya', 'Request failed: ' + e.message);
    setBadge('pragya', 'Error');
  }
  btn.disabled = false;
}

// ── Boot ──────────────────────────────────────────────────────────────────
init();
</script>
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

        else:
            self.send_json({"error": "Not found"}, 404)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/drishti/run":
            cmd = ["hermes", "cron", "run", "Weekly Repo Digest — All Repos"]
            result = self.run_cmd(cmd)
            # Persist last-run timestamp
            cfg = read_config("drishti_config.json")
            import datetime
            cfg["lastRun"] = datetime.datetime.utcnow().isoformat() + "Z"
            cfg["status"]  = "OK" if result["returncode"] == 0 else "Error"
            write_config("drishti_config.json", cfg)
            self.send_json(result)

        elif path == "/api/pragya/run":
            body = self.read_body_json()
            app        = body.get("app", "").strip()
            stage      = body.get("stage", "").strip()
            region     = body.get("region", "").strip()
            check_size = body.get("checkSize", "").strip()
            message = (
                f"get my {app} app a {stage} investor "
                f"from {region} region with checks around {check_size}"
            )
            cmd = ["hermes", "chat", message]
            result = self.run_cmd(cmd)
            # Persist last-run timestamp
            cfg = read_config("pragya_config.json")
            import datetime
            cfg["lastRun"] = datetime.datetime.utcnow().isoformat() + "Z"
            cfg["status"]  = "OK" if result["returncode"] == 0 else "Error"
            # Also persist the params
            if app:        cfg["app"]       = app
            if stage:      cfg["stage"]     = stage
            if region:     cfg["region"]    = region
            if check_size: cfg["checkSize"] = check_size
            write_config("pragya_config.json", cfg)
            self.send_json(result)

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
