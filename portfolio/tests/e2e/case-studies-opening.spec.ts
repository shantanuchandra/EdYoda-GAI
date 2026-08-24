/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("case studies opens with the reference full-width centered introduction and filter rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/case-studies", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const canvas = document.querySelector<HTMLElement>("[data-case-studies-canvas]");
    const intro = document.querySelector<HTMLElement>("[data-case-studies-intro]");
    const filters = document.querySelector<HTMLElement>("[data-case-studies-filter-controls]");
    const heading = intro?.querySelector<HTMLElement>("h1");
    const description = intro?.querySelector<HTMLElement>("p");
    if (!canvas || !intro || !filters || !heading || !description) throw new Error("Case-studies opening is incomplete");
    const box = (element: HTMLElement) => { const rect = element.getBoundingClientRect(); return { left: rect.left, top: rect.top, width: rect.width, height: rect.height }; };
    return {
      canvas: box(canvas),
      intro: box(intro),
      heading: { ...box(heading), fontSize: Number.parseFloat(getComputedStyle(heading).fontSize), textAlign: getComputedStyle(heading).textAlign },
      description: box(description),
      filters: box(filters),
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });

  expect(geometry.canvas.left).toBe(0);
  expect(geometry.canvas.width).toBe(1280);
  expect(geometry.heading.fontSize).toBeGreaterThanOrEqual(46);
  expect(geometry.heading.fontSize).toBeLessThanOrEqual(50);
  expect(geometry.heading.textAlign).toBe("center");
  expect(geometry.description.width).toBeLessThanOrEqual(680);
  expect(geometry.description.height).toBeGreaterThanOrEqual(50);
  expect(geometry.description.left).toBeGreaterThanOrEqual(300);
  expect(geometry.filters.top).toBeGreaterThanOrEqual(340);
  expect(geometry.filters.height).toBeGreaterThanOrEqual(150);
  expect(geometry.filters.height).toBeLessThanOrEqual(170);
  expect(geometry.overflow).toBeLessThanOrEqual(0);
});

test("case-study index and detail use the reference's compact system-sans editorial scale", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto("/case-studies", { waitUntil: "domcontentloaded" });
  const indexTypography = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>("[data-case-studies-intro] h1");
    const cardTitle = document.querySelector<HTMLElement>("[data-case-study-card] h3");
    const cardCopy = document.querySelector<HTMLElement>(".case-study-card__content p");
    if (!heading || !cardTitle || !cardCopy) throw new Error("Case-study typography is incomplete");
    const style = (element: HTMLElement) => getComputedStyle(element);
    return {
      heading: style(heading).fontFamily,
      cardTitle: {
        family: style(cardTitle).fontFamily,
        size: Number.parseFloat(style(cardTitle).fontSize),
        weight: Number.parseInt(style(cardTitle).fontWeight, 10),
      },
      cardCopy: Number.parseFloat(style(cardCopy).fontSize),
    };
  });

  expect(indexTypography.heading).toMatch(/^ui-sans-serif/);
  expect(indexTypography.cardTitle.family).toContain("ui-sans-serif");
  expect(indexTypography.cardTitle.size).toBe(18);
  expect(indexTypography.cardTitle.weight).toBe(600);
  expect(indexTypography.cardCopy).toBe(14);

  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });
  const detailTypography = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>(".detail-page__header h1");
    const body = document.querySelector<HTMLElement>(".case-study__body");
    const outcomes = document.querySelector<HTMLElement>("#case-study-outcomes");
    if (!heading || !body || !outcomes) throw new Error("Case-study detail typography is incomplete");
    return {
      heading: getComputedStyle(heading).fontFamily,
      body: getComputedStyle(body).fontFamily,
      outcomes: getComputedStyle(outcomes).fontFamily,
    };
  });

  expect(detailTypography.heading).toContain("ui-sans-serif");
  expect(detailTypography.body).toContain("ui-sans-serif");
  expect(detailTypography.outcomes).toContain("ui-sans-serif");
});

test("the desktop employer row uses the reference three-card media rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/case-studies", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const grid = document.querySelector<HTMLElement>("[data-case-study-results]");
    const cards = [...document.querySelectorAll<HTMLElement>("[data-case-study-card]")].slice(0, 3);
    if (!grid || cards.length !== 3) throw new Error("Case-study grid is incomplete");
    const box = (element: HTMLElement) => { const rect = element.getBoundingClientRect(); return { left: rect.left, top: rect.top, width: rect.width, height: rect.height }; };
    return {
      gridColumns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
      gridGap: Number.parseFloat(getComputedStyle(grid).columnGap),
      gridTop: grid.getBoundingClientRect().top,
      cards: cards.map((card) => {
        const media = card.querySelector<HTMLElement>("[data-case-study-media]");
        const title = card.querySelector<HTMLElement>("h3");
        if (!media || !title) throw new Error("Case-study card is missing its media or title");
        return { card: box(card), media: box(media), titleSize: Number.parseFloat(getComputedStyle(title).fontSize) };
      }),
    };
  });

  expect(geometry.gridColumns).toBe(3);
  expect(geometry.gridGap).toBeCloseTo(32, 0);
  expect(geometry.gridTop).toBeGreaterThanOrEqual(560);
  expect(geometry.gridTop).toBeLessThanOrEqual(575);
  for (const card of geometry.cards) {
    expect(card.card.width).toBeGreaterThanOrEqual(390);
    expect(card.card.width).toBeLessThanOrEqual(400);
    expect(card.card.height).toBeGreaterThanOrEqual(490);
    expect(card.card.height).toBeLessThanOrEqual(510);
    expect(card.media.height).toBe(192);
    expect(card.titleSize).toBeGreaterThanOrEqual(17);
    expect(card.titleSize).toBeLessThanOrEqual(20);
  }
  await expect(page.locator(".case-study-card__tags > span:not(.status-label)").first()).toHaveCSS("background-color", "rgba(11, 23, 20, 0.1)");
  await expect(page.locator(".case-study-artwork img").first()).toHaveCSS("mix-blend-mode", "multiply");
});

test("every case-study card routes readers through the story, evidence, and methods", async ({ page }) => {
  await page.goto("/case-studies", { waitUntil: "domcontentloaded" });
  const cards = page.locator("[data-case-study-card]");

  await expect(cards).toHaveCount(6);
  for (let index = 0; index < await cards.count(); index += 1) {
    const card = cards.nth(index);
    const actions = card.locator("[data-case-study-card-action]");
    const kind = await card.getAttribute("data-case-study-kind");
    const prefix = kind === "product" ? "/products/" : "/work/";

    await expect(actions).toHaveCount(3);
    await expect(actions.nth(0)).toHaveAttribute("href", new RegExp(`^${prefix}`));
    await expect(actions.nth(1)).toHaveAttribute("href", /#(?:case-study|product)-outcomes$/);
    await expect(actions.nth(2)).toHaveAttribute("href", /#(?:case-study|product)-methods$/);
    expect((await actions.nth(0).boundingBox())?.height).toBeGreaterThanOrEqual(44);
    await expect(card.locator(".case-study-card__footer strong")).toHaveCount(0);
  }
});

test("portfolio-focus controls filter truthfully through the same chip language on desktop and mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/case-studies", { waitUntil: "domcontentloaded" });

  const results = page.locator("[data-case-study-results]");
  const financialServices = page.getByRole("button", { name: "Financial services" });
  await financialServices.click();
  await expect(results).toHaveAttribute("data-case-study-filter", "financial-services");
  await expect(financialServices).toHaveAttribute("aria-pressed", "true");
  await expect(financialServices).toHaveCSS("background-color", "rgb(11, 23, 20)");
  await expect(results.locator("[data-case-study-card]:visible")).toHaveCount(1);
  await expect(results.locator("[data-case-study-card]:visible")).toContainText("Responsible AI operations for digital lending");

  await financialServices.click();
  await expect(results).toHaveAttribute("data-case-study-filter", "all");
  await expect(results.locator("[data-case-study-card]:visible")).toHaveCount(6);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("combobox", { name: "Filter case studies" })).toHaveCount(0);
  const retail = page.getByRole("button", { exact: true, name: "Retail" });
  await expect(retail).toBeVisible();
  await retail.click();
  await expect(results).toHaveAttribute("data-case-study-filter", "retail");
  await expect(results.locator("[data-case-study-card]:visible")).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
