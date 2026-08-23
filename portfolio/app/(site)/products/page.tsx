/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { ContentIndexHeader } from "@/components/content/content-index-header";
import { EmptyState } from "@/components/content/empty-state";
import { ProductCard } from "@/components/content/product-card";
import { Container } from "@/components/ui/container";
import { getPublicContent } from "@/lib/content/loader";
import { buildContentMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildContentMetadata({
  title: "Independent products",
  description: "Explore Shantanu Chandra’s independent product stories, including a Japan itinerary planner and transparent card recommendation case study.",
  path: "/products",
});

export default async function ProductsIndexPage() {
  const items = await getPublicContent("products");

  return (
    <section className="py-[var(--section-space)]">
      <Container>
        <ContentIndexHeader
          eyebrow="Independent products"
          title="Applied AI Builds"
          description="Only experiments with a public problem statement, operating status, and evidence appear here."
        />
        {items.length > 0 ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {items.map((item) => <ProductCard item={item} key={item.metadata.slug} />)}
          </div>
        ) : (
          <EmptyState
            title="Product stories are being prepared."
            description="There are no public independent products available right now. The portfolio homepage is a useful place to start."
          />
        )}
      </Container>
    </section>
  );
}
import type { Metadata } from "next";
