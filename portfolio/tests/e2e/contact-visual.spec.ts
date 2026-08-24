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
    return { canvas: box(canvas), heading: { ...box(heading), fontSize: Number.parseFloat(getComputedStyle(heading).fontSize), textAlign: getComputedStyle(heading).textAlign }, panels: panels.map(box), overflow: document.documentElement.scrollWidth - innerWidth };
  });

  expect(geometry.canvas.left).toBe(0);
  expect(geometry.canvas.width).toBe(1280);
  expect(geometry.heading.fontSize).toBeGreaterThanOrEqual(46);
  expect(geometry.heading.textAlign).toBe("center");
  expect(geometry.panels[0]?.width).toBeGreaterThan(700);
  expect(geometry.panels[1]?.width).toBeGreaterThan(400);
  expect(await page.locator("form").count()).toBe(0);
  expect(geometry.overflow).toBeLessThanOrEqual(0);
});
