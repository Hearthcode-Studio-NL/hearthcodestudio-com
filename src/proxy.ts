import { NextResponse, type NextRequest } from 'next/server';

/**
 * Send `X-Robots-Tag: noindex, nofollow` on every host that isn't the
 * canonical production domain. That covers `hearthcodestudio-com.vercel.app`,
 * any `*-git-*.vercel.app` preview alias, raw IPs, and localhost — keeping
 * search engines from indexing staging URLs and creating duplicate-content
 * problems for the real domain.
 *
 * The real domain (`hearthcodestudio.com`, with or without `www.` prefix)
 * serves indexable responses unchanged. When DNS cuts over, this middleware
 * automatically stops tagging — no code change needed.
 *
 * Renamed from middleware.ts to proxy.ts for Next.js 16 convention.
 */
const CANONICAL_HOSTS = new Set(['hearthcodestudio.com', 'www.hearthcodestudio.com']);

export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').toLowerCase();
  const response = NextResponse.next();

  if (!CANONICAL_HOSTS.has(host)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

// Skip Next's static + image-optimisation routes; the header isn't useful
// there and matching them slows down asset delivery.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|fonts/).*)'],
};
