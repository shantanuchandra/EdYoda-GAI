/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize TypeScript type-only imports or runtime globals. */
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
