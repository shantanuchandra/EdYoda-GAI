# Lumière Bakery — Ground Truth Knowledge Base

> Single source of truth for the order-triage workflow. The classifier reasons against
> these rules; the price node prices against this catalogue. Edit here, and the workflow
> follows. Version: S6 canon · ₹ INR.

---

## 1. Catalogue & Pricing

Standard tier sits inside **₹800–₹6,000**. Anything a customer asks for outside that band
is an escalation (see §3).

### Flavours (base price by size)

| Flavour key      | Aliases (fuzzy-matched)                              | 500 g | 1 kg  |
|------------------|-----------------------------------------------------|-------|-------|
| `chocolate_fudge`| chocolate, choco, choc fudge, dark chocolate, fudge | 580   | 1100  |
| `red_velvet`     | red velvet, velvet, redvelvet                       | 620   | 1180  |
| `mango_coconut`  | mango, mango coconut, coconut, tropical             | 550   | 1050  |
| `vanilla_sponge` | vanilla, sponge, classic vanilla, plain             | 520   | 1000  |
| `butterscotch`   | butterscotch, caramel, toffee                       | 600   | 1150  |

### Size keys (fuzzy-matched)

| Size key | Aliases                          |
|----------|----------------------------------|
| `500g`   | 500g, half kg, 0.5 kg, 500 grams |
| `1kg`    | 1kg, 1 kg, one kg, 1000g, kilo   |

### Surcharges

| Surcharge      | Amount | Trigger                                    |
|----------------|--------|--------------------------------------------|
| Eggless        | +80    | `eggless: true`                            |
| Tiered (per extra tier above 1) | +400 | each tier beyond the first    |

### Fuzzy-match policy

- Match the customer's free-text flavour against the **aliases** column, case-insensitive,
  punctuation-stripped. Pick the flavour with the most alias-token overlap.
- A match is **confident** only if at least one alias token is fully contained in the
  customer text. A near-miss (no alias token contained) is **NOT** a match.
- **No confident match → do not guess a price.** Set `priceConfidence: "none"` and route
  to the human gate. Never silently default an unknown flavour to a real price.

---

## 2. Operating Facts

| Fact                | Value                                              |
|---------------------|----------------------------------------------------|
| Standard lead time  | 72 hours minimum from order to pickup/delivery     |
| Delivery fee        | Flat ₹120 within city; pickup is free              |
| Order ID format     | `LUM-` + base-36 timestamp, uppercase              |
| Confirmation SLA    | "We'll confirm your slot within 2 hours."          |
| Out of scope        | Savoury items, multi-day catering, alcohol-infused |

---

## 3. Classifier Rules — when a human must approve

Classify an order as **`human_gate: true`** (route to manager via Telegram) if **ANY** of
these apply. Otherwise `human_gate: false` (auto-confirm).

1. **Dietary restriction** mentioned — dairy-free, nut-free, vegan, gluten-free, or any allergy.
2. **Lead time under 72 hours** — pickup/delivery date is sooner than 3 days out.
3. **Budget outside ₹800–₹6,000** — stated budget below ₹800 or above ₹6,000.
4. **Complex build** — fondant, sculpted, or **3+ tiers**.
5. **Unusual / imported** — flavour not in the §1 catalogue, imported ingredients, or an
   unusual flavour combination.
6. **No confident price match** — fuzzy match returned `priceConfidence: "none"` (§1 policy).

If none apply, the order is standard: auto-price and auto-confirm.

---

## 4. Reply Templates & Voice

**Voice:** warm, specific, never robotic. Always reference the actual order detail
(flavour, size, date). Sign off as *Lumière Bakery*.

### Confirmation (standard, auto-approved)

> Dear {customer},
>
> Thank you for your order with Lumière! We've got your {size} {flavour} cake noted for
> {date}. Your total comes to ₹{amount}{eggless_note}.
>
> We'll confirm your slot within 2 hours.
>
> Warmly,
> Lumière Bakery

### Confirmation (complex, after manager approval)

> Dear {customer},
>
> Wonderful news — our team has reviewed your custom request and we'd love to make it.
> {one specific line about the custom element.}
>
> We'll confirm your slot within 2 hours.
>
> Warmly,
> Lumière Bakery

### Decline (manager rejected)

> Dear {customer},
>
> Thank you for thinking of Lumière. Unfortunately we're unable to take on this particular
> request right now. We'd genuinely love to bake for you another time — do reach out for
> your next occasion.
>
> Warmly,
> Lumière Bakery

---

*Maintained by Shantanu Chandra · the workflow reads this file as its ground truth.*
