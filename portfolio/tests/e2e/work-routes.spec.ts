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
  await page.getByRole("button", { name: "Employer transformations" }).click();

  await expect(page.getByRole("article").getByRole("heading", { level: 3 })).toHaveCount(4);
  const actions = page.getByRole("link", { name: "Read case study" });
  await expect(actions).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    expect((await actions.nth(index).boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
});

test("case-study details use the reference's neutral, compact editorial surface", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });

  const design = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>("[data-case-study-header]");
    const heading = header?.querySelector<HTMLElement>("h1");
    const meta = document.querySelector<HTMLElement>("[data-case-study-meta]");
    const evidence = document.querySelector<HTMLElement>("[data-case-study-evidence]");
    if (!header || !heading || !meta || !evidence) throw new Error("Case-study detail design landmarks are incomplete");
    return {
      headerImage: getComputedStyle(header).backgroundImage,
      heading: {
        family: getComputedStyle(heading).fontFamily,
        size: Number.parseFloat(getComputedStyle(heading).fontSize),
      },
      metaColumns: getComputedStyle(meta).gridTemplateColumns.split(" ").length,
      evidence: {
        background: getComputedStyle(evidence.querySelector("li")!).backgroundColor,
        valueFamily: getComputedStyle(evidence.querySelector("strong")!).fontFamily,
      },
    };
  });

  expect(design.headerImage).toBe("none");
  expect(design.heading.family).toContain("ui-sans-serif");
  expect(design.heading.size).toBe(48);
  expect(design.metaColumns).toBe(4);
  expect(design.evidence.background).toBe("rgb(255, 255, 255)");
  expect(design.evidence.valueFamily).toContain("ui-sans-serif");
});

test("case-study details extend the reference's centered card language", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });

  const design = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>("[data-case-study-header]");
    const heading = header?.querySelector<HTMLElement>("h1");
    const facts = document.querySelector<HTMLElement>("[data-case-study-facts]");
    const story = document.querySelector<HTMLElement>("[data-case-study-story]");
    if (!header || !heading || !facts || !story) throw new Error("Case-study card-language landmarks are incomplete");
    return {
      headingAlign: getComputedStyle(heading).textAlign,
      headingWidth: Math.round(heading.getBoundingClientRect().width),
      facts: {
        background: getComputedStyle(facts).backgroundColor,
        columns: getComputedStyle(facts).gridTemplateColumns.split(" ").length,
        count: facts.querySelectorAll(":scope > div").length,
      },
      story: {
        background: getComputedStyle(story).backgroundColor,
        borderRadius: Number.parseFloat(getComputedStyle(story).borderRadius),
        headingSize: Number.parseFloat(getComputedStyle(story.querySelector("h2")!).fontSize),
      },
    };
  });

  expect(design.headingAlign).toBe("center");
  expect(design.headingWidth).toBeGreaterThan(900);
  expect(design.facts.background).toBe("rgb(255, 255, 255)");
  expect(design.facts.columns).toBe(4);
  expect(design.facts.count).toBe(4);
  expect(design.story.background).toBe("rgb(255, 255, 255)");
  expect(design.story.borderRadius).toBe(12);
  expect(design.story.headingSize).toBe(28);
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
