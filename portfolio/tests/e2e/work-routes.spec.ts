/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript syntax in E2E tests. */
import { expect, test } from "@playwright/test";

const caseStudies = [
  {
    slug: "lenskart-ai-retail",
    title: "AI-assisted retail journeys at Lenskart",
    qualifiedOutcome: "Across 1,000 controlled and 1,000 live-store tests; every final prescription was optometrist-approved",
  },
  {
    slug: "iifl-digital-lending",
    title: "Responsible AI operations for digital lending",
    qualifiedOutcome: "80% of roughly 100 weekly questions cleared a 95% confidence threshold",
  },
  {
    slug: "agl-adtech-operations",
    title: "Scaling ad-tech operations with automation",
    qualifiedOutcome: "A 31% rollout result increase, not a sole-attribution claim",
  },
  {
    slug: "builder-conversational-ai",
    title: "Conversational AI for customer-success scale",
    qualifiedOutcome: "Completed monthly onboardings increased from 50 to 25,000 in six months",
  },
] as const;

const narrativeHeadings = ["Context", "Opportunity", "My role", "Approach", "Governance", "Adoption", "Outcomes", "Lessons"];

test("uses accessible card titles and 44px explicit case-study actions on the unified index", async ({ page }) => {
  await page.goto("/case-studies");
  await page.getByRole("button", { name: /Employer transformations 4/ }).click();

  await expect(page.getByRole("article").getByRole("heading", { level: 3 })).toHaveCount(4);
  const actions = page.getByRole("link", { name: "Read case study" });
  await expect(actions).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    expect((await actions.nth(index).boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
});

for (const caseStudy of caseStudies) {
  test(`renders the evidence-led ${caseStudy.slug} route`, async ({ page }) => {
    const response = await page.goto(`/work/${caseStudy.slug}`);

    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: caseStudy.title })).toBeVisible();
    await expect(page.getByText(caseStudy.qualifiedOutcome)).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Next case study" }).getByRole("link")).toBeVisible();

    await expect(page.locator(".case-study__body h2")).toHaveText(narrativeHeadings);
    await expect(page.getByRole("navigation", { name: "On this page" }).getByRole("link")).toHaveText(narrativeHeadings);
  });
}

test("returns the branded 404 page for an unpublished work slug", async ({ page }) => {
  const response = await page.goto("/work/not-public");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "This page is outside the map." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
});
