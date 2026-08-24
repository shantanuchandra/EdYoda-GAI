import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import CaseStudiesPage from "@/app/(site)/case-studies/page";

it("renders all four employer and two independent records once with truthful destinations", async () => {
  render(await CaseStudiesPage());

  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(6);
  expect(cards.map((card) => card.getAttribute("data-case-study-kind"))).toEqual([
    "employer", "employer", "employer", "employer", "product", "product",
  ]);
  const intro = screen.getByTestId("case-studies-intro");
  expect(within(intro).getByRole("heading", { level: 1, name: "Case Studies" })).toBeInTheDocument();
  expect(within(intro).getByText(/Explore transformation work and independent builds through the systems, decisions and outcomes behind them/i)).toBeInTheDocument();
  expect(within(cards[4]).getByText("Active")).toBeInTheDocument();
  expect(within(cards[5]).getByText("Active")).toBeInTheDocument();
  expect(within(cards[5]).getByRole("link", { name: "View product" })).toHaveAttribute("href", "/products/card-compass");
  expect(screen.getAllByRole("link", { name: /Read case study|View product/ })).toHaveLength(6);
  expect(within(cards[0]).getByRole("img", { name: "Lenskart" })).toHaveAttribute("src", expect.stringContaining("%2Fimages%2Fcompanies%2Flenskart.png"));
  expect(within(cards[4]).getByRole("img", { name: "Wasabi Travels brand mark" })).toBeInTheDocument();
  expect(within(cards[5]).getByRole("img", { name: "CardCompass brand mark" })).toBeInTheDocument();
  expect(within(cards[0]).getByText("Retail")).toBeInTheDocument();
});

it("uses quiet reference-style tags without visible result counts", async () => {
  render(await CaseStudiesPage());
  const filters = screen.getByRole("group", { name: "Filter case studies" });
  expect(filters).toHaveAttribute("data-case-studies-filter-controls", "true");
  expect(within(filters).queryByText("Filter by portfolio focus")).not.toBeInTheDocument();
  expect(within(filters).getByRole("button", { name: "Employer transformations" })).toHaveAttribute("aria-pressed", "false");
  expect(within(filters).getByRole("button", { name: "Retail" })).toBeInTheDocument();
  expect(within(filters).getByRole("button", { name: "Applied AI" })).toBeInTheDocument();
  expect(within(filters).getByRole("button", { name: "Financial services" })).toBeInTheDocument();
  expect(within(filters).getByRole("button", { name: "Retail media" })).toBeInTheDocument();
  expect(within(filters).getByRole("button", { name: "Independent products" })).toBeInTheDocument();
  expect(within(filters).queryByRole("button", { name: /All case studies/ })).not.toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "Filter case studies" })).toBeInTheDocument();
});
