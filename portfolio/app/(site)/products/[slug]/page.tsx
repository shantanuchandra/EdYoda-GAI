/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/content/product-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { compileContent, getContentBySlug, getPublicSlugs } from "@/lib/content/loader";
import { buildContentMetadata } from "@/lib/metadata";
import { buildCreativeWorkJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublicSlugs("products")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug("products", slug);

  if (!item) return {};

  return buildContentMetadata({
    title: item.metadata.seo.title,
    description: item.metadata.seo.description,
    path: `/products/${item.metadata.slug}`,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getContentBySlug("products", slug);

  if (!item) notFound();

  return (
    <>
      <ProductDetail item={item}>{await compileContent(item)}</ProductDetail>
      <JsonLd data={buildCreativeWorkJsonLd(item, "products")} />
    </>
  );
}
