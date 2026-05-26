'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { goldGlowTextLink } from '@/lib/styles';

// Desktop and mobile menu links share the same gold-glow recipe; only
// sizing/layout differs. The recipe lives in `@/lib/styles`.
const navLinkClass = `text-[color:var(--color-accent-gold)] ${goldGlowTextLink}`;
const mobileLinkClass = `block py-3 text-lg text-[color:var(--color-accent-gold)] ${goldGlowTextLink}`;

// Language switcher — shows both options (NL / EN) with the active
// one visually distinct. The inactive one is a link to the same page
// in the other language. Screen readers announce "NL, current" vs "EN, link".
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

// Hamburger icon (three lines) — simple SVG, no external dependency
function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// Close icon (X) — simple SVG
function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Header() {
  const t = useTranslations('Header');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      // Return focus to the hamburger button
      buttonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll while menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, handleKeyDown]);

  // Close menu when clicking an anchor link (scroll-to sections)
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg-primary)]/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label={t('homeLabel')}
          className="hc-wordmark transition hover:[filter:var(--filter-glow-gold)] focus-visible:[filter:var(--filter-glow-gold)] focus-visible:outline-none"
          style={{ ['--hc-wordmark-size' as string]: '1.75rem' }}
        >
          <span className="hc-wordmark__primary">HearthCode</span>
          <span className="hc-wordmark__rule">
            <span>Studio</span>
          </span>
        </Link>

        {/* Mobile: hamburger button */}
        <button
          ref={buttonRef}
          type="button"
          className="flex items-center justify-center text-[color:var(--color-accent-gold)] focus-visible:[filter:var(--filter-glow-gold-sm)] focus-visible:outline-none md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t('menuClose') : t('menuOpen')}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* Desktop: full nav + language switcher */}
        <div className="hidden items-center gap-10 md:flex">
          <nav aria-label="Primary">
            <ul className="flex gap-10 text-base">
              <li>
                <a href="#approach" className={navLinkClass}>
                  {t('approach')}
                </a>
              </li>
              <li>
                <a href="#work" className={navLinkClass}>
                  {t('work')}
                </a>
              </li>
              <li>
                <a href="#contact" className={navLinkClass}>
                  {t('contact')}
                </a>
              </li>
            </ul>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={[
          'overflow-hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] md:hidden',
          'transition-[max-height,opacity] duration-300 ease-in-out',
          menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-label={menuOpen ? t('menuOpen') : undefined}
        // `inert` removes the panel from the accessibility tree AND
        // prevents keyboard focus on the links inside — fixing the
        // axe-core "aria-hidden-focus" violation that `aria-hidden`
        // alone would cause (focusable elements inside a hidden region).
        {...(!menuOpen ? { inert: true } : {})}
      >
        <nav aria-label="Primary" className="mx-auto max-w-5xl px-6 pt-4 pb-6">
          <ul className="space-y-1">
            <li>
              <a href="#approach" className={mobileLinkClass} onClick={closeMenu}>
                {t('approach')}
              </a>
            </li>
            <li>
              <a href="#work" className={mobileLinkClass} onClick={closeMenu}>
                {t('work')}
              </a>
            </li>
            <li>
              <a href="#contact" className={mobileLinkClass} onClick={closeMenu}>
                {t('contact')}
              </a>
            </li>
          </ul>
          <div className="mt-4 border-t border-[color:var(--color-border)] pt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
