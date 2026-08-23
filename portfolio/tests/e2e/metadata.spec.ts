/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript syntax in E2E tests. */
import { expect, test } from "@playwright/test";

const routes = [
  ["/", "Shantanu Chandra | AI Transformation Leader"],
  ["/case-studies", "Case Studies | Shantanu Chandra"],
  ["/learning", "Shantanu Chandra Learning Lab | Shantanu Chandra"],
  ["/insights", "Insights | Shantanu Chandra"],
  ["/about", "About | Shantanu Chandra"],
  ["/contact", "Contact | Shantanu Chandra"],
  ["/resume", "Resume | Shantanu Chandra"],
  ["/work/lenskart-ai-retail", "AI-assisted retail transformation at Lenskart | Shantanu Chandra"],
  ["/work/iifl-digital-lending", "Responsible AI operations for digital lending | Shantanu Chandra"],
  ["/work/agl-adtech-operations", "Scaling ad-tech operations with automation | Shantanu Chandra"],
  ["/work/builder-conversational-ai", "Conversational AI for customer-success scale | Shantanu Chandra"],
  ["/products/wasabi-travels", "Wasabi Travels: practical Japan itineraries | Shantanu Chandra"],
  ["/products/card-compass", "Card Compass: clearer card recommendations | Shantanu Chandra"],
  ["/learning/applied-ai-non-technical", "Applied AI for non-technical professionals | Shantanu Chandra"],
  ["/learning/ai-product-transformation", "AI product transformation for product leaders | Shantanu Chandra"],
  ["/learning/practical-agents-founders", "Practical AI agents for founders and operators | Shantanu Chandra"],
  ["/insights/signal-system-scale", "From AI demo to adopted system at scale | Shantanu Chandra"],
] as const;

test("every representative public route has unique self-canonical search and social metadata", async ({ page }) => {
  const descriptions = new Set<string>();

  for (const [path, title] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    const canonical = path === "/" ? "http://localhost:3000" : `http://localhost:3000${path}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "http://localhost:3000/opengraph-image");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    const socialTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    const socialDescription = await page.locator('meta[property="og:description"]').getAttribute("content");
    expect(description, `description for ${path}`).toBeTruthy();
    expect(socialTitle, `Open Graph title for ${path}`).toBeTruthy();
    expect(socialDescription).toBe(description);
    expect(descriptions.has(description ?? ""), `duplicate description for ${path}`).toBe(false);
    descriptions.add(description ?? "");
  }
});

test("renders truthful JSON-LD in the raw initial HTML", async ({ request }) => {
  const expectations = [
    ["/", ["Person", "ProfilePage"]],
    ["/about", ["Person", "ProfilePage"]],
    ["/work/lenskart-ai-retail", ["CreativeWork"]],
    ["/products/wasabi-travels", ["CreativeWork"]],
    ["/learning/applied-ai-non-technical", ["Course"]],
    ["/learning/ai-product-transformation", ["Course"]],
    ["/learning/practical-agents-founders", ["Course"]],
    ["/insights/signal-system-scale", ["Article"]],
  ] as const;

  for (const [path, types] of expectations) {
    const response = await request.get(path);
    const html = await response.text();
    expect(html).toContain('<script type="application/ld+json">');
    const match = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
    expect(match, `JSON-LD script for ${path}`).not.toBeNull();
    const data = JSON.parse(match?.[1] ?? "{}");
    const actualTypes = data["@graph"]?.map((entry: { "@type": string }) => entry["@type"]) ?? [data["@type"]];
    expect(actualTypes).toEqual(types);
    expect(JSON.stringify(data)).not.toMatch(/"(?:worksFor|aggregateRating|offers|credential|certification|telephone|address)"\s*:/);
  }
});

test("publishes public-only sitemap and permissive robots declarations", async ({ request }) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  const sitemapXml = await sitemapResponse.text();
  expect(sitemapResponse.status()).toBe(200);
  expect(sitemapXml.match(/<loc>/g)).toHaveLength(17);
  expect(sitemapXml).toContain("<loc>http://localhost:3000/work/lenskart-ai-retail</loc>");
  expect(sitemapXml).toContain("<loc>http://localhost:3000/insights/signal-system-scale</loc>");
  expect(sitemapXml).not.toMatch(/not-public|private|unknown/);

  const robotsResponse = await request.get("/robots.txt");
  const robotsText = await robotsResponse.text();
  expect(robotsResponse.status()).toBe(200);
  expect(robotsText).toContain("User-Agent: *");
  expect(robotsText).toContain("Allow: /");
  expect(robotsText).toContain("Sitemap: http://localhost:3000/sitemap.xml");
});

test("serves a 1200 by 630 purposeful social image", async ({ page }) => {
  await page.goto("/");
  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(imageUrl).toBe("http://localhost:3000/opengraph-image");

  const dimensions = await page.evaluate(async () => {
    const image = new Image();
    image.src = new URL("/opengraph-image", window.location.origin).toString();
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  });
  expect(dimensions).toEqual({ width: 1200, height: 630 });
});
