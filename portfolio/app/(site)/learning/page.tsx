/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { Metadata } from "next";
import { EmptyState } from "@/components/content/empty-state";
import { LearningPathCard } from "@/components/content/learning-path-card";
import { getPublicContent } from "@/lib/content/loader";
import type { ContentItem } from "@/lib/content/schema";
import { buildContentMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildContentMetadata({
  title: "Shantanu Chandra Learning Lab",
  description: "Shantanu Chandra Learning Lab offers three practical learning paths for operators, product leaders, founders, and emerging AI builders.",
  path: "/learning",
});

export function LearningIndex({ items }: { items: ContentItem[] }) {
  return (
    <section className="learning-page" data-learning-canvas>
      <div className="learning-page__canvas">
        <header className="learning-page__intro" data-learning-intro>
          <p>Learning</p>
          <h1>Shantanu Chandra Learning Lab</h1>
          <p>Three practical overviews for people turning AI ideas into useful workflows, governed products, and production-ready systems.</p>
        </header>
        {items.length > 0 ? (
          <div className="learning-page__grid" data-learning-grid>
            {items.map((item) => <LearningPathCard headingLevel={2} item={item} key={item.metadata.slug} />)}
          </div>
        ) : (
          <EmptyState
            title="Learning paths are being prepared."
            description="There are no public Learning Lab paths available right now. The portfolio homepage is a useful place to start."
          />
        )}
      </div>
    </section>
  );
}

export default async function LearningIndexPage() {
  return <LearningIndex items={await getPublicContent("learning")} />;
}
