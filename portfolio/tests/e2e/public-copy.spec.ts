/* eslint-disable no-undef -- Playwright evaluates this module in Node.js. */
import { expect, test } from "@playwright/test";
import { siteConfig } from "@/lib/site-config";
import { getPublicRoutes } from "@/tests/e2e/route-inventory";

const forbiddenPublicCopy = [
  /edyoda/i,
  /80887\s*52191/,
  /SC_Enterprise_AI_Product_Transformation_Resume_Dubai/i,
  /\b(?:TO(?:DO)|TBD)\b/i,
  /lorem ipsum/i,
] as const;

test("all rendered routes remain public-safe and expose exact contact syntax", async ({ page, request }, testInfo) => {
  const publicRoutes = await getPublicRoutes();
  let scannedRoutes = 0;

  for (const route of publicRoutes) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    const initialHtml = await response.text();
    for (const forbidden of forbiddenPublicCopy) {
      expect(initialHtml, `${route} initial HTML contains ${forbidden}`).not.toMatch(forbidden);
    }

    await page.goto(route, { waitUntil: "domcontentloaded" });
    const renderedHtml = await page.content();
    for (const forbidden of forbiddenPublicCopy) {
      expect(renderedHtml, `${route} rendered HTML contains ${forbidden}`).not.toMatch(forbidden);
    }

    const mailLinks = page.locator(`a[href="mailto:${siteConfig.email}"]`);
    const linkedInLinks = page.locator(`a[href="${siteConfig.linkedin}"]`);
    expect(await mailLinks.count(), `${route} must expose the canonical mailto link`).toBeGreaterThan(0);
    expect(await linkedInLinks.count(), `${route} must expose the canonical LinkedIn link`).toBeGreaterThan(0);
    expect(await page.locator('a[href^="mailto:"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(
      Array.from({ length: await mailLinks.count() }, () => `mailto:${siteConfig.email}`),
    );
    expect(await page.locator('a[href*="linkedin.com"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(
      Array.from({ length: await linkedInLinks.count() }, () => siteConfig.linkedin),
    );
    scannedRoutes += 1;
  }

  testInfo.annotations.push({ type: "coverage", description: `${scannedRoutes} sitemap routes scanned for public copy` });
  globalThis.console.log(`Public-copy E2E coverage: ${scannedRoutes} sitemap routes; exact mailto and LinkedIn syntax`);
});
