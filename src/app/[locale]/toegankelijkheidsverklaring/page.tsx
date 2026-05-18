import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { AccessibilityEN } from '@/components/legal/AccessibilityEN';
import { AccessibilityNL } from '@/components/legal/AccessibilityNL';

import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'nl' ? 'Toegankelijkheidsverklaring' : 'Accessibility Statement',
    description:
      locale === 'nl'
        ? 'Toegankelijkheidsverklaring voor hearthcodestudio.com volgens WCAG 2.2 AA.'
        : 'Accessibility statement for hearthcodestudio.com per WCAG 2.2 AA.',
  };
}

export default function AccessibilityStatementPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return locale === 'nl' ? <AccessibilityNL /> : <AccessibilityEN />;
}
