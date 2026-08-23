/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/content/case-study-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { compileContent, getContentBySlug, getPublicContent, getPublicSlugs } from "@/lib/content/loader";
import { buildContentMetadata } from "@/lib/metadata";
import { buildCreativeWorkJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublicSlugs("work")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug("work", slug);

  if (!item) return {};

  return buildContentMetadata({
    title: item.metadata.seo.title,
    description: item.metadata.seo.description,
    path: `/work/${item.metadata.slug}`,
  });
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const [item, items] = await Promise.all([getContentBySlug("work", slug), getPublicContent("work")]);

  if (!item) notFound();

  const currentIndex = items.findIndex((candidate) => candidate.metadata.slug === item.metadata.slug);
  const nextItem = items.length > 1 ? items[(currentIndex + 1) % items.length] : undefined;

  return (
    <>
      <CaseStudyLayout item={item} nextItem={nextItem}>{await compileContent(item)}</CaseStudyLayout>
      <JsonLd data={buildCreativeWorkJsonLd(item, "work")} />
    </>
  );
}
