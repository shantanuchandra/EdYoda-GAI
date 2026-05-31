# Generative AI for Non-Coders — Session 5 Workbook

**Agent Architecture: How Agents Think, Remember & Act**

---

## Read this first

This workbook is built so you can complete the entire session **on your own** — whether you're in the live class or working through it afterward. Every exercise spells out exactly what to click, what you'll see, what a *good* result looks like, and what to do if something goes wrong. You will not need anyone to demonstrate it for you.

By the end, you'll have a finished **Agent Architecture Card** — three sections that together form the blueprint for any AI agent you'd want to deploy at work:

1. **Loop Trace** — how an agent reasons, stage by stage
2. **Tool Manifest** — what the agent is allowed to do, and what it's forbidden to do
3. **Pattern Choice** — whether you need one agent or several, and how they coordinate

You'll fill each section using a real AI tool (Claude), with the exact prompts provided. Keep this card. In Session 6 you'll turn it into a live, hosted agent.

**The one idea behind today:** You came into this course knowing what agents can *do*. Today you learn how they *work* — so you can design, diagnose, and improve them yourself.

---

## What you need open before you start

You need **one** thing open in your browser:

- **Claude** — either:
  - **(Preferred)** Your **Lumière Knowledge Agent** from Session 4. This is the Claude Project you built last session, with `Lumiere_KB.md` uploaded to its knowledge. Go to [claude.ai](https://claude.ai) → click **Projects** in the left sidebar → open the project named *"Lumière Knowledge Agent."*
  - **(If you don't have it)** A **fresh Claude chat** with `Lumiere_KB.md` attached. Open [claude.ai](https://claude.ai), start a new chat, click the **paperclip icon** in the message box, and upload `Lumiere_KB.md` (download link is in your calendar invite). Every exercise works exactly the same this way.

That's the only tool. No new software, no sign-ups. If you completed Session 4, you already have everything.

---

## How the session flows

| Part | What happens | Your job |
|---|---|---|
| **Opening** | We recap the whole course and name a famous bug from Session 2 | Read along — page 4 |
| **Concepts 1–3** | Anatomy, the reasoning loop, memory types | Read along — pages 5–7 |
| **Exercise A** | Trace your agent's reasoning loop | **Hands-on** — page 8 |
| **Break** | 10 minutes | Step away |
| **Concepts 4–5** | Tools, planning strategies | Read along — pages 11–12 |
| **Exercise B** | Design your agent's tool manifest | **Hands-on** — page 13 |
| **Concept 6** | Multi-agent patterns | Read along — page 15 |
| **Exercise C** | Choose your agent's pattern | **Hands-on** — page 16 |
| **Close** | Your Architecture Card is complete | Review — page 17 |

The three **hands-on exercises** are the heart of the session. The concept sections give you the vocabulary you need for each exercise. If you're short on time, the exercises are what you must not skip.

---

## The Course Story So Far

Five sessions in. Here's the whole arc — each session made a promise, and you built something that proved it.

| Session | What we promised | What you built |
|---|---|---|
| **S1** | LLMs can generate text — but they can't *act* | You watched a chatbot try to plan a bakery campaign and fail 4 of its 6 steps |
| **S2** | An agent can do what a chatbot can't | You built the **HR Candidate Screener** — a 3-step pipeline that searched for candidates, extracted the top skills for a role, and scored applicants |
| **S3** | The right prompt makes an agent reliable | You wrote system prompts that controlled an agent's tone, output format, and when it should refuse |
| **S4** | Ground the agent in your own documents | You built the **Lumière Knowledge Agent** — it answered from the bakery's real documents, cited its sources, and refused to guess when the answer wasn't there |
| **S5 — today** | **Open the hood — understand WHY agents work, break, and scale** | **Your Agent Architecture Card** |

**The bug we're going to explain today:** Remember the HR Candidate Screener from Session 2? When its first step (searching for candidate profiles) came back empty, the agent **invented LinkedIn URLs that didn't exist.** It made them up.

That wasn't a flaw in the AI model. It was a flaw in the *architecture* — a missing piece in how the agent was built. By the end of today, you'll know exactly which piece was missing, why that caused the hallucination, and how you'd build it correctly. That's the difference between someone who *uses* agents and someone who can *design* them.

---

## Concept 1 — Anatomy: The Five Components

Every AI agent — no matter how simple or complex — is made of the same five parts. Learn these five and you can take apart any agent you ever meet.

| Component | Plain-English meaning | If you remove it… |
|---|---|---|
| **LLM** | The brain. The AI model that reads, reasons, and decides. | Nothing works — there's no thinking at all. |
| **Memory** | What the agent knows or can recall. | It forgets everything between sessions — or, worse, **invents** facts to fill gaps. |
| **Tools** | What the agent can *do* — search, send email, query a database. | It can only talk. It can describe sending an email but can't actually send one. |
| **Planner** | How the agent decides what to do, and in what order. | It freezes on anything that takes more than one step. |
| **Executor** | The part that actually runs the plan. | Plans get made but never carried out. |

**Why the HR Screener broke:** map its five parts and one is empty.

| Component | What the HR Screener had |
|---|---|
| LLM | Claude (the AI model running each step) ✅ |
| **Memory** | **Nothing.** No memory was configured. ❌ ← **this is the bug** |
| Tools | Web search (used in step 1 to find candidates) ✅ |
| Planner | The 3-step sequence you designed ✅ |
| Executor | The Agent Builder's pipeline runner ✅ |

When the search step came back empty, the agent had **no memory** in which to note *"I searched, found nothing, so I should stop or say so."* With nothing to record that fact, it did what a model with no grounding does — it filled the empty space with plausible-looking but fake LinkedIn URLs.

> **Remember this line:** *An agent without memory is a brilliant expert who forgets every conversation the moment it ends — and bluffs to cover the gap.*

---

## Concept 2 — The Reasoning Loop

A chatbot answers once and stops. An **agent loops** — it keeps cycling through six stages until its goal is met. This loop is what lets an agent recover from things going wrong.

**The six stages:**

1. **Perceive** — take in the input (a question, a scheduled trigger, an alert)
2. **Reason** — interpret it, using memory, tools, and the goal
3. **Plan** — decide the sequence of actions
4. **Act** — do the first action (call a tool, send a message, write to a database)
5. **Observe** — see what came back (success, failure, partial result)
6. **Reflect** — ask "did that meet the goal?" If not, loop back to Reason and try again

> **Remember this line:** *A great consultant doesn't give up when their first phone call fails — they try the next contact. The loop is that instinct, built into the agent.*

**Worked example — an overdue-invoice agent recovers from a bounced email:**

| Stage | What the agent does |
|---|---|
| Perceive | A scheduled trigger fires at 8 a.m.: "run the daily overdue-invoice check" |
| Reason | "I need the list of overdue invoices." |
| Plan | 1. Pull the overdue list. 2. Draft a reminder. 3. Send to each. |
| Act | Sends 14 reminder emails |
| Observe | 13 delivered ✅ — but 1 **bounced** ❌ (the email on file was out of date) |
| Reflect | "Goal not met for that one invoice. I'll find a better contact." → **loops back** |
| Plan (v2) | Look up a current contact in the CRM |
| Act (v2) | Resend to the new address |
| Observe | 14 of 14 delivered ✅ — goal achieved |

The bounce didn't crash the agent or make it apologise and quit. It **observed** the failure, **reflected**, **replanned**, and finished the job.

**Now compare the HR Screener:**

| Stage | What the HR Screener did |
|---|---|
| Perceive | Received the job parameters (title, location, experience) |
| Reason | "I need 5 candidate profiles." |
| Plan | Run a web search |
| Act | Ran the search — but it came back **empty** |
| Observe | No valid profiles found |
| **Reflect** | **(nothing) ❌** — there was no Reflect step, so no recovery. It filled the gap with invented URLs. |

The loop existed on paper, but with **no Reflect stage**, the agent couldn't catch its own failure. That's the architectural gap.

**One more rule — when should a loop STOP?** An agent that loops forever burns money and never finishes. Every agent needs **three exit conditions**, and it needs all three:

- **Goal achieved** — the task is done, stop
- **Max iterations reached** — "I've tried 5 times, stop and report"
- **Human escalation** — "this is stuck or risky, hand it to a person"

The HR Screener had none of these. When the search failed, it didn't know to stop, retry a fixed number of times, or escalate. So it guessed.

---

## Concept 3 — The Four Types of Memory

"Memory" isn't one thing. Agents can have four different kinds, and each solves a different problem. The analogy that makes them stick: **an office worker's desk, notebook, archive, and library.**

| Type | Analogy | Where it lives | What it's for | Everyday example |
|---|---|---|---|---|
| **Short-term** | The **desk** | The current chat window | Holding what's happening right now | Remembering what you said three messages ago in this conversation |
| **Long-term** | The **notebook** | A database that persists | Remembering across sessions | Knowing you're a returning customer next week |
| **Episodic** | The **archive** | A log of past events | Learning from what happened before | "Last Tuesday this search returned nothing" |
| **Semantic** | The **library** | A vector database of documents | Answering from a body of knowledge | Looking up Lumière's cake lead times — **this is what you built in S4** |

**The two agents, side by side:**

- **HR Candidate Screener (S2):** had the *desk* (short-term) only. It was **missing the archive (episodic memory)** — so it had no place to record "the search came back empty." With no record of the failure, it invented data.
- **Lumière Knowledge Agent (S4):** had the *library* (semantic memory — the documents you uploaded). It's **missing the archive and the notebook** — so it answers "what's the lead time for an eggless cake?" perfectly, but it cannot answer "what did we discuss last week?" It knows Lumière's policies; it forgets every conversation.

> **Remember this line:** *Every office has a desk, a notebook, an archive, and a library. Agents do too — they just don't come with all four installed. You decide which ones to add.*

---

## Exercise A — Loop Trace (≈13 minutes)

### WHAT you're doing
You'll ask your Lumière agent a question that has three parts, then make it show its reasoning **one stage at a time** — and you'll record those stages on the Loop Trace sheet below.

### WHY it matters
Right now, an agent's reasoning is invisible to you — it just produces an answer. The skill you're building here is **reading an agent's mind**: seeing it Perceive, Reason, Plan, Act, Observe, and Reflect. Once you can do that, you can diagnose *why* any agent fails and *how* to improve it. This is the single most useful diagnostic skill in agent design.

### HOW — follow these steps exactly

**Step 1 — Open your agent.**
Go to [claude.ai](https://claude.ai). In the left sidebar click **Projects**, then open **"Lumière Knowledge Agent."**
*(No project? Open a fresh chat and attach `Lumiere_KB.md` with the paperclip icon. Then continue exactly as below.)*

**Step 2 — Copy this instruction block into the message box. Do NOT send yet.**
This instruction tells the agent to expose each stage of its loop. It must go *above* your question so it shapes the whole answer.

```
Before answering, trace your own reasoning step by step. Label each stage:
PERCEIVE — what information did you receive?
REASON — what did you interpret from it?
PLAN — what sequence will you follow to answer?
ACT — what did you retrieve from your knowledge?
OBSERVE — what did the results tell you?
REFLECT — what would you do if one part of the answer was missing?
```

**Step 3 — On the next line in the same message, paste this question. Now send.**

```
A customer wants a 2kg eggless chocolate cake for this Saturday. They also
want to know whether the 15% discount code applies to eggless cakes. And
they want to know if the Andheri West branch delivers to their area.
What is the full answer?
```

**Step 4 — Read the response carefully.** You should see the agent's answer broken into the six labelled stages (PERCEIVE, REASON, and so on). Fill in the sheet below using the agent's own words for each stage.

### What a GOOD result looks like
- The answer is split into the six labelled stages.
- **ACT** names a real section of the document (e.g. *"Custom & Celebration Orders — Lead Times"*).
- **OBSERVE** notes whether all three parts of the question were answerable from the document.
- The agent correctly handles all three asks: 48-hour lead time for the eggless cake, confirms the discount applies to eggless cakes (if ordered 3+ days ahead), and answers the Andheri delivery question.

### If it doesn't work
- **The answer isn't split into stages** → your instruction landed *below* the question, or after you'd already sent the question. Start a fresh message with the instruction block on top.
- **Only PERCEIVE and REASON appear, then it stops** → add the line *"Be thorough — fill in all six stages, even briefly."* and resend.
- **The agent says it has no document / can't find Lumière info** → your Project doesn't have `Lumiere_KB.md` in its knowledge, or you're in a plain chat without the file attached. Fix that and resend.

---

### Loop Trace Sheet — Section 1 of your Architecture Card

Write the agent's own words for each stage. If a stage is missing from the response, write **"not visible — add to prompt."**

**PERCEIVE** — what information did the agent receive?

_______________________________________________________________

_______________________________________________________________

**REASON** — what did it interpret from the input?

_______________________________________________________________

_______________________________________________________________

**PLAN** — what sequence did it follow?

_______________________________________________________________

_______________________________________________________________

**ACT** — what did it retrieve? (write the section name it cited)

_______________________________________________________________

_______________________________________________________________

**OBSERVE** — what did the results tell it? Did it cover all three asks?

_______________________________________________________________

_______________________________________________________________

**REFLECT** — what would it do if one part of the answer were missing?

_______________________________________________________________

_______________________________________________________________

**Your diagnosis:** Which stage was missing or thinnest in the response?

_______________________________________________________________

> Most agents handle Perceive through Act well, but go thin or blank on **Reflect** — exactly the gap that made the HR Screener hallucinate. If yours did too, you've just diagnosed a real architectural weakness. The fix: add an explicit reflect-and-recover instruction (you'll see how on the next page).

**✅ Loop Trace done — that's Section 1 of your Architecture Card.**

---

## Break — 10 minutes

Step away from the screen. Cameras and mics off. Come back at the time on the clock.

When you return, we give the agent *hands* (tools) and a *strategy* for thinking.

---

## Concept 4 — Tools: The Agent's Hands

If the LLM is the brain, **tools are the hands.** The brain decides *which* hand to use; the executor actually moves it. Tools come in four families:

| Family | What it does | Examples |
|---|---|---|
| **Information** | Reads, searches, looks things up | Web search · database query · document reader · calendar reader |
| **Action** | Changes something in the world | Email sender · CRM updater · form submitter · code runner |
| **Communication** | Tells people things | Slack message · Teams post · webhook · notification |
| **Computation** | Crunches numbers / transforms data | Calculator · data transformer · spreadsheet processor |

**The most important idea here: scope and permission.** A tool isn't just "on" or "off" — it has a *boundary* (what it can touch) and a *permission level* (what it can do). This is the governance layer, and it's where most real-world agent risk lives.

Here's a real **tool manifest** for a recruitment agent. Notice that every single tool has an explicit limit:

| Tool | What it does | Scope (its limit) | Permission |
|---|---|---|---|
| Resume Reader | Reads candidate CVs | Only uploaded files | Read-only |
| Calendar API | Books interviews | Only the recruiter's calendar — not company-wide | Read + write |
| Email Sender | Contacts candidates | Approved templates only — no free text | Send (templated) |
| ATS Writer | Logs interview stages | Candidate records only — every write logged | Write (audited) |
| Slack Notifier | Flags hiring managers | The #hiring-ops channel only — no DMs | Post (templated) |

> **Remember this line:** *A tool manifest is the employment contract for each of the agent's hands. If you can't say in one sentence what a tool is NOT allowed to do, you haven't scoped it.*

**Why this matters more than it sounds:** the reasoning loop can recover from picking the *wrong* tool (Observe the error → Reflect → try the right one). But it **cannot** undo a *correctly-run tool with a too-broad scope.* If you give an agent "delete any record" permission and it deletes the wrong one, the loop can't help — the damage is done. Scope first, then trust.

---

## Concept 5 — Planning: Three Ways an Agent Thinks

Give an agent the same task and it can think it through three different ways. Picking the right one is half of good design.

| Strategy | How it works | Best for | Example |
|---|---|---|---|
| **ReAct** (Reason + Act) | Think → do something → see the result → think again. Improvises with live information. | Tasks that need fresh, external data | Researching a market by searching, checking a CRM, then pulling finance data — adjusting as each result comes in |
| **Chain-of-Thought** | A pure step-by-step reasoning chain. No tools — just careful thinking. | Complex analysis where the facts are already known | Scoring 3 vendor proposals against 6 criteria and recommending one |
| **Self-Reflection** | Draft → critique its own draft → redraft → repeat until good enough | High-stakes writing that must be right | Drafting a contract clause, critiquing it for weak spots, tightening it |

**How to choose — ask three questions:**

1. **How complex is the task?** Simple lookup → Chain-of-Thought. Needs live data from several places → ReAct. Open-ended and high-stakes → Self-Reflection.
2. **Does it need live tools?** Yes → ReAct. No, it's internal reasoning → Chain-of-Thought or Self-Reflection.
3. **How high are the stakes on the output?** Board-ready deliverable → Self-Reflection. Internal analysis → Chain-of-Thought. Speed matters most → ReAct.

> **Remember this line:** *You don't memorise the strategy names. You answer three questions and the right strategy picks itself.*

---

## Exercise B — Tool Manifest (≈17 minutes)

### WHAT you're doing
You'll design a 5-tool manifest for a real AI agent you'd want at your own job — naming each tool, scoping it tightly, and setting its minimum permission.

### WHY it matters
Almost every agent that fails in the real world fails for one of two reasons: it has no tools (so it can't do anything useful), or it has tools with no limits (so it does something dangerous). The manifest is the document that prevents both. Writing one *before* you build forces the governance conversation that most teams only have *after* something breaks. This is the artifact you'd hand to your manager or your security team to answer: *"what can this agent do, and what can't it?"*

### HOW — follow these steps exactly

**Step 1 — Pick a real agent.**
Think of one repetitive task at your job that involves *looking something up* and then *sending, filing, or updating something.* That's your agent. Examples by role:
- *Sales:* researches a prospect, drafts a personalised outreach email, logs it in the CRM
- *Finance:* pulls month-end numbers, flags anomalies, drafts the summary
- *HR:* screens applicants against a role, schedules interviews, notifies the hiring manager
- *Support:* reads a ticket, finds the answer in the help docs, drafts a reply
- *Marketing:* monitors brand mentions, drafts responses, posts approved ones

Write your agent's job in one sentence in the box below.

**Step 2 — Generate a first draft.**
Open a fresh Claude chat (or use your Lumière project — either works). Paste this prompt, replacing the bracket with your one-sentence job:

```
I want to design an AI agent that [describe the job in one sentence].
List 5 tools it would need.
For each tool, give me:
- A name
- What it does, in one sentence
- The narrowest possible scope — what it must NOT be able to access
- The minimum permission level: read / read+write / send / execute
- What would break if this tool were removed
```

**Step 3 — Tighten it.**
Claude's first draft will almost always be too generous — scopes too broad, permissions too high. Edit it into the table below, and for each tool ask: *"Could I narrow this further? Does it really need write access, or just read?"* Narrow everything to the minimum.

**Step 4 — Find your nervous tool.**
Circle the one tool that would worry you most if it misfired. It's almost always a *send* or *execute* tool. That's the tool that needs a human approval gate.

### What a GOOD manifest looks like
- Every **scope** says what the tool *cannot* touch, in plain words (not "access to the CRM" but "read-only access to this rep's own pipeline — not other reps', not financials").
- Every **permission** is the *minimum* — read-only wherever the tool only needs to look something up.
- You can point to one tool and say in a sentence why it makes you nervous.

### If your draft is too vague
Paste this follow-up to Claude:
```
For each tool, narrow the scope to ONE sentence describing what it cannot
access. Set every permission to the lowest level that still lets the tool
do its job. If you wrote "full access" anywhere, replace it — that's not a
scope, it's a blank cheque.
```

---

### Tool Manifest — Section 2 of your Architecture Card

**My agent's job (one sentence):**

_______________________________________________________________

| # | Tool name | What it does | Scope — what it CANNOT touch | Permission | What breaks if removed |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

**My nervous tool (circle it above) is:** ___________________________

**Why it makes me nervous:** ________________________________________

**How I'd make it safer** (tighter scope, or a human approval gate before it runs):

_______________________________________________________________

**✅ Tool Manifest done — that's Section 2 of your Architecture Card.**

---

## Concept 6 — Multi-Agent Patterns

Sometimes one agent isn't enough. When a job is too big or too varied for a single agent, you split it across several. There are three ways to do that.

| Pattern | The picture | Analogy | Best for |
|---|---|---|---|
| **Orchestrator-Worker** | One "manager" agent hands sub-tasks to specialist workers, then combines their results | A project manager delegating to a team | Complex jobs where each part needs different expertise |
| **Parallel Agents** | A big batch is split into chunks, each agent takes a chunk, results are merged | Several analysts splitting one big pile of work | Lots of independent items where speed matters (e.g. 500 résumés at once) |
| **Specialist Handoffs** | Each agent does one stage, then passes the work to the next | A relay race — each runner runs one leg | A job with distinct sequential phases, each needing a different skill |

**You've already built one of these.** The HR Candidate Screener from Session 2 was a **Specialist Handoffs** pattern:

> **Step 1** (search for candidates) → **Step 2** (extract the top skills for the role) → **Step 3** (score the candidates).

Three specialists, in sequence, each handing its output to the next. You built a multi-agent architecture in Session 2 — you just didn't have the name for it. Now you do.

**How to choose:** ask one question — *would my agent get faster with several agents running in parallel, or more reliable with one agent checking another's work?* Faster → Parallel. More reliable / different skills per stage → Orchestrator or Handoffs.

> **Remember this line:** *Orchestrator-Worker is the manager. Parallel Agents is the assembly line. Specialist Handoffs is the relay race.*

---

## Exercise C — Pattern Choice (≈8 minutes)

### WHAT you're doing
You'll decide which multi-agent pattern fits the agent you designed in Exercise B, and write one sentence defending the choice.

### WHY it matters
Pattern choice is the first architectural decision — and the one most often skipped. Skip it and you end up with one overloaded agent trying to do everything (and breaking on the hard parts), or a sprawl of agents with no clear owner. Naming the pattern forces you to be clear about what each piece does, what it hands off, and where a human steps in.

### HOW — follow these steps exactly

**Step 1 — Ask Claude.** In any Claude chat, paste this prompt, using the same agent job from Exercise B:

```
I want to build an AI agent that [describe the same job as Exercise B].
Which of these three patterns fits best — Orchestrator-Worker,
Parallel Agents, or Specialist Handoffs — and why?
Walk me through the reasoning.
Then tell me: what would break if I used the wrong pattern?
```

**Step 2 — Decide for yourself.** Read Claude's recommendation. You know your job better than it does — agree or push back. Then write your final answer below.

### What a GOOD answer looks like
- You can name the pattern *and* the reason in one sentence each.
- You've named a concrete risk of the *wrong* pattern (e.g. "if I used Parallel for this, the steps depend on each other, so they'd collide").
- If you disagreed with Claude, you can say why — that means you understand your use case better than the model's first guess, which is exactly right.

---

### Pattern Choice — Section 3 of your Architecture Card

**I'm using this pattern:** _______________________________________

**Because:** ___________________________________________________

_______________________________________________________________

**The risk if I used the wrong pattern:** ____________________________

_______________________________________________________________

**✅ Pattern Choice done — that's Section 3 of your Architecture Card.**

---

## Your Agent Architecture Card — Complete

You now hold a complete blueprint. Three sections, all filled in by you, all reusable:

| Section | What you produced | What it gives you |
|---|---|---|
| **1 — Loop Trace** | The six reasoning stages of a real agent, with the weak stage identified | The skill to diagnose why any agent fails |
| **2 — Tool Manifest** | 5 tools, each scoped and permissioned, with the risky one flagged | The governance document for any agent you deploy |
| **3 — Pattern Choice** | One agent vs. several, and how they coordinate | The first architecture decision, made and defended |

**This is not a classroom exercise.** It's the blueprint for an agent you could actually build — for your job, not for a demo.

---

## Quick Reference — keep these handy

**The five components:** LLM (brain) · Memory (what it knows) · Tools (what it can do) · Planner (what it decides) · Executor (what runs the plan).

**The six loop stages:** Perceive → Reason → Plan → Act → Observe → Reflect → (repeat until done).

**The three loop exit conditions (need all three):** goal achieved · max iterations reached · human escalation.

**The four memory types:** Short-term (desk) · Long-term (notebook) · Episodic (archive) · Semantic (library).

**The three planning strategies:** ReAct (live data) · Chain-of-Thought (internal analysis) · Self-Reflection (high-stakes writing).

**The three multi-agent patterns:** Orchestrator-Worker (manager) · Parallel Agents (assembly line) · Specialist Handoffs (relay race).

---

## Take-Home (reply to the class email by Friday)

Two sentences each:

1. Which of the five architecture components was missing from the S2 HR Candidate Screener — and what specifically broke because of it?
2. Which one tool in your manifest would you put a human approval gate on — and what exactly would trigger that human to step in?

---

## What's Next — Session 6: EdYoda Agent Builder — Build & Host Your First Agent

Next session, your Architecture Card stops being paper and becomes a live, hosted agent. In the EdYoda Agent Builder you'll:
- turn your **Loop Trace** into the agent's system prompt and step sequence,
- turn your **Tool Manifest** into the agent's configured tools and knowledge,
- and use your **Pattern Choice** to decide whether you build one agent or a multi-step pipeline.

**Bring this completed workbook.** Every section maps to something you'll set up in the Builder. See you there.

---

*Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu*
*EdYoda · GenAI & AI Agents for Non-Coders · S05*
