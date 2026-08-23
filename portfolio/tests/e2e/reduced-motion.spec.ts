/* eslint-disable no-undef -- page.evaluate executes callbacks in the browser context. */
import { expect, test, type Page } from "@playwright/test";

const revealSelectors = [
  'section[aria-label="Impact highlights"] .container > div',
] as const;

async function enterViewportAndSample(page: Page, selector: string, waitForAnimation: boolean) {
  const wrapper = page.locator(selector).first();

  const before = await wrapper.boundingBox();
  if (!before || (before.y + before.height > 0 && before.y < (page.viewportSize()?.height ?? 0))) {
    throw new Error(`Reveal must start outside the viewport; box=${JSON.stringify(before)}`);
  }

  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toBeInViewport();

  return wrapper.evaluate(async (element, shouldWaitForAnimation) => {
    const relevantAnimations = () => element.getAnimations()
      .map((animation) => {
        const effect = animation.effect as KeyframeEffect | null;
        const keyframes = effect?.getKeyframes() ?? [];
        return {
          duration: Number(effect?.getTiming().duration ?? 0),
          easing: String(effect?.getTiming().easing ?? ""),
          keyframes: keyframes.map(({ easing, opacity, transform }) => ({ easing, opacity, transform })),
          playState: animation.playState,
        };
      })
      .filter(({ keyframes }) => keyframes.some(({ opacity, transform }) => opacity !== undefined || transform !== undefined));

    const capture = (at: number) => {
      const computed = getComputedStyle(element);
      return {
        at,
        opacity: computed.opacity,
        relevantAnimations: relevantAnimations(),
        transform: computed.transform,
        translateY: computed.transform === "none" ? 0 : new DOMMatrixReadOnly(computed.transform).m42,
      };
    };

    if (shouldWaitForAnimation) {
      await new Promise<void>((resolve, reject) => {
        let frames = 0;
        const detectAnimation = () => {
          if (relevantAnimations().length > 0) {
            resolve();
          } else if (frames >= 8) {
            reject(new Error("Reveal entered the viewport without creating an opacity/transform animation"));
          } else {
            frames += 1;
            requestAnimationFrame(detectAnimation);
          }
        };
        detectAnimation();
      });
    }

    const samples = [capture(0)];
    await new Promise((resolve) => setTimeout(resolve, 20));
    samples.push(capture(20));
    await new Promise((resolve) => setTimeout(resolve, 100));
    samples.push(capture(120));
    await new Promise((resolve) => setTimeout(resolve, 100));
    samples.push(capture(220));
    return samples;
  }, waitForAnimation);
}

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
  await expect(page.locator("[data-reveal]")).toHaveAttribute("style", /opacity: 1; transform: none/);

  for (const selector of revealSelectors) {
    const snapshots = await enterViewportAndSample(page, selector, false);

    for (const snapshot of snapshots) {
      expect(snapshot.opacity, `${selector} opacity at ${snapshot.at}ms`).toBe("1");
      expect(snapshot.transform, `${selector} transform at ${snapshot.at}ms`).toBe("none");
      expect(snapshot.relevantAnimations, `${selector} animations at ${snapshot.at}ms`).toEqual([]);
    }
  }
});

test("normal motion creates the approved progressive entrance after viewport entry", async ({ page }) => {
  await page.addInitScript(() => {
    const nativeObserve = IntersectionObserver.prototype.observe;
    IntersectionObserver.prototype.observe = function observe(target: Element) {
      if (target instanceof HTMLElement && target.hasAttribute("data-reveal")) {
        target.setAttribute("data-reveal-motion-observed", "true");
      }
      return nativeObserve.call(this, target);
    };
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-reveal-motion-observed='true']")).toHaveCount(1);

  for (const selector of revealSelectors) {
    const snapshots = await enterViewportAndSample(page, selector, true);
    const animated = snapshots.find(({ relevantAnimations }) => relevantAnimations.length > 0);
    expect(animated, `${selector} must expose its in-flight animation`).toBeDefined();

    const animations = animated?.relevantAnimations ?? [];
    expect(animations.some(({ duration }) => duration === 200), `${selector} duration`).toBe(true);

    const opacityKeyframes = animations.flatMap(({ keyframes }) => keyframes)
      .map(({ opacity }) => Number.parseFloat(String(opacity)))
      .filter(Number.isFinite);
    expect(opacityKeyframes, `${selector} opacity keyframes`).toContain(0.98);
    expect(opacityKeyframes, `${selector} opacity keyframes`).toContain(1);

    const translations = snapshots.map(({ translateY }) => Math.abs(translateY));
    expect(translations.some((translation) => translation > 0), `${selector} sampled translation`).toBe(true);
    expect(Math.max(...translations), `${selector} maximum translation`).toBeLessThanOrEqual(12);

    const easing = animations
      .flatMap((animation) => [animation.easing, ...animation.keyframes.map((keyframe) => keyframe.easing)])
      .join(",")
      .replaceAll(" ", "");
    expect(easing, `${selector} easing`).toContain("cubic-bezier(0.16,1,0.3,1)");

    const final = snapshots.at(-1);
    expect(final?.opacity, `${selector} final opacity`).toBe("1");
    expect(final?.transform, `${selector} final transform`).toBe("none");
  }
});
