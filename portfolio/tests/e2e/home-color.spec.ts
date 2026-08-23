/* eslint-disable no-undef -- callbacks execute in the browser context. */
import { expect, test } from "@playwright/test";

type Rgb = [number, number, number];

function parseRgb(value: string): Rgb {
  const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Expected an RGB color, received ${value}`);
  return channels as Rgb;
}

function relativeLuminance([red, green, blue]: Rgb) {
  const [r, g, b] = [red, green, blue].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string) {
  const first = relativeLuminance(parseRgb(foreground));
  const second = relativeLuminance(parseRgb(background));
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function expectJadeBias(value: string) {
  const [red, green, blue] = parseRgb(value);
  expect(green - red, value).toBeGreaterThanOrEqual(30);
  expect(green - blue, value).toBeGreaterThanOrEqual(8);
}

test("Fold 1 uses an accessible Executive Jade hierarchy instead of neutral black controls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const palette = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-motion='shell']");
    const style = (selector: string) => {
      const element = hero?.querySelector<HTMLElement>(selector) ?? document.querySelector<HTMLElement>(selector);
      if (!element) throw new Error(`Missing palette surface: ${selector}`);
      const computed = getComputedStyle(element);
      return {
        background: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        border: computed.borderColor,
        color: computed.color,
      };
    };

    return {
      activeNavigation: style(".desktop-navigation [aria-current='page']"),
      card: style("[data-hero-motion='card']"),
      currentRole: style(".signal-profile-card__current"),
      home: style("main"),
      portrait: style(".signal-profile-card__portrait"),
      primary: style("a[href='/resume']"),
      rule: style("[data-hero-motion='rule']"),
      secondary: style("a[href='/case-studies']"),
      skill: style(".signal-profile-card__skills li"),
    };
  });

  for (const accent of [
    palette.activeNavigation.color,
    palette.primary.background,
    palette.rule.background,
    palette.portrait.border,
    palette.secondary.border,
  ]) {
    expectJadeBias(accent);
  }

  const cardChannels = [...palette.card.backgroundImage.matchAll(/rgb\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/g)]
    .map((match) => match.slice(1, 4).map(Number) as Rgb);
  expect(
    cardChannels.some(([red, green, blue]) => green > red + 8 && green > blue + 2),
    palette.card.backgroundImage,
  ).toBe(true);
  expectJadeBias(palette.skill.background);
  expectJadeBias(palette.currentRole.border);

  expect(contrastRatio(palette.primary.color, palette.primary.background)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(palette.secondary.color, palette.secondary.background)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(palette.skill.color, palette.skill.background)).toBeGreaterThanOrEqual(4.5);
});
