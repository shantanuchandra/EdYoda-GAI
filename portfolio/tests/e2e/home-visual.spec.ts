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
    const portrait = profileCard.querySelector<HTMLElement>("img, [role='img']");
    const actionBoxes = [...hero.querySelectorAll<HTMLElement>("a")].map((action) => action.getBoundingClientRect());
    const wordmark = header.querySelector<HTMLElement>("a");
    if (!portrait) throw new Error("Professional portrait is missing");
    if (!wordmark) throw new Error("Site wordmark is missing");
    const headingRange = document.createRange();
    headingRange.selectNodeContents(heading);
    const lineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);

    return {
      actions: hero.querySelectorAll("a").length,
      headerHeight: headerBox.height,
      headingHeight: headingBox.height,
      headingLines: headingBox.height / lineHeight,
      headingInkRight: headingRange.getBoundingClientRect().right,
      headingRight: headingBox.right,
      headingSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      headingTop: headingBox.top,
      heroHeight: heroBox.height,
      heroTop: heroBox.top,
      portraitSize: portrait.getBoundingClientRect().width,
      profileHeight: profileBox.height,
      profileLeft: profileBox.left,
      profileTop: profileBox.top,
      profileWidth: profileBox.width,
      resumeActionWidth: actionBoxes[0]?.width ?? 0,
      resumeActionTop: actionBoxes[0]?.top ?? 0,
      caseStudyActionWidth: actionBoxes[1]?.width ?? 0,
      wordmarkLeft: wordmark.getBoundingClientRect().left,
    };
  });

  expect(geometry.headerHeight).toBeGreaterThanOrEqual(74);
  expect(geometry.headerHeight).toBeLessThanOrEqual(80);
  expect(geometry.heroTop).toBeGreaterThanOrEqual(100);
  expect(geometry.heroTop).toBeLessThanOrEqual(120);
  expect(geometry.heroHeight).toBeGreaterThanOrEqual(740);
  expect(geometry.heroHeight).toBeLessThanOrEqual(790);
  expect(geometry.headingLines).toBeLessThanOrEqual(1.1);
  expect(geometry.headingSize).toBeGreaterThanOrEqual(94);
  expect(geometry.headingSize).toBeLessThanOrEqual(98);
  expect(geometry.headingTop).toBeGreaterThanOrEqual(305);
  expect(geometry.headingTop).toBeLessThanOrEqual(330);
  expect(geometry.headingInkRight).toBeLessThanOrEqual(850);
  expect(geometry.profileLeft).toBeGreaterThan(geometry.headingRight);
  expect(geometry.profileLeft).toBeGreaterThanOrEqual(860);
  expect(geometry.profileLeft).toBeLessThanOrEqual(890);
  expect(geometry.profileTop).toBeGreaterThanOrEqual(235);
  expect(geometry.profileTop).toBeLessThanOrEqual(265);
  expect(geometry.profileWidth).toBeGreaterThanOrEqual(405);
  expect(geometry.profileWidth).toBeLessThanOrEqual(430);
  expect(geometry.profileHeight).toBeGreaterThanOrEqual(475);
  expect(geometry.profileHeight).toBeLessThanOrEqual(505);
  expect(geometry.portraitSize).toBeGreaterThanOrEqual(72);
  expect(geometry.portraitSize).toBeLessThanOrEqual(82);
  expect(geometry.resumeActionWidth).toBeGreaterThanOrEqual(145);
  expect(geometry.resumeActionTop).toBeGreaterThanOrEqual(638);
  expect(geometry.resumeActionTop).toBeLessThanOrEqual(655);
  expect(geometry.caseStudyActionWidth).toBeGreaterThanOrEqual(198);
  expect(geometry.wordmarkLeft).toBeGreaterThanOrEqual(90);
  expect(geometry.wordmarkLeft).toBeLessThanOrEqual(102);
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
    const header = document.querySelector<HTMLElement>("header");
    const actions = [...hero.querySelectorAll<HTMLElement>("a")].map((action) => action.getBoundingClientRect());
    if (!header) throw new Error("Mobile header is missing");
    return {
      fontSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      headerHeight: header.getBoundingClientRect().height,
      heroHeight: heroBox.height,
      heroTop: heroBox.top,
      pageWidth: document.documentElement.scrollWidth,
      profileBelowHeading: profileBox.top > heading.getBoundingClientRect().bottom,
      profileLeft: profileBox.left,
      profileTop: profileBox.top,
      profileWidth: profileBox.width,
      profileHeight: profileBox.height,
      resumeActionWidth: actions[0]?.width ?? 0,
      caseStudyActionWidth: actions[1]?.width ?? 0,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.fontSize).toBeGreaterThanOrEqual(48);
  expect(geometry.fontSize).toBeLessThanOrEqual(60);
  expect(geometry.headerHeight).toBeGreaterThanOrEqual(78);
  expect(geometry.headerHeight).toBeLessThanOrEqual(82);
  expect(geometry.heroTop).toBeGreaterThanOrEqual(94);
  expect(geometry.heroTop).toBeLessThanOrEqual(98);
  expect(geometry.heroHeight).toBeGreaterThanOrEqual(900);
  expect(geometry.heroHeight).toBeLessThanOrEqual(1030);
  expect(geometry.profileLeft).toBeGreaterThanOrEqual(44);
  expect(geometry.profileLeft).toBeLessThanOrEqual(60);
  expect(geometry.profileTop).toBeGreaterThanOrEqual(575);
  expect(geometry.profileTop).toBeLessThanOrEqual(625);
  expect(geometry.profileWidth).toBeGreaterThanOrEqual(278);
  expect(geometry.profileWidth).toBeLessThanOrEqual(300);
  expect(geometry.profileHeight).toBeGreaterThanOrEqual(385);
  expect(geometry.profileHeight).toBeLessThanOrEqual(420);
  expect(geometry.resumeActionWidth).toBeGreaterThanOrEqual(145);
  expect(geometry.resumeActionWidth).toBeLessThanOrEqual(165);
  expect(geometry.caseStudyActionWidth).toBeGreaterThanOrEqual(198);
  expect(geometry.caseStudyActionWidth).toBeLessThanOrEqual(215);
  expect(geometry.profileBelowHeading).toBe(true);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
});
