#!/bin/bash
# Lumière Bakery Demo — local launcher (macOS / Linux)
# Double-click this file to start.
#
# What it does:
#   1. Verifies Ollama is reachable on http://localhost:11434
#   2. Verifies the two required models are present (llama3.2:3b + nomic-embed-text)
#   3. Starts a tiny static file server on port 8000 from the PARENT folder
#      (so the app can fetch ../Lumiere_KB.md, ../Lumiere_Policy_*.md)
#   4. Opens http://localhost:8000/lumiere-bakery-app/ in your default browser

set -e
cd "$(dirname "$0")/.."   # → Session 04 - RAG ... folder

PORT=8000
APP_PATH="lumiere-bakery-app/"
OLLAMA_URL="http://localhost:11434"

# Pretty colors when running in Terminal
BOLD=$(tput bold 2>/dev/null || echo "")
DIM=$(tput dim 2>/dev/null || echo "")
GREEN=$(tput setaf 2 2>/dev/null || echo "")
RED=$(tput setaf 1 2>/dev/null || echo "")
YELLOW=$(tput setaf 3 2>/dev/null || echo "")
RESET=$(tput sgr0 2>/dev/null || echo "")

echo ""
echo "${BOLD}Lumière Bakery Demo — local launcher${RESET}"
echo "${DIM}EdYoda · GenAI for Non-Coders · Session 4 (RAG)${RESET}"
echo ""

# ─── 1. Ollama reachable? ──────────────────────────────────────────────────────
echo -n "Checking Ollama at ${OLLAMA_URL}... "
if curl -s -m 3 "${OLLAMA_URL}/api/tags" > /tmp/lumiere_ollama_tags.json 2>/dev/null; then
  echo "${GREEN}OK${RESET}"
  HAVE_OLLAMA=1
else
  echo "${RED}not reachable${RESET}"
  HAVE_OLLAMA=0
  echo ""
  echo "${YELLOW}Ollama is not running.${RESET}"
  echo "  1. Install from ${BOLD}ollama.com/download${RESET} (or: brew install ollama)"
  echo "  2. Start it:  ${BOLD}ollama serve${RESET}  (in another Terminal tab)"
  echo "  3. Pull the models (see step 2 below)"
  echo ""
  echo "The launcher will still open the app — the Settings tab will show how to install."
fi

# ─── 2. Models present? ────────────────────────────────────────────────────────
if [ "$HAVE_OLLAMA" = "1" ]; then
  HAS_CHAT=$(grep -c '"llama3.2:3b"' /tmp/lumiere_ollama_tags.json 2>/dev/null || echo 0)
  HAS_EMB=$(grep -c '"nomic-embed-text' /tmp/lumiere_ollama_tags.json 2>/dev/null || echo 0)

  if [ "$HAS_CHAT" -eq 0 ] || [ "$HAS_EMB" -eq 0 ]; then
    echo ""
    echo "${YELLOW}One or more required models are missing.${RESET}"
    [ "$HAS_CHAT" -eq 0 ] && echo "  → Run:  ${BOLD}ollama pull llama3.2:3b${RESET}"
    [ "$HAS_EMB" -eq 0 ]  && echo "  → Run:  ${BOLD}ollama pull nomic-embed-text${RESET}"
    echo "${DIM}(Downloads are ~2 GB + ~270 MB. Do this once.)${RESET}"
  else
    echo "Models present: ${GREEN}llama3.2:3b${RESET} + ${GREEN}nomic-embed-text${RESET}"
  fi
fi

# ─── 3. Free port 8000 if needed ───────────────────────────────────────────────
EXISTING=$(lsof -i :${PORT} -t 2>/dev/null || true)
if [ -n "$EXISTING" ]; then
  echo ""
  echo "${YELLOW}Port ${PORT} is busy (PID ${EXISTING}). Trying to free it...${RESET}"
  kill ${EXISTING} 2>/dev/null || true
  sleep 0.5
fi

# ─── 4. Start the server ───────────────────────────────────────────────────────
echo ""
echo "Starting local server on ${BOLD}http://localhost:${PORT}${RESET}"
echo "Serving from: ${DIM}$(pwd)${RESET}"
echo ""
echo "${BOLD}When done: close this window or press Ctrl-C to stop the server.${RESET}"
echo ""

# Open browser after a short delay so the server has time to start
(sleep 1 && open "http://localhost:${PORT}/${APP_PATH}") &

# Run the server (foreground so Ctrl-C stops it cleanly)
if command -v python3 > /dev/null 2>&1; then
  python3 -m http.server ${PORT}
elif command -v python > /dev/null 2>&1; then
  python -m SimpleHTTPServer ${PORT}
else
  echo "${RED}No Python found. Install Python 3 from python.org and try again.${RESET}"
  read -p "Press Enter to close..."
  exit 1
fi
