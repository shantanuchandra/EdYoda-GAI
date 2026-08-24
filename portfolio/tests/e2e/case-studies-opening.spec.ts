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
  expect(geometry.description.left).toBeGreaterThanOrEqual(300);
  expect(geometry.filters.top).toBeGreaterThan(geometry.description.top + geometry.description.height + 40);
  expect(geometry.overflow).toBeLessThanOrEqual(0);
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
  for (const card of geometry.cards) {
    expect(card.card.width).toBeGreaterThanOrEqual(390);
    expect(card.card.width).toBeLessThanOrEqual(400);
    expect(card.card.height).toBeGreaterThanOrEqual(490);
    expect(card.card.height).toBeLessThanOrEqual(510);
    expect(card.media.height).toBe(192);
    expect(card.titleSize).toBeGreaterThanOrEqual(17);
    expect(card.titleSize).toBeLessThanOrEqual(20);
  }
});
