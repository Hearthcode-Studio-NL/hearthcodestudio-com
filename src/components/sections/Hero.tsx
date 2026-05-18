import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      id="top"
      className="hc-grain relative flex flex-col items-center px-6 pt-0 pb-6 text-center md:pb-8"
    >
      <h1 className="m-0 leading-none">
        <Image
          src="/brand/logo-full-default.svg"
          alt="HearthCode Studio"
          width={1097}
          height={1097}
          priority
          unoptimized
          className="h-auto w-[clamp(13rem,44vw,25rem)]"
        />
      </h1>

      <p className="font-ornament -mt-2 text-2xl text-[color:var(--fg-2)] italic md:text-3xl">
        {t('tagline')}
      </p>

      <p className="mt-4 max-w-xl text-base text-[color:var(--fg-2)] md:text-lg">
        {t('description')}
      </p>

      <a
        href="mailto:info@hearthcodestudio.com?subject=Hello%20HearthCode"
        style={{ textDecoration: 'none' }}
        className={[
          'mt-6 inline-flex items-center rounded-lg px-8 py-4',
          'bg-[color:var(--color-bg-primary)] text-[color:var(--color-accent-gold)]',
          'font-semibold tracking-wide [text-decoration:none!important]',
          'border border-[color:var(--color-accent-gold)] transition',
          'hover:shadow-[var(--glow-flame)] hover:[text-decoration:none!important]',
          'focus-visible:shadow-[var(--glow-flame)] focus-visible:outline-none focus-visible:[text-decoration:none!important]',
        ].join(' ')}
      >
        {t('cta')}
      </a>
    </section>
  );
}
