/**
 * HearthCode baseline Vitest setup.
 * Testing Library cleanup + jest-dom matchers + console guards + matchMedia polyfill.
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';

// Make `expect(results).toHaveNoViolations()` available globally.
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});

const originalError = console.error;

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    const msg = String(args[0] ?? '');
    if (msg.includes('act(...)') || msg.includes('not wrapped in act')) {
      originalError(...args);
      throw new Error(msg);
    }
  });
  vi.spyOn(console, 'warn').mockImplementation(() => {
    // silence warnings unless tests explicitly assert on them
  });
});

afterAll(() => {
  (console.error as unknown as { mockRestore?(): void }).mockRestore?.();
  (console.warn as unknown as { mockRestore?(): void }).mockRestore?.();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
