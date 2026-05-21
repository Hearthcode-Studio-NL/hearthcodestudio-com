// Canonical company identifiers — single source of truth.
// Used by Footer, legal pages, and anywhere KvK/BTW appear.
//
// Public values only. The omzetbelastingnummer (BSN-derived) is
// PRIVATE and must never appear in client-shipped code.

export const company = {
  name: 'HearthCode Studio',
  kvk: '42047881',
  btwId: 'NL005456707B34',
  email: 'info@hearthcodestudio.com',
  siteUrl: 'https://hearthcodestudio.com',
  social: {
    github: 'https://github.com/Hearthcode-Studio-NL',
    linkedin: 'https://www.linkedin.com/company/hearthcode-studio-807823404',
    instagram: 'https://www.instagram.com/hearthcodestudio',
  },
} as const;
