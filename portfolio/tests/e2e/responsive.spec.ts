/* eslint-disable no-undef -- Playwright evaluates this module in Node.js. */
import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";
import { getPublicRoutes } from "@/tests/e2e/route-inventory";

const viewports = [
  { width: 320, height: 800, navigation: "mobile" },
  { width: 390, height: 844, navigation: "mobile" },
  { width: 768, height: 1024, navigation: "mobile" },
  { width: 1024, height: 768, navigation: "desktop" },
  { width: 1440, height: 900, navigation: "desktop" },
] as const;

for (const viewport of viewports) {
  test(`${viewport.width}px layout has no overflow and exposes ${viewport.navigation} navigation`, async ({ page }, testInfo) => {
    const publicRoutes = await getPublicRoutes();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of publicRoutes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const dimensions = await page.evaluate(() => ({
        body: document.body.scrollWidth,
        document: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));

      expect(dimensions.body, `${route} body overflow at ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(dimensions.document, `${route} document overflow at ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
    }

    await page.goto("/");
    const mobileTrigger = page.getByRole("button", { name: "Open menu" });
    const desktopNavigation = page.getByRole("navigation", { name: "Primary" });

    if (viewport.navigation === "mobile") {
      await expect(mobileTrigger).toBeVisible();
      await expect(desktopNavigation).toBeHidden();

      if (viewport.width === 320 || viewport.width === 390) {
        await mobileTrigger.click();
        const dialog = page.getByRole("dialog", { name: "Site navigation" });
        await expect(dialog).toBeVisible();
        await expect(dialog.getByRole("link")).toHaveCount(5);
        await expect(dialog).toBeInViewport();
        await dialog.getByRole("button", { name: "Close menu" }).click();
        await expect(mobileTrigger).toBeFocused();
      }
    } else {
      await expect(mobileTrigger).toBeHidden();
      await expect(desktopNavigation).toBeVisible();
    }

    if (testInfo.project.name === "chromium") {
      const screenshot = await page.screenshot({ fullPage: true });
      const screenshotHash = createHash("sha256").update(screenshot).digest("hex");
      await testInfo.attach(`homepage-${viewport.width}px`, {
        body: screenshot,
        contentType: "image/png",
      });
      globalThis.console.log(
        `Screenshot evidence: homepage ${viewport.width}x${viewport.height}; ${screenshot.byteLength} bytes; sha256 ${screenshotHash}`,
      );
    }

    testInfo.annotations.push({
      type: "coverage",
      description: `${publicRoutes.length} routes checked at ${viewport.width}x${viewport.height}`,
    });
    globalThis.console.log(
      `Responsive coverage: ${publicRoutes.length} sitemap routes at ${viewport.width}x${viewport.height}; 0 overflow failures`,
    );
  });
}
