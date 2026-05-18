import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { PrivacyEN } from '@/components/legal/PrivacyEN';
import { PrivacyNL } from '@/components/legal/PrivacyNL';

import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'nl' ? 'Privacyverklaring' : 'Privacy Policy',
    description:
      locale === 'nl'
        ? 'Privacyverklaring voor bezoekers van hearthcodestudio.com.'
        : 'Privacy policy for visitors of hearthcodestudio.com.',
  };
}

export default function PrivacyPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return locale === 'nl' ? <PrivacyNL /> : <PrivacyEN />;
}
