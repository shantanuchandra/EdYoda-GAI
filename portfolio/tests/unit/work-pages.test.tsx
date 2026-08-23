/* eslint-disable no-undef -- the inherited Babel parser does not apply DOM/TypeScript scope analysis. */
import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import WorkDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(site)/work/[slug]/page";
it("keeps the table of contents before the narrative in DOM order while retaining a desktop sticky rail", async () => {
  const { container } = render(await WorkDetailPage({ params: Promise.resolve({ slug: "lenskart-ai-retail" }) }));
  const toc = screen.getByRole("navigation", { name: "On this page" });
  const narrative = container.querySelector(".case-study__body");
  const tocRail = toc.closest("aside");

  expect(narrative).not.toBeNull();
  expect(toc.compareDocumentPosition(narrative as Node) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  expect(tocRail).toHaveClass("lg:sticky");
  expect(tocRail).not.toHaveClass("order-first");
  expect(screen.getByRole("list", { name: "Case-study outcomes" })).toBeInTheDocument();
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
