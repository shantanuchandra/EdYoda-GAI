/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ContentItem } from "@/lib/content/schema";
import { LearningPathCard } from "@/components/content/learning-path-card";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type LearningPreviewProps = { items: ContentItem[] };

export function LearningPreview({ items }: LearningPreviewProps) {
  return (
    <section aria-label="AI courses" className="pt-[var(--section-space)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            description="Practical overviews for people who need to make better AI product and operating decisions."
            eyebrow="Shantanu Chandra AI Courses"
            title="Make the work legible."
          />
          <ActionLink href="/learning">Explore AI Courses</ActionLink>
        </div>
        <div className="mt-12 grid gap-4 min-[900px]:grid-cols-3">
          {items.map((item) => <LearningPathCard headingLevel={3} item={item} key={item.metadata.slug} />)}
        </div>
      </Container>
    </section>
  );
}
