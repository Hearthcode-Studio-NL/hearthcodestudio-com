import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { Approach } from '@/components/sections/Approach';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Person } from '@/components/sections/Person';
import { Work } from '@/components/sections/Work';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Approach />
      <Person />
      <Work />
      <Contact />
    </>
  );
}
