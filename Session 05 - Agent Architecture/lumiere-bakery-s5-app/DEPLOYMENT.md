# Vercel deployment — Lumière Bakery

This folder is deployed to Vercel as a self-contained mini-site:

- `index.html` — the bakery website with the floating chat
- `Lumiere_KB.md` — the bakery knowledge base (fetched by the page)
- `api/quote.js` — Vercel Serverless Function at `POST /api/quote` (used by n8n)
- `vercel.json` — CORS headers for the function

## Vercel project settings

When importing the repo `shantanuchandra/EdYoda-GAI`:

| Setting | Value |
|---|---|
| **Framework Preset** | Other |
| **Root Directory** | `Session 05 - Agent Architecture/lumiere-bakery-s5-app` |
| **Build Command** | (leave empty) |
| **Output Directory** | (leave empty) |
| **Install Command** | (leave empty) |

The Root Directory setting is **critical** — without it, Vercel would try to deploy the whole course (including facilitator scripts). With it, only this folder is exposed.

## Public URLs (after deploy)

- `https://YOUR-PROJECT.vercel.app/` → the bakery site
- `https://YOUR-PROJECT.vercel.app/api/quote` → the quote API (POST)

## Wire to n8n

In the n8n HTTP Request node (the one that calls `/api/quote`), set the URL to the Vercel `/api/quote` URL above. The retry hardening from S7 Part 2 still applies — leave Retry on Fail ON.

## Local dev (unchanged)

The original `server.js` + `start.command` still work for local-only dev — they serve the same `api/quote` endpoint at `localhost:8000`. Use whichever fits the situation.
