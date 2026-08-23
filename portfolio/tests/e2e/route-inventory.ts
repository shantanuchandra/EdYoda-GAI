/* eslint-disable no-undef -- Playwright evaluates this module in Node.js. */
import sitemap from "@/app/sitemap";

export async function getPublicRoutes(): Promise<string[]> {
  const entries = await sitemap();
  const publicRoutes = entries.map(({ url }) => {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}`;
  });

  if (publicRoutes.length === 0) {
    throw new Error("The public sitemap did not expose any routes to test.");
  }

  if (new Set(publicRoutes).size !== publicRoutes.length) {
    throw new Error("The public sitemap exposed duplicate routes.");
  }

  return publicRoutes;
}
