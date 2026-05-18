import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// Lightweight wrappers around Next.js navigation APIs that
// automatically include the current locale in URLs.
//
// Use these instead of next/link and next/navigation throughout
// the app so links always resolve to the correct /nl/ or /en/ path.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
