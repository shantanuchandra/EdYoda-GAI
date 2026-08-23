/* eslint-disable no-undef -- page.evaluate executes callbacks in the browser context. */
import { expect, test } from "@playwright/test";

test("reduced motion disables transform-based entrances", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const revealWrappers = [
    page.locator('section[aria-label="Impact highlights"] .container > div').first(),
    page.locator('figure[aria-labelledby="signal-system-scale-caption"]').locator("xpath=..").first(),
  ];

  for (const wrapper of revealWrappers) {
    await expect(wrapper).toBeVisible();
    const styles = await wrapper.evaluate((element) => {
      const computed = getComputedStyle(element);
      return { animationDuration: computed.animationDuration, transform: computed.transform };
    });
    expect(styles.transform).toBe("none");
    expect(styles.animationDuration === "0s" || Number.parseFloat(styles.animationDuration) <= 0.00001).toBe(true);
  }
});
