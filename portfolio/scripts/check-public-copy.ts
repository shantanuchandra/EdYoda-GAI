/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript scope analysis. */
import { readFile, readdir } from "node:fs/promises";
import { extname, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

import { extractText } from "unpdf";

const scanRoots = ["app", "components", "content", "public"];
const textExtensions = new Set([
  ".css",
  ".csv",
  ".html",
  ".htm",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml",
]);
const unfinished = new RegExp(`\\b(?:TO${"DO"}|T${"BD"})\\b`, "i");
const dummyCopy = new RegExp(`lo${"rem"} ip${"sum"}`, "i");
const sourceCvPath = "/Users/shantanuchandra/Documents/SC_Enterprise_AI_Product_Transformation_Resume_Dubai.pdf";
const forbidden = [
  /edyoda/i,
  /80887\s*52191/,
  /SC_Enterprise_AI_Product_Transformation_Resume_Dubai/i,
  new RegExp(sourceCvPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
  unfinished,
  dummyCopy,
];
const ignoredDirectories = new Set([".next", "node_modules"]);

function shouldIgnore(filePath: string): boolean {
  const segments = filePath.split(sep);
  return (
    segments.some((segment) => ignoredDirectories.has(segment)) ||
    filePath.includes(`${sep}tests${sep}fixtures${sep}`) ||
    filePath.endsWith(`${sep}scripts${sep}check-public-copy.ts`)
  );
}

async function collectFiles(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const entryPath = resolve(directory, entry.name);
        if (shouldIgnore(entryPath)) return [];
        if (entry.isDirectory()) return collectFiles(entryPath);
        return entry.isFile() ? [entryPath] : [];
      }),
    );
    return files.flat();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

function matchingPatterns(text: string): RegExp[] {
  return forbidden.filter((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(text);
  });
}

function labelForPattern(pattern: RegExp): string {
  if (pattern === unfinished) return "unfinished-work marker";
  if (pattern === dummyCopy) return "dummy Latin copy";
  return pattern.toString();
}

export async function checkPublicCopy(root = process.cwd()): Promise<{ scannedFiles: number; scannedPdfs: number }> {
  const files = (await Promise.all(scanRoots.map((scanRoot) => collectFiles(resolve(root, scanRoot))))).flat();
  const failures: string[] = [];
  let scannedFiles = 0;
  let scannedPdfs = 0;

  for (const filePath of files) {
    const extension = extname(filePath).toLowerCase();
    if (textExtensions.has(extension)) {
      scannedFiles += 1;
      const matches = matchingPatterns(await readFile(filePath, "utf8"));
      if (matches.length > 0) {
        failures.push(`${relative(root, filePath)}: ${matches.map(labelForPattern).join(", ")}`);
      }
    }

    if (extension === ".pdf") {
      scannedPdfs += 1;
      let pdfText: string;
      try {
        const result = await extractText(new Uint8Array(await readFile(filePath)), { mergePages: true });
        pdfText = result.text;
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        failures.push(`${relative(root, filePath)}: unable to extract PDF text (${detail})`);
        continue;
      }
      const matches = matchingPatterns(pdfText);
      if (matches.length > 0) {
        failures.push(`${relative(root, filePath)} (extracted PDF text): ${matches.map(labelForPattern).join(", ")}`);
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(`Forbidden public copy found:\n${failures.join("\n")}`);
  }

  return { scannedFiles, scannedPdfs };
}

async function main(): Promise<void> {
  const result = await checkPublicCopy();
  globalThis.console.log(
    `Public-copy scan passed for ${result.scannedFiles} text files and ${result.scannedPdfs} generated PDFs.`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void main().catch((error: unknown) => {
    globalThis.console.error(error);
    process.exitCode = 1;
  });
}
