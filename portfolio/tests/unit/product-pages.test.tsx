import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import ProductDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(site)/products/[slug]/page";
import ProductsIndexPage from "@/app/(site)/products/page";

it("lists the two public independent products with their honest status, verified evidence, and internal detail links", async () => {
  render(await ProductsIndexPage());

  expect(screen.getByRole("heading", { level: 1, name: "Applied AI Builds" })).toBeInTheDocument();
  expect(screen.getByText("Only experiments with a public problem statement, operating status, and evidence appear here.")).toBeInTheDocument();

  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(2);
  expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual([
    "Wasabi Travels",
    "Card Compass",
  ]);

  const expectedProducts = [
    { title: "Wasabi Travels", outcome: "2,000+ places", href: "/products/wasabi-travels", status: "Active" },
    { title: "Card Compass", outcome: "121", href: "/products/card-compass", status: "Case study only" },
  ];

  expectedProducts.forEach(({ title, outcome, href, status }, index) => {
    const card = cards[index];
    expect(card.closest("a")).toBeNull();
    expect(within(card).getByText("Independent product")).toBeInTheDocument();
    expect(within(card).getByText(status)).toBeInTheDocument();
    expect(within(card).getByText(outcome)).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: title })).toHaveAttribute("href", href);
    const action = within(card).getByRole("link", { name: "View product" });
    expect(action).toHaveAttribute("href", href);
    expect(action).toHaveClass("inline-flex", "min-h-11", "items-center");
    expect(action).toHaveTextContent("→");
    expect(action).not.toHaveTextContent("↗");
  });
});

it("renders Wasabi as the only active live destination and keeps Card Compass case-study-only", async () => {
  const { container, rerender } = render(
    await ProductDetailPage({ params: Promise.resolve({ slug: "wasabi-travels" }) }),
  );

  const wasabiLink = screen.getByRole("link", { name: "Visit Wasabi Travels (opens in a new tab)" });
  expect(wasabiLink).toHaveAttribute("href", "https://wasabitravels.com/");
  expect(wasabiLink).toHaveAttribute("target", "_blank");
  expect(wasabiLink).toHaveAttribute("rel", "noreferrer");
  expect(screen.getByText("2,000+ places")).toBeInTheDocument();
  expect(screen.getByRole("list", { name: "Product evidence" })).toBeInTheDocument();
  expect(container.querySelectorAll('[target="_blank"]')).toHaveLength(1);

  rerender(await ProductDetailPage({ params: Promise.resolve({ slug: "card-compass" }) }));
  expect(screen.getByText("Case study only")).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Visit Card Compass/i })).not.toBeInTheDocument();
  expect(container.querySelector('[href="https://cardcompass.in/"]')).toBeNull();
  expect(container.querySelectorAll('[target="_blank"]')).toHaveLength(0);
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
