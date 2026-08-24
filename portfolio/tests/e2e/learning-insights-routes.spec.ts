/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript syntax in E2E tests. */
import { expect, test, type Page } from "@playwright/test";
import { findExcludedLearningClaim } from "@/tests/e2e/learning-claim-patterns";

const learningPaths = [
  {
    slug: "applied-ai-non-technical",
    title: "Applied AI for non-technical professionals",
    audience: "Operators and non-technical professionals",
    outcome: "Identify a valuable workflow, prototype safely, and evaluate output quality",
    modules: ["Opportunity framing", "Prompt-to-workflow design", "Grounding and verification", "Human-review checkpoints"],
    curriculumModules: 8,
    materials: 27,
  },
  {
    slug: "ai-product-transformation",
    title: "AI product transformation",
    audience: "Product leaders and transformation teams",
    outcome: "Turn an AI opportunity into an adopted, measurable operating change",
    modules: ["Portfolio prioritization", "System and data design", "Evals and governance", "Adoption and measurement"],
    curriculumModules: 9,
    materials: 18,
  },
  {
    slug: "practical-agents-founders",
    title: "Practical agents for founders",
    audience: "Founders and operators",
    outcome: "Decide when an agent is justified and design one with explicit tools, controls, and fallbacks",
    modules: ["Agent-vs-prompt test", "Tools and state", "Approval boundaries", "Production readiness"],
    curriculumModules: 3,
    materials: 6,
  },
] as const;

async function expectNoExcludedLearningClaims(page: Page) {
  const visibleCopy = await page.locator("main").innerText();
  expect(findExcludedLearningClaim(visibleCopy)).toBeNull();
}

test("lists exactly three complete Learning Lab paths without commerce or account controls", async ({ page }) => {
  const response = await page.goto("/learning");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Shantanu Chandra Learning Lab" })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(3);

  for (const path of learningPaths) {
    const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: path.title }) });
    await expect(card.getByText(path.audience, { exact: true })).toBeVisible();
    await expect(card.getByText(path.outcome, { exact: true })).toBeVisible();
    await expect(card.getByRole("list", { name: `${path.title} launch modules` }).getByRole("listitem")).toHaveText(path.modules);
  }

  await expect(page.getByRole("button", { name: /buy|enrol|sign in|create account|get certified/i })).toHaveCount(0);
  await expect(page.locator('[href*="checkout"], [href*="login"], [href*="signup"]')).toHaveCount(0);
  await expectNoExcludedLearningClaims(page);
});

test("keeps the Lumiere demo on a working same-origin integration boundary", async ({ request }) => {
  const demo = await request.get("/learning-materials/lumiere-app/index.html");
  expect(demo.status()).toBe(200);
  const html = await demo.text();
  expect(html).toContain("'/api/learning/lumiere-chat'");
  expect(html).toContain("'/api/learning/lumiere-lead'");
  expect(html).not.toContain("app.n8n.cloud/webhook/lumiere");
  expect(html).toContain("if (j && j.fallback)");
  expect(html).toContain("await runOrderAssistant(text, trace)");
  expect(html).toContain("reply.remoteBacked && isOrderConfirmed(reply.text)");

  for (const channel of ["lumiere-chat", "lumiere-lead"]) {
    const preflight = await request.fetch(`/api/learning/${channel}`, { method: "OPTIONS" });
    expect(preflight.status()).toBe(204);
  }
});

for (const path of learningPaths) {
  test(`renders the complete ${path.slug} Learning Lab overview`, async ({ page }) => {
    const response = await page.goto(`/learning/${path.slug}`);

    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: path.title })).toBeVisible();
    await expect(page.getByText(path.audience, { exact: true })).toBeVisible();
    await expect(page.getByText(path.outcome, { exact: true })).toBeVisible();
    const modules = page.getByRole("heading", { level: 2, name: "Launch modules" }).locator("+ ul > li");
    await expect(modules).toHaveText(path.modules);
    const curriculum = page.getByRole("region", { name: `${path.title} curriculum` });
    await expect(curriculum.getByRole("heading", { level: 3 })).toHaveCount(path.curriculumModules);
    const materialLinks = curriculum.locator(".learning-curriculum__materials a");
    await expect(materialLinks).toHaveCount(path.materials);
    expect(await materialLinks.evaluateAll((links) => links.map((link) => link.getAttribute("target")))).toEqual(
      Array(path.materials).fill("_blank"),
    );
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    await expectNoExcludedLearningClaims(page);
  });
}

test("publishes the dated Signal to System to Scale launch insight", async ({ page }) => {
  const indexResponse = await page.goto("/insights");
  expect(indexResponse?.status()).toBe(200);
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "From AI demo to adopted system: Signal → System → Scale" })).toHaveAttribute("href", "/insights/signal-system-scale");

  const articleResponse = await page.goto("/insights/signal-system-scale");
  expect(articleResponse?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "From AI demo to adopted system: Signal → System → Scale" })).toBeVisible();
  await expect(page.locator("time[datetime='2026-08-23']")).toHaveText("23 August 2026");
  await expect(page.getByRole("navigation", { name: "On this page" }).getByRole("link")).toHaveText([
    "Signal",
    "System",
    "Scale",
    "Why product design includes adoption and governance",
    "Closing checklist",
  ]);
  await expect(page.getByRole("heading", { level: 2, name: "Closing checklist" }).locator("+ ul > li")).toHaveText([
    "Valuable signal",
    "Workflow owner",
    "Measurable outcome",
    "Evaluation set",
    "Human-review boundary",
    "Adoption path",
    "Monitoring plan",
  ]);
});

test("returns the branded 404 for unpublished learning and insight slugs", async ({ page }) => {
  for (const path of ["/learning/not-public", "/insights/not-public"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "This page is outside the map." })).toBeVisible();
  }
});
