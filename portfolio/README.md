# Shantanu Chandra Portfolio

This directory is the complete deployment boundary for Shantanu Chandra's public portfolio.

## Intended Vercel dashboard values

- Project name: `shantanu-chandra-portfolio`
- Root Directory: `portfolio`
- Framework preset: Next.js
- Build command: `pnpm build`
- Node.js version: 24.x
- Compute: Fluid Compute defaults; no function-level runtime overrides

The current CLI-linked preview reports Root Directory `.` and Framework `Other`. Its deployment metadata and versioned `vercel.ts` still apply the `portfolio` application boundary and Next.js build for that preview. Set the remote Root Directory to `portfolio` and Framework preset to Next.js before adding Git integration or requesting production approval.

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
