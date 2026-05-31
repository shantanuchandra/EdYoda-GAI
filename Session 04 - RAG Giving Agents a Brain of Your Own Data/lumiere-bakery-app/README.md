# Lumière Bakery — Customer Knowledge Agent Demo

**Companion app for EdYoda · Generative AI for Non-Coders · Session 4 — RAG.**

A dummy Mumbai bakery website with a floating chatbot grounded in real documents via local Ollama. Built for live facilitator demos and for learners to copy as the canonical S4 walk-out artifact.

---

## What it demonstrates

| S4 concept | What you do in the app |
|---|---|
| **Build A — Feed the brain (CAG)** | Open the app → Admin tab → `Lumiere_KB.md` is already loaded → ask the bot a question → it answers from the KB. The whole doc is in the prompt. That's CAG. |
| **Build B — Make it cite** | Every bot answer ends with `(Source: <section>)`. Visible in the chat bubble. |
| **Build C — Make it refuse** | Ask something not in the KB ("what's your CEO's salary?") → it declines cleanly, no invention. |
| **Build D — Tune the recall** | Click the `Lumiere_Policy_MESSY` tile → ask "what's the refund window for custom cakes?" → retrieval misses or gives a vague answer. Click `Lumiere_Policy_CLEAN` → same question → clean cited answer. Same agent, structured document. |
| **The Dial in motion** | Admin → Retrieval mode → toggle **CAG / RAG / Auto**. Index status shows the chunks. Watch the same query route differently. |
| **S5 — Agentic RAG** | Ask "do you deliver to my area?" with location permission ON. The bot decides to call `get_location`, then `retrieve`, then either answers (Mumbai) or honestly refuses (anywhere else). The **Agent steps** panel under each answer shows the reasoning. |

---

## One-time setup (do this before class)

### 1. Install Ollama

- macOS / Linux: download from **ollama.com/download** (or `brew install ollama` on Mac)
- Windows: download the installer from **ollama.com/download**

### 2. Pull the two models

In a terminal:

```bash
ollama pull llama3.2:3b
ollama pull nomic-embed-text
```

(Combined ~2.3 GB. Do once; persists.)

### 3. Start Ollama

It usually starts automatically after install. If not:

```bash
ollama serve
```

(Leave that terminal open.)

### 4. Verify

In a browser, open **http://localhost:11434/api/tags** — you should see JSON listing your installed models.

---

## Running the demo

**Mac / Linux:** double-click `start.command`
**Windows:** double-click `start.bat`

The launcher will:
1. Verify Ollama is reachable
2. Check that both required models are installed
3. Start a local server on port 8000 from the **Session 04 ...** folder (so the app can fetch the three `.md` documents next to it)
4. Open your default browser to `http://localhost:8000/lumiere-bakery-app/`

> **In Chrome/Brave/Comet:** when prompted for location permission later, click **Allow** so the agentic location demo works.

---

## Live demo script — recommended sequence

> **Each numbered move is a separate beat on the projector. Pause and let the room react before moving to the next.**

### Move 1 — Show the website (Block 0 prep)

- Open the app. Show the bakery website tab. Looks like a real bakery.
- Click the chat bubble. Welcome message appears.

### Move 2 — Build A in action (CAG)

- Click the suggested chip **"Are you open right now?"**
- The bot answers with hours, names a branch, ends with `(Source: Locations & Hours)`.
- Open **Agent steps** under the bubble — show `RAG: Mode: CAG. Loading whole document.`
- *"That's Build A. The whole document is in front of the model. It pulled the answer from the file, not from memory."*

### Move 3 — Make it cite + refuse (Build B + C)

- Ask: **"Is the almond croissant nut-free?"**
- Watch it answer carefully, citing the Allergens section.
- Ask something off-topic: **"What's your CEO's salary?"**
- Watch it refuse: *"I don't have that in my knowledge base."*

### Move 4 — Tune the recall (Build D, garbage in/garbage out, live)

- Go to Admin. Click the **MESSY** tile.
- Ask the chatbot: **"What's the refund window if I cancel my custom cake 30 hours before pickup?"**
- The answer is vague, half-right, or "I don't have that."
- Back to Admin. Click **CLEAN**.
- Ask the same question. Clear answer, with citation.
- *"The model didn't get smarter. The document got findable."*

### Move 5 — The Dial in motion

- Admin → Retrieval mode → toggle **CAG / RAG**.
- Show the index status change. Show the chunks number when in RAG.
- *"This is the dial. Small doc fits whole — that's CAG. Large doc — retrieve only what matches. Same five-step pipeline, different rung."*

### Move 6 — The S5 agentic bridge (the closer)

- With `Lumiere_KB.md` loaded and location permission **ON**:
- Ask: **"Do you deliver to my area?"**
- Bot calls `get_location` → finds you in Gurgaon (or wherever you are outside Mumbai).
- Bot retrieves → no Gurgaon in the KB → refuses cleanly with citation.
- *"That refusal was not a bug. The agent looked, didn't find it, said so. That's the goal."*
- Switch to Admin. Open `gurgaon-update.md` (in this folder). Copy Block A + Block B.
- Paste into the editor in the right sections. Click **Save & re-index.**
- Re-ask: **"Do you deliver to my area?"**
- Bot now answers with Gurgaon Cyber Hub branch + delivery time estimate.
- *"Same agent. Same code. We updated the document — and it knew. That's the loop you take to work Monday."*
- *"And the part where it decided to call get_location, then retrieve, then reason about distance — that's where the agent decides what to do, not the human. Welcome to Session 5."*

---

## File layout

```
lumiere-bakery-app/
├── index.html          ← the whole app (UI, RAG, agent loop)
├── start.command       ← Mac/Linux launcher
├── start.bat           ← Windows launcher
├── gurgaon-update.md   ← paste-in snippet for Move 6
└── README.md           ← this file

../Lumiere_KB.md                ← clean knowledge base (loaded by default)
../Lumiere_Policy_CLEAN.md      ← Build D "after" doc
../Lumiere_Policy_MESSY.md      ← Build D "before" doc
```

The app fetches the three `.md` files via relative path `../`. That's why we run from a local server (the launcher handles this).

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| "no connection — is Ollama running?" in Settings | Open a terminal and run `ollama serve`, then click **Re-test**. |
| Models dropdown empty / shows "(not installed)" | Run `ollama pull llama3.2:3b` and `ollama pull nomic-embed-text` in a terminal. |
| Chatbot says "I can't reach Ollama" | Same as above. Settings → check the endpoint, then **Re-test**. |
| "Could not load Lumiere_KB.md" in Admin | You opened the HTML by double-clicking instead of via the launcher. Close the browser tab, use `start.command` / `start.bat`. |
| Location permission keeps failing | Settings → toggle **Allow location tool** OFF, then refresh and try again with it ON. Some browsers reset permissions per session. |
| Chat is very slow | `llama3.2:3b` is the right model for laptops. If you're on `llama3.1:8b` or larger, the demo will lag on machines without a GPU. |
| Port 8000 already in use | The launcher tries to free it automatically. If it can't: close any running Python servers or change the `PORT` variable at the top of `start.command`. |

---

## What's intentionally **not** in this demo

- **No cloud APIs.** Everything is local. Show your laptop, not your wallet.
- **No agent frameworks (LangChain etc.).** The agent loop is ~40 lines of plain JS so learners can read it.
- **No vector database.** RAG vectors live in browser memory. For a real deployment you'd use Pinecone / Weaviate / pgvector — that's the S4 "what's under the hood" note, not what we wire today.
- **No persistence.** Reload the page → state resets to the default KB. (Intentional: facilitators can run the demo from scratch every cohort.)

---

## Pre-class checklist

- [ ] Ollama installed and running
- [ ] `llama3.2:3b` + `nomic-embed-text` both pulled
- [ ] Launcher runs (double-click `start.command` / `start.bat`)
- [ ] Browser opens to the bakery site
- [ ] Settings tab shows green connection pill
- [ ] Admin tab shows the three doc tiles, with `Lumiere_KB.md` active
- [ ] Click the chat bubble → suggestion chips appear → "Are you open right now?" returns a cited answer
- [ ] Click MESSY tile, ask a policy question → notice the gap. Click CLEAN. Same question. Land it.
- [ ] Ask "do you deliver to my area?" → bot requests location → answers based on the result
- [ ] You've practiced Move 6 once end-to-end with the Gurgaon snippet so it lands smoothly live

If everything in this checklist works, the demo will run.

---

**Written & maintained by Shantanu Chandra · linkedin.com/in/chandrashantanu**
*EdYoda · GenAI & AI Agents for Non-Coders · S04*
