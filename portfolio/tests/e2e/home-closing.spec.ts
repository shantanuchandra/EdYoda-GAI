/* eslint-disable no-undef -- Playwright page callbacks execute in the browser realm. */
import { expect, test } from "@playwright/test";

test("desktop closing CTA and footer follow the reference conversion hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const closing = page.locator("[data-home-closing]");
  const footer = page.locator(".site-footer");
  await closing.scrollIntoViewIfNeeded();

  const geometry = await page.evaluate(() => {
    const closingElement = document.querySelector<HTMLElement>("[data-home-closing]");
    const footerElement = document.querySelector<HTMLElement>(".site-footer");
    const title = closingElement?.querySelector<HTMLElement>("h2");
    const action = closingElement?.querySelector<HTMLElement>("a");
    if (!closingElement || !footerElement || !title || !action) return null;

    const closingRect = closingElement.getBoundingClientRect();
    const footerRect = footerElement.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const actionRect = action.getBoundingClientRect();
    return {
      closingHeight: closingRect.height,
      footerHeight: footerRect.height,
      titleCenterDelta: Math.abs((titleRect.left + titleRect.width / 2) - innerWidth / 2),
      actionCenterDelta: Math.abs((actionRect.left + actionRect.width / 2) - innerWidth / 2),
      actionHeight: actionRect.height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry?.closingHeight).toBeGreaterThanOrEqual(430);
  expect(geometry?.closingHeight).toBeLessThanOrEqual(490);
  expect(geometry?.footerHeight).toBeGreaterThanOrEqual(315);
  expect(geometry?.footerHeight).toBeLessThanOrEqual(365);
  expect(geometry?.titleCenterDelta).toBeLessThanOrEqual(2);
  expect(geometry?.actionCenterDelta).toBeLessThanOrEqual(2);
  expect(geometry?.actionHeight).toBeGreaterThanOrEqual(44);
  expect(geometry?.overflow).toBe(0);

  await expect(closing.getByRole("heading", { name: "Make the next AI decision count." })).toBeVisible();
  await expect(closing.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  await expect(footer.getByRole("navigation", { name: "Footer" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Learning" })).toHaveAttribute("href", "/learning");
  await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/chandrashantanu/");
  await expect(footer.getByRole("link", { name: "Download resume" })).toHaveAttribute("href", "/shantanu-chandra-resume.pdf");
});

test("mobile closing CTA and footer retain centered hierarchy without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const closing = page.locator("[data-home-closing]");
  await closing.scrollIntoViewIfNeeded();

  const geometry = await page.evaluate(() => {
    const closingElement = document.querySelector<HTMLElement>("[data-home-closing]");
    const footerElement = document.querySelector<HTMLElement>(".site-footer");
    if (!closingElement || !footerElement) return null;
    const closingRect = closingElement.getBoundingClientRect();
    const footerRect = footerElement.getBoundingClientRect();
    return {
      closingHeight: closingRect.height,
      footerHeight: footerRect.height,
      closingWidth: closingRect.width,
      footerWidth: footerRect.width,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry?.closingHeight).toBeGreaterThanOrEqual(430);
  expect(geometry?.footerHeight).toBeGreaterThanOrEqual(520);
  expect(geometry?.closingWidth).toBe(390);
  expect(geometry?.footerWidth).toBe(390);
  expect(geometry?.overflow).toBe(0);
  await expect(closing.getByRole("link", { name: "Contact" })).toHaveCSS("min-height", "48px");
});
