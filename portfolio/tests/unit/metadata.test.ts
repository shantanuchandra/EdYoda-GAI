import { expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Allura: () => ({ variable: "font-signature" }),
  Inter: () => ({ variable: "font-resume" }),
  Manrope: () => ({ variable: "font-body" }),
  Newsreader: () => ({ variable: "font-display" }),
}));
import { metadata as rootMetadata } from "@/app/layout";
import { metadata as homeMetadata } from "@/app/(site)/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { buildContentMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-config";

it("uses the deployment URL for protected Preview metadata endpoints", () => {
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "shantanu-chandra-portfolio.vercel.app");
  vi.stubEnv("VERCEL_URL", "shantanu-chandra-portfolio-preview.vercel.app");
  expect(getSiteUrl().toString()).toBe("https://shantanu-chandra-portfolio-preview.vercel.app/");
  vi.unstubAllEnvs();
});

it("applies the Shantanu Chandra title template without duplicating the homepage title", () => {
  expect(rootMetadata.title).toEqual({
    default: "Shantanu Chandra | AI Transformation Leader",
    template: "%s | Shantanu Chandra",
  });
  expect(homeMetadata.title).toEqual({ absolute: "Shantanu Chandra | AI Transformation Leader" });
});

it("builds a self-canonical page contract with absolute Open Graph and Twitter images", () => {
  const metadata = buildContentMetadata({
    title: "Selected employer work",
    description: "Evidence-led AI transformation case studies with the operating context and measurable outcomes kept intact.",
    path: "/work",
  });

  expect(metadata).toMatchObject({
    title: "Selected employer work",
    description: "Evidence-led AI transformation case studies with the operating context and measurable outcomes kept intact.",
    alternates: { canonical: "http://localhost:3000/work" },
    openGraph: {
      type: "website",
      title: "Selected employer work",
      description: "Evidence-led AI transformation case studies with the operating context and measurable outcomes kept intact.",
      url: "http://localhost:3000/work",
      siteName: "Shantanu Chandra",
      images: [{
        url: "http://localhost:3000/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shantanu Chandra — AI Transformation Leader",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Selected employer work",
      description: "Evidence-led AI transformation case studies with the operating context and measurable outcomes kept intact.",
      images: ["http://localhost:3000/opengraph-image"],
    },
  });
});

it("gives the homepage its own canonical, description and social contract", () => {
  expect(homeMetadata).toMatchObject({
    description: "Shantanu Chandra leads AI product strategy, operating-model redesign and governed delivery across retail, lending, AdTech, SaaS and enterprise software.",
    alternates: { canonical: "http://localhost:3000/" },
    openGraph: {
      type: "website",
      url: "http://localhost:3000/",
      images: [{ url: "http://localhost:3000/opengraph-image", width: 1200, height: 630 }],
    },
  });
});

it("publishes every static route and exactly the ten allowlisted public content routes", async () => {
  const entries = await sitemap();
  const urls = entries.map((entry) => entry.url);

  expect(urls).toEqual([
    "http://localhost:3000/",
    "http://localhost:3000/resume",
    "http://localhost:3000/case-studies",
    "http://localhost:3000/learning",
    "http://localhost:3000/insights",
    "http://localhost:3000/about",
    "http://localhost:3000/contact",
    "http://localhost:3000/work/lenskart-ai-retail",
    "http://localhost:3000/work/iifl-digital-lending",
    "http://localhost:3000/work/agl-adtech-operations",
    "http://localhost:3000/work/builder-conversational-ai",
    "http://localhost:3000/products/wasabi-travels",
    "http://localhost:3000/products/card-compass",
    "http://localhost:3000/learning/applied-ai-non-technical",
    "http://localhost:3000/learning/ai-product-transformation",
    "http://localhost:3000/learning/practical-agents-founders",
    "http://localhost:3000/insights/signal-system-scale",
  ]);
  expect(urls.some((url) => /not-public|private|unknown/.test(url))).toBe(false);
  expect(new Set(urls).size).toBe(urls.length);
});

it("allows the public site and declares one absolute sitemap", () => {
  expect(robots()).toEqual({
    rules: { userAgent: "*", allow: "/" },
    sitemap: "http://localhost:3000/sitemap.xml",
  });
});
