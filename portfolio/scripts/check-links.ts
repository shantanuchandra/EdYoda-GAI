/* eslint-disable no-undef -- this launch gate runs in Node.js. */
import { siteConfig } from "@/lib/site-config";

const wasabiUrl = "https://wasabitravels.com/";
const cardCompassUrl = "https://www.cardcompass.in/";
const requestTimeoutMs = 15_000;
const pdfSignature = "%PDF";

type LinkInventory = {
  internal: Map<string, Set<string>>;
  linkedInSources: Set<string>;
  mailtoSources: Set<string>;
  wasabiSources: Set<string>;
  cardCompassSources: Set<string>;
};

function decodeHtmlAttribute(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/&#x27;/gi, "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractHrefs(html: string): string[] {
  return Array.from(html.matchAll(/<a\b[^>]*\bhref=(?:"([^"]*)"|'([^']*)')[^>]*>/gi), (match) =>
    decodeHtmlAttribute(match[1] ?? match[2] ?? ""),
  );
}

async function fetchWithinTimeout(url: URL | string, init?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...init,
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
}

function addSource(destinations: Map<string, Set<string>>, destination: string, source: string): void {
  const sources = destinations.get(destination) ?? new Set<string>();
  sources.add(source);
  destinations.set(destination, sources);
}

function parseBaseUrl(): URL {
  const argumentsWithoutSeparator = process.argv.slice(2).filter((argument) => argument !== "--");
  if (argumentsWithoutSeparator.length !== 1) {
    throw new Error("Usage: pnpm run check:links -- http://127.0.0.1:3000");
  }

  const baseUrl = new URL(argumentsWithoutSeparator[0]);
  if (!(["http:", "https:"] as string[]).includes(baseUrl.protocol) || baseUrl.username || baseUrl.password) {
    throw new Error("The link-check base URL must be an HTTP(S) URL without credentials.");
  }

  return new URL("/", baseUrl);
}

async function loadSitemapRoutes(baseUrl: URL): Promise<string[]> {
  const sitemapUrl = new URL("/sitemap.xml", baseUrl);
  const response = await fetchWithinTimeout(sitemapUrl, { redirect: "manual" });
  if (response.status !== 200) {
    throw new Error(`Sitemap request failed with HTTP ${response.status}: ${sitemapUrl}`);
  }

  const xml = await response.text();
  const locations = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => decodeHtmlAttribute(match[1]));
  if (locations.length === 0) {
    throw new Error(`Sitemap exposed no public routes: ${sitemapUrl}`);
  }

  const routes = locations.map((location) => {
    const canonical = new URL(location);
    return `${canonical.pathname}${canonical.search}`;
  });

  if (new Set(routes).size !== routes.length) {
    throw new Error("Sitemap exposed duplicate public routes.");
  }

  return routes;
}

async function inventoryRenderedLinks(baseUrl: URL, routes: string[]): Promise<LinkInventory> {
  const inventory: LinkInventory = {
    internal: new Map<string, Set<string>>(),
    linkedInSources: new Set<string>(),
    mailtoSources: new Set<string>(),
    wasabiSources: new Set<string>(),
    cardCompassSources: new Set<string>(),
  };
  const failures: string[] = [];

  for (const sourceRoute of routes) {
    const sourceUrl = new URL(sourceRoute, baseUrl);
    let response: Response;
    try {
      response = await fetchWithinTimeout(sourceUrl, { redirect: "manual" });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      failures.push(`${sourceRoute} -> ${sourceUrl} failed within ${requestTimeoutMs / 1000}s (${detail})`);
      continue;
    }
    if (response.status !== 200) {
      failures.push(`${sourceRoute} -> ${sourceUrl} returned HTTP ${response.status}`);
      continue;
    }

    const html = await response.text();
    for (const href of extractHrefs(html)) {
      if (href === `mailto:${siteConfig.email}`) {
        inventory.mailtoSources.add(sourceRoute);
        continue;
      }
      if (href.toLowerCase().startsWith("mailto:")) {
        failures.push(`${sourceRoute} -> unexpected mail destination ${href}`);
        continue;
      }
      if (href === siteConfig.linkedin) {
        inventory.linkedInSources.add(sourceRoute);
        continue;
      }
      if (/linkedin\.com/i.test(href)) {
        failures.push(`${sourceRoute} -> unexpected LinkedIn syntax ${href}`);
        continue;
      }
      if (href === wasabiUrl) {
        inventory.wasabiSources.add(sourceRoute);
        continue;
      }
      if (href === cardCompassUrl) {
        inventory.cardCompassSources.add(sourceRoute);
        continue;
      }

      let destination: URL;
      try {
        destination = new URL(href, sourceUrl);
      } catch {
        failures.push(`${sourceRoute} -> invalid link syntax ${href}`);
        continue;
      }

      if (destination.origin !== baseUrl.origin) {
        failures.push(`${sourceRoute} -> unapproved external destination ${destination}`);
        continue;
      }

      destination.hash = "";
      addSource(inventory.internal, destination.toString(), sourceRoute);
    }
  }

  for (const route of routes) {
    if (!inventory.mailtoSources.has(route)) {
      failures.push(`${route} -> missing exact mailto:${siteConfig.email} anchor`);
    }
    if (!inventory.linkedInSources.has(route)) {
      failures.push(`${route} -> missing exact ${siteConfig.linkedin} anchor`);
    }
  }
  if (inventory.wasabiSources.size === 0) {
    failures.push(`No rendered route links to the approved live product URL ${wasabiUrl}`);
  }
  if (inventory.cardCompassSources.size === 0) {
    failures.push(`No rendered route links to the approved live product URL ${cardCompassUrl}`);
  }

  if (failures.length > 0) {
    throw new Error(`Rendered-link inventory failed:\n${failures.join("\n")}`);
  }

  return inventory;
}

async function fetchFollowingRedirects(destination: string): Promise<Response> {
  let current = new URL(destination);
  const visited = new Set<string>();

  for (let hop = 0; hop < 5; hop += 1) {
    if (visited.has(current.toString())) {
      throw new Error(`Redirect loop detected at ${current}`);
    }
    visited.add(current.toString());

    const response = await fetchWithinTimeout(current, { redirect: "manual" });
    if (response.status < 300 || response.status >= 400) return response;

    const location = response.headers.get("location");
    if (!location) throw new Error(`HTTP ${response.status} redirect from ${current} has no Location`);
    const next = new URL(location, current);
    if (next.origin !== current.origin) {
      throw new Error(`Redirect from ${current} leaves the internal origin: ${next}`);
    }
    current = next;
  }

  throw new Error(`Too many redirects while resolving ${destination}`);
}

async function checkInternalDestinations(inventory: LinkInventory): Promise<void> {
  const failures: string[] = [];

  for (const [destination, sourceRoutes] of inventory.internal) {
    let response: Response;
    try {
      response = await fetchFollowingRedirects(destination);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      failures.push(
        `${[...sourceRoutes].join(", ")} -> ${destination} failed within ${requestTimeoutMs / 1000}s (${detail})`,
      );
      continue;
    }
    if (response.status < 200 || response.status >= 400) {
      failures.push(`${[...sourceRoutes].join(", ")} -> ${destination} returned HTTP ${response.status}`);
      continue;
    }

    if (new URL(destination).pathname.endsWith(".pdf")) {
      const contentType = response.headers.get("content-type") ?? "";
      const signature = Buffer.from(await response.arrayBuffer()).subarray(0, 4).toString("ascii");
      if (!contentType.toLowerCase().includes("application/pdf") || signature !== pdfSignature) {
        failures.push(
          `${[...sourceRoutes].join(", ")} -> ${destination} is not a valid PDF (${contentType || "missing content type"}; ${signature || "missing signature"})`,
        );
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(`Internal-link checks failed:\n${failures.join("\n")}`);
  }
}

async function checkLegacyRedirects(baseUrl: URL): Promise<void> {
  const expected = new Map([
    ["/work", "/case-studies#employer-transformations"],
    ["/products", "/case-studies#independent-products"],
  ]);

  for (const [sourcePath, expectedLocation] of expected) {
    const response = await fetchWithinTimeout(new URL(sourcePath, baseUrl), { redirect: "manual" });
    const actualLocation = response.headers.get("location");
    if (response.status !== 308 || actualLocation !== expectedLocation) {
      throw new Error(`${sourcePath} must return HTTP 308 Location ${expectedLocation}; received ${response.status} ${actualLocation ?? "(missing)"}`);
    }
  }
}

async function checkWasabiDestination(sourceRoutes: Set<string>): Promise<void> {
  let response: Response;
  try {
    response = await fetchWithinTimeout(wasabiUrl, { redirect: "follow" });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `${[...sourceRoutes].join(", ")} -> ${wasabiUrl} failed within ${requestTimeoutMs / 1000}s (${detail})`,
      { cause: error },
    );
  }
  if (!response.ok) {
    throw new Error(`${[...sourceRoutes].join(", ")} -> ${wasabiUrl} returned HTTP ${response.status}`);
  }

  const html = await response.text();
  if (!/wasabi/i.test(html) || !/travel|japan|itinerar/i.test(html)) {
    throw new Error(`${[...sourceRoutes].join(", ")} -> ${wasabiUrl} did not return semantically recognizable Wasabi travel content`);
  }
}

async function checkCardCompassDestination(sourceRoutes: Set<string>): Promise<void> {
  let response: Response;
  try {
    response = await fetchWithinTimeout(cardCompassUrl, { redirect: "follow" });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${[...sourceRoutes].join(", ")} -> ${cardCompassUrl} failed within ${requestTimeoutMs / 1000}s (${detail})`, { cause: error });
  }
  if (!response.ok) throw new Error(`${[...sourceRoutes].join(", ")} -> ${cardCompassUrl} returned HTTP ${response.status}`);

  const html = await response.text();
  if (!/card\s*compass/i.test(html)) {
    throw new Error(`${[...sourceRoutes].join(", ")} -> ${cardCompassUrl} did not return semantically recognizable Card Compass content`);
  }
}

async function main(): Promise<void> {
  const baseUrl = parseBaseUrl();
  const routes = await loadSitemapRoutes(baseUrl);
  const inventory = await inventoryRenderedLinks(baseUrl, routes);

  await checkLegacyRedirects(baseUrl);
  await checkInternalDestinations(inventory);
  await checkWasabiDestination(inventory.wasabiSources);
  await checkCardCompassDestination(inventory.cardCompassSources);

  globalThis.console.log(
    [
      `Link check passed for ${routes.length} sitemap routes.`,
      `${inventory.internal.size} unique internal destinations resolved (including a valid PDF).`,
      `${inventory.mailtoSources.size} routes expose the exact mailto syntax.`,
      `${inventory.linkedInSources.size} routes expose the canonical LinkedIn syntax without an HTTP request.`,
      `${inventory.wasabiSources.size} source route links to the semantically verified Wasabi destination (15s timeout).`,
      `${inventory.cardCompassSources.size} source route links to the semantically verified Card Compass destination (15s timeout).`,
    ].join("\n"),
  );
}

void main().catch((error: unknown) => {
  globalThis.console.error(error);
  process.exitCode = 1;
});
