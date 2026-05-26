@AGENTS.md

# hearthcodestudio-com — Working Memory

## Current state (updated 2026-05-26)

- **Build:** v1.0.0 — bilingual NL/EN (next-intl), project detail pages, mobile hamburger menu
- **Deploy:** Production live on hearthcodestudio.com (Vercel)
- **Repo:** Public on GitHub (Hearthcode-Studio-NL/hearthcodestudio-com, since 2026-05-17)
- **Developer:** Wijnand (HearthCode Studio) — new to coding, explain decisions
- **Analytics:** Plausible (cookie-free, GDPR-safe) — gated on `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; set in Vercel prod env, blank in dev/preview

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

- Unit: `src/**/*.test.tsx` (vitest + jsdom — per-component, no root placeholder)
- E2E: `e2e/smoke.spec.ts`, `e2e/a11y.spec.ts` (Playwright + axe-core)
- Lighthouse: `lighthouserc.cjs` — **runs against the live production URL by design** (see `src/proxy.ts` noindex header on non-canonical hosts). Job name "Lighthouse (production monitor)" reflects this.

## Key facts

- Bilingual NL/EN via next-intl with `[locale]` route segment
- Project detail pages for PUM, DAP2D, hearthcodestudio-com
- Mobile hamburger menu with inert pattern for a11y
- Brand tokens: `HearthCode-Vault/06-Brand-Assets/css/colors_and_type.css` (Path A per ADR-0001)
- Studio credit: `© {currentYear} HearthCode Studio` (own-site variant per Studio-Credit-Standard.md)
- Legal: KvK 42047881, BTW-id NL005456707B34 in footer
- **Project registry:** `src/lib/projects.ts` — single source of truth for slug + image + GitHub/site URL. `Work.tsx`, `ProjectContent.tsx`, `[slug]/page.tsx`, and `sitemap.ts` all read from it.
- **Shared link styles:** `src/lib/styles.ts` — exports `goldGlowTextLink`, `goldGlowIconLink`, `goldGlowCard`, `goldOutlineButton`. Header, Footer, Work, ProjectContent all import from here so the gold-glow recipe lives in one place.
- **TinaCMS:** removed (commit a97d482, 2026-05-21). Edit `messages/*.json` directly in VS Code. If a true CMS is ever needed, do a fresh Phase 1b — don't restore the 2.x scaffold (`react-use → js-cookie` vuln chain is unsolved upstream).
- **SkipLink:** server-rendered via `getTranslations('SkipLink')` in the locale layout — no hardcoded NL/EN ternary, adding a third locale won't regress.

## Automated health checks

A daily check (noon) and weekly deep audit (Mondays) write findings to `_cowork/audit-findings.md`. **On session start, read that file first.** If status is WARN or FAIL, surface the top issues to Wijnand before starting other work. Safe fixes (npm audit fix, patch updates, truncated file restores) are applied automatically — the findings file shows what was auto-fixed and what needs manual attention.

## Session bookkeeping

Handled by the `session-manager` skill (root workspace) or `daily-docs-sweep` scheduled task. Project key: `studio` (this site is HearthCode Studio overhead). If working in a project-scoped session without the skill, write to `_cowork/session-clock.md` — the next root session consolidates automatically.
