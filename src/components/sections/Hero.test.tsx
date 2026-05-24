/**
 * Unit tests for the Hero component.
 *
 * What we test:
 *   - CTA mailto link uses company.email (catches hardcoding regression)
 *   - Section has id="top" for scroll targeting
 *   - Logo image renders with correct alt text
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, unoptimized: _unoptimized, ...rest } = props;
    return <img alt="" {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

import { company } from '@/lib/company';

import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the CTA with a mailto link using company.email', () => {
    render(<Hero />);

    const cta = screen.getByTestId('hero-cta');
    expect(cta).toHaveAttribute('href', `mailto:${company.email}?subject=Hello%20HearthCode`);
  });

  it('has section id="top" for scroll targeting', () => {
    const { container } = render(<Hero />);

    const section = container.querySelector('section#top');
    expect(section).toBeInTheDocument();
  });

  it('renders the logo with alt text', () => {
    render(<Hero />);

    const logo = screen.getByRole('img', { name: 'HearthCode Studio' });
    expect(logo).toBeInTheDocument();
  });
});
