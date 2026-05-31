# Facilitator Script — Generative AI for Non-Coders (Session 1 of 2)
**Duration:** 120 minutes · **Format:** Live virtual (Zoom/Meet) · **Audience:** Working professionals, mixed India + international, includes marketing/sales, finance/consulting, and at least one doctor.
**Spine:** Demo-First Discovery → Build Sprint
**Hands-on share:** ~60% (≈72 min of learner activity, breakouts, prompting)
**Tools assumed available:** ChatGPT (free), Claude.ai (free), Google Gemini (free), EdYoda Agent Builder, OpenAI Tokenizer (web tool, no login).

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] Send a 1-line email: *"Tomorrow, please log into chat.openai.com, claude.ai, gemini.google.com — free accounts are fine. Have 3 browser tabs ready."* Include the calendar link.
- [ ] Send the **Learner Workbook** as a Google Doc (view-only, in-class link will be in chat).
- [ ] Pre-load 6 browser tabs on your machine:
  1. ChatGPT (logged in)
  2. Claude.ai (logged in)
  3. Gemini (logged in)
  4. OpenAI Tokenizer — `platform.openai.com/tokenizer`
  5. EdYoda Agent Builder (logged in, with a pre-built demo agent ready)
  6. Backup tab — ChatGPT in a second account in case your main session glitches
- [ ] Set up 2 Zoom polls in advance:
  - **Poll 1 (Min 7):** *"What will ChatGPT answer when I ask: 'How many R's are in strawberry'?"* Options: 2 / 3 / 4 / It'll be wrong
  - **Poll 2 (Min 35):** *"Which model gave the best answer?"* Options: ChatGPT / Claude / Gemini / Tie
- [ ] Open a shared Google Doc titled **"Parking Lot — Session 1"**, paste the link in your chat-ready clipboard.
- [ ] Recruit a co-pilot / TA if possible. If not, plan to recruit a learner in minute 5 as the "chat monitor."
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] Have water, a printed copy of this script, and a visible timer.

---

## Opening Hook Slide (have this up 5 min before class starts)

> **"In the next 2 hours, you'll prompt 3 AI models, watch one of them confidently lie to you, and build something you can use at work tomorrow."**

Play soft instrumental music until you start. Welcoming, not awkward silence.

---

# THE 120-MINUTE RUN SHEET

Each block has: **what you say (italics)**, **what you do**, **what learners do**, and **timing guard**.

---

## BLOCK 0 — OPENING (0:00 – 0:10)
**Goal:** Earn the right to teach. Get every learner to type in chat in the first 90 seconds. Set norms. Do NOT introduce yourself yet.

### 0:00 – 0:02 — Cold Open

*"Hi everyone — quick request before I say anything else. **In one word in the chat, describe your current relationship with AI right now.** Skeptical? Excited? Confused? Scared? Hopeful? Just one word. Type it in."*

→ Wait 30 seconds. Read 6-8 out loud, **by name**.

*"Thank you Priya, thank you Rajesh, thank you Anita, thank you Daniel… I love this mix. Skeptical AND excited — that's exactly where this class is going to land."*

> **Why this works:** Research (Brinkerhoff, corporate training studies) shows learners who contribute in the first 5 minutes are ~40% more likely to stay engaged for the full session. Reading names builds instant trust.

### 0:02 – 0:04 — The Hook Question

*"Quick poll. Raise your hand in chat — type 🙋 — if you've ever asked ChatGPT something and it gave you a confident, completely wrong answer."*

→ Wait. Hands will come. *"Lots of you. Great. By the end of today, you'll know exactly **why** that happens, exactly **when** to trust it, and exactly **when not to**."*

### 0:04 – 0:06 — Norms Slide (show this on screen)

Read this slide aloud, briskly:

| Norm | What it means |
|---|---|
| **Cameras** | Encouraged but optional. I will not call out off-camera folks. |
| **Chat** | Use it freely — questions, reactions, even jokes. Welcome. |
| **Mics** | Stay muted unless I call on you or you want to share. |
| **Questions** | Hot ones in chat — I'll answer live or save them for our **Parking Lot** doc, link coming. |
| **Break** | A real 10-minute break at the 55-minute mark. Promise. |

→ Paste the **Parking Lot Google Doc link** in chat right now.

*"Anyone willing to be our 'chat monitor' — flag me if I miss a question? Just type YES."* → Pick the first volunteer, thank them by name.

### 0:06 – 0:08 — Predict-the-Output Demo (the meta-demo)

*"Before I tell you anything about how this class works — let me show you how it works."*

→ Share screen. Open ChatGPT. Type: **"How many R's are in the word strawberry?"** Do NOT hit enter yet.

→ Launch **Poll 1**. *"Vote. What will it say?"*

→ Show poll results. Hit enter. ChatGPT will often say "2" (this is a famous failure case — verify the day-of, but it usually still trips up free-tier models). If it says 3 correctly, pivot to: *"Today it got it right — but six months ago this exact question stumped GPT-4. We'll see why."*

*"That's the methodology of today's class. Predict → run it → understand why. We will NOT spend two hours on slides."*

### 0:08 – 0:10 — Quick Self-Intro + Roadmap

*"Quick intro — I'm Shantanu, [your one-line credibility]. Now the roadmap."*

→ Show the 6-topic visual journey slide (from the reference PDF, slide 3).

*"Six topics. By minute 110, you will have prompted three AI models, watched one hallucinate live, and built one prompt-based tool you can use at your job tomorrow. At minute 113, I'll show you EdYoda Agent Builder — a sneak preview of what we'll build together in Session 2."*

> ⏱ **Time check: 0:10.** If you're at 0:12, skip the second hook poll next time — get back on track now.

---

## BLOCK 1 — TOPIC 1: WHAT IS GENERATIVE AI (0:10 – 0:25)
**Goal:** Make the rule-based → foundation models evolution *visceral*, not chronological. Learners should *feel* what "generative" means.

### 0:10 – 0:14 — Demo: The Translator That Understands Meaning

*"Forget definitions for a minute. Let me show you what's actually different about generative AI."*

→ Open Google Translate. Translate this Hindi sentence to English: **"मेरा दिल बाग बाग हो गया।"** (Literal: "My heart became garden garden.")

Google Translate output: *"My heart has become garden garden"* — confusing.

→ Now open ChatGPT. Paste: *"Translate this Hindi phrase to English AND explain its cultural meaning: मेरा दिल बाग बाग हो गया।"*

ChatGPT: *"Literally: 'My heart has become a garden.' Idiomatically, this means 'My heart is overjoyed' or 'I'm blooming with happiness.' Used in Hindi to express elation, often poetic."*

*"Notice the difference? Google Translate is doing **rule-based translation** — word in, word out. ChatGPT is doing **generation** — it understood the meaning, the culture, and produced something new. That's the leap."*

### 0:14 – 0:18 — Mini-Lecture (USE REFERENCE SLIDE 4)

Use slide 4 from your reference deck. Talk through the 4 stages — **30 seconds per stage, no more**:

1. **Rule-based (1950s–1980s):** *"If-then recipes. Like a vending machine — every input has a fixed output."*
2. **Machine Learning (1990s–2010s):** *"Learns patterns from data. Like a spam filter that gets smarter as it sees more spam."*
3. **Deep Learning (2010s):** *"Multi-layered neural networks. Like the AI that beat humans at Go."*
4. **Foundation Models (2020+):** *"Trained on the entire internet. Can do tasks they were never specifically trained for. This is GPT, Claude, Gemini."*

**Key analogy (memorize this):** *"Rule-based AI is a recipe book. Generative AI is a master chef. The recipe book knows exactly 100 dishes. The master chef can invent a 101st when you describe what you want."*

### 0:18 – 0:25 — Hands-On #1: Your First Prompt (7 min)

→ Paste in chat:
> **EXERCISE 1:** Go to chat.openai.com. Type: *"Write a 4-line poem about my job as a [your role]. Make it warm and slightly funny."* Take 4 minutes. Then paste your favorite line in chat.

→ Set a 4-min visible timer. Watch chat fill up.

→ Read 4-5 favorites aloud by name. *"Sneha got a 4-line poem about being a radiologist that rhymes 'scan' with 'plan' — that's generation. That poem didn't exist 5 minutes ago. It was created."*

> ⏱ **Time check: 0:25.** If you're at 0:27, cut to 3 readouts not 5. Move on.

---

## BLOCK 2 — TOPIC 2: KEY MILESTONES (0:25 – 0:40)
**Goal:** Cover GPT, DALL·E, Gemini, Claude, Llama without lecturing. Make it about *what each unlocked for work*, not release dates.

### 0:25 – 0:28 — Frame It

*"There are 5 model families that matter for your work life. Instead of me listing dates, you're going to feel the difference yourselves."*

→ Show slide 6 from reference deck (the milestones grid) for 30 seconds — *"This is your reference. Don't memorize. We'll move on."*

### 0:28 – 0:38 — Hands-On #2: Model Speed Dating (10 min)

→ Paste in chat:
> **EXERCISE 2:** Open 3 tabs side by side: ChatGPT, Claude.ai, Gemini.
>
> Paste this **identical prompt** into all three:
>
> *"I'm a [marketing manager / finance analyst / doctor]. Explain in 4 short bullet points why our quarterly revenue dipped 12%. Assume nothing. Ask me 2 clarifying questions before answering."*
>
> Spend 5 minutes. Compare the answers. Then in chat, type the model name that gave you the answer you'd actually trust: **ChatGPT / Claude / Gemini**.

→ Launch **Poll 2**.

→ While they work, **silently switch your screen to your own ChatGPT/Claude/Gemini side-by-side**. Be doing the exercise too.

### 0:38 – 0:40 — Debrief

→ Read poll results. *"Claude got 40%, ChatGPT 35%, Gemini 25%. Interesting. Here's what each model actually unlocks:"*

Use this 60-second narration:

- **GPT (2020):** *"First model to write coherent paragraphs. The breakthrough that made everything else possible. Use it for drafting, brainstorming."*
- **DALL·E (2021):** *"First model to make pictures from words. Use it for marketing visuals, mockups."*
- **GPT-4 (2023):** *"Could read images too — multimodal. Use it for document analysis, charts."*
- **Gemini (2023):** *"Google's answer. Plugged into Workspace — Docs, Gmail, Sheets. Best if you live in Google."*
- **Claude (2023):** *"Built for safety and long context — can read a 200-page contract in one go. Best for nuanced analysis."*
- **Llama (2023+):** *"Open-source. Companies run it on their own servers when data can't leave the building. Hospitals, banks, government."*

*"Different models for different jobs. Like having a marketing copywriter, a designer, and a legal analyst on staff."*

> ⏱ **Time check: 0:40.** Hard pivot. Don't let this run.

---

## BLOCK 3 — TOPIC 3: HOW LLMS WORK — TOKENS, CONTEXT, TEMPERATURE (0:40 – 0:55)
**Goal:** The marquee technical block. Make 3 abstract concepts visceral. This is the **screenshot moment** of the class.

### 0:40 – 0:42 — Frame It

*"Three words you'll hear constantly. Tokens. Context windows. Temperature. By minute 55, you will have FELT all three. Stay with me."*

### 0:42 – 0:46 — Tokens (4 min)

*"Forget words. AI thinks in **tokens** — chunks of text, like LEGO bricks. Watch."*

→ Share screen. Open **platform.openai.com/tokenizer**.

→ Type **"strawberry"** → 1 token.
→ Type **"antidisestablishmentarianism"** → 6 tokens.
→ Type **"Shantanu Chandra"** → likely 4-5 tokens.
→ Type **🎉** → 1 token but 3-4 bytes.

→ Paste in chat:
> **MICRO-EXERCISE:** Go to platform.openai.com/tokenizer. Type **your full name**. Type a **3-paragraph email** you sent last week. Tell me the token count in chat.

→ Wait 2 min. Read 3-4 numbers aloud. *"Anita's email was 412 tokens. That's why pricing works the way it does — you pay per token, in and out."*

**Analogy (memorize):** *"Tokens are LEGO bricks. Your name might be 2 bricks. A long word might be 5. You're charged by the brick, not the sentence."*

### 0:46 – 0:50 — Context Window (4 min)

*"Now: how much can the model REMEMBER in one conversation?"*

→ Open ChatGPT. Show a long conversation you pre-prepared (or just describe).

**Analogy:** *"The **context window** is the model's whiteboard. Everything in your conversation goes on it. When the whiteboard fills up, the oldest stuff gets erased — the model forgets the beginning."*

→ Show on screen:
- GPT-4o: ~128,000 tokens (~300 pages of text)
- Claude Sonnet: ~200,000 tokens (~500 pages)
- Gemini 1.5 Pro: ~2,000,000 tokens (~5,000 pages)

*"This is why Claude is the contract lawyer's favorite — it can hold an entire merger document in one conversation. ChatGPT might need to be reminded."*

→ Provoke: *"Have any of you ever had ChatGPT 'forget' something you said earlier in the same chat? That's the whiteboard erasing the old stuff."*

### 0:50 – 0:55 — Temperature (5 min) — THE FUN DEMO

*"Last one. Temperature is the **creativity dial**. Zero = boringly consistent. One = creative, slightly weird. Above one = chaos."*

→ Open 2 fresh ChatGPT tabs.

→ In Tab 1, ask: *"Give me a brand name for a sustainable coffee shop in Bangalore. One name only."*
→ In Tab 2 (NEW chat), ask the exact same thing.

→ Show: different answers. *"This is high temperature — the model picks a different creative answer each time."*

→ Now in a new chat: *"What is 2 + 2?"* → "4". Ask again. → "4". *"Math questions don't vary. The model is essentially at temperature zero for facts."*

→ Paste in chat:
> **MICRO-EXERCISE:** In ChatGPT, open a NEW chat and ask: *"Give me 5 creative names for a wellness clinic in Mumbai."* Then open ANOTHER new chat and ask the EXACT same thing. Compare. Notice they're different.

**Analogy (memorize):** *"Temperature is the spiciness slider. Low = accountant brain (predictable, boring, accurate). High = poet brain (creative, surprising, sometimes wrong)."*

> ⏱ **Time check: 0:55.** Hard pivot to break.

---

## 🟢 HARD BREAK (0:55 – 1:05) — 10 MINUTES, NON-NEGOTIABLE

*"Real 10-minute break. Cameras off. Get up. Stretch. Water. I'll see you back at [actual clock time]. We come back at [time]. I'll start sharp."*

→ Put a slide up: **"Back at [time]. Music playing."** Play music. Mute yourself. Leave the room (in your house). Come back at minute 8 of the break, sip water, prepare.

> **Why non-negotiable:** Bailenson's Zoom-fatigue research shows screen fatigue compounds non-linearly after 50 minutes. Skipping this break costs you the second hour.

---

## BLOCK 4 — TOPIC 4: THE GENAI VALUE CHAIN (1:05 – 1:20)
**Goal:** Make Models → Platforms → Applications → Outcomes feel like a stack they can see, not a slide they read.

### 1:05 – 1:07 — Welcome Back + Frame It

*"Welcome back. Hope you stretched. Quick check — type a single emoji in chat to show me you're back."* → Wait 15 sec. Energy reset.

*"Next 15 minutes — we zoom out. We just learned how individual models work. Now: how do real companies actually USE them?"*

### 1:07 – 1:12 — Mini-Lecture: The 4-Layer Stack (USE REFERENCE SLIDE 10)

Use reference slide 10. Walk through fast:

- **Layer 1 — Models:** *"Raw brain. GPT-4, Claude, Gemini, Llama. Built by OpenAI, Anthropic, Google, Meta."*
- **Layer 2 — Platforms:** *"The cloud infrastructure that lets companies use these models securely. Azure OpenAI, AWS Bedrock, Vertex AI."*
- **Layer 3 — Applications:** *"The actual tools you use. ChatGPT app, Microsoft Copilot, Notion AI, GitHub Copilot."*
- **Layer 4 — Outcomes:** *"What the business gets. Faster proposals, fewer hours wasted, lower support costs."*

**Key line:** *"Most of you live at Layer 3. But knowing Layers 1 and 2 helps you make smarter decisions — which tool to buy, which vendor to trust, where your data goes."*

### 1:12 – 1:20 — Hands-On #3: Reverse-Engineer the Stack (8 min)

→ Paste in chat:
> **EXERCISE 3 (pairs, 6 min):** I'll send you into breakout rooms of 2. Pick ONE of these tools you've heard of:
>
> - Microsoft Copilot (the one in Word/Excel)
> - Notion AI
> - GitHub Copilot
> - A bank's WhatsApp chatbot
> - Harvey AI (used by law firms)
>
> In your pair, figure out:
> 1. **Which model** is probably behind it?
> 2. **Which platform** does it run on?
> 3. **What business outcome** does it deliver?
>
> Use ChatGPT or Google to help. Come back with one answer.

→ Send to **breakout rooms of 2** (NOT bigger — pairs force participation). Set 6-min timer.

→ Pull everyone back. Rapid-fire: call on 3 pairs by name, 30 seconds each. *"Sneha & Daniel, which tool, what stack?"*

*"Notice — you just reverse-engineered the entire industry. That's the skill: when someone tries to sell you 'AI,' you now know what to ask. Which layer? Which model? What's the outcome?"*

> ⏱ **Time check: 1:20.** Move.

---

## BLOCK 5 — TOPIC 5: LIMITATIONS (1:20 – 1:38)
**Goal:** Provoke. Show, don't explain. Each limitation gets a live demo that makes learners uncomfortable.

### 1:20 – 1:22 — Frame It

*"Here's the part nobody selling AI tells you. These models have four hard limits. I'm going to show you each one live, right now, on this screen."*

→ Show reference slide 12 (the 2×2 limitations grid) for 20 sec. *"Memorize this grid. We'll see each one happen."*

### 1:22 – 1:26 — Demo 1: Hallucination (4 min)

→ Share screen. ChatGPT.

→ Type: *"Tell me about the 2019 Indian Supreme Court case 'Mehta vs. Sharma' on cryptocurrency regulation. Cite the bench and key judgment paragraphs."*

→ Watch it confidently invent a case. Read the response aloud. *"This case does not exist. I made it up. The AI just wrote you a fake judgment with fake judges. Read this sentence — 'In paragraph 47, Justice Khanna held that…' — none of that exists."*

*"This is **hallucination**. The model isn't lying — it's pattern-matching. It saw 1000 Supreme Court cases in training, so it can make up a 1001st that looks real. Dangerous if you don't check."*

**For the doctor in the room:** *"Imagine asking it for a clinical trial citation. Same thing. Always verify."*

### 1:26 – 1:30 — Demo 2: Static Knowledge (4 min)

→ Type: *"Who won the most recent Indian general election and what was the seat count?"*

→ Free-tier models without web access will give a stale or hedged answer.

*"This is **static knowledge**. The model's training has a cutoff date. It's like talking to someone who's been in a coma since [training cutoff]. They're smart, but their newspaper stopped."*

→ Now switch to a model with web access (Gemini, or ChatGPT with browse). Same prompt. Get the live answer.

*"Tools fix this — but you have to KNOW the limitation exists to even ask for the tool."*

### 1:30 – 1:34 — Demo 3: No Memory (4 min)

→ In a fresh ChatGPT chat, type: *"My name is Priya. I'm a marketing director at an Indian D2C skincare brand. Remember this."*

→ Get confirmation.

→ Open a **brand new chat** (or new browser window). Type: *"What's my name and what do I do?"*

→ Watch it say it doesn't know.

*"This is **no memory**. Each conversation is a fresh slate. ChatGPT's 'memory' feature is a band-aid — it pastes things in for you. Real memory doesn't exist in a single LLM call."*

**For finance/consulting folks:** *"This is why you can't 'train' ChatGPT on your client by chatting with it. The next analyst on your team starts from zero."*

### 1:34 – 1:38 — Demo 4: No Action (4 min) — THE SETUP FOR TOPIC 6

→ Type: *"Book me a flight from Delhi to Bangalore for next Tuesday morning, add it to my Google Calendar, and email the itinerary to my assistant rajesh@company.com."*

→ Watch ChatGPT write you a beautifully detailed *"Here's what I would do… Step 1: Visit MakeMyTrip…"* — but it doesn't actually do anything.

*"This is **no action**. The model can THINK and WRITE about doing things. It cannot DO things. It has no hands. No calendar access. No email send button."*

*"Hold that thought. We're about to fix it."*

> ⏱ **Time check: 1:38.** Move directly into Topic 6 — no break.

---

## BLOCK 6 — TOPIC 6: THE CHATBOT CEILING + BUILD SPRINT (1:38 – 1:53)
**Goal:** Climax of the class. Show the multi-step failure. Then everyone builds.

### 1:38 – 1:42 — The "Bakery Campaign" Demo (4 min)

→ Share screen. ChatGPT.

→ Type slowly so they read along:
> *"I run a small bakery in Mumbai. Help me launch a new product line. I need you to: (1) research what's trending in the Mumbai bakery scene this month, (2) draft three Instagram posts, (3) generate three images for those posts, (4) schedule them across the next week, (5) email the schedule to my partner sneha@bakery.com, and (6) set a reminder to review performance in 30 days."*

→ Hit enter. Watch ChatGPT do (2) well, sort of attempt (3) if image gen is on, and FAIL at (1, 4, 5, 6).

→ Walk through each failure on screen:
- ❌ Step 1 (research): No live web on free tier.
- ✅ Step 2 (drafts): Works.
- ⚠️ Step 3 (images): Partial.
- ❌ Step 4 (schedule): Cannot.
- ❌ Step 5 (email): Cannot.
- ❌ Step 6 (reminder): Cannot.

**The key line (deliver slowly):**

*"A chatbot is a brain in a jar. It can think. It can write. It cannot browse, remember, schedule, send, or check. **An Agent is what you get when you give the brain hands, eyes, and a calendar.**"*

*"That's what we're building in Session 2. Now — one quick preview."*

### 1:42 – 1:46 — Live EdYoda Agent Builder Preview (4 min)

→ Switch to your pre-loaded EdYoda tab.

→ Show your pre-built demo agent. Suggested demo: a **"Patient Intake Assistant"** (for the doctor) OR a **"Lead Qualification Agent"** (for marketing) OR a **"Quarterly Variance Explainer"** (for finance) — pick whichever matches your demo agent.

→ Show in 3 quick clicks:
1. **System prompt** (the role) — *"Look, plain English."*
2. **Tools / integrations** (what it can DO — search, calendar, email) — *"This is where it gets hands."*
3. **Run it live** with one input — show it complete a multi-step task ChatGPT just failed.

*"This is an Agent. We're building one of these together next session, from scratch, no code."*

### 1:46 – 1:53 — Build Sprint: One Prompt You'll Use Tomorrow (7 min)

→ Paste in chat:
> **FINAL EXERCISE — Your Prompt to Take Home (7 min):**
>
> Pick ONE task you do at work weekly. Write a prompt for it in ChatGPT or Claude.
>
> Use this template:
>
> ```
> ROLE: You are a [expert role].
> TASK: I need you to [specific task].
> CONTEXT: My situation is [brief background].
> CONSTRAINTS: Keep it [tone, length, format].
> OUTPUT: Give me [exact format you want].
> ```
>
> Examples:
> - **Doctor:** *"You are a senior physician. Summarize this 8-page discharge note into a 5-bullet handover for the next shift. Keep it clinical, no fluff."*
> - **Marketing:** *"You are an Instagram strategist. Write 3 caption variants for a new product launch — one professional, one playful, one urgency-driven. 200 char max each."*
> - **Finance/Consulting:** *"You are a senior analyst. Take this revenue table and write 5 bullet points explaining the variance to a non-finance executive. No jargon."*
>
> When you're happy with it — paste the **prompt** (not the answer) in chat.

→ Set a visible 6-min timer.

→ Read 3-4 prompts aloud as they come in. *"Sneha's prompt is excellent — see how she gave it a role AND a constraint? That's the discipline."*

> ⏱ **Time check: 1:53.** Close hard.

---

## BLOCK 7 — CLOSE (1:53 – 2:00)
**Goal:** Lock in the lesson. Tee up Session 2. Honor the parking lot.

### 1:53 – 1:55 — Synthesis (use reference slide 16 style)

*"Two minutes of recap. We covered:"*

→ Show 6 icons. Say each in 8 seconds:
1. **Evolution** — recipe book → master chef.
2. **Milestones** — 5 model families, each unlocking something.
3. **Mechanics** — tokens (LEGO), context (whiteboard), temperature (spiciness).
4. **Value Chain** — models → platforms → apps → outcomes.
5. **Limitations** — hallucination, static, no memory, no action.
6. **Chatbot ceiling** — brain in a jar, no hands.

*"**Every failure you saw today has a fix. That fix is called an Agent. That's Session 2.**"*

### 1:55 – 1:58 — Parking Lot Q&A

→ Open the Parking Lot Google Doc on screen.

→ Answer top 3 questions. Each in 45 sec or less. For longer ones: *"Great question — putting it in writing in the doc by tomorrow morning."*

### 1:58 – 2:00 — Reflection Prompt + Goodbye

→ Paste in chat:
> **Take with you:** Reply to today's class email with ONE process at your job that GenAI could improve, AND one place where its limitations would make it dangerous to deploy. 2 sentences each. I read every reply.

*"Thank you for these two hours. You showed up, you tried, you stayed engaged. See you for Session 2 — we're building an Agent. Bye."*

→ Stop recording. Wave. End the meeting.

---

# FACILITATOR CONTINGENCY GUIDE

## If a demo fails live

- **Hallucination demo doesn't hallucinate:** Have a **screenshot ready** of a previous fake-case answer. Show that. *"Yesterday it gave me this. Today it didn't. Models update — that's exactly why you should always verify."*
- **ChatGPT is down:** Pivot to Claude or Gemini. Have all three logged in.
- **Tokenizer site is down:** Have a slide with 3 pre-screenshotted tokenizer outputs as backup.
- **EdYoda demo fails:** Have a 60-second screen recording as backup. *"In the interest of time, here's the demo I recorded yesterday."*

## If no one responds in chat

- Count to 10 silently.
- Pivot to a poll. *"Type a number 1-5 in chat — how confident are you about [topic] right now?"*
- Cold-call **only** people who've already chatted. Never someone silent.

## If you're running over

- **At 0:25, if you're at 0:30:** Cut Exercise 1 readouts from 5 to 2. Move on.
- **At 0:55, if you're at 1:00:** Take the break anyway. Skip 5 min from Block 4 (cut the breakout, replace with a chat poll instead).
- **At 1:38, if you're at 1:45:** Cut the build sprint from 7 min to 4 min. Make it solo, no readouts. Send the workbook as homework.

## If you're running under

- Add Q&A after each block. Open the parking lot doc, answer 2 questions.

## If energy crashes after the break

- *"I can see this is dense. Stand up wherever you are. Stretch. Take 30 seconds."* Then continue.

## If someone is dominating the chat

- *"Love the energy [Name] — let's hear from a few others first."* Then call on someone who's typed once.

## If someone challenges you ("AI is overhyped" / "this is dangerous")

- *"You're absolutely right that there are real concerns. We're spending the back half on exactly those — limitations. Hold that thought, you'll see your point made on screen."*

---

# YOUR PRE-CLASS PRACTICE RECOMMENDATION

Do **one full dry run** alone, with a stopwatch, the night before. Don't skip it. The first 10 minutes especially — say them out loud, twice. The opening determines the rest.

Good luck. You've got this.
