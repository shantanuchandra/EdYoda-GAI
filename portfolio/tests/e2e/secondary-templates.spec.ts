/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

for (const path of [
  "/about",
  "/insights",
  "/insights/signal-system-scale",
  "/learning/applied-ai-non-technical",
  "/work/lenskart-ai-retail",
  "/products/card-compass",
  "/not-public",
]) {
  test(`uses the shared portfolio template surface on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(path, { waitUntil: "domcontentloaded" });

    const geometry = await page.evaluate(() => {
      const surface = document.querySelector<HTMLElement>("[data-portfolio-template]");
      const heading = document.querySelector<HTMLElement>("main h1");
      if (!surface || !heading) throw new Error("Shared portfolio template surface is missing");
      const surfaceRect = surface.getBoundingClientRect();
      return {
        headingSize: Number.parseFloat(getComputedStyle(heading).fontSize),
        surface: { left: surfaceRect.left, width: surfaceRect.width },
        overflow: document.documentElement.scrollWidth - innerWidth,
      };
    });

    expect(geometry.surface.left).toBe(0);
    expect(geometry.surface.width).toBe(1280);
    expect(geometry.headingSize).toBeGreaterThanOrEqual(32);
    expect(geometry.overflow).toBeLessThanOrEqual(0);
  });
}
