import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

import type { NextRequest } from 'next/server';

/**
 * Two responsibilities:
 *
 * 1. **Locale routing** (next-intl) — detects the visitor's preferred
 *    language and redirects bare paths like `/privacy` to `/nl/privacy`
 *    or `/en/privacy`. The `[locale]` segment is required for all pages.
 *
 * 2. **X-Robots-Tag on non-canonical hosts** — preview deploys on
 *    `*.vercel.app`, raw IPs, and localhost get a `noindex` header so
 *    search engines only index the real domain.
 *
 * Renamed from middleware.ts to proxy.ts for the Next.js 16 convention.
 */
const CANONICAL_HOSTS = new Set(['hearthcodestudio.com', 'www.hearthcodestudio.com']);

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Run next-intl's locale detection and redirect logic first
  const response = intlMiddleware(request);

  // Tag non-canonical hosts with noindex (preview deploys, localhost, etc.)
  const host = (request.headers.get('host') ?? '').toLowerCase();
  if (!CANONICAL_HOSTS.has(host)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

// Match all pathnames except static assets and API routes.
// next-intl needs to see every page route to inject the locale prefix.
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
