import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { projects } from '@/lib/projects';
import { goldGlowCard } from '@/lib/styles';

// Server component. `useTranslations` works in async/sync server components
// in next-intl v3+, so we no longer need `'use client'` here — saves the
// hydration JS for a static carousel.
//
// Project metadata (slug, image) comes from `@/lib/projects` so this file
// and the detail page + sitemap stay in sync. Translatable text lives in
// `messages/{en,nl}.json` under `Work.projects.<slug>.*`.

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
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => {
          const { slug, image } = project;

          return (
            <li
              key={slug}
              className="w-[80vw] flex-shrink-0 snap-start sm:w-[60vw] md:w-[calc((100%-3rem)/3)]"
            >
              <Link
                href={`/projects/${slug}`}
                aria-label={t(`projects.${slug}.name`) + ' — ' + t(`projects.${slug}.hrefLabel`)}
                className={goldGlowCard}
              >
                <div className="flex aspect-[5/4] items-center justify-center bg-[color:var(--color-bg-primary)] p-4">
                  <Image
                    src={image}
                    alt={t(`projects.${slug}.imageAlt`)}
                    width={240}
                    height={240}
                    unoptimized={image.endsWith('.svg')}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span
                    data-testid={`project-status-${slug}`}
                    className="font-ornament text-sm font-medium tracking-wide text-[color:var(--fg-3)] uppercase"
                  >
                    {t(`projects.${slug}.status`)}
                  </span>
                  <h3 className="mt-2 text-[color:var(--color-accent-gold)]">
                    {t(`projects.${slug}.name`)}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[color:var(--fg-2)]">
                    {t(`projects.${slug}.description`)}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--color-accent-gold)] transition group-hover:gap-2"
                  >
                    {t(`projects.${slug}.hrefLabel`)}
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
