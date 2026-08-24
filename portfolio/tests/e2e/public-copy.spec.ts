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

test("all server-rendered routes remain public-safe and expose exact contact syntax", async ({ request }, testInfo) => {
  const publicRoutes = await getPublicRoutes();
  let scannedRoutes = 0;

  for (const route of publicRoutes) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    const initialHtml = await response.text();
    for (const forbidden of forbiddenPublicCopy) {
      expect(initialHtml, `${route} initial HTML contains ${forbidden}`).not.toMatch(forbidden);
    }

    const hrefs = Array.from(initialHtml.matchAll(/\shref="([^"]+)"/g), (match) => match[1].replaceAll("&amp;", "&"));
    const mailLinks = hrefs.filter((href) => href.startsWith("mailto:"));
    const linkedInLinks = hrefs.filter((href) => href.includes("linkedin.com"));
    expect(mailLinks.length, `${route} must expose the canonical mailto link`).toBeGreaterThan(0);
    expect(linkedInLinks.length, `${route} must expose the canonical LinkedIn link`).toBeGreaterThan(0);
    expect(mailLinks).toEqual(Array.from({ length: mailLinks.length }, () => `mailto:${siteConfig.email}`));
    expect(linkedInLinks).toEqual(Array.from({ length: linkedInLinks.length }, () => siteConfig.linkedin));
    scannedRoutes += 1;
  }

  testInfo.annotations.push({ type: "coverage", description: `${scannedRoutes} sitemap routes scanned for public copy` });
  globalThis.console.log(`Public-copy E2E coverage: ${scannedRoutes} sitemap routes; exact mailto and LinkedIn syntax`);
});
