import { validateAllContent } from "@/lib/content/loader";

async function main(): Promise<void> {
  const result = await validateAllContent();
  globalThis.console.log(`Validated ${result.files} allowlisted content files (${result.publicFiles} public).`);
}

void main();
