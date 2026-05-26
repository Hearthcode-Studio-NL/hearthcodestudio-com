import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const securityHeaders = [
  // --- Content Security Policy ---
  // Controls which sources the browser is allowed to load resources from.
  // This is the single most important security header — it's the main
  // defence against cross-site scripting (XSS).
  //
  // 'self'           = only from our own domain
  // 'unsafe-inline'  = needed because Next.js injects inline <script> tags
  //                    for hydration and inline <style> for Tailwind/CSS.
  //                    Trade-off: weakens XSS protection for scripts, but
  //                    this site has no user input so the practical risk is
  //                    near zero. Nonce-based CSP would be stronger but
  //                    requires middleware changes — revisit if the site
  //                    grows forms or interactive features.
  // frame-ancestors  = prevents other sites from embedding us in an iframe
  //                    (clickjacking protection, replaces X-Frame-Options)
  // object-src       = blocks Flash/Java/ActiveX plugins (legacy attack vector)
  // base-uri         = prevents <base> tag hijacking
  // form-action      = prevents forms from submitting to external domains
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // In dev mode, React uses eval() for stack trace debugging — it never
      // does this in production. Without 'unsafe-eval' here, the dev overlay
      // shows a CSP error on every page load.
      // Plausible analytics script loads from plausible.io in production
      // when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (otherwise nothing loads).
      `script-src 'self' 'unsafe-inline' https://plausible.io${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      // Plausible posts page-view events back to its API.
      "connect-src 'self' https://plausible.io",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },

  // --- Strict-Transport-Security (HSTS) ---
  // Tells the browser: "For the next 2 years, always use HTTPS for this
  // domain — don't even try HTTP." Vercel already redirects HTTP → HTTPS,
  // but without this header the very first request could still travel over
  // plain HTTP (e.g. on public Wi-Fi) before the redirect kicks in. After
  // one visit with HSTS set, the browser remembers and goes straight to
  // HTTPS — closing that man-in-the-middle window.
  //
  // max-age=63072000 = 2 years (industry standard)
  // includeSubDomains = covers www. and any future subdomains too
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },

  // --- X-Frame-Options ---
  // Older browsers don't support CSP frame-ancestors. This is the legacy
  // equivalent: tells the browser "never render this page inside a frame."
  // Belt-and-suspenders with the CSP rule above.
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },

  // --- X-Content-Type-Options ---
  // Prevents the browser from guessing ("MIME-sniffing") what type a file
  // is. Without this, a browser might treat a text file as JavaScript if
  // the content looks script-like. The "nosniff" value says: trust the
  // Content-Type header, don't guess.
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  // --- Referrer-Policy ---
  // Controls how much URL information is sent to other sites when a visitor
  // clicks an external link. "strict-origin-when-cross-origin" means:
  // - Same-site navigation: send the full URL (fine, it's our own site)
  // - Cross-site navigation: send only the origin (https://hearthcodestudio.com),
  //   not the full path — so external sites don't see which page the visitor
  //   was on.
  // - Downgrade (HTTPS → HTTP): send nothing.
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  // --- Permissions-Policy ---
  // Explicitly disables browser features the site doesn't use. Even though
  // no code on this site requests camera/mic/location access, setting this
  // header means that if malicious code were somehow injected, the browser
  // would block those API calls. Defence in depth.
  {
    key: 'Permissions-Policy',
    value: ['camera=()', 'microphone=()', 'geolocation=()', 'interest-cohort=()'].join(', '),
  },
];

const nextConfig: NextConfig = {
  // Pin Turbopack's root to THIS project directory. Without this, Turbopack
  // walks up the filesystem looking for lockfiles and may pick a parent
  // directory (e.g. C:\Users\Wijna\) as the root — breaking relative imports
  // like ../styles/brand-tokens.css in globals.css.
  turbopack: {
    root: import.meta.dirname,
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

// createNextIntlPlugin() wraps the config so next-intl can:
// 1. Find the i18n/request.ts file that tells it how to load translations
// 2. Optimise translation bundles at build time (tree-shaking unused keys)
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
