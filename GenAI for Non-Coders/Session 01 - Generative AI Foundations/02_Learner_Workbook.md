# Generative AI for Non-Coders — Session 1 Workbook

**Welcome.** This is your workspace for the next 2 hours. Keep it open in a tab. We'll come back to it.

**Before we start — please confirm you have ALL THREE of these open in separate browser tabs:**

- [ ] **ChatGPT** → chat.openai.com (free account works)
- [ ] **Claude** → claude.ai (free account works)
- [ ] **Gemini** → gemini.google.com (free, sign in with Google)

**Bonus tab (we'll use it in Block 3):**

- [ ] **OpenAI Tokenizer** → platform.openai.com/tokenizer (no login needed)

---

## 🟢 OPENING WARM-UP (Block 0)

In the Zoom chat, type **ONE word** that describes your current feeling about AI right now.

> Skeptical · Excited · Confused · Scared · Hopeful · Curious · Tired · Other

*(There are no wrong answers. Type whatever's true.)*

---

## 📒 EXERCISE 1 — Your First Generative Output (Block 1, ~7 min)

**Goal:** Feel what "generation" means. The model isn't searching — it's creating.

**Steps:**

1. Open ChatGPT.
2. Copy-paste this prompt, replacing `[your role]`:

```
Write a 4-line poem about my job as a [your role]. 
Make it warm and slightly funny.
```

3. Read what comes back.
4. **Paste your favorite line in the Zoom chat.**

**Reflection (1 line):**

> _What surprised you about the output? ________________________________________________

---

## 📒 EXERCISE 2 — Model Speed Dating (Block 2, ~10 min)

**Goal:** Feel the difference between the three big consumer models.

**Steps:**

1. Have ChatGPT, Claude, and Gemini open in three separate tabs.
2. Copy-paste this **identical** prompt into all three (edit the role to match your job):

```
I'm a [marketing manager / finance analyst / doctor / your role]. 
Explain in 4 short bullet points why our quarterly revenue dipped 12%. 
Assume nothing about my business. 
Ask me 2 clarifying questions BEFORE answering.
```

*(If you're a doctor, swap the prompt to: "Summarize this patient complaint into a SOAP note format. Ask me 2 clarifying questions first." Make one up — "55yo F, c/o intermittent chest pain for 3 weeks, no radiation, worse with stress.")*

3. Compare the three responses. Which one:
   - Asked the smartest clarifying questions?
   - Gave the most useful structure?
   - You'd actually trust in a real meeting?

4. **Vote in the Zoom poll.**

**Your notes:**

| Model | What I liked | What was weak |
|---|---|---|
| **ChatGPT** | | |
| **Claude** | | |
| **Gemini** | | |

**Winner for THIS task:** _______________

> **Tip you can use tomorrow:** No single model is best at everything. Pick the model based on the job. Long documents → Claude. Google ecosystem → Gemini. General drafting → ChatGPT.

---

## 📒 EXERCISE 3 — Tokens, Context, Temperature (Block 3, ~13 min)

### Part A — Tokens (~4 min)

**Steps:**

1. Open **platform.openai.com/tokenizer** (no login).
2. Type each of these and write down the token count:

| Input | Token count |
|---|---|
| Your full name | _____ |
| The word "strawberry" | _____ |
| The word "antidisestablishmentarianism" | _____ |
| A 3-paragraph email you sent last week (paste it) | _____ |
| An emoji 🎉 | _____ |
| A Hindi/Tamil/Spanish word in its native script | _____ |

3. **Type your email's token count in the Zoom chat.**

**Aha moment:**

> Pricing for AI APIs is **per token**, not per word. 1,000 tokens ≈ 750 English words. Hindi/Chinese/Arabic words often use 3–5× more tokens than English. This matters when you're paying for AI at scale.

### Part B — Context Window (~3 min)

The **context window** is how much the model can remember in one conversation. Think of it as the model's **whiteboard**.

| Model | Context window | Roughly |
|---|---|---|
| GPT-4o | 128,000 tokens | ~300 pages |
| Claude Sonnet | 200,000 tokens | ~500 pages |
| Gemini 1.5 Pro | 2,000,000 tokens | ~5,000 pages |

**Quick reflection:**

> Have you ever had ChatGPT forget something you said earlier in the same chat? Type **YES** or **NO** in the Zoom chat.

That forgetting = whiteboard erased the oldest stuff to make room.

### Part C — Temperature (~6 min)

Temperature = **creativity dial**. 0 = boring/consistent. 1 = creative/varied. >1 = chaos.

**Steps:**

1. Open a **NEW** ChatGPT chat (don't reuse).
2. Ask: *"Give me 5 creative names for a wellness clinic in Mumbai."*
3. Copy the names.
4. Open **ANOTHER new** ChatGPT chat.
5. Ask the **EXACT same thing**.
6. Compare.

**What do you notice?**

> _______________________________________________

**Then try this — facts vs. creativity:**

7. New chat. Ask: *"What is 2 + 2?"* → answer.
8. Another new chat. Ask the same. → answer.

Notice: math answers don't vary. Creative tasks do. The model dials its own temperature based on the kind of question.

**Aha moment:**

> Low temperature = accountant brain (predictable, accurate, boring).
> High temperature = poet brain (creative, surprising, sometimes wrong).
> Pick the right brain for the job.

---

## ☕ BREAK (10 minutes — non-negotiable)

Stand up. Step away from the screen. Water. We come back at the time your facilitator announced.

---

## 📒 EXERCISE 4 — Reverse-Engineer the Stack (Block 4, ~8 min, in pairs)

**Goal:** When someone tries to sell you "AI," know what to ask.

The 4 layers of the GenAI stack:

```
┌─────────────────────────────────────────┐
│  LAYER 4: OUTCOMES (business value)     │  ← faster proposals, lower cost
├─────────────────────────────────────────┤
│  LAYER 3: APPLICATIONS (the tool)       │  ← Microsoft Copilot, Notion AI
├─────────────────────────────────────────┤
│  LAYER 2: PLATFORMS (the infra)         │  ← Azure OpenAI, AWS Bedrock
├─────────────────────────────────────────┤
│  LAYER 1: MODELS (the brain)            │  ← GPT-4, Claude, Gemini, Llama
└─────────────────────────────────────────┘
```

**In your breakout pair (6 min):**

1. Pick **ONE** tool from this list (or one you know):
   - Microsoft Copilot in Word/Excel
   - Notion AI
   - GitHub Copilot
   - Your bank's WhatsApp chatbot
   - Harvey AI (legal)
   - [Your own choice]

2. Together, answer:

| Layer | Your guess |
|---|---|
| **Model** behind it? | |
| **Platform** it runs on? | |
| **Application** layer features? | |
| **Outcome** for the business? | |

3. Use Google or ChatGPT to verify. Be ready to share when we come back.

---

## 📒 EXERCISE 5 — Watch the Limitations (Block 5, ~16 min, observation)

**You don't have to do anything. Just watch the demos and tick what you saw.**

| Limitation | What I saw | My example from work where this would be DANGEROUS |
|---|---|---|
| ☐ **Hallucination** (confident wrong answer) | | |
| ☐ **Static Knowledge** (doesn't know recent things) | | |
| ☐ **No Memory** (forgets between chats) | | |
| ☐ **No Action** (can't actually DO things) | | |

**For everyone, but especially the doctor / finance / consultant in the room:**

> Which of these 4 limitations would cost you the most if you didn't know about it?
>
> _________________________________

---

## 📒 EXERCISE 6 — The Bakery That Doesn't Work (Block 6, observation, ~4 min)

Watch the facilitator demo. Tick each task as it succeeds (✅) or fails (❌):

> *Prompt: "I run a small bakery in Mumbai. Help me launch a new product line — research trends, draft 3 Instagram posts, generate 3 images, schedule them across the week, email my partner, set a 30-day reminder."*

- [ ] Step 1: Research trending products
- [ ] Step 2: Draft Instagram posts
- [ ] Step 3: Generate images
- [ ] Step 4: Schedule the posts
- [ ] Step 5: Email the partner
- [ ] Step 6: Set the 30-day reminder

**The big takeaway:**

> A chatbot is a brain in a jar. It can think. It can write.
> It cannot browse, remember, schedule, send, or check.
>
> **An Agent is what you get when you give the brain hands, eyes, and a calendar.**

That's Session 2.

---

## 🏗 FINAL EXERCISE — Your Take-Home Prompt (Block 6, ~7 min)

**Goal:** Walk out of this class with **ONE prompt you'll use at work tomorrow.**

Pick ONE task you do at work every week. Write a prompt using this template:

```
ROLE:        You are a [expert role].
TASK:        I need you to [specific task].
CONTEXT:     My situation is [brief background — 1-2 sentences].
CONSTRAINTS: Keep it [tone, length, format, audience].
OUTPUT:      Give me [exact format you want — bullets, table, paragraphs].
```

### Inspiration by role:

**🩺 Doctor / Healthcare:**
```
ROLE:        You are a senior physician.
TASK:        Summarize this 8-page discharge note into a 5-bullet handover for the next shift.
CONTEXT:     This is for the night-shift resident covering 12 patients. They will skim, not read.
CONSTRAINTS: Clinical language, no fluff, no filler. Flag anything urgent in bold.
OUTPUT:      5 bullets max. Each bullet starts with patient initials + diagnosis.

[Paste discharge note here]
```

**📣 Marketing / Sales / Content:**
```
ROLE:        You are an Instagram strategist for an Indian D2C skincare brand.
TASK:        Write 3 caption variants for a new vitamin C serum launch.
CONTEXT:     Audience: women 25–40, urban, beauty-conscious, value ingredients over hype.
CONSTRAINTS: 200 characters max each. One professional, one playful, one urgency-driven.
OUTPUT:      A table — Variant | Caption | Best CTA emoji.
```

**📊 Finance / Consulting / Analyst:**
```
ROLE:        You are a senior consultant explaining variance to a non-finance executive.
TASK:        Take this revenue table and write 5 bullets explaining the Q3 dip.
CONTEXT:     The CEO has 4 minutes. They hate jargon. They want the "so what."
CONSTRAINTS: No words like "EBITDA" or "YoY." Use plain English. Each bullet ≤ 15 words.
OUTPUT:      5 bullets, ranked by business impact.

[Paste revenue table here]
```

### Your prompt:

```
ROLE:
TASK:
CONTEXT:
CONSTRAINTS:
OUTPUT:
```

**When you're happy with it — paste your PROMPT (not the answer) in the Zoom chat.**

---

## 🔮 PREVIEW OF SESSION 2

Today: You saw a chatbot **fail** at a 6-step bakery task.

Next session: **You'll build the Agent that succeeds at it.** No code. In EdYoda Agent Builder. Live, with your hands on the keyboard.

---

## 📩 HOMEWORK (one reply, 4 sentences total)

Reply to today's class email with:

1. **ONE process at your job** that GenAI could improve today. (2 sentences)
2. **ONE place** where its limitations would make it dangerous to deploy without guardrails. (2 sentences)

Your facilitator reads every reply.

---

## 🧰 CHEAT SHEET — KEEP THIS

### The 4 Analogies to Remember

| Concept | Analogy |
|---|---|
| **Rule-based AI vs. Generative AI** | Recipe book vs. master chef |
| **Tokens** | LEGO bricks of language |
| **Context Window** | The model's whiteboard |
| **Temperature** | The creativity / spiciness dial |

### The 4 Limitations of a Single LLM Call

| Limitation | What it means | When it bites |
|---|---|---|
| **Hallucination** | Confident wrong answer | Citations, names, numbers, dates |
| **Static Knowledge** | Doesn't know recent things | Current events, new policies |
| **No Memory** | Forgets between chats | Long projects, repeated clients |
| **No Action** | Can't DO anything | Booking, sending, scheduling, checking |

### Model Picking Guide

| If you need… | Use |
|---|---|
| General drafting, brainstorming | ChatGPT |
| Long documents, nuanced analysis | Claude |
| Google Workspace integration | Gemini |
| Run on your own servers (compliance) | Llama |
| Marketing visuals | DALL·E, Midjourney |

### The Prompt Template (steal this)

```
ROLE:        You are a [expert].
TASK:        [Specific verb + object].
CONTEXT:     [1-2 sentences of background].
CONSTRAINTS: [Tone, length, audience, format].
OUTPUT:      [Exact shape you want].
```

### Free Tools You Used Today

- **chat.openai.com** — ChatGPT
- **claude.ai** — Claude
- **gemini.google.com** — Gemini
- **platform.openai.com/tokenizer** — See tokens visually

---

*See you in Session 2.*
