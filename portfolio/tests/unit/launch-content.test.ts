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
