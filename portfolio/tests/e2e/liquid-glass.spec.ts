/* eslint-disable no-undef -- Browser globals execute inside Playwright page.evaluate callbacks. */
import { expect, test, type Page } from "@playwright/test";

async function surfaceStyle(page: Page, selector: string) {
  return page.locator(selector).first().evaluate((element) => {
    const style = getComputedStyle(element);
    const colorChannels = style.backgroundColor.match(/[\d.]+/g) ?? [];
    return {
      alpha: colorChannels.length >= 4 ? Number.parseFloat(colorChannels.at(-1) ?? "1") : 1,
      backdropFilter: style.backdropFilter || style.getPropertyValue("-webkit-backdrop-filter"),
      boxShadow: style.boxShadow,
    };
  });
}

test("uses restrained Signal Lens glass on navigation and interactive portfolio surfaces", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/learning", { waitUntil: "domcontentloaded" });

  const header = await surfaceStyle(page, ".site-header");
  const courseCard = await surfaceStyle(page, "[data-learning-path-card]");

  expect(header.alpha).toBeLessThan(0.94);
  expect(header.backdropFilter).toContain("blur(");
  expect(courseCard.alpha).toBeLessThan(0.9);
  expect(courseCard.backdropFilter).toContain("blur(");
  expect(courseCard.boxShadow).not.toBe("none");

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const profileSignal = await surfaceStyle(page, ".signal-profile-card__current");
  const specialization = await surfaceStyle(page, "[data-specialization-card]");
  expect(profileSignal.backdropFilter).toContain("blur(");
  expect(specialization.backdropFilter).toContain("blur(");

  await page.goto("/case-studies", { waitUntil: "domcontentloaded" });
  const caseStudy = await surfaceStyle(page, "[data-case-study-card]");
  expect(caseStudy.alpha).toBeLessThan(0.94);
  expect(caseStudy.backdropFilter).toContain("blur(");

  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  const contactPanel = await surfaceStyle(page, "[data-contact-panel]");
  expect(contactPanel.alpha).toBeLessThan(0.9);
  expect(contactPanel.backdropFilter).toContain("blur(");
});

test("keeps editorial reading surfaces opaque and free from glass blur", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work/lenskart-ai-retail", { waitUntil: "domcontentloaded" });
  const caseStudyStory = await surfaceStyle(page, "[data-case-study-story]");
  expect(caseStudyStory.backdropFilter).toBe("none");

  await page.goto("/resume", { waitUntil: "domcontentloaded" });
  const resume = await surfaceStyle(page, ".resume-document");
  expect(resume.backdropFilter).toBe("none");
});

test("uses a readable glass navigation sheet on mobile without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/learning", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open menu" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const menu = await surfaceStyle(page, ".mobile-navigation__dialog");
  expect(menu.alpha).toBeGreaterThanOrEqual(0.9);
  expect(menu.alpha).toBeLessThan(0.99);
  expect(menu.backdropFilter).toContain("blur(");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
});
