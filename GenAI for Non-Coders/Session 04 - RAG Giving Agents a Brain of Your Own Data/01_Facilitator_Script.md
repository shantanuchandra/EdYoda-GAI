# Facilitator Script — RAG: Giving Agents a Brain of Your Own Data (Session 4 of 8)

**Subtitle:** *By the end of this session, you'll feed a Knowledge Agent Lumière Bakery's own documents, make it answer only from those documents and cite its source, and make it admit when it doesn't know — walking out with your own Lumière Knowledge Agent plus a one-page Knowledge Base Design Sheet you can reuse on any document at work.*
**Duration:** 120 minutes · Live virtual · Same cohort as S1–S3
**Spine:** Witness → Ground → Deploy
**Hands-on share:** ~60% (≈72 min)
**Build artifact:** Each learner builds their own Lumière Knowledge Agent (in their own Claude Project, grounded in the shared Lumiere_KB.md) plus a one-page Knowledge Base Design Sheet.
**Tools assumed:** Claude Projects (primary), NotebookLM (citation showpiece, facilitator demo, Block 0), single Claude chat + attached file (fallback).

> **PLATFORM NOTE — THIS RUN ONLY:** EdYoda Agent Builder is **unavailable** for this cohort. This run uses **Claude Projects** as the primary build path, **NotebookLM** as a one-time citation showpiece in the cold open, and a single **Claude chat + attached file** as the fallback so nobody gets stuck. The session's concepts are unchanged — every move applies one-for-one when Builder access returns. **Honesty line (say it out loud at least once):** today's tools retrieve from *one* uploaded document, instantly. Real enterprise RAG runs the same five steps across *millions* of chunks in a vector database — Pinecone, Weaviate. Same pattern, bigger board. The vector-DB material in this session is "what's under the hood so you can brief your eng team" — never something we wire up today.

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] **Build your own Lumière Knowledge Agent A → E on Lumiere_KB.md.** Create a Claude Project, upload Lumiere_KB.md to Project Knowledge, and run all five build steps yourself. Confirm:
  - (A) The agent answers the Saturday eggless cake question: "Can I get a 2kg eggless chocolate cake for this Saturday?" → should return 48h lead time + eggless option + 50% advance. Answers must trace to the file.
  - (B) The grounding + citation prompt returns a real section label — e.g. `(Source: Custom & Celebration Orders — Lead Times)`.
  - (C) "Is your kitchen completely nut-free?" → the doc answers this (no, it is not) — the agent should cite the allergen section. "What did Lumière's revenue look like last year?" → the agent must refuse.
  - (D) Test the MESSY policy doc failure: ask "What are the cancellation rules if I cancel 36 hours before pickup?" against Lumiere_Policy_MESSY.md. Confirm retrieval genuinely fails or degrades (the doc spells out "forty-eight hours," so "36" vs "thirty-six" may miss).
  - (E) Run the synonym probe ("no-egg option"), out-of-scope probe ("match a competitor's pricing"), and exact-code probe ("deliver to pincode 400058"). All three should behave cleanly.
- [ ] **Prepare the Gurgaon branch paragraph** in a plaintext note, ready to paste verbatim (see Block 4 — Dynamic Doc Demo for the exact text). This paragraph goes live in class.
- [ ] **Test the dynamic-doc update:** add the Gurgaon paragraph to Lumiere_KB.md, re-upload to your facilitator Project, confirm the Gurgaon delivery query flips from "not available" to "yes." Then test the offers-section swap (change the LUMIERE15 promo to "Free delivery on all orders above ₹800 this week"), re-upload, confirm the answer changes.
- [ ] **Prime NotebookLM** with Lumiere_KB.md. Queue the query: "What's the lead time for a custom 2kg eggless chocolate cake?" Confirm it returns the answer with an inline citation to the Custom & Celebration Orders section.
- [ ] **Pre-load browser tabs:**
  1. Claude — empty fresh chat (for the cold-open guesser proof)
  2. NotebookLM — primed with Lumiere_KB.md (for the cold-open citation contrast)
  3. Claude — your Lumière Knowledge Agent Project (for all build demos)
  4. Lumiere_KB.md open in a text editor (for the live Gurgaon edit in Block 4)
  5. Workbook — open to Build A
- [ ] Have the Gurgaon paragraph pre-copied to your clipboard (or clipboard manager) before class starts.
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] Have water, a printed copy of this script, and a visible timer.

---

## Opening Hook Slide (have this up 5 minutes before class starts)

> *"Lumière opened its first branch in Bandra eight years ago. Today it has three. And every day, the same ten questions flood WhatsApp: 'Are you open today? Can I get an eggless cake for Saturday? Do you deliver to my area?' Today we build the agent that answers them — from Lumière's own documents."*

Play soft instrumental music until you start.

---

# THE 120-MINUTE RUN SHEET

Each block has: **what you say (italics)**, **what you do**, **what learners do**, and **timing guard**.

---

## BLOCK 0 — OPENING (0:00 – 0:12)

**Goal:** Pay off the S3 cliffhanger — show the gap in one fast live proof. Show the contrast: a guesser vs. a grounded, cited answer. Set the room, the promise, and the one rule.

### 0:00 – 0:04 — Cold Open · the guesser vs. the grounded contrast

*"Welcome back. The Mumbai bakery we've been helping — Lumière — now has a different problem: customers keep asking the same questions and the team can't keep up. Today we give Lumière a second agent: a Knowledge Agent that answers customers from its own documents."*

*"Let me show you the gap I'm closing first. I'm going to ask a fresh Claude — nothing uploaded, nothing loaded — a question about Lumière. Watch what it does."*

→ Switch to **Claude — empty fresh chat**. Ask: *"What's the lead time for a custom 2kg eggless chocolate cake at Lumière in Mumbai?"* Hit send. It produces a confident-sounding number it cannot possibly know — it invents one.

*"Confident. Specific. Sounds like a bakery policy. And it's a guess — there is no document behind it. That's a guesser."*

→ Switch to **NotebookLM** (primed with Lumiere_KB.md). Ask the same question. It returns: *"48 hours minimum advance notice required (Source: Custom & Celebration Orders — Lead Times)."* Point at the citation.

*"Same question. Different story. This one shows me the line it pulled from the document I gave it. Not a guess — a grounded, traceable answer with a receipt. That difference — guess versus grounded — is the entire session."*

> **Why this works:** The contrast is the lesson. The empty-Claude guesser and the NotebookLM citation are side by side in under 90 seconds. No hallucination lecture required.

### 0:04 – 0:06 — Norms

Read this table aloud, briskly:

| Norm | What it means |
|---|---|
| **Cameras** | Encouraged but optional. |
| **Chat** | Use it freely — questions, reactions, welcome. |
| **Mics** | Stay muted unless called on. |
| **Break** | A real 10-minute break partway through. Promise. |
| **Stuck** | Ask live. If it needs a longer answer, I'll reply by email after. |
| **Today's tool** | Claude, free tier. That's all you need. |

### 0:06 – 0:09 — The Promise

*"Two hours from now you walk out with two things. First — your own Lumière Knowledge Agent. Built on Lumière's own document. Ask it something in the document, it answers and tells you where it found it. Ask it something that isn't in there, and it tells you it doesn't know — instead of making something up."*

*"Second — a one-page Knowledge Base Design Sheet. That sheet is the real prize. The agent is today's demo; the sheet is the method written down — how you'd ground any document at work, starting Monday."*

→ Pause. Let it land.

### 0:09 – 0:12 — Roadmap + The One Rule

→ Show the session-flow slide.

*"Three moves to get there. First we Witness — a few fast concepts so we share the same words. Then we Ground — the long build, where you feed the agent its brain, make it cite, make it refuse, and make it sturdy. Then we Deploy — where this goes to work."*

*"One rule for today. You walked in with a confident guesser. You leave with a grounded agent that cites its source — or admits it doesn't know. That's the whole job."*

→ Pause.

*"Let's get the words straight first — a handful of fast concepts, then we build."*

> Time check: 0:12. If you're past it, trim the cold open to the empty-Claude proof alone — the NotebookLM step can be skipped if needed. The guesser proof is non-negotiable.

---

## BLOCK 1 — CONCEPT SPRINTS (0:12 – 0:32)

**Goal:** Plant four words the learner uses in the next ninety minutes. One running example the whole way: Lumière, the Saturday eggless cake question.

**Pacing rule:** ~4 minutes per sprint. Cut the analogy before you cut the demo.

*"Four fast concepts. Four words you'll be using before the break. Same example the whole way — Lumière, the Saturday eggless cake. Here we go."*

### 0:12 – 0:16 — Sprint 1: The 5-step pipeline · chunk → embed → store → retrieve → generate

*"Everything we do today runs on five steps. Memorize the five, the rest follows. Chunk. Embed. Store. Retrieve. Generate. Chunk — cut the document into bite-size pieces. Embed — turn each piece into a number that captures its meaning. Store — file those pieces away. Retrieve — when you ask a question, pull only the pieces that match. Generate — write the answer from those pieces."*

→ Show the five-step pipeline slide.

*"Think of a new Lumière staff member on their first day. You hand them the entire Lumière Knowledge Base document. They read it cover to cover and tear it into note cards — that's chunking. They don't file the cards alphabetically; they file them by what they're about, by meaning — that's embed and store. Then a customer walks in and asks about a custom eggless cake. The staff member doesn't re-read the whole document — they pull the three cards that actually answer it: custom orders, eggless options, lead times. Then they write the answer from those cards. Retrieve, then generate. That staff member is RAG."*

→ Point at the five steps. *"Builds A and B today are literally this pipeline. Feed the brain — chunk, embed, store. Make it answer — retrieve, generate."*

**Analogy (memorize):** *"RAG is a staff member who reads the whole document, files every note card by meaning, and when you ask — pulls the right cards and writes the answer."*

### 0:16 – 0:20 — Sprint 2: Semantic vs keyword · it matches meaning, not words

*"Here's the move that makes retrieval actually work. Keyword search finds the exact word you type. Miss the word, miss the answer. Semantic search matches meaning — different words, same idea."*

→ Show the semantic-vs-keyword slide.

*"Customer asks about a 'no-egg option.' The document says 'eggless.' Keyword search misses it — the words don't match. Semantic search finds it — same meaning. Customer asks 'near Versova' — semantic matches that to the Andheri West branch because that's the closest location geographically. Different words. Same place."*

*"Why this matters: customers never search using the document's exact words. Semantic retrieval meets them where they are."*

*"Honesty beat — say this: semantic is powerful but has a blind spot. It's bad at exact codes — pincodes, section numbers, SKUs. Ask it to find pincode 400058 and meaning-matching may shrug because '400058' is just a string of digits with no semantic weight. Hold that thought — we fix it in the last build."*

**Analogy (memorize):** *"Keyword hunts for the exact word; semantic hunts for what you meant."*

### 0:20 – 0:24 — Sprint 3: Vector DBs under the hood · to brief your engineering team

*"Quick one, and I want to be honest about why. When we said 'store the pieces by meaning' — where do they actually live at company scale? In a vector database. You'll hear two names: Pinecone and Weaviate. We are not wiring one up today. This is thirty seconds so that when your engineering team says 'we'll need a vector store,' you know what they mean and you can hold the conversation."*

→ Show the vector-DB slide. Say plainly: *"Under the hood — not today's build."*

*"Two things to know. One — the meaning of each piece gets stored as a set of coordinates, like a point on a map. Pieces that mean similar things sit close together. 'Find me similar' becomes 'find me nearby' — fast, even across millions of pieces. Two — the only fork in the road is who runs it. Managed, like Pinecone, means someone else runs the machine. Self-host, like Weaviate, means your team runs it on your servers. That's the whole decision."*

*"Today our tool retrieves from one uploaded document, instantly. Real enterprise RAG runs the same five steps across millions of pieces in one of these databases. Same pattern, bigger board."*

**Analogy (memorize):** *"A vector database is a map where similar ideas sit close together — managed means someone else runs the map, self-host means you do."*

### 0:24 – 0:32 — Sprint 4: The RAG dial · types of RAG

*"Last concept, and it's the one you'll actually carry to work. People treat RAG like one thing. It isn't. RAG is a dial, not a switch — you turn it up as the knowledge gets bigger and the questions get harder. One running example the whole way: Lumière, the Saturday eggless cake question."*

→ Show the RAG dial slide. Walk the levels one at a time — ~40 seconds each. Keep your finger on the dial and turn it up as you climb. Each level answers the previous level's limit.

- **Level 0 — No retrieval.** *"Dial all the way down. The model answers from its own memory. Ask 'What's the lead time for a 2kg eggless chocolate cake at Lumière?' with nothing loaded — and it guesses. Confidently wrong. That's the cold-open proof. This is the baseline we move off of."*
- **Level 1 — CAG, Cache-Augmented Generation.** *"Turn it up one. Load the whole Lumiere_KB.md into context — the entire document goes into the Project — no vector database, no retrieval by search. The model just has the whole thing in front of it and answers. This is exactly what you'll do in Build A. When you upload that doc and ask, I'll say it out loud: 'you loaded everything — that's CAG, level one.'"*
- **Level 2 — Vanilla RAG.** *"Turn it up. Now Lumière grows to five hundred locations with a ten-thousand-page operations manual. You can't load it all — it won't fit. So you retrieve just the three pieces that match and answer from those. This is the default. Most business cases live here. That's Builds B through D."*
- **Level 3 — Hybrid RAG.** *"One more. Semantic's blind spot — exact codes. Hybrid runs keyword and semantic together. 'Custom Order Clause 3' fires on the exact code; 'eggless cake for a birthday' fires on the meaning. Both land. You reach for this the moment your documents have clause numbers, pincodes, SKUs sitting next to plain prose. That's Build E."*
- **Level 4 — Agentic RAG.** *"Top of the dial. The agent decides for itself when to retrieve and how often, across more than one source. 'Compare Bandra and Gurgaon availability for Saturday and tell me which is closer' — it searches twice, reasons across both. We're teaching this as a concept today, not building it — that requires planning, memory, autonomous action. That's Session 5."*

→ *"Two more words you'll hear — not today's build."*

- *"GraphRAG — retrieves over a map of how entities connect across documents. Shines on cross-doc synthesis. Different tool for different questions."*
- *"Re-ranking RAG — retrieve twenty pieces, then a second model re-sorts and keeps the best three before answering. Reach for it when precision really matters."*

→ *"Here's what you keep from this sprint. You don't memorize acronyms. You point at your use-case and say one sentence: 'mine's a level-one CAG' or 'mine's a level-two vanilla' or 'mine needs level-three hybrid.' That judgment — where your document sits on the dial — becomes the headline row of the Knowledge Base Design Sheet you walk out with."*

**Analogy (memorize):** *"RAG is a dial, not a switch — turn it up as the knowledge gets bigger and the questions get harder."*

> Time check: 0:32. Four sprints done. Pipeline, semantic, vector store, the dial. If past 0:32, the dial earns its full time — the other three can lose their analogy and survive.

*"Words are straight. Now we stop talking about RAG and we build one. Open your workbook to Build A."*

---

## BLOCK 2 — GROUND: BUILDS A, B, C (0:32 – 0:55)

**Goal:** Three build rungs before the break. A — feed the agent its brain (CAG). B — make it cite. C — make it refuse. By 0:55 every learner has an agent that answers from Lumière's own document, names its source, and admits when it doesn't know.

**Facilitator stance:** Run every rung on your own Lumière Knowledge Agent on screen. Build alongside the learners — your demo is the model they follow.

*"Three steps before the break. Feed it. Cite it. Refuse it. Open your workbook to Build A."*

### 0:32 – 0:42 — Build A: Feed the brain (8 min hands-on)

*"Build A is the whole front half of the pipeline — chunk, embed, store — in one move you don't even feel. Create a Claude Project, drop Lumiere_KB.md into its knowledge, ask it one question. Claude does the chunking and storing behind the glass. By the end of this step your agent answers a real question from Lumière's own document."*

→ Facilitator demo first: run your own Lumière Knowledge Agent on screen. Ask: *"Can I get a 2kg eggless chocolate cake for this Saturday?"*

→ Confirm it answers: 48h lead time, eggless available, 50% advance deposit. Point to those details: *"All of this came from the file."*

*"That's CAG — Cache-Augmented Generation, level one on the dial. You loaded the whole document — no vector database, no chunk-by-search, the whole thing sitting in front of the model. For a document this size, that's not a shortcut, it's the right call. You don't build a warehouse to store one box."*

→ Paste in chat:

> **BUILD A (8 min) — Feed the brain:**
> 1. Go to Claude → **Projects** → **Create Project.** Name it *"Lumière Knowledge Agent."*
> 2. Open **Project knowledge** → **Add content** → upload **Lumiere_KB.md**.
> 3. In the chat, ask: *"Can I get a 2kg eggless chocolate cake for this Saturday?"*
> 4. Confirm the answer mentions the 48h lead time, eggless option, and 50% advance — real details from the file, not a generic guess.
> 5. **Fallback (no Project):** fresh Claude chat, attach Lumiere_KB.md with the paperclip, ask the same question.
> 6. Workbook → Build A → write the question you asked + one phrase from the answer that proves it came from the file.

→ Start timer. Key: 8 min.

→ Walk the room. Watch for:
- Project created but doc not in **Project Knowledge** (common miss — the agent answers from thin air). Route them to "Add content."
- Scanned or image PDF — won't upload cleanly. Route immediately to the paperclip-in-chat fallback.
- Generic-sounding answers with no traceable Lumière details. Have them ask: "What's the lead time for a custom cake?" — that's in the file; a guess will get it wrong.

*"The brain is fed. Level one, CAG."*

### 0:42 – 0:50 — Build B: Make it cite (8 min hands-on)

*"Your agent answers from the document — but it answers like it just knows. We want it to show its work. Build B adds one short instruction that names the section it pulled from. This is the difference between 'trust me' and 'here's where I found it.' One paste, and every answer comes with a receipt."*

→ Paste in chat — **this is the grounding prompt:**

> **BUILD B (8 min) — Make it cite:**
> 1. Open your Project → **Set custom instructions** (Project settings). *(Fallback: paste this as the first message in a fresh chat, above your question.)*
> 2. Paste this grounding prompt exactly:
>
>    *"You are a knowledge agent for Lumière Bakery. Answer questions using ONLY the document(s) in your knowledge. After every answer, name the section, heading, or page you pulled it from, like this: (Source: <section/heading>). Do not add outside facts."*
>
> 3. Re-ask: *"Can I get a 2kg eggless chocolate cake for this Saturday?"*
> 4. Confirm the answer ends with a **(Source: …)** line — a real section name from Lumiere_KB.md, e.g. `(Source: Custom & Celebration Orders — Lead Times)`.
> 5. Workbook → Build B → paste the source line it returned.

→ Start timer. Key: 8 min.

→ Walk the room. Watch for:
- Vague citation — `(Source: the document)` instead of a real heading. Add: *"Name the exact heading or section, never just 'the document.'"*
- Learners asking in the same old chat thread — the prior ungrounded turns contaminate it. Have them start a fresh message after setting the instruction.
- Clean citation — read it out. *"[Name]'s agent just cited `(Source: Custom & Celebration Orders — Lead Times)` for the 48h lead time. That's traceable. A customer service rep can act on that."*

*"That source line is the entire point of grounding. You didn't make the agent smarter. You made it accountable."*

### 0:50 – 0:54 — Build C: Make it refuse (4 min hands-on)

*"Last one before the break, and it's the one that makes your agent trustworthy enough to actually deploy. First — ask the allergy question and watch what happens."*

→ Facilitator demo: ask your Lumière agent: *"Is the almond croissant safe for my child who has a severe nut allergy?"* — show whatever it returns. (It may say something partially true but dangerously incomplete, or it may answer correctly from the allergen section. Either way, show it.)

*"The document has allergen information. 'Is the kitchen nut-free?' — that's in the doc; the answer is no, the kitchen is not nut-free. But 'is it safe for my child?' involves a medical judgment call the document doesn't make, and the agent should not guess. That distinction is the lesson. Now we add the guardrail."*

→ Paste in chat:

> **BUILD C (4 min) — Make it refuse:**
> 1. Open your custom instructions again and **add this line** to the grounding prompt:
>
>    *"If the answer is not in the document, say: 'I don't have that in my knowledge base' — and stop. Never guess, never fill in from outside knowledge."*
>
> 2. Ask: *"Is the almond croissant safe for my child who has a severe nut allergy?"* — confirm the agent now gives the correct nuanced answer (contains almonds; kitchen not nut-free; cannot guarantee allergen-free) OR refuses cleanly if the specific safety question falls outside the doc's scope.
> 3. Ask: *"Is your kitchen completely nut-free?"* — the doc says no. The agent should answer this from the file, not refuse.
> 4. Ask something genuinely outside the doc: *"What did Lumière's revenue look like last year?"* — the agent must refuse.
> 5. Workbook → Build C → write what it said before the guardrail vs. after.

→ Start timer. Key: 4 min.

→ Walk the room. Watch for:
- An agent that still guesses on allergens after the guardrail — usually the prompt wording needs to be tighter, or they're asking something the doc does partially cover. The allergy question is a useful edge: if the agent confidently says "yes, it's safe" — the guardrail is not tight enough.
- Confusion about kitchen-not-nut-free vs. the allergen guarantee: the doc says the kitchen is NOT nut-free and cannot guarantee allergen-free. This is in the document and should produce a cited answer, not a refusal.
- A failure-mode beat to name out loud: *"If the agent retrieved the right sections but the response is still vague — that's an integration failure, fix the instruction. If it missed the section entirely — that's a retrieval miss, fix the document structure. The allergy answer you just ran may be a mix of both."*

*"A grounded agent that always answers is still dangerous. On allergens particularly — never guess. That refusal is what makes this deployable."*

### 0:54 – 0:55 — Pre-Break Anchor (1 min)

*"If your agent now refuses an out-of-scope question instead of guessing — that's the milestone. Real break, starting now."*

---

## HARD BREAK (0:55 – 1:05) — 10 MINUTES, NON-NEGOTIABLE

→ Show the break slide with the countdown timer.

*"Real ten-minute break. Cameras off, mics off, get up and away from the screen. We come back at the exact clock time on the slide. Go."*

→ Set the visible 10-min timer. Mute yourself. Play music.

→ **Use the break to work:**
- DM any learner whose agent didn't refuse cleanly. Check if they asked an in-doc question (kitchen-not-nut-free is IN the doc and should be answered, not refused) vs. a genuinely out-of-scope question. Send the pre-built backup Project link if needed.
- If two or more learners hit the same upload or citation snag, plan a 30-second mention at the top of Block 3.

→ When you return: *"Welcome back. Before the break your agent answered, cited, and refused — clean. Now we find out what happens when the document itself is a mess."*

---

## BLOCK 3 — GROUND: BUILDS D, E (1:05 – 1:35)

**Goal:** Two harder rungs. D — break a query with a messy policy doc, then clean it (facilitator demo + learner KB sheet work). E — adversarial probes, hybrid firing, finalize. By 1:35 the agent is grounded, cited, honest, and sturdy.

### 1:05 – 1:18 — Build D: Tune the recall (Facilitator demo ~3 min + 9 min learner KB sheet work)

*"Here's the uncomfortable truth about RAG: the agent is only as good as the document you feed it. Garbage in, garbage out — and the garbage comes back sounding confident and cited. I'm going to break it on purpose. You watch."*

→ **FACILITATOR DEMO ONLY — learners do not upload a second document.**

→ Open **Lumiere_Policy_MESSY.md** on screen. Ask: *"What are the cancellation rules if I need to cancel a custom cake order 36 hours before pickup?"*

→ The agent either misses it entirely (the doc spells out "forty-eight hours" — the word "thirty-six" doesn't match "36"), or retrieves a vague wall-of-text chunk that produces a garbled or incomplete answer. Show the failure.

*"The answer is in that document. The agent just can't surface it because the structure is wrong — it's a wall of text, no headings, sections bleeding into each other. That's a pure retrieval miss. The fix is always the document, not the model."*

→ Open **Lumiere_Policy_CLEAN.md** on screen. Point to the `Cancellation Policy [Cancellation] [Refunds]` header and the clean bullet: "Under 48 hours: no refund." Demo in a fresh chat or re-upload the clean version. Ask the same question.

→ Answer comes back clean, cited, correct.

*"Same model. Same question. Structured document — and it lands. The model didn't get smarter. The document got findable."*

*"Two failure modes you now own: if the answer is in the document but the agent missed it, that's a retrieval miss — fix the structure. If the agent retrieved the right sections but the response is still vague, that's an integration failure — fix the instruction. The before-and-after you just saw is a pure retrieval miss."*

→ Learners spend 9 minutes filling the chunk strategy and tag fields on their KB Design Sheet, based on what they observed. They have their own Lumière Knowledge Agent loaded — they can test their own prompts too.

→ Paste in chat:

> **BUILD D (9 min) — KB Design Sheet, chunk + tag fields:**
> Based on the messy-vs-clean doc demo you just watched:
> 1. In your workbook KB Design Sheet, fill **Field 1 — Chunk strategy**: how would you split Lumiere_KB.md? (By section? By topic cluster? By FAQ pairing?)
> 2. Fill **Field 2a — Structural tags**: what section labels matter most for retrieval? (E.g. `[Custom Orders]`, `[Delivery]`, `[Allergens]`)
> 3. Fill **Field 2b — Semantic tags**: for each section, write the plain-English question it answers. (E.g. "How far in advance do I need to order a custom cake?")
> 4. Optional: run a messy-doc simulation on your own Lumière agent — remove section headers from a pasted excerpt, ask about it, see the miss.

*"The chunk strategy and the section tags you just chose are not busywork — they go straight onto the Knowledge Base Design Sheet you walk out with. That sheet is the recipe for every document at work."*

### 1:18 – 1:32 — Build E: Stress and ship (14 min hands-on)

*"Final build. Your agent is grounded, cited, honest, and reading a well-structured document. The last test is the real world being awkward. Three probes."*

→ Paste in chat:

> **BUILD E (14 min) — Stress and ship:**
>
> Run all three probes against your Lumière Knowledge Agent:
>
> **Probe 1 — Synonym probe:**
> Ask: *"What's your no-egg option for cakes?"*
> Should find the eggless section even though the query says "no-egg," not "eggless."
> Log: HELD or MISSED?
>
> **Probe 2 — Out-of-scope probe:**
> Ask: *"Can you match a competitor's pricing?"*
> Should refuse. Not in the doc.
> Log: REFUSED or GUESSED?
>
> **Probe 3 — Exact-code probe (hybrid):**
> Ask: *"Do you deliver to pincode 400058?"*
> Keyword side fires on the pincode; semantic side fires on the Andheri delivery zone. Both should land.
> Log: FOUND or MISSED?
>
> **Bonus probe — allergen edge case:**
> Ask: *"Is the almond croissant nut-free?"*
> Should give the nuanced answer (contains almonds; kitchen not nut-free; cannot guarantee allergen-free) — NOT a flat "yes."
> If it says "yes, it's nut-free" — tighten the refusal guardrail.
>
> Finalize: lock your grounding + citation + refusal prompt in custom instructions. Your Lumière Knowledge Agent is shipped.
> Workbook → Build E → log each probe result.

→ Start timer. Key: 14 min.

→ Walk the room. Watch for:
- Synonym probe missed — usually the doc has zero semantic overlap on that phrasing. Have them add the everyday synonym as a tag (back to Build D lesson).
- Exact-code probe where the agent paraphrases instead of hitting the pincode: *"Ask it to name the delivery zone for pincode 400058 specifically — that forces keyword firing."*
- Allergen edge case returning "yes, safe" — the guardrail is not tight enough. Have them add: *"On safety or allergen questions, always state that the kitchen is not nut-free and that Lumière cannot guarantee any item allergen-free."*
- Read a spread of probe results by name: *"[Name] — synonym held. [Name] — pincode 400058 landed. [Name] — out-of-scope refused cleanly."*

*"Five steps ago you had a confident guesser. Now you have an agent that answers from Lumière's own document, names its source, refuses what it doesn't know, survives a messy policy doc, and handles both plain questions and exact pincodes. Feed, cite, refuse, tune, ship. Done."*

> Time check: 1:35. If 70% have a finalized agent, move on. The Deploy block is where they decide where this goes to work.

---

## BLOCK 4 — DEPLOY (1:35 – 1:55)

**Goal:** Lift the agent off the demo bench. Four enterprise patterns. The one-department rollout strategy. The dynamic-doc demo — the centrepiece that proves RAG over fine-tuning. The RAG-vs-fine-tuning decision rule. KB Design Sheet finalized.

**Facilitator stance:** Lower the build energy. This is the "what does this mean on Monday" block.

### 1:35 – 1:40 — Where this goes to work: four patterns (5 min)

*"You built one agent on one document. Out in a company, that same five-step pattern shows up in four shapes — and every one of them has a Lumière analogue."*

→ Show the four-patterns slide. Name the Lumière analogue for each as you go:

- *"Document Q&A — point it at a contract, a report, a long PDF, ask it questions. For Lumière: the policy doc and allergen lookups. For your job: any long doc your team keeps asking the same ten questions about."*
- *"Corporate or policy bot — the staff handbook, the SOP, the compliance doc that floods the inbox. For Lumière: the staff handbook, service SOPs. For your job: the HR or compliance function."*
- *"Internal knowledge search — wikis, shared drives, the folder nobody can navigate. For Lumière: the franchise operations manual when they scale to ten branches. For your job: any ops or finance team."*
- *"Product knowledge base — specs, pricing, the menu, the sales playbook. For Lumière: the full menu and seasonal catalogue. For your job: sales, customer success, support."*

*"Same pipeline. Four jobs. Find yours."*

### 1:40 – 1:44 — How to actually roll it out (4 min)

*"One rule for rolling this out without it blowing up: one department at a time. Pick the team drowning in repeat questions. Ground an agent on just their documents. Prove accuracy — does it cite right, does it refuse right, on the questions that team actually asks — before you scale. The teams that fail tried to ingest the whole company on day one. Start narrow, prove it, widen."*

### 1:44 – 1:49 — The Dynamic Doc Demo — RAG vs. fine-tuning proof (5 min)

*"This is the centrepiece of the Deploy block. I'm going to show you the entire argument for RAG over fine-tuning in three steps."*

**Step 1 — Establish the current state.**

*"Delivery Edge-case persona. Ask your agent: 'Do you deliver to Sector 90, Gurgaon?'"*

→ Give 30 seconds. Everyone should get: *"Lumière currently operates only in Mumbai. Delivery is not available in Gurgaon."*

*"Correct answer — as of right now. Now watch what happens when Lumière expands."*

**Step 2 — Update the document, live.**

→ Open **Lumiere_KB.md** in your text editor on screen. Navigate to the Locations & Hours section. Type or paste the following paragraph live (or paste from your pre-prepared note — you tested this in pre-class):

```
### Gurugram Branch [NEW]
**Address:** Unit 4, Sapphire 90 Mall, Sector 90, Gurugram 122017
**Phone:** +91 95990 11223
**WhatsApp:** +91 95990 11223
**Hours:** Monday–Sunday: 10:00 am – 9:00 pm
**Delivery radius:** 10 km from this branch (covers Sector 82–95 approximately, including DLF Garden City, Vatika City, Palam Vihar fringe).
```

Also add to the Delivery Zones table:

```
| Gurugram | Sector 82–95, DLF Garden City, Vatika City | 122017 – 122018 |
```

**Step 3 — Re-upload and re-ask.**

→ Save and re-upload the updated Lumiere_KB.md to your facilitator Project (or swap to your pre-built Gurgaon-version Project).

→ Ask: *"Do you deliver to Sector 90, Gurgaon?"*

→ Answer now: *"Yes — our new Gurugram branch at Sapphire 90, Sector 90 delivers within 10km, covering Sector 82–95 approximately, including DLF Garden City, Vatika City, and Palam Vihar fringe."*

*"You didn't retrain the model. You updated the document. That's the entire argument for RAG over fine-tuning: your knowledge changes, your document changes, the agent answers correctly. Zero retraining."*

**Step 4 — Prove it again with the offers section.**

→ In the Current Offers section of Lumiere_KB.md, swap the LUMIERE15 promotion text to: *"Free delivery on all orders above ₹800 this week."* Re-upload. Ask: *"Any discounts this week?"*

→ Answer changes. *"Same model. New answer. New document."*

**Step 5 — Name the boundary.**

*"The bot matched 'Sector 90 Gurgaon' to the delivery zone in the document — because we wrote that zone in. What it cannot do: check your GPS location in real time. If someone says 'I'm 4km from Sapphire 90, can you deliver?' — the bot needs that zone in the document, or a live tool to calculate distance. Tools are Session 5. Today, the document is the boundary."*

### 1:49 – 1:52 — RAG vs. fine-tuning decision rule (3 min)

*"One question you'll get asked the second you mention this at work: 'shouldn't we just fine-tune the model instead?' Here's the rule of thumb. New facts — your documents, your data, things that change — that's RAG. You update the document, not the model. New behavior — consistent tone, house style, specific format every time — that's fine-tuning. Both: do both."*

→ Show the RAG-vs-fine-tuning slide.

*"One honest line so you don't oversell it: fine-tuning does not remove hallucination — it just makes the model wrong in your brand voice. Grounding is what gives an answer a source to stand on. New facts, RAG. New tone, fine-tune. And if someone pushes back — this is the working rule most practitioners use, not a settled research finding. Expect honest debate at the edges."*

### 1:52 – 1:55 — KB Design Sheet (3 min)

*"Last thing, and it's the real walk-out prize. The agent is today's demo — the sheet is the method. Open the Knowledge Base Design Sheet in your workbook. Five fields."*

→ Paste in chat:

> **KB DESIGN SHEET (3 min) — finalize all five fields:**
> 1. **Chunk strategy** — how you'd split your document (from Build D observation).
> 2a. **Structural tags** — section labels so retrieval finds the right piece.
> 2b. **Semantic tags** — the plain-English question each section answers.
> 3. **Query range** — what the agent should answer + what it must refuse.
> 4. **Grounding + refusal prompt** — paste your final custom-instructions text.
> **HEADLINE ROW:** Where on the RAG dial? One sentence: *"Mine is a level-1 CAG / level-2 vanilla / level-3 hybrid — because ___."*

→ Then verbal go-around (≤6 learners — read every name) or chat (≥12 — ask everyone to type their dial level, read 4–5 by name):

*"[Name] — where did your use-case land on the dial, and why?"*

*"Different documents, different points on the dial — and every one of you can defend the choice in one sentence. That sheet is what you take to work."*

> Time check: 1:55. Pivot to close.

---

## BLOCK 5 — CLOSE (1:55 – 2:00)

### 1:55 – 1:57 — Synthesis (2 min)

*"Step back. Two hours ago you walked in with a confident guesser that made up a lead time for a cake it had never seen. You leave with a Lumière Knowledge Agent grounded in Lumière's own documents — it answers the Saturday cake question with the real 48-hour lead time, tells you the kitchen isn't nut-free when you ask, refuses to guess when it doesn't know, survives a messy policy doc once you structure it, and handles both plain questions and exact pincodes. Five builds — feed, cite, refuse, tune, ship. No code."*

### 1:57 – 1:58 — Forward Bridge (1 min)

*"Your agent retrieves when you ask. The top of the dial — agentic RAG — is when the agent decides for itself when and how often to retrieve, across more than one source. That requires planning, memory, and autonomous action. That's Session 5, tomorrow: Agent Architecture — how agents think, remember, and act. Today you gave the agent a brain made of Lumière's documents. Next we give it the will to use that brain on its own."*

### 1:58 – 2:00 — Reflection + Goodbye (2 min)

→ Paste in chat:

> **Take with you (reply by Friday):**
> 1. ONE document at your work you'd ground an agent on — and the first customer question you'd want it to answer.
> 2. ONE point on the RAG dial your most common use-case lands on, and why.
> Two sentences each.

→ Close (deliver slowly):

*"You came in with a guesser that invented a cake lead time. You leave with an agent that, when it doesn't know, says so — and tells you where it found everything else. That's not a smarter model. That's a grounded one. Well done today. See you for architecture."*

→ Wave. Stop recording. End meeting.

> Post-class: within 24h, send — the workbook, the KB Design Sheet template (PDF), individual replies to the take-home, the calendar invite for Session 5.

---

# FACILITATOR CONTINGENCY GUIDE

## If a demo fails live

- **NotebookLM won't load in the cold open:** Skip it entirely — the empty-Claude guesser proof stands on its own. Say: *"I'll show you the grounded-and-cited contrast later, in your own Project."* Move straight to Norms. The guesser proof is the non-negotiable half; the citation showpiece is the bonus.
- **Upload fails (scanned or image PDF):** Route immediately to the paperclip-in-chat fallback — attach Lumiere_KB.md with the paperclip in a fresh chat, paste the grounding prompt as message one. Every build rung works identically. Say so plainly: *"Paperclip fallback — same grounding, same result."*
- **Claude Projects is unreachable for everyone:** Fall back to single chat + attached file for the whole class. Narrate it in one breath and keep moving.
- **No upload works at all (account/network issue):** Paste the relevant section of Lumiere_KB.md directly into the chat above the question. The grounding and refusal prompts behave the same; it loses persistence, not the lesson.
- **Dynamic doc demo fails live (can't re-upload in time):** Switch to your pre-built Gurgaon-version Project — you built this in pre-class. Ask *"Do you deliver to Sector 90, Gurgaon?"* against it directly. The answer is already correct. Narrate: *"This is the updated version — same lesson."*

## If the Allergy Parent persona gets a wrong answer

- Check first whether they asked an in-doc question or an out-of-doc question. "Is your kitchen nut-free?" → the doc says no, the agent should answer this from the file, not refuse. "Is the almond croissant safe for my child?" → medical safety judgment; the doc cannot answer this, the agent should decline or give the nuanced allergen statement.
- If the agent confidently says "yes it's safe" or "yes it's nut-free" when the doc says otherwise — the refusal guardrail is too weak. Have them add: *"On safety or allergen questions, always state that the kitchen is not nut-free and that Lumière cannot guarantee any item allergen-free."*
- If the agent refuses "Is the kitchen nut-free?" — that's wrong; the answer IS in the doc. The guardrail may be over-broad. Have them re-read the grounding prompt and confirm the refusal trigger only fires when the answer is genuinely absent from the document.

## If <70% finish a build on time

- **Build A (non-negotiable):** At 0:40, pause 90 seconds. Route any stragglers to the paperclip-in-chat fallback — faster than debugging Projects. Do not move on until everyone has an agent answering from the file.
- **Builds B/C:** Move on at the guard if most learners are there. Let your facilitator demo stand in — run cite and refuse on your screen and say: *"Watch mine — you'll add the same one line after the break."*
- **Build D:** This is facilitator-only demo — no learner build to finish. The KB sheet work is the 9 minutes. If the room is behind, shorten to 5 minutes of sheet work and keep moving.
- **Build E:** Give a 60-second extension, then let your screen carry the last probe. Never cut into the break or the KB Design Sheet to recover build time.

## If you're running over

- Cut the Deploy enterprise-pattern descriptions to a single line each: *"Document Q&A, policy bot, internal search, product KB — find yours."*
- Collapse the rollout strategy to one sentence.
- Protect the dynamic-doc demo and the KB sheet — these are the two walk-out moments that justify the Deploy block.
- If still over at 1:55, trim the synthesis to two sentences. Always deliver the forward bridge to Session 5.

## If you're running under

- Expand Build E: invite a second adversarial probe of the learner's own design. *"Think of a question a difficult customer would ask — one the doc doesn't cover. Try it."*
- Or deep-dive the Gurgaon delivery boundary beat — *"What if someone says 'I'm 3km from Sapphire 90, is that within 10km?' What does the agent do? What would you need to add to the doc to cover that?"*
- Or ask two live "which dial level is mine?" cases from the room and reason them out together.

## "RAG is just search" challenge

*"Fair — and you're half right. RAG is retrieval plus generation, so yes, search is the engine. And here's the honest part: RAG reduces wrong answers, it doesn't eliminate them. Bad retrieval still fails. A stale document still misleads. That's exactly why we built the refusal and stress-tested it with a messy policy doc."* Then pivot to a concrete demo: run the allergy refusal on your agent and show it decline cleanly.

## Small cohort (≤6)

- No chat scoreboard. Go verbal. Read every name in the Build debriefs and the dial go-around. Call each person's result by name during Builds B, C, and E. KB Design Sheet go-around is verbal, one sentence per learner, every voice.

## Large cohort (≥12)

- Use the chat scoreboard. Have learners paste their source line, refusal text, and dial placement in chat. Read 4–5 aloud by name. For the dial go-around, ask everyone to type their level in chat: *"I'm seeing mostly level-2 vanilla, a couple of level-3 hybrid."*

---

# PRACTICE RECOMMENDATION

Do one full dry run alone with a stopwatch the day before.

1. **Build Lumière A → E on Lumiere_KB.md in Claude Projects.** Run every rung yourself:
   - (A) Confirm the Saturday eggless cake question returns 48h lead time, eggless option, 50% advance.
   - (B) Confirm the citation is a real section label — `(Source: Custom & Celebration Orders — Lead Times)` or equivalent. A vague `(Source: the document)` means the prompt needs tightening.
   - (C) Confirm "Is your kitchen completely nut-free?" → answered from the doc (no, it is not). Confirm "What did Lumière's revenue look like last year?" → refused. If the allergen answer comes back flat "yes it's safe" — the guardrail is wrong. Tighten it before class.
   - (D) Test the MESSY policy doc failure. The cancellation question about "36 hours" should degrade against the doc that spells out "forty-eight hours." Confirm the clean version answers correctly.
   - (E) Run all three probes: synonym ("no-egg option" → finds eggless), out-of-scope ("match a competitor's pricing" → refused), exact-code ("pincode 400058" → finds Andheri delivery zone).

2. **Test the dynamic-doc update end-to-end:**
   - Add the Gurgaon paragraph to Lumiere_KB.md. Re-upload. Confirm "Do you deliver to Sector 90, Gurgaon?" flips from "not available" to the Sapphire 90 branch answer.
   - Swap the offers section text. Re-upload. Confirm the discount answer changes.
   - If the re-upload is slow or flaky on your connection, pre-build a second Project with the Gurgaon version already loaded — your fallback.

3. **Time the RAG-dial sprint** (Sprint 4, Block 1): 8 minutes, five levels, approximately 40 seconds each. Keep your finger on the dial graphic. If it bleeds past 8 minutes, cut the GraphRAG and Re-ranking name-drops.

4. **Know these lines cold:**
   - The One Rule: *"You walked in with a confident guesser. You leave with a grounded agent that cites its source — or admits it doesn't know."*
   - The dial line: *"RAG is a dial, not a switch — turn it up as the knowledge gets bigger and the questions get harder."*
   - Build A naming: *"You loaded everything — no vector DB. That's CAG, level one on the dial."*
   - Dynamic-doc lesson: *"You didn't retrain the model. You updated the document."*
   - The close: *"That's not a smarter model. That's a grounded one."*

5. **Prepare the Gurgaon paragraph in a clipboard manager or sticky note** so you can paste it verbatim in the dynamic-doc demo without typing live. This is a time-sensitive live moment — paste it, don't compose it.

6. **Estimated dry-run time: 75 minutes** — 30 to build A→E in the tool, 20 to drill the refusal and the allergen edge case until both behave reliably, 25 to run the dial sprint and the dynamic-doc update. Skip none of it. The allergen refusal and the dynamic-doc swap are the two moments the whole session turns on.

---

**Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu**
**EdYoda · GenAI & AI Agents for Non-Coders · S04**
