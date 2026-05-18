import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { ProjectContent } from '@/components/projects/ProjectContent';
import { routing } from '@/i18n/routing';

import type { Metadata } from 'next';

// The same project keys used in Work.tsx — keeps everything in sync.
export const projectSlugs = ['pum', 'dap2d', 'hearthcode'] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

function isValidSlug(slug: string): slug is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(slug);
}

// Pre-render every locale x slug combination at build time.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: 'ProjectDetail' });
  return {
    title: t(`projects.${slug}.metaTitle`),
    description: t(`projects.${slug}.metaDescription`),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/projects/${slug}`])),
    },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  if (!isValidSlug(slug)) {
    notFound();
  }

  return <ProjectContent slug={slug} />;
}
