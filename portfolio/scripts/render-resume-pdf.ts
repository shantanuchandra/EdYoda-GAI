/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript scope analysis. */
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrlArgument = process.argv.slice(2).find((argument) => argument !== "--");

if (!baseUrlArgument) {
  throw new Error("Usage: pnpm render:resume -- http://127.0.0.1:3000");
}

const outputPath = path.join(process.cwd(), "public", "shantanu-chandra-resume.pdf");
const baseUrl = new URL(baseUrlArgument);

if (!(["http:", "https:"] as string[]).includes(baseUrl.protocol)) {
  throw new Error("Resume base URL must use http or https");
}

async function renderResume(): Promise<void> {
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    const resumeUrl = new URL("/resume?print=1", baseUrl).toString();
    const response = await page.goto(resumeUrl, { waitUntil: "networkidle" });

    if (!response?.ok()) {
      throw new Error(`Resume page request failed with HTTP ${response?.status() ?? "unknown"}: ${resumeUrl}`);
    }

    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
    });

    globalThis.console.log(`Rendered public resume to ${outputPath}`);
  } finally {
    await browser.close();
  }
}

void renderResume();
