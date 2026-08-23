/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript syntax in E2E tests. */
import { expect, test } from "@playwright/test";

const products = [
  { slug: "wasabi-travels", title: "Wasabi Travels", outcome: "2,000+ places", href: "https://wasabitravels.com/" },
  { slug: "card-compass", title: "Card Compass", outcome: "121", href: "https://cardcompass.in/" },
] as const;

test("lists the two verified independent products without a placeholder third card", async ({ page }) => {
  const response = await page.goto("/products");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Applied AI Builds" })).toBeVisible();
  await expect(page.getByText("Only experiments with a public problem statement, operating status, and evidence appear here.")).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(2);

  for (const product of products) {
    const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: product.title }) });
    await expect(card.getByText("Independent product", { exact: true })).toBeVisible();
    await expect(card.getByText("Active")).toBeVisible();
    await expect(card.getByText(product.outcome)).toBeVisible();
    await expect(card.getByRole("link", { name: "View product" })).toHaveAttribute("href", `/products/${product.slug}`);
  }
});

for (const product of products) {
  test(`renders ${product.slug} with its guarded external destination`, async ({ page }) => {
    const response = await page.goto(`/products/${product.slug}`);

    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: product.title })).toBeVisible();
    const externalLink = page.getByRole("link", { name: `Visit ${product.title} (opens in a new tab)` });
    await expect(externalLink).toHaveAttribute("href", product.href);
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await expect(externalLink).toHaveAttribute("rel", "noreferrer");
  });
}

test("returns the branded 404 page for an unpublished product slug", async ({ page }) => {
  const response = await page.goto("/products/not-public");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "This page is outside the map." })).toBeVisible();
});
