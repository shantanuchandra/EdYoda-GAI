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

test("case-study details keep the reference's neutral card surfaces", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });

  const design = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>("[data-case-study-header]");
    const facts = document.querySelector<HTMLElement>("[data-case-study-facts]");
    const story = document.querySelector<HTMLElement>("[data-case-study-story]");
    if (!header || !facts || !story) throw new Error("Case-study card-language landmarks are incomplete");
    return {
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

  expect(design.facts.background).toBe("rgba(255, 255, 255, 0.88)");
  expect(design.facts.columns).toBe(4);
  expect(design.facts.count).toBe(4);
  expect(design.story.background).toBe("rgb(255, 255, 255)");
  expect(design.story.borderRadius).toBe(12);
  expect(design.story.headingSize).toBe(20);
});

test("case-study details scale the reference card into a visual cover and editorial story rows", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });

  const design = await page.evaluate(() => {
    const cover = document.querySelector<HTMLElement>("[data-case-study-cover]");
    const media = cover?.querySelector<HTMLElement>("[data-case-study-media]");
    const heading = cover?.querySelector<HTMLElement>("h1");
    const tags = cover?.querySelectorAll<HTMLElement>("[data-case-study-cover-tags] > span");
    const facts = cover?.querySelector<HTMLElement>("[data-case-study-facts]");
    const body = document.querySelector<HTMLElement>("[data-case-study-story] .case-study-layout__body");
    const firstHeading = body?.querySelector<HTMLElement>("h2");
    const firstParagraph = body?.querySelector<HTMLElement>("p");
    if (!cover || !media || !heading || !tags || !facts || !body || !firstHeading || !firstParagraph) {
      throw new Error("The enlarged case-study card or editorial story rows are incomplete");
    }

    return {
      cover: {
        columns: getComputedStyle(cover).gridTemplateColumns.split(" ").length,
        radius: Number.parseFloat(getComputedStyle(cover).borderRadius),
        shadow: getComputedStyle(cover).boxShadow,
      },
      mediaHeight: Math.round(media.getBoundingClientRect().height),
      heading: {
        align: getComputedStyle(heading).textAlign,
        size: Number.parseFloat(getComputedStyle(heading).fontSize),
      },
      tags: {
        count: tags.length,
        size: Number.parseFloat(getComputedStyle(tags[0]).fontSize),
        radius: Number.parseFloat(getComputedStyle(tags[0]).borderRadius),
      },
      factsColumns: getComputedStyle(facts).gridTemplateColumns.split(" ").length,
      story: {
        columns: getComputedStyle(body).gridTemplateColumns.split(" ").length,
        headingSize: Number.parseFloat(getComputedStyle(firstHeading).fontSize),
        pairedRow: Math.abs(firstHeading.getBoundingClientRect().top - firstParagraph.getBoundingClientRect().top) <= 2,
      },
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });

  expect(design.cover.columns).toBe(2);
  expect(design.cover.radius).toBe(12);
  expect(design.cover.shadow).not.toBe("none");
  expect(design.mediaHeight).toBeGreaterThanOrEqual(360);
  expect(design.heading).toEqual({ align: "left", size: 48 });
  expect(design.tags.count).toBeGreaterThanOrEqual(2);
  expect(design.tags.size).toBe(12);
  expect(design.tags.radius).toBe(6);
  expect(design.factsColumns).toBe(4);
  expect(design.story.columns).toBe(2);
  expect(design.story.headingSize).toBe(20);
  expect(design.story.pairedRow).toBe(true);
  expect(design.overflow).toBeLessThanOrEqual(0);
});

test("the enlarged case-study card keeps the reference's compact action footer", async ({ page }) => {
  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });

  const actions = page.locator("[data-case-study-cover-actions] a");
  await expect(actions).toHaveCount(3);
  await expect(actions).toHaveText(["Outcomes", "Methods", "Full story"]);
  await expect(actions.nth(0)).toHaveAttribute("href", "#case-study-outcomes");
  await expect(actions.nth(1)).toHaveAttribute("href", "#case-study-methods");
  await expect(actions.nth(2)).toHaveAttribute("href", "#context");

  for (let index = 0; index < 3; index += 1) {
    expect((await actions.nth(index).boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
});

test("the closing fold previews the next employer story as a full-width reference card", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });

  const nextNavigation = page.getByRole("navigation", { name: "Next case study" });
  const nextCard = nextNavigation.locator("[data-next-case-study-card]");
  const nextLink = nextCard.getByRole("link", { name: /Responsible AI operations for digital lending/ });
  const artwork = nextCard.locator("[data-case-study-media]");

  await expect(nextNavigation.getByRole("link", { name: "View all case studies" })).toHaveAttribute("href", "/case-studies");
  await expect(nextLink).toHaveAttribute("href", "/work/iifl-digital-lending");
  await expect(nextCard.getByRole("heading", { level: 2, name: "Responsible AI operations for digital lending" })).toBeVisible();
  await expect(artwork.locator("img")).toBeVisible();

  const layout = await nextCard.evaluate((card) => {
    const media = card.querySelector<HTMLElement>("[data-case-study-media]");
    const link = card.querySelector<HTMLElement>("a");
    if (!media || !link) throw new Error("Next-story preview card is incomplete");
    return {
      width: Math.round(card.getBoundingClientRect().width),
      columns: getComputedStyle(link).gridTemplateColumns.split(" ").length,
      radius: Number.parseFloat(getComputedStyle(card).borderRadius),
      mediaHeight: Math.round(media.getBoundingClientRect().height),
      linkHeight: Math.round(link.getBoundingClientRect().height),
    };
  });

  expect(layout.width).toBeGreaterThan(1100);
  expect(layout.columns).toBe(2);
  expect(layout.radius).toBe(12);
  expect(layout.mediaHeight).toBeGreaterThanOrEqual(230);
  expect(layout.linkHeight).toBeGreaterThanOrEqual(230);
});

for (const caseStudy of caseStudies) {
  test(`renders the evidence-led ${caseStudy.slug} route`, async ({ page }) => {
    const response = await page.goto(`/work/${caseStudy.slug}`);

    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: caseStudy.title })).toBeVisible();
    await expect(page.getByText(caseStudy.qualifiedOutcome)).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Next case study" }).locator("[data-next-case-study-card]").getByRole("link")).toBeVisible();

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
