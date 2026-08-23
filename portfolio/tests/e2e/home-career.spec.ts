/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

function translateX(transform: string) {
  if (transform === "none") return 0;
  const values = transform.slice(transform.indexOf("(") + 1, transform.lastIndexOf(")")).split(",").map(Number);
  return values.length === 6 ? values[4] : values[12];
}

test("desktop career fold matches the reference marquee proportions and placement", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Career snapshot" });
  await section.scrollIntoViewIfNeeded();

  const geometry = await section.evaluate((element) => {
    const heading = element.querySelector<HTMLElement>("h2");
    const hero = document.querySelector<HTMLElement>("section[aria-labelledby='home-hero-title']");
    const viewport = element.querySelector<HTMLElement>("[data-career-viewport]");
    const card = element.querySelector<HTMLElement>("[data-career-card]");
    const track = element.querySelector<HTMLElement>("[data-career-track]");
    if (!heading || !hero || !viewport || !card || !track) throw new Error("Career fold contract is incomplete");
    const sectionBox = element.getBoundingClientRect();
    const headingBox = heading.getBoundingClientRect();
    const heroBox = hero.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const viewportBox = viewport.getBoundingClientRect();
    const headingStyle = getComputedStyle(heading);
    const cardStyle = getComputedStyle(card);

    return {
      cardHeight: cardBox.height,
      cardRadius: Number.parseFloat(cardStyle.borderRadius),
      cardWidth: cardBox.width,
      headingFontSize: Number.parseFloat(headingStyle.fontSize),
      headingTextAlign: headingStyle.textAlign,
      headingTopOffset: headingBox.top - sectionBox.top,
      heroGap: sectionBox.top - heroBox.bottom,
      pageWidth: document.documentElement.scrollWidth,
      sectionHeight: sectionBox.height,
      viewportWidth: viewportBox.width,
      viewportClientWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.heroGap).toBeGreaterThanOrEqual(-20);
  expect(geometry.heroGap).toBeLessThanOrEqual(20);
  expect(geometry.sectionHeight).toBeGreaterThanOrEqual(540);
  expect(geometry.sectionHeight).toBeLessThanOrEqual(590);
  expect(geometry.headingTopOffset).toBeGreaterThanOrEqual(60);
  expect(geometry.headingTopOffset).toBeLessThanOrEqual(90);
  expect(geometry.headingFontSize).toBeGreaterThanOrEqual(28);
  expect(geometry.headingFontSize).toBeLessThanOrEqual(32);
  expect(geometry.headingTextAlign).toBe("center");
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(298);
  expect(geometry.cardWidth).toBeLessThanOrEqual(302);
  expect(geometry.cardHeight).toBeGreaterThanOrEqual(300);
  expect(geometry.cardHeight).toBeLessThanOrEqual(310);
  expect(geometry.cardRadius).toBeGreaterThanOrEqual(11);
  expect(geometry.cardRadius).toBeLessThanOrEqual(14);
  expect(geometry.viewportWidth).toBeGreaterThanOrEqual(1_240);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportClientWidth + 1);

  const track = section.locator("[data-career-track]");
  const firstTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(240);
  const secondTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  expect(secondTransform).not.toBe(firstTransform);

  const pause = section.getByRole("button", { name: "Pause career motion" });
  await pause.click();
  await expect(section.getByRole("button", { name: "Resume career motion" })).toBeVisible();
  await page.waitForTimeout(32);
  const pausedTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(240);
  expect(await track.evaluate((element) => getComputedStyle(element).transform)).toBe(pausedTransform);

  await section.getByRole("button", { name: "Resume career motion" }).click();
  await expect(section.getByRole("button", { name: "Pause career motion" })).toBeVisible();
  const viewport = section.locator("[data-career-viewport]");
  const viewportBox = await viewport.boundingBox();
  expect(viewportBox).not.toBeNull();
  const viewportCenterX = (viewportBox?.x ?? 0) + (viewportBox?.width ?? 0) / 2;
  const viewportCenterY = (viewportBox?.y ?? 0) + (viewportBox?.height ?? 0) / 2;
  const resumedTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  await expect.poll(() => track.evaluate((element) => getComputedStyle(element).transform)).not.toBe(resumedTransform);
  await page.mouse.move(1, 1);
  await page.mouse.move(viewportCenterX, viewportCenterY);
  await expect.poll(async () => {
    await viewport.dispatchEvent("mouseover");
    await page.waitForTimeout(40);
    const first = translateX(await track.evaluate((element) => getComputedStyle(element).transform));
    await page.waitForTimeout(180);
    const second = translateX(await track.evaluate((element) => getComputedStyle(element).transform));
    return Math.abs(second - first);
  }, { timeout: 3_000 }).toBeLessThanOrEqual(1);
});

test("mobile career fold shows one reference-sized card with edge peeks and no overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Career snapshot" });
  await expect(section.getByRole("button", { name: "Career motion is disabled" })).toBeDisabled();
  await section.evaluate((element) => element.scrollIntoView({ block: "center" }));
  const geometry = await section.evaluate((element) => {
    const heading = element.querySelector<HTMLElement>("h2");
    const card = element.querySelector<HTMLElement>("[data-career-card]");
    const viewport = element.querySelector<HTMLElement>("[data-career-viewport]");
    if (!heading || !card || !viewport) throw new Error("Mobile career fold contract is incomplete");
    const sectionBox = element.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const headingBox = heading.getBoundingClientRect();
    return {
      cardHeight: cardBox.height,
      cardWidth: cardBox.width,
      headingFontSize: Number.parseFloat(getComputedStyle(heading).fontSize),
      headingTopOffset: headingBox.top - sectionBox.top,
      pageWidth: document.documentElement.scrollWidth,
      sectionHeight: sectionBox.height,
      viewportWidth: viewport.getBoundingClientRect().width,
      viewportClientWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.sectionHeight).toBeGreaterThanOrEqual(535);
  expect(geometry.sectionHeight).toBeLessThanOrEqual(575);
  expect(geometry.headingTopOffset).toBeGreaterThanOrEqual(58);
  expect(geometry.headingTopOffset).toBeLessThanOrEqual(76);
  expect(geometry.headingFontSize).toBeGreaterThanOrEqual(23);
  expect(geometry.headingFontSize).toBeLessThanOrEqual(25);
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(278);
  expect(geometry.cardWidth).toBeLessThanOrEqual(282);
  expect(geometry.cardHeight).toBeGreaterThanOrEqual(300);
  expect(geometry.cardHeight).toBeLessThanOrEqual(310);
  expect(geometry.viewportWidth).toBe(358);
  expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportClientWidth + 1);
});

test("career marquee stays operable without animation, with keyboard, reduced motion and no JavaScript", async ({ browser, page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.getByRole("region", { name: "Career snapshot" });
  const viewport = section.locator("[data-career-viewport]");
  const track = section.locator("[data-career-track]");
  await expect(section.getByRole("button", { name: "Career motion is disabled" })).toBeDisabled();
  await expect.poll(() => track.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  const reducedBefore = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(250);
  expect(await track.evaluate((element) => getComputedStyle(element).transform)).toBe(reducedBefore);

  await viewport.focus();
  await expect(viewport).toBeFocused();
  const keyboardBefore = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => track.evaluate((element) => getComputedStyle(element).transform)).not.toBe(keyboardBefore);

  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noScriptPage = await context.newPage();
  await noScriptPage.goto("/");
  const noScriptSection = noScriptPage.getByRole("region", { name: "Career snapshot" });
  await expect(noScriptSection.getByRole("list", { name: "Career timeline" })).toBeVisible();
  await expect(noScriptSection.locator("[data-career-card]").first()).toBeVisible();
  await context.close();
});
