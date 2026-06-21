@echo off
REM Lumière Bakery Demo — local launcher (Windows)
REM Double-click this file to start.

cd /d "%~dp0\.."

set PORT=8000
set APP_PATH=lumiere-bakery-app/
set OLLAMA_URL=http://localhost:11434

echo.
echo Lumiere Bakery Demo - local launcher
echo EdYoda . GenAI for Non-Coders . Session 4 (RAG)
echo.

echo Checking Ollama at %OLLAMA_URL% ...
curl -s -m 3 %OLLAMA_URL%/api/tags > "%TEMP%\lumiere_ollama_tags.json" 2>nul
if errorlevel 1 (
  echo   Ollama is not reachable. Install from ollama.com/download and run: ollama serve
  echo   Then pull models:  ollama pull llama3.2:3b  ^&^&  ollama pull nomic-embed-text
  echo.
  echo   The launcher will still open the app -- Settings tab will show how to install.
) else (
  echo   OK
)

echo.
echo Starting local server on http://localhost:%PORT%
echo Serving from: %CD%
echo.
echo When done: close this window to stop the server.
echo.

start "" "http://localhost:%PORT%/%APP_PATH%"

where python3 >nul 2>nul
if not errorlevel 1 (
  python3 -m http.server %PORT%
  goto :eof
)
where python >nul 2>nul
if not errorlevel 1 (
  python -m http.server %PORT%
  goto :eof
)

echo No Python found. Install Python 3 from python.org and try again.
pause
