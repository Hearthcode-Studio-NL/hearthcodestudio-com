import { routing } from '@/i18n/routing';

import type { MetadataRoute } from 'next';

// Generate sitemap entries for every locale + page combination.
// Search engines use this to discover all language variants of each page.
// The `alternates.languages` object tells Google/Bing that /nl/privacy
// and /en/privacy are translations of each other (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hearthcodestudio.com';
  const lastModified = new Date();

  const pages = [
    { path: '/', changeFrequency: 'monthly' as const, priority: 1.0 },
    { path: '/projects/pum', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/projects/dap2d', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/projects/hearthcode', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    {
      path: '/toegankelijkheidsverklaring',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // For each page, create one entry per locale with hreflang alternates
  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${page.path === '/' ? '' : page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteUrl}/${l}${page.path === '/' ? '' : page.path}`]),
        ),
      },
    })),
  );
}
