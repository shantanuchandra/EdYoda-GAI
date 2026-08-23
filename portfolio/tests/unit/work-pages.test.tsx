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

it("lists the four public employer stories with approved context, methods, role and outcome without making a card one link", async () => {
  await renderWorkIndex();

  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(4);

  const expectedCards = [
    {
      company: "Lenskart", role: "AI Product Lead", outcome: "200 stores", context: "Hindi and English voice-guided eye test",
      industry: "Retail · Applied AI", methods: ["AI portfolio selection", "On-device intent detection", "Model evaluation", "Human review"],
    },
    {
      company: "IIFL", role: "AVP / Lead Product Manager", outcome: "1 week → 20 minutes", context: "Employed-customer onboarding and approval",
      industry: "Financial Services · Applied AI", methods: ["Digital onboarding", "RAG assistant", "Human approval", "Audit trail"],
    },
    {
      company: "AGL", role: "Senior Product Manager, AdTech", outcome: "70% less", context: "Manual campaign work",
      industry: "AdTech · Retail Media", methods: ["Campaign automation", "Rules engine", "Inventory checks", "Reporting"],
    },
    {
      company: "Builder.ai", role: "Senior Product Manager", outcome: "90%", context: "Adoption among 150 customer-success managers",
      industry: "Conversational AI · SaaS", methods: ["Customer interviews", "Beta programs", "Sales enablement", "Model evaluation"],
    },
  ];

  expectedCards.forEach(({ company, role, outcome, context, industry, methods }, index) => {
    const card = cards[index];
    expect(card.closest("a")).toBeNull();
    expect(within(card).getByText(company)).toBeInTheDocument();
    expect(within(card).getByText(industry)).toBeInTheDocument();
    expect(within(card).getByText(role)).toBeInTheDocument();
    expect(within(card).getByText(outcome)).toBeInTheDocument();
    expect(within(card).getByText(context)).toBeInTheDocument();
    methods.forEach((method) => expect(within(card).getByText(method)).toBeInTheDocument());
    expect(within(card).getByRole("link", { name: "Read case study" })).toBeInTheDocument();
  });
});

it("keeps the table of contents before the narrative in DOM order while retaining a desktop sticky rail", async () => {
  const { container } = render(await WorkDetailPage({ params: Promise.resolve({ slug: "lenskart-ai-retail" }) }));
  const toc = screen.getByRole("navigation", { name: "On this page" });
  const narrative = container.querySelector(".case-study__body");
  const tocRail = toc.closest("aside");

  expect(narrative).not.toBeNull();
  expect(toc.compareDocumentPosition(narrative as Node) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  expect(tocRail).toHaveClass("lg:sticky");
  expect(tocRail).not.toHaveClass("order-first");
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
