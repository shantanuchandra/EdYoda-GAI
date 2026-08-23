/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningPathDetail } from "@/components/content/learning-path-detail";
import { compileContent, getContentBySlug, getPublicSlugs } from "@/lib/content/loader";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublicSlugs("learning")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug("learning", slug);

  if (!item) return {};

  return { title: item.metadata.seo.title, description: item.metadata.seo.description };
}

export default async function LearningDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getContentBySlug("learning", slug);

  if (!item) notFound();

  return <LearningPathDetail item={item}>{await compileContent(item)}</LearningPathDetail>;
}
