/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript scope analysis. */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { JsonLd } from "@/components/seo/json-ld";
import { getContentBySlug } from "@/lib/content/loader";
import {
  buildArticleJsonLd,
  buildCreativeWorkJsonLd,
  buildLearningJsonLd,
  buildPersonJsonLd,
} from "@/lib/structured-data";

afterEach(() => cleanup());

it("serializes JSON-LD into initial HTML while escaping less-than characters", () => {
  const { container } = render(createElement(JsonLd, { data: { "@context": "https://schema.org", name: "Safe </script><script>alert(1)</script>" } }));
  const script = container.querySelector('script[type="application/ld+json"]');

  expect(script).not.toBeNull();
  expect(script?.innerHTML).toContain("Safe \\u003c/script>\\u003cscript>alert(1)\\u003c/script>");
  expect(script?.innerHTML).not.toContain("</script>");
});

it("describes the homepage and About page as a Person-backed ProfilePage using visible facts only", () => {
  const homepage = buildPersonJsonLd({
    path: "/",
    pageName: "Shantanu Chandra — AI Transformation Leader",
    description: "Shantanu Chandra turns complex AI opportunities into adopted, measurable and responsibly governed products across five industries.",
  });
  const about = buildPersonJsonLd({
    path: "/about",
    pageName: "About Shantanu Chandra",
    description: "A first-person career story spanning product, software, operations and five years building and launching AI products.",
  });

  for (const [data, url] of [[homepage, "http://localhost:3000/"], [about, "http://localhost:3000/about"]] as const) {
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "http://localhost:3000/#person",
          name: "Shantanu Chandra",
          jobTitle: "AI Transformation Leader",
          url: "http://localhost:3000/",
          sameAs: ["https://www.linkedin.com/in/chandrashantanu/"],
        },
        {
          "@type": "ProfilePage",
          url,
          mainEntity: { "@id": "http://localhost:3000/#person" },
        },
      ],
    });
    expect(JSON.stringify(data)).not.toMatch(/worksFor|affiliation|award|credential|telephone|address/);
  }
});

it("describes employer and independent-product stories as CreativeWork without employer ownership", async () => {
  const work = await getContentBySlug("work", "lenskart-ai-retail");
  const product = await getContentBySlug("products", "wasabi-travels");
  if (!work || !product) throw new Error("Expected allowlisted content fixtures");

  const workData = buildCreativeWorkJsonLd(work, "work");
  const productData = buildCreativeWorkJsonLd(product, "products");

  expect(workData).toMatchObject({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "AI-assisted retail journeys at Lenskart",
    description: work.metadata.description,
    url: "http://localhost:3000/work/lenskart-ai-retail",
    author: { "@id": "http://localhost:3000/#person", "@type": "Person", name: "Shantanu Chandra" },
  });
  expect(productData).toMatchObject({
    "@type": "CreativeWork",
    name: "Wasabi Travels",
    url: "http://localhost:3000/products/wasabi-travels",
  });
  expect(JSON.stringify([workData, productData])).not.toMatch(/worksFor|copyrightHolder|publisher|owns|Organization/);
});

it("describes the insight as an Article with its exact ISO date, author and absolute image", async () => {
  const insight = await getContentBySlug("insights", "signal-system-scale");
  if (!insight) throw new Error("Expected allowlisted insight");

  expect(buildArticleJsonLd(insight)).toEqual({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "From AI demo to adopted system: Signal → System → Scale",
    description: insight.metadata.description,
    datePublished: "2026-08-23",
    author: { "@id": "http://localhost:3000/#person", "@type": "Person", name: "Shantanu Chandra" },
    image: "http://localhost:3000/opengraph-image",
    mainEntityOfPage: "http://localhost:3000/insights/signal-system-scale",
  });
});

it("describes all three complete Learning Lab paths as non-commercial Courses", async () => {
  const expectations = [
    ["applied-ai-non-technical", "Operators and non-technical professionals", "Identify a valuable workflow, prototype safely, and evaluate output quality", ["Opportunity framing", "Prompt-to-workflow design", "Grounding and verification", "Human-review checkpoints"]],
    ["ai-product-transformation", "Product leaders and transformation teams", "Turn an AI opportunity into an adopted, measurable operating change", ["Portfolio prioritization", "System and data design", "Evals and governance", "Adoption and measurement"]],
    ["practical-agents-founders", "Founders and operators", "Decide when an agent is justified and design one with explicit tools, controls, and fallbacks", ["Agent-vs-prompt test", "Tools and state", "Approval boundaries", "Production readiness"]],
  ] as const;

  for (const [slug, audience, outcome, modules] of expectations) {
    const item = await getContentBySlug("learning", slug);
    if (!item) throw new Error(`Expected allowlisted learning path: ${slug}`);
    const data = buildLearningJsonLd(item);

    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Course",
      name: item.metadata.title,
      description: item.metadata.description,
      url: `http://localhost:3000/learning/${slug}`,
      provider: { "@id": "http://localhost:3000/#person", "@type": "Person", name: "Shantanu Chandra" },
      audience: { "@type": "Audience", audienceType: audience },
      teaches: outcome,
      hasPart: modules.map((name) => ({ "@type": "CreativeWork", name })),
    });
    expect(JSON.stringify(data)).not.toMatch(/"(?:offers|hasCourseInstance|aggregateRating|review|credential|certification|price)"\s*:/);
  }
});

it("falls back to CreativeWork when the visible learning audience is absent", async () => {
  const complete = await getContentBySlug("learning", "applied-ai-non-technical");
  if (!complete) throw new Error("Expected allowlisted learning path");

  const incomplete = {
    ...complete,
    metadata: { ...complete.metadata, audience: undefined },
  };
  expect(buildLearningJsonLd(incomplete)).toMatchObject({
    "@type": "CreativeWork",
    name: complete.metadata.title,
    url: "http://localhost:3000/learning/applied-ai-non-technical",
  });
});

it("falls back to CreativeWork when the visible learning outcome is absent", async () => {
  const complete = await getContentBySlug("learning", "applied-ai-non-technical");
  if (!complete) throw new Error("Expected allowlisted learning path");

  const incomplete = {
    ...complete,
    metadata: { ...complete.metadata, outcomes: [] },
  };
  expect(buildLearningJsonLd(incomplete)).toMatchObject({ "@type": "CreativeWork" });
});

it("falls back to CreativeWork when the visible Launch modules list does not contain exactly four items", async () => {
  const complete = await getContentBySlug("learning", "applied-ai-non-technical");
  if (!complete) throw new Error("Expected allowlisted learning path");

  const missingVisibleModule = {
    ...complete,
    body: complete.body.replace("- Human-review checkpoints\n", ""),
  };
  expect(missingVisibleModule.metadata.methods).toHaveLength(4);
  expect(buildLearningJsonLd(missingVisibleModule)).toMatchObject({ "@type": "CreativeWork" });
});

it("falls back to CreativeWork when the visible Launch modules heading is missing", async () => {
  const complete = await getContentBySlug("learning", "applied-ai-non-technical");
  if (!complete) throw new Error("Expected allowlisted learning path");

  const renamedVisibleSection = {
    ...complete,
    body: complete.body.replace("## Launch modules", "## Topics"),
  };
  expect(renamedVisibleSection.metadata.methods).toHaveLength(4);
  expect(buildLearningJsonLd(renamedVisibleSection)).toMatchObject({ "@type": "CreativeWork" });
});

it("server-renders a CreativeWork fallback when a visible module no longer matches the four metadata methods", async () => {
  const complete = await getContentBySlug("learning", "applied-ai-non-technical");
  if (!complete) throw new Error("Expected allowlisted learning path");

  const changedVisibleModule = {
    ...complete,
    body: complete.body.replace("- Opportunity framing", "- Opportunity selection"),
  };
  expect(changedVisibleModule.metadata.methods).toEqual([
    "Opportunity framing",
    "Prompt-to-workflow design",
    "Grounding and verification",
    "Human-review checkpoints",
  ]);

  const html = renderToStaticMarkup(createElement(JsonLd, { data: buildLearningJsonLd(changedVisibleModule) }));
  expect(html).toContain('"@type":"CreativeWork"');
  expect(html).not.toContain('"@type":"Course"');
});
