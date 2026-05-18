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

test('NL: project detail page renders Dutch content', async ({ page }) => {
  await page.goto('/nl/projects/pum');
  await expect(
    page.getByRole('heading', { level: 1, name: /property-utility-mapper/i }),
  ).toBeVisible();
  // Status badge confirms the metadata bar rendered
  await expect(page.getByText('In actieve ontwikkeling').first()).toBeVisible();
  // Back link navigates to home
  await expect(page.getByRole('link', { name: /Terug naar home/i })).toBeVisible();
});

test('NL: project carousel links to detail pages', async ({ page }) => {
  await page.goto('/nl');
  const projectLink = page.getByRole('link', { name: /property-utility-mapper/i }).first();
  await expect(projectLink).toHaveAttribute('href', /\/nl\/projects\/pum/);
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

test('EN: project detail page renders English content', async ({ page }) => {
  await page.goto('/en/projects/pum');
  await expect(
    page.getByRole('heading', { level: 1, name: /property-utility-mapper/i }),
  ).toBeVisible();
  // Status badge confirms the metadata bar rendered
  await expect(page.getByText('In active development').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to home/i })).toBeVisible();
});

test('EN: project carousel links to detail pages', async ({ page }) => {
  await page.goto('/en');
  const projectLink = page.getByRole('link', { name: /property-utility-mapper/i }).first();
  await expect(projectLink).toHaveAttribute('href', /\/en\/projects\/pum/);
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

// --- Language switcher ---

test('language switcher toggles between NL and EN', async ({ page, isMobile }) => {
  await page.goto('/nl');
  await expect(page.getByText(/Digitaal vakwerk/)).toBeVisible();

  // On mobile, open the hamburger menu first to reveal the language switcher
  if (isMobile) {
    await page.getByRole('button', { name: /menu/i }).click();
  }

  const langNav = page.getByRole('navigation', { name: /language/i });
  await langNav.getByRole('link', { name: /Switch to English/i }).click();
  await page.waitForURL(/\/en/);
  await expect(page.getByText(/Digital craft, deeply rooted\./)).toBeVisible();
});

test('mobile menu opens and shows navigation links', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile menu test — skipped on desktop');

  await page.goto('/nl');

  // Menu should be closed initially (inert attribute present)
  const menu = page.locator('#mobile-menu');
  await expect(menu).toHaveAttribute('inert', '');

  // Open the menu
  const menuButton = page.getByRole('button', { name: /menu/i });
  await menuButton.click();

  // After opening, inert should be removed and links visible
  await expect(menu).not.toHaveAttribute('inert');
  await expect(menu.getByRole('link', { name: /Aanpak/i })).toBeVisible();
  await expect(menu.getByRole('link', { name: /Werk/i })).toBeVisible();
  await expect(menu.getByRole('link', { name: /Contact/i })).toBeVisible();
});
