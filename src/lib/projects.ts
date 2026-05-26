/**
 * Project registry — single source of truth.
 *
 * The slug list, image path, and external links for each project used to
 * live in four places (Work.tsx, ProjectContent.tsx, [slug]/page.tsx,
 * sitemap.ts). Three independent constants drifted apart over time, e.g.
 * `getServiceHref` style helpers can return URLs that the actual route
 * tree doesn't serve.
 *
 * One module, one export. Every consumer imports from here.
 *
 * Translatable text (name, description, status, paragraphs) is NOT here
 * — it lives in `messages/{en,nl}.json` under `Work.projects.<slug>.*`
 * and `ProjectDetail.projects.<slug>.*`, keyed off the slug below.
 */

export const projectSlugs = ['erfplan', 'dap2d', 'hearthcode'] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export type Project = {
  /** Stable URL slug. Must match the `<slug>` key in messages/*.json. */
  slug: ProjectSlug;
  /** Path under /public, served as a static asset. */
  image: string;
  /** Optional external GitHub URL — shown on the detail page. */
  github?: string;
  /** Optional external live-site URL — shown on the detail page. */
  site?: string;
};

export const projects: readonly Project[] = [
  {
    slug: 'erfplan',
    image: '/brand/projects/erfplan-logo.png',
    github: 'https://github.com/Hearthcode-Studio-NL/property-utility-mapper',
  },
  {
    slug: 'dap2d',
    image: '/brand/projects/dap2d-mark.png',
    site: 'https://dap2d.nl',
  },
  {
    slug: 'hearthcode',
    image: '/brand/logo-full-default.svg',
    github: 'https://github.com/Hearthcode-Studio-NL/hearthcodestudio-com',
  },
] as const;

/** Map from slug → project. */
const projectBySlug: Readonly<Record<ProjectSlug, Project>> = Object.freeze(
  Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<ProjectSlug, Project>,
);

/** Type guard usable in route handlers. */
export function isValidSlug(slug: string): slug is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(slug);
}

/** Returns the project for a known slug, or `undefined`. */
export function getProject(slug: string): Project | undefined {
  if (!isValidSlug(slug)) return undefined;
  return projectBySlug[slug];
}
