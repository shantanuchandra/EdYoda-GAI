# Session 4 — RAG: Giving Agents a Brain of Your Own Data

**Design spec · 2026-05-29 · EdYoda "GenAI & AI Agents for Non-Coders" (Session 4 of 8)**

---

## 1. Positioning & continuity

- **Course:** GenAI & AI Agents for Non-Coders. 8 sessions, 2 hours each, live virtual, ~6–15/cohort. Same cohort as S1–S3.
- **This session:** S4 = *RAG — Giving Agents a Brain of Your Own Data*. 120 min, live virtual.
- **Prior session (S3):** Prompt & Context Engineering. Ran **in ChatGPT** (Builder was offline). Walk-out was an *engineered prompt stack v2 + a one-page Prompt Iteration Log*. S3 cold-open reused the S1 bakery campaign hallucinating a fake benchmark.
- **S2 cohort-actual artifact (available callback):** an **HR Candidate Screener** (3 nodes) that **hallucinated LinkedIn URLs** when its source returned no data. Kept as a *one-line* visceral example of what grounding cures — but S4's cold open leads with completing S3's explicit promise (see §12), not by re-litigating hallucination.
- **Next session (S5):** *Agent Architecture — How Agents Think, Remember & Act*. The only forward bridge S4 is allowed to make. Agentic RAG is the natural hand-off.

### Hard boundaries (from memory canon)
- S4 **owns:** the chunk→embed→store→retrieve→generate pipeline, **RAG variants (the "dial") — first-class content this run**, KB design/metadata, semantic vs keyword, vector stores (Pinecone/Weaviate as *concepts*), RAG vs fine-tuning, enterprise RAG patterns. Grounding-vs-guessing is the *premise* (inherited from S3), not a teaching unit.
- S4 **does NOT own / defer:** agent planning & memory architecture (→S5), dynamic file-sync / automated workflows / n8n wiring (→S7), business-case capstone scoping (→S8). These appear only as one-line bridges.
- **Ollama / self-hosted LLM:** deliberately out of scope for this cohort. Non-coders on mixed hardware; local model downloads are a support disaster. Noted here as a future advanced-track option only.

### Running example — Lumière Bakery (canonical course thread)

S4 uses **Lumière**, the Mumbai artisan bakery introduced in Session 1 (the bakery-campaign demo) and named in Session 2 (the Trend Scout for Lumière node). The continuity line for the cold open: *"The Mumbai bakery we've been helping — Lumière — now has a different problem: customers keep asking the same questions and the team is drowning. Today we give it a second agent: a Knowledge Agent that answers customers from its own documents."*

This keeps the bakery as a familiar through-line **and** cleanly justifies why today's task is RAG (not the campaign pipeline): different job, same bakery.

---

## 2. Spine, ratio, artifact

- **Spine:** **Witness → Ground → Deploy** (parallels S3's Diagnose → Engineer → Stress-Test).
- **Hands-on share:** ~60% (matches S3), ~72 min learner activity.
- **Walk-out artifact:** a **Lumière Knowledge Agent** — each learner's own Claude Project, grounded in the shared Lumière KB doc, built from their persona's angle — **plus a one-page Knowledge Base Design Sheet** (the reusable method, the S4 analogue of S3's Iteration Log).
- **One Rule (draft):** *"You walked in with a confident guesser. You leave with a grounded agent that cites its source — or admits it doesn't know."*
- **The canonical thread question:** *"Can I get a 2kg eggless chocolate cake for this Saturday?"* — carried from Level 0 (guesser invents a price and lead time) all the way to Level 3 hybrid (custom orders section hit by meaning, section number hit by keyword).

---

## 3. Platform (THIS run)

Builder remains unavailable. Per user: run in **ChatGPT or Claude; Claude preferred.**

| Role | Tool | Notes |
|---|---|---|
| **Primary build path (A–E)** | **Claude Projects** | Upload track doc to Project Knowledge; grounding + refusal in custom instructions; query it. Real per-query retrieval, persists, free-tier reachable. |
| **Citation showpiece** | **NotebookLM** (facilitator demo, ~90 sec, contingency-gated) | Shows inline citations to the exact passage — the cleanest free "grounded + traceable" visual. Used once in the Witness phase; not a learner build step. |
| **Workbook fallback** | Single Claude chat + attached file → then paste-the-chunk | Anyone who can't make a Project still completes every build. Same grounding-prompt text works across all three. |

**Honesty line (must appear in script):** today's tools retrieve from *one* uploaded doc instantly; real enterprise RAG runs the same five steps across *millions* of chunks in a vector DB (Pinecone, Weaviate). Same pattern, bigger board. Vector-DB content is framed as "what's under the hood so you can brief your eng team," **never** as something wired today.

---

## 4. The build ladder (Ground phase) — A–E

Each rung turns a concept into a hands-on move. **All learners work the same Lumière KB doc (Doc 1).** Variety comes from which persona angle they use when forming their questions.

| Rung | Name | Closes | Learner does |
|---|---|---|---|
| **A** | Feed the brain | chunk · embed · store | Create a Project named "Lumière Knowledge Agent", upload **Lumiere_KB.md** to Project Knowledge, ask one persona question, confirm it answered from the file. *(Facilitator names this CAG — we loaded the whole doc, no vector DB.)* |
| **B** | Make it cite | retrieve · generate | Add grounding system prompt: answer only from the doc, name the section/source after every answer. |
| **C** | Make it refuse | graceful failure | Ask an out-of-scope question (not in the doc); add the "say I don't know — don't guess" guardrail. Test on allergen safety question (never guess — safety-critical). |
| **D** | Tune the recall | KB design · metadata · GIGO | **Facilitator-only demo** (3 min, no learner upload): show the messy Lumière Policy Manual (Doc 2) breaking a query; add headings/tags; retrieval works. Learners observe and record the chunk/tag strategy on their KB Design Sheet. Saves 8 min vs. per-learner upload. |
| **E** | Stress & ship | hybrid search · deploy | Synonym probe + out-of-scope probe + exact-code probe (pincode / section number). Show hybrid keyword+semantic both firing. Finalize the agent. |

### The two Lumière documents

**Doc 1 — Lumière Customer Knowledge Base** (`Lumiere_KB.md`) — the dynamic, shareable main doc.
- **Version used in Builds A–C, E:** 3 Mumbai branches only (Bandra, Andheri, Powai). 8 sections (locations/hours · contact · menu/prices · allergens · custom orders · delivery · current offers · policies summary). ~600–800 words, well-structured.
- **Updated live in Deploy block:** facilitator adds the Gurgaon branch (Sapphire 90, Sector 90 — 10km delivery radius) mid-session, re-uploads, and the whole class re-asks the Gurgaon delivery question. Answer changes. This is the RAG-vs-fine-tuning proof: *"You didn't retrain the model. You updated the document."*
- **Second dynamic-doc moment (same block):** facilitator changes the Current Offers section (e.g. "20% off layer cakes" → "free delivery above ₹800"), re-uploads. Answer changes again. Reinforces: live data → update the doc, not the model.

**Doc 2 — Lumière Policy & Operations Manual** (`Lumiere_Policy_MESSY.md` + `Lumiere_Policy_CLEAN.md`) — facilitator-only Build D demo.
- **Messy version:** 800–1,200 words, no headings, all sections run together (wall of text). Used to show GIGO retrieval failure live.
- **Clean version:** same content, properly headed and section-tagged. Shows the fix. Learners see before/after but don't upload it themselves.

---

## 5. Concept Sprint (Witness→Ground hinge) — 4 sprints, ≤4 min each

Fast vocabulary the learner uses in the very next 90 minutes. **Not a lecture — each sprint front-loads one move from the build ladder.** The "why grounding matters" framing is assumed from S3 (which closed promising grounded retrieval as today's topic); we spend **one sentence** on it, not a sprint.

> *Motivating line (once, then move on):* "Last weekend you learned constraints. The other half of the fix — grounding the agent in your own documents — is what we build today."

1. **The 5-step pipeline** — chunk → embed → store → retrieve → generate (research-assistant analogy from the PDF). This is the spine of Builds A–B.
2. **Semantic vs keyword** — retrieval finds "dog" under "pets," "recover" under "medical leave." Mechanism only; no fake precision percentages. Sets up Build E's hybrid search.
3. **Vector DBs under the hood** — Pinecone vs Weaviate at a literacy level (managed vs self-host, semantic vs hybrid). Explicitly "to brief your eng team," not wired today.
4. **The RAG dial: types of RAG** — the spectrum (full detail in §6). This sprint *introduces* the dial; learners place their own use-case on it during the build and again on the KB Design Sheet.

*(RAG-vs-fine-tuning is the decision lens in the Deploy/close block, not a concept sprint.)*

---

## 6. Types of RAG — "The RAG dial" (first-class teaching content)

The single mental model that organizes every RAG variant for a non-coder: **RAG is a dial, not a switch.** You turn it up as the knowledge gets bigger and the questions get harder. Each point gets **one concrete worked example on the Lumière bakery doc**, so the progression feels like one continuous story.

**The thread question:** *"Can I get a 2kg eggless chocolate cake for this Saturday?"*

| # | Type | One-liner | Worked example (Lumière) | When to use | S4 treatment |
|---|---|---|---|---|---|
| 0 | **No retrieval** | Model answers from its own training memory. | Ask "can I get a 2kg eggless chocolate cake for Saturday?" with nothing uploaded → it guesses a price, invents a lead time. | Never, for company-specific facts. | The baseline we move off of (1 line). |
| 1 | **CAG** — Cache-Augmented Generation | Load the *whole* doc into context; no vector DB. | Upload Lumiere_KB.md to the Project and ask. | Small, stable knowledge (≤ a few hundred pages). | **Taught + built — Build A.** Named explicitly: "no vector DB, you loaded everything — that's CAG." |
| 2 | **Vanilla / naive RAG** | Retrieve the top few relevant chunks, answer from those. | Lumière grows to a 500-location chain with a 10,000-page manual — can't load it all, so retrieve just the matching sections. | The default; ~80% of business cases. | **Taught + built — Builds B–D.** |
| 3 | **Hybrid RAG** | Combine keyword + semantic so exact codes AND meaning both match. | "Custom Order Policy Clause 3" (keyword fires on the code) + "eggless cake for a birthday" (semantic fires on meaning) → both land. | Docs with section numbers, pincodes, SKUs alongside prose. | **Taught + built — Build E.** |
| 4 | **Agentic RAG** | The agent decides *when* and *how often* to retrieve, across multiple sources. | "Compare this Saturday's Bandra availability with the Gurgaon branch and tell me which is closer" → it searches twice, reasons across both. | Multi-doc, multi-step reasoning. | **Taught as concept + the explicit Session 5 bridge.** |

**Name-drop only (one sentence each, "words you'll hear, not today's build"):**
- **GraphRAG** — retrieves over a map of how entities connect, not loose text chunks. For "how is X related to Y across thousands of docs."
- **Re-ranking RAG** — retrieve 20 chunks, a second model re-sorts to the best 3 before answering. For precision-critical legal/medical use.

**Out of scope (do not mention):** HyDE, multi-query, RAPTOR, self-RAG — engineering deep cuts, no value for non-coders.

**The takeaway learners leave with:** not the acronyms, but the ability to point at their own use-case and say "mine needs a level-1 CAG / level-2 vanilla / level-3 hybrid." That judgment is the KB Design Sheet's headline row.

---

## 7. Deploy / debrief block

- **Four enterprise patterns** (from PDF) mapped to learner roles: Document Q&A (consulting/healthcare), Corporate/Policy Bot (HR/ops), Internal Knowledge Search (finance/ops), Product Knowledge Base (marketing/sales). Each pattern has a Lumière analogue (e.g. "Lumière's policy bot is the corporate/policy bot pattern").
- **Deployment strategy:** start with one high-impact function, prove retrieval accuracy, then scale.
- **RAG vs fine-tuning** decision rule of thumb: *new facts / dynamic data → RAG; new behavior / tone → fine-tuning; both → hybrid.* Research caveat: this is practitioner consensus, not a settled research finding — expect honest debate at the edges. Honesty note: fine-tuning does **not** remove hallucination — it makes the model wrong in your brand voice.
- **Dynamic-doc live demo (the RAG-vs-fine-tuning centrepiece, ~5 min):**
  1. Facilitator opens Lumiere_KB.md (displayed on screen). Confirms learners' bots answer "we don't deliver to Gurgaon."
  2. Adds the Gurgaon branch paragraph live (Sapphire 90, Sector 90, 10km radius, opens 8am–9pm). Re-uploads to their own Project.
  3. Whole class re-asks the Gurgaon delivery question. Answer changes.
  4. Facilitator then edits the Current Offers section (change the weekly promo). Re-uploads. Asks about discounts. Answer changes again.
  5. Lesson: *"You didn't retrain the model. You updated the document. That's RAG."*
- **Location-matching boundary (explicit teaching beat):** *"The bot can tell you whether Sector 90 is within our 10km zone — because we wrote it in the doc. It can't GPS-check your live coordinates. For that you'd need a tool — and that's Session 5."* This edge case is a feature: it defines RAG and bridges to agent tools.
- Learners complete their **KB Design Sheet** (chunk strategy, structural tags, semantic tags, query range, grounding+refusal prompt, point on the RAG dial).

---

## 8. Personas (replaces 4 tracks)

All learners work the **same Lumière KB doc**. Each learner picks (or is assigned) one customer persona that determines which angle they use when forming questions across Builds A–E. Variety comes from the questions, not the document.

| Persona | Their angle | Build A/B grounded query | Build C refusal query | Build E hybrid probe | RAG concept it spotlights |
|---|---|---|---|---|---|
| 🎂 **Last-minute Birthday** | Ordering a custom cake urgently | "Can I get a 2kg eggless chocolate cake for this Saturday?" | "Can you match a competitor's price?" | "Custom Order Clause 2 — what does it say?" (keyword) + "last-minute same-day order" (semantic) | Multi-fact custom-order retrieval; the canonical thread |
| 🥜 **Allergy Parent** | Checking ingredient safety for a child | "Does the almond croissant contain nuts?" | "Is your kitchen completely nut-free?" | "Allergen section" (keyword) + "safe for my kid with a nut allergy" (semantic) | **Safety-critical refusal** — never guess on allergens |
| 🏢 **Corporate Bulk** | Large office order, Andheri branch | "What's the minimum order for corporate catering?" | "Can you invoice my company directly?" | "Corporate Policy section" + "bulk order for 100 people" | Multi-section retrieval; catering escalation edge |
| 🛵 **Delivery Edge-case** | Testing the new Gurgaon branch delivery | "Do you deliver to Sector 90, Gurgaon?" (before doc update: "no"; after: "yes") | "Can you deliver in 30 minutes?" | "10km radius" (keyword match pincode/zone) + "near Sapphire Mall" (semantic) | **The dynamic-doc demo** — answer changes when the doc is updated |

**Persona assignment:** for cohorts ≤ 6, assign one persona per learner (the Birthday persona is the canonical facilitator demo persona). For cohorts ≥ 12, learners self-select; run a quick chat poll at the start of Block 2.

Narration adapts to cohort size per facilitation-patterns memory (≤6 = verbal go-arounds, read every name; ≥12 = chat scoreboard). Anchor on real attendees where known; never fabricate counts.

---

## 9. 120-minute run sheet (block skeleton)

| Block | Range | Phase | Content |
|---|---|---|---|
| 0 | 0:00–0:12 | Witness | Cold open: complete the promise S3 made — "constraints were half the fix; grounded retrieval is today." One fast live proof: ask an ungrounded question → watch it guess (≤60 sec, no dwelling); NotebookLM citation showpiece as the contrast. Norms; The Promise; The One Rule. |
| 1 | 0:12–0:32 | Witness→Ground hinge | 4 concept sprints (incl. the RAG dial). |
| 2 | 0:32–0:55 | Ground | Build ladder A, B, C. |
| — | 0:55–1:05 | Break | Hard 10-min break (`.break-slide` / `tag:"break"`). |
| 2 (cont.) | 1:05–1:35 | Ground | Build ladder D, E. |
| 3 | 1:35–1:55 | Deploy | Enterprise patterns + deployment strategy + RAG-vs-fine-tune + fill KB Design Sheet. |
| 4 | 1:55–2:00 | Close | Synthesis, reflection prompt, single bridge to S5 (how agents think/plan/act), author colophon. |

---

## 10. Corrections vs. Deck-RAG.pdf (baked into every artifact)

1. **Invert the ratio:** the PDF is ~15:1 concept:hands-on; S4 is ~60% hands-on via the A–E ladder. *(The single biggest correction — the deck is a reference deck, not a session.)*
2. **Pinecone/Weaviate/Docker/text-embedding-3 = concept layer, not a build.** No implied API wiring for non-coders.
3. **Drop fake-precise stats** (94.31%, 95%+, "1536+ dims" as authority). Keep mechanisms; use honest round framing.
4. **"Zero Hallucination" / "eliminates hallucination" → "grounds + makes traceable."** Honesty trim only — we don't dwell on hallucination, but we never overclaim the cure either. Bad retrieval/stale chunks/overflow still fail (the deck's own failure-points slide).
5. **Keep S5/S7 content as one-line bridges only** ("Agent Cognitive Architecture," "dynamic file sync").
6. **CAG named honestly** as what the Claude-Projects build already does.

---

## 11. Deliverables & build order (per templates/README)

0. **Lumière KB doc** (`Lumiere_KB.md`) — the dynamic knowledge-base document all learners upload. Version 1 = 3 Mumbai branches. Facilitator adds the Gurgaon branch live in the Deploy block.
0b. **Lumière Policy Manual** (`Lumiere_Policy_MESSY.md` + `Lumiere_Policy_CLEAN.md`) — facilitator-only Build D demo. Messy = wall of text, no headings. Clean = properly structured.
1. **Facilitator script** (`01_Facilitator_Script.md`) — run sheet, build steps, contingencies, cohort-size branches, practice recommendation.
2. **Learner workbook** (`02_Learner_Workbook.md`) — mirrors step labels A–E; 4 persona pages; KB Design Sheet; take-home prompts. Lean register (no engagement theater, no reassurance paragraphs).
3. **Learner deck** (`learner_deck.html`) — paper/editorial, static sections, symmetric slide count.
4. **Presenter deck** (`presenter_deck.html`) — dark/teal cockpit, JS `slides` array, paired via `genai_s4_*` localStorage keys, identical `slides.length`.
- **Carousel:** deferred (README: built *after* the session runs as a recap, not a preview).

### Design-system invariants (non-negotiable)
- Two modes, never mixed: dark/teal (presenter) vs paper/terra (learner). Copy `:root` verbatim from templates.
- Fonts fixed: Inter + JetBrains Mono (dark); Fraunces + Geist + Geist Mono (paper). Noise + vignette on paper.
- EdYoda wordmark on all internal materials. `say:` fields = spoken English. No timestamps / stage directions on learner-facing artifacts. Bridge to S5 only on the close slide.
- Symmetric paired decks; break detected by class/tag, never hardcoded index. Storage keys scoped `genai_s4_*`.
- Close every artifact with the author colophon (Shantanu Chandra + linkedin.com/in/chandrashantanu).

---

## 12. Verified hand-off from S3 (cold-open gift)

S3's close **explicitly pre-plants S4** (verified in `Session 03/01_Facilitator_Script.md`):
- L178: S3 taught hallucination defense as two-part — *"One: constraints… Two: grounded retrieval from your own documents, which is RAG. Constraints we do today. **Grounded retrieval is next session.**"*
- L509: *"Next Saturday — Session 4 — RAG. You give an agent a brain made from your own documents. That's the fix for hallucination at the retrieval layer."*

**Implication for S4 cold open:** open by *completing the promise S3 made* — "Last Sunday I told you constraints were only half the hallucination fix. The other half — grounded retrieval — is today." This is stronger than re-deriving the bakery; it pays off an explicit cliffhanger. The S2 HR-Screener LinkedIn-URL hallucination remains the visceral example of *what* grounding cures.

## 13. Open items to verify at write-time
- Confirm real attendee names for narration (else parameterize, per facilitation memory).
- Timing confirmed: S4 = the Saturday after S3's weekend; S5 = the following Sunday. Phrase the cold-open time-callback as "last weekend / last Sunday."
