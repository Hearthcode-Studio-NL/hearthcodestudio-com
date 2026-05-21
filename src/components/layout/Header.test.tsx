/**
 * Unit tests for the Header component.
 *
 * What we test:
 *   - Mobile menu toggle (open/close via hamburger button)
 *   - Escape key closes the menu and returns focus to the button
 *   - Body scroll is locked while the menu is open
 *   - The inert attribute hides the menu panel from assistive tech when closed
 *   - Desktop nav links render with correct anchor hrefs
 *
 * Mocking strategy:
 *   next-intl's useTranslations returns the translation key as-is,
 *   so we can assert on structure without needing real translation files.
 *   The Link component from @/i18n/navigation is replaced with a plain <a>.
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock next-intl
vi.mock('next-intl', () => ({
  useLocale: () => 'nl',
  useTranslations: () => (key: string) => key,
}));

// Mock @/i18n/navigation — Link becomes a plain <a>, usePathname returns '/'
vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    locale: _locale,
    ...rest
  }: {
    href: string;
    locale?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={typeof href === 'string' ? href : '/'} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/',
}));

// Import after mocks are set up
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    // Reset body scroll between tests
    document.body.style.overflow = '';
  });

  it('renders the desktop navigation links', () => {
    render(<Header />);

    // The Header renders two <nav aria-label="Primary"> elements — one for
    // desktop and one inside the mobile slide-down menu. In a real browser
    // CSS hides one; jsdom doesn't apply CSS, so both appear in the DOM.
    // We use getAllByRole and check that at least one exists.
    const navs = screen.getAllByRole('navigation', { name: 'Primary' });
    expect(navs.length).toBeGreaterThanOrEqual(1);

    // The desktop nav (first match) should contain anchor links
    const desktopNav = navs[0]!;
    expect(desktopNav.querySelectorAll('a[href^="#"]').length).toBe(3);
  });

  it('renders the language switcher with NL active', () => {
    render(<Header />);

    // Two Language navs exist (desktop + mobile) — same reason as above.
    const langNavs = screen.getAllByRole('navigation', { name: 'Language' });
    expect(langNavs.length).toBeGreaterThanOrEqual(1);

    // Check the first one (desktop) has NL marked as current
    const nlLabel = langNavs[0]!.querySelector('[aria-current="true"]');
    expect(nlLabel).toBeInTheDocument();
    expect(nlLabel).toHaveTextContent('NL');
  });

  it('mobile menu panel has inert attribute when closed', () => {
    render(<Header />);

    const menu = document.getElementById('mobile-menu');
    expect(menu).toHaveAttribute('inert');
  });

  it('toggles the mobile menu open and closed', () => {
    render(<Header />);

    const button = screen.getByRole('button', { name: /menu/i });
    const menu = document.getElementById('mobile-menu')!;

    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(menu).toHaveAttribute('inert');

    // Open
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(menu).not.toHaveAttribute('inert');

    // Close
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(menu).toHaveAttribute('inert');
  });

  it('locks body scroll when the menu is open', () => {
    render(<Header />);

    const button = screen.getByRole('button', { name: /menu/i });

    expect(document.body.style.overflow).toBe('');

    fireEvent.click(button);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(button);
    expect(document.body.style.overflow).toBe('');
  });

  it('closes the menu on Escape and returns focus to the button', () => {
    render(<Header />);

    const button = screen.getByRole('button', { name: /menu/i });

    // Open the menu
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Press Escape — the handler listens on `document`
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(button);
  });
});
