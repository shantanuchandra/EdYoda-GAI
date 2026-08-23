/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { Metadata } from "next";
import { ContentIndexHeader } from "@/components/content/content-index-header";
import { EmptyState } from "@/components/content/empty-state";
import { LearningPathCard } from "@/components/content/learning-path-card";
import { Container } from "@/components/ui/container";
import { getPublicContent } from "@/lib/content/loader";
import type { ContentItem } from "@/lib/content/schema";

export const metadata: Metadata = {
  title: "Shantanu Chandra Learning Lab",
  description: "Shantanu Chandra Learning Lab offers three practical learning paths for operators, product leaders, founders, and emerging AI builders.",
};

export function LearningIndex({ items }: { items: ContentItem[] }) {
  return (
    <section className="py-[var(--section-space)]">
      <Container>
        <ContentIndexHeader
          eyebrow="Learning"
          title="Shantanu Chandra Learning Lab"
          description="Three practical overviews for people turning AI ideas into useful workflows, governed products, and production-ready systems."
        />
        {items.length > 0 ? (
          <div className="mt-12 grid gap-5 min-[900px]:grid-cols-3">
            {items.map((item) => <LearningPathCard headingLevel={2} item={item} key={item.metadata.slug} />)}
          </div>
        ) : (
          <EmptyState
            title="Learning paths are being prepared."
            description="There are no public Learning Lab paths available right now. The portfolio homepage is a useful place to start."
          />
        )}
      </Container>
    </section>
  );
}

export default async function LearningIndexPage() {
  return <LearningIndex items={await getPublicContent("learning")} />;
}
