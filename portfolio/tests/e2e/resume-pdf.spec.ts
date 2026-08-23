/* eslint-disable no-undef -- page.evaluate executes this callback in the browser context. */
import { expect, test } from "@playwright/test";

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
