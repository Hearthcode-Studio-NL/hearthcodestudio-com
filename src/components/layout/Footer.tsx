import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

type Social = {
  name: string;
  href: string;
  icon: string;
};

const socials: Social[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/Hearthcode-Studio-NL',
    icon: '/brand/icons/social/github-128.png',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hearthcode-studio-807823404',
    icon: '/brand/icons/social/linkedin-128.png',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hearthcodestudio',
    icon: '/brand/icons/social/instagram-128.png',
  },
];

const socialLinkClass = [
  'inline-flex items-center justify-center rounded-full p-2',
  'transition',
  'hover:[filter:drop-shadow(0_0_18px_rgba(212,165,116,0.95))_drop-shadow(0_0_36px_rgba(212,165,116,0.5))]',
  'focus-visible:[filter:drop-shadow(0_0_18px_rgba(212,165,116,0.95))_drop-shadow(0_0_36px_rgba(212,165,116,0.5))]',
  'focus-visible:outline-none',
].join(' ');

const footerLinkStyle = { textDecoration: 'none' };

const footerLinkClass = [
  'no-underline transition',
  'hover:no-underline hover:[text-shadow:0_0_12px_rgba(212,165,116,0.85),0_0_24px_rgba(212,165,116,0.45)]',
  'focus-visible:no-underline focus-visible:[text-shadow:0_0_12px_rgba(212,165,116,0.85),0_0_24px_rgba(212,165,116,0.45)] focus-visible:outline-none',
].join(' ');

const noUnderline = { textDecoration: 'none' };

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 text-sm text-[color:var(--color-accent-gold)] md:grid md:grid-cols-3 md:items-center md:gap-4">
        <div className="text-center md:text-left">
          <div>{t('copyright')}</div>
          <div className="mt-1">
            <abbr title="Kamer van Koophandel" style={noUnderline}>
              KvK
            </abbr>
            : 42047881 &middot;{' '}
            <abbr title="Belasting over de Toegevoegde Waarde" style={noUnderline}>
              BTW
            </abbr>
            : NL005456707B34
          </div>
        </div>
        <ul aria-label={t('socialLinksLabel')} className="flex justify-center gap-4">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={socialLinkClass}
              >
                <Image src={social.icon} alt="" width={48} height={48} className="h-12 w-12" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex justify-center gap-6 md:justify-end">
          <li>
            <Link href="/privacy" className={footerLinkClass} style={footerLinkStyle}>
              {t('privacy')}
            </Link>
          </li>
          <li>
            <Link
              href="/toegankelijkheidsverklaring"
              className={footerLinkClass}
              style={footerLinkStyle}
            >
              {t('accessibility')}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
