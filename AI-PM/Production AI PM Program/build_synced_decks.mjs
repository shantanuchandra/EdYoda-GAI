import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const programDir = path.dirname(__filename);
const repoRoot = path.resolve(programDir, "..", "..");
const templatesDir = path.join(repoRoot, "templates");

const presenterTemplate = fs.readFileSync(path.join(templatesDir, "presenter_deck.template.html"), "utf8");
const learnerTemplate = fs.readFileSync(path.join(templatesDir, "learner_deck.template.html"), "utf8");

const pubTitle = "Production AI PM Field Notes";
const programTitle = "Production AI PM";

const weeks = [
  {
    num: 1,
    word: "One",
    dir: "Week 01 - AI Product Judgment for Senior PMs",
    title: "AI Product Judgment for Senior PMs",
    short: "AI Product Judgment",
    subtitle: "Decide which AI ideas deserve to be built and which should be killed early.",
    oneRule: "Do not defend the AI idea. Test whether it deserves to exist.",
    opening: "Most AI product failures do not start with the model. They start with a PM choosing the wrong problem.",
    lens: ["Pain", "Workflow", "Context", "Quality tolerance", "Economics", "Risk"],
    walkthrough: "Compare three ideas: Customer Success Copilot, an AI dashboard summarizer, and a refund approval agent.",
    studio: "Score your capstone idea with the AI Opportunity Filter and circle the weakest dimension.",
    artifact: "AI Opportunity One-Pager",
    quality: ["Names the user and workflow", "Explains why AI is needed", "Includes the best non-AI alternative", "Ends with pursue, reshape, or kill"],
    assignment: "Refine the one-pager and add what evidence would make you kill the idea.",
    next: "AI Strategy, Moats, and Business Case"
  },
  {
    num: 2,
    word: "Two",
    dir: "Week 02 - AI Strategy Moats and Business Case",
    title: "AI Strategy, Moats, and Business Case",
    short: "AI Strategy",
    subtitle: "Turn an AI opportunity into a defensible product strategy and business case.",
    oneRule: "If the product has no workflow advantage, data advantage, or distribution advantage, keep digging.",
    opening: "Last week we asked whether an AI idea deserves to exist. Today we ask whether it deserves a roadmap.",
    lens: ["Workflow depth", "Data advantage", "Distribution", "Learning loop", "Switching cost"],
    walkthrough: "Use Customer Success Copilot to connect business outcome, workflow, data advantage, and first release.",
    studio: "Pressure-test the learner strategy memo against moat, economics, and build/buy/partner choices.",
    artifact: "AI Product Strategy Memo v1",
    quality: ["Names a business outcome", "Names a workflow", "Names an advantage", "Includes build/buy/partner logic"],
    assignment: "Submit Strategy Memo v1 with the exact data/context and first workflow to prototype.",
    next: "GenAI System Design for PMs"
  },
  {
    num: 3,
    word: "Three",
    dir: "Week 03 - GenAI System Design for PMs",
    title: "GenAI System Design for PMs",
    short: "System Design",
    subtitle: "Explain a GenAI system clearly enough to work credibly with engineering.",
    oneRule: "If you cannot explain the system in plain English, you are not ready to ask engineering to build it.",
    opening: "A senior AI PM does not need to write the system. But they must know what system they are asking engineering to build.",
    lens: ["User surface", "Instruction layer", "Model", "Context/RAG", "Tools/actions", "Output/UX", "Telemetry/evals"],
    walkthrough: "Map Customer Success Copilot from inputs and retrieval to tools, output, approval, and telemetry.",
    studio: "Convert the capstone strategy into a plain-English system map and AI PRD behavior spec.",
    artifact: "AI PRD v1",
    quality: ["Specifies context and retrieval", "Names tools/actions", "Defines human approval points", "Lists failure modes"],
    assignment: "Refine AI PRD v1 and prepare a workflow sketch for autonomy design.",
    next: "Agentic Product Design"
  },
  {
    num: 4,
    word: "Four",
    dir: "Week 04 - Agentic Product Design",
    title: "Agentic Product Design",
    short: "Agentic Design",
    subtitle: "Design safe autonomy: workflows, tools, approvals, and recovery paths.",
    oneRule: "Start with workflow. Add autonomy only where it improves measurable outcomes.",
    opening: "An agent is not a chatbot with ambition. It is a product surface that can decide, use tools, and sometimes act.",
    lens: ["Workflows before agents", "Autonomy tiers", "Tool boundaries", "Human approval", "Recovery paths", "Stop conditions"],
    walkthrough: "Turn Customer Success Copilot into a workflow with account data, risk summary, playbook retrieval, approval, and logging.",
    studio: "Map capstone steps by AI role, human role, tool/data dependency, approval, and recovery path.",
    artifact: "Agent/RAG Workflow Prototype v1 + Autonomy Map",
    quality: ["At least 4 workflow steps", "At least 1 approval gate", "At least 1 recovery path", "At least 1 telemetry event"],
    assignment: "Produce 5-10 sample inputs/outputs from the workflow for eval design.",
    next: "Evals as the New PRD"
  },
  {
    num: 5,
    word: "Five",
    dir: "Week 05 - Evals as the New PRD",
    title: "Evals as the New PRD",
    short: "Evals",
    subtitle: "Define and measure AI quality before launch.",
    oneRule: "If your eval cannot catch a bad launch, it is not specific enough.",
    opening: "In AI products, the PRD is not complete until it defines how quality will be judged.",
    lens: ["Trace review", "Failure taxonomy", "Golden dataset", "Rubric", "Human alignment", "Release gates"],
    walkthrough: "Classify shared Customer Success Copilot traces into unsupported claims, wrong context, bad recommendations, unsafe actions, and escalation misses.",
    studio: "Turn capstone acceptance criteria into golden dataset rows and pass/fail rubrics.",
    artifact: "Eval Dataset + Rubric + Failure Mode Taxonomy",
    quality: ["Rows reflect real user risk", "Expected behavior is concrete", "Rubric is pass/fail or thresholded", "Launch-blocking failures are marked"],
    assignment: "Expand the golden dataset to 20 rows and mark the 5 rows that block launch.",
    next: "Working with AI/ML Engineering Teams"
  },
  {
    num: 6,
    word: "Six",
    dir: "Week 06 - Working with AI ML Engineering Teams",
    title: "Working with AI/ML Engineering Teams",
    short: "Engineering Fluency",
    subtitle: "Become technically credible without pretending to be the engineer.",
    oneRule: "Ask questions that expose tradeoffs, not questions that perform technical confidence.",
    opening: "The goal is not to sound like an ML engineer. The goal is to be the PM engineering trusts in ambiguous technical decisions.",
    lens: ["Model capability", "Context constraints", "Tool boundaries", "Data contracts", "Eval contracts", "Telemetry contracts"],
    walkthrough: "Run an architecture review for Customer Success Copilot across model choice, retrieval, tools, telemetry, and rollback.",
    studio: "Defend the capstone architecture brief and practice engineering-facing tradeoff questions.",
    artifact: "Technical Architecture Brief for PMs",
    quality: ["Uses plain-English architecture", "Names unresolved engineering questions", "Connects tradeoffs to launch risk", "Avoids vague feasibility asks"],
    assignment: "Complete the Technical Architecture Brief and mark assumptions that must be validated before launch.",
    next: "Production Readiness"
  },
  {
    num: 7,
    word: "Seven",
    dir: "Week 07 - Production Readiness Cost Latency Safety and Launch",
    title: "Production Readiness: Cost, Latency, Safety, and Launch",
    short: "Production Readiness",
    subtitle: "Decide what must be true before an AI product should ship.",
    oneRule: "A product is not ready because the demo works. It is ready when the launch gates are clear.",
    opening: "The difference between an AI demo and an AI product is what happens when the system is expensive, slow, wrong, attacked, or used by real customers.",
    lens: ["Quality gate", "Cost gate", "Latency gate", "Safety/security gate", "Ops gate"],
    walkthrough: "Evaluate Customer Success Copilot for model-call cost, background latency, tenant isolation, approval, traces, and rollback.",
    studio: "Red-team learner capstones for injection, wrong data, excessive agency, high-cost loops, and missing escalation.",
    artifact: "Cost and Latency Model + Risk Register + Launch Readiness Review",
    quality: ["Defines beta and GA criteria", "Names rollback triggers", "Includes monitoring plan", "Maps risks to launch gates"],
    assignment: "Complete the Launch Readiness Review and draft a 2-minute executive story.",
    next: "Executive Narrative and Portfolio"
  },
  {
    num: 8,
    word: "Eight",
    dir: "Week 08 - Executive Narrative Portfolio and AI PM Interview Readiness",
    title: "Executive Narrative, Portfolio, and AI PM Interview Readiness",
    short: "Portfolio Narrative",
    subtitle: "Turn the portfolio into a credible senior AI PM signal.",
    oneRule: "Do not describe tools. Explain judgment, tradeoffs, and leadership.",
    opening: "The portfolio is not a folder of classwork. It is evidence that you can lead an AI product through ambiguity.",
    lens: ["Business problem", "Why AI", "Product strategy", "System design", "Evals", "Launch risk", "Leadership tradeoffs"],
    walkthrough: "Frame the same capstone as an executive story and as an AI PM interview story.",
    studio: "Critique portfolios for senior judgment, evidence, artifact quality, and public/private/anonymized boundaries.",
    artifact: "Final Senior AI PM Portfolio Packet + AI PM Interview Narrative",
    quality: ["Shows judgment beyond tool usage", "Connects strategy to system and evals", "Handles production risk", "Has a concise interview story"],
    assignment: "Finish the 7-day polish plan and package public, private, or anonymized artifacts.",
    next: "Your next 90 days as a Production AI PM"
  }
];

const timings = [
  ["0:00 - 0:08", "8 min"],
  ["0:08 - 0:18", "10 min"],
  ["0:18 - 0:35", "17 min"],
  ["0:35 - 0:55", "20 min"],
  ["0:55 - 1:05", "10 min"],
  ["1:05 - 1:30", "25 min"],
  ["1:30 - 1:45", "15 min"],
  ["1:45 - 1:53", "8 min"],
  ["1:53 - 1:58", "5 min"],
  ["1:58 - 2:00", "2 min"]
];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceTokens(html, week, learnerFileName) {
  return html
    .replaceAll("{{PROGRAM_TITLE}}", programTitle)
    .replaceAll("{{SESSION_NUMBER}}", String(week.num))
    .replaceAll("{{SESSION_NUMBER_PADDED}}", pad2(week.num))
    .replaceAll("{{SESSION_NUMBER_WORD}}", week.word)
    .replaceAll("{{SESSION_SUBTITLE_SHORT}}", week.short)
    .replaceAll("{{SESSION_TITLE}}", week.title)
    .replaceAll("{{PUB_TITLE}}", pubTitle)
    .replaceAll("{{TOTAL_SLIDES}}", "10")
    .replaceAll("learner_deck.html", learnerFileName);
}

function jsString(value) {
  return JSON.stringify(String(value));
}

function jsArray(items) {
  return `[${items.map(jsString).join(", ")}]`;
}

function presenterSlides(week) {
  const slideData = [
    {
      tag: "title",
      title: week.title,
      say: week.opening,
      doSteps: ["Welcome the room and confirm the workbook is open.", "Ask the opening chat prompt, then read 4-6 responses aloud.", `Name today's artifact: ${week.artifact}.`],
      watch: "If answers drift into generic AI excitement, redirect to concrete product judgment.",
      bridge: `The rule for today: ${week.oneRule}`
    },
    {
      tag: "demo",
      title: "Why this session matters",
      say: week.subtitle,
      doSteps: ["Connect the session to the final Senior AI PM Portfolio Packet.", "Show where this week's artifact fits into the final packet."],
      watch: "Make the value senior-level: judgment, tradeoffs, launch credibility.",
      bridge: "Now give them the mental model."
    },
    {
      tag: "demo",
      title: "Strategy lens",
      say: "This is the judgment model for the week. Keep it visible while learners work.",
      doSteps: week.lens.map(item => `Explain: ${item}.`),
      deeper: week.lens,
      bridge: "Now show the lens on the shared case before asking learners to apply it."
    },
    {
      tag: "demo",
      title: "Applied walkthrough",
      say: week.walkthrough,
      doSteps: ["Use the shared B2B SaaS Customer Success Copilot case.", "Narrate the product tradeoffs, not just the tool choices.", "Ask where the design could fail in production."],
      watch: "Keep the walkthrough crisp. The second hour needs learner work.",
      bridge: "Take the break before the studio block."
    },
    {
      tag: "break",
      title: "Hard break",
      say: "Real ten-minute break. Cameras off. Stand up. Water. We come back at the exact clock time on screen.",
      doSteps: ["Let the countdown run.", "Mute yourself.", "Prepare the studio prompt for the return."],
      watch: "Honor the break. Do not restart early.",
      note: "The second half is critique-heavy; protect the reset."
    },
    {
      tag: "exercise",
      title: "Studio: apply it",
      say: week.studio,
      prompt: `${week.short} studio prompt:\n1. Apply the lens to your capstone.\n2. Mark the weakest assumption.\n3. Prepare one decision you want critiqued.`,
      doSteps: ["Give learners 8 minutes solo.", "Move to pair critique for 10 minutes.", "Invite 2 live shares."],
      watch: "If critique is polite, require one sharpened question and one cut.",
      bridge: "Now convert the discussion into the portfolio artifact."
    },
    {
      tag: "exercise",
      title: `Build the artifact: ${week.artifact}`,
      say: `The walk-out artifact is ${week.artifact}.`,
      prompt: `${week.artifact}\n- What decision does it support?\n- What evidence does it include?\n- What assumption remains unresolved?\n- What would make it stronger before the next session?`,
      doSteps: ["Give learners 10 minutes to draft.", "Ask them to mark one section as strongest and one as weakest.", "Collect one example for live critique."],
      watch: "If learners write too much, force one-page clarity.",
      bridge: "Before they leave, make the quality bar explicit."
    },
    {
      tag: "demo",
      title: "Quality bar",
      say: "This is how the artifact will be judged.",
      doSteps: week.quality.map(item => `Quality check: ${item}.`),
      watch: "Tie every criterion back to senior AI PM credibility.",
      bridge: "Now turn the quality bar into the take-home."
    },
    {
      tag: "exercise",
      title: "Take-home",
      say: week.assignment,
      doSteps: ["Show where to place the artifact in the portfolio packet.", "Name the due artifact for the next feedback checkpoint.", "Clarify optional advanced lab expectations if relevant."],
      bridge: "Close by connecting this week to the next capability."
    },
    {
      tag: "title",
      title: week.num === 8 ? "Close: portfolio to proof" : `Next: ${week.next}`,
      say: week.num === 8 ? "The next step is polish: make the portfolio clear enough for executives and credible enough for senior AI PM interviews." : `Next session: ${week.next}.`,
      doSteps: ["Thank the cohort for the work.", "Remind them what to submit.", "Stop recording after questions."],
      note: week.num === 8 ? "Offer premium add-ons if applicable: 1:1 capstone review, mock interview, resume/LinkedIn/portfolio review." : "Point forward only here; do not preview too much earlier."
    }
  ];

  return slideData.map((slide, idx) => {
    const [when, duration] = timings[idx];
    const fields = [
      `num: ${idx + 1}`,
      `when: ${jsString(when)}`,
      `duration: ${jsString(duration)}`,
      `tag: ${jsString(slide.tag)}`,
      `title: ${jsString(slide.title)}`,
      `say: ${jsString(slide.say)}`
    ];
    if (slide.prompt) fields.push(`prompt: ${jsString(slide.prompt)}`);
    if (slide.doSteps) fields.push(`doSteps: ${jsArray(slide.doSteps)}`);
    if (slide.watch) fields.push(`watch: ${jsString(slide.watch)}`);
    if (slide.deeper) fields.push(`deeper: ${jsArray(slide.deeper)}`);
    if (slide.bridge) fields.push(`bridge: ${jsString(slide.bridge)}`);
    if (slide.note) fields.push(`note: ${jsString(slide.note)}`);
    return `  {\n    ${fields.join(",\n    ")}\n  }`;
  }).join(",\n");
}

function injectPresenter(template, week, learnerFileName) {
  let html = replaceTokens(template, week, learnerFileName);
  html = html.replace(/const slides = \[[\s\S]*?\n\];\n\n\/\* Index of the break slide/, `const slides = [\n${presenterSlides(week)}\n];\n\n/* Index of the break slide`);
  html = html.replace(/\/\* ===================== SLIDE DATA[\s\S]*?const slides = \[/, "/* ===================== SLIDE DATA ===================== */\nconst slides = [");
  return html;
}

function head(topic, week) {
  return `<div class="running-head">
      <div class="left"><span>Session ${pad2(week.num)}</span><span class="dot">·</span><span class="topic">${escapeHtml(topic)}</span></div>
      <span class="pub-title">${escapeHtml(pubTitle)}</span>
    </div>`;
}

function folio(n) {
  return `<div class="folio">${n}<sup>/10</sup></div>`;
}

function list(items) {
  return `<ul class="mt-3">${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function learnerSlides(week) {
  const nextText = week.num === 8 ? "Your next 90 days as a Production AI PM" : `Next: ${week.next}`;
  return `
  <div class="slide active">
    <div class="cover">
      <div class="vol">Session ${week.word} · Two Hours · Live</div>
      <div class="cover-main">
        <div class="byline" style="margin-bottom: var(--s-4); color: var(--terra);">— Starting Shortly —</div>
        <h1 class="cover-title">${escapeHtml(week.title)}</h1>
        <p class="cover-byline">${escapeHtml(week.subtitle)}</p>
        <div class="preclass-timer" id="preclassTimer">
          <div>
            <span class="pt-label">We begin in</span>
            <div class="pt-clock" id="preclassClock">05:00</div>
          </div>
          <div class="pt-controls">
            <button class="pt-adjust" onclick="preclassAdjust(-60)" title="minus 1 minute">-</button>
            <button class="pt-primary" id="preclassStartBtn" onclick="preclassToggle()">Start</button>
            <button class="pt-adjust" onclick="preclassAdjust(60)" title="plus 1 minute">+</button>
            <button onclick="preclassReset()">Reset</button>
          </div>
          <span class="pt-hint">Set it, hit Start before you go live. +/- adjusts by a minute.</span>
        </div>
        <div class="cover-foot">
          <span>No. ${pad2(week.num)} / ${escapeHtml(week.short)}</span>
          <span>Reading time: 120 min</span>
        </div>
      </div>
    </div>
    ${folio(1)}
  </div>

  <div class="slide">
    ${head("The promise", week)}
    <div class="slide-body">
      <span class="eyebrow">Why this matters</span>
      <h1>${escapeHtml(week.subtitle)}</h1>
      <p class="lede mt-3">${escapeHtml(week.opening)}</p>
      <div class="rule mt-4"></div>
      <p class="mt-3">Today's artifact: <strong>${escapeHtml(week.artifact)}</strong>.</p>
    </div>
    ${folio(2)}
  </div>

  <div class="slide">
    ${head("Strategy lens", week)}
    <div class="slide-body">
      <span class="eyebrow">The lens</span>
      <h1>Use this frame before you touch the tools.</h1>
      ${list(week.lens)}
    </div>
    ${folio(3)}
  </div>

  <div class="slide">
    ${head("Shared case", week)}
    <div class="slide-body">
      <span class="eyebrow cool">Applied walkthrough</span>
      <h1>Customer Success Copilot is the shared test case.</h1>
      <p class="lede mt-3">${escapeHtml(week.walkthrough)}</p>
      <div class="prompt mt-4">Ask: what decision does the PM need to make, what system behavior is required, and what would block launch?</div>
    </div>
    ${folio(4)}
  </div>

  <div class="slide break-slide">
    ${head("Intermission", week)}
    <div class="slide-body">
      <div class="break-label">— Break —</div>
      <div class="break-clock" id="breakClock">10:00</div>
      <p class="lede center mt-5" style="font-size: 1.6rem;">Stand up. Water. Stretch.</p>
      <p class="byline mt-4" style="color: var(--terra); letter-spacing: 0.18em;">The studio starts when we return.</p>
    </div>
    ${folio(5)}
  </div>

  <div class="slide exercise-slide">
    ${head("Studio", week)}
    <div class="slide-body">
      <div class="ex-letter">A</div>
      <div>
        <div class="ex-meta">Studio · 25 minutes</div>
        <h1>Apply the lens to your capstone.</h1>
        <p class="lede mt-3">${escapeHtml(week.studio)}</p>
        <div class="prompt mt-4">1. Apply the lens.\\n2. Mark the weakest assumption.\\n3. Prepare one decision for critique.</div>
      </div>
    </div>
    <div class="ex-timer">25:00</div>
    ${folio(6)}
  </div>

  <div class="slide exercise-slide">
    ${head("Artifact", week)}
    <div class="slide-body">
      <div class="ex-letter">B</div>
      <div>
        <div class="ex-meta">Artifact · 15 minutes</div>
        <h1>${escapeHtml(week.artifact)}</h1>
        <p class="lede mt-3">Turn the discussion into one portfolio artifact that shows senior AI PM judgment.</p>
        <div class="prompt mt-4">What decision does this artifact support?\\nWhat evidence does it include?\\nWhat assumption remains unresolved?</div>
      </div>
    </div>
    <div class="ex-timer">15:00</div>
    ${folio(7)}
  </div>

  <div class="slide">
    ${head("Quality bar", week)}
    <div class="slide-body">
      <span class="eyebrow warn">Critique</span>
      <h1>This is what good work must prove.</h1>
      ${list(week.quality)}
    </div>
    ${folio(8)}
  </div>

  <div class="slide">
    ${head("Take-home", week)}
    <div class="slide-body">
      <span class="eyebrow">Before next session</span>
      <h1>${escapeHtml(week.assignment)}</h1>
      <p class="lede mt-3">Put the artifact into your Senior AI PM Portfolio Packet before the next class.</p>
    </div>
    ${folio(9)}
  </div>

  <div class="slide">
    ${head("Close", week)}
    <div class="slide-body">
      <span class="eyebrow cool">${week.num === 8 ? "Next 90 days" : "Next session"}</span>
      <p class="display"><span class="drop">${nextText[0]}</span>${escapeHtml(nextText.slice(1))}</p>
      <p class="lede mt-4">Rule to remember: ${escapeHtml(week.oneRule)}</p>
    </div>
    ${folio(10)}
  </div>`;
}

function injectLearner(template, week) {
  let html = replaceTokens(template, week, "");
  html = html.replace(/<div class="deck" id="deck">[\s\S]*?<\/div>\n\n<div class="nav">/, `<div class="deck" id="deck">\n${learnerSlides(week)}\n</div>\n\n<div class="nav">`);
  return html;
}

for (const week of weeks) {
  const weekDir = path.join(programDir, week.dir);
  const prefix = `W${pad2(week.num)}`;
  const learnerFile = `${prefix}_Learner_Deck.html`;
  const presenterFile = `${prefix}_Presenter_Deck.html`;

  const presenter = injectPresenter(presenterTemplate, week, learnerFile);
  const learner = injectLearner(learnerTemplate, week);

  fs.writeFileSync(path.join(weekDir, presenterFile), presenter);
  fs.writeFileSync(path.join(weekDir, learnerFile), learner);
}

console.log(`Generated ${weeks.length * 2} synced deck files.`);
