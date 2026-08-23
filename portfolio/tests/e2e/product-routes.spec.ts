/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript syntax in E2E tests. */
import { expect, test } from "@playwright/test";

const products = [
  { slug: "wasabi-travels", title: "Wasabi Travels", outcome: "2,000+ places", status: "Active" },
  { slug: "card-compass", title: "Card Compass", outcome: "121", status: "Case study only" },
] as const;

test("lists the two verified independent products without a placeholder third card", async ({ page }) => {
  const response = await page.goto("/products");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Evidence from transformation work and independent builds." })).toBeVisible();
  await expect(page.getByRole("region", { name: "Independent products" })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(6);

  for (const product of products) {
    const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: product.title }) });
    await expect(card.getByText("Independent product", { exact: true })).toBeVisible();
    await expect(card.getByText(product.status)).toBeVisible();
    await expect(card.getByText(product.outcome)).toBeVisible();
    const action = card.getByRole("link", { name: "View product" });
    await expect(action).toHaveAttribute("href", `/products/${product.slug}`);
    await expect(action).toContainText("→");
    expect((await action.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
});

test("renders Wasabi as the only active live destination", async ({ page }) => {
  const response = await page.goto("/products/wasabi-travels");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Wasabi Travels" })).toBeVisible();
  await expect(page.getByText("Active")).toBeVisible();
  const externalLink = page.getByRole("link", { name: "Visit Wasabi Travels (opens in a new tab)" });
  await expect(externalLink).toHaveAttribute("href", "https://wasabitravels.com/");
  await expect(externalLink).toHaveAttribute("target", "_blank");
  await expect(externalLink).toHaveAttribute("rel", "noreferrer");
  await expect(page.locator('[target="_blank"]')).toHaveCount(1);
});

test("renders Card Compass as case-study-only without an outbound destination", async ({ page }) => {
  const response = await page.goto("/products/card-compass");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Card Compass" })).toBeVisible();
  await expect(page.getByText("Case study only")).toBeVisible();
  await expect(page.getByRole("link", { name: /Visit Card Compass/i })).toHaveCount(0);
  await expect(page.locator('[href="https://cardcompass.in/"]')).toHaveCount(0);
  await expect(page.locator('[target="_blank"]')).toHaveCount(0);
});

test("returns the branded 404 page for an unpublished product slug", async ({ page }) => {
  const response = await page.goto("/products/not-public");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "This page is outside the map." })).toBeVisible();
});
