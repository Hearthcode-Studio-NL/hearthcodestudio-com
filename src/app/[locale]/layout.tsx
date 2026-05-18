import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { routing } from '@/i18n/routing';

import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Tell Next.js which locale values to pre-render at build time.
// Without this, [locale] would be fully dynamic on every request.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Generate locale-specific metadata (page title, description, OG tags).
// This function runs on the server and has access to the translations.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: [
      'HearthCode Studio',
      'apps',
      'websites',
      'IT advisory',
      'business analyst',
      'Netherlands',
    ],
    openGraph: {
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      url: '/',
      siteName: 'HearthCode Studio',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/brand/logo-leather.png',
          width: 1024,
          height: 576,
          alt: 'HearthCode Studio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/brand/logo-leather.png'],
    },
    alternates: {
      languages: {
        nl: '/nl',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;

  // If someone visits /fr/ or any unsupported locale, show 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering — tells next-intl which locale to use
  // so it doesn't need to read it from headers (which forces dynamic)
  setRequestLocale(locale);

  return (
    <>
      <a
        href="#main"
        className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:font-semibold focus:text-[color:var(--fg-on-gold)]"
      >
        {locale === 'nl' ? 'Ga naar hoofdinhoud' : 'Skip to main content'}
      </a>
      <NextIntlClientProvider>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
