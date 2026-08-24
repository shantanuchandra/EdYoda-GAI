/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("the reference home keeps case-study cards on their dedicated route", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("region", { name: "Selected employer work" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Explore Case Studies" })).toHaveAttribute("href", "/case-studies");
  await expect(page.locator("[data-featured-work-card]")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1440);
});

test("the shorter home composition preserves the dedicated case-studies route on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("region", { name: "Selected employer work" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Explore Case Studies" })).toHaveAttribute("href", "/case-studies");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
