/**
 * Unit tests for the Work component.
 *
 * What we test:
 *   - Renders exactly 3 project cards (pum, dap2d, hearthcode)
 *   - Each card links to /projects/{slug}
 *   - The carousel list has an accessible label
 */

import { render, screen, within } from '@testing-library/react';
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
    const { fill, priority, unoptimized, ...rest } = props;
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

import { Work } from './Work';

describe('Work', () => {
  it('renders the project carousel list with an accessible label', () => {
    render(<Work />);

    const list = screen.getByRole('list', { name: 'Projects' });
    expect(list).toBeInTheDocument();
  });

  it('renders exactly 3 project cards', () => {
    render(<Work />);

    const list = screen.getByRole('list', { name: 'Projects' });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it('each card links to /projects/{slug}', () => {
    render(<Work />);

    const list = screen.getByRole('list', { name: 'Projects' });
    const links = within(list).getAllByRole('link');

    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/projects/pum');
    expect(hrefs).toContain('/projects/dap2d');
    expect(hrefs).toContain('/projects/hearthcode');
  });
});
