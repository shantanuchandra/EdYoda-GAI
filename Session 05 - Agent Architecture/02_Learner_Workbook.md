# Generative AI for Non-Coders — Session 5 Workbook

**Agent Architecture: How Agents Think, Remember & Act**

Welcome back. Last session you gave your agent a brain. Today you open it up.

By the end of these two hours, you will have completed your **Agent Architecture Card** — three sections that together form the blueprint for any agent you want to deploy at work.

One rule for today: **You came in knowing what agents can do. You leave knowing how they work.**

---

## Pre-Class Checklist

Before we start — open these in separate browser tabs:

- [ ] **Claude Projects** — your Lumière Knowledge Agent from Session 4, open and ready
- [ ] **This workbook** — open to Exercise A

No Lumière agent? Open a fresh Claude chat and attach `Lumiere_KB.md` with the paperclip. Every exercise works identically.

---

## How This Workbook Works

Three exercises build one artifact — your Agent Architecture Card.

| Exercise | What you do | Time |
|---|---|---|
| **Exercise A** | Trace an agent's reasoning loop — 6 stages | ~13 min |
| **Exercise B** | Design a tool manifest for your own agent | ~17 min |
| **Exercise C** | Choose and defend a multi-agent pattern | ~8 min |

When the facilitator calls an exercise by letter, find that letter below.

---

## The Course Story So Far

| Session | What we promised | What you built |
|---|---|---|
| S1 | LLMs can generate — but they can't act | Watched the bakery campaign fail 4 of 6 steps |
| S2 | An agent can do what a chatbot can't | HR Candidate Screener: search → skills → score |
| S3 | The right prompt makes an agent reliable | System prompts for tone, format, and refusal |
| S4 | Ground the agent in your own documents | Lumière Knowledge Agent — cited sources, refused gaps |
| **S5** | **Open the hood — understand WHY they work, break, and scale** | **Your Agent Architecture Card** |

---

## Quick Reference — The Five Components

Every agent is five parts. Remove any one — something specific breaks.

| Component | What it is | What breaks if missing |
|---|---|---|
| **LLM** | The brain — reasons and decides | No reasoning at all |
| **Memory** | What it knows | Forgets every session — or worse, invents |
| **Tools** | What it can do | Can only talk — cannot act |
| **Planner** | What to do in what order | Stuck on complex tasks |
| **Executor** | Runs the plan | Plans that never execute |

*The HR Screener from Session 2 was missing: **Memory** (episodic). That's why it invented LinkedIn URLs when Node 1 returned empty results.*

---

## Quick Reference — The Four Memory Types

| Type | Analogy | Storage | Use case |
|---|---|---|---|
| **Short-term** | The desk | Prompt window | Multi-turn chat, mid-task context |
| **Long-term** | The notebook | Database (SQL/NoSQL) | Personalization, customer history |
| **Episodic** | The archive | Log store / summaries | Audit trails, learning from failures |
| **Semantic** | The library | Vector database | Accurate answers from a knowledge base |

*The Lumière Knowledge Agent from Session 4 has Semantic memory (the RAG Docs tab). It has no Episodic memory — it can't tell you what you discussed last week.*

---

## Quick Reference — The Three Planning Strategies

| Strategy | How it thinks | Best for |
|---|---|---|
| **ReAct** | Reason → Act → Observe → repeat | Tool-heavy tasks, live data needed |
| **Chain-of-Thought** | Step 1 → Step 2 → Conclusion | Complex analysis, no tools needed |
| **Self-Reflection** | Draft → Critique → Redraft | High-stakes outputs, must be right |

**Three questions to pick the right strategy:**
1. *Task complexity:* simple lookup → CoT · multi-source live data → ReAct · open-ended high-stakes → Reflection
2. *Tool dependency:* needs live tools → ReAct · internal reasoning only → CoT or Reflection
3. *Output quality:* high-stakes deliverable → Reflection · internal analysis → CoT · speed matters → ReAct

---

## Exercise A — Loop Trace

**WHAT:** Run a multi-constraint question against your Lumière Knowledge Agent. Make the reasoning loop visible. Fill in the 6-box Loop Trace Sheet.

**WHY:** Most people treat agents as black boxes. The moment you can trace an agent's reasoning — "it perceived X, reasoned Y, planned Z" — you can diagnose any failure and improve any design. This is what separates an agent user from an agent designer.

**HOW:**

**Step 1** — Open your Lumière Knowledge Agent in Claude Projects.

**Step 2** — Add this instruction ABOVE your question (copy it exactly — this makes the loop visible):

```
Before answering, trace your own reasoning step by step. Label each stage:
PERCEIVE — what information did you receive?
REASON — what did you interpret from it?
PLAN — what sequence will you follow to answer?
ACT — what did you retrieve from your knowledge?
OBSERVE — what did the results tell you?
REFLECT — what would you do if one part of the answer was missing?
```

**Step 3** — Then ask this question (copy it exactly):

```
A customer wants a 2kg eggless chocolate cake for this Saturday. They also
want to know whether the 15% discount code applies to eggless cakes. And
they want to know if the Andheri West branch delivers to their area.
What is the full answer?
```

**Step 4** — Read the response carefully. Fill in the Loop Trace below. If a stage is missing from the output, write: *"not visible — add to prompt."*

**Step 5** — One reflection question: Which stage did the agent skip or compress? What would break if you asked a harder version of this question?

---

### Loop Trace Sheet — Section 1 of Your Architecture Card

**PERCEIVE** — What information did the agent receive?

_______________________________________________________________

_______________________________________________________________

---

**REASON** — What did it interpret from the input?

_______________________________________________________________

_______________________________________________________________

---

**PLAN** — What sequence did it follow?

_______________________________________________________________

_______________________________________________________________

---

**ACT** — What did it retrieve? (Paste the source line if it cited one)

_______________________________________________________________

_______________________________________________________________

---

**OBSERVE** — What did the results tell it?

_______________________________________________________________

_______________________________________________________________

---

**REFLECT** — What would it do if one part of the answer was missing?

_______________________________________________________________

_______________________________________________________________

---

**Reflection:** Which stage was missing or most compressed? What would break on a harder question?

_______________________________________________________________

_______________________________________________________________

---

*Loop Trace complete → this is Section 1 of your Agent Architecture Card.*

---

## Exercise B — Tool Manifest

**WHAT:** Design a 5-row Tool Manifest for a real agent you want to deploy at your job. Every row is a governance decision.

**WHY:** Every agent deployed without a tool manifest either does too little (no tools) or too much (no boundaries). The manifest is the contract between your agent and your organization — the document that answers "what can this agent do, and what can it not do?" Most teams only write this after something breaks. You're writing it first.

**HOW:**

**Step 1** — Think of a real agent you'd want at work. Not a demo. A real one — customer support, contract review, sales research, financial reporting, HR screening, content approvals. One sentence to describe its job.

**Step 2** — Use this Claude prompt to generate a first draft (paste into a fresh Claude chat, replace the bracketed part):

```
I want to design an agent that [describe the job your agent would
do at your work — one sentence].

List 5 tools it would need.
For each tool:
- Name it
- Describe what it does in one sentence
- Suggest the narrowest possible scope (what it explicitly cannot access)
- Recommend the minimum permission level required
  (read / read+write / send / execute)
- Tell me what breaks if this tool is removed
```

**Step 3** — Paste the output. Edit it into the table below. The first draft is always too broad on scope and too permissive on permission. Narrow both.

**Step 4** — Circle one tool that makes you nervous. That's the one your legal team will ask about first.

---

### Tool Manifest — Section 2 of Your Architecture Card

**My agent's job (one sentence):**

_______________________________________________________________

| Tool name | What it does (1 sentence) | Scope — what it cannot touch | Permission | What breaks if removed |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

**The tool that makes me nervous:** ___________________________

**Why it makes me nervous:** __________________________________

**How I'd scope it more tightly (one sentence):**

_______________________________________________________________

---

*Tool Manifest complete → this is Section 2 of your Agent Architecture Card.*

---

## Exercise C — Pattern Choice

**WHAT:** Pick a multi-agent pattern for your agent scenario. Write one sentence defending the choice.

**WHY:** Pattern selection is the first architectural decision most teams skip. Naming the pattern forces clarity about what each agent does, what it hands off, and when a human steps in. Building without a named pattern usually produces either a single overloaded agent that breaks on complex tasks, or an uncoordinated multi-agent system with no clear owner.

---

### The Three Patterns — Quick Reference

| Pattern | Analogy | Best for |
|---|---|---|
| **Orchestrator-Worker** | Project manager + specialist team | Complex tasks, sequential dependencies |
| **Parallel Agents** | Multiple analysts, shared queue | Independent sub-tasks, speed matters |
| **Specialist Handoffs** | Relay race — each runner specialized | Distinct sequential phases, different expertise |

*The HR Candidate Screener from Session 2 was a Specialist Handoffs pattern — Node 1 searched, Node 2 extracted skills, Node 3 scored. Three specialists in sequence.*

---

**HOW:**

**Step 1** — Use this Claude prompt (replace the bracketed part with the same job as Exercise B):

```
I want to build an agent that [describe the job].

Which of these three patterns fits best —
Orchestrator-Worker, Parallel Agents, or Specialist Handoffs — and why?

Walk me through the choice.
Then tell me: what breaks if I use the wrong pattern?
```

**Step 2** — Read the recommendation. Agree or push back. Write your final choice below:

---

### Pattern Choice — Section 3 of Your Architecture Card

**I'm using:** _______________________________________________

**Because:** ________________________________________________

_______________________________________________________________

**The risk if I use the wrong pattern:** _____________________

_______________________________________________________________

---

*Pattern Choice complete → this is Section 3 of your Agent Architecture Card.*

---

## Your Agent Architecture Card — All Three Sections Complete

| Section | What you designed | Reusable prompt inside |
|---|---|---|
| **1 — Loop Trace** | Traced a real agent's reasoning, named every stage, found the gap | The PERCEIVE/REASON/PLAN/ACT/OBSERVE/REFLECT prompt |
| **2 — Tool Manifest** | Scoped 5 tools, wrote the governance contract, found the nervous tool | The "List 5 tools it would need" prompt |
| **3 — Pattern Choice** | Picked the architecture and can defend it in one sentence | The "Which of the three patterns fits best" prompt |

**For Session 6:** Bring this card to the EdYoda Agent Builder session.
- Loop Trace → informs your system prompt and node sequence
- Tool Manifest → becomes your node instructions and RAG Docs configuration
- Pattern Choice → determines single-agent pipeline vs. multi-node specialist sequence

---

## Take-Home (reply by Friday)

Two sentences each:

1. Which of the 5 architecture components was missing from the S2 HR Candidate Screener — and what specifically broke because of it?
2. What's the one tool in your manifest you'd add a human approval gate to — and what's the trigger for escalation?

---

## What's Next — Session 6: EdYoda Agent Builder — Build & Host Your First Agent

Session 6 takes the Architecture Card you completed today and turns it into a live, hosted agent in the EdYoda Agent Builder. You'll configure the system prompt, wire up the node pipeline, add RAG Docs, and publish a shareable agent. Bring this workbook — every section maps directly to something you'll configure in the Builder.

---

*Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu*
*EdYoda · GenAI & AI Agents for Non-Coders · S05*
