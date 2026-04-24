import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { Approach } from '@/components/sections/Approach';

import HomePage from './page';

describe('HomePage', () => {
  it('renders the HearthCode name and the approved tagline', () => {
    const { getAllByText, getByText } = render(<HomePage />);
    // "HearthCode" appears inside the hero wordmark h1.
    expect(getAllByText(/HearthCode/i).length).toBeGreaterThan(0);
    expect(getByText(/Digital craft, deeply rooted\./i)).toBeInTheDocument();
  });
});

describe('a11y', () => {
  // We run axe against a structurally-complete fragment (a single <main>
  // wrapping one section). Color-contrast is intentionally out of scope for
  // this unit-level check — jsdom has no CSS resolver, so computed contrast
  // can't be trusted here. Contrast is covered by the Lighthouse job and the
  // Playwright a11y spec, which run against the real built site.
  it('Approach section has no axe-detectable violations', async () => {
    const { container } = render(
      <main>
        <Approach />
      </main>,
    );
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
