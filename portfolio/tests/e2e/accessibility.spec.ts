import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { getPublicRoutes } from "@/tests/e2e/route-inventory";

test("all public routes have no serious or critical axe violations", async ({ page }, testInfo) => {
  const publicRoutes = await getPublicRoutes();
  let scannedRoutes = 0;

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page }).analyze();
    const blockingViolations = results.violations.filter(({ impact }) => impact === "serious" || impact === "critical");

    expect(blockingViolations, `${route}: ${JSON.stringify(blockingViolations, null, 2)}`).toEqual([]);
    scannedRoutes += 1;
  }

  testInfo.annotations.push({ type: "coverage", description: `${scannedRoutes} sitemap routes scanned with axe` });
  globalThis.console.log(`Axe coverage: ${scannedRoutes} sitemap routes; 0 serious/critical violations`);
});
