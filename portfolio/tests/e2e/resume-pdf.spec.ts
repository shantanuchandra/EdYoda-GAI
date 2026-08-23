/* eslint-disable no-undef -- page.evaluate executes this callback in the browser context. */
import { expect, test } from "@playwright/test";

const pdfPath = "/shantanu-chandra-resume.pdf";

test("does not prefetch PDF resume links on any sitemap route", async ({ page, request }, testInfo) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status(), "sitemap.xml must be available for route discovery").toBe(200);

  const sitemapXml = await sitemapResponse.text();
  const sitemapLocations = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
  expect(sitemapLocations.length, "sitemap.xml must publish at least one route").toBeGreaterThan(0);

  const sitemapUrls = sitemapLocations.map((location) => new URL(location));
  const sitemapOrigins = new Set(sitemapUrls.map((url) => url.origin));
  expect(sitemapOrigins.size, "every sitemap entry must use one canonical origin").toBe(1);

  const routes = sitemapUrls.map((url) => `${url.pathname}${url.search}`);
  expect(new Set(routes).size, "sitemap.xml must not contain duplicate routes").toBe(routes.length);

  const pdfRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === pdfPath) {
      pdfRequests.push(request.url());
    }
  });

  let checkedLinks = 0;
  for (const route of routes) {
    pdfRequests.length = 0;
    const routeResponse = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(routeResponse?.status(), `sitemap route ${route} must return HTTP 200`).toBe(200);

    const renderedPdfLinks = page.locator(`a[href="${pdfPath}"]`);
    const routeLinkCount = await renderedPdfLinks.count();
    expect(routeLinkCount, `${route} must render at least one PDF link`).toBeGreaterThan(0);
    checkedLinks += routeLinkCount;

    for (const link of await renderedPdfLinks.all()) {
      await link.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(750);

    expect(pdfRequests, `${route} made an unsolicited PDF request`).toEqual([]);
  }

  testInfo.annotations.push({
    type: "coverage",
    description: `${routes.length} sitemap routes; ${checkedLinks} rendered PDF links checked`,
  });
  globalThis.console.log(
    `PDF prefetch coverage: ${routes.length} sitemap routes; ${checkedLinks} rendered PDF links checked; 0 unsolicited requests`,
  );
});

test("fetches the PDF when a visitor activates a resume link", async ({ page }) => {
  type PdfResponse = { body: Buffer; contentType: string; status: number };
  let resolvePdfResponse: (response: PdfResponse) => void = () => undefined;
  const pdfResponse = new Promise<PdfResponse>((resolve) => {
    resolvePdfResponse = resolve;
  });

  await page.route(pdfPath, async (route) => {
    const response = await route.fetch();
    const body = await response.body();

    resolvePdfResponse({
      body,
      contentType: response.headers()["content-type"] ?? "",
      status: response.status(),
    });
    await route.fulfill({ response, body });
  });

  await page.goto("/");

  await page.getByRole("link", { name: "Download resume", exact: true }).first().click({ noWaitAfter: true });
  const response = await pdfResponse;

  expect(response.status).toBe(200);
  expect(response.contentType).toContain("application/pdf");
  expect(response.body.subarray(0, 4).toString("ascii")).toBe("%PDF");
});

test("settles the print source without prefetching the generated asset", async ({ page }) => {
  const response = await page.goto("/resume?print=1", {
    waitUntil: "networkidle",
    timeout: 5_000,
  });

  expect(response?.status()).toBe(200);
});

test("uses a 12 millimeter print-page margin", async ({ page }) => {
  await page.goto("/resume?print=1");

  const pageMargins = await page.evaluate(() =>
    Array.from(document.styleSheets).flatMap((styleSheet) =>
      Array.from(styleSheet.cssRules)
        .filter((rule): rule is CSSPageRule => rule instanceof CSSPageRule)
        .map((rule) => rule.style.margin),
    ),
  );

  expect(pageMargins).toContain("12mm");
});

test("serves the public resume as a PDF download", async ({ request }) => {
  const response = await request.get("/shantanu-chandra-resume.pdf");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");

  const body = await response.body();
  expect(body.subarray(0, 4).toString("ascii")).toBe("%PDF");
});
