/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("featured work adopts the reference media-led card composition", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Selected employer work" });
  const cards = section.getByRole("article");
  await expect(cards).toHaveCount(4);
  await expect(cards.first()).toBeVisible();
  await section.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect.poll(async () => (await cards.first().boundingBox())?.width ?? 0).toBeGreaterThanOrEqual(338);

  const geometry = await section.evaluate((element) => {
    const cardElements = [...element.querySelectorAll<HTMLElement>("[data-featured-work-card]")];
    const media = [...element.querySelectorAll<HTMLElement>("[data-featured-work-media]")];
    const content = media.map((panel) => panel.nextElementSibling).filter((node): node is HTMLElement => node instanceof HTMLElement);
    const footers = [...element.querySelectorAll<HTMLElement>("[data-featured-work-footer]")];
    if (cardElements.length !== 4 || media.length !== 4 || content.length !== 4 || footers.length !== 4) {
      throw new Error("Featured-work reference composition is incomplete");
    }
    const boxes = cardElements.map((card) => card.getBoundingClientRect());
    const mediaBox = media[0].getBoundingClientRect();
    const contentBox = content[0].getBoundingClientRect();
    return {
      cardGap: boxes[1].left - boxes[0].right,
      cardHeight: boxes[0].height,
      cardRadius: Number.parseFloat(getComputedStyle(cardElements[0]).borderRadius),
      cardWidth: boxes[0].width,
      mediaHeight: media[0].getBoundingClientRect().height,
      narrativeFollowsMedia: contentBox.top >= mediaBox.bottom - 1,
      sameRow: boxes.every((box) => Math.abs(box.top - boxes[0].top) <= 1),
      footerHeight: footers[0].getBoundingClientRect().height,
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.sameRow).toBe(true);
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(338);
  expect(geometry.cardWidth).toBeLessThanOrEqual(342);
  expect(geometry.cardHeight).toBeGreaterThanOrEqual(485);
  expect(geometry.cardHeight).toBeLessThanOrEqual(515);
  expect(geometry.cardGap).toBeGreaterThanOrEqual(14);
  expect(geometry.cardGap).toBeLessThanOrEqual(18);
  expect(geometry.cardRadius).toBeGreaterThanOrEqual(11);
  expect(geometry.cardRadius).toBeLessThanOrEqual(13);
  expect(geometry.mediaHeight).toBeGreaterThanOrEqual(170);
  expect(geometry.mediaHeight).toBeLessThanOrEqual(190);
  expect(geometry.narrativeFollowsMedia).toBe(true);
  expect(geometry.footerHeight).toBeGreaterThanOrEqual(56);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);

  const expectedCompanies = ["Lenskart", "IIFL", "Hakuhodo", "Builder.ai"];
  for (let index = 0; index < expectedCompanies.length; index += 1) {
    const card = cards.nth(index);
    await expect(card.locator("[data-featured-work-media] img")).toBeVisible();
    await expect(card.locator("[data-featured-work-tags] > *")).toHaveCount(2);
    await expect(card.locator("[data-featured-work-footer] li")).toHaveCount(3);
    await expect(card.getByText(expectedCompanies[index], { exact: true })).toBeVisible();
  }

  const firstCard = cards.first();
  await firstCard.scrollIntoViewIfNeeded();
  const reducedBefore = await firstCard.boundingBox();
  await firstCard.hover();
  const reducedAfter = await firstCard.boundingBox();
  expect(reducedBefore).not.toBeNull();
  expect(reducedAfter?.y).toBeCloseTo(reducedBefore?.y ?? 0, 1);
  expect(await firstCard.evaluate((element) => element.getAnimations())).toEqual([]);
});

test("featured work stacks cleanly on mobile without hiding content", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Selected employer work" });
  const cards = section.locator("[data-featured-work-card]");
  await expect(cards).toHaveCount(4);
  await section.evaluate((element) => element.scrollIntoView({ block: "start" }));
  const boxes = await cards.evaluateAll((elements) => elements.map((element) => {
    const { bottom, top, width } = element.getBoundingClientRect();
    return { bottom, top, width };
  }));
  expect(boxes.every((box) => box.width >= 356 && box.width <= 360)).toBe(true);
  expect(boxes.slice(1).every((box, index) => box.top > boxes[index].bottom)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
