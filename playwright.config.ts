/**
 * HearthCode baseline Playwright config — Next.js variant (port 3000).
 */

import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 1 } : {}),

  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    // Firefox + WebKit only in CI — they require extra browser binaries
    // that aren't installed on the dev machine by default. Local devs
    // iterate on chromium; CI covers cross-engine via `playwright install --with-deps`.
    ...(process.env.CI ? [{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }] : []),
    ...(process.env.CI ? [{ name: 'webkit', use: { ...devices['Desktop Safari'] } }] : []),
  ],

  // Run tests against the production build (`next start`), not `next dev` —
  // keeps the Next devtools overlay out of the way on small viewports, and
  // matches what Lighthouse and CI also test against. Locally this means
  // you need to `npm run build` once before `npm run test:e2e`; the build
  // is cached so re-runs are fast.
  webServer: {
    command: 'npm run start',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120_000,
  },
});
