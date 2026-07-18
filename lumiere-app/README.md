# lumiere-app — Vercel deploy root

This folder is the **Vercel deployment target** for the Lumière Bakery demo.
It exists at the repo root (no spaces in the path) because Vercel Serverless
Function names cannot contain spaces — and the canonical app lives under
`Session 05 - Agent Architecture/lumiere-bakery-s5-app/`, whose path has spaces.

## What's here

| File | Purpose |
|---|---|
| `index.html` | The bakery site + chat (talks to the n8n webhook) |
| `Lumiere_KB.md` | Knowledge base fetched by the page |
| `api/quote.js` | Serverless function — `POST /api/quote` (called by n8n) |
| `vercel.json` | CORS headers for `/api/*` |

## Source of truth

The **canonical** app is `Session 05 - Agent Architecture/lumiere-bakery-s5-app/`.
This folder is a deploy mirror of these four files. If you edit the app, edit it
in the S5 folder and copy the four files here, or edit here and copy back. They
are intentionally identical.

> A future cleanup could collapse these into one folder + a Vercel monorepo
> config, but the spaces-in-path constraint makes the simple mirror the lowest-
> risk option for now.

## Vercel project settings

| Setting | Value |
|---|---|
| Root Directory | `lumiere-app` |
| Framework Preset | Other |
| Build / Output / Install | (empty) |

Public URLs after deploy:
- `https://YOUR-PROJECT.vercel.app/` → the bakery site
- `https://YOUR-PROJECT.vercel.app/api/quote` → the quote API (POST)
