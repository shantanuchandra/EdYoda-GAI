/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript const assertions. */
import { expect, test } from "@playwright/test";

test("About, Contact and Resume support the direct conversion journey", async ({ page }) => {
  for (const [path, heading] of [
    ["/about", "I build the operating system around useful AI."],
    ["/contact", "Get in touch"],
    ["/resume", "Shantanu Chandra"],
  ] as const) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }

  await page.goto("/contact");
  await expect(page.getByRole("link", { name: "shantanu.msp@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:shantanu.msp@gmail.com",
  );
  await expect(page.getByRole("link", { name: "linkedin.com/in/chandrashantanu" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/chandrashantanu/",
  );
  await expect(page.locator("form")).toHaveCount(0);

  await page.getByRole("link", { name: "View HTML resume" }).click();
  await expect(page).toHaveURL(/\/resume$/);
  await expect(page.getByRole("link", { name: "Download PDF resume" }).first()).toHaveAttribute(
    "href",
    "/shantanu-chandra-resume.pdf",
  );
});

test("Resume print mode removes the site shell and keeps role groups together", async ({ page }) => {
  await page.goto("/resume");
  await page.emulateMedia({ media: "print" });

  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator(".site-footer")).toBeHidden();
  await expect(page.locator(".resume-actions")).toBeHidden();
  await expect(page.locator(".resume-role").first()).toHaveCSS("break-inside", "avoid");
});
