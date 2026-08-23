/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript or Node.js global scope analysis. */
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { checkPublicCopy } from "@/scripts/check-public-copy";

function createTextPdf(text: string): Uint8Array {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${text.length + 31} >>\nstream\nBT /F1 12 Tf 72 720 Td (${text}) Tj ET\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const [index, object] of objects.entries()) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf);
}

it("detects forbidden PDF text without relying on the pdftotext executable", async () => {
  const root = await mkdtemp(join(tmpdir(), "public-copy-test-"));
  const originalPath = process.env.PATH;
  try {
    await mkdir(join(root, "public"));
    await writeFile(join(root, "public", "forbidden.pdf"), createTextPdf("EdYoda"));
    process.env.PATH = "/definitely-no-system-tools";

    await expect(checkPublicCopy(root)).rejects.toThrow(/forbidden\.pdf[\s\S]*edyoda/i);
  } finally {
    if (originalPath === undefined) {
      delete process.env.PATH;
    } else {
      process.env.PATH = originalPath;
    }
    await rm(root, { force: true, recursive: true });
  }
});
