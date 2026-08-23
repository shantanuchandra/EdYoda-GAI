import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import ProductDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(site)/products/[slug]/page";
import ProductsIndexPage from "@/app/(site)/products/page";

it("lists only the two public independent products with active status, verified evidence, and internal detail links", async () => {
  render(await ProductsIndexPage());

  expect(screen.getByRole("heading", { level: 1, name: "Applied AI Builds" })).toBeInTheDocument();
  expect(screen.getByText("Only experiments with a public problem statement, operating status, and evidence appear here.")).toBeInTheDocument();

  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(2);

  const expectedProducts = [
    { title: "Wasabi Travels", outcome: "2,000+ places", href: "/products/wasabi-travels" },
    { title: "Card Compass", outcome: "121", href: "/products/card-compass" },
  ];

  expectedProducts.forEach(({ title, outcome, href }, index) => {
    const card = cards[index];
    expect(card.closest("a")).toBeNull();
    expect(within(card).getByText("Independent product")).toBeInTheDocument();
    expect(within(card).getByText("Active")).toBeInTheDocument();
    expect(within(card).getByText(outcome)).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: title })).toHaveAttribute("href", href);
    expect(within(card).getByRole("link", { name: "View product" })).toHaveAttribute("href", href);
  });
});

it("renders static product pages with guarded factual external destinations", async () => {
  const { rerender } = render(
    await ProductDetailPage({ params: Promise.resolve({ slug: "wasabi-travels" }) }),
  );

  const wasabiLink = screen.getByRole("link", { name: "Visit Wasabi Travels (opens in a new tab)" });
  expect(wasabiLink).toHaveAttribute("href", "https://wasabitravels.com/");
  expect(wasabiLink).toHaveAttribute("target", "_blank");
  expect(wasabiLink).toHaveAttribute("rel", "noreferrer");
  expect(screen.getByText("2,000+ places")).toBeInTheDocument();

  rerender(await ProductDetailPage({ params: Promise.resolve({ slug: "card-compass" }) }));
  const cardCompassLink = screen.getByRole("link", { name: "Visit Card Compass (opens in a new tab)" });
  expect(cardCompassLink).toHaveAttribute("href", "https://cardcompass.in/");
  expect(cardCompassLink).toHaveAttribute("target", "_blank");
  expect(cardCompassLink).toHaveAttribute("rel", "noreferrer");
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
