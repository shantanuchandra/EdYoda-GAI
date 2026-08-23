/* eslint-disable no-undef -- page.evaluate executes this callback in the browser context. */
import { expect, test } from "@playwright/test";

const pdfPath = "/shantanu-chandra-resume.pdf";

test("does not prefetch any rendered PDF resume link", async ({ page }) => {
  const pdfRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === pdfPath) {
      pdfRequests.push(request.url());
    }
  });

  for (const route of ["/", "/contact", "/resume?print=1"]) {
    pdfRequests.length = 0;
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const renderedPdfLinks = page.locator(`a[href="${pdfPath}"]`);
    expect(await renderedPdfLinks.count(), `${route} must render at least one PDF link`).toBeGreaterThan(0);

    for (const link of await renderedPdfLinks.all()) {
      await link.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(750);

    expect(pdfRequests, `${route} made an unsolicited PDF request`).toEqual([]);
  }
});

test("fetches the PDF when a visitor activates a resume link", async ({ page }) => {
  await page.goto("/");

  const responsePromise = page.waitForResponse(
    (response) => new URL(response.url()).pathname === pdfPath,
  );
  await page.getByRole("link", { name: "Download resume", exact: true }).first().click();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 4).toString("ascii")).toBe("%PDF");
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
