import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { cinzel, cormorantGaramond, inter } from '@/fonts/fonts';

import type { Metadata, Viewport } from 'next';
import type { CSSProperties } from 'react';

import './globals.css';

// Override the brand-token font names to point at next/font/local's
// generated CSS variables. brand-tokens.css stays canonical (declares
// --font-display: 'Cinzel', ... at :root); this html-level inline style
// is the implementation hand-off that supplies the actual hashed family
// next/font produced, plus its size-adjusted fallback face.
//
// `var(--font-cinzel)` works because next/font/local was configured with
// that exact variable name; the .variable className on <html> below is
// what *declares* the variable in the cascade.
const fontVariables = {
  '--font-display': 'var(--font-cinzel)',
  '--font-script': 'var(--font-cormorant)',
  '--font-body': 'var(--font-inter)',
} as CSSProperties;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hearthcodestudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HearthCode Studio — Digital craft, deeply rooted.',
    template: '%s — HearthCode Studio',
  },
  description:
    'A one-person digital studio in Hoenderloo, Netherlands — delivering apps, websites, and IT advisory to clients who want digital work done thoughtfully. Twenty years of business-analyst experience applied at the craft-studio scale.',
  applicationName: 'HearthCode Studio',
  keywords: [
    'HearthCode Studio',
    'apps',
    'websites',
    'IT advisory',
    'business analyst',
    'Netherlands',
  ],
  authors: [{ name: 'Wijnand' }],
  creator: 'Wijnand',
  publisher: 'HearthCode Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'HearthCode Studio',
    title: 'HearthCode Studio — Digital craft, deeply rooted.',
    description: 'Apps, websites, and IT advisory — digital work done thoughtfully.',
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
    title: 'HearthCode Studio — Digital craft, deeply rooted.',
    description: 'Apps, websites, and IT advisory — digital work done thoughtfully.',
    images: ['/brand/logo-leather.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#2D2119',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
      style={fontVariables}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:font-semibold focus:text-[color:var(--fg-on-gold)]"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
