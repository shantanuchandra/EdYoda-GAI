/* eslint-disable no-undef -- Playwright evaluates this module in Node.js. */
import { expect, test } from "@playwright/test";
import { getPublicRoutes } from "@/tests/e2e/route-inventory";

test("all public routes are server-rendered and keyboard reachable", async ({ page, request }, testInfo) => {
  const publicRoutes = await getPublicRoutes();

  for (const route of publicRoutes) {
    const serverResponse = await request.get(route);
    expect(serverResponse.status(), `${route} must return HTTP 200`).toBe(200);
    expect(await serverResponse.text(), `${route} must include its h1 in the initial HTML`).toMatch(/<h1\b/i);

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await page.keyboard.press(testInfo.project.name === "webkit" ? "Alt+Tab" : "Tab");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();
    expect(await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
    expect(Number.parseFloat(await skipLink.evaluate((element) => getComputedStyle(element).outlineWidth))).toBeGreaterThanOrEqual(3);

    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  }

  testInfo.annotations.push({ type: "coverage", description: `${publicRoutes.length} sitemap routes navigated` });
  globalThis.console.log(`Navigation coverage: ${publicRoutes.length} sitemap routes; server HTML, h1, skip link, focus`);
});

test("primary navigation reaches a public destination", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});
