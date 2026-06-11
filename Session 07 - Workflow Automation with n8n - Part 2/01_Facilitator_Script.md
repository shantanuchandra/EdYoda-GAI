# Facilitator Script — Workflow Automation with n8n · Part 2: Hardening + Telegram (Session 7 of 8 · Part 2 of 2)

**Subtitle:** *We finish what we started. The Gmail loop gets hardened, then Telegram joins the workflow as a second channel — both inbound and outbound. By the end you'll have a single n8n workflow that takes orders from Gmail OR Telegram, classifies them with Gemini, calls the Lumière backend for a quote, and replies on the same channel the customer wrote in on.*
**Duration:** 120 minutes · **Format:** Live virtual (Zoom/Meet)
**Audience:** Same cohort as S1–S7 Part 1 — mixed India + international; marketing/sales, finance/consulting, at least one doctor. ~6 learners expected. Call everyone by name.
**Spine:** Recap → Harden → Telegram OUT → Telegram IN → One Workflow, Two Channels
**Hands-on share:** ~65% (≈78 min across 3 builds + debrief)
**Build artifact:** The "Lumière Order Watcher" workflow extended — same workflow we shipped in Part 1, now with (a) a stable backend deployment, (b) idempotency + retry hardening, (c) Telegram notification to the bakery owner on every order, (d) a Telegram Trigger that accepts orders from a customer-facing Lumière bot, (e) a channel-aware reply node that answers on Gmail OR Telegram depending on where the order came in.
**Tools:** n8n.cloud (already set up from Part 1) · Gemini API key (already in n8n) · A new **Telegram bot** (we'll create together via BotFather) · The **Lumière backend** — same `server.js`, but moved off localtunnel onto a stable host before class.

> **Why this session exists.** Part 1 left the workflow on three fragile legs: a localtunnel that dies every few hours, no retry behavior, and a single inbound channel. The Part-1 deck *promised* a Telegram approval loop in its title but ran out of time before we got there. Part 2 honors that promise and pushes one step beyond — Telegram as a real second customer channel, not just an internal notification.

---

## Pre-Class Checklist (do this 24 hours before)

- [ ] **Stable backend up.** Deploy `lumiere-bakery-s5-app/server.js` to Render / Railway / Fly free tier. The URL must be HTTPS, stable, and reachable from n8n.cloud. Test the `/api/health` endpoint returns 200. **Have the URL ready to paste into HTTP Request node updates during Block 2.** No more localtunnel.
- [ ] **Telegram BotFather walk-through rehearsed.** Open Telegram on your phone, search `@BotFather`, type `/newbot`, name it something like `LumiereSandboxBot_<yourname>`. Copy the HTTP API token. **You will do this LIVE on screen-share during Block 3 so learners see the real flow.**
- [ ] **Learner's pre-class email sent.** Single line: *"Tomorrow we extend the workflow we shipped last week. Before class: open your published Lumière Bakery workflow in n8n and confirm it still says `Published`. If it says Inactive — message me. No new credentials to set up; we'll create the Telegram bot together in class. See you at [time]."*
- [ ] **Workbook shared as Google Doc** (view-only). Link in calendar invite.
- [ ] **Build the complete Part-2 workflow yourself end-to-end.** Send a test order via Gmail → confirm reply with payment link arrives. Send the same order via Telegram to your bot → confirm reply with payment link arrives in Telegram. The ops Telegram notification should fire on both. You must have done this loop at least twice before class.
- [ ] Pre-load browser tabs in this order:
  1. **n8n.cloud** — your Part-1 workflow, open on canvas, currently Published
  2. **Render/Railway dashboard** showing the stable backend running
  3. **Telegram desktop app** — open to a chat with your own bot
  4. **BotFather chat** — clean state, ready to demo `/newbot`
  5. **Gmail** — test inbox
  6. **Part 2 Learner Workbook** — open to Build A
- [ ] **Confirm Gemini credential still works** in n8n (Settings → Credentials → click the Gemini entry → Test). If it expired, regenerate from AI Studio first.
- [ ] Test screen-share + audio. Mute Slack, email, calendar notifications.
- [ ] Have water, a printed copy of this script, and a visible timer.

---

## Opening Hook Slide (have this up 5 min before class starts)

> **"Part 1 shipped. Part 2 finishes."**

Play soft instrumental music until you start.

---

# THE 120-MINUTE RUN SHEET

> Timings are facilitator-side only. The learner deck and workbook never show minute markers.

---

## BLOCK 0 — RECAP & CONTRACT (0:00–0:15)

**Goal:** Reconnect cohort with what we actually shipped in Part 1 — the working, published workflow — and surface the three honest gaps Part 2 closes today.

### 0:00–0:03 — Cold Open · one-word check-in

*"Welcome back. One word in the chat — how did your week go with your published workflow? Did it fire? Did it crash? Did you forget it existed? Just one honest word."*

→ Wait 30 seconds. Read every word out loud, by name.

*"Thank you [Name]… I'm hearing 'fired twice', 'crashed', 'forgot'. All three are useful data — and all three are part of why today exists."*

### 0:03–0:08 — Where we left off (the honest recap slide)

→ Show the **"Where we left off"** summary slide. It carries a literal screenshot of the workflow canvas from Part 1, with the seven nodes named, plus three labelled red tags marking what's NOT yet there:

| What we shipped in Part 1 | What's still missing |
|---|---|
| ✅ Gmail Trigger watching INBOX every 15 min | ❌ Backend is on a localtunnel that dies every few hours |
| ✅ Keyword IF (cake/order/flavour…) | ❌ No retry if the HTTP call fails — one bad poll = one missed order |
| ✅ Gemini extracting order JSON | ❌ Telegram approval loop we *promised* in the Part-1 title — never built |
| ✅ JS code parsing + missingFields check | ❌ Customer can ONLY order via Gmail — no second channel |
| ✅ HTTP call to `/api/quote` for price + payment link | |
| ✅ Two reply paths: full thank-you OR we-need-more-info | |
| ✅ Workflow Published — polling live | |

*"This is the honest picture. We shipped a real, running thing. We also left three holes — and the Part-1 deck title literally promised one of them. Today we close all three."*

### 0:08–0:15 — Today's contract (the "what we ship today" slide)

→ Show the **"What we ship today"** slide. Three deliverables, in order:

1. **HARDEN** — replace localtunnel with a stable backend URL. Add a single retry on the HTTP node. Make the workflow survive overnight without you watching it. *(15 min)*
2. **TELEGRAM OUT** — every successful order also pings the bakery owner's Telegram with a 1-line digest ("New 1.5kg red velvet for Saturday — ₹1,575 — payment link sent"). *(25 min)*
3. **TELEGRAM IN** — the bakery now accepts orders via a Telegram bot too. Same Gemini extraction, same quote API, but the reply goes back to the Telegram chat instead of email. **One workflow. Two inbound channels. Two reply paths.** *(45 min)*

*"One rule for today: you will not leave with theory. You will leave with a workflow where a customer can DM your bakery on Telegram, get a real cake quote back inside 20 seconds, and where you — the owner — get a Telegram ping every time."*

> ⏱ **Time check: 0:15.** If past 0:17, cut the cold-open read-aloud to three names instead of all six. The recap slide and contract slide are non-negotiable.

---

## BLOCK 1 — HARDEN (0:15–0:30)

**Goal:** Stop pretending localtunnel is acceptable. Move to a real URL. Add retry. Test once. Move on.

### 0:15–0:20 — Concept: Why localtunnel was a teaching crutch

→ Show the **"Three places your backend can live"** slide — three side-by-side cards:

| | Localtunnel (Part 1) | Stable host (today) | Production |
|---|---|---|---|
| **URL** | `wise-taxes-win.loca.lt` | `lumiere-bakery.onrender.com` | `api.lumiere.com` |
| **Lives for** | ~hours | Until you delete it | Forever |
| **Cost** | Free | Free tier | Whatever your CFO signs off on |
| **OK for** | Today's demo only | Cohort homework, beta users | Real customers |

*"Localtunnel is a microphone-cable. Render or Railway is a wireless rig. We're not changing what the backend does — just where it lives. Five minutes."*

### 0:20–0:28 — Build: swap the URL + add retry

→ Open the workflow on screen. Walk through:

1. **Click HTTP Request node** → URL field → paste new stable URL → Save.
2. **Open Settings tab** of the HTTP Request node → **Retry on Fail: ON** → Max Tries 3 → Wait Between Tries 2000ms. *"This is the single most important checkbox in this entire workflow. Without it, one flaky network blip = one lost customer. With it, n8n retries silently and you never hear about it."*
3. **Execute step** — confirm green tick.
4. **Publish.**

> **Why this works:** The retry is a one-checkbox change with massive operational lift. Learners see that "hardening" isn't always a big refactor — sometimes it's the box you forgot to tick.

### 0:28–0:30 — Reflection beat

*"Thirty seconds. What did your team do in production where someone forgot to tick a retry checkbox and you all spent a weekend on a war-room call? Tell me one in the chat — one line."*

→ Read 2-3 responses by name. Move on.

> ⏱ **Time check: 0:30.** Hardening is done. If running long, cut the reflection beat — it's flavour, not load-bearing.

---

## BLOCK 2 — TELEGRAM OUT (0:30–0:55)

**Goal:** The bakery owner gets a Telegram message every time an order completes. Internal notification only — customer is unaffected.

### 0:30–0:38 — Live demo: creating a Telegram bot with BotFather

→ Switch to Telegram desktop app on screen-share. Open chat with `@BotFather`. Live narrate:

1. Type `/newbot`. BotFather asks for a name. Type `Lumière Ops Notifier`.
2. BotFather asks for a username. Type `LumiereOpsNotifier_<yourinitials>Bot`. (Must end in `Bot`. Must be globally unique.)
3. BotFather returns: bot link + **HTTP API token**. *"This token is the bot's password. Treat it like an AWS key — anyone with this token can act as your bot."*
4. Click the bot link → tap **Start** → send `/start`. *"Your bot has now seen one user — you. We need this so the bot is allowed to message you back."*
5. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser tab → find `chat.id` in the JSON. *"Write this number down. n8n needs it to know who to ping."*

*"You'll do this exact thing in five minutes. The token + the chat ID — those are the only two pieces of state you carry forward."*

### 0:38–0:50 — Build: add the ops notifier path

→ On canvas, add a new branch:

1. **From the True branch of If1** (right after the "Reply to a message" success node) → click `+` → search **Telegram** → choose **Send a text message**.
2. **Credential:** Create new → paste the BotFather token → Save as "Lumière BotFather".
3. **Chat ID:** paste the chat ID from the getUpdates JSON.
4. **Text:** Use expression mode and paste:
   ```
   🎂 New order
   {{ $('Code in JavaScript').item.json.flavour }} · {{ $('Code in JavaScript').item.json.size }}
   for {{ $('Code in JavaScript').item.json.deliveryDate }}
   ₹{{ $('HTTP Request').item.json.amount }} — payment link sent
   ```
5. **Execute step** → check Telegram → confirm the formatted message arrives.
6. **Publish.**

### 0:50–0:55 — Debrief: two replies, one trigger

→ Show the **"After Block 2"** slide — the canvas now branches into THREE terminal nodes from one trigger:

```
Gmail Trigger → IF (keyword) → Gemini → Code → IF1 (hasAllRequired)
   ├── true  → HTTP /api/quote → Gmail Reply (customer) + Telegram (owner)
   └── false → Gmail Reply (we-need-more-info)
```

*"One inbound. Three outbound. You've already built one of the load-bearing shapes of automation work — fan-out from a single event into multiple actions. Tattoo this shape."*

> ⏱ **Time check: 0:55.** Now break.

---

## BLOCK 3 — BREAK (0:55–1:05)

→ Switch to the break slide. The 10-min clock auto-counts down on both decks. Mic on hold music.

*"Ten minutes. When you're back, we add the second inbound channel — a customer-facing Telegram bot for the bakery."*

---

## BLOCK 4 — TELEGRAM IN (1:05–1:50)

**Goal:** Customer DMs a different Telegram bot → Gemini extracts the order → same `/api/quote` → reply goes back in the Telegram chat. Same brain, second channel.

### 1:05–1:12 — Concept: One brain, two mouths

→ Show the **"Two mouths"** diagram — a real visual (per the design system rule: a concept slide must SHOW the concept). A hub-and-spoke:

- Center: a single **"Gemini extract → /api/quote"** core
- Two inbound spokes: Gmail Trigger (envelope icon) + Telegram Trigger (paper-plane icon)
- Two outbound spokes: Gmail Reply + Telegram Reply
- The reply spoke fired is determined by the channel the message *came in on* — captured on a `channel` field early in the workflow.

*"This is the architectural move of the whole session. The brain doesn't change. The brain doesn't care whether the customer is on Gmail or Telegram. We pre-tag each message with where it came from, and we use that tag at the end to decide which mouth to speak from."*

### 1:12–1:20 — Live demo: second bot for the customer channel

→ Switch to BotFather. Live narrate:

1. `/newbot` → name `Lumière Bakery — Order Bot` → username `LumiereBakeryOrders_<initials>Bot`.
2. Copy token. Save it as "Lumière Customer Bot" in n8n credentials (separate from the ops notifier — DO NOT reuse).
3. Send `/start` to the bot from your personal Telegram. Confirm.
4. *"Don't grab `chat.id` this time. This bot talks to lots of people — we read each customer's chat ID off the inbound message."*

### 1:20–1:42 — Build: the second inbound spoke

→ On the canvas, add the second inbound chain. (Workbook walks them through this in parallel — facilitator demos.)

1. **Add Telegram Trigger node** (search "Telegram" → "Trigger") → Updates: Message → Credential: Lumière Customer Bot. Test step → DM the bot from your personal Telegram → confirm message appears in n8n output.

2. **Add a Set node** named "Tag channel". Field: `channel` = `"telegram"`. Pass-through everything else. *"This is the tag. It's two lines of config and it's the entire reason we're going to be able to reply on the right channel later."*

3. **Add a second Set node** on the Gmail Trigger output too, named "Tag channel · gmail". Field: `channel` = `"gmail"`. *"Symmetry. Both inbound spokes write the same tag with different values. Now nothing downstream needs to know which spoke fired — it just reads `channel`."*

4. **Add a Merge node** with mode **"Append"** — accepts inputs from BOTH tagged Set nodes. *"This is the funnel. From here on, there's one chain that processes everything."*

5. **Rewire the existing Gemini → Code → IF1 chain** to receive from Merge instead of directly from the first IF. Test step on Merge → confirm output now carries `channel: "gmail"` or `channel: "telegram"` depending on which side triggered.

6. **Update the Gemini prompt** — the prompt already reads the raw message. For Telegram, the `subject` field doesn't exist, so update the prompt to gracefully accept just a body. *(One-line edit in the prompt: `If no subject is present, treat the body as the entire message.`)*

7. **Update the JS code node** — adjust the `messageId` / `threadId` extraction to handle both Gmail (`$('Gmail Trigger').first().json.id`) and Telegram (`$('Telegram Trigger').first().json.message.message_id`). Use the `channel` tag to branch:

   ```js
   const channel = $input.first().json.channel;
   let replyTarget;
   if (channel === 'gmail') {
     const t = $('Gmail Trigger').first().json;
     replyTarget = { channel, messageId: t.id, threadId: t.threadId, replyToEmail: t.from?.value?.[0]?.address };
   } else {
     const t = $('Telegram Trigger').first().json;
     replyTarget = { channel, chatId: t.message.chat.id, telegramMessageId: t.message.message_id };
   }
   // ... rest of existing parse logic, now returns { ...order, ...replyTarget, hasAllRequired, missingFields }
   ```

8. **Add a second IF node** AFTER If1's true branch, before the reply: `{{ $json.channel }}` equals `"telegram"`.

9. **TRUE branch (Telegram)** → **Send a text message** node (Lumière Customer Bot credential) → Chat ID: `{{ $('Code in JavaScript').item.json.chatId }}` → Text:
   ```
   🎂 Your Lumière order is ready
   {{ $('Code in JavaScript').item.json.flavour }} · {{ $('Code in JavaScript').item.json.size }} · {{ $('Code in JavaScript').item.json.deliveryDate }}
   Total: ₹{{ $('HTTP Request').item.json.amount }}
   Pay 50% advance: {{ $('HTTP Request').item.json.paymentUrl }}
   ```

10. **FALSE branch (Gmail)** → wires to your existing Gmail "Reply to a message" node. Untouched.

11. Mirror the same channel branch on the **missing-info** path: Telegram = "Could you tell me your flavour and date?" via Telegram. Gmail = the HTML reply we built in Part 1.

12. **Execute workflow** end-to-end. **Publish.**

### 1:42–1:50 — Live test: side-by-side

→ Phone in one hand (Telegram), Gmail open in the other. Send the same order text on both channels within 30 seconds of each other:
*"Hi — 1.5kg red velvet eggless for Saturday, deliver to Bandra please."*

→ Watch Telegram chime first (lower latency). Watch Gmail thread reply land 15 seconds later. **Same backend, same `/api/quote` call hit twice with the same payload — both customers get the same price.**

*"That's the demo. One workflow. Two customer channels. Two ops notifications. Zero code rewritten between channels."*

> ⏱ **Time check: 1:50.** If the live test fails on screen, switch to the pre-recorded gif on the contingency slide. Do not debug live for more than 90 seconds.

---

## BLOCK 5 — DEBRIEF + WALK-OUT (1:50–2:00)

**Goal:** Anchor what they built into a takeaway sentence each. Bridge cleanly into S8 (Business Cases capstone).

### 1:50–1:55 — Architecture card · v2

→ Show the **"What you actually built"** architecture card — same visual style as the S5 Architecture Card, updated:

```
INBOUND          TAG             EXTRACT + PRICE          ROUTE          REPLY
Gmail Trigger  ─┐                                                       ┌─ Gmail Reply
                ├─ Set channel ─ Merge ─ Gemini ─ Code ─ IF1 ─ HTTP ─ IF─┤
Telegram Trig. ─┘                                                       └─ Telegram Reply
                                                                ↳ Telegram (ops)
```

*"Find the loop trace from your S5 Architecture Card. The same six phases — perceive, reason, tool, observe, reflect, final — are still in this workflow. The Gmail or Telegram trigger is perceive. Gemini is reason. The /api/quote call is tool. The IF1 check is reflect. The reply is final. Workflow automation didn't replace agent architecture — it scaffolded it."*

### 1:55–1:58 — One-word walk-out

*"Same ritual we close every session with. One word in the chat — what's the one piece of your job, your team's, or your business that this workflow could replace tomorrow morning? Just the noun."*

→ Read every response by name. Five seconds each.

### 1:58–2:00 — Bridge to S8

→ Show the **close slide**.

*"Five sessions of building. Two of them on this workflow alone. Next session — the last one — we don't build any new mechanics. Instead, we take the workflow you're now staring at and we ask: what business case at YOUR work does this shape map onto? S8 is identify-design-build-deploy on your own use case. Bring three potential candidates with you next weekend. Last session of the course."*

*"Thanks, everyone. Workflow Published. Customers can DM you now. Try not to break it overnight."*

→ Outro music. Slide stays up. Wait for the room to drain before stopping the recording.

---

## CONTINGENCY GUIDE

| Symptom | Fix |
|---|---|
| Render/Railway backend cold-start takes 30s on first hit | Pre-warm with a curl to `/api/health` right before Block 1 demo. If it still hangs, use the localtunnel as a fallback *but say out loud* "this is temporary — we're not pretending this is the production move." |
| BotFather returns "username already in use" | Append your initials + a digit. Move on within 20 seconds. |
| `getUpdates` returns empty | Confirm the learner clicked "Start" on the bot first. The bot can't see anyone who hasn't started a conversation. |
| Telegram Trigger doesn't fire | Polling mode? Use webhook instead (n8n auto-registers). On cloud, this is one toggle in the node settings. |
| Gemini credential expired | Generate a new key in AI Studio, paste into the existing n8n credential — no need to recreate the credential entry. |
| Live side-by-side test in Block 4 fails | Use the pre-recorded `s7p2-side-by-side.mp4` (record this before class). Don't debug for more than 90 seconds on stage. |
| Learner says "my Part 1 workflow is gone" | n8n cloud auto-saves drafts. Check Workflows list — it's there, just maybe in a different state. Worst case, re-import the JSON from Part 1's session folder. |

---

## Pairing notes

Per the design-system pairing rules, the presenter deck writes a `localStorage` key on every `show()` and the learner deck has a `storage` listener that follows. **Same `slides.length` on both decks.** Use CSS class on learner (`.break-slide`, `.exercise-slide`) and `tag` field on presenter — never hardcoded indices.

---

**Written & maintained by Shantanu Chandra · linkedin.com/in/chandrashantanu**
*EdYoda · GenAI & AI Agents for Non-Coders · S07 Part 2*
