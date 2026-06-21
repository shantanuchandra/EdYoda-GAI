"""Build the Chain-of-Thought + Tree-of-Thought exercise PDF for live ChatGPT delivery."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted,
)
from reportlab.lib.colors import HexColor

OUTPUT = "/Users/shantanuchandra/Downloads/Personal/EdYoda - GAI/CoT_ToT_Exercise_Live_ChatGPT.pdf"

styles = getSampleStyleSheet()

H1 = ParagraphStyle(
    "H1", parent=styles["Heading1"],
    fontName="Helvetica-Bold", fontSize=22, leading=28,
    spaceBefore=18, spaceAfter=12, textColor=HexColor("#111111"),
)
H2 = ParagraphStyle(
    "H2", parent=styles["Heading2"],
    fontName="Helvetica-Bold", fontSize=15, leading=20,
    spaceBefore=14, spaceAfter=8, textColor=HexColor("#222222"),
)
BODY = ParagraphStyle(
    "Body", parent=styles["BodyText"],
    fontName="Helvetica", fontSize=11, leading=16,
    spaceAfter=8, alignment=TA_LEFT, textColor=HexColor("#222222"),
)
CODE = ParagraphStyle(
    "Code", parent=styles["Code"],
    fontName="Courier", fontSize=9.5, leading=13,
    leftIndent=10, rightIndent=10,
    backColor=HexColor("#F4F4F4"),
    borderColor=HexColor("#DDDDDD"), borderWidth=0.5, borderPadding=8,
    spaceBefore=4, spaceAfter=10,
)
SAMPLE = ParagraphStyle(
    "Sample", parent=styles["BodyText"],
    fontName="Helvetica", fontSize=10, leading=14,
    leftIndent=12, rightIndent=12,
    backColor=HexColor("#FAFAF2"),
    borderColor=HexColor("#E5E0C8"), borderWidth=0.5, borderPadding=8,
    spaceBefore=4, spaceAfter=10, textColor=HexColor("#333333"),
)


def p(text, style=BODY):
    return Paragraph(text, style)


def prompt_block(text):
    # Pre-escape XML-sensitive chars for Paragraph rendering inside CODE style.
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    safe = safe.replace("\n", "<br/>")
    return Paragraph(safe, CODE)


def sample_block(text):
    # Sample text is authored with intentional <b> and <br/> tags. Convert newlines
    # to <br/> but leave inline markup intact. Ampersands not part of an entity must
    # still be escaped, but our authored text uses none.
    safe = text.replace("\n", "<br/>")
    return Paragraph(safe, SAMPLE)


story = []

# =========================================================
# COVER
# =========================================================
story.append(p("Chain-of-Thought + Tree-of-Thought", H1))
story.append(p("Live Exercise on ChatGPT", H2))
story.append(p(
    "This worksheet walks you through the same business problem solved four ways: "
    "a naive prompt, a basic Chain-of-Thought (CoT) prompt, a structured CoT prompt, "
    "and finally a Tree-of-Thought (ToT) prompt where the model explores multiple options before "
    "committing. You will run every prompt on ChatGPT yourself and compare the outputs.",
))
story.append(p(
    "Pick <b>one</b> track and stay with it for all four rounds. Then, time permitting, "
    "run the other track to see CoT and ToT generalize across domains.",
))
story.append(p("CoT vs ToT in one line", H2))
story.append(p(
    "<b>CoT</b> = think through <i>one</i> line of reasoning, step by step.<br/>"
    "<b>ToT</b> = generate <i>multiple</i> candidate lines of reasoning, evaluate them against criteria, "
    "then pick the best one. Use ToT when several plausible answers exist and the choice itself "
    "is the hard part."
))
story.append(p("How to use this worksheet", H2))
story.append(p(
    "1. Open ChatGPT in a new tab.<br/>"
    "2. Start a fresh chat for each round so previous reasoning does not leak in.<br/>"
    "3. Copy the prompt <b>exactly</b> as written.<br/>"
    "4. Read the model output. Compare it against the <i>What to look for</i> notes.<br/>"
    "5. Bring observations back to the room for debrief."
))

story.append(PageBreak())

# =========================================================
# TRACK A — FINANCE
# =========================================================
story.append(p("Track A — Finance", H1))
story.append(p("Scenario", H2))
story.append(p(
    "You are an analyst at a mid-sized retail company. Leadership wants a quick read on "
    "whether a proposed price change on a hero SKU will hit the quarterly margin target. "
    "You have last quarter's numbers and a few proposed changes. You need a defensible answer."
))

story.append(p("The shared business context (used in all three rounds)", H2))
story.append(prompt_block(
    "Context:\n"
    "- Product: Premium Wireless Earbuds (SKU EB-200)\n"
    "- Current selling price: Rs 4,000 per unit\n"
    "- Variable cost per unit: Rs 2,600\n"
    "- Last quarter units sold: 12,000\n"
    "- Fixed costs allocated to this SKU per quarter: Rs 48,00,000\n"
    "- Proposed change next quarter: drop price to Rs 3,600 to compete with a new entrant\n"
    "- Marketing estimates the price drop will lift units sold by 25%\n"
    "- Quarterly operating margin target for this SKU: 15%"
))

# ---- Round 1
story.append(p("Round 1 — Naive prompt", H2))
story.append(p("Paste this into a fresh ChatGPT chat:"))
story.append(prompt_block(
    "Given the context below, should we make the price change? Answer yes or no and tell me the margin.\n\n"
    "Context:\n"
    "- Product: Premium Wireless Earbuds (SKU EB-200)\n"
    "- Current selling price: Rs 4,000 per unit\n"
    "- Variable cost per unit: Rs 2,600\n"
    "- Last quarter units sold: 12,000\n"
    "- Fixed costs allocated to this SKU per quarter: Rs 48,00,000\n"
    "- Proposed change next quarter: drop price to Rs 3,600\n"
    "- Marketing estimates units sold will lift by 25%\n"
    "- Quarterly operating margin target: 15%"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- A confident yes/no with a single margin number<br/>"
    "- No visible working<br/>"
    "- You cannot tell where the number came from or whether it is correct<br/>"
    "- If two students get different answers, neither can defend theirs"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "Yes, make the price change. With a 25% lift in units, revenue grows and the margin "
    "comes in around 17%, above your 15% target. Recommend proceeding."
))

# ---- Round 2
story.append(p("Round 2 — Basic Chain-of-Thought", H2))
story.append(p("New chat. Paste this:"))
story.append(prompt_block(
    "Think step by step before giving your final answer. Show each calculation on its own line.\n\n"
    "Question: Given the context below, should we make the price change? "
    "Compute the new operating margin and compare it to the 15% target.\n\n"
    "Context:\n"
    "- Product: Premium Wireless Earbuds (SKU EB-200)\n"
    "- Current selling price: Rs 4,000 per unit\n"
    "- Variable cost per unit: Rs 2,600\n"
    "- Last quarter units sold: 12,000\n"
    "- Fixed costs allocated to this SKU per quarter: Rs 48,00,000\n"
    "- Proposed change next quarter: drop price to Rs 3,600\n"
    "- Marketing estimates units sold will lift by 25%\n"
    "- Quarterly operating margin target: 15%"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- Visible arithmetic: new units, new revenue, new variable cost, contribution, operating profit, margin %<br/>"
    "- You can now audit each line<br/>"
    "- The recommendation is tied to a number you can check"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "Step 1: New units = 12,000 x 1.25 = 15,000<br/>"
    "Step 2: New revenue = 15,000 x 3,600 = Rs 5,40,00,000<br/>"
    "Step 3: New variable cost = 15,000 x 2,600 = Rs 3,90,00,000<br/>"
    "Step 4: Contribution = 5,40,00,000 - 3,90,00,000 = Rs 1,50,00,000<br/>"
    "Step 5: Operating profit = 1,50,00,000 - 48,00,000 = Rs 1,02,00,000<br/>"
    "Step 6: Operating margin = 1,02,00,000 / 5,40,00,000 = 18.9%<br/>"
    "Conclusion: 18.9% is above the 15% target. Recommend the price change."
))

# ---- Round 3
story.append(p("Round 3 — Structured Chain-of-Thought", H2))
story.append(p("New chat. Paste this:"))
story.append(prompt_block(
    "Solve this in four labeled steps. Do not skip a step. Do not give the answer until STEP 4.\n\n"
    "STEP 1 - RESTATE: List the known numbers and the question in your own words.\n"
    "STEP 2 - BASELINE: Compute current quarter revenue, variable cost, contribution, "
    "operating profit and operating margin.\n"
    "STEP 3 - SCENARIO: Compute the same five numbers under the proposed price change.\n"
    "STEP 4 - DECISION: Compare the scenario margin to the 15% target. State the recommendation, "
    "two risks of trusting the marketing 25% lift estimate, and one piece of data you would want "
    "before committing.\n\n"
    "Context:\n"
    "- Product: Premium Wireless Earbuds (SKU EB-200)\n"
    "- Current selling price: Rs 4,000 per unit\n"
    "- Variable cost per unit: Rs 2,600\n"
    "- Last quarter units sold: 12,000\n"
    "- Fixed costs allocated to this SKU per quarter: Rs 48,00,000\n"
    "- Proposed change next quarter: drop price to Rs 3,600\n"
    "- Marketing estimates units sold will lift by 25%\n"
    "- Quarterly operating margin target: 15%"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- Baseline and scenario are both shown, so you can see <i>how much</i> the change moves the needle<br/>"
    "- The recommendation now carries caveats: what if the 25% lift does not land?<br/>"
    "- You can hand this to a finance lead without re-doing the work"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "<b>STEP 1 - RESTATE:</b> We sell EB-200 at Rs 4,000, variable cost Rs 2,600, "
    "last quarter 12,000 units, fixed cost Rs 48,00,000. We want to know if dropping price to "
    "Rs 3,600 with an expected 25% unit lift keeps us above a 15% operating margin.<br/><br/>"
    "<b>STEP 2 - BASELINE:</b><br/>"
    "Revenue = 12,000 x 4,000 = Rs 4,80,00,000<br/>"
    "Variable cost = 12,000 x 2,600 = Rs 3,12,00,000<br/>"
    "Contribution = Rs 1,68,00,000<br/>"
    "Operating profit = 1,68,00,000 - 48,00,000 = Rs 1,20,00,000<br/>"
    "Operating margin = 1,20,00,000 / 4,80,00,000 = 25.0%<br/><br/>"
    "<b>STEP 3 - SCENARIO:</b><br/>"
    "Units = 15,000<br/>"
    "Revenue = Rs 5,40,00,000<br/>"
    "Variable cost = Rs 3,90,00,000<br/>"
    "Contribution = Rs 1,50,00,000<br/>"
    "Operating profit = Rs 1,02,00,000<br/>"
    "Operating margin = 18.9%<br/><br/>"
    "<b>STEP 4 - DECISION:</b> Margin drops from 25.0% to 18.9% but still clears the 15% target, so the "
    "change is defensible on paper. Risks: (1) the 25% lift is a marketing estimate, not a tested number "
    "- if actual lift is only 10%, margin falls to roughly 13% and misses target; (2) competitor may "
    "re-cut price again, eroding the lift. Before committing, I would want a price elasticity read from "
    "the last comparable promotion."
))

# ---- Round 4 — Tree-of-Thought (Finance)
story.append(p("Round 4 — Tree-of-Thought (ToT)", H2))
story.append(p(
    "CoT walks down a single line of reasoning. Tree-of-Thought asks the model to <i>branch</i> - "
    "generate several distinct options, evaluate each against criteria, and only then commit. "
    "Use this when the real question is not 'compute X', but 'which of these is the right move'."
))
story.append(p("New chat. Paste this:"))
story.append(prompt_block(
    "You will solve this as a tree of options, not a single chain.\n\n"
    "STEP 1 - BRANCH: Propose THREE distinct pricing strategies for next quarter. They must be "
    "meaningfully different from each other (not three flavours of the same idea). For each option, "
    "give it a one-line name and a one-line description.\n\n"
    "STEP 2 - EVALUATE: For each of the three options, compute:\n"
    "  (a) projected units, revenue, contribution, operating profit, operating margin %\n"
    "  (b) whether it clears the 15% operating margin target\n"
    "  (c) one upside if it works\n"
    "  (d) one downside if the demand assumption is wrong\n\n"
    "STEP 3 - SCORE: Rank the three options on a 1-5 scale across these criteria: "
    "margin headroom, demand risk, competitive durability. Show the scores in a small table.\n\n"
    "STEP 4 - PICK: Choose ONE option as the recommendation. Justify why it beats the other two, "
    "not just why it is good on its own. State the one piece of data that would flip your pick.\n\n"
    "Context:\n"
    "- Product: Premium Wireless Earbuds (SKU EB-200)\n"
    "- Current selling price: Rs 4,000 per unit\n"
    "- Variable cost per unit: Rs 2,600\n"
    "- Last quarter units sold: 12,000\n"
    "- Fixed costs allocated to this SKU per quarter: Rs 48,00,000\n"
    "- A new competitor has entered at Rs 3,500\n"
    "- Quarterly operating margin target: 15%\n"
    "- Assume any price change has a demand response you must estimate and state explicitly"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- Three <i>genuinely different</i> strategies (e.g. price drop, hold-and-bundle, premium hold + spend)<br/>"
    "- Numbers computed for all three, not just the recommended one<br/>"
    "- An explicit comparison - the model defending why option B beats A and C, not just praising B<br/>"
    "- A 'what would flip my pick' line, which forces the model to name the load-bearing assumption"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "<b>STEP 1 - BRANCH:</b><br/>"
    "Option A - 'Match the entrant': drop price to Rs 3,600, expect ~25% unit lift.<br/>"
    "Option B - 'Hold price, add a bundle': keep Rs 4,000 but ship with a Rs 400-cost charging case "
    "at no extra price, expect ~10% unit lift, variable cost rises to Rs 3,000.<br/>"
    "Option C - 'Premium hold + spend': keep Rs 4,000, pour Rs 20,00,000 incremental marketing into "
    "lifestyle positioning, expect ~8% unit lift, treat marketing spend as additional fixed cost.<br/><br/>"
    "<b>STEP 2 - EVALUATE:</b><br/>"
    "Option A: 15,000 units, Rev 5.40 Cr, VC 3.90 Cr, Contrib 1.50 Cr, OP 1.02 Cr, Margin 18.9%. "
    "Clears 15%. Upside: defends volume. Downside: if lift is only 10%, margin falls near 13%.<br/>"
    "Option B: 13,200 units, Rev 5.28 Cr, VC 3.96 Cr, Contrib 1.32 Cr, OP 84 lakh, Margin 15.9%. "
    "Just clears 15%. Upside: protects price perception. Downside: thin margin, fragile to any cost creep.<br/>"
    "Option C: 12,960 units, Rev 5.18 Cr, VC 3.37 Cr, Contrib 1.81 Cr, OP 1.13 Cr (after extra Rs 20 L spend), "
    "Margin 21.8%. Clears 15% comfortably. Upside: best margin. Downside: hardest to attribute, "
    "and competitor still owns the value perception.<br/><br/>"
    "<b>STEP 3 - SCORE (1-5, higher is better):</b><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;Option&nbsp;|&nbsp;Margin headroom&nbsp;|&nbsp;Demand risk&nbsp;|&nbsp;Competitive durability<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;3&nbsp;&nbsp;|&nbsp;2&nbsp;&nbsp;|&nbsp;2<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;2&nbsp;&nbsp;|&nbsp;4&nbsp;&nbsp;|&nbsp;4<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;5&nbsp;&nbsp;|&nbsp;3&nbsp;&nbsp;|&nbsp;3<br/><br/>"
    "<b>STEP 4 - PICK:</b> Option B beats A because A bets the margin on an aggressive 25% lift that "
    "has never been tested; B holds price perception and still clears target. B beats C because C "
    "spends Rs 20 L upfront on brand work whose payback we cannot measure inside one quarter. "
    "B is the safest path to clearing 15% without leaking pricing power. Flip condition: if a "
    "real elasticity test shows the 25% lift in A is achievable, A becomes the better pick because "
    "its margin upside is higher."
))

story.append(p("Track A debrief — what just happened", H2))
story.append(p(
    "Round 1 gave you a number you could not defend. Round 2 gave you a number you could audit. "
    "Round 3 gave you a number plus risks. Round 4 gave you something different in kind: a "
    "<i>comparison</i> across alternatives, with the load-bearing assumption named. That is what "
    "leadership actually wants when the question is 'which move do we make'. Same model, same "
    "context, four very different artifacts. The difference is the prompt."
))

story.append(PageBreak())

# =========================================================
# TRACK B — MARKETING
# =========================================================
story.append(p("Track B — Marketing", H1))
story.append(p("Scenario", H2))
story.append(p(
    "You run growth at a Direct-to-Consumer skincare brand. A new product launches in three weeks. "
    "Last launch underperformed. Leadership wants a launch plan recommendation that is more than vibes."
))

story.append(p("The shared business context (used in all three rounds)", H2))
story.append(prompt_block(
    "Context:\n"
    "- Brand: 'Lumen' - mid-premium DTC skincare, India\n"
    "- New product: Vitamin C + Niacinamide Serum, Rs 1,200, 30ml\n"
    "- Target customer: women 25-40, urban, already use serums, follow skincare creators on Instagram\n"
    "- Channels available: Instagram (organic + paid), email list of 80,000, influencer network of 25 micro-creators (10k-80k followers), brand website with 1.2 lakh monthly visits\n"
    "- Budget for launch month: Rs 12,00,000\n"
    "- Last launch result: 1,800 units sold in launch month, against a 4,000 unit target\n"
    "- Top reason cited for miss: 'category was too crowded, message did not differentiate'\n"
    "- Goal for this launch: 5,000 units in launch month"
))

# ---- Round 1
story.append(p("Round 1 — Naive prompt", H2))
story.append(p("Paste this into a fresh ChatGPT chat:"))
story.append(prompt_block(
    "Given the context below, what should our launch plan be? Give me a recommendation.\n\n"
    "Context:\n"
    "- Brand: 'Lumen' - mid-premium DTC skincare, India\n"
    "- New product: Vitamin C + Niacinamide Serum, Rs 1,200, 30ml\n"
    "- Target customer: women 25-40, urban, already use serums\n"
    "- Channels: Instagram, email list 80,000, 25 micro-influencers, website 1.2L monthly visits\n"
    "- Budget: Rs 12,00,000\n"
    "- Last launch: 1,800 units vs 4,000 target. Miss reason: not differentiated\n"
    "- Goal: 5,000 units in launch month"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- A generic 'do Instagram + influencers + email' list<br/>"
    "- No diagnosis of <i>why</i> last launch failed<br/>"
    "- No budget split, no funnel math, no message angle<br/>"
    "- Two students will get two different but equally vague plans"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "Launch plan: build hype on Instagram with teaser reels, work with your 25 micro-influencers to "
    "create unboxing content, send a launch email to your list with a discount, and run paid ads to "
    "retarget website visitors. Make sure the messaging is clear and differentiated. With Rs 12L "
    "budget you should be able to hit 5,000 units."
))

# ---- Round 2
story.append(p("Round 2 — Basic Chain-of-Thought", H2))
story.append(p("New chat. Paste this:"))
story.append(prompt_block(
    "Think step by step before recommending. Show your reasoning.\n\n"
    "Question: Given the context, propose a launch plan that gets us to 5,000 units. "
    "Walk through (a) why the last launch probably missed, (b) what funnel math 5,000 units implies, "
    "(c) how the Rs 12,00,000 budget should split across channels, and (d) the single message angle "
    "that would differentiate. Then state the recommendation.\n\n"
    "Context:\n"
    "- Brand: 'Lumen' - mid-premium DTC skincare, India\n"
    "- New product: Vitamin C + Niacinamide Serum, Rs 1,200, 30ml\n"
    "- Target customer: women 25-40, urban, already use serums\n"
    "- Channels: Instagram (organic + paid), email 80,000, 25 micro-influencers, website 1.2L monthly visits\n"
    "- Budget: Rs 12,00,000\n"
    "- Last launch: 1,800 units vs 4,000 target. Reason: not differentiated\n"
    "- Goal: 5,000 units in launch month"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- A diagnosis of the previous miss, not just a restatement<br/>"
    "- Real funnel arithmetic: visits, conversion rate, units<br/>"
    "- A budget split with rupee figures, not percentages in the air<br/>"
    "- A specific message angle, not 'be differentiated'"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "Step 1 - Diagnosis: 'not differentiated' usually means the product was sold on ingredients "
    "(Vit C + Niacinamide) that every competitor also claims. Need an angle that is not about the molecule.<br/>"
    "Step 2 - Funnel math: 5,000 units at Rs 1,200 = Rs 60L revenue. At a 2.5% site conversion, "
    "5,000 units needs 2,00,000 product-page visits in the month. Existing 1.2L visits get us 3,000 "
    "units at best, so we need ~80,000 incremental qualified visits from paid + influencers + email.<br/>"
    "Step 3 - Budget split (Rs 12L total): Instagram paid Rs 5L (retarget + lookalike), Influencer "
    "activations Rs 4L (25 creators x ~Rs 16k avg), Email + lifecycle Rs 50k (tooling/creative), "
    "Creative production Rs 1.5L, Sampling / first-50-buyers PR kit Rs 1L.<br/>"
    "Step 4 - Message angle: instead of 'Vitamin C + Niacinamide', lead with a use-case promise - "
    "'the serum for the 2pm dullness, not the 2am skincare routine'. Position around when it is used, "
    "not what is in it.<br/>"
    "Recommendation: ship the plan above, hold Rs 1L back for week-2 reallocation to the best-performing channel."
))

# ---- Round 3
story.append(p("Round 3 — Structured Chain-of-Thought", H2))
story.append(p("New chat. Paste this:"))
story.append(prompt_block(
    "Solve this in four labeled steps. Do not skip a step. Do not give the recommendation until STEP 4.\n\n"
    "STEP 1 - DIAGNOSE: In your own words, explain why the last launch likely missed, beyond "
    "'not differentiated'. Name two specific failure modes.\n"
    "STEP 2 - FUNNEL MATH: Starting from the 5,000 unit goal, work backwards to the visits, "
    "conversion rate, and incremental traffic the plan needs. State the assumptions you used.\n"
    "STEP 3 - PLAN: Allocate the Rs 12,00,000 across channels with rupee amounts. For each channel, "
    "state what you expect it to contribute in units and why.\n"
    "STEP 4 - RECOMMEND: Give the final plan. Include the differentiating message angle, two "
    "leading indicators you would check in week 1, and the single thing you would cut if the budget "
    "got slashed by 30%.\n\n"
    "Context:\n"
    "- Brand: 'Lumen' - mid-premium DTC skincare, India\n"
    "- New product: Vitamin C + Niacinamide Serum, Rs 1,200, 30ml\n"
    "- Target customer: women 25-40, urban, already use serums\n"
    "- Channels: Instagram (organic + paid), email 80,000, 25 micro-influencers, website 1.2L monthly visits\n"
    "- Budget: Rs 12,00,000\n"
    "- Last launch: 1,800 units vs 4,000 target. Reason cited: not differentiated\n"
    "- Goal: 5,000 units in launch month"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- A real diagnosis with two named failure modes, not 'crowded category'<br/>"
    "- Funnel math you can stress-test<br/>"
    "- A budget split tied to expected units per channel, with reasoning<br/>"
    "- Leading indicators - the markers of whether the plan is working in week 1, not at the end<br/>"
    "- A 'what would I cut' answer, which forces ranked priorities"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "<b>STEP 1 - DIAGNOSE:</b> Two failure modes likely: (1) the launch sold the ingredient stack, "
    "which every competitor also sells, so the ad felt like one of many; (2) the existing 1.2L monthly "
    "site visitors are mostly returning customers from prior SKUs, so 'launch traffic' was actually "
    "the same audience seeing a new product, not new demand entering the funnel.<br/><br/>"
    "<b>STEP 2 - FUNNEL MATH:</b> 5,000 units needs ~2,00,000 product-page visits at a 2.5% PDP "
    "conversion. Of those, ~50,000 can come from existing site visitors and email (warm), the other "
    "~1,50,000 must come from paid + influencer-driven traffic (cold-to-warm). Assumes Rs 1,200 AOV "
    "holds, no bundling, no heavy discount.<br/><br/>"
    "<b>STEP 3 - PLAN (Rs 12,00,000):</b><br/>"
    "- Instagram paid Rs 5,00,000 - retarget + lookalike, target ~1,00,000 incremental visits, "
    "expected ~2,500 units<br/>"
    "- Influencer activations Rs 4,00,000 - 25 micro-creators with use-case content, target ~50,000 "
    "qualified visits, expected ~1,200 units<br/>"
    "- Email + lifecycle Rs 50,000 - 3-email launch flow to 80,000 list, expected ~700 units<br/>"
    "- Creative + sampling Rs 2,50,000 - PDP video, hero static, first-100-buyer PR kits for "
    "earned content, expected ~600 units lift across other channels<br/><br/>"
    "<b>STEP 4 - RECOMMEND:</b> Lead with a use-case angle: 'the serum for the 2pm dullness'. "
    "Position by occasion, not ingredient. Week-1 leading indicators: (i) PDP conversion rate vs "
    "the 2.5% assumption, (ii) cost per qualified site visit from paid Instagram. If budget is cut "
    "by 30%, cut the PR kit / sampling spend first - it drives earned lift but is the hardest to "
    "attribute, so it dies first in a tight quarter."
))

# ---- Round 4 — Tree-of-Thought (Marketing)
story.append(p("Round 4 — Tree-of-Thought (ToT)", H2))
story.append(p(
    "In Round 3 the model wrote one good plan. In Round 4 we ask it to surface three meaningfully "
    "different launch strategies, score them, and defend one against the other two. This is closer "
    "to how a growth lead actually thinks before committing budget."
))
story.append(p("New chat. Paste this:"))
story.append(prompt_block(
    "You will solve this as a tree of options, not a single chain.\n\n"
    "STEP 1 - BRANCH: Propose THREE distinct launch strategies for this product. They must be "
    "meaningfully different in approach (e.g. different channel mix, different message angle, "
    "different audience). Give each a one-line name and a one-line description.\n\n"
    "STEP 2 - EVALUATE: For each of the three strategies, lay out:\n"
    "  (a) projected funnel: incremental qualified visits, conversion rate assumption, expected units\n"
    "  (b) rupee split of the Rs 12,00,000 budget across channels\n"
    "  (c) the single biggest risk to that strategy\n"
    "  (d) the leading indicator you would check in week 1 to know it is working\n\n"
    "STEP 3 - SCORE: Rank the three strategies on a 1-5 scale across: probability of hitting "
    "5,000 units, durability (does it build the brand or just rent attention), "
    "operational simplicity. Show a small table.\n\n"
    "STEP 4 - PICK: Choose ONE strategy. Justify why it beats the other two specifically, "
    "not just why it is good. State the one piece of evidence that would flip your pick.\n\n"
    "Context:\n"
    "- Brand: 'Lumen' - mid-premium DTC skincare, India\n"
    "- New product: Vitamin C + Niacinamide Serum, Rs 1,200, 30ml\n"
    "- Target customer: women 25-40, urban, already use serums\n"
    "- Channels: Instagram (organic + paid), email 80,000, 25 micro-influencers, website 1.2L monthly visits\n"
    "- Budget: Rs 12,00,000\n"
    "- Last launch: 1,800 units vs 4,000 target. Reason cited: not differentiated\n"
    "- Goal: 5,000 units in launch month"
))
story.append(p("<b>What to look for in the output:</b>"))
story.append(p(
    "- Three strategies that <i>actually disagree</i> with each other, not three variations of the same plan<br/>"
    "- Funnel math computed for all three, including the ones the model will not pick<br/>"
    "- A defended choice - 'B beats A because...' and 'B beats C because...'<br/>"
    "- A flip-condition line - the model naming what would change its mind"
))
story.append(p("<b>Typical sample output (yours will vary):</b>"))
story.append(sample_block(
    "<b>STEP 1 - BRANCH:</b><br/>"
    "Strategy A - 'Creator-led storm': bet on the 25-micro-influencer network, minimal paid, "
    "ride earned reach.<br/>"
    "Strategy B - 'Paid + PDP funnel': lean Instagram paid against a sharp PDP, treat influencers "
    "as social proof, not as the engine.<br/>"
    "Strategy C - 'Owned-audience first': go deep into the 80,000 email list and existing 1.2L "
    "site traffic with a loyalty-style launch; minimal cold acquisition.<br/><br/>"
    "<b>STEP 2 - EVALUATE:</b><br/>"
    "Strategy A: ~70,000 incremental visits @ 2% conv = ~1,400 units from cold + ~1,500 warm = "
    "~2,900 total. Budget: Influencer 8 L, Creative 2 L, IG paid 1.5 L, Email 50k. Risk: creator "
    "performance is bimodal; if top 5 underperform, plan collapses. Week-1 indicator: top-creator "
    "save-rate and link-CTR by day 3.<br/>"
    "Strategy B: ~1,40,000 incremental visits @ 2.7% conv = ~3,800 units + ~1,200 warm = ~5,000 "
    "total. Budget: IG paid 6.5 L, Creative + PDP 2.5 L, Influencers 2.5 L (social proof only), "
    "Email 50k. Risk: CAC creeps mid-month and unit economics tighten. Week-1 indicator: cost per "
    "qualified PDP visit vs target by day 5.<br/>"
    "Strategy C: ~25,000 incremental visits (mostly warm) @ 4% conv = ~1,000 units + ~2,500 warm "
    "= ~3,500 total. Budget: Email + lifecycle 2 L, IG retargeting 4 L, Loyalty offer 4 L, "
    "Creative 2 L. Risk: the 80,000 list is overlapped with existing buyers - low <i>new</i> "
    "demand. Week-1 indicator: open-to-purchase rate on the first email send.<br/><br/>"
    "<b>STEP 3 - SCORE (1-5):</b><br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;Strategy&nbsp;|&nbsp;Hit 5,000?&nbsp;|&nbsp;Durability&nbsp;|&nbsp;Simplicity<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;2&nbsp;&nbsp;|&nbsp;4&nbsp;&nbsp;|&nbsp;2<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;4&nbsp;&nbsp;|&nbsp;3&nbsp;&nbsp;|&nbsp;4<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;2&nbsp;&nbsp;|&nbsp;2&nbsp;&nbsp;|&nbsp;5<br/><br/>"
    "<b>STEP 4 - PICK:</b> Strategy B. Beats A because A relies on creator performance variance "
    "we cannot insure against in a one-month window. Beats C because C is mining an audience that "
    "is largely already-customer - it cannot generate the 80,000+ <i>new</i> qualified visits the "
    "5,000-unit goal needs. B is the only strategy whose math gets us to 5,000 without a miracle. "
    "Flip condition: if 5 of the 25 creators have proven >3% link conversion on a comparable "
    "product, A becomes credible and I would switch."
))

story.append(p("Track B debrief — what just happened", H2))
story.append(p(
    "Round 1 produced a plan that could fit any brand in any category. Round 2 forced funnel math "
    "and a real message angle. Round 3 produced a plan with named risks, leading indicators, and a "
    "ranked priority. Round 4 produced something different: three competing plans evaluated against "
    "each other, with one defended on comparative grounds. That is the artifact you take into a "
    "leadership review. The CoT pattern transfers across domains; the ToT pattern transfers across "
    "any decision where the hard part is choosing, not computing."
))

story.append(PageBreak())

# =========================================================
# CROSS-TRACK DEBRIEF
# =========================================================
story.append(p("Cross-track debrief — the pattern under both tracks", H1))
story.append(p("1. Chain-of-Thought is a prompt pattern, not a model setting", H2))
story.append(p(
    "Nothing about the model changed between Round 1 and Round 3. You changed the instruction. "
    "That is the leverage."
))
story.append(p("2. Visible reasoning is auditable reasoning", H2))
story.append(p(
    "In Round 1 you could not check the answer. In Round 2 you could. That is the difference between "
    "a number you defend and a number you hope is right."
))
story.append(p("3. Structure beats 'think step by step'", H2))
story.append(p(
    "'Think step by step' (Round 2) helped. Labeled steps with constraints (Round 3) helped more. "
    "The more you specify the shape of the reasoning, the more reliable the output becomes."
))
story.append(p("4. CoT also surfaces bad inputs", H2))
story.append(p(
    "When the model is forced to show working, it sometimes exposes that the question itself is "
    "under-specified - a missing number, a vague goal, an assumption that does not hold. A naive "
    "prompt hides this. A CoT prompt makes it impossible to hide."
))
story.append(p("5. CoT computes; ToT chooses", H2))
story.append(p(
    "CoT is the right pattern when the hard part is the <i>working</i> - compute this margin, draft "
    "this plan, trace this funnel. Tree-of-Thought is the right pattern when the hard part is the "
    "<i>decision</i> - which pricing strategy, which launch plan, which root cause, which architecture. "
    "ToT forces the model to generate alternatives it would otherwise skip, evaluate them against named "
    "criteria, and defend the pick comparatively. That is what turns a 'good answer' into a 'defensible call'."
))
story.append(p("6. Where to use each in your real work", H2))
story.append(p(
    "Use CoT for: finance memos, funnel math, root-cause traces, anything where a single answer must "
    "be defendable.<br/>"
    "Use ToT for: pricing decisions, launch strategy, vendor selection, hiring trade-offs, anything "
    "where leadership is asking 'which option' rather than 'what is the number'.<br/>"
    "Skip both for: quick creative tasks where you want the model loose and fast."
))

# =========================================================
# BUILD
# =========================================================
doc = SimpleDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=0.8 * inch, rightMargin=0.8 * inch,
    topMargin=0.8 * inch, bottomMargin=0.8 * inch,
    title="Chain-of-Thought + Tree-of-Thought Live Exercise",
    author="EdYoda - GenAI for Non-Coders",
)
doc.build(story)
print(f"Wrote {OUTPUT}")
