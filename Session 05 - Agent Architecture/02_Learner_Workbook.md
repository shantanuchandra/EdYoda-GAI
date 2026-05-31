# Generative AI for Non-Coders — Session 5 Workbook

**Agent Architecture: How Agents Think, Remember & Act**

---

## How to use this workbook

The **slides** carry the concepts — the five components, the loop, the memory types, the patterns. **This workbook carries the execution** — what to open, what to paste, what you should see, and what to do when it doesn't behave. Slides for the *why*; this for the *how*.

Everything today runs on **one story: Lumière Bakery** — the same system you grounded yesterday. You'll take that read-only Knowledge Agent and design two upgrades the bakery actually needs, ending with a completed **Agent Architecture Card** you'll build for real in Session 6.

**Open before you start:** your **Lumière Knowledge Agent** in Claude Projects (from Session 4). **Re-upload the latest `Lumiere_KB.md`** (in your S5 materials) into the Project's knowledge before you begin — the document gained a **branch-specific coupons** section since yesterday, and today's first exercise uses it. *(Re-uploading a changed document and watching the agent's answers update is exactly the dynamic-doc move you learned in Session 4.)* No project? Fresh Claude chat, attach the latest `Lumiere_KB.md` with the paperclip — every step works the same.

**How to capture your answers:** wherever you see a grey box like this —

```text
↳ your answer here
```

— type directly between the lines (this workbook is a Google Doc; you don't need to print it).

---

## What you're designing today

Yesterday's agent *reads*: it answered from `Lumiere_KB.md`, cited its source, refused when the answer wasn't there. It cannot *do* anything — can't take an order, book a slot, or flag a problem. Today you design the architecture for two agents that act:

| Agent | What it does | The hard part |
|---|---|---|
| **Lumière Order Assistant** | Takes a cake order end to end — checks the spec against the rules, confirms lead time, books the slot, sends confirmation | It *acts*, so a mistake books the wrong slot — not just a bad answer |
| **FSSAI Regulation Monitor** | Watches for new food-safety rules from FSSAI (India's regulator) and keeps Lumière compliant | It must auto-handle trivial updates but **escalate anything about allergens or safety to a human** |

You design them today; you build them in Session 6. The design *is* your Architecture Card.

> **Session-2 callback.** The five gaps that separate an agent from a chatbot — **#1 Memory · #2 Multi-step · #3 Tools · #4 Autonomy · #5 Planning** — are what you're drawing as architecture today. Order Assistant → Gaps **#3 + #4**. Regulation Monitor → Gaps **#1 + #5**.

| Exercise | You produce | Time | Framework you revise |
|---|---|---|---|
| **A — Loop Trace** | Yesterday's agent, read stage by stage | 13 min | S4 grounding + refusal |
| **B — Tool Manifest** | Tools for both new agents | 17 min | S3 **RCTFC** · S2 Gaps #3 #4 #1 |
| **C — Pattern Choice** | How they coordinate across branches | 8 min | S2 Gaps #5 #1 |

---

## Exercise A — Loop Trace · 13 min

**What & why.** You'll feed yesterday's agent a deliberately messy customer message with several asks tangled together, and make it expose its reasoning one stage at a time. You're not checking the answer (you did that yesterday) — you're learning to **read the six loop stages**, so when an agent misbehaves you can name the stage that failed. *Revises S4:* the grounding prompt + refusal line are still doing the work underneath; today you add a reasoning trace on top.

### Do this

**1.** Open your Lumière Knowledge Agent.

**2.** Paste this block — **do not send yet** (it goes *above* the question):

```text
For this answer, show your reasoning one stage at a time, using exactly
these six labels in order:

PERCEIVE — list every separate request in the message.
REASON — for each request, can the Lumière document answer it: YES,
         NO (not in the document), or PARTIAL (document covers the topic
         but not this exact detail)?
PLAN — what order will you handle them in?
ACT — quote the exact section heading(s) you used.
OBSERVE — which requests did you fully answer? Which not?
REFLECT — for anything you couldn't fully answer, what will you do
          instead of guessing?

Then write the customer-facing reply.
```

**3.** On the next line, paste this and **send**:

```text
Hi! I want a 2kg eggless chocolate cake for pickup at your Bandra branch
this Saturday. Can I use the "BANDRA 10" code on it — or my friend said
"POWAI10" gives a better deal, does that work at Bandra? Also, can you
deliver it to Sector 90, Gurgaon, and is it safe for my child with a
severe nut allergy?
```

*(The customer fumbles two coupon details on purpose: the code is mistyped as "BANDRA 10" — the real one is **BANDRA10** — and they ask whether a **different branch's** code (POWAI10) works at Bandra. The best agent doesn't just refuse the wrong code — it tells the customer the **right code for their branch**. That's the REASON stage matching meaning, applying a rule, AND being helpful with what the document does know.)*

### What you should see (verified against the document)

The message hides **five** requests, and a good loop sorts them into *different kinds* — that's the whole lesson:

| Request | Document says | Correct loop behaviour |
|---|---|---|
| 2kg eggless choc cake, Saturday, Bandra pickup | **YES** — 48h lead time for custom cakes ≤3kg; eggless +₹80/cake | Answer it, cite *Custom & Celebration Orders → Lead Times* |
| The mistyped "BANDRA 10" code | **FUZZY** — the real code is **BANDRA10** (10% off, min ₹600, Bandra only) | Recognise the misspelling, reply with the correct code **BANDRA10** |
| Does "POWAI10" work at Bandra? | **NO → REDIRECT** — POWAI10 is **Powai-only**; but the customer is at **Bandra**, where **BANDRA10** applies | Refuse the wrong-branch code AND tell them the right one for their location: *"POWAI10 only works at Powai — at Bandra, use BANDRA10."* |
| Does any code apply to the **eggless** version? | **PARTIAL** — eggless eligibility is *not guaranteed* and "confirm with the branch" | Flag the gap honestly — don't assume "yes" |
| Deliver to Sector 90, Gurgaon + safe for a nut allergy | **NO + NO (safety)** — delivery is Mumbai-only; kitchen is *not* nut-free, *cannot guarantee* allergen-free | Refuse the Gurgaon delivery; state the allergen risk and refuse to certify safety |

The point: a weak loop mashes everything into one confident paragraph. A strong loop **perceives each request separately** and treats them differently — **correct** the fuzzy code, **redirect** the wrong-branch code to the right one for *this* location, **flag** the eggless-eligibility gap honestly, and **never** certify allergen safety. The redirect is the highest bar: a flat "no" is correct, but "no — here's the one that *does* work at your branch" is what a great agent does, because it uses the location to pick the right coupon.

### Capture (Section 1 of your Card)

```text
PERCEIVE — how many requests did it find, and what were they?
↳

REASON — mark each YES / NO / FUZZY / PARTIAL:
↳

ACT — one exact (Source: …) heading it quoted:
↳ (Source:                                                      )

OBSERVE / REFLECT — what did it do with the wrong-branch code (NO),
the Gurgaon delivery (NO), and the nut-allergy safety (NO-safety)?
↳

COUPON CHECK — (a) did it fix "BANDRA 10" to the real BANDRA10?
              (b) did it refuse POWAI10 at Bandra AND point the customer
                  to the right code for their location (BANDRA10)?
↳ (paste what it wrote)

DIAGNOSIS — which single stage saved this answer from being a bluff?
↳
```

### You're done when…
…your trace shows the agent **handling the five requests differently** — it **fixes "BANDRA 10" to BANDRA10**, **refuses POWAI10 at Bandra and redirects the customer to BANDRA10** (the code that works at their location), refuses the Gurgaon delivery and the nut-allergy safety question, and **flags** that eggless eligibility isn't guaranteed. **Best result:** it names BANDRA10 as the right code for Bandra without being asked again. If it answered everything confidently — or accepted POWAI10 at Bandra, or just said "no" without offering the right code — the trace fell short; see fixes below.

### If it misbehaves
- **One blob, no labels** → the trace block landed below the question or after you sent. Redo it with the block on top.
- **"Yes, safe for a nut allergy"** → add and resend: *"On any allergen or safety question, state the kitchen is not nut-free and you cannot guarantee allergen-free — never call an item safe."*
- **Accepts POWAI10 at Bandra, or invents a Gurgaon answer** → your S4 grounding + refusal prompt isn't loaded, or the agent hasn't re-read the updated KB. Re-upload `Lumiere_KB.md` (it now has the branch-codes section), confirm the grounding + refusal prompt is in custom instructions, then retry.
- **Echoes "BANDRA 10" back unchanged, or says "no such code"** → it's matching the exact string instead of the meaning. Add to the trace block: *"If a coupon code is slightly misspelled, identify the closest real code in the document and give the customer the correct spelling."*
- **Refuses POWAI10 but stops there (no redirect)** → it's correct but not helpful. Add to the trace block: *"If a customer asks about a coupon that isn't valid at their branch, tell them which code IS valid at their branch."* Now the location picks the right coupon.

> **Remember:** the agent that perceives five requests as five — and **corrects, redirects, flags, and refuses** instead of bluffing — is the one that won't hallucinate. Same gap that broke the S2 HR Screener, seen from the inside: when it can't answer, it should say so or redirect, never invent.

---

## Exercise B — Tool Manifest · 17 min (≈7 min Part 1, ≈10 min Part 2)

**What & why.** A reading agent that's wrong gives a bad answer. An *acting* agent that's wrong books the wrong slot, sends the wrong confirmation, or — worst case — quietly changes an allergen label. So before either agent is built, you write its **tool manifest**: every tool, scoped to exactly what it may touch, at the minimum permission, with a clear escalation line. *Revises S3:* you'll write each tool in **RCTFC** form — a manifest is RCTFC pointed at a single tool, where **Constraints** = scope + permission.

---

### Tools in action — the ice-cake question (read before you start)

Two tools matter most for the Order Assistant, and neither is something the model can do on its own:

- **Search tool** — looks up live facts the model wasn't trained on (a competitor's price, a news item, a supplier's stock).
- **Weather tool** — returns *today's* temperature for a specific place. A model has no idea what the weather is right now — it must call a tool.

Here's why this matters, and it ties the whole session together. Lumière sells an **ice cake** (an ice-cream cake) that has to stay frozen. A customer asks:

> *"If I pick up the ice cake, how long will it last before it melts?"*

The honest answer **depends on where they are and how warm it is right now** — and the model knows neither. A weak agent guesses "about 2 hours." A strong agent reaches for tools:

1. **PERCEIVE** — customer wants the safe out-of-freezer window for an ice cake, at their location.
2. **ACT (weather tool)** — call it for the customer's locality. Say it's a future **Gurgaon (Sector 86)** branch → the tool returns **24°C** today.
3. **ACT (calculation)** — apply the melt rule: an ice cake is safe roughly **2 hours at 24°C**; warmer cuts it shorter, cooler stretches it longer. (This is a *computation* tool / explicit reasoning — not a number the model should eyeball.)
4. **REFLECT + caveat** — "About **2 hours** at today's 24°C in Sector 86 — that's an estimate, not a guarantee. Keep it refrigerated and transport it cold." Same honesty discipline as the allergen refusal.

**Now change the location — and watch the answer change.** Open a **San Francisco** branch and the same question runs the same tools: the weather tool returns ~**15°C**, the calculation stretches the safe window to roughly **3–4 hours**. *Same agent, same tools — the location drives the weather, the weather drives the math, the math drives the answer.* That's the lesson: the agent doesn't *know* the temperature or the melt time — it **calls the right tool for the place, does the math, and caveats what's still uncertain.**

> Notice the pattern repeating from Exercise A: the **customer's location** picks the right output — there it chose the right coupon; here it chooses the right weather, and therefore the right melt-time. Location-aware tool use is the same move both times.

---

### Part 1 — Lumière Order Assistant (≈7 min) · closes Gaps #3 Tools, #4 Autonomy

**Draft it.** Open a fresh Claude chat (or your Lumière project) and paste:

```text
Help me design the TOOL MANIFEST for a Lumière Bakery Order Assistant — an
agent that takes a customer cake order end to end: checks the cake spec
against Lumière's rules, confirms the lead time, books the production slot,
and sends a confirmation.

List 5 tools. Write EACH in RCTFC form:
- ROLE: what the tool is
- CONTEXT: where its data lives (e.g. Lumiere_KB.md, the production calendar)
- TASK: the one action it performs
- FORMAT: what it returns
- CONSTRAINTS: the narrowest scope (what it must NOT touch) + the minimum
  permission (read / read+write / send / execute)
Then one line: what breaks if this tool is removed.
```

**Tighten it.** Claude's first pass is always too generous. For each tool ask: *read access or write?* Narrow every Constraints line until Lumière's owner would know exactly what the tool can and can't do.

**Worked example — the shape to copy:**

```text
ROLE: Slot Booker
CONTEXT: Lumière's production calendar
TASK: Reserve one production slot for a confirmed order
FORMAT: A booking ID + the reserved date/time
CONSTRAINTS: Lumière production calendar only — never staff personal
  calendars, never other branches. Permission: read + write.
BREAKS IF REMOVED: Orders get confirmed but never actually scheduled.
```

**Your manifest (5 rows):**

```text
1. ROLE:            TASK:            SCOPE (cannot touch):            PERM:
2. ROLE:            TASK:            SCOPE:                           PERM:
3. ROLE:            TASK:            SCOPE:                           PERM:
4. ROLE:            TASK:            SCOPE:                           PERM:
5. ROLE:            TASK:            SCOPE:                           PERM:
```

*(A complete Order Assistant usually has: an order-rules reader [read-only on `Lumiere_KB.md`], a slot booker [read+write, calendar only], a confirmation sender [send, templated], a **weather tool** [read-only, for the ice-cake melt-window question above], and a **melt-window calculator** [read-only computation]. Yours may differ — defend your five.)*

### Part 2 — FSSAI Regulation Monitor (≈10 min) · closes Gaps #1 Memory, #5 Planning

This one is harder because it has a **trigger** and a **risk rule**.

**(a) Two triggers — this is the loop's PERCEIVE stage firing two ways:**
- **Auto:** nightly schedule — *"check FSSAI for new/updated rules since last run."*
- **Manual:** admin clicks *check now* — before a festival rush, or when opening a new outlet.

**(b) A risk rule — and you draw the line, not the agent:**

| Risk | Examples | Agent does |
|---|---|---|
| **Low** (cosmetic / procedural) | renamed form, changed portal URL, new filing deadline | **Auto-apply + log** |
| **High** (allergen / ingredient / safety) | new allergen-labelling rule, ingredient ban, safety-claim wording change | **Escalate to a human — never auto-apply** |

> **The hard rule, written into the manifest:** the agent **never decides** whether something is low- or high-risk. The human fixes the buckets up front (allergen / ingredient / safety = always high); the agent only sorts new rules into buckets that already exist. An agent that judges its own risk threshold is the over-autonomy this whole session warns against.

**Draft it.** Paste:

```text
Help me design the TOOL MANIFEST for a Lumière FSSAI Regulation Monitor —
an agent that watches for new FSSAI food-safety rules and keeps the bakery
compliant. It MUST reflect:
- TWO triggers: an automatic nightly schedule AND a manual "check now" button.
- A risk rule: AUTO-APPLY + LOG only cosmetic/procedural updates (renamed
  forms, changed URLs, new deadlines). ESCALATE anything about allergens,
  ingredients, or safety to a human — never apply it itself.
- A memory of rules already seen, so it never re-alerts on the same one twice.
List 4-5 tools in RCTFC form, and for the trigger tool and the escalation
tool, spell out the exact CONSTRAINTS that enforce the rules above.
```

**Worked example — the memory tool you must not skip:**

```text
ROLE: Seen-Rules Log
CONTEXT: A stored list of FSSAI rule IDs the monitor has already processed
TASK: Before alerting, check whether this rule was seen before; after
  handling, record it
FORMAT: seen / not-seen, plus the date handled
CONSTRAINTS: Read + write to this log only. Permission: read + write.
BREAKS IF REMOVED: The monitor re-alerts on the same rule every single night.
```

That **Seen-Rules Log is episodic memory** (the *archive*, from today's slides). Leave it out and the agent re-alerts forever — the same gap that made the S2 HR Screener invent data when it had nowhere to record what it had already done.

**Your monitor manifest (4–5 rows — include the memory tool and the escalation tool):**

```text
1. ROLE:            TASK:            RULE IT ENFORCES:            PERM:
2. ROLE:            TASK:            RULE IT ENFORCES:            PERM:
3. ROLE:            TASK:            RULE IT ENFORCES:            PERM:
4. ROLE:            TASK:            RULE IT ENFORCES:            PERM:
5. ROLE:            TASK:            RULE IT ENFORCES:            PERM:
```

### Your nervous tool
Across both manifests, name the one tool that would worry you most if it misfired (almost always an *acting* tool — Slot Booker, Confirmation Sender, or the regulation Auto-Apply):

```text
↳ Nervous tool:
↳ How I'd make it safer (tighter scope, or a human approval gate before it runs):
```

### You're done when…
…both manifests have **scopes written as "cannot touch X," not "access to X"**; every permission is the *minimum* that still works; the monitor has a named **memory tool**; and **every allergen/safety rule escalates to a human with zero auto-apply.**

### If your draft stays vague
Paste:
```text
Rewrite every CONSTRAINTS line as one sentence naming exactly what the tool
cannot access, and set each permission to the lowest level that still lets it
do its job. If you wrote "full access" anywhere, replace it. Confirm: does the
Regulation Monitor escalate ALL allergen/safety rules with zero auto-apply?
```

---

## Exercise C — Pattern Choice · 8 min

**What & why.** Lumière has been Mumbai-only. Now the owner opens a branch **overseas — London**. One assumption breaks instantly: FSSAI has no authority in the UK, where the **FSA** makes the rules. Your single Regulation Monitor knew one rulebook; now there are two, and tomorrow maybe five. That's the moment one agent stops being enough — and *how you split the work* is the multi-agent decision. *Revises S2:* Gaps **#5 Planning** (something must route work to the right monitor) and **#1 Memory** (each monitor needs its own memory of its own regulator).

### Do this

**1.** Paste:

```text
Lumière Bakery is opening a branch overseas (London), where the food-safety
regulator is the FSA, not India's FSSAI. The current Regulation Monitor only
knows FSSAI. I have three patterns:
- Orchestrator-Worker: a manager agent routes each branch's compliance work
  to a specialist worker agent.
- Parallel Agents: identical agents each take a share of one big queue.
- Specialist Handoffs: each agent does one phase, then passes to the next.
Which fits keeping multiple branches compliant across DIFFERENT regulators,
and why? What breaks if I pick wrong? Where must a human stay in the loop?
```

**2.** Read it. You know the bakery better than the model — agree or push back. The strong answer is usually **one Regulation Monitor per regulator** (each with its own memory of its own rulebook), an **orchestrator that routes by branch location**, and the **allergen/safety human gate still firing inside every monitor**.

### Capture (Section 3 of your Card)

```text
PATTERN I'd use for multi-branch compliance:
↳

BECAUSE:
↳

WHAT BREAKS with the wrong pattern:
↳

WHERE A HUMAN STAYS in the loop, no matter how many branches:
↳
```

### You're done when…
…you've named one pattern, given a one-line reason, and stated where the human gate stays. Bonus if you can say why the *other two* patterns are worse here.

### If Claude over-automates
If it suggests one agent should "manage the whole country launch," push back:
```text
Don't let one agent manage an entire country launch — too much autonomy for a
food-safety system. Keep one monitor per regulator, each with its own memory,
an orchestrator that only ROUTES, and a human gate on every allergen/safety
decision. Redo it with those limits.
```
That pushback *is* the lesson — refusing the over-broad version is the architecture judgment Session 5 teaches.

---

## Your Lumière Agent Architecture Card — complete

| Section | What you designed | Gaps closed (S2) |
|---|---|---|
| **1 — Loop Trace** | Yesterday's agent, read stage by stage | where hallucination starts |
| **2 — Tool Manifest** | Order Assistant + FSSAI Monitor, scoped & triggered | #3 #4 #1 |
| **3 — Pattern Choice** | How the agents coordinate across branches | #5 #1 |

**This is the blueprint for Session 6.** In the EdYoda Agent Builder: your **Loop Trace** shapes the system prompt and step order; your **Tool Manifest** becomes the configured tools + RAG Docs; your **Pattern Choice** decides one agent or a routed set. Bring this workbook.

---

## Take-home (reply to the class email by Friday — two sentences each)

1. The S2 HR Screener invented data because it lacked one component. Which Lumière agent today would hallucinate the same way without it — and what exactly would it invent?
2. In your FSSAI Monitor manifest, name one rule you'd *never* let auto-apply, and the trigger that puts a human in the loop.

---

## What's next — Session 6: EdYoda Agent Builder — Build & Host Your First Agent

Your Architecture Card stops being paper. You'll wire the Lumière Order Assistant as a real, hosted agent — system prompt from your Loop Trace, tools from your Manifest, structure from your Pattern Choice. Bring this workbook.

---

*Written & facilitated by Shantanu Chandra · linkedin.com/in/chandrashantanu*
*EdYoda · GenAI & AI Agents for Non-Coders · S05*
