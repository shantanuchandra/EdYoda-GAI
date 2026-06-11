#!/bin/bash
# Lumière S5 Agent Demo — local launcher (macOS / Linux)
# Double-click this file to start.

set -e
cd "$(dirname "$0")/.."

PORT=8000
APP_PATH="lumiere-bakery-s5-app/"
OLLAMA_URL="http://localhost:11434"

BOLD=$(tput bold 2>/dev/null || echo "")
DIM=$(tput dim 2>/dev/null || echo "")
GREEN=$(tput setaf 2 2>/dev/null || echo "")
RED=$(tput setaf 1 2>/dev/null || echo "")
YELLOW=$(tput setaf 3 2>/dev/null || echo "")
RESET=$(tput sgr0 2>/dev/null || echo "")

echo ""
echo "${BOLD}Lumière S5 Agent Demo — local launcher${RESET}"
echo "${DIM}EdYoda · GenAI for Non-Coders · Session 5 (Agent Architecture)${RESET}"
echo ""

echo -n "Checking Ollama at ${OLLAMA_URL}... "
if curl -s -m 3 "${OLLAMA_URL}/api/tags" > /tmp/lumiere_s5_tags.json 2>/dev/null; then
  echo "${GREEN}OK${RESET}"
  HAVE_OLLAMA=1
else
  echo "${RED}not reachable${RESET}"
  HAVE_OLLAMA=0
  echo ""
  echo "${YELLOW}Ollama is not running.${RESET}"
  echo "  1. Install from ${BOLD}ollama.com/download${RESET}"
  echo "  2. Start it:  ${BOLD}ollama serve${RESET}"
  echo "  3. Pull the model:  ${BOLD}ollama pull qwen2.5:3b-instruct${RESET}"
  echo ""
fi

if [ "$HAVE_OLLAMA" = "1" ]; then
  HAS_CHAT=$(grep -c '"qwen2.5:3b' /tmp/lumiere_s5_tags.json 2>/dev/null || echo 0)
  if [ "$HAS_CHAT" -eq 0 ]; then
    echo "${YELLOW}Recommended model qwen2.5:3b-instruct is not installed.${RESET}"
    echo "  → Run:  ${BOLD}ollama pull qwen2.5:3b-instruct${RESET}"
    echo "  ${DIM}(Demo will still run with any chat model in the dropdown.)${RESET}"
  else
    echo "Model present: ${GREEN}qwen2.5:3b-instruct${RESET}"
  fi
fi

EXISTING=$(lsof -i :${PORT} -t 2>/dev/null || true)
if [ -n "$EXISTING" ]; then
  echo ""
  echo "${YELLOW}Port ${PORT} is busy (PID ${EXISTING}). Trying to free it...${RESET}"
  kill ${EXISTING} 2>/dev/null || true
  sleep 0.5
fi

echo ""
echo "Starting local server on ${BOLD}http://localhost:${PORT}${RESET}"
echo "Serving from: ${DIM}$(pwd)${RESET}"
echo ""
echo "${BOLD}Endpoints:${RESET}"
echo "  App:    http://localhost:${PORT}/${APP_PATH}"
echo "  Quote:  ${BOLD}POST http://localhost:${PORT}/api/quote${RESET}  (used by n8n)"
echo "  Health: http://localhost:${PORT}/api/health"
echo ""
echo "${BOLD}When done: close this window or press Ctrl-C to stop the server.${RESET}"
echo ""

(sleep 1 && open "http://localhost:${PORT}/${APP_PATH}") &

# Prefer Node (gives us /api/quote backend). Fall back to Python static-only.
if command -v node > /dev/null 2>&1; then
  exec node "${APP_PATH}server.js"
else
  echo "${YELLOW}Node.js not found — falling back to static-only Python server.${RESET}"
  echo "${YELLOW}The /api/quote endpoint will NOT be available without Node.${RESET}"
  echo "  Install Node from ${BOLD}nodejs.org${RESET} (or: brew install node)"
  echo ""
  if command -v python3 > /dev/null 2>&1; then
    python3 -m http.server ${PORT}
  elif command -v python > /dev/null 2>&1; then
    python -m SimpleHTTPServer ${PORT}
  else
    echo "${RED}No Python found either. Install Node from nodejs.org and try again.${RESET}"
    read -p "Press Enter to close..."
    exit 1
  fi
fi
