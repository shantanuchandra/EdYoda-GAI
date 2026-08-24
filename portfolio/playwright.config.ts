import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
const baseURL = `http://127.0.0.1:${port}`;
const webkitLateFiles = [
  "**/responsive.spec.ts",
  "**/resume-opening.spec.ts",
  "**/resume-pdf.spec.ts",
  "**/secondary-templates.spec.ts",
  "**/work-routes.spec.ts",
];

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: {
    baseURL,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", testIgnore: webkitLateFiles, use: { ...devices["Desktop Safari"] } },
    { name: "webkit-late", testMatch: webkitLateFiles, use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: `pnpm build && pnpm start --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
  },
});
