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
        const title = card.querySelector<HTMLElement>(".learning-path-card__title");
        if (!media || !title) throw new Error("Learning path card is missing its visual header or title");
        return {
          card: { ...box(card), background: getComputedStyle(card).backgroundColor },
          media: { ...box(media), backgroundImage: getComputedStyle(media).backgroundImage },
          titleFamily: getComputedStyle(title).fontFamily,
        };
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
    expect(card.card.height).toBeGreaterThanOrEqual(520);
    expect(card.card.background).toBe("rgb(255, 255, 255)");
    expect(card.media.height).toBeGreaterThanOrEqual(185);
    expect(card.media.height).toBeLessThanOrEqual(200);
    expect(card.media.backgroundImage).toBe("none");
    expect(card.titleFamily).toContain("ui-sans-serif");
  }
  expect(geometry.overflow).toBeLessThanOrEqual(0);
});
