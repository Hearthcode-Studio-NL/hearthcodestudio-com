import { expect, test } from '@playwright/test';

// --- Dutch (default locale) ---

test('NL: home page loads with Dutch tagline and mailto CTA', async ({ page }) => {
  await page.goto('/nl');

  await expect(page).toHaveTitle(/HearthCode Studio/i);
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(/HearthCode Studio/i);
  await expect(page.getByText(/Digitaal vakwerk, diep geworteld\./)).toBeVisible();

  const cta = page.getByRole('link', { name: /Begin een gesprek/i }).first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', /^mailto:info@hearthcodestudio\.com/);
});

test('NL: footer exposes the legal pages with correct hrefs', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /^Privacy$/ })).toHaveAttribute(
    'href',
    '/nl/privacy',
  );
  await expect(footer.getByRole('link', { name: /Toegankelijkheid/i })).toHaveAttribute(
    'href',
    '/nl/toegankelijkheidsverklaring',
  );
});

test('NL: privacy page renders Dutch content', async ({ page }) => {
  await page.goto('/nl/privacy');
  await expect(page.getByRole('heading', { level: 1, name: /Privacyverklaring/i })).toBeVisible();
});

test('NL: toegankelijkheidsverklaring page renders Dutch content', async ({ page }) => {
  await page.goto('/nl/toegankelijkheidsverklaring');
  await expect(
    page.getByRole('heading', { level: 1, name: /Toegankelijkheidsverklaring/i }),
  ).toBeVisible();
});

// --- English ---

test('EN: home page loads with English tagline and mailto CTA', async ({ page }) => {
  await page.goto('/en');

  await expect(page).toHaveTitle(/HearthCode Studio/i);
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(/HearthCode Studio/i);
  await expect(page.getByText(/Digital craft, deeply rooted\./)).toBeVisible();

  const cta = page.getByRole('link', { name: /Start a conversation/i }).first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', /^mailto:info@hearthcodestudio\.com/);
});

test('EN: footer exposes the legal pages with correct hrefs', async ({ page }) => {
  await page.goto('/en');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /^Privacy$/ })).toHaveAttribute(
    'href',
    '/en/privacy',
  );
  await expect(footer.getByRole('link', { name: /Accessibility/i })).toHaveAttribute(
    'href',
    '/en/toegankelijkheidsverklaring',
  );
});

test('EN: privacy page renders English content', async ({ page }) => {
  await page.goto('/en/privacy');
  await expect(page.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeVisible();
});

test('EN: accessibility statement renders English content', async ({ page }) => {
  await page.goto('/en/toegankelijkheidsverklaring');
  await expect(
    page.getByRole('heading', { level: 1, name: /Accessibility Statement/i }),
  ).toBeVisible();
});

// --- Locale redirect ---

test('root / redirects to a locale-prefixed path', async ({ page }) => {
  // next-intl detects Accept-Language and redirects / to /nl or /en.
  // Playwright's Chromium defaults to en-US, so this usually lands on /en.
  // We just verify that the root always redirects to a locale path.
  const response = await page.goto('/');
  const url = response?.url() ?? '';
  expect(url).toMatch(/\/(nl|en)/);
});

// --- Language switcher (desktop only — hidden on mobile) ---

test('language switcher toggles between NL and EN', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'Language switcher is desktop-only (TODO: add mobile switcher)');

  await page.goto('/nl');
  await expect(page.getByText(/Digitaal vakwerk/)).toBeVisible();

  // Click the EN link in the language nav
  const langNav = page.getByRole('navigation', { name: /language/i });
  await langNav.getByRole('link', { name: /Switch to English/i }).click();
  await page.waitForURL(/\/en/);
  await expect(page.getByText(/Digital craft, deeply rooted\./)).toBeVisible();
});
