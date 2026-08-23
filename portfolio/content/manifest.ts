/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize TypeScript type-only imports. */
import type { ContentKind } from "@/lib/content/schema";

export const contentManifest: Record<ContentKind, readonly string[]> = {
  work: [
    "work/lenskart-ai-retail.mdx",
    "work/iifl-digital-lending.mdx",
    "work/agl-adtech-operations.mdx",
    "work/builder-conversational-ai.mdx",
  ],
  products: ["products/wasabi-travels.mdx", "products/card-compass.mdx"],
  learning: [
    "learning/applied-ai-non-technical.mdx",
    "learning/ai-product-transformation.mdx",
    "learning/practical-agents-founders.mdx",
  ],
  insights: ["insights/signal-system-scale.mdx"],
};
