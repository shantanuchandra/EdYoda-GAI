/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ContentItem } from "@/lib/content/schema";
import { WorkCard } from "@/components/content/work-card";

type WorkGridProps = {
  items: ContentItem[];
};

export function WorkGrid({ items }: WorkGridProps) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <WorkCard item={item} key={item.metadata.slug} />
      ))}
    </div>
  );
}
