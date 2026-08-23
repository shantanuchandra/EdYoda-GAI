/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test, type Locator, type Page } from "@playwright/test";

type AnimationSummary = {
  delay: number;
  duration: number;
  keyframes: Array<{ opacity?: string | number; transform?: string }>;
};

async function animationSummaries(locator: Locator): Promise<AnimationSummary[]> {
  return locator.evaluate((element) => element.getAnimations({ subtree: true }).map((animation) => {
    const effect = animation.effect as KeyframeEffect | null;
    const timing = effect?.getTiming();
    return {
      delay: Number(timing?.delay ?? 0),
      duration: Number(timing?.duration ?? 0),
      keyframes: (effect?.getKeyframes() ?? []).map(({ opacity, transform }) => ({
        opacity: opacity == null ? undefined : opacity,
        transform: transform == null ? undefined : String(transform),
      })),
    };
  }));
}

async function expectAnimation(
  page: Page,
  selector: string,
  duration: number,
  delay: number,
) {
  await expect(page.locator(selector), `${selector} exists`).toHaveCount(1);
  await expect.poll(async () => {
    const animations = await animationSummaries(page.locator(selector));
    return animations.some((animation) => animation.duration === duration && animation.delay === delay);
  }, { timeout: Math.max(2_000, delay + duration + 500) }).toBe(true);
}

test("Fold 1 follows the reference entrance sequence and continuing motion", async ({ page }) => {
  const rawResponse = await page.request.get("/");
  const rawHtml = await rawResponse.text();
  const bootScript = 'document.documentElement.dataset.fold1Motion="enabled"';
  expect(rawHtml).toContain(bootScript);
  expect(rawHtml.indexOf(bootScript)).toBeLessThan(rawHtml.indexOf('data-hero-motion="shell"'));
  expect(rawHtml).not.toContain('data-fold1-motion="enabled"');

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expectAnimation(page, "[data-hero-motion='shell']", 300, 0);
  await expectAnimation(page, "[data-hero-motion='title']", 500, 300);
  await expectAnimation(page, "[data-hero-motion='rule']", 500, 400);
  await expectAnimation(page, "[data-hero-motion='lead']", 500, 500);
  await expectAnimation(page, "[data-hero-motion='actions']", 500, 600);
  await expectAnimation(page, "[data-hero-motion='card']", 700, 700);

  const typedKeyword = page.locator("[data-hero-typewriter]");
  await expect(typedKeyword).toHaveAttribute("aria-hidden", "true");
  const startingKeyword = await typedKeyword.textContent();
  await expect.poll(() => typedKeyword.textContent(), { timeout: 4_500 }).not.toBe(startingKeyword);

  const scrollCueIcon = page.locator("[data-hero-scroll-cue] span");
  const startingCueTransform = await scrollCueIcon.evaluate((element) => getComputedStyle(element).transform);
  await expect.poll(() => scrollCueIcon.evaluate((element) => getComputedStyle(element).transform)).not.toBe(startingCueTransform);

  const primaryAction = page.getByRole("link", { name: "View Resume" });
  const shine = primaryAction.locator("[data-button-shine]");
  await expect(shine).toHaveCount(1);
  const [actionBox, shineBox] = await Promise.all([primaryAction.boundingBox(), shine.boundingBox()]);
  expect(actionBox).not.toBeNull();
  expect(shineBox?.width ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(actionBox?.width ?? 0);
  expect(shineBox?.height).toBe(actionBox?.height);
  await primaryAction.hover();
  await expect.poll(async () => (await animationSummaries(shine)).some(({ duration }) => duration === 800)).toBe(true);

  const profile = page.getByLabel("Professional profile");
  const profileBox = await profile.boundingBox();
  expect(profileBox).not.toBeNull();
  await page.mouse.move((profileBox?.x ?? 0) + 1, (profileBox?.y ?? 0) + 1);
  await expect.poll(async () => {
    const style = await profile.getAttribute("style");
    const rotation = style?.match(/rotateX\((-?[\d.]+)deg\).*rotateY\((-?[\d.]+)deg\)/);
    if (!rotation) return false;

    const [, rotateX, rotateY] = rotation.map(Number);
    return rotateX >= -6.2 && rotateX <= -5.5 && rotateY >= 5.5 && rotateY <= 6.2;
  }).toBe(true);
  await expect.poll(() => profile.locator(".signal-profile-card__sheen").getAttribute("style")).toMatch(/translateX\([0-2](?:\.[0-9]+)?%\)/);

  const header = page.locator(".site-header");
  await page.evaluate(() => window.scrollTo(0, 120));
  await expect(header).toHaveAttribute("data-compact", "true");
  await expect(page.locator("[data-hero-scroll-cue]")).toBeHidden();
});

test("Fold 1 is complete without JavaScript and static under reduced motion", async ({ browser }) => {
  const noScriptContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto("/");
  await expect(noScriptPage.getByRole("heading", { level: 1, name: "Shantanu Chandra" })).toBeVisible();
  await expect(noScriptPage.getByRole("heading", { level: 2, name: "AI Transformation Leader across industries" })).toBeVisible();
  await expect(noScriptPage.getByLabel("Professional profile")).toBeVisible();
  const nativeCue = noScriptPage.getByRole("link", { name: "Scroll to impact highlights" });
  await expect(nativeCue).toHaveAttribute("href", "#impact-highlights");
  await nativeCue.click();
  await expect(noScriptPage).toHaveURL(/#impact-highlights$/);
  await noScriptContext.close();

  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("/", { waitUntil: "domcontentloaded" });

  for (const selector of [
    "[data-hero-motion='shell']",
    "[data-hero-motion='title']",
    "[data-hero-motion='rule']",
    "[data-hero-motion='lead']",
    "[data-hero-motion='actions']",
    "[data-hero-motion='card']",
    "[data-hero-scroll-cue]",
  ]) {
    await expect(reducedPage.locator(selector)).toHaveCount(1);
    expect(await animationSummaries(reducedPage.locator(selector)), selector).toEqual([]);
  }

  await expect(reducedPage.locator("[data-hero-typewriter]")).toHaveText("across industries");
  const profile = reducedPage.getByLabel("Professional profile");
  const before = await profile.evaluate((element) => getComputedStyle(element).transform);
  await reducedPage.mouse.move(20, 180);
  expect(await profile.evaluate((element) => getComputedStyle(element).transform)).toBe(before);
  await reducedContext.close();
});

test("mobile menu mirrors the reference overlay transition", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open menu" }).click();

  const overlay = page.locator(".mobile-navigation__overlay");
  await expect(overlay).toBeVisible();
  await expect.poll(async () => (await animationSummaries(overlay)).some(({ duration }) => duration === 200)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await expect(overlay).toBeHidden();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
