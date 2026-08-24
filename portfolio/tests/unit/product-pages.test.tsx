import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import ProductDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(site)/products/[slug]/page";

it("renders both independent products as active live destinations", async () => {
  const { container, rerender } = render(
    await ProductDetailPage({ params: Promise.resolve({ slug: "wasabi-travels" }) }),
  );

  const wasabiLink = screen.getByRole("link", { name: "Visit Wasabi Travels (opens in a new tab)" });
  expect(wasabiLink).toHaveAttribute("href", "https://wasabitravels.com/");
  expect(wasabiLink).toHaveAttribute("target", "_blank");
  expect(wasabiLink).toHaveAttribute("rel", "noreferrer");
  expect(screen.getByRole("img", { name: "Wasabi Travels brand mark" })).toBeInTheDocument();
  expect(screen.getByText("2,000+ places")).toBeInTheDocument();
  expect(screen.getByRole("list", { name: "Product evidence" })).toBeInTheDocument();
  expect(container.querySelectorAll('[target="_blank"]')).toHaveLength(1);

  rerender(await ProductDetailPage({ params: Promise.resolve({ slug: "card-compass" }) }));
  expect(screen.getByText("Active")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "CardCompass brand mark" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Visit Card Compass (opens in a new tab)" })).toHaveAttribute("href", "https://www.cardcompass.in/");
  expect(container.querySelectorAll('[target="_blank"]')).toHaveLength(1);
  expect(screen.getByText("121")).toBeInTheDocument();
});

it("generates only approved static product routes and product metadata", async () => {
  await expect(generateStaticParams()).resolves.toEqual([
    { slug: "wasabi-travels" },
    { slug: "card-compass" },
  ]);

  await expect(
    generateMetadata({ params: Promise.resolve({ slug: "card-compass" }) }),
  ).resolves.toMatchObject({
    title: "Card Compass: clearer card recommendations",
    description: "An independent product that uses spending patterns and reward rules to help people explore clearer card recommendations.",
  });
});

it("uses the branded not-found branch for an unpublished product", async () => {
  await expect(
    ProductDetailPage({ params: Promise.resolve({ slug: "not-public" }) }),
  ).rejects.toThrow(/404|not found/i);
});
