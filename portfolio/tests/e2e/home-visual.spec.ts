/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("desktop header and hero match the reference first-fold proportions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("[data-hero-motion='card']").evaluate((element) => Promise.all(
    element.getAnimations().map((animation) => animation.finished),
  ));

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
    const lead = hero.querySelector<HTMLElement>("h2");
    const actionLinks = hero.querySelectorAll<HTMLElement>("a[href='/resume'], a[href='/case-studies']");
    const actionBoxes = [...actionLinks].map((action) => action.getBoundingClientRect());
    const wordmark = header.querySelector<HTMLElement>("a");
    if (!portrait) throw new Error("Professional portrait is missing");
    if (!lead) throw new Error("Hero role statement is missing");
    if (!wordmark) throw new Error("Site wordmark is missing");
    const headingRange = document.createRange();
    headingRange.selectNodeContents(heading);
    const lineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);

    return {
      actions: actionLinks.length,
      headerHeight: headerBox.height,
      headingHeight: headingBox.height,
      headingLines: headingBox.height / lineHeight,
      headingInkRight: headingRange.getBoundingClientRect().right,
      headingRight: headingBox.right,
      headingSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      headingTop: headingBox.top,
      heroHeight: heroBox.height,
      heroTop: heroBox.top,
      leadHeight: lead.getBoundingClientRect().height,
      leadTop: lead.getBoundingClientRect().top,
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
  expect(geometry.headingSize).toBeGreaterThanOrEqual(88);
  expect(geometry.headingSize).toBeLessThanOrEqual(92);
  expect(geometry.headingTop).toBeGreaterThanOrEqual(305);
  expect(geometry.headingTop).toBeLessThanOrEqual(330);
  expect(geometry.headingInkRight).toBeLessThanOrEqual(825);
  expect(geometry.profileLeft).toBeGreaterThan(geometry.headingRight);
  expect(geometry.profileLeft).toBeGreaterThanOrEqual(824);
  expect(geometry.profileLeft).toBeLessThanOrEqual(842);
  expect(geometry.profileTop).toBeGreaterThanOrEqual(178);
  expect(geometry.profileTop).toBeLessThanOrEqual(198);
  expect(geometry.profileWidth).toBeGreaterThanOrEqual(495);
  expect(geometry.profileWidth).toBeLessThanOrEqual(520);
  expect(geometry.profileHeight).toBeGreaterThanOrEqual(600);
  expect(geometry.profileHeight).toBeLessThanOrEqual(630);
  expect(geometry.portraitSize).toBeGreaterThanOrEqual(90);
  expect(geometry.portraitSize).toBeLessThanOrEqual(100);
  expect(geometry.leadTop).toBeGreaterThanOrEqual(462);
  expect(geometry.leadTop).toBeLessThanOrEqual(480);
  expect(geometry.leadHeight).toBeGreaterThanOrEqual(105);
  expect(geometry.leadHeight).toBeLessThanOrEqual(125);
  expect(geometry.resumeActionWidth).toBeGreaterThanOrEqual(145);
  expect(geometry.resumeActionTop).toBeGreaterThanOrEqual(620);
  expect(geometry.resumeActionTop).toBeLessThanOrEqual(636);
  expect(geometry.caseStudyActionWidth).toBeGreaterThanOrEqual(198);
  expect(geometry.wordmarkLeft).toBeGreaterThanOrEqual(106);
  expect(geometry.wordmarkLeft).toBeLessThanOrEqual(116);
  expect(geometry.actions).toBe(2);
});

test("mobile hero stacks the reference composition without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("[data-hero-motion='card']").evaluate((element) => Promise.all(
    element.getAnimations().map((animation) => animation.finished),
  ));

  const geometry = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>("#home-hero-title");
    const hero = document.querySelector<HTMLElement>("section[aria-labelledby='home-hero-title']");
    const profileCard = document.querySelector<HTMLElement>("[aria-label='Professional profile']");
    if (!heading || !hero || !profileCard) throw new Error("Mobile first fold is incomplete");
    const heroBox = hero.getBoundingClientRect();
    const profileBox = profileCard.getBoundingClientRect();
    const header = document.querySelector<HTMLElement>("header");
    const actions = [...hero.querySelectorAll<HTMLElement>("a[href='/resume'], a[href='/case-studies']")]
      .map((action) => action.getBoundingClientRect());
    const lead = hero.querySelector<HTMLElement>("h2");
    if (!header) throw new Error("Mobile header is missing");
    if (!lead) throw new Error("Mobile role statement is missing");
    const menuTrigger = header.querySelector<HTMLElement>("button");
    if (!menuTrigger) throw new Error("Mobile menu trigger is missing");
    const headingLineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);
    const menuDisc = getComputedStyle(menuTrigger, "::before");
    return {
      fontSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      headerHeight: header.getBoundingClientRect().height,
      heroHeight: heroBox.height,
      heroTop: heroBox.top,
      pageWidth: document.documentElement.scrollWidth,
      headingLines: heading.getBoundingClientRect().height / headingLineHeight,
      leadTop: lead.getBoundingClientRect().top,
      menuDiscBackground: menuDisc.backgroundColor,
      menuDiscRadius: menuDisc.borderRadius,
      menuDiscWidth: Number.parseFloat(menuDisc.width),
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

  expect(geometry.fontSize).toBeGreaterThanOrEqual(42);
  expect(geometry.fontSize).toBeLessThanOrEqual(46);
  expect(geometry.headingLines).toBeLessThanOrEqual(1.1);
  expect(geometry.headerHeight).toBeGreaterThanOrEqual(78);
  expect(geometry.headerHeight).toBeLessThanOrEqual(82);
  expect(geometry.heroTop).toBeGreaterThanOrEqual(94);
  expect(geometry.heroTop).toBeLessThanOrEqual(98);
  expect(geometry.heroHeight).toBeGreaterThanOrEqual(900);
  expect(geometry.heroHeight).toBeLessThanOrEqual(1030);
  expect(geometry.leadTop).toBeGreaterThanOrEqual(245);
  expect(geometry.leadTop).toBeLessThanOrEqual(262);
  expect(geometry.menuDiscBackground).toBe("rgb(231, 239, 235)");
  expect(geometry.menuDiscRadius).toBe("50%");
  expect(geometry.menuDiscWidth).toBe(40);
  expect(geometry.profileLeft).toBeGreaterThanOrEqual(24);
  expect(geometry.profileLeft).toBeLessThanOrEqual(38);
  expect(geometry.profileTop).toBeGreaterThanOrEqual(540);
  expect(geometry.profileTop).toBeLessThanOrEqual(565);
  expect(geometry.profileWidth).toBeGreaterThanOrEqual(325);
  expect(geometry.profileWidth).toBeLessThanOrEqual(345);
  expect(geometry.profileHeight).toBeGreaterThanOrEqual(485);
  expect(geometry.profileHeight).toBeLessThanOrEqual(515);
  expect(geometry.resumeActionWidth).toBeGreaterThanOrEqual(145);
  expect(geometry.resumeActionWidth).toBeLessThanOrEqual(165);
  expect(geometry.caseStudyActionWidth).toBeGreaterThanOrEqual(198);
  expect(geometry.caseStudyActionWidth).toBeLessThanOrEqual(215);
  expect(geometry.profileBelowHeading).toBe(true);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
});
