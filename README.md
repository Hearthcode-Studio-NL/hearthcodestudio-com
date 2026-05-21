# hearthcodestudio-com

The studio's public landing page — a single-page long-scroll marketing site at <https://hearthcodestudio.com>.

## Tech stack

- Framework: Next.js 16 (App Router), Turbopack for production builds
- Language: TypeScript (strict + exactOptionalPropertyTypes), React 19
- Styling: Tailwind CSS v4 (CSS-first; design tokens in `src/styles/brand-tokens.css`, wired via `src/app/globals.css`)
- Brand: path A — HearthCode canonical. See [docs/adr/0001-brand-source.md](docs/adr/0001-brand-source.md).
- Fonts: self-hosted via `@fontsource/*` (Cinzel, Cormorant Garamond, Inter, JetBrains Mono)
- Testing: Vitest + Testing Library + jest-axe (unit), Playwright + @axe-core/playwright (E2E), Lighthouse CI (perf + a11y ≥ budgets)
- Hosting: Vercel (free tier); domain `hearthcodestudio.com` at TransIP

## Getting started

```bash
git clone https://github.com/Hearthcode-Studio-NL/hearthcodestudio-com.git
cd hearthcodestudio-com
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL if needed
npm install
npm run dev
```

Open <http://localhost:3000>. Requires Node 20+ and npm 10+.

## Environment variables

| Variable               | Description                                              | Required |
| ---------------------- | -------------------------------------------------------- | -------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL — used for OG, sitemap, robots. | yes      |

Add real secrets in Vercel's project env settings, never in the repo.

## Scripts

| Command                 | What it does                                   |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Next dev server (Turbopack) on `:3000`         |
| `npm run build`         | Production build (Turbopack)                   |
| `npm run start`         | Serve the production build locally             |
| `npm run lint`          | ESLint 9 (flat config)                         |
| `npm run format`        | Prettier write (safe to run repeatedly)        |
| `npm run typecheck`     | `tsc --noEmit` in strict mode                  |
| `npm run test`          | Vitest watch mode (Ctrl+C to exit)             |
| `npm run test:run`      | Vitest single-pass (used by CI)                |
| `npm run test:coverage` | Vitest with v8 coverage                        |
| `npm run test:e2e`      | Playwright E2E (smoke + a11y) — requires build |

## Deployment

`main` auto-deploys to Vercel. Preview URLs go out for every PR. DNS points `hearthcodestudio.com` at Vercel via TransIP — see the project handover notes once launched.

## Layout

Bilingual (NL/EN) via `next-intl`. Every user-facing page lives under `[locale]`; the root `page.tsx` redirects to the default locale.

```
src/
  app/
    layout.tsx                        Root <html>/<body>, metadata, font variables
    page.tsx                          Root redirect to /nl (default locale)
    globals.css                       Tailwind + @fontsource + brand tokens + @theme inline
    robots.ts                         Dynamic robots.txt
    sitemap.ts                        Dynamic sitemap.xml
    [locale]/
      layout.tsx                      Per-locale shell — Header, Footer, next-intl provider
      page.tsx                        Home (Hero + Approach + Person + Work + Contact)
      privacy/page.tsx                Privacy policy (NL/EN variants)
      toegankelijkheidsverklaring/    Accessibility statement (NL/EN variants)
      projects/[slug]/page.tsx        Project detail pages (pum, dap2d, hearthcode)
  components/
    layout/{Header,Footer}.tsx        Sticky header with mobile hamburger, footer with socials
    sections/{Hero,Approach,Person,Work,Contact}.tsx
    legal/{PrivacyNL,PrivacyEN,AccessibilityNL,AccessibilityEN}.tsx
    projects/ProjectContent.tsx       Shared project detail layout
  fonts/
    fonts.ts                          next/font/local config (Cinzel, Cormorant, Inter)
  i18n/
    routing.ts                        Locale list + default locale
    request.ts                        next-intl server request config
    navigation.ts                     Locale-aware Link, usePathname, useRouter
  lib/
    company.ts                        Canonical company identifiers (KvK, BTW, socials)
  styles/
    brand-tokens.css                  Design tokens (colours, typography, glows, spacing)
messages/
  nl.json                             Dutch translations
  en.json                             English translations
docs/
  adr/0001-brand-source.md            Path A brand wiring decision record
e2e/
  smoke.spec.ts                       Page load + structure (data-testid, no exact copy)
  a11y.spec.ts                        axe-core WCAG 2.2 AA sweep on every route
```

## Conventions

This project follows HearthCode Studio's internal coding, testing, accessibility, and deployment standards. Conventional Commits, PR-per-concern, all CI gates green before merge.

## Related links

- Production: <https://hearthcodestudio.com>
- Issue tracker: GitHub Issues on this repo
