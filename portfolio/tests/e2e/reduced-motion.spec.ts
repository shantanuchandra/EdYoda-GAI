/* eslint-disable no-undef -- page.evaluate executes callbacks in the browser context. */
import { expect, test } from "@playwright/test";

const revealSelectors = [
  'section[aria-label="Impact highlights"] .container > div',
  'figure[aria-labelledby="signal-system-scale-caption"] >> xpath=..',
] as const;

test("server-rendered Reveal regions stay visible and untransformed without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  for (const selector of revealSelectors) {
    const wrapper = page.locator(selector).first();
    const styles = await wrapper.evaluate((element) => {
      const computed = getComputedStyle(element);
      return { opacity: computed.opacity, transform: computed.transform };
    });

    expect(styles, selector).toEqual({ opacity: "1", transform: "none" });
  }

  await context.close();
});

test("reduced motion is final immediately with no opacity or transform animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  for (const selector of revealSelectors) {
    const snapshots = await page.locator(selector).first().evaluate(async (element) => {
      const capture = (at: number) => {
        const computed = getComputedStyle(element);
        const relevantAnimations = element.getAnimations()
          .map((animation) => {
            const effect = animation.effect as KeyframeEffect | null;
            const keyframes = effect?.getKeyframes() ?? [];
            return {
              duration: Number(effect?.getTiming().duration ?? 0),
              keyframes: keyframes.map(({ opacity, transform }) => ({ opacity, transform })),
              playState: animation.playState,
            };
          })
          .filter(({ keyframes }) => keyframes.some(({ opacity, transform }) => opacity !== undefined || transform !== undefined));

        return {
          at,
          opacity: computed.opacity,
          relevantAnimations,
          transform: computed.transform,
        };
      };

      const samples = [capture(0)];
      await new Promise((resolve) => setTimeout(resolve, 20));
      samples.push(capture(20));
      await new Promise((resolve) => setTimeout(resolve, 100));
      samples.push(capture(120));
      return samples;
    });

    for (const snapshot of snapshots) {
      expect(snapshot.opacity, `${selector} opacity at ${snapshot.at}ms`).toBe("1");
      expect(snapshot.transform, `${selector} transform at ${snapshot.at}ms`).toBe("none");
      expect(snapshot.relevantAnimations, `${selector} animations at ${snapshot.at}ms`).toEqual([]);
    }
  }
});
