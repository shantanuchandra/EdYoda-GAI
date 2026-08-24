/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript syntax in E2E tests. */
import { expect, test } from "@playwright/test";

const products = [
  { slug: "wasabi-travels", title: "Wasabi Travels", status: "Active" },
  { slug: "card-compass", title: "Card Compass", status: "Active" },
] as const;

test("lists the two verified independent products without a placeholder third card", async ({ page }) => {
  const response = await page.goto("/products");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Case Studies" })).toBeVisible();
  await expect(page.getByRole("group", { name: "Filter case studies" })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(6);

  for (const product of products) {
    const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: product.title }) });
    await expect(card.getByText("Independent product", { exact: true })).toBeVisible();
    await expect(card.getByText(product.status)).toBeVisible();
    await expect(card.getByRole("img", { name: `${product.title === "Card Compass" ? "CardCompass" : product.title} brand mark` })).toBeVisible();
    const action = card.getByRole("link", { name: "View product" });
    await expect(action).toHaveAttribute("href", `/products/${product.slug}`);
    expect((await action.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
});

test("renders Wasabi as an active live destination", async ({ page }) => {
  const response = await page.goto("/products/wasabi-travels");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Wasabi Travels" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Wasabi Travels brand mark" })).toBeVisible();
  await expect(page.getByText("Active")).toBeVisible();
  const externalLink = page.getByRole("link", { name: "Visit Wasabi Travels (opens in a new tab)" });
  await expect(externalLink).toHaveAttribute("href", "https://wasabitravels.com/");
  await expect(externalLink).toHaveAttribute("target", "_blank");
  await expect(externalLink).toHaveAttribute("rel", "noreferrer");
  await expect(page.locator('[target="_blank"]')).toHaveCount(1);
});

test("renders Card Compass as an active live destination", async ({ page }) => {
  const response = await page.goto("/products/card-compass");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Card Compass" })).toBeVisible();
  await expect(page.getByRole("img", { name: "CardCompass brand mark" })).toBeVisible();
  await expect(page.getByText("Active")).toBeVisible();
  const externalLink = page.getByRole("link", { name: "Visit Card Compass (opens in a new tab)" });
  await expect(externalLink).toHaveAttribute("href", "https://www.cardcompass.in/");
  await expect(externalLink).toHaveAttribute("target", "_blank");
  await expect(externalLink).toHaveAttribute("rel", "noreferrer");
  await expect(page.locator('[target="_blank"]')).toHaveCount(1);
});

test("returns the branded 404 page for an unpublished product slug", async ({ page }) => {
  const response = await page.goto("/products/not-public");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "This page is outside the map." })).toBeVisible();
});
