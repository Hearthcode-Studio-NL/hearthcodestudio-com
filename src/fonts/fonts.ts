/**
 * Self-hosted brand fonts via `next/font/local`.
 *
 * Files copied from the corresponding `@fontsource/*` packages — keeps the
 * provenance + EAA-compliant local-only delivery, while giving us the things
 * `@fontsource/*` CSS imports could not: automatic `<link rel="preload">`
 * for LCP, content-aware route splitting, and computed `size-adjust` /
 * `ascent-override` / `descent-override` on the fallback face so the
 * pre-load CLS budget stays under 0.1.
 *
 * Each export's `.variable` className puts a CSS custom property on whatever
 * element it's applied to (we apply them at <html>). `layout.tsx` then
 * overrides brand-tokens.css's `--font-display` / `--font-script` /
 * `--font-body` to point at these. Brand tokens stay the canonical names;
 * next/font is the implementation underneath.
 */

import localFont from 'next/font/local';

export const cinzel = localFont({
  src: [
    { path: './cinzel-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './cinzel-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-cinzel',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const cormorantGaramond = localFont({
  src: [
    {
      path: './cormorant-garamond-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './cormorant-garamond-latin-500-italic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  // Italic tagline + wordmark rule are decorative — let body fonts win the
  // preload race; this swaps in a few hundred ms behind the LCP element.
  preload: false,
});

export const inter = localFont({
  src: [
    { path: './inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});
