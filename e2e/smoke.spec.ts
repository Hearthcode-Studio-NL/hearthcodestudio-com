import { expect, test } from '@playwright/test';

test('home page loads with approved tagline and mailto CTA', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/HearthCode Studio/i);
  // The visible h1 wraps the logo <Image> — check the computed accessible
  // name (from the image's alt) rather than textContent.
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(/HearthCode Studio/i);
  await expect(page.getByText(/Digital craft, deeply rooted\./)).toBeVisible();

  const cta = page.getByRole('link', { name: /start a conversation/i }).first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', /^mailto:info@hearthcodestudio\.com/);
});

test('footer exposes the legal pages with correct hrefs', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /^Privacy$/ })).toHaveAttribute('href', '/privacy');
  await expect(footer.getByRole('link', { name: /Toegankelijkheid/i })).toHaveAttribute(
    'href',
    '/toegankelijkheidsverklaring',
  );
});

test('privacy page renders the Dutch-language stub', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { level: 1, name: /Privacyverklaring/i })).toBeVisible();
});

test('toegankelijkheidsverklaring page renders the Dutch-language stub', async ({ page }) => {
  await page.goto('/toegankelijkheidsverklaring');
  await expect(
    page.getByRole('heading', { level: 1, name: /Toegankelijkheidsverklaring/i }),
  ).toBeVisible();
});
