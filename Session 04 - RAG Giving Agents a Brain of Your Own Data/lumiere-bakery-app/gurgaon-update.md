# Gurgaon update — paste this snippet into the editor

> **How to use this file during the S5-bridge live demo:**
>
> 1. Open the app. In the chatbot, ask: *"Do you deliver to my area?"*
> 2. Allow the location permission. The bot will geolocate you to Gurgaon, retrieve from the KB, and **honestly refuse** — there is no Gurgaon branch.
> 3. Switch to the **Admin** tab. With `Lumiere_KB.md` selected, scroll the editor to the **`## Locations & Hours`** section.
> 4. **Paste Block A (below) into that section** as a new branch entry.
> 5. Scroll to the **`## Delivery`** section. **Paste Block B** as a new delivery zone row in the table and append the delivery-time note.
> 6. Click **Save & re-index**. The bot now has Gurgaon in its knowledge base.
> 7. Re-ask the same question. The bot — same agent, no code change — now answers with the branch, distance, and an estimated delivery time.
>
> The point is not that we wrote code. The point is that the model didn't get smarter. **The document got updated.**

---

## Block A — append inside `## Locations & Hours [Locations] [Hours] [Branches]`

```markdown
### Gurgaon Cyber Hub Branch

**Address:** Ground Floor, Cyber Hub, DLF Cyber City, Sector 24, Gurgaon, Haryana 122002
**Phone:** +91 88006 11290
**WhatsApp:** +91 88006 11290
**Hours:**
- Monday–Friday: 8:00 am – 10:00 pm
- Saturday–Sunday: 9:00 am – 11:00 pm
**Notes:** Lumière's first branch outside Mumbai. Same menu, same recipes, baked on-site daily. Seating for 24.
```

---

## Block B — append inside `## Delivery [Delivery] [Zones] [Shipping]`

Add this row to the delivery-zones table:

```markdown
| Gurgaon Cyber Hub | Cyber City, Sector 24, Sushant Lok, Golf Course Road, DLF Phases 1–5, Sector 29 | 122001 – 122018 |
```

Then add this paragraph immediately after the zones table:

```markdown
### Delivery Time Estimate (Gurgaon)

Estimated delivery time from the Gurgaon Cyber Hub branch is based on straight-line distance:

- **Within 2 km:** ~20 minutes
- **2–5 km:** ~30 minutes
- **5–8 km:** ~45 minutes
- **Beyond 8 km:** delivery not available; please self-collect.
```

---

## What to expect after re-indexing

When the user re-asks *"Do you deliver to my area?"* (with location ≈ Cyber Hub coordinates 28.4949, 77.0890), the bot should:

1. Call `get_location` → city = Gurgaon, lat/lng ≈ above.
2. Retrieve from the updated KB → the new Gurgaon branch row + the delivery-time block.
3. Reply along the lines of:
   > *"Yes — Lumière Gurgaon Cyber Hub is open Mon–Fri 8am–10pm and delivers to Cyber City. Based on your location (~0–2 km from the branch), your estimated delivery time is about 20 minutes. (Source: Locations & Hours · Gurgaon Cyber Hub Branch · Delivery Time Estimate)"*

If the location returns somewhere outside the listed Gurgaon zones (e.g. Sohna, Manesar), the bot should refuse — same grounded behavior, new branch, new zones.

---

## Why this demo matters pedagogically

This single arc — refuse, edit doc, re-ask, succeed — lands four S4 ideas at once:

| Idea | What the demo proves |
|---|---|
| **Grounding is honest** | The refusal was not a bug. It was the bot correctly saying "not in my docs." |
| **Knowledge lives in the document** | We didn't retrain anything. We added a section. Done. |
| **The KB Design Sheet is real** | The structural tags ([Locations], [Delivery], [Hours]) are what made retrieval land. |
| **Agentic ≠ magic** | The agent decided to call `get_location` and `retrieve`. Visible in the trace. That decision is what Session 5 unpacks. |
