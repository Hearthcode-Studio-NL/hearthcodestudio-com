@AGENTS.md

# hearthcodestudio-com — Working Memory

## Current state (updated 2026-05-20)

- **Build:** v1.0.0 — bilingual NL/EN (next-intl), project detail pages, mobile hamburger menu
- **Deploy:** Production live on hearthcodestudio.com (Vercel)
- **Repo:** Public on GitHub (Hearthcode-Studio-NL/hearthcodestudio-com, since 2026-05-17)
- **Developer:** Wijnand (HearthCode Studio) — new to coding, explain decisions

## Stack

Next.js 16 App Router · Turbopack · TypeScript strict + exactOptionalPropertyTypes · Tailwind v4 (CSS-first via `@theme inline`) · Vercel hosting · Conventional Commits.

## CI and testing

CI workflow: `.github/workflows/ci.yml`

Jobs (all block merges via branch protection):

- **fast** — lint + typecheck + vitest (< 60s target)
- **audit** — `npm audit --audit-level=high`
- **codeql** — CodeQL static analysis (repo is public, SARIF upload works, blocking)
- **full** — Playwright smoke + axe-core a11y against production build
- **lighthouse** — Lighthouse CI (PR-only) — perf, a11y, best-practices, SEO budgets

Testing policy: `HearthCode-Vault/04-Standards/Testing-Policy.md` (vault master).
ADRs: `docs/adr/0001-brand-source.md`, `0002-testing-waiver-codeql.md` (closed), `0003-testing-waiver-lighthouse-seo.md` (closed).

Tests:

- Unit: `src/app/page.test.tsx` (vitest + jsdom)
- E2E: `e2e/smoke.spec.ts`, `e2e/a11y.spec.ts` (Playwright + axe-core)
- Lighthouse: `lighthouserc.cjs`

## Key facts

- Bilingual NL/EN via next-intl with `[locale]` route segment
- Project detail pages for PUM, DAP2D, hearthcodestudio-com
- Mobile hamburger menu with inert pattern for a11y
- Brand tokens: `HearthCode-Vault/06-Brand-Assets/css/colors_and_type.css` (Path A per ADR-0001)
- Studio credit: `© {currentYear} HearthCode Studio` (own-site variant per Studio-Credit-Standard.md)
- Legal: KvK 42047881, BTW-id NL005456707B34 in footer
