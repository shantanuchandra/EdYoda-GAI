import { expect, it } from "vitest";
import { getPublicContent } from "@/lib/content/loader";

it("publishes the approved launch inventory", async () => {
  expect((await getPublicContent("work")).map((item) => item.metadata.slug)).toEqual([
    "lenskart-ai-retail",
    "iifl-digital-lending",
    "agl-adtech-operations",
    "builder-conversational-ai",
  ]);
  expect((await getPublicContent("products"))).toHaveLength(2);
  expect((await getPublicContent("learning"))).toHaveLength(3);
  expect((await getPublicContent("insights"))).toHaveLength(1);
});

it("preserves approved outcome qualifiers for recruiting and lending", async () => {
  const work = await getPublicContent("work");
  const lenskart = work.find((item) => item.metadata.slug === "lenskart-ai-retail");
  const iifl = work.find((item) => item.metadata.slug === "iifl-digital-lending");

  expect(lenskart?.metadata.outcomes).toContainEqual({
    value: "About 8 weeks → 1 week",
    label: "Recruiter sourcing and interest checks across 300 candidates",
  });
  expect(iifl?.metadata.outcomes).toContainEqual({
    value: "80%",
    label: "About 100 weekly questions cleared a 95% confidence threshold",
  });
});
