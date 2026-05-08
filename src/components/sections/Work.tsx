import Image from 'next/image';

type ProjectStatus = 'Live' | 'In progress' | 'In active development';

type Project = {
  name: string;
  description: string;
  status: ProjectStatus;
  image: string;
  imageAlt: string;
  href: string;
  hrefLabel: string;
};

const projects: Project[] = [
  {
    name: 'property-utility-mapper',
    description:
      'A tool for mapping utilities across property records. Open-source, in active development as a sketchbook for how the studio wants to work.',
    status: 'In active development',
    image: '/brand/projects/pum-icon.png',
    imageAlt: 'property-utility-mapper icon',
    href: 'https://github.com/Hearthcode-Studio-NL/property-utility-mapper',
    hrefLabel: 'View on GitHub',
  },
  {
    name: 'DAP2D — rebuild',
    description:
      'Holistic veterinary practice rebuild. Photo-audit, BRG-2 palette, content rewrite. In progress — more details coming.',
    status: 'In progress',
    image: '/brand/projects/dap2d-mark.png',
    imageAlt: 'DAP2D mark',
    href: 'https://dap2d.nl',
    hrefLabel: 'Visit site',
  },
  {
    name: 'HearthCode Studio',
    description:
      'This site you are reading. Apps, websites, and IT advisory. Source on GitHub — Next.js 16, Tailwind v4, Vercel.',
    status: 'Live',
    image: '/brand/logo-full-default.svg',
    imageAlt: 'HearthCode Studio logo',
    href: 'https://github.com/Hearthcode-Studio-NL/hearthcodestudio-com',
    hrefLabel: 'View on GitHub',
  },
];

const cardLinkStyle = { textDecoration: 'none' };

const cardLinkClass = [
  'group flex h-full flex-col overflow-hidden rounded-lg',
  'border border-[color:var(--color-border)] bg-[color:var(--color-surface-raised)]',
  'no-underline transition',
  'hover:border-[color:var(--color-accent-gold)] hover:no-underline hover:shadow-[var(--glow-flame)]',
  'focus-visible:border-[color:var(--color-accent-gold)] focus-visible:no-underline focus-visible:outline-none focus-visible:shadow-[var(--glow-flame)]',
].join(' ');

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-4">Work</h2>
      <p className="mb-10 max-w-2xl text-lg leading-relaxed">
        A snapshot of what is in flight — current builds, tooling sketches, and the studio site
        itself.
      </p>

      <ul
        aria-label="Projects"
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-6"
      >
        {projects.map((project) => (
          <li key={project.name} className="w-64 flex-shrink-0 snap-start md:w-72">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={project.name + ' — ' + project.hrefLabel}
              className={cardLinkClass}
              style={cardLinkStyle}
            >
              <div className="flex aspect-[5/4] items-center justify-center bg-[color:var(--color-bg-primary)] p-4">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={240}
                  height={240}
                  unoptimized
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-ornament text-sm font-medium tracking-wide text-[color:var(--fg-3)] uppercase">
                  {project.status}
                </span>
                <h3 className="mt-2 text-[color:var(--color-accent-gold)]">{project.name}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[color:var(--fg-2)]">
                  {project.description}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--color-accent-gold)] transition group-hover:gap-2"
                >
                  {project.hrefLabel}
                  <span>→</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-2 text-sm text-[color:var(--fg-3)] md:hidden">
        Swipe to see more projects →
      </p>
    </section>
  );
}
