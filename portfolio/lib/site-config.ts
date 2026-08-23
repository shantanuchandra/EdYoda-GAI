/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript or runtime-global scope analysis. */
export const siteConfig = {
  name: "Shantanu Chandra",
  descriptor: "AI Transformation Leader",
  email: "shantanu.msp@gmail.com",
  linkedin: "https://www.linkedin.com/in/chandrashantanu",
  resumePath: "/shantanu-chandra-resume.pdf",
  navigation: [
    ["Work", "/work"],
    ["Products", "/products"],
    ["Learning", "/learning"],
    ["Insights", "/insights"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ] as const,
};

export function getSiteUrl(): URL {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return new URL(host ? `https://${host}` : "http://localhost:3000");
}
