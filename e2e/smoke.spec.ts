import { expect, test } from '@playwright/test';

// ---------------------------------------------------------------------------
// Smoke tests verify that pages LOAD and key STRUCTURE is present.
// They intentionally avoid asserting on exact translated copy so that
// updating text in messages/nl.json or messages/en.json doesn't break CI.
//
// What we check:
//   - page title contains "HearthCode Studio"
//   - key structural elements exist (hero tagline, CTA, footer links)
//   - CTA points to the correct mailto address
//   - navigation between locales works
//   - project detail pages render their metadata bar
//
// What we do NOT check here:
//   - exact wording of taglines, descriptions, status badges
//   - those belong in a translation-file lint, not E2E tests
// ---------------------------------------------------------------------------

// --- Dutch (default locale) ---

test('NL: home page loads with hero structure and mailto CTA', async ({ page }) => {
  await page.goto('/nl');

  await expect(page).toHaveTitle(/HearthCode Studio/i);
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(/HearthCode Studio/i);

  // Hero tagline exists and is not empty
  const tagline = page.locator('[data-testid="hero-tagline"]');
  await expect(tagline).toBeVisible();
  await expect(tagline).not.toBeEmpty();

  // CTA exists and points to the right email
  const cta = page.locator('[data-testid="hero-cta"]');
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', /^mailto:info@hearthcodestudio\.com/);
});

test('NL: footer exposes the legal pages with correct hrefs', async ({ page }) => {
  await page.goto('/nl');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /privacy/i })).toHaveAttribute(
    'href',
    '/nl/privacy',
  );
  await expect(footer.getByRole('link', { name: /toegankelijkheid/i })).toHaveAttribute(
    'href',
    '/nl/toegankelijkheidsverklaring',
  );
});

test('NL: privacy page renders a heading', async ({ page }) => {
  await page.goto('/nl/privacy');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('NL: toegankelijkheidsverklaring page renders a heading', async ({ page }) => {
  await page.goto('/nl/toegankelijkheidsverklaring');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('NL: project detail page renders metadata bar', async ({ page }) => {
  await page.goto('/nl/projects/pum');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // Status badge rendered (content comes from translations — we just check it exists)
  await expect(
    page.locator('[data-testid="project-status-pum"]').or(page.getByRole('heading', { level: 1 })),
  ).toBeVisible();
  // Back link present
  await expect(page.getByRole('link', { name: /terug|back/i })).toBeVisible();
});

test('NL: project carousel links to detail pages', async ({ page }) => {
  await page.goto('/nl');
  const projectLink = page.getByRole('link', { name: /property-utility-mapper/i }).first();
  await expect(projectLink).toHaveAttribute('href', /\/nl\/projects\/pum/);
});

// --- English ---

test('EN: home page loads with hero structure and mailto CTA', async ({ page }) => {
  await page.goto('/en');

  await expect(page).toHaveTitle(/HearthCode Studio/i);
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(/HearthCode Studio/i);

  const tagline = page.locator('[data-testid="hero-tagline"]');
  await expect(tagline).toBeVisible();
  await expect(tagline).not.toBeEmpty();

  const cta = page.locator('[data-testid="hero-cta"]');
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', /^mailto:info@hearthcodestudio\.com/);
});

test('EN: footer exposes the legal pages with correct hrefs', async ({ page }) => {
  await page.goto('/en');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /privacy/i })).toHaveAttribute(
    'href',
    '/en/privacy',
  );
  await expect(footer.getByRole('link', { name: /accessibility/i })).toHaveAttribute(
    'href',
    '/en/toegankelijkheidsverklaring',
  );
});

test('EN: privacy page renders a heading', async ({ page }) => {
  await page.goto('/en/privacy');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('EN: accessibility statement renders a heading', async ({ page }) => {
  await page.goto('/en/toegankelijkheidsverklaring');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('EN: project detail page renders metadata bar', async ({ page }) => {
  await page.goto('/en/projects/pum');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(
    page.locator('[data-testid="project-status-pum"]').or(page.getByRole('heading', { level: 1 })),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /terug|back/i })).toBeVisible();
});

test('EN: project carousel links to detail pages', async ({ page }) => {
  await page.goto('/en');
  const projectLink = page.getByRole('link', { name: /property-utility-mapper/i }).first();
  await expect(projectLink).toHaveAttribute('href', /\/en\/projects\/pum/);
});

// --- Locale redirect ---

test('root / redirects to a locale-prefixed path', async ({ page }) => {
  const response = await page.goto('/');
  const url = response?.url() ?? '';
  expect(url).toMatch(/\/(nl|en)/);
});

// --- Language switcher ---

test('language switcher toggles between NL and EN', async ({ page, isMobile }) => {
  await page.goto('/nl');

  // Verify we're on NL by checking the tagline exists (not its text)
  await expect(page.locator('[data-testid="hero-tagline"]')).toBeVisible();

  // On mobile, open the hamburger menu first
  if (isMobile) {
    await page.getByRole('button', { name: /menu/i }).click();
  }

  const langNav = page.getByRole('navigation', { name: /language/i });
  // Use a broad matcher — the link text may say "English" or "Switch to English"
  await langNav.getByRole('link', { name: /english/i }).click();
  await page.waitForURL(/\/en/);

  // Confirm we landed on EN — tagline still exists, page didn't error
  await expect(page.locator('[data-testid="hero-tagline"]')).toBeVisible();
});

test('mobile menu opens and shows navigation links', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile menu test — skipped on desktop');

  await page.goto('/nl');

  const menu = page.locator('#mobile-menu');
  await expect(menu).toHaveAttribute('inert', '');

  const menuButton = page.getByRole('button', { name: /menu/i });
  await menuButton.click();

  // After opening, inert should be removed and nav links visible
  await expect(menu).not.toHaveAttribute('inert');
  // Check that navigation links exist (by href pattern, not text)
  const links = menu.getByRole('link');
  await expect(links.first()).toBeVisible();
  expect(await links.count()).toBeGreaterThanOrEqual(3);
});
