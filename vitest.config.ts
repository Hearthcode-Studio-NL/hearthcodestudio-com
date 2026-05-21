/**
 * HearthCode baseline Vitest config — web app / website.
 */

import path from 'node:path';

import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, 'e2e/**', 'playwright-report/**', 'test-results/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '.next/',
        'e2e/',
        '**/*.config.*',
        '**/*.d.ts',
        'src/test/',
      ],
      // Ratcheted 2026-05-21 after adding Footer, ProjectContent, Hero,
      // Work, and Contact tests (30 tests total, 8 files).
      // Actuals: stmts 98%, branch 89%, funcs 95%, lines 100%.
      // Thresholds sit a few points below to absorb minor fluctuations.
      thresholds: {
        lines: 95,
        functions: 90,
        branches: 85,
        statements: 95,
      },
    },
    reporters: process.env.CI ? ['default', 'github-actions'] : ['default'],
  },
});
