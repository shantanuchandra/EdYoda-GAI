/* eslint-disable no-undef -- the inherited Babel parser does not apply DOM/TypeScript scope analysis. */
import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import WorkDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(site)/work/[slug]/page";
import WorkIndexPage from "@/app/(site)/work/page";

async function renderWorkIndex() {
  render(await WorkIndexPage());
}

it("lists the four public employer stories with a role and qualified outcome without making a card one link", async () => {
  await renderWorkIndex();

  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(4);

  const expectedCards = [
    ["Lenskart", "AI Product Lead", "200 stores", "Hindi and English voice-guided eye test"],
    ["IIFL", "AVP / Lead Product Manager", "1 week → 20 minutes", "Employed-customer onboarding and approval"],
    ["AGL", "Senior Product Manager, AdTech", "70% less", "Manual campaign work"],
    ["Builder.ai", "Senior Product Manager", "90%", "Adoption among 150 customer-success managers"],
  ] as const;

  expectedCards.forEach(([company, role, outcome, context], index) => {
    const card = cards[index];
    expect(card.closest("a")).toBeNull();
    expect(within(card).getByText(company)).toBeInTheDocument();
    expect(within(card).getByText(role)).toBeInTheDocument();
    expect(within(card).getByText(outcome)).toBeInTheDocument();
    expect(within(card).getByText(context)).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: "Read case study" })).toBeInTheDocument();
  });
});

it("generates only approved static work routes and reports branded metadata", async () => {
  await expect(generateStaticParams()).resolves.toEqual([
    { slug: "lenskart-ai-retail" },
    { slug: "iifl-digital-lending" },
    { slug: "agl-adtech-operations" },
    { slug: "builder-conversational-ai" },
  ]);

  await expect(
    generateMetadata({ params: Promise.resolve({ slug: "iifl-digital-lending" }) }),
  ).resolves.toMatchObject({
    title: "Responsible AI operations for digital lending",
    description: "Shantanu Chandra led AI-enabled lending operations, human approval controls, and a field-sales RAG assistant pilot at IIFL.",
  });
});

it("rejects a non-public work slug through the route's not-found branch", async () => {
  await expect(
    WorkDetailPage({ params: Promise.resolve({ slug: "not-public" }) }),
  ).rejects.toThrow(/404|not found/i);
});
