/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import type { ContentItem } from "@/lib/content/schema";
import { ProductCard } from "@/components/content/product-card";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type ProductsPreviewProps = { items: ContentItem[] };

export function ProductsPreview({ items }: ProductsPreviewProps) {
  return (
    <section aria-label="Independent products" className="pt-[var(--section-space)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            description="Small, independent products where I stay close to real users, constraints and product craft."
            eyebrow="Independent products"
            title="Building keeps judgment honest."
          />
          <ActionLink href="/case-studies#independent-products">See independent case studies</ActionLink>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map((item) => <ProductCard headingLevel={3} item={item} key={item.metadata.slug} />)}
        </div>
      </Container>
    </section>
  );
}
