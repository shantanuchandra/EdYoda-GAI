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
  expect(geometry.cardLeft).toBeGreaterThanOrEqual(232);
  expect(geometry.cardLeft).toBeLessThanOrEqual(244);
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(460);
  expect(geometry.cardWidth).toBeLessThanOrEqual(468);
  expect(geometry.experienceSize).toBeGreaterThanOrEqual(29);
  expect(geometry.experienceSize).toBeLessThanOrEqual(31);
  expect(geometry.cardTop).toBeGreaterThan(geometry.experienceTop + 60);
  expect(geometry.cardTop).toBeLessThanOrEqual(440);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1440);
});

test("desktop experience follows the reference alternating timeline rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/resume", { waitUntil: "domcontentloaded" });

  const positions = await page.locator("[data-resume-role]").evaluateAll((cards) =>
    cards.slice(0, 4).map((card) => {
      const { height, left, top, width } = card.getBoundingClientRect();
      return { height, left, top, width };
    }),
  );

  expect(positions).toHaveLength(4);
  expect(positions[0].left).toBeGreaterThanOrEqual(152);
  expect(positions[0].left).toBeLessThanOrEqual(164);
  expect(positions[1].left).toBeGreaterThanOrEqual(636);
  expect(positions[1].left).toBeLessThanOrEqual(648);
  expect(positions[2].left).toBeGreaterThanOrEqual(152);
  expect(positions[2].left).toBeLessThanOrEqual(164);
  expect(positions[3].left).toBeGreaterThanOrEqual(636);
  expect(positions[3].left).toBeLessThanOrEqual(648);
  positions.forEach((position) => expect(position.width).toBeGreaterThanOrEqual(460));
  expect(positions[1].top - (positions[0].top + positions[0].height)).toBeGreaterThanOrEqual(72);
  expect(positions[2].top - (positions[1].top + positions[1].height)).toBeGreaterThanOrEqual(72);
});

test("education starts left and alternates like the reference timeline", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/resume", { waitUntil: "domcontentloaded" });

  const positions = await page.locator("[data-resume-education] .resume-education-card").evaluateAll((cards) =>
    cards.map((card) => {
      const { left, top, width } = card.getBoundingClientRect();
      return { left, top, width };
    }),
  );

  expect(positions).toHaveLength(2);
  expect(positions[0].left).toBeGreaterThanOrEqual(152);
  expect(positions[0].left).toBeLessThanOrEqual(164);
  expect(positions[1].left).toBeGreaterThanOrEqual(636);
  expect(positions[1].left).toBeLessThanOrEqual(648);
  expect(positions[1].top - positions[0].top).toBeGreaterThanOrEqual(196);
  positions.forEach((position) => expect(position.width).toBeGreaterThanOrEqual(460));
});
