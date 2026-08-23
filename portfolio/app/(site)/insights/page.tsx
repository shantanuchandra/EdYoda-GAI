/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { Metadata } from "next";
import { ContentIndexHeader } from "@/components/content/content-index-header";
import { EmptyState } from "@/components/content/empty-state";
import { InsightCard } from "@/components/content/insight-card";
import { Container } from "@/components/ui/container";
import { getPublicContent } from "@/lib/content/loader";
import type { ContentItem } from "@/lib/content/schema";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical AI product viewpoints from Shantanu Chandra on finding valuable signals, designing responsible systems, and scaling adoption.",
};

export function InsightsIndex({ items }: { items: ContentItem[] }) {
  return (
    <section className="py-[var(--section-space)]">
      <Container>
        <ContentIndexHeader
          eyebrow="Ideas in practice"
          title="Insights"
          description="Practical product viewpoints about the judgment, operating design, and adoption work around AI systems."
        />
        {items.length > 0 ? (
          <div className="mt-12 grid gap-5">
            {items.map((item) => <InsightCard item={item} key={item.metadata.slug} />)}
          </div>
        ) : (
          <EmptyState
            title="Insights are being prepared."
            description="There are no public articles available right now. Explore the selected transformation work in the meantime."
            actionHref="/work"
            actionLabel="Explore selected work"
          />
        )}
      </Container>
    </section>
  );
}

export default async function InsightsIndexPage() {
  return <InsightsIndex items={await getPublicContent("insights")} />;
}
