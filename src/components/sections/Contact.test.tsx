/**
 * Unit tests for the Contact component.
 *
 * What we test:
 *   - Email link uses company.email from config (catches hardcoding regression)
 *   - Section has id="contact" for scroll targeting
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { company } from '@/lib/company';

import { Contact } from './Contact';

describe('Contact', () => {
  it('renders the email link using company.email', () => {
    render(<Contact />);

    const emailLink = screen.getByRole('link', { name: company.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${company.email}`);
  });

  it('has section id="contact" for scroll targeting', () => {
    const { container } = render(<Contact />);

    const section = container.querySelector('section#contact');
    expect(section).toBeInTheDocument();
  });
});
