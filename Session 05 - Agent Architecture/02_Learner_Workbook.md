# Generative AI for Non-Coders — Session 5 Workbook

**Agent Architecture: How Agents Think, Remember & Act**

---

## How to use this workbook

The **slides** carry the concepts — the five components, the loop, the memory types, the patterns. **This workbook carries the execution.** It's the running narrative and the exact steps: what to open, what to paste, what you should see, and what to do when it doesn't behave. Keep the slides for the "why"; keep this for the "how."

You'll work the whole session on **one continuous story — Lumière Bakery**, the same system you grounded yesterday. Today you take that read-only Knowledge Agent and design the architecture for a Lumière agent that can actually *act*: take orders, and keep the bakery on the right side of food-safety regulation.

By the end you'll have a completed **Agent Architecture Card** — three sections, all about Lumière, that together form the blueprint you'll build for real in Session 6.

**One tool, open before you start:** your **Lumière Knowledge Agent** in Claude Projects (the one from Session 4, with `Lumiere_KB.md` in its knowledge). No project? Open a fresh Claude chat and attach `Lumiere_KB.md` with the paperclip — every step works identically.

---

## Where we are in the story

Yesterday Lumière got a brain: you grounded an agent in `Lumiere_KB.md` so it answered the Saturday-eggless-cake question from the document, cited its source, and refused when the answer wasn't there. That agent **reads**. It cannot **do** anything — it can't take the order, book the slot, or flag a problem.

Today's job is to design the architecture for two upgrades Lumière actually needs:

1. **The Lumière Order Assistant** — takes a customer order end to end: checks the cake spec against the rules, confirms the lead time, books the slot, sends a confirmation.
2. **The FSSAI Regulation Monitor** — watches for new food-safety rules from FSSAI (India's food regulator) and keeps Lumière compliant — auto-handling the trivial updates, and escalating anything about allergens or safety to a human.

You're not building these today (that's Session 6). Today you design them — and that design *is* your Architecture Card.

> **Quick callback to Session 2.** Remember the five gaps that separate a real agent from a chatbot — **#1 Memory · #2 Multi-step reasoning · #3 Tools · #4 Autonomy · #5 Planning**? Everything today is those five gaps, now drawn as architecture. The Order Assistant needs **#3 Tools** and **#4 Autonomy**. The Regulation Monitor needs **#1 Memory** (so it doesn't re-alert on a rule it already saw) and **#5 Planning** (so it knows when to act and when to escalate).

---

## The three exercises at a glance

| Exercise | What you design | Framework you'll revise |
|---|---|---|
| **A — Loop Trace** | Trace yesterday's Knowledge Agent through its six reasoning stages | S4 grounding prompt + refusal line |
| **B — Tool Manifest** | The Order Assistant's tools + the Regulation Monitor's triggers | S3 **RCTFC** · S2 Gaps #3 + #4 |
| **C — Pattern Choice** | How Lumière's agents coordinate when it opens an overseas branch | S2 Gaps #1 + #5 |

The exercises are the session. If you're short on time, do these and skim the rest.

---

## Exercise A — Loop Trace (≈13 minutes)

### The setup
You'll point yesterday's Lumière Knowledge Agent at a deliberately *messy* customer question — one with three separate asks buried in it — and make the agent expose its reasoning one stage at a time. You're not testing whether it gets the answer right (you proved that yesterday). You're learning to **read the six stages of its loop**, so that next time an agent misbehaves you can see exactly which stage failed.

### Framework you're revising
This builds directly on **Session 4's grounding prompt + refusal line**. Yesterday those two lines made the agent answer *from the document* and *admit when it didn't know*. Today you add one more instruction on top — a reasoning trace — and watch how the same grounded agent thinks.

### Steps

**1.** Open your Lumière Knowledge Agent in Claude Projects. (Fresh chat + attached `Lumiere_KB.md` works the same.)

**2.** Paste this block into the message box. **Do not send yet** — it goes *above* the question so it shapes the whole reply.

```
For this answer, show your reasoning one stage at a time. Use exactly these six labels, in order:

PERCEIVE — what did the customer actually ask? List every separate request.
REASON — which parts can the Lumière document answer, and which can't?
PLAN — what order will you tackle the requests in?
ACT — quote the exact section(s) of the document you used.
OBSERVE — did you cover every request? Which, if any, is unanswered?
REFLECT — if a request can't be answered from the document, what will you do about it?

Then give the customer-facing answer.
```

**3.** On the next line, paste this customer message and **send**:

```
Hi! I need a 2kg eggless chocolate cake for this Saturday. Does the 15%
LUMIERE15 code work on eggless cakes? And can you deliver to Sector 90,
Gurgaon? Also — is the cake safe for a child with a severe nut allergy?
```

### What you should see — and the trap built into the question
A clean trace will show the agent **splitting four requests** and handling them differently:
- **Eggless cake, Saturday** → answerable: 48-hour lead time, eggless available (+₹80).
- **LUMIERE15 on eggless** → answerable: yes, if ordered 3+ days ahead.
- **Gurgaon delivery** → *not* in the document (Version 1 is Mumbai-only) → the **refusal line from S4** should fire here.
- **Nut-allergy safety** → the document says the kitchen is **not** nut-free and can't guarantee allergen-free — so the agent should state that and **refuse to certify safety.** This is the request that *must* land in REFLECT, not get a confident "yes."

The whole point: a good loop doesn't treat four requests as one. It perceives them separately, observes which it couldn't answer, and reflects on the gap instead of bluffing.

### Fill this in (Section 1 of your Architecture Card)

**PERCEIVE** — how many separate requests did the agent find? List them:

_______________________________________________________________

**REASON** — which were answerable from the document, which weren't?

_______________________________________________________________

**PLAN** — what order did it take them in?

_______________________________________________________________

**ACT** — paste one exact `(Source: …)` section the agent quoted:

(Source: _____________________________________________________)

**OBSERVE** — did it cover all four? Which did it flag as unanswered?

_______________________________________________________________

**REFLECT** — what did it do about the Gurgaon and nut-allergy requests?

_______________________________________________________________

**Your diagnosis** — which stage did the most work here, and why?

_______________________________________________________________

### If it misbehaves
- **It answers in one blob, no labels** → the trace block landed below the question, or after you'd already sent. Start a fresh message with the block on top.
- **It says "yes, safe for nut allergy"** → the refusal isn't firing on the safety question. Add this line to the block and resend: *"On any allergen or safety question, state that the kitchen is not nut-free and you cannot guarantee allergen-free — never say an item is safe."* (This is the S4 refusal line, sharpened for safety.)
- **It invents a Gurgaon delivery answer** → same fix — the refusal line isn't covering out-of-document requests. Re-confirm your S4 grounding + refusal prompt is still in the Project's custom instructions.

> **The line to remember:** the agent that perceives four requests as four — and reflects on the two it can't answer instead of bluffing — is the agent that won't hallucinate. That's the same gap that broke the Session 2 HR Screener, seen from the inside.

**✅ Loop Trace done — Section 1 of your Architecture Card.**

---

## Exercise B — Tool Manifest (≈17 minutes)

### The setup
Yesterday's agent only reads. Now you design the two agents that **act** — and the danger flips. A reading agent that's wrong gives a bad answer. An *acting* agent that's wrong books the wrong slot, sends the wrong confirmation, or — worst case — quietly changes an allergen label. So before either agent gets built, you write its **tool manifest**: every tool it's allowed to use, scoped to exactly what it can touch, with the minimum permission, and a clear line on what it must escalate to a human.

You'll design two manifests: the **Order Assistant** (closes Gaps **#3 Tools** and **#4 Autonomy** from Session 2) and the **FSSAI Regulation Monitor** (the harder one — it has a trigger and a risk-sorting rule).

### Framework you're revising
You'll write each tool's instruction using **Session 3's RCTFC** anatomy — **R**ole, **C**ontext, **T**ask, **F**ormat, **C**onstraints. A tool manifest *is* RCTFC applied to a single tool: the Role is what the tool is, the Constraints are its scope and permission. Quoting RCTFC here is the point — it's the same five-part discipline, now used to keep an agent safe instead of just well-phrased.

### Part 1 — The Lumière Order Assistant

**Use this prompt** to generate a first draft. Open a fresh Claude chat (or your Lumière project) and paste it exactly:

```
You are helping me design the TOOL MANIFEST for a Lumière Bakery Order
Assistant — an agent that takes a customer cake order end to end:
checks the cake spec against Lumière's rules, confirms the lead time,
books the production slot, and sends a confirmation.

List 5 tools it would need. For EACH tool, write it in RCTFC form:
- ROLE: what the tool is (e.g. "Order-rules reader")
- CONTEXT: where its data lives (e.g. "Lumiere_KB.md")
- TASK: the one action it performs
- FORMAT: what it returns
- CONSTRAINTS: the narrowest scope (what it must NOT touch) + the
  minimum permission level (read / read+write / send / execute)

Then add one line: what breaks if this tool is removed.
```

**Then tighten the draft** — Claude's first pass is always too generous. For each tool ask: *does it really need write access, or just read?* Narrow every CONSTRAINTS line until you could hand it to Lumière's owner and she'd know exactly what the tool can and can't do.

**Fill in your Order Assistant manifest:**

| # | Tool (Role) | Task | Scope — what it CANNOT touch | Permission | Breaks if removed |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

**A worked row, so you know the shape:**

| Tool (Role) | Task | Scope | Permission | Breaks if removed |
|---|---|---|---|---|
| Slot Booker | Reserve a production slot for the confirmed order | Only Lumière's own production calendar — not staff personal calendars, not other branches | read + write | Orders get confirmed but never actually scheduled |

### Part 2 — The FSSAI Regulation Monitor (the hard one)

This agent watches for new food-safety rules from **FSSAI** and keeps Lumière compliant. Two things make it a real architecture problem:

**(a) It has two triggers — this is the agent's PERCEIVE stage, firing two ways:**
- **Auto trigger:** runs on a schedule (e.g. every night) — *"check FSSAI for any new or updated rules since last run."*
- **Manual trigger:** the admin clicks *check now* — e.g. before a big festival order, or when opening a new outlet.

**(b) It sorts what it finds by risk — and this is the governance line you must draw yourself:**

| Risk level | Examples | What the agent does |
|---|---|---|
| **Low (cosmetic / procedural)** | a renamed compliance form, an updated filing-portal URL, a changed submission deadline | **Auto-apply + log it.** No human needed. |
| **High (allergen / ingredient / safety)** | a new allergen-labelling requirement, an ingredient ban, a change to safety-claim wording | **Always escalate to a human. Never auto-apply.** Draft the alert, stop, wait. |

> **The hard rule — write it into the manifest:** *the agent never decides for itself whether something is low- or high-risk.* The human defines the two buckets up front (allergen / ingredient / safety = always high). The agent only sorts incoming rules into the buckets the human already drew. An agent that judges its own risk threshold is exactly the over-autonomy this whole session warns against.

**Use this prompt** to draft the monitor's manifest:

```
Help me design the TOOL MANIFEST for a Lumière FSSAI Regulation Monitor —
an agent that watches for new food-safety rules from FSSAI and keeps the
bakery compliant.

Requirements it MUST reflect:
- TWO triggers: an automatic nightly schedule, and a manual "check now"
  button for the admin.
- A risk rule: it AUTO-APPLIES only cosmetic/procedural updates (renamed
  forms, changed URLs, new deadlines) and LOGS them. It ESCALATES anything
  about allergens, ingredients, or safety to a human and never applies it
  itself.
- It must remember which rules it already saw, so it doesn't re-alert on
  the same one twice.

List the 4–5 tools it needs in RCTFC form (Role / Context / Task / Format /
Constraints), and for the trigger and the escalation tool, spell out the
exact CONSTRAINTS that enforce the rules above.
```

**Fill in your Regulation Monitor manifest:**

| # | Tool (Role) | Task | Scope / the rule it enforces | Permission | Auto or Escalate? |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |

**The "memory" tool is the one that revises Session 2.** One of these tools must be a **log of rules already seen** — so the monitor doesn't alert twice on the same FSSAI update. That is **episodic memory** (the archive, from today's slides). Leave it out and the agent re-alerts on every run — the same architecture gap that made the S2 HR Screener invent data when it had nowhere to record what it had already done. Name that tool. Don't skip it.

### Circle your nervous tool
Across both manifests, circle the one tool that would worry you most if it misfired. It is almost certainly an *acting* tool — the Slot Booker, the Confirmation Sender, or the regulation Auto-Apply. Write below how you'd make it safer:

_______________________________________________________________

### If your draft is too vague
Paste this follow-up to Claude:
```
For every tool, rewrite the CONSTRAINTS as one sentence naming exactly what
the tool cannot access, and set permission to the lowest level that still
lets it do its job. If you wrote "full access" anywhere, that's not a scope
— replace it. And confirm: does the Regulation Monitor escalate ALL
allergen/safety rules to a human, with zero auto-apply on those?
```

**✅ Tool Manifest done — Section 2 of your Architecture Card.**

---

## Exercise C — Pattern Choice (≈8 minutes)

### The setup
Lumière has been Mumbai-only. Now imagine the owner decides to **open a branch overseas** — say London. Suddenly one assumption breaks: FSSAI is India's regulator and has no authority in the UK, where the Food Standards Agency (FSA) makes the rules. Your single Regulation Monitor was built for one rulebook. Now there are two — and tomorrow, maybe five.

This is the moment one agent stops being enough. **How do you split the work?** That's the multi-agent question, and the overseas branch forces the answer.

### Framework you're revising
This closes Session 2's Gaps **#1 Memory** and **#5 Planning** at the system level — each country's monitor needs its *own* memory of *its* regulator's rules, and something has to *plan* which monitor handles which branch. A single agent trying to track every country's rules in one memory is the over-broad design today's whole session warns against.

### Steps

**1.** Paste this prompt into Claude:

```
Lumière Bakery is opening a second branch overseas (London), where the
food-safety regulator is the FSA, not India's FSSAI. The existing
Regulation Monitor only knows FSSAI.

I have three multi-agent patterns to choose from:
- Orchestrator-Worker: a manager agent routes each branch's compliance
  work to a specialist worker agent.
- Parallel Agents: identical agents each handle a share of one big queue.
- Specialist Handoffs: each agent does one phase, then passes to the next.

Which pattern fits keeping multiple branches compliant across DIFFERENT
regulators — and why? Walk me through it. Then tell me what would break if
I used the wrong one. And tell me where a human must stay in the loop.
```

**2.** Read the recommendation. You know the bakery's reality better than the model — agree or push back. The strongest answer is usually **one Regulation Monitor per country/regulator** (each with its own memory of its own rulebook), with an **orchestrator that routes by branch location**, and the **allergen/safety escalation-to-human rule still firing inside every one of them.**

### Fill this in (Section 3 of your Architecture Card)

**The pattern I'd use for Lumière's multi-branch compliance:**

_______________________________________________________________

**Because:**

_______________________________________________________________

**What breaks if I pick the wrong pattern:**

_______________________________________________________________

**Where a human must stay in the loop, no matter how many branches:**

_______________________________________________________________

### If Claude over-automates
If the model suggests one agent should "manage the whole country launch," push back with:
```
Don't let one agent manage an entire country launch — that's too much
autonomy for a food-safety system. Keep one monitor per regulator, each
with its own memory, an orchestrator that only ROUTES, and a human gate on
every allergen or safety decision. Redo the recommendation with those
limits.
```
That pushback *is* the lesson — refusing the over-broad version is exactly the architecture judgment Session 5 is teaching.

**✅ Pattern Choice done — Section 3 of your Architecture Card.**

---

## Your Lumière Agent Architecture Card — Complete

Three sections, all bakery, all continuous from yesterday:

| Section | What you designed | The gap it closes (from S2) |
|---|---|---|
| **1 — Loop Trace** | Yesterday's Knowledge Agent, read stage by stage | shows where hallucination starts |
| **2 — Tool Manifest** | Order Assistant + FSSAI Monitor, scoped and triggered | #3 Tools · #4 Autonomy · #1 Memory |
| **3 — Pattern Choice** | How the agents coordinate across branches | #5 Planning · #1 Memory |

**This is the blueprint you build in Session 6.** In the EdYoda Agent Builder: your **Loop Trace** shapes the system prompt and step order; your **Tool Manifest** becomes the configured tools and the RAG Docs; your **Pattern Choice** decides whether you build one agent or a routed set. Bring this workbook.

---

## Take-Home (reply to the class email by Friday)

Two sentences each — and keep it on Lumière:

1. The S2 HR Screener invented data because it was missing one component. Which Lumière agent today would hallucinate the same way if you left that component out — and what exactly would it invent?
2. In your FSSAI Regulation Monitor manifest, which single rule would you *never* let auto-apply — and what's the trigger that puts a human in the loop?

---

## What's Next — Session 6: EdYoda Agent Builder — Build & Host Your First Agent

Next session your Architecture Card stops being paper. In the EdYoda Agent Builder you'll wire the Lumière Order Assistant as a real, hosted agent: the system prompt from your Loop Trace, the tools from your Manifest, the structure from your Pattern Choice. Bring this workbook — every section maps to something you'll configure.

---

*Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu*
*EdYoda · GenAI & AI Agents for Non-Coders · S05*
