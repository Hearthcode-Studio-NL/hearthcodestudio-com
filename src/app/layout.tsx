import { getLocale } from 'next-intl/server';

import { cinzel, cormorantGaramond, inter } from '@/fonts/fonts';

import type { Metadata, Viewport } from 'next';
import type { CSSProperties } from 'react';

import './globals.css';

// Override the brand-token font names to point at next/font/local's
// generated CSS variables. brand-tokens.css stays canonical (declares
// --font-display: 'Cinzel', ... at :root); this html-level inline style
// is the implementation hand-off that supplies the actual hashed family
// next/font produced, plus its size-adjusted fallback face.
const fontVariables = {
  '--font-display': 'var(--font-cinzel)',
  '--font-script': 'var(--font-cormorant)',
  '--font-body': 'var(--font-inter)',
} as CSSProperties;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hearthcodestudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'HearthCode Studio',
  authors: [{ name: 'Wijnand' }],
  creator: 'Wijnand',
  publisher: 'HearthCode Studio',
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

type Props = {
  children: React.ReactNode;
};

// The root layout sets up fonts, global CSS, and the <html lang>
// attribute. Everything locale-specific (translations, Header,
// Footer) lives in the [locale] layout below it.
export default async function RootLayout({ children }: Readonly<Props>) {
  // getLocale() reads the locale that next-intl resolved for this
  // request — either from the [locale] URL segment or the default.
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${cinzel.variable} ${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
      style={fontVariables}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
