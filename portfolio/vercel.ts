/* eslint-disable no-unused-vars -- the inherited Babel parser does not recognize TypeScript type-only imports. */
import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "pnpm build",
};
