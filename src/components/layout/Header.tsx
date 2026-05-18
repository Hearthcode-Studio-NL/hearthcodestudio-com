'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

const navLinkStyle = { textDecoration: 'none' };

const navLinkClass = [
  'text-[color:var(--color-accent-gold)] no-underline',
  'transition',
  'hover:no-underline hover:[text-shadow:0_0_16px_rgba(212,165,116,1),0_0_32px_rgba(212,165,116,0.6),0_0_48px_rgba(212,165,116,0.3)]',
  'focus-visible:no-underline focus-visible:[text-shadow:0_0_16px_rgba(212,165,116,1),0_0_32px_rgba(212,165,116,0.6),0_0_48px_rgba(212,165,116,0.3)] focus-visible:outline-none',
].join(' ');

// Language switcher — shows both options (NL / EN) with the active
// one visually distinct. The inactive one is a link to the same page
// in the other language. This is the most accessible pattern:
// screen readers announce "NL, current" vs "EN, link".
function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const locales = [
    { code: 'nl' as const, label: 'NL' },
    { code: 'en' as const, label: 'EN' },
  ];

  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-sm">
      {locales.map((l, i) => {
        const isActive = locale === l.code;
        return (
          <span key={l.code} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="text-[color:var(--color-border)]">
                |
              </span>
            )}
            {isActive ? (
              <span
                aria-current="true"
                aria-label={
                  l.code === 'nl' ? 'Nederlands (huidige taal)' : 'English (current language)'
                }
                className="font-semibold text-[color:var(--color-accent-gold)]"
              >
                {l.label}
              </span>
            ) : (
              <Link
                href={pathname}
                locale={l.code}
                className={[
                  'text-[color:var(--fg-3)] no-underline transition',
                  'hover:text-[color:var(--color-accent-gold)] hover:no-underline',
                  'focus-visible:text-[color:var(--color-accent-gold)] focus-visible:outline-none',
                ].join(' ')}
                style={navLinkStyle}
                aria-label={l.code === 'nl' ? 'Schakel naar Nederlands' : 'Switch to English'}
              >
                {l.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function Header() {
  const t = useTranslations('Header');

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg-primary)]/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label={t('homeLabel')}
          className="hc-wordmark transition hover:[filter:drop-shadow(0_0_18px_rgba(212,165,116,0.95))_drop-shadow(0_0_36px_rgba(212,165,116,0.5))] focus-visible:[filter:drop-shadow(0_0_18px_rgba(212,165,116,0.95))_drop-shadow(0_0_36px_rgba(212,165,116,0.5))] focus-visible:outline-none"
          style={{ ['--hc-wordmark-size' as string]: '1.75rem' }}
        >
          <span className="hc-wordmark__primary">HearthCode</span>
          <span className="hc-wordmark__rule">
            <span>Studio</span>
          </span>
        </Link>
        <div className="hidden items-center gap-10 md:flex">
          <nav aria-label="Primary">
            <ul className="flex gap-10 text-base">
              <li>
                <a href="#approach" className={navLinkClass} style={navLinkStyle}>
                  {t('approach')}
                </a>
              </li>
              <li>
                <a href="#work" className={navLinkClass} style={navLinkStyle}>
                  {t('work')}
                </a>
              </li>
              <li>
                <a href="#contact" className={navLinkClass} style={navLinkStyle}>
                  {t('contact')}
                </a>
              </li>
            </ul>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
