/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

test("Contact uses the reference panel composition without introducing a form", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });

  const geometry = await page.evaluate(() => {
    const canvas = document.querySelector<HTMLElement>("[data-contact-canvas]");
    const intro = document.querySelector<HTMLElement>("[data-contact-intro]");
    const panels = [...document.querySelectorAll<HTMLElement>("[data-contact-panel]")];
    const heading = intro?.querySelector<HTMLElement>("h1");
    if (!canvas || !intro || !heading || panels.length !== 2) throw new Error("Contact composition is incomplete");
    const box = (element: HTMLElement) => { const rect = element.getBoundingClientRect(); return { left: rect.left, width: rect.width, height: rect.height }; };
    const description = intro.querySelector<HTMLElement>("p:last-child");
    if (!description) throw new Error("Contact introduction is missing its supporting line");
    const prompts = [...document.querySelectorAll<HTMLElement>("[data-contact-prompt]")];
    const actionRows = [...document.querySelectorAll<HTMLElement>("[data-contact-action]")];
    const primaryAction = document.querySelector<HTMLElement>("[data-contact-primary-action]");
    return {
      canvas: box(canvas),
      heading: { ...box(heading), fontSize: Number.parseFloat(getComputedStyle(heading).fontSize), textAlign: getComputedStyle(heading).textAlign },
      description: box(description),
      panels: panels.map((panel) => ({ ...box(panel), top: panel.getBoundingClientRect().top })),
      promptCount: prompts.length,
      promptHeights: prompts.map((prompt) => box(prompt).height),
      actionCount: actionRows.length,
      actionHeights: actionRows.map((action) => box(action).height),
      primaryAction: primaryAction ? box(primaryAction) : null,
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });

  expect(geometry.canvas.left).toBe(0);
  expect(geometry.canvas.width).toBe(1280);
  expect(geometry.heading.fontSize).toBeGreaterThanOrEqual(46);
  expect(geometry.heading.textAlign).toBe("center");
  expect(geometry.description.height).toBeLessThanOrEqual(60);
  expect(geometry.panels[0]?.top).toBeGreaterThanOrEqual(320);
  expect(geometry.panels[0]?.top).toBeLessThanOrEqual(350);
  expect(geometry.panels[0]?.width).toBeGreaterThan(700);
  expect(geometry.panels[1]?.width).toBeGreaterThan(400);
  expect(geometry.promptCount).toBe(3);
  expect(geometry.promptHeights.every((height) => height >= 64)).toBe(true);
  expect(geometry.actionCount).toBe(3);
  expect(geometry.actionHeights.every((height) => height >= 64)).toBe(true);
  expect(geometry.primaryAction?.height).toBeGreaterThanOrEqual(48);
  expect(await page.locator("form").count()).toBe(0);
  expect(geometry.overflow).toBeLessThanOrEqual(0);
});

test("Contact preserves the reference reading order and touch targets on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });

  const panels = page.locator("[data-contact-panel]");
  await expect(panels).toHaveCount(2);
  await expect(panels.nth(0).getByRole("heading", { name: "Send the useful first note" })).toBeVisible();
  await expect(panels.nth(1).getByRole("heading", { name: "Choose the most useful route" })).toBeVisible();

  const geometry = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - innerWidth,
    panels: [...document.querySelectorAll<HTMLElement>("[data-contact-panel]")].map((panel) => {
      const rect = panel.getBoundingClientRect();
      return { left: rect.left, width: rect.width };
    }),
    targets: [...document.querySelectorAll<HTMLElement>("[data-contact-primary-action], [data-contact-action]")].map((target) => target.getBoundingClientRect().height),
  }));

  expect(geometry.panels.every((panel) => panel.left === 16 && panel.width === 358)).toBe(true);
  expect(geometry.targets.every((height) => height >= 44)).toBe(true);
  expect(geometry.overflow).toBeLessThanOrEqual(0);
  expect(await page.locator("form").count()).toBe(0);
});
