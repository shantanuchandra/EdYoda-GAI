/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize imports used by JSX. */
import { ContentIndexHeader } from "@/components/content/content-index-header";
import { EmptyState } from "@/components/content/empty-state";
import { WorkGrid } from "@/components/content/work-grid";
import { Container } from "@/components/ui/container";
import { getPublicContent } from "@/lib/content/loader";
import { buildContentMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildContentMetadata({
  title: "Selected employer work",
  description: "Evidence-led AI transformation case studies from Shantanu Chandra, with operating context, responsible controls and measurable outcomes intact.",
  path: "/work",
});

export default async function WorkIndexPage() {
  const items = await getPublicContent("work");

  return (
    <section className="py-[var(--section-space)]">
      <Container>
        <ContentIndexHeader
          eyebrow="Employer work"
          title="Transformation work, with the operating context intact."
          description="Four public case studies about the product decisions, workflows, controls and adoption work behind measurable change."
        />
        {items.length > 0 ? <WorkGrid items={items} /> : (
          <EmptyState
            title="Work stories are being prepared."
            description="There are no public employer case studies available right now. The portfolio homepage is a useful place to start."
          />
        )}
      </Container>
    </section>
  );
}
import type { Metadata } from "next";
