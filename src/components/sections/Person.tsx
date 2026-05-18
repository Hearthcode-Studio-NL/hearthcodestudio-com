import { useTranslations } from 'next-intl';

export function Person() {
  const t = useTranslations('Person');

  return (
    <section id="person" className="hc-grain mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-8">{t('heading')}</h2>
      <div className="space-y-6 text-lg leading-relaxed">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
        <p className="text-[color:var(--fg-2)]">
          <em>{t('based')}</em>
        </p>
      </div>
    </section>
  );
}
