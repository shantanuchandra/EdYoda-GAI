/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/article-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { compileContent, getContentBySlug, getPublicSlugs } from "@/lib/content/loader";
import { buildContentMetadata } from "@/lib/metadata";
import { buildArticleJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublicSlugs("insights")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug("insights", slug);

  if (!item) return {};

  return buildContentMetadata({
    title: item.metadata.seo.title,
    description: item.metadata.seo.description,
    path: `/insights/${item.metadata.slug}`,
    type: "article",
    publishedAt: item.metadata.publishedAt,
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getContentBySlug("insights", slug);

  if (!item) notFound();

  return (
    <>
      <ArticleLayout item={item}>{await compileContent(item)}</ArticleLayout>
      <JsonLd data={buildArticleJsonLd(item)} />
    </>
  );
}
