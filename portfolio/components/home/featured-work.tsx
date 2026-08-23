/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ContentItem } from "@/lib/content/schema";
import { WorkGrid } from "@/components/content/work-grid";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type FeaturedWorkProps = { items: ContentItem[] };

export function FeaturedWork({ items }: FeaturedWorkProps) {
  return (
    <section aria-label="Selected employer work" className="pt-[var(--section-space)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            description="Selected stories from products and operating systems I helped move from opportunity to everyday use."
            eyebrow="Selected work"
            title="Evidence before theatre."
          />
          <ActionLink href="/work">View all work</ActionLink>
        </div>
        <WorkGrid headingLevel={3} items={items} />
      </Container>
    </section>
  );
}
