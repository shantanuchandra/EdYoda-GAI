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
  expect(screen.getByRole("heading", { level: 2, name: "Employer transformations" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: "Independent products" })).toBeInTheDocument();
  expect(within(cards[4]).getByText("Active")).toBeInTheDocument();
  expect(within(cards[5]).getByText("Active")).toBeInTheDocument();
  expect(within(cards[5]).getByRole("link", { name: "View product" })).toHaveAttribute("href", "/products/card-compass");
  expect(screen.getAllByRole("link", { name: /Read case study|View product/ })).toHaveLength(6);
});

it("exposes filter controls and result counts", async () => {
  render(await CaseStudiesPage());
  const filters = screen.getByRole("group", { name: "Filter case studies" });
  expect(within(filters).getByRole("button", { name: /All.*6/ })).toHaveAttribute("aria-pressed", "true");
  expect(within(filters).getByRole("button", { name: /Employer transformations.*4/ })).toBeInTheDocument();
  expect(within(filters).getByRole("button", { name: /Independent products.*2/ })).toBeInTheDocument();
});
