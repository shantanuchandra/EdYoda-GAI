# Shantanu Chandra Portfolio

This directory is the complete deployment boundary for Shantanu Chandra's public portfolio.

## Vercel project settings

- Project name: `shantanu-chandra-portfolio`
- Root Directory: `portfolio`
- Framework preset: Next.js
- Build command: `pnpm build`
- Node.js version: 24.x
- Compute: Fluid Compute defaults; no function-level runtime overrides

The repository root and its unrelated source material are not part of the public deployment. Public content is explicitly allowlisted through `content/manifest.ts`; files that are not in that manifest are excluded from generated routes, metadata, and the sitemap.

## Local verification

From this directory, install the locked dependencies and run the complete release gate:

```bash
pnpm install --frozen-lockfile
pnpm verify
```

## Release flow

Every release follows this sequence:

```text
pnpm verify → vercel deploy --target=preview → human review → separate production approval
```

Create a review deployment with `vercel deploy --target=preview`; the explicit target avoids environment ambiguity. Do not add `--prod`, promote the preview, assign a domain, or otherwise change production without separate explicit approval after review.
