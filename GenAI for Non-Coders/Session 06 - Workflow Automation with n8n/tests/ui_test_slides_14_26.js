/**
 * UI Test — Learner Deck · Session 06
 * Slides under test: 14 (Standard order end-to-end flow) and 26 (Pin Data)
 *
 * Run with Playwright (Node ≥ 18):
 *   npx playwright test ui_test_slides_14_26.js --headed
 *   npx playwright test ui_test_slides_14_26.js            (headless)
 *
 * Or run directly via Node (without Playwright test runner):
 *   node ui_test_slides_14_26.js
 *
 * Assumes a local HTTP server is running on port 8924:
 *   cd "Session 06 - Workflow Automation with n8n"
 *   python3 -m http.server 8924
 *
 * What it checks:
 *   Slide 14 — four wf-node boxes present, correct text, correct arrow count,
 *              "Machine speed. No human touched anything." heading visible
 *   Slide 26 — numbered list (1-2-3 steps) rendered, "Pin data" heading,
 *              sub-text mentions "Pin data" button instruction
 */

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:8924/learner_deck.html';
const PASS = (msg) => console.log(`  ✅  ${msg}`);
const FAIL = (msg) => { console.error(`  ❌  ${msg}`); process.exitCode = 1; };

// ─── helpers ──────────────────────────────────────────────────────────────────

async function goToSlide(page, slideNumber) {
  // page.evaluate() runs the callback inside the browser sandbox (Playwright IPC),
  // not via eval() on untrusted input. The argument `slideNumber` is a numeric
  // literal authored in this file — no arbitrary user input reaches this call.
  await page.evaluate((n) => window.goSlide(n - 1), slideNumber);
  // Wait for the target slide to be .active
  await page.waitForSelector(`#s${slideNumber}.active`, { timeout: 4000 });
}

// ─── main ─────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 180 });
  const context = await browser.newContext();
  const page    = await context.newPage();

  console.log('\n══════════════════════════════════════════');
  console.log('  Session 06 Learner Deck — UI Test Suite  ');
  console.log('══════════════════════════════════════════\n');

  // ── Load the deck ────────────────────────────────────────────────────────────
  console.log('Loading learner deck…');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Verify the deck shell loaded (slide 1 should be active)
  const slide1Active = await page.$('#s1.active');
  if (slide1Active) {
    PASS('Deck loaded — slide 1 is active');
  } else {
    FAIL('Deck load failed — #s1.active not found');
    await browser.close();
    return;
  }

  // ── Verify total slide count ─────────────────────────────────────────────────
  // page.evaluate() — authored selector string, no user input involved.
  const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
  if (totalSlides === 28) {
    PASS(`Slide count correct: ${totalSlides}`);
  } else {
    FAIL(`Slide count wrong: expected 28, got ${totalSlides}`);
  }

  console.log('\n──────────────────────────────────────────');
  console.log('  SLIDE 14 — Standard order flow (end-to-end)');
  console.log('──────────────────────────────────────────\n');

  await goToSlide(page, 14);

  // 1. Slide 14 is active
  const s14Active = await page.$('#s14.active');
  s14Active ? PASS('Slide 14 is active') : FAIL('Slide 14 did not become active');

  // 2. Eyebrow text
  const eyebrow14 = await page.$eval('#s14 .eyebrow', el => el.textContent.trim()).catch(() => null);
  if (eyebrow14 && eyebrow14.toLowerCase().includes('standard order')) {
    PASS(`Eyebrow: "${eyebrow14}"`);
  } else {
    FAIL(`Eyebrow missing or wrong on slide 14: got "${eyebrow14}"`);
  }

  // 3. Heading contains "Machine speed"
  const heading14 = await page.$eval('#s14 h2', el => el.textContent.trim()).catch(() => null);
  if (heading14 && heading14.toLowerCase().includes('machine speed')) {
    PASS(`Heading: "${heading14}"`);
  } else {
    FAIL(`Heading missing or wrong on slide 14: got "${heading14}"`);
  }

  // 4. Four wf-node boxes present
  const wfNodes = await page.$$('#s14 .wf-node');
  if (wfNodes.length === 4) {
    PASS(`Flow diagram: ${wfNodes.length} workflow nodes found`);
  } else {
    FAIL(`Flow diagram: expected 4 .wf-node, found ${wfNodes.length}`);
  }

  // 5. Node labels: Gmail Trigger, HTTP Request, IF node, Gmail Send
  const nodeLabels = await page.$$eval('#s14 .wf-node .wn-box', boxes =>
    boxes.map(b => b.textContent.trim())
  );
  const expectedLabels = ['gmail trigger', 'http request', 'if node', 'gmail send'];
  for (const expected of expectedLabels) {
    const found = nodeLabels.some(l => l.toLowerCase().includes(expected.replace(' ', '')));
    found
      ? PASS(`Node label present: "${expected}"`)
      : FAIL(`Node label missing: "${expected}" — got ${JSON.stringify(nodeLabels)}`);
  }

  // 6. Node sub-labels for the flow
  const subLabels = await page.$$eval('#s14 .wf-node .wn-sub', subs =>
    subs.map(s => s.textContent.trim().toLowerCase())
  );
  const expectedSubs = ['order email arrives', 'agent classifies', 'human_gate: false', 'confirmation fires'];
  for (const sub of expectedSubs) {
    const found = subLabels.some(l => l.includes(sub.replace(/ /g, '')));
    // Loose match (strip spaces for comparison)
    const foundLoose = subLabels.join(' ').toLowerCase().includes(sub.replace('_', '').toLowerCase());
    foundLoose
      ? PASS(`Sub-label present: "${sub}"`)
      : FAIL(`Sub-label missing: "${sub}" — got ${JSON.stringify(subLabels)}`);
  }

  // 7. Arrows between nodes (→)
  const arrows = await page.$$('#s14 .wf-arrow');
  if (arrows.length >= 3) {
    PASS(`Arrows present: ${arrows.length}`);
  } else {
    FAIL(`Arrows: expected ≥3, found ${arrows.length}`);
  }

  // 8. Node colour classes: trigger (calm), http (ink-blue), gate (warn), action (calm)
  const boxClasses = await page.$$eval('#s14 .wf-node .wn-box', boxes =>
    boxes.map(b => b.className)
  );
  const expectedClasses = ['trigger', 'http', 'gate', 'action'];
  for (const cls of expectedClasses) {
    const found = boxClasses.some(c => c.includes(cls));
    found
      ? PASS(`Node class "${cls}" present`)
      : FAIL(`Node class "${cls}" missing — classes: ${JSON.stringify(boxClasses)}`);
  }

  // 9. Folio shows 14/28
  const folio14 = await page.$eval('#s14 .folio', el => el.textContent.trim()).catch(() => null);
  if (folio14 && folio14.includes('14')) {
    PASS(`Folio: "${folio14}"`);
  } else {
    FAIL(`Folio wrong on slide 14: "${folio14}"`);
  }

  // 10. Screenshot slide 14
  await page.screenshot({ path: 'slide_14_screenshot.png', fullPage: false });
  PASS('Screenshot saved: slide_14_screenshot.png');

  console.log('\n──────────────────────────────────────────');
  console.log('  SLIDE 26 — Pin Data technique');
  console.log('──────────────────────────────────────────\n');

  await goToSlide(page, 26);

  // 11. Slide 26 is active
  const s26Active = await page.$('#s26.active');
  s26Active ? PASS('Slide 26 is active') : FAIL('Slide 26 did not become active');

  // 12. Eyebrow
  const eyebrow26 = await page.$eval('#s26 .eyebrow', el => el.textContent.trim()).catch(() => null);
  if (eyebrow26 && eyebrow26.toLowerCase().includes('technique')) {
    PASS(`Eyebrow: "${eyebrow26}"`);
  } else {
    FAIL(`Eyebrow missing or wrong on slide 26: got "${eyebrow26}"`);
  }

  // 13. Heading contains "Test without sending real emails"
  const heading26 = await page.$eval('#s26 h2', el => el.textContent.trim()).catch(() => null);
  if (heading26 && heading26.toLowerCase().includes('test without')) {
    PASS(`Heading: "${heading26}"`);
  } else {
    FAIL(`Heading missing or wrong on slide 26: got "${heading26}"`);
  }

  // 14. Lede mentions "Pin data" and "pinned email"
  const lede26 = await page.$eval('#s26 .lede', el => el.textContent.trim()).catch(() => null);
  if (lede26 && lede26.toLowerCase().includes('pin data')) {
    PASS(`Lede mentions "Pin data": present`);
  } else {
    FAIL(`Lede on slide 26 does not mention "pin data": "${lede26}"`);
  }

  // 15. Three numbered steps (.nt-row) present
  const ntRows26 = await page.$$('#s26 .nt-row');
  if (ntRows26.length === 3) {
    PASS(`Step rows present: ${ntRows26.length} (.nt-row)`);
  } else {
    FAIL(`Step rows: expected 3, found ${ntRows26.length}`);
  }

  // 16. Step 1 mentions "Open Gmail Trigger"
  const stepTexts26 = await page.$$eval('#s26 .nt-row .nt-rule', rows =>
    rows.map(r => r.textContent.trim().toLowerCase())
  );
  const pinChecks = [
    { text: 'gmail trigger', label: 'Step 1 mentions Gmail Trigger' },
    { text: 'pin data',      label: 'Step 2 mentions Pin data' },
    { text: 'pinned email',  label: 'Step 3 mentions pinned email' },
  ];
  for (const check of pinChecks) {
    const found = stepTexts26.some(t => t.includes(check.text));
    found ? PASS(check.label) : FAIL(`${check.label} — steps: ${JSON.stringify(stepTexts26)}`);
  }

  // 17. Footer tip present
  const tip26 = await page.$eval('#s26 p[style*="body-sm"]', el => el.textContent.trim()).catch(() => null);
  if (tip26 && tip26.toLowerCase().includes('faster')) {
    PASS('Footer tip present and mentions faster testing');
  } else {
    // Looser: just confirm some footer paragraph exists
    const anyP = await page.$$eval('#s26 .slide-body p', ps => ps.map(p => p.textContent.trim()));
    const hasTip = anyP.some(t => t.toLowerCase().includes('faster') || t.toLowerCase().includes('cleaner'));
    hasTip ? PASS('Footer tip found') : FAIL(`Footer tip missing or wrong — found: ${JSON.stringify(anyP)}`);
  }

  // 18. Folio shows 26/28
  const folio26 = await page.$eval('#s26 .folio', el => el.textContent.trim()).catch(() => null);
  if (folio26 && folio26.includes('26')) {
    PASS(`Folio: "${folio26}"`);
  } else {
    FAIL(`Folio wrong on slide 26: "${folio26}"`);
  }

  // 19. Screenshot slide 26
  await page.screenshot({ path: 'slide_26_screenshot.png', fullPage: false });
  PASS('Screenshot saved: slide_26_screenshot.png');

  // ── Cross-deck navigation smoke test ────────────────────────────────────────
  console.log('\n──────────────────────────────────────────');
  console.log('  Navigation smoke tests');
  console.log('──────────────────────────────────────────\n');

  // Go back to slide 14 via keyboard (press ArrowLeft 12 times)
  await goToSlide(page, 1);
  let s1Again = await page.$('#s1.active');
  s1Again ? PASS('Navigation: returned to slide 1') : FAIL('Navigation: could not return to slide 1');

  await goToSlide(page, 28);
  let s28Active = await page.$('#s28.active');
  s28Active ? PASS('Navigation: reached last slide (28)') : FAIL('Navigation: failed to reach slide 28');

  // Progress bar should be at or near 100%
  const progressWidth = await page.$eval('#progressThread', el => el.style.width).catch(() => null);
  if (progressWidth && parseFloat(progressWidth) > 95) {
    PASS(`Progress bar at ~100% (${progressWidth}) on last slide`);
  } else {
    FAIL(`Progress bar: expected ~100%, got "${progressWidth}" on last slide`);
  }

  // Break slide auto-clock (slide 17)
  console.log('\n  Checking break slide clock auto-start…');
  await goToSlide(page, 17);
  await page.waitForTimeout(1400); // let the clock tick once
  const clockText = await page.$eval('#breakClock', el => el.textContent.trim()).catch(() => null);
  if (clockText && clockText !== '10:00' && /^\d{2}:\d{2}$/.test(clockText)) {
    PASS(`Break clock ticking: "${clockText}" (started and decremented)`);
  } else if (clockText === '10:00') {
    FAIL('Break clock not ticking — still at 10:00 after 1.4s');
  } else {
    FAIL(`Break clock unexpected state: "${clockText}"`);
  }

  // ── Done ─────────────────────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════');
  if (process.exitCode === 1) {
    console.log('  RESULT: FAIL — see ❌ lines above');
  } else {
    console.log('  RESULT: ALL TESTS PASSED ✅');
  }
  console.log('══════════════════════════════════════════\n');

  await browser.close();
})();
