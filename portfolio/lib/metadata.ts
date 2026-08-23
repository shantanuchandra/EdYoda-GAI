/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize TypeScript declarations or runtime globals. */
import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

export const socialImagePath = "/opengraph-image";

type ContentMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
};

function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}

export function buildContentMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  publishedAt,
}: ContentMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(socialImagePath);
  const metadataTitle = absoluteTitle ? { absolute: title } : title;
  const images = [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.descriptor}` }];
  const openGraph: Metadata["openGraph"] = type === "article"
    ? {
        type,
        title,
        description,
        url: canonical,
        siteName: siteConfig.name,
        publishedTime: publishedAt,
        images,
      } as const
    : {
        type,
        title,
        description,
        url: canonical,
        siteName: siteConfig.name,
        images,
      };

  return {
    title: metadataTitle,
    description,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
