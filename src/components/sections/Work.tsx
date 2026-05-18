'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

// Project metadata that doesn't change between languages
// (images). The translatable text (name, description,
// status, labels) comes from the JSON translation files.
// Cards now link to internal detail pages (/projects/[slug]).
const projectKeys = ['pum', 'dap2d', 'hearthcode'] as const;

type ProjectKey = (typeof projectKeys)[number];

const projectMeta: Record<ProjectKey, { image: string }> = {
  pum: {
    image: '/brand/projects/pum-icon.png',
  },
  dap2d: {
    image: '/brand/projects/dap2d-mark.png',
  },
  hearthcode: {
    image: '/brand/logo-full-default.svg',
  },
};

const cardLinkClass = [
  'group flex h-full flex-col overflow-hidden rounded-lg',
  'border border-[color:var(--color-border)] bg-[color:var(--color-surface-raised)]',
  'no-underline transition',
  'hover:border-[color:var(--color-accent-gold)] hover:no-underline hover:shadow-[var(--glow-flame)]',
  'focus-visible:border-[color:var(--color-accent-gold)] focus-visible:no-underline focus-visible:outline-none focus-visible:shadow-[var(--glow-flame)]',
].join(' ');

export function Work() {
  const t = useTranslations('Work');

  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-4">{t('heading')}</h2>
      <p className="mb-10 max-w-2xl text-lg leading-relaxed">{t('intro')}</p>

      {/* Carousel container — hides scrollbar, enables snap scrolling.
          On mobile: cards are ~80vw wide so you see a peek of the next card,
          hinting that you can swipe. On md+: cards sit in a row. */}
      <ul
        aria-label="Projects"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projectKeys.map((key) => {
          const meta = projectMeta[key];
          const image = meta.image;

          return (
            <li
              key={key}
              className="w-[80vw] flex-shrink-0 snap-start sm:w-[60vw] md:w-[calc((100%-3rem)/3)]"
            >
              <Link
                href={`/projects/${key}`}
                aria-label={t(`projects.${key}.name`) + ' — ' + t(`projects.${key}.hrefLabel`)}
                className={cardLinkClass}
                style={{ textDecoration: 'none' }}
              >
                <div className="flex aspect-[5/4] items-center justify-center bg-[color:var(--color-bg-primary)] p-4">
                  <Image
                    src={image}
                    alt={t(`projects.${key}.imageAlt`)}
                    width={240}
                    height={240}
                    unoptimized={image.endsWith('.svg')}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-ornament text-sm font-medium tracking-wide text-[color:var(--fg-3)] uppercase">
                    {t(`projects.${key}.status`)}
                  </span>
                  <h3 className="mt-2 text-[color:var(--color-accent-gold)]">
                    {t(`projects.${key}.name`)}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[color:var(--fg-2)]">
                    {t(`projects.${key}.description`)}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--color-accent-gold)] transition group-hover:gap-2"
                  >
                    {t(`projects.${key}.hrefLabel`)}
                    <span>{'→'}</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-2 text-sm text-[color:var(--fg-3)] md:hidden">{t('swipeHint')}</p>
    </section>
  );
}
