/* eslint-disable no-undef -- this launch gate runs in Node.js. */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

type LighthouseCategory = {
  score: number | null;
  title?: string;
};

type LighthouseReport = {
  categories?: Record<string, LighthouseCategory>;
};

type LighthouseConfig = {
  ci?: {
    assert?: {
      assertions?: Record<string, [string, { minScore: number }]>
    };
  };
};

function reportPathArgument(): string {
  const argumentsWithoutSeparator = process.argv.slice(2).filter((argument) => argument !== "--");
  if (argumentsWithoutSeparator.length !== 1) {
    throw new Error("Usage: pnpm run audit:check -- .lighthouse/home.json");
  }
  return argumentsWithoutSeparator[0];
}

function loadThresholds(config: LighthouseConfig): Record<string, number> {
  const assertions = config.ci?.assert?.assertions ?? {};
  const thresholds: Record<string, number> = {};

  for (const [assertion, definition] of Object.entries(assertions)) {
    if (!assertion.startsWith("categories:")) continue;
    const category = assertion.slice("categories:".length);
    const threshold = definition?.[1]?.minScore;
    if (typeof threshold !== "number" || threshold < 0 || threshold > 1) {
      throw new Error(`Invalid Lighthouse threshold for ${category}.`);
    }
    thresholds[category] = threshold;
  }

  if (Object.keys(thresholds).length === 0) {
    throw new Error("No Lighthouse category thresholds were configured.");
  }

  return thresholds;
}

async function main(): Promise<void> {
  const [reportSource, configSource] = await Promise.all([
    readFile(resolve(process.cwd(), reportPathArgument()), "utf8"),
    readFile(resolve(process.cwd(), "lighthouserc.json"), "utf8"),
  ]);
  const report = JSON.parse(reportSource) as LighthouseReport;
  const thresholds = loadThresholds(JSON.parse(configSource) as LighthouseConfig);
  const failures: string[] = [];
  const scores: string[] = [];

  for (const [category, threshold] of Object.entries(thresholds)) {
    const score = report.categories?.[category]?.score;
    if (typeof score !== "number") {
      failures.push(`${category}: score is missing`);
      continue;
    }

    scores.push(`${category} ${score.toFixed(2)} (minimum ${threshold.toFixed(2)})`);
    if (score < threshold) {
      failures.push(`${category}: ${score.toFixed(2)} is below ${threshold.toFixed(2)}`);
    }
  }

  globalThis.console.log(`Lighthouse category scores:\n${scores.join("\n")}`);

  if (failures.length > 0) {
    throw new Error(`Lighthouse launch budgets failed:\n${failures.join("\n")}`);
  }

  globalThis.console.log(
    "Lighthouse lab budgets passed. Field targets remain LCP <2.5s, CLS <0.1 and INP <200ms and require field measurement.",
  );
}

void main().catch((error: unknown) => {
  globalThis.console.error(error);
  process.exitCode = 1;
});
