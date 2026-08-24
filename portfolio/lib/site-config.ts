/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript or runtime-global scope analysis. */
export const siteConfig = {
  name: "Shantanu Chandra",
  descriptor: "AI Transformation Leader",
  email: "shantanu.msp@gmail.com",
  linkedin: "https://www.linkedin.com/in/chandrashantanu/",
  resumePath: "/shantanu-chandra-resume.pdf",
  navigation: [
    ["Home", "/"],
    ["Resume", "/resume"],
    ["Case Studies", "/case-studies"],
    ["AI Courses", "/learning"],
    ["Contact", "/contact"],
  ] as const,
  footerNavigation: [
    ["About", "/about"],
    ["Insights", "/insights"],
  ] as const,
};

export function getSiteUrl(): URL {
  const host = process.env.VERCEL_ENV === "preview"
    ? process.env.VERCEL_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return new URL(host ? `https://${host}` : "http://localhost:3000");
}
