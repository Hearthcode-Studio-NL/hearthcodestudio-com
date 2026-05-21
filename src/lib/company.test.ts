import { describe, expect, it } from 'vitest';

import { company } from './company';

describe('company config', () => {
  it('exposes the public KvK number', () => {
    expect(company.kvk).toBe('42047881');
  });

  it('exposes the public BTW-id', () => {
    expect(company.btwId).toBe('NL005456707B34');
  });

  it('has a valid email address', () => {
    expect(company.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
  });

  it('does not contain the private omzetbelastingnummer', () => {
    // The BSN-derived tax number must never appear in client code.
    const allValues = JSON.stringify(company);
    expect(allValues).not.toContain('183020005B01');
  });

  it('includes all social links', () => {
    expect(company.social.github).toMatch(/^https:\/\/github\.com\//);
    expect(company.social.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(company.social.instagram).toMatch(/^https:\/\/www\.instagram\.com\//);
  });
});
