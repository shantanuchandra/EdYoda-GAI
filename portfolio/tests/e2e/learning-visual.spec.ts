/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("Learning Lab uses the full-width heading and three-card portfolio grid", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/learning", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const pageCanvas = document.querySelector<HTMLElement>("[data-learning-canvas]");
    const intro = document.querySelector<HTMLElement>("[data-learning-intro]");
    const grid = document.querySelector<HTMLElement>("[data-learning-grid]");
    const heading = intro?.querySelector<HTMLElement>("h1");
    if (!pageCanvas || !intro || !grid || !heading) throw new Error("Learning page is missing the portfolio index structure");
    const box = (element: HTMLElement) => { const rect = element.getBoundingClientRect(); return { left: rect.left, width: rect.width, height: rect.height }; };
    return {
      canvas: box(pageCanvas),
      heading: { ...box(heading), fontSize: Number.parseFloat(getComputedStyle(heading).fontSize), textAlign: getComputedStyle(heading).textAlign },
      gridColumns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
      gridGap: Number.parseFloat(getComputedStyle(grid).columnGap),
      cards: [...grid.querySelectorAll<HTMLElement>("[data-learning-path-card]")].map((card) => {
        const media = card.querySelector<HTMLElement>("[data-learning-card-media]");
        if (!media) throw new Error("Learning path card is missing its visual header");
        return { card: box(card), media: box(media) };
      }),
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });

  expect(geometry.canvas.left).toBe(0);
  expect(geometry.canvas.width).toBe(1280);
  expect(geometry.heading.fontSize).toBeGreaterThanOrEqual(46);
  expect(geometry.heading.fontSize).toBeLessThanOrEqual(50);
  expect(geometry.heading.textAlign).toBe("center");
  expect(geometry.gridColumns).toBe(3);
  expect(geometry.gridGap).toBeCloseTo(32, 0);
  expect(geometry.cards).toHaveLength(3);
  for (const card of geometry.cards) {
    expect(card.card.width).toBeGreaterThanOrEqual(390);
    expect(card.card.width).toBeLessThanOrEqual(400);
    expect(card.card.height).toBeGreaterThanOrEqual(560);
    expect(card.media.height).toBeGreaterThanOrEqual(150);
    expect(card.media.height).toBeLessThanOrEqual(170);
  }
  expect(geometry.overflow).toBeLessThanOrEqual(0);
});

test("Learning details extend the approved visual language across the complete path", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/learning/applied-ai-non-technical", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const canvas = document.querySelector<HTMLElement>("[data-learning-detail-canvas]");
    const visual = document.querySelector<HTMLElement>("[data-learning-detail-visual]");
    const body = document.querySelector<HTMLElement>("[data-learning-detail-body]");
    const modules = document.querySelector<HTMLElement>("#launch-modules + ul");
    const teaching = document.querySelector<HTMLElement>("#how-i-teach-it + p");
    const curriculum = document.querySelector<HTMLElement>("[data-learning-curriculum]");
    const navigation = document.querySelector<HTMLElement>("[data-learning-path-navigation]");
    if (!canvas || !visual || !body || !modules || !teaching || !curriculum || !navigation) {
      throw new Error("Learning detail is missing the full-width path structure");
    }
    const box = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, width: rect.width, height: rect.height };
    };

    return {
      canvas: box(canvas),
      visual: box(visual),
      body: box(body),
      moduleColumns: getComputedStyle(modules).gridTemplateColumns.split(" ").length,
      modules: [...modules.querySelectorAll<HTMLElement>("li")].map(box),
      teaching: box(teaching),
      curriculum: box(curriculum),
      curriculumModules: curriculum.querySelectorAll("details").length,
      openModules: curriculum.querySelectorAll("details[open]").length,
      materialLinks: curriculum.querySelectorAll(".learning-curriculum__materials a").length,
      visibleMaterialLinks: [...curriculum.querySelectorAll<HTMLElement>(".learning-curriculum__materials a")]
        .filter((link) => link.getClientRects().length > 0).length,
      demoLinks: curriculum.querySelectorAll('[aria-label="Connected demos"] a').length,
      links: [...navigation.querySelectorAll<HTMLAnchorElement>("a")].map((link) => ({
        href: link.getAttribute("href"),
        minHeight: Number.parseFloat(getComputedStyle(link).minHeight),
        text: link.textContent?.trim(),
      })),
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });

  expect(geometry.canvas.width).toBeGreaterThanOrEqual(1180);
  expect(geometry.visual.width).toBeGreaterThanOrEqual(360);
  expect(geometry.visual.height).toBeGreaterThanOrEqual(300);
  expect(geometry.body.width).toBeGreaterThanOrEqual(1180);
  expect(geometry.moduleColumns).toBe(2);
  expect(geometry.modules).toHaveLength(4);
  for (const module of geometry.modules) expect(module.height).toBeGreaterThanOrEqual(110);
  expect(geometry.teaching.width).toBeGreaterThanOrEqual(760);
  expect(geometry.curriculum.width).toBeGreaterThanOrEqual(1180);
  expect(geometry.curriculumModules).toBe(8);
  expect(geometry.openModules).toBe(1);
  expect(geometry.materialLinks).toBe(27);
  expect(geometry.visibleMaterialLinks).toBe(3);
  expect(geometry.demoLinks).toBe(2);
  expect(geometry.links).toEqual([
    expect.objectContaining({ href: "/learning", minHeight: 44, text: expect.stringContaining("All AI courses") }),
    expect.objectContaining({ href: "/learning/ai-product-transformation", minHeight: 44, text: expect.stringContaining("AI product transformation") }),
  ]);
  expect(geometry.overflow).toBeLessThanOrEqual(0);
});
