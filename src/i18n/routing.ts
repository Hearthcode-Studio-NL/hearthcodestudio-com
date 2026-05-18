import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // All supported locales
  locales: ['nl', 'en'],

  // Dutch is the default — visitors land on /nl/ unless they choose English
  defaultLocale: 'nl',
});
