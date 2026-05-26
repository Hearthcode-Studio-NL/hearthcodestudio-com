import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { getProject } from '@/lib/projects';
import { goldOutlineButton } from '@/lib/styles';

// Server component. `useTranslations` works in server components in
// next-intl v3+, so we no longer need `'use client'` — saves hydration JS.
//
// Non-translatable project metadata (image, GitHub/site URL) comes from
// `@/lib/projects` so this file, Work.tsx, the detail route, and the
// sitemap all read from one source.

type Props = {
  slug: string;
};

export function ProjectContent({ slug }: Props) {
  const t = useTranslations('ProjectDetail');
  const project = getProject(slug);

  if (!project) return null;

  // t.raw() returns the raw JSON value — for arrays it gives us
  // the actual string[] without probing individual indices.
  const paragraphs = t.raw(`projects.${slug}.paragraphs`) as string[];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/#work"
        className="mb-10 inline-flex items-center gap-2 text-sm text-[color:var(--fg-3)] no-underline transition hover:text-[color:var(--color-accent-gold)]"
      >
        <span aria-hidden="true">{'←'}</span>
        {t('backToHome')}
      </Link>

      {/* Hero area: image + title */}
      <div className="mb-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] p-3">
          <Image
            src={project.image}
            alt=""
            width={80}
            height={80}
            unoptimized={project.image.endsWith('.svg')}
            className="h-full w-auto object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl">{t(`projects.${slug}.title`)}</h1>
          <p className="mt-2 text-lg leading-relaxed text-[color:var(--fg-2)]">
            {t(`projects.${slug}.intro`)}
          </p>
        </div>
      </div>

      {/* Metadata bar */}
      <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-[color:var(--color-border)] py-4 text-sm">
        <div>
          <span className="font-semibold text-[color:var(--fg-3)]">{t('status')}</span>{' '}
          <span className="text-[color:var(--color-accent-gold)]">
            {t(`projects.${slug}.statusText`)}
          </span>
        </div>
        <div>
          <span className="font-semibold text-[color:var(--fg-3)]">{t('techStack')}</span>{' '}
          <span>{t(`projects.${slug}.stack`)}</span>
        </div>
        <div>
          <span className="font-semibold text-[color:var(--fg-3)]">{t('scope')}</span>{' '}
          <span>{t(`projects.${slug}.scopeText`)}</span>
        </div>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-6 text-base leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* External links */}
      <div className="mt-10 flex flex-wrap gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={goldOutlineButton}
          >
            {t('viewOnGitHub')}
            <span aria-hidden="true">{'→'}</span>
          </a>
        )}
        {project.site && (
          <a
            href={project.site}
            target="_blank"
            rel="noopener noreferrer"
            className={goldOutlineButton}
          >
            {t('visitSite')}
            <span aria-hidden="true">{'→'}</span>
          </a>
        )}
      </div>
    </article>
  );
}
