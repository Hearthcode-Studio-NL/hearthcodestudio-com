/**
 * Unit tests for the ProjectContent component.
 *
 * What we test:
 *   - Returns null (renders nothing) for an unknown slug
 *   - Renders a back link to /#work
 *   - Shows the GitHub link for projects that have one (e.g. pum)
 *   - Shows the site link for projects that have one (e.g. dap2d)
 *   - Does NOT show a GitHub link for projects without one (e.g. dap2d)
 *   - Renders body paragraphs from translations
 *
 * Mocking strategy:
 *   next-intl's useTranslations returns a function that echoes keys.
 *   t.raw() returns a two-item array to simulate paragraph content.
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    // t.raw() is called for paragraphs — return a mock string array
    t.raw = (_key: string) => ['Paragraph one.', 'Paragraph two.'];
    return t;
  },
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

import { ProjectContent } from './ProjectContent';

describe('ProjectContent', () => {
  it('returns null for an unknown slug', () => {
    const { container } = render(<ProjectContent slug="nonexistent" />);
    expect(container.innerHTML).toBe('');
  });

  it('renders a back link to /#work', () => {
    render(<ProjectContent slug="erfplan" />);

    const backLink = screen.getByRole('link', { name: /backToHome/i });
    expect(backLink).toHaveAttribute('href', '/#work');
  });

  it('shows the GitHub link for erfplan', () => {
    render(<ProjectContent slug="erfplan" />);

    const githubLink = screen.getByRole('link', { name: /viewOnGitHub/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Hearthcode-Studio-NL/property-utility-mapper',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('shows the site link for dap2d', () => {
    render(<ProjectContent slug="dap2d" />);

    const siteLink = screen.getByRole('link', { name: /visitSite/i });
    expect(siteLink).toHaveAttribute('href', 'https://dap2d.nl');
  });

  it('does NOT show a GitHub link for dap2d', () => {
    render(<ProjectContent slug="dap2d" />);

    const links = screen.getAllByRole('link');
    const githubLink = links.find((l) => l.textContent?.includes('viewOnGitHub'));
    expect(githubLink).toBeUndefined();
  });

  it('renders body paragraphs', () => {
    render(<ProjectContent slug="erfplan" />);

    expect(screen.getByText('Paragraph one.')).toBeInTheDocument();
    expect(screen.getByText('Paragraph two.')).toBeInTheDocument();
  });
});
