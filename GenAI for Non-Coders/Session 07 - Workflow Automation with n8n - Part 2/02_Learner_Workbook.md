# Generative AI for Non-Coders — Session 7 Workbook · Part 2

**Workflow Automation with n8n · Part 2: Hardening + Telegram**

---

## How to use this workbook

The **slides** carry the concepts — the two-mouths pattern, the channel tag, the hub-and-spoke shape. **This workbook carries the execution** — what to click, what to paste, what you should see, and what to do when it doesn't behave.

Everything today extends the **same** workflow you published in Part 1 — the Lumière Bakery Gmail watcher. You're not starting from scratch. Open your Part 1 workflow in n8n.cloud before class starts.

**Open before you start:**
- Your **published Lumière Bakery workflow** in n8n.cloud (the one we shipped last week — it should say `● Published` in the top-right)
- **Telegram** on your phone with notifications on
- This workbook, scrolled to **Build A**

---

## What you're shipping today

Three deliverables, in order:

| Build | What you wire | New skill | Deliverable |
|---|---|---|---|
| **A — Harden** | Move backend off localtunnel; add HTTP retry | Production hygiene | The workflow survives overnight without you watching it |
| **B — Telegram OUT** | Add an ops Telegram notification on every order | First Telegram credential; fan-out from True branch | Bakery owner gets a Telegram ping every time |
| **C — Telegram IN** | Customer can also DM a Telegram bot to order | Channel tagging, Merge node, channel-aware replies | One workflow. Two inbound channels. Two reply paths. |

---

## The 2 new nodes — Reference Card

Keep this open. These are the only new nodes you need today.

| Node | Job | The one-sentence rule |
|---|---|---|
| **Telegram (Send a text message)** | Posts a message into a Telegram chat | "Say something on Telegram, to a specific chat ID" |
| **Telegram Trigger** | Starts the workflow when someone DMs your bot | "Listen for a Telegram message coming IN" |
| **Set** *(not new — refresher)* | Adds or sets a field on the data passing through | "Tag the message with where it came from" |
| **Merge (Append)** | Combines streams from two upstream nodes into one downstream chain | "Funnel two inbound spokes into one brain" |

---

## The two-mouths pattern

Our workflow is about to get a second mouth and a second ear. Draw this in your mind before Build C:

```
  EAR 1: Gmail Trigger ──┐
                         │
                         ├─ Tag channel ─ Merge ─ Gemini ─ Code ─ IF1 ─ HTTP ─ IF (channel?)
                         │                                                       │
  EAR 2: Telegram Trig ──┘                                                       │
                                                                                 │
                                                          MOUTH 1: Gmail Reply ──┤
                                                       MOUTH 2: Telegram Reply ──┘
```

The brain in the middle doesn't know or care which ear heard the order. The `channel` tag we stamp at each ear is the only thing that decides which mouth replies. **Same brain. Two ears. Two mouths.**

---

## BUILD A — Harden the foundation
*(~15 min)*

**What & why.** Part 1's backend lived on a `loca.lt` URL that dies after a few hours. That was fine for the demo, fatal for a real workflow. We're moving the backend to a stable host and ticking one checkbox that prevents 90% of overnight failures.

---

### Step A1 — Confirm the stable backend URL

Your facilitator has deployed `server.js` to a stable host (Render or Railway free tier). The URL looks like `https://lumiere-bakery.onrender.com`.

1. Open the URL in your browser → append `/api/health`. You should see:
   ```json
   { "ok": true, "service": "lumiere-s5-backend", "version": 1 }
   ```
2. If you see that JSON, the backend is up. **Write the URL on a sticky note** — you'll paste it in the next step.

> **If you see anything else:** wait 30 seconds (Render free tier cold-starts) and refresh. Still nothing? Raise hand — your facilitator will share the fallback URL.

---

### Step A2 — Update the HTTP Request node

1. Open your **published Lumière Bakery** workflow.
2. Click the **HTTP Request** node (the one calling `/api/quote`).
3. **URL field** → replace the old `https://wise-taxes-win.loca.lt/api/quote` with `https://YOUR-NEW-BACKEND/api/quote`.
4. Click **Execute step** with the existing pinned data. You should see the same quote JSON come back.

> **What you should see:** Same green tick as before, same `paymentUrl` shape — `https://pay.lumiere.demo/order/LUM-...`.

> **If you see 404 or 502:** check the URL has `https://` (not `http://`) and `/api/quote` at the end (not `/api/health`).

---

### Step A3 — Tick the one checkbox that matters

1. Stay in the **HTTP Request** node. Click the **Settings** tab (between Parameters and the right-side panel).
2. Find **Retry on Fail** → toggle **ON**.
3. **Max Tries:** 3. **Wait Between Tries (ms):** 2000.
4. Save the node (click anywhere outside).

> **What this does:** if the call to `/api/quote` fails — backend is rebooting, network blips, anything — n8n quietly retries up to 3 times with 2 seconds between each. You hear nothing. The customer hears nothing. The order goes through.

> **Why this is the single most important checkbox in the whole workflow:** without it, one bad poll = one missed customer = a one-star review you'll spend a week recovering from.

---

### Step A4 — Republish

1. Top-right → click the dropdown caret next to `● Published` → **Publish**.
2. Version name: `v2 — Stable backend + retry hardening`.
3. **Publish.**

✅ Build A done. Backend is stable. Retry is on. Move on.

---

## BUILD B — Telegram OUT (ops notification)
*(~25 min)*

**What & why.** The bakery owner shouldn't have to refresh Gmail to know an order came in. Every successful order also pings their personal Telegram with a 1-line digest. Pure outbound — customers see nothing.

---

### Step B1 — Create the ops bot via BotFather

You'll do this on your phone in Telegram. Your facilitator just demoed the same flow.

1. Open Telegram → search `@BotFather` → open the chat (the verified one with a blue tick).
2. Type `/newbot`. BotFather replies asking for a name.
3. **Name:** `Lumière Ops Notifier` (this is the display name — can have spaces).
4. **Username:** `LumiereOps_<yourinitials><digits>Bot` (must be globally unique, must end in `Bot`). Example: `LumiereOps_SC42Bot`.
5. BotFather returns a message with:
   - A `t.me/...` link to your bot
   - The **HTTP API token** (looks like `7891234567:AAH...long-random-string`)
6. **Copy the token.** Paste it into a temporary note. **Treat it like a password.**

---

### Step B2 — Get your personal chat ID

The bot can only message people who have first started a conversation with it.

1. Tap the `t.me/...` link from BotFather → opens your bot's chat → tap **Start**.
2. In a browser, open: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` *(paste your token without the angle brackets)*.
3. You'll see JSON. Find `"chat":{"id":NNNNNN,...}`. The `id` is your personal chat ID.
4. **Copy it.** Paste into your note alongside the token.

> **If the response is `{"ok":true,"result":[]}`:** you haven't sent a message to the bot yet. Go back to the chat and type literally any word, then refresh.

---

### Step B3 — Add the Telegram credential to n8n

1. In n8n → top-left avatar → **Settings → Credentials → Add credential**.
2. Search **Telegram** → choose **Telegram API**.
3. **Access Token:** paste the BotFather token from your note.
4. **Name:** `Lumière BotFather`.
5. **Save.** n8n shows green "Connection tested successfully."

---

### Step B4 — Add the Telegram node to the True branch

1. Open your workflow. Find the **True branch of If1** — the path that currently goes into "Reply to a message" (the full HTML thank-you).
2. Click the `+` on the OUTPUT of "Reply to a message" → search **Telegram** → choose **Send a text message**.
3. Configure:
   - **Credential:** Lumière BotFather
   - **Chat ID:** paste your personal chat ID (Fixed mode is fine — your own ID is constant)
   - **Text** (switch to Expression mode → paste):
     ```
     🎂 New order
     {{ $('Code in JavaScript').item.json.flavour }} · {{ $('Code in JavaScript').item.json.size }}
     for {{ $('Code in JavaScript').item.json.deliveryDate }}
     ₹{{ $('HTTP Request').item.json.amount }} — payment link sent
     ```
4. Click **Execute step** (using the pinned successful order from Part 1).
5. Check Telegram. The formatted message arrives within 2 seconds.

> **What you should see:** A multi-line message in your bot's chat, with the cake emoji, the flavour and size, the delivery date, and the rupee amount.

> **If nothing arrives:** the credential is wrong. Open the node → re-pick the credential → re-test. If the n8n step is green but Telegram is silent — the chat ID is wrong; re-run `getUpdates`.

---

### Step B5 — Republish

1. Top-right → **Publish** → version name `v3 — Telegram OUT (ops notifier)`.
2. **Publish.**

✅ Build B done. Send yourself a test cake order to Gmail and confirm: customer reply arrives + your Telegram chimes. Two outputs, one trigger.

---

## ☕ BREAK (10 min)

When you're back, we add the second inbound channel.

---

## BUILD C — Telegram IN (customer channel)
*(~45 min)*

**What & why.** Customers can now DM a Telegram bot to place orders. Same Gemini extraction. Same `/api/quote`. The reply comes back on the channel they wrote in on. This is the big architectural move of the session.

---

### Step C1 — Create the customer-facing bot

Same BotFather flow as Build B, but a different bot.

1. `@BotFather` → `/newbot`.
2. **Name:** `Lumière Bakery — Order Bot`.
3. **Username:** `LumiereOrders_<yourinitials><digits>Bot`.
4. Copy the new token (it's a different one — different bot, different token).
5. Add an n8n credential called `Lumière Customer Bot` with this new token.

> **Why two bots?** The ops notifier talks to *you*. The customer bot talks to *customers*. Keeping them separate means you can't accidentally send a customer your internal notification format — and you can revoke either bot's token without affecting the other.

---

### Step C2 — Add the Telegram Trigger

1. On a blank area of the canvas (left side, below the Gmail Trigger), click `+` to add a new starting node.
2. Search **Telegram** → choose **Telegram Trigger**.
3. Configure:
   - **Credential:** Lumière Customer Bot
   - **Updates:** Message
   - **Additional Fields:** leave default
4. Click **Execute step**. n8n shows "Listening for events…".
5. On your phone, open the customer bot's chat (tap the bot link BotFather gave you) → tap **Start** → type:
   ```
   Hi - 1.5kg red velvet eggless for Saturday, deliver to Bandra please.
   ```
6. The Telegram Trigger in n8n turns green. Click it → see the message JSON. You can read:
   - `message.text` — the customer's order text
   - `message.chat.id` — the customer's chat ID (reply target)
   - `message.message_id` — the specific message we're replying to

---

### Step C3 — Tag the channel (two Set nodes)

This is the keystone of the whole pattern. Each inbound spoke writes a tag.

**Set node on the Gmail side:**

1. Click `+` on the OUTPUT of the **Gmail Trigger** (yes, right after it — before the first IF).
2. Search **Set** → choose **Set / Edit Fields**.
3. Configure:
   - **Mode:** Manual Mapping
   - **Include Other Fields:** ON *(critical — this passes the original Gmail payload through)*
   - **Fields to set:** Add one field
     - Name: `channel`
     - Type: String
     - Value: `gmail`
4. Name the node: `Tag · gmail`.

**Set node on the Telegram side:**

5. Click `+` on the OUTPUT of the **Telegram Trigger** → add another **Set / Edit Fields** node.
6. Same config except Value: `telegram`.
7. Name it: `Tag · telegram`.

> **What you should see:** when you execute either tag node, its output JSON now has a `channel` field set to either `gmail` or `telegram`, with all the original fields still intact.

---

### Step C4 — Merge the two streams

1. Add a **Merge** node (search "Merge") downstream of both Set nodes.
2. Configure:
   - **Mode:** Append *(stack inputs into one stream, in order)*
   - **Number of Inputs:** 2
3. Wire `Tag · gmail` → input 1. Wire `Tag · telegram` → input 2.
4. From Merge's output → wire into the **existing first IF node** (the keyword filter).

> **What you should see:** the Merge node now sits between both triggers and the rest of your chain. From here on, downstream nodes get one unified stream and can read `channel` to know where it came from.

---

### Step C5 — Update the keyword IF to handle both shapes

The IF currently reads `$json.subject` and `$json.text`. Telegram messages don't have those — they have `message.text`. Update the expression:

1. Click the first IF node ("Bakery Order Filter" or similar).
2. Find the condition reading `($json.subject + ' ' + ($json.text || ''))...`.
3. Replace with:
   ```
   {{ (($json.subject || '') + ' ' + ($json.text || '') + ' ' + ($json.message?.text || '')).toLowerCase() }}
   ```
4. The regex right-side is unchanged.

> **Why this works:** for Gmail items, `subject` + `text` are populated, `message.text` is undefined → no harm. For Telegram items, only `message.text` is populated. The combined string covers both.

---

### Step C6 — Teach Gemini to read a body-only message

Open the **Message a model** node (Gemini).

1. Find the prompt. It currently expects an email subject + body.
2. Add one line to the prompt (anywhere in the instructions block):
   ```
   If no subject is present, treat the entire body as the message.
   ```
3. Find where you reference the input. Replace `{{ $json.subject }}` / `{{ $json.text }}` references with:
   ```
   {{ $json.subject || '(no subject)' }}
   {{ $json.text || $json.message?.text || '' }}
   ```
4. Execute step on a Telegram-side pinned item → confirm Gemini still returns the same order JSON shape.

---

### Step C7 — Update the JS Code node to carry channel + reply target

Replace the **entire Code** node content with this:

```js
// Parse Gemini's JSON output (unchanged)
const raw = $input.first().json.content?.parts?.[0]?.text || "";
const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
let order = {};
try { order = JSON.parse(cleaned); }
catch (e) { order = { _parseError: e.message, _raw: raw }; }

const required = ["flavour", "size", "deliveryDate", "deliveryAddress"];
const missing = required.filter(k => !order[k]);

// Carry channel + reply target forward
const channel = $input.first().json.channel;
let replyTarget = { channel };

if (channel === "gmail") {
  const t = $("Gmail Trigger").first().json;
  replyTarget.messageId = t.id;
  replyTarget.threadId = t.threadId;
  replyTarget.replyToEmail = t.from?.value?.[0]?.address || t.from?.text || null;
  replyTarget.replyToName  = t.from?.value?.[0]?.name || order.customerName || "there";
  replyTarget.originalSubject = t.subject;
} else if (channel === "telegram") {
  const t = $("Telegram Trigger").first().json;
  replyTarget.chatId = t.message.chat.id;
  replyTarget.telegramMessageId = t.message.message_id;
  replyTarget.replyToName = t.message.from?.first_name || "there";
}

return [{ json: { ...order, ...replyTarget, hasAllRequired: missing.length === 0, missingFields: missing } }];
```

> **Heads-up:** n8n's editor auto-pairs braces. If you get a syntax error after typing fast, copy this whole block from the workbook → paste it as ONE shot using ⌘V (Mac) or Ctrl+V (Windows). Don't type it character by character.

Execute step on both a Gmail-side and a Telegram-side pinned item. Both should output `hasAllRequired: true` (or `false` with the same missing list).

---

### Step C8 — Add the channel-routing IF after If1's TRUE branch

This is the new fork. We already have If1 checking `hasAllRequired`. Now we add a SECOND IF on the success path that checks the channel.

1. On If1's **TRUE** output (the path that currently goes into HTTP → Reply), insert a new IF node between HTTP Request and the existing "Reply to a message".
2. Name it: `Reply via?`.
3. Condition:
   ```
   {{ $('Code in JavaScript').item.json.channel }}   equals   "telegram"   (string)
   ```
4. **TRUE output** → Telegram reply (next step).
5. **FALSE output** → existing "Reply to a message" (Gmail HTML reply, untouched).

---

### Step C9 — Add the Telegram reply node

1. On the `Reply via?` TRUE output → click `+` → **Telegram → Send a text message**.
2. Configure:
   - **Credential:** Lumière Customer Bot
   - **Chat ID** (Expression): `{{ $('Code in JavaScript').item.json.chatId }}`
   - **Reply To Message ID** *(under Additional Fields)*: `{{ $('Code in JavaScript').item.json.telegramMessageId }}`
   - **Text** (Expression):
     ```
     🎂 Your Lumière order is ready

     {{ $('Code in JavaScript').item.json.flavour }} · {{ $('Code in JavaScript').item.json.size }}
     Delivery: {{ $('Code in JavaScript').item.json.deliveryDate }}
     Address: {{ $('Code in JavaScript').item.json.deliveryAddress }}

     Total: ₹{{ $('HTTP Request').item.json.amount }}
     Pay 50% advance: {{ $('HTTP Request').item.json.paymentUrl }}

     We bake fresh — see you Saturday.
     ```
3. Name it: `Reply · telegram`.

---

### Step C10 — Mirror the channel split on the missing-info path

1. Find If1's **FALSE branch** (currently goes into "Reply to a message1" — the missing-info Gmail reply).
2. Insert another IF between If1's false output and the existing missing-info Gmail reply:
   - Name: `Missing-info via?`
   - Condition: `{{ $('Code in JavaScript').item.json.channel }}   equals   "telegram"`
3. **TRUE output** → new Telegram "Send a text message":
   - Credential: Lumière Customer Bot
   - Chat ID: `{{ $('Code in JavaScript').item.json.chatId }}`
   - Reply To Message ID: `{{ $('Code in JavaScript').item.json.telegramMessageId }}`
   - Text:
     ```
     Hi {{ $('Code in JavaScript').item.json.replyToName }} 👋

     We'd love to bake this for you — could you also share:
     {{ ($('Code in JavaScript').item.json.missingFields || []).map(f => '• ' + f).join('\n') }}

     Reply here with the details and I'll send the quote.
     ```
   - Name: `Missing-info · telegram`.
4. **FALSE output** → wires to your existing "Reply to a message1" Gmail node. Untouched.

---

### Step C11 — End-to-end test (side-by-side)

1. **Telegram test:** DM your customer bot:
   ```
   1kg chocolate eggless for next Sunday, deliver to Andheri West
   ```
   You should see, within 5 seconds:
   - A reply in the Telegram chat with the price and payment link
   - A Telegram ping on your Ops Notifier bot

2. **Gmail test:** send yourself an email:
   ```
   Subject: Cake order
   Body: 2kg red velvet for Saturday delivery to Bandra West, eggless please.
   ```
   Within 15 minutes (next poll), you should see:
   - A reply HTML email in your inbox with the price and payment link
   - A Telegram ping on your Ops Notifier bot

3. **Missing-info test (Telegram):**
   ```
   Hi, I want a cake
   ```
   You should see the missing-info Telegram reply listing the four fields we need.

> **If only the ops Telegram fires and the customer reply doesn't:** the `Reply via?` IF is reading the wrong field. Open the node → confirm the expression points to `$('Code in JavaScript').item.json.channel`, not `$json.channel`. (After branching, `$json` refers to whatever flowed through this branch — which after HTTP Request is the quote, not the channel tag. Always pull from the Code node when you need the channel.)

---

### Step C12 — Final publish

1. Top-right → **Publish** → version name `v4 — Telegram IN (customer channel) + ops notifier`.
2. Add a description like: `One workflow. Two inbound channels (Gmail + Telegram). Channel-aware replies. Ops notification on every success.`
3. **Publish.**

✅ Build C done. Your bakery now accepts orders on Telegram.

---

## What you actually built

```
INBOUND          TAG             EXTRACT + PRICE              ROUTE                 REPLY
Gmail Trigger ──┐                                                                  ┌── Gmail Reply
                ├── Set channel ── Merge ── Gemini ── Code ── IF1 ── HTTP ── IF ───┤
Telegram Trig ──┘                                                                  └── Telegram Reply
                                                                          ↳ Telegram (ops)
```

Find the loop trace from your S5 Architecture Card. The same six phases are still here:

| Loop phase | In your workflow |
|---|---|
| Perceive | Gmail Trigger OR Telegram Trigger |
| Reason | Gemini extraction |
| Tool | HTTP `/api/quote` |
| Observe | Code node parses the JSON |
| Reflect | IF1 checks `hasAllRequired` |
| Final | Channel-aware reply (Gmail OR Telegram) |

Workflow automation didn't replace agent architecture — it scaffolded it.

---

## Reference: troubleshooting card

| Symptom | Likely cause | Fix |
|---|---|---|
| Render cold-start delay on the first HTTP call | Free tier sleeps after 15 min idle | Tick "Retry on Fail" — it absorbs the cold start. Or upgrade tier. |
| Telegram bot never sees messages | Customer didn't tap Start first | The bot can only message users who've initiated a conversation. |
| n8n step green, Telegram silent | Wrong Chat ID or wrong credential | Re-run `getUpdates`, re-paste the credential. |
| `channel` field is undefined downstream | Set node has "Include Other Fields" OFF | Toggle it ON — it passes the original payload through with your new field added. |
| Gemini returns garbled JSON on Telegram | Prompt still expects a subject | Add the one-liner from C6: "If no subject, treat body as the entire message." |
| Both channels reply on Gmail | The `Reply via?` IF reads `$json.channel` after HTTP — by then `$json` is the quote | Use `$('Code in JavaScript').item.json.channel` everywhere channel is referenced post-HTTP. |
| Reply message format breaks | n8n's editor auto-paired a brace | Paste the text as one shot — don't hand-type expressions with `{{ }}` inside JSON. |

---

**Written & maintained by Shantanu Chandra · [linkedin.com/in/chandrashantanu](https://linkedin.com/in/chandrashantanu)**
*EdYoda · GenAI & AI Agents for Non-Coders · S07 Part 2*
