/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("desktop hero presents a compact thesis beside the transformation console", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>("#home-hero-title");
    const consoleCard = document.querySelector<HTMLElement>("[aria-label='AI transformation operating system']");
    const hero = document.querySelector<HTMLElement>("section[aria-labelledby='home-hero-title']");
    if (!heading || !consoleCard || !hero) throw new Error("Home hero contract is incomplete");

    const headingBox = heading.getBoundingClientRect();
    const consoleBox = consoleCard.getBoundingClientRect();
    const heroBox = hero.getBoundingClientRect();
    const lineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);

    return {
      consoleLeft: consoleBox.left,
      documentHeight: document.documentElement.scrollHeight,
      headingHeight: headingBox.height,
      headingLines: headingBox.height / lineHeight,
      headingRight: headingBox.right,
      heroHeight: heroBox.height,
    };
  });

  expect(geometry.headingLines).toBeLessThanOrEqual(3.1);
  expect(geometry.consoleLeft).toBeGreaterThan(geometry.headingRight);
  expect(geometry.heroHeight).toBeLessThanOrEqual(820);
  expect(geometry.documentHeight).toBeLessThanOrEqual(4200);
});

test("mobile hero keeps the thesis readable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>("#home-hero-title");
    if (!heading) throw new Error("Home heading is missing");
    return {
      fontSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.fontSize).toBeLessThanOrEqual(52);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
});
