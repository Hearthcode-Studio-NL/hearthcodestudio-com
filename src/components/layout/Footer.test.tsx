/**
 * Unit tests for the Footer component.
 *
 * What we test:
 *   - Social links render with correct hrefs from company config
 *   - Social links open in a new tab (target="_blank", rel="noopener noreferrer")
 *   - KvK and BTW identifiers are pulled from company config
 *   - Privacy and accessibility page links render with correct hrefs
 *
 * Mocking strategy:
 *   Same as Header.test.tsx — next-intl returns keys as-is,
 *   Link becomes a plain <a>, next/image becomes a plain <img>.
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={typeof href === 'string' ? href : '/'} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, unoptimized: _unoptimized, ...rest } = props;
    return <img alt="" {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

import { company } from '@/lib/company';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders all three social links with correct hrefs', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', company.social.github);

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toHaveAttribute('href', company.social.linkedin);

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute('href', company.social.instagram);
  });

  it('opens social links in a new tab', () => {
    render(<Footer />);

    const socialLinks = [
      screen.getByRole('link', { name: 'GitHub' }),
      screen.getByRole('link', { name: 'LinkedIn' }),
      screen.getByRole('link', { name: 'Instagram' }),
    ];

    for (const link of socialLinks) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });

  it('displays KvK and BTW from company config', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(company.kvk);
    expect(footer).toHaveTextContent(company.btwId);
  });

  it('renders privacy and accessibility page links', () => {
    render(<Footer />);

    const privacyLink = screen.getByRole('link', { name: 'privacy' });
    expect(privacyLink).toHaveAttribute('href', '/privacy');

    const a11yLink = screen.getByRole('link', { name: 'accessibility' });
    expect(a11yLink).toHaveAttribute('href', '/toegankelijkheidsverklaring');
  });
});
