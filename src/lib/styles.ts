/**
 * Shared className strings for the gold-glow hover/focus pattern.
 *
 * Five places used the same `hover:[text-shadow:var(--text-glow-gold)]` +
 * `focus-visible:` recipe with subtle variations: socialLinkClass (Footer),
 * footerLinkClass (Footer), navLinkClass + mobileLinkClass (Header),
 * cardLinkClass (Work), externalLinkClass (ProjectContent). Each was a
 * locally-defined `[...].join(' ')` array. Five copies meant any change
 * to the glow recipe had to be applied five times.
 *
 * Now there's one module. Each export is plain string so it stays
 * transparent to prettier-plugin-tailwindcss and the v4 Tailwind purger.
 *
 * Keep the strings on single lines — Tailwind v4 sees them at build time
 * and the prettier plugin sorts them. Multi-line `[...].join(' ')` arrays
 * defeat both.
 */

/**
 * Underlined-text link with a soft gold glow on hover/focus.
 * Used for footer legal links, header nav items, mobile menu items.
 */
export const goldGlowTextLink =
  'no-underline transition hover:no-underline hover:[text-shadow:var(--text-glow-gold)] focus-visible:no-underline focus-visible:[text-shadow:var(--text-glow-gold)] focus-visible:outline-none';

/**
 * Subtler variant — smaller glow, suitable for dense footer rows.
 */
export const goldGlowTextLinkSm =
  'no-underline transition hover:no-underline hover:[text-shadow:var(--text-glow-gold-sm)] focus-visible:no-underline focus-visible:[text-shadow:var(--text-glow-gold-sm)] focus-visible:outline-none';

/**
 * Icon-shaped link (image filter glow). Used for social-icon buttons.
 */
export const goldGlowIconLink =
  'inline-flex items-center justify-center rounded-full p-2 transition hover:[filter:var(--filter-glow-gold)] focus-visible:[filter:var(--filter-glow-gold)] focus-visible:outline-none';

/**
 * Card-shaped link — bordered surface that gold-borders + flame-glows
 * on hover/focus. Used for project tiles on the Work section.
 */
export const goldGlowCard =
  'group flex h-full flex-col overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-raised)] no-underline transition hover:border-[color:var(--color-accent-gold)] hover:no-underline hover:shadow-[var(--glow-flame)] focus-visible:border-[color:var(--color-accent-gold)] focus-visible:no-underline focus-visible:shadow-[var(--glow-flame)] focus-visible:outline-none';

/**
 * Outlined button — gold border, fills slightly on hover.
 * Used for external links (GitHub, live site) on project detail pages.
 */
export const goldOutlineButton =
  'inline-flex items-center gap-2 rounded-lg border border-[color:var(--color-accent-gold)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-accent-gold)] no-underline transition hover:bg-[color:var(--color-accent-gold)]/10 hover:no-underline focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent-gold)] focus-visible:outline-none';
