@echo off
REM Lumière S5 Agent Demo — local launcher (Windows)
cd /d "%~dp0\.."

set PORT=8000
set APP_PATH=lumiere-bakery-s5-app/
set OLLAMA_URL=http://localhost:11434

echo.
echo Lumiere S5 Agent Demo - local launcher
echo EdYoda . GenAI for Non-Coders . Session 5 (Agent Architecture)
echo.

echo Checking Ollama at %OLLAMA_URL% ...
curl -s -m 3 %OLLAMA_URL%/api/tags > "%TEMP%\lumiere_s5_tags.json" 2>nul
if errorlevel 1 (
  echo   Ollama is not reachable. Install from ollama.com/download and run: ollama serve
  echo   Then pull the model:  ollama pull qwen2.5:3b-instruct
  echo.
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
