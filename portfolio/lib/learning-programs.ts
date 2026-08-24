/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript scope analysis. */

export type LearningMaterial = {
  label: string;
  href: string;
};

export type LearningModule = {
  code: string;
  title: string;
  description: string;
  materials: LearningMaterial[];
};

export type LearningProgram = {
  summary: string;
  facts: string[];
  modules: LearningModule[];
  demos?: LearningMaterial[];
};

const materialRoot = "/learning-materials";
const encodeSegment = (segment: string) => encodeURIComponent(segment);
const materialPath = (...segments: string[]) => `${materialRoot}/${segments.map(encodeSegment).join("/")}`;

const appliedRoot = "GenAI for Non-Coders";
const productRoot = "AI-PM";
const productProgramRoot = "Production AI PM Program";
const agentsRoot = "Founder's Guide to Agents";

const appliedModule = (
  code: string,
  folder: string,
  title: string,
  description: string,
  materials: Array<[string, string]>,
): LearningModule => ({
  code,
  title,
  description,
  materials: materials.map(([label, file]) => ({ label, href: materialPath(appliedRoot, folder, file) })),
});

const productWeek = (
  code: string,
  folder: string,
  title: string,
  description: string,
  week: string,
): LearningModule => ({
  code,
  title,
  description,
  materials: [
    { label: "Learner Deck", href: materialPath(productRoot, productProgramRoot, folder, `${week}_Learner_Deck.html`) },
    { label: "Presenter Deck", href: materialPath(productRoot, productProgramRoot, folder, `${week}_Presenter_Deck.html`) },
  ],
});

export const learningPrograms: Record<string, LearningProgram> = {
  "applied-ai-non-technical": {
    summary:
      "Seven sessions plus an AI Evals elective, moving from foundational model concepts through RAG, agent architecture, and a deployed workflow with no-code automation.",
    facts: ["8 sessions", "Beginner to advanced", "Hands-on materials"],
    demos: [
      { label: "Open Lumiere Bakery demo", href: materialPath("lumiere-app", "index.html") },
      { label: "Read the demo build guide", href: materialPath("lumiere-app", "guide.html") },
    ],
    modules: [
      appliedModule("S01", "Session 01 - Generative AI Foundations", "Generative AI Foundations", "How language models work, tokens, and prompting basics.", [
        ["Learner Deck", "learner_deck.html"],
        ["Presenter Deck", "presenter_deck.html"],
        ["LinkedIn Carousel", "linkedin_carousel.html"],
      ]),
      appliedModule("S02", "Session 02 - From Chatbot to Agent", "From Chatbot to Agent", "Tool use, memory, and planning loops.", [
        ["Learner Deck", "learner_deck.html"],
        ["Presenter Deck", "presenter_deck.html"],
        ["Learner Workbook", "02_Learner_Workbook.html"],
        ["LinkedIn Carousel", "linkedin_carousel.html"],
      ]),
      appliedModule(
        "S03",
        "Session 03 - Prompt Engineering Context Engineering for Agents",
        "Prompt & Context Engineering",
        "Few-shot patterns, system prompts, context windows, and structured reasoning exercises.",
        [
          ["Learner Deck", "learner_deck.html"],
          ["Presenter Deck", "presenter_deck.html"],
          ["CoT / ToT Live Exercise", "CoT_ToT_Exercise_Live_ChatGPT.html"],
          ["LinkedIn Carousel", "linkedin_carousel.html"],
        ],
      ),
      appliedModule(
        "S04",
        "Session 04 - RAG Giving Agents a Brain of Your Own Data",
        "RAG — Giving Agents Your Data",
        "Retrieval pipelines, knowledge bases, grounding, and verification.",
        [
          ["Learner Deck", "learner_deck.html"],
          ["Presenter Deck", "presenter_deck.html"],
          ["Learner Workbook", "Session4_Learner_Workbook_print.html"],
        ],
      ),
      appliedModule("S05", "Session 05 - Agent Architecture", "Agent Architecture", "ReAct, multi-tool agents, and the Lumiere Bakery build.", [
        ["Learner Deck", "learner_deck.html"],
        ["Presenter Deck", "presenter_deck.html"],
        ["Learner Workbook", "learner_workbook.html"],
      ]),
      appliedModule(
        "S06",
        "Session 06 - Workflow Automation with n8n",
        "Workflow Automation with n8n",
        "Visual pipelines, webhook triggers, and no-code automation.",
        [
          ["Learner Deck", "learner_deck.html"],
          ["Presenter Deck", "presenter_deck.html"],
          ["LinkedIn Carousel", "linkedin_carousel.html"],
        ],
      ),
      appliedModule(
        "S07",
        "Session 07 - Workflow Automation with n8n - Part 2",
        "n8n Part 2 — Deploy & Automate",
        "Deployment, email automations, and production workflows.",
        [
          ["Learner Deck", "learner_deck.html"],
          ["Presenter Deck", "presenter_deck.html"],
          ["Learner Handbook", "03_Learner_Handbook.html"],
          ["LinkedIn Carousel", "linkedin_carousel.html"],
        ],
      ),
      appliedModule("EVL", "AI Evals - Elective", "AI Evals · Elective", "Evaluation frameworks, benchmarks, and feedback-driven quality.", [
        ["Learner Deck", "learner_deck.html"],
        ["Presenter Deck", "presenter_deck.html"],
        ["LinkedIn Carousel", "linkedin_carousel.html"],
      ]),
    ],
  },
  "ai-product-transformation": {
    summary:
      "Eight weeks of applied AI product leadership—from strategy and moats to evals, engineering collaboration, production readiness, and executive narrative.",
    facts: ["8 weeks + resources", "Senior product leaders", "Case-driven"],
    modules: [
      {
        code: "RES",
        title: "Program Resources",
        description: "Program navigator and a searchable reader for the complete supporting material.",
        materials: [
          { label: "Program Index", href: materialPath(productRoot, productProgramRoot, "index.html") },
          { label: "Program Reader", href: materialPath(productRoot, productProgramRoot, "md-viewer.html") },
        ],
      },
      productWeek(
        "W01",
        "Week 01 - AI Product Judgment for Senior PMs",
        "AI Product Judgment for Senior PMs",
        "When to build with AI, risk versus upside, and product judgment.",
        "W01",
      ),
      productWeek(
        "W02",
        "Week 02 - AI Strategy Moats and Business Case",
        "AI Strategy, Moats & Business Case",
        "Defensibility, competitive dynamics, and ROI framing.",
        "W02",
      ),
      productWeek(
        "W03",
        "Week 03 - GenAI System Design for PMs",
        "GenAI System Design for PMs",
        "Model stacks, latency, retrieval architecture, and prompt pipelines.",
        "W03",
      ),
      productWeek(
        "W04",
        "Week 04 - Agentic Product Design",
        "Agentic Product Design",
        "Multi-step agents, human review, and UX for AI actions.",
        "W04",
      ),
      productWeek(
        "W05",
        "Week 05 - Evals as the New PRD",
        "Evals as the New PRD",
        "Evaluation suites, model judging, and acceptance criteria.",
        "W05",
      ),
      productWeek(
        "W06",
        "Week 06 - Working with AI ML Engineering Teams",
        "Working with AI / ML Engineering Teams",
        "Collaboration models, delivery dynamics, and the product-engineering interface.",
        "W06",
      ),
      productWeek(
        "W07",
        "Week 07 - Production Readiness Cost Latency Safety and Launch",
        "Production Readiness — Cost, Latency & Launch",
        "Guardrails, monitoring, cost modelling, and launch readiness.",
        "W07",
      ),
      productWeek(
        "W08",
        "Week 08 - Executive Narrative Portfolio and AI PM Interview Readiness",
        "Executive Narrative, Portfolio & AI PM Interview",
        "Executive storytelling, portfolio framing, and interview readiness.",
        "W08",
      ),
    ],
  },
  "practical-agents-founders": {
    summary:
      "An intensive workshop for founders and senior operators to design and ship useful agents with explicit tools, live data, approval boundaries, and operating fallbacks.",
    facts: ["Practical workshop", "Founders & operators", "Live build materials"],
    modules: [
      {
        code: "PRE",
        title: "Pre-Read & Preparation",
        description: "Context, setup, and readiness checks before the workshop.",
        materials: [{ label: "Pre-Read", href: materialPath(agentsRoot, "session", "00_Pre_Read.html") }],
      },
      {
        code: "DAY",
        title: "Workshop — Decks & Live Sessions",
        description: "Learner and presenter materials for the main workshop day.",
        materials: [
          { label: "Learner Deck", href: materialPath(agentsRoot, "session", "learner_deck.html") },
          { label: "Presenter Deck", href: materialPath(agentsRoot, "session", "presenter_deck.html") },
        ],
      },
      {
        code: "OPS",
        title: "Ops & Reference Materials",
        description: "The build handbook, facilitation runbook, and workshop readiness report.",
        materials: [
          { label: "Build Handbook", href: materialPath(agentsRoot, "session", "handbook.html") },
          { label: "Facilitator Runbook", href: materialPath(agentsRoot, "session", "runbook.html") },
          { label: "Morning Report", href: materialPath(agentsRoot, "session", "morning_report.html") },
        ],
      },
    ],
  },
};

export function getLearningProgram(slug: string): LearningProgram | undefined {
  return learningPrograms[slug];
}
