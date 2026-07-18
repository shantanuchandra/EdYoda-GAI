#!/usr/bin/env bash
# sync_course.sh — Mirror all course HTML files into course/ (space-free paths)
# Run from the repo root: bash scripts/sync_course.sh
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$REPO/course"

copy_html() {
  local src_dir="$1" dst_dir="$2"
  mkdir -p "$dst_dir"
  find "$src_dir" -maxdepth 1 -name "*.html" -exec cp -f {} "$dst_dir/" \;
}

# ── GenAI for Non-Coders ──────────────────────────────────────────────────────
G="$REPO/GenAI for Non-Coders"
copy_html "$G/Session 01 - Generative AI Foundations"                                   "$DEST/genai/s01"
copy_html "$G/Session 02 - From Chatbot to Agent"                                       "$DEST/genai/s02"
copy_html "$G/Session 03 - Prompt Engineering Context Engineering for Agents"           "$DEST/genai/s03"
copy_html "$G/Session 04 - RAG Giving Agents a Brain of Your Own Data"                  "$DEST/genai/s04"
copy_html "$G/Session 05 - Agent Architecture"                                          "$DEST/genai/s05"
copy_html "$G/Session 06 - Workflow Automation with n8n"                                "$DEST/genai/s06"
copy_html "$G/Session 07 - Workflow Automation with n8n - Part 2"                       "$DEST/genai/s07"
copy_html "$G/AI Evals - Elective"                                                      "$DEST/genai/evals"

# ── AI-PM ─────────────────────────────────────────────────────────────────────
P="$REPO/AI-PM/Production AI PM Program"
copy_html "$P/Week 01 - AI Product Judgment for Senior PMs"                             "$DEST/aipm/w01"
copy_html "$P/Week 02 - AI Strategy Moats and Business Case"                            "$DEST/aipm/w02"
copy_html "$P/Week 03 - GenAI System Design for PMs"                                    "$DEST/aipm/w03"
copy_html "$P/Week 04 - Agentic Product Design"                                         "$DEST/aipm/w04"
copy_html "$P/Week 05 - Evals as the New PRD"                                           "$DEST/aipm/w05"
copy_html "$P/Week 06 - Working with AI ML Engineering Teams"                           "$DEST/aipm/w06"
copy_html "$P/Week 07 - Production Readiness Cost Latency Safety and Launch"            "$DEST/aipm/w07"
copy_html "$P/Week 08 - Executive Narrative Portfolio and AI PM Interview Readiness"    "$DEST/aipm/w08"
cp -f "$P/index.html"    "$DEST/aipm/index.html"    2>/dev/null || true
cp -f "$P/md-viewer.html" "$DEST/aipm/md-viewer.html" 2>/dev/null || true

# ── Founder's Guide to Agents ─────────────────────────────────────────────────
copy_html "$REPO/Founder's Guide to Agents/session"                                     "$DEST/founders"

echo "✅  Sync complete → $DEST"
find "$DEST" -name "*.html" | sort
