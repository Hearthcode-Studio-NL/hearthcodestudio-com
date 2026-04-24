import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hearthcodestudio.com';
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/toegankelijkheidsverklaring`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
