/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("resume opens with the reference download-to-experience hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/resume", { waitUntil: "domcontentloaded" });

  const actions = page.getByRole("navigation", { name: "Resume actions" });
  const download = actions.getByRole("link", { name: "Download PDF resume" });
  const experience = page.getByRole("heading", { level: 2, name: "Experience" });
  const firstRole = page.getByRole("heading", { level: 3, name: "AI Product Lead" });
  const firstLogo = page.getByRole("img", { name: "Lenskart logo" });

  await expect(actions.getByRole("link")).toHaveCount(1);
  await expect(experience).toBeVisible();
  await expect(firstRole).toBeVisible();
  await expect(firstLogo).toBeVisible();

  const geometry = await page.evaluate(() => {
    const download = document.querySelector<HTMLElement>("[data-resume-download]");
    const experience = document.querySelector<HTMLElement>("[data-resume-experience] h2");
    const canvas = document.querySelector<HTMLElement>("[data-resume-canvas]");
    const firstRole = document.querySelector<HTMLElement>("[data-resume-experience] .resume-role");
    if (!download || !experience || !firstRole || !canvas) throw new Error("Resume opening is incomplete");
    const button = download.getBoundingClientRect();
    const heading = experience.getBoundingClientRect();
    const card = firstRole.getBoundingClientRect();
    return {
      buttonCenter: button.left + button.width / 2,
      buttonTop: button.top,
      canvasLeft: canvas.getBoundingClientRect().left,
      canvasWidth: canvas.getBoundingClientRect().width,
      cardLeft: card.left,
      cardWidth: card.width,
      cardTop: card.top,
      experienceSize: Number.parseFloat(getComputedStyle(experience).fontSize),
      experienceTop: heading.top,
      viewportCenter: innerWidth / 2,
    };
  });

  expect(geometry.buttonCenter).toBeGreaterThanOrEqual(716);
  expect(geometry.buttonCenter).toBeLessThanOrEqual(724);
  expect(geometry.buttonTop).toBeGreaterThanOrEqual(160);
  expect(geometry.buttonTop).toBeLessThanOrEqual(200);
  expect(geometry.canvasLeft).toBe(0);
  expect(geometry.canvasWidth).toBe(1440);
  expect(geometry.experienceTop).toBeGreaterThan(geometry.buttonTop + 80);
  expect(geometry.cardLeft).toBeGreaterThanOrEqual(252);
  expect(geometry.cardLeft).toBeLessThanOrEqual(260);
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(460);
  expect(geometry.cardWidth).toBeLessThanOrEqual(468);
  expect(geometry.experienceSize).toBeGreaterThanOrEqual(29);
  expect(geometry.experienceSize).toBeLessThanOrEqual(31);
  expect(geometry.cardTop).toBeGreaterThan(geometry.experienceTop + 60);
  expect(geometry.cardTop).toBeLessThanOrEqual(440);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1440);
});
