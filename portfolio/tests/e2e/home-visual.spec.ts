/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("desktop header and hero match the reference first-fold proportions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>("#home-hero-title");
    const profileCard = document.querySelector<HTMLElement>("[aria-label='Professional profile']");
    const hero = document.querySelector<HTMLElement>("section[aria-labelledby='home-hero-title']");
    const header = document.querySelector<HTMLElement>("header");
    if (!heading || !profileCard || !hero || !header) throw new Error("Home first-fold contract is incomplete");

    const headingBox = heading.getBoundingClientRect();
    const profileBox = profileCard.getBoundingClientRect();
    const heroBox = hero.getBoundingClientRect();
    const headerBox = header.getBoundingClientRect();
    const lineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);

    return {
      actions: hero.querySelectorAll("a").length,
      headerHeight: headerBox.height,
      headingHeight: headingBox.height,
      headingLines: headingBox.height / lineHeight,
      headingRight: headingBox.right,
      headingSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      heroHeight: heroBox.height,
      heroTop: heroBox.top,
      profileLeft: profileBox.left,
    };
  });

  expect(geometry.headerHeight).toBeGreaterThanOrEqual(74);
  expect(geometry.headerHeight).toBeLessThanOrEqual(80);
  expect(geometry.heroTop).toBeGreaterThanOrEqual(100);
  expect(geometry.heroTop).toBeLessThanOrEqual(120);
  expect(geometry.heroHeight).toBeGreaterThanOrEqual(740);
  expect(geometry.heroHeight).toBeLessThanOrEqual(790);
  expect(geometry.headingLines).toBeLessThanOrEqual(1.1);
  expect(geometry.headingSize).toBeGreaterThanOrEqual(76);
  expect(geometry.profileLeft).toBeGreaterThan(geometry.headingRight);
  expect(geometry.actions).toBe(2);
});

test("mobile hero stacks the reference composition without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>("#home-hero-title");
    const hero = document.querySelector<HTMLElement>("section[aria-labelledby='home-hero-title']");
    const profileCard = document.querySelector<HTMLElement>("[aria-label='Professional profile']");
    if (!heading || !hero || !profileCard) throw new Error("Mobile first fold is incomplete");
    const heroBox = hero.getBoundingClientRect();
    const profileBox = profileCard.getBoundingClientRect();
    return {
      fontSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      heroHeight: heroBox.height,
      pageWidth: document.documentElement.scrollWidth,
      profileBelowHeading: profileBox.top > heading.getBoundingClientRect().bottom,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.fontSize).toBeGreaterThanOrEqual(48);
  expect(geometry.fontSize).toBeLessThanOrEqual(60);
  expect(geometry.heroHeight).toBeGreaterThanOrEqual(900);
  expect(geometry.heroHeight).toBeLessThanOrEqual(1030);
  expect(geometry.profileBelowHeading).toBe(true);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
});
