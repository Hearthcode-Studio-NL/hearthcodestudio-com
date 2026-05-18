import { useTranslations } from 'next-intl';

export function Approach() {
  const t = useTranslations('Approach');

  return (
    <section id="approach" className="mx-auto max-w-3xl px-6 pt-8 pb-16">
      <h2 className="mb-8">{t('heading')}</h2>
      <div className="space-y-6 text-lg leading-relaxed">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
      </div>
    </section>
  );
}
