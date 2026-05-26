import Script from 'next/script';

/**
 * Plausible analytics — privacy-friendly, cookie-free page-view tracking.
 *
 * Renders nothing if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is unset, so dev,
 * preview, and Lighthouse runs stay analytics-free. Only production
 * (where the env var is set in Vercel) gets the script tag.
 *
 * Plausible is GDPR-safe by design — no cookies, no personal data, no
 * cross-site identifiers. No consent banner required. The full script
 * is ~1KB and loaded with `defer` so it doesn't block initial render.
 *
 * Documentation: https://plausible.io/docs/script-extensions
 *
 * If you need outbound link tracking, file downloads, or hash-based
 * routing later, swap `script.js` for one of:
 *   script.outbound-links.js
 *   script.file-downloads.js
 *   script.hash.js
 * (combinable as `script.outbound-links.file-downloads.js`, etc.)
 */
export function Plausible() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
