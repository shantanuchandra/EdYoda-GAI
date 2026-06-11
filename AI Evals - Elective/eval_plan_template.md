# Eval Plan — 1 page · fill this for an agent you own

**Your name:** ________________   **Date:** ____________

## 1. The agent
- **What it does (one line):** _______________________________________________
- **Job-to-be-done for its user:** __________________________________________
- **Modality(ies):** ☐ text ☐ audio ☐ image ☐ video ☐ multimodal

## 2. Does it even need an eval? (circle)
| Question | | |
|---|---|---|
| User-facing? | YES | no |
| High cost of being wrong? | YES | no |
| Open-ended output? | YES | no |
| Will it scale past you? | YES | no |

**2+ YES → build the eval.**  Score: ___ / 4

## 3. Golden set — your test, written before you ship
5–10 cases you already know the right answer to. **Force in a weird one and a hostile one.**

| # | | Input | Expected behavior |
|---|---|---|---|
| 1 | normal | | |
| 2 | normal | | |
| 3 | normal | | |
| 4 | weird | | |
| 5 | hostile | | |
| … | | | |

## 4. Metrics — pick 3, one of each kind
| Kind | Metric | What it measures |
|---|---|---|
| **Correctness** | | |
| **Quality** | | |
| **Safety** | | |

> Audio / image / video agent? Pick modality-appropriate metrics from the **Modality Metrics Reference** in your handbook.

## 5. Judge — who decides, per metric
| Metric | Judge: human / code / LLM | Why this judge |
|---|---|---|
| Correctness | | |
| Quality | | |
| Safety | | |

> If you pick an LLM judge: how will you calibrate it against a human?  ________________

## 6. Pass bar — per metric. Which one is ZERO-tolerance?
| Metric | Pass bar (a number) | Zero-tolerance? |
|---|---|---|
| Correctness | | ☐ |
| Quality | | ☐ |
| Safety | | ☐ |

## 7. Top failure modes to watch (name at least 3)
The specific ways THIS agent breaks. You discover these by running v0 — not by imagining.
1. ____________________________________________________
2. ____________________________________________________
3. ____________________________________________________

---
*Monday: pick the one metric you'll measure first. Build the golden set for it. That's the whole start.*
