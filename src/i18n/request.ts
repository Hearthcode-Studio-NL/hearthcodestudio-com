import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

// This runs once per request. next-intl calls it to figure out
// which locale the visitor is using and which translation file
// to load. The `requestLocale` comes from the [locale] route
// segment (resolved by the proxy/middleware).
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    // Dynamic import loads only the JSON for the active locale —
    // so an /en/ visitor never downloads the Dutch strings.
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
