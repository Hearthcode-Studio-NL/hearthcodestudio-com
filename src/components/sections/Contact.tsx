import { useTranslations } from 'next-intl';

import { company } from '@/lib/company';

export function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 pb-32">
      <h2 className="mb-8">{t('heading')}</h2>
      <p className="mb-8 text-lg leading-relaxed">{t('description')}</p>
      <a
        href={`mailto:${company.email}`}
        className="font-heading inline-block text-2xl text-[color:var(--color-accent-gold)] md:text-3xl"
      >
        {company.email}
      </a>
    </section>
  );
}
