/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("desktop specialization fold matches the reference four-card composition", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Areas of Specialization" });
  await expect(section.locator("[data-specialization-grid]")).toHaveAttribute("data-specialization-ready", "true");
  const geometry = await section.evaluate((element) => {
    const career = document.querySelector<HTMLElement>("[aria-label='Career snapshot']");
    const heading = element.querySelector<HTMLElement>("h2");
    const intro = element.querySelector<HTMLElement>("[data-specialization-intro]");
    const cards = [...element.querySelectorAll<HTMLElement>("[data-specialization-card]")];
    if (!career || !heading || !intro || cards.length !== 4) throw new Error("Specialization fold contract is incomplete");
    const sectionBox = element.getBoundingClientRect();
    const headingBox = heading.getBoundingClientRect();
    const introBox = intro.getBoundingClientRect();
    const cardBoxes = cards.map((card) => card.getBoundingClientRect());
    return {
      careerGap: sectionBox.top - career.getBoundingClientRect().bottom,
      cardGap: cardBoxes[1].left - cardBoxes[0].right,
      cardHeight: cardBoxes[0].height,
      cardRadius: Number.parseFloat(getComputedStyle(cards[0]).borderRadius),
      cardWidth: cardBoxes[0].width,
      headingFontSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      headingTop: headingBox.top - sectionBox.top,
      introFontSize: Number.parseFloat(getComputedStyle(intro).fontSize),
      introWidth: introBox.width,
      pageWidth: document.documentElement.scrollWidth,
      sectionHeight: sectionBox.height,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.careerGap).toBeGreaterThanOrEqual(-1);
  expect(geometry.careerGap).toBeLessThanOrEqual(1);
  expect(geometry.sectionHeight).toBeGreaterThanOrEqual(705);
  expect(geometry.sectionHeight).toBeLessThanOrEqual(725);
  expect(geometry.headingTop).toBeGreaterThanOrEqual(92);
  expect(geometry.headingTop).toBeLessThanOrEqual(100);
  expect(geometry.headingFontSize).toBe(36);
  expect(geometry.introFontSize).toBe(18);
  expect(geometry.introWidth).toBeGreaterThanOrEqual(668);
  expect(geometry.introWidth).toBeLessThanOrEqual(676);
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(326);
  expect(geometry.cardWidth).toBeLessThanOrEqual(330);
  expect(geometry.cardHeight).toBeGreaterThanOrEqual(345);
  expect(geometry.cardHeight).toBeLessThanOrEqual(351);
  expect(geometry.cardGap).toBeGreaterThanOrEqual(30);
  expect(geometry.cardGap).toBeLessThanOrEqual(34);
  expect(geometry.cardRadius).toBeGreaterThanOrEqual(11);
  expect(geometry.cardRadius).toBeLessThanOrEqual(13);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
});

test("mobile specialization fold keeps the reference single-column rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Areas of Specialization" });
  await expect(section.locator("[data-specialization-grid]")).toHaveAttribute("data-specialization-ready", "true");
  const geometry = await section.evaluate((element) => {
    const heading = element.querySelector<HTMLElement>("h2");
    const intro = element.querySelector<HTMLElement>("[data-specialization-intro]");
    const cards = [...element.querySelectorAll<HTMLElement>("[data-specialization-card]")];
    if (!heading || !intro || cards.length !== 4) throw new Error("Mobile specialization fold contract is incomplete");
    const sectionBox = element.getBoundingClientRect();
    const headingBox = heading.getBoundingClientRect();
    const cardBoxes = cards.map((card) => card.getBoundingClientRect());
    return {
      cardGap: cardBoxes[1].top - cardBoxes[0].bottom,
      cardHeight: cardBoxes[0].height,
      cardWidth: cardBoxes[0].width,
      headingFontSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      headingTop: headingBox.top - sectionBox.top,
      introHeight: intro.getBoundingClientRect().height,
      pageWidth: document.documentElement.scrollWidth,
      sectionHeight: sectionBox.height,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.sectionHeight).toBeGreaterThanOrEqual(1_640);
  expect(geometry.sectionHeight).toBeLessThanOrEqual(1_665);
  expect(geometry.headingTop).toBeGreaterThanOrEqual(92);
  expect(geometry.headingTop).toBeLessThanOrEqual(100);
  expect(geometry.headingFontSize).toBe(30);
  expect(geometry.introHeight).toBe(84);
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(356);
  expect(geometry.cardWidth).toBeLessThanOrEqual(360);
  expect(geometry.cardHeight).toBeGreaterThanOrEqual(294);
  expect(geometry.cardHeight).toBeLessThanOrEqual(300);
  expect(geometry.cardGap).toBeGreaterThanOrEqual(22);
  expect(geometry.cardGap).toBeLessThanOrEqual(26);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
});

test("specialization motion is progressive, staggered and reduced-motion safe", async ({ browser, page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Areas of Specialization" });
  const cards = section.locator("[data-specialization-card]");
  await expect(section.locator("[data-specialization-grid]")).toHaveAttribute("data-specialization-ready", "true");
  await section.scrollIntoViewIfNeeded();
  await expect(cards).toHaveCount(4);
  await expect.poll(async () => cards.evaluateAll((elements) => elements.flatMap((element) =>
    element.getAnimations().map((animation) => {
      const effect = animation.effect as KeyframeEffect | null;
      return Number(effect?.getTiming().duration ?? 0);
    }),
  ).filter((duration) => duration >= 750).length)).toBeGreaterThanOrEqual(4);

  const first = cards.first();
  await first.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
  const before = await first.boundingBox();
  await first.hover();
  await page.waitForTimeout(360);
  const after = await first.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect((before?.y ?? 0) - (after?.y ?? 0)).toBeGreaterThanOrEqual(10);
  expect((before?.y ?? 0) - (after?.y ?? 0)).toBeLessThanOrEqual(14);

  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("/", { waitUntil: "domcontentloaded" });
  const reducedSection = reducedPage.getByRole("region", { name: "Areas of Specialization" });
  await expect(reducedSection.locator("[data-specialization-grid]")).toHaveAttribute("data-specialization-ready", "true");
  await reducedSection.scrollIntoViewIfNeeded();
  const reducedCards = reducedSection.locator("[data-specialization-card]");
  await expect(reducedCards).toHaveCount(4);
  expect(await reducedCards.evaluateAll((elements) => elements.flatMap((element) => element.getAnimations()))).toEqual([]);
  await reducedContext.close();

  const noScriptContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto("/");
  const noScriptSection = noScriptPage.getByRole("region", { name: "Areas of Specialization" });
  await expect(noScriptSection.locator("[data-specialization-card]")).toHaveCount(4);
  await expect(noScriptSection.getByRole("heading", { name: "Signal" })).toBeVisible();
  await noScriptContext.close();
});
