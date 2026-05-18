// Playwright + axe-core accessibility sweep against each locale route.
// Reference: HearthCode-Vault/04-Standards/Testing-Policy.md § Accessibility.
// Complements the manual NVDA walkthrough; does not replace it.

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Test both locales — each page must pass WCAG 2.2 AA in both languages
const ROUTES = [
  '/nl',
  '/nl/privacy',
  '/nl/toegankelijkheidsverklaring',
  '/en',
  '/en/privacy',
  '/en/toegankelijkheidsverklaring',
];

for (const route of ROUTES) {
  test(`a11y: ${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForSelector('main', { state: 'visible' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    if (results.violations.length > 0) {
      // Surface full details so CI logs stay useful.
      // eslint-disable-next-line no-console
      console.log(
        `Found ${String(results.violations.length)} a11y violations on ${route}:\n` +
          results.violations
            .map((v) => `  • [${String(v.impact)}] ${v.id}: ${v.help}\n    ${v.helpUrl}`)
            .join('\n'),
      );
    }

    expect(results.violations).toEqual([]);
  });
}

test('a11y: keyboard tab order reaches interactive elements on /nl', async ({ page }) => {
  await page.goto('/nl');

  const interactiveSelectors =
    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const expected = await page.locator(interactiveSelectors).count();

  const visited = new Set<string>();
  for (let i = 0; i < expected + 5; i++) {
    await page.keyboard.press('Tab');
    const label = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return '(body)';
      return el.getAttribute('aria-label') ?? el.textContent?.trim().slice(0, 40) ?? el.tagName;
    });
    visited.add(label);
    if (label === '(body)' && i > 0) break;
  }

  expect(visited.size).toBeGreaterThan(Math.max(1, Math.floor(expected / 2)));
});

test('a11y: keyboard tab order reaches interactive elements on /en', async ({ page }) => {
  await page.goto('/en');

  const interactiveSelectors =
    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const expected = await page.locator(interactiveSelectors).count();

  const visited = new Set<string>();
  for (let i = 0; i < expected + 5; i++) {
    await page.keyboard.press('Tab');
    const label = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return '(body)';
      return el.getAttribute('aria-label') ?? el.textContent?.trim().slice(0, 40) ?? el.tagName;
    });
    visited.add(label);
    if (label === '(body)' && i > 0) break;
  }

  expect(visited.size).toBeGreaterThan(Math.max(1, Math.floor(expected / 2)));
});
