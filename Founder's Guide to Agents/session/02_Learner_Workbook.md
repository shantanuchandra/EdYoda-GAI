# Founder's Guide to Agents — Workbook

**Build two working agents for your own startup ops — not your product — before lunch.**

By the end of today, you will have: a working Weekly Repo/Product Digest agent, a working Investor Qualification + Outreach agent, and a sketch of a third agent for your own biggest ops bottleneck.

One rule for today: **you will not leave with notes — you will leave with two agents actually running.**

---

## The Mental Model

Every future "should I build an agent for this" decision comes down to two questions:

| | **Low judgment required** | **High judgment required** |
|---|---|---|
| **Occasional task** | Just buy a tool off the shelf | Hire or consult someone |
| **Daily / high-frequency task** | **Build an agent** | Augment yourself with AI — don't automate it away |

Tasks migrate. Something that needs your judgment the first 20 times can become mechanical by the 21st — revisit this as you get faster at a task.

### The Agent vs. Prompt Test

A prompt with a costume on is not an agent. Real agents pass all three of these:

1. **Acts on live data** — not just what you typed, but something it pulls itself (your repo, a live web search, your inbox)
2. **Takes real action in another system** — sends the email, writes the file, updates the record. Doesn't just hand you text and stop.
3. **Doesn't wait for you to re-prompt it** — runs on a trigger: a schedule, a webhook, an event

If any one of these is missing, it's a smart prompt — useful, but not what we're building today.

---

## How Today Works

| Step | What you do | Time |
|---|---|---|
| **Frame** | Mental model + the agent-vs-prompt test | 35 min |
| **Build Agent 1** | Weekly Repo/Product Digest agent, on your own repo | 60 min |
| Break | | 15 min |
| **Build Agent 2** | Investor Qualification + Outreach agent, on your own round | 75 min |
| **Generalize** | Sketch your own next agent from your own bottleneck domain | 45 min |

---

## Build 1 — Weekly Repo/Product Digest Agent

**What it becomes:** an agent that reads your own GitHub repo's recent commits and writes a plain-language "what shipped this week" summary — useful for your own memory, a non-technical co-founder, or as raw material for an investor update.

Full step-by-step instructions are in your **Hermes Build Recipe, Part 1**. This page is your working notes.

### Your repo

```
Repo URL: _____________________________________________
```

*(No recent commits on your own repo? Ask your facilitator for the shared fallback demo repo — this is a rehearsal, not a test of how much you shipped this week.)*

### Your digest prompt draft

Write the instruction that turns raw commit data into a plain-language summary. Aim it at someone who doesn't read code.

```




```

### What actually came back

```




```

### One-line reflection

The moment I knew this was a real agent, not a prompt, was ____________________.

---

## Build 2 — Investor Qualification + Outreach Agent

**What it becomes:** an agent that takes a short description of your round, searches for matching investors, scores them, and drafts personalized outreach directly into your Gmail drafts — never sent automatically. You always read, validate, and send it yourself.

Full step-by-step instructions are in your **Hermes Build Recipe, Part 2**. This page is your working notes.

### Your round, in your own words

```
Stage:            _____________________________________________
Sector:           _____________________________________________
Geography:        _____________________________________________
Check size:       _____________________________________________
Anything else that matters for this specific round:
_____________________________________________
```

*(Pre-fundraise and not sure yet? Fill in your best guess for your next planned round — this is a rehearsal.)*

### If live search comes up thin or wrong for your round/sector

Switch to the **curated fallback investor list** in your Hermes Build Recipe, Part 2 appendix, and re-run scoring against that instead. This isn't a sign something broke — live web search doesn't cover every sector/geography evenly, and the fallback list exists for exactly this.

### What actually landed in your Gmail drafts

```




```

### One-line reflection

The one thing I'd edit before actually sending this draft is ____________________.

---

## Generalize — Your Next Agent

Same pattern, your own domain. You're not building this one today — you're sketching it.

**Your biggest ops bottleneck right now** *(from this morning's round-robin, or your pre-read diagnostic)*:

```
_____________________________________________
```

Sketch it using the same three questions that made Agent 1 and Agent 2 real agents, not prompts:

| Question | Your answer |
|---|---|
| **Trigger** — what starts it? (a schedule, a webhook, an event) | |
| **Live data** — what does it pull that you didn't type in yourself? | |
| **Action** — what does it actually do in another system, without you doing it by hand? | |

Browse the full **Agent Idea Catalog** (handed out separately — 51 real, sourced examples across sales, hiring, investor relations, marketing, product feedback, and finance) for a starting shape close to your own bottleneck.

---

## Reference — The Generic Pattern (steal this)

```
TRIGGER:      [schedule / webhook / event]
        ↓
LIVE DATA:    [what it pulls from a real system — repo, inbox, web, database]
        ↓
LLM REASONING: [what it figures out, drafts, or decides]
        ↓
ACTION:       [what it writes, sends, or updates in another system]
```

### Worked examples from today

**Agent 1:** New GitHub commits (trigger) → reads the diff (live data) → summarizes in plain language (LLM reasoning) → posts the digest (action)

**Agent 2:** Round description submitted (trigger) → web-searches matching investors (live data) → scores fit + drafts outreach (LLM reasoning) → creates a Gmail draft (action)

### If your agent fails on a step

1. Check the trigger actually fired — was the webhook/schedule/event real, or did you run it manually expecting it to auto-trigger?
2. Check the live-data step returned something — an empty result looks like a broken agent but is usually a data-source problem (thin repo activity, narrow search query)
3. Check the action step has the right permissions — most build failures are auth/token issues, not logic issues

---

## Your Week-After Tracker

Run your Repo Digest agent for real, on a real schedule, and actually read what it tells you. That's the whole test of whether today was worth your Saturday.

| Day | What I tried | What worked / didn't | Time saved |
|---|---|---|---|
| Mon | | | |
| Tue | | | |
| Wed | | | |
| Thu | | | |
| Fri | | | |

### End-of-week reflection

1. Which of the two agents did you actually keep running?
2. What broke, and did you fix it or abandon it?
3. What's the next ops bottleneck you'd point this pattern at?

---

## Lingering Questions

Space for anything you want to come back to.

- _____________________________________________
- _____________________________________________
- _____________________________________________
