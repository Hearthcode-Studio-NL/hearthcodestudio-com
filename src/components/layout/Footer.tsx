import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { company } from '@/lib/company';
import { goldGlowIconLink, goldGlowTextLinkSm } from '@/lib/styles';

type Social = {
  name: string;
  href: string;
  icon: string;
};

const socials: Social[] = [
  {
    name: 'GitHub',
    href: company.social.github,
    icon: '/brand/icons/social/github-128.png',
  },
  {
    name: 'LinkedIn',
    href: company.social.linkedin,
    icon: '/brand/icons/social/linkedin-128.png',
  },
  {
    name: 'Instagram',
    href: company.social.instagram,
    icon: '/brand/icons/social/instagram-128.png',
  },
];

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 text-sm text-[color:var(--color-accent-gold)] md:grid md:grid-cols-3 md:items-center md:gap-4">
        <div className="text-center md:text-left">
          <div>{t('copyright', { year: new Date().getFullYear() })}</div>
          <div className="mt-1">
            <abbr title="Kamer van Koophandel" className="no-underline">
              KvK
            </abbr>
            : {company.kvk} &middot;{' '}
            <abbr title="Belasting over de Toegevoegde Waarde" className="no-underline">
              BTW
            </abbr>
            : {company.btwId}
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
                className={goldGlowIconLink}
              >
                <Image src={social.icon} alt="" width={48} height={48} className="h-12 w-12" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex justify-center gap-6 md:justify-end">
          <li>
            <Link href="/privacy" className={goldGlowTextLinkSm}>
              {t('privacy')}
            </Link>
          </li>
          <li>
            <Link href="/toegankelijkheidsverklaring" className={goldGlowTextLinkSm}>
              {t('accessibility')}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
