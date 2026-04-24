# ADR-0001 — Brand source (path A, HearthCode canonical)

- **Status:** Accepted
- **Date:** 2026-04-24
- **Deciders:** Wijnand

## Context

`hearthcodestudio.com` is a public marketing site for HearthCode Studio itself — not a client engagement. It uses HearthCode's canonical brand system (colors, typography, iconography, voice, component patterns) rather than a client-derived one.

Single-source-of-truth discipline matters here because HearthCode will run several projects in parallel (this site, own apps, client sites). If every project wires brand tokens from slightly different values, the studio stops feeling coherent across channels — the exact drift [[../../../HearthCode-Vault/05-Templates/Brand-Wiring-Recipe|Brand-Wiring-Recipe]] is designed to prevent.

This ADR records where our brand comes from, what we did to it during wiring, and how a future token change should propagate — so six months from now it is obvious why `src/styles/brand-tokens.css` looks exactly like `06-Brand-Assets/css/colors_and_type.css` minus one line.

## Decision

We adopt **brand path A — HearthCode-branded** per [[../../../HearthCode-Vault/05-Templates/New-Project-Checklist|New-Project-Checklist]] Step 0. Specifically:

- **Canonical source of truth:** `HearthCode-Vault/06-Brand-Assets/`.
  - `css/colors_and_type.css` → design tokens, base element styles, wordmark, flame-flicker, film-grain.
  - `favicons/` → favicon pack (nine files + `site.webmanifest`).
  - `logos/` → full-color logo lockups + mark-only variants.
- **Project-local copy:** `src/styles/brand-tokens.css` is a verbatim copy of `colors_and_type.css` with **one intentional deviation**: the leading `@import url('https://fonts.googleapis.com/...')` line is stripped. Fonts are self-hosted via `@fontsource/*` packages imported from `src/app/globals.css`, per the Brand-Wiring-Recipe "Known gotchas — self-hosted fonts" section and the EAA/GDPR posture in [[../../../HearthCode-Vault/04-Standards/Legal-Accessibility|Legal Accessibility]].
- **Tailwind v4 theme bridge:** `src/app/globals.css` declares an `@theme inline { … }` block that remaps brand tokens onto Tailwind-friendly utility names (e.g. `--color-bg-primary` → `--color-background` → `bg-background` utility). The brand token names stay canonical in `brand-tokens.css`; only the Tailwind theme layer uses aliased names, so the bridge stays reversible.
- **Favicons + `site.webmanifest`:** verbatim copies from the vault, placed under `public/` for static serving. `favicon.ico` also lives at `src/app/favicon.ico` so Next 16's App Router convention picks it up.
- **Logos:** `public/brand/logo.png` (full colour transparent), `public/brand/logo-leather.png` (OG image), `public/brand/logo-mark.png` (mark-only).

Tokens derived → at commit `f44f31af8d51fb1511342d25f475144218dbbb9f` — this is the initial scaffold commit that first put `src/styles/brand-tokens.css` and the vault favicons/logos into the project repo. Future vault token updates will land as their own commits with a `chore: sync brand tokens from vault` style message, referencing the vault `colors_and_type.css` commit they track.

## Alternatives considered

- **Path B / C (client-derived brand).** Rejected: this is HearthCode's own site, not a client deliverable.
- **Import `06-Brand-Assets/css/colors_and_type.css` directly via relative filesystem path at build time.** Rejected: it would couple this repo to the vault's directory layout forever and break any future open-sourcing of this project. The "copy + ADR + token-update PR" loop is explicit, legible, and works even if the vault relocates.
- **Keep Google Fonts `@import url(...)` in the tokens CSS.** Rejected on EAA / GDPR grounds. Every visitor's IP would reach Google on first paint; for a studio site aimed at EU SMEs we self-host instead. Performance tradeoff (slightly larger first CSS request) is acceptable for a brochure-scale site.
- **Tailwind v3 with `tailwind.config.ts`.** Rejected: the scaffolder installed Tailwind v4; the CSS-first `@theme inline` approach is the supported path going forward. See [[../../../HearthCode-Vault/05-Templates/Brand-Wiring-Recipe#1c-v4. Tailwind v4 (CSS-first, the current default)|Brand-Wiring-Recipe § 1c-v4]].

## Consequences

### Positive

- One source of truth means the next HearthCode project (apps, client sites using path A, future microsites) wires the same tokens the same way — predictable onboarding.
- The single-line deletion (`@import url(...)`) is the only project-local deviation, so a future audit of the brand source is grep-friendly (`diff vault/colors_and_type.css project/brand-tokens.css` should return just that one line).
- The Tailwind v4 bridge is additive — the vault CSS is untouched; aliasing lives only in `globals.css`.
- Self-hosted fonts mean the site stays functional without Google Fonts reachable, and doesn't leak visitor IPs during first paint.

### Negative / trade-offs

- When the vault tokens change, a human must re-copy `colors_and_type.css` into `src/styles/brand-tokens.css` (minus the Google Fonts line). No automated sync. Mitigation: keep a token-bump PR script in the future, or run a weekly diff check via CI.
- `@theme inline` requires distinct left-hand names from the tokens it maps (otherwise `--color-border: var(--color-border)` becomes a circular self-reference). This is documented in `globals.css` and in the Brand-Wiring-Recipe, but it's a footgun for anyone extending the theme without reading either.
- `@fontsource` packages are additional dependencies (four packages, ~500 KB of woff2) that need updating alongside the rest of the dependency graph.

### Neutral

- `docs/brand-sheet.html` is **not** included in this project — that artefact belongs to path-B/C client projects as a signoff deliverable. For path A the canonical `Canonical-Reference.md` in the vault fills the same role.
- `.hc-on-light` utility is shipped (it's part of `colors_and_type.css`) but currently unused — reserved for any future light-background section.

## References

- [[../../../HearthCode-Vault/05-Templates/Brand-Wiring-Recipe|Brand-Wiring-Recipe]] — the mechanics followed here, particularly § 1 (Next.js + Tailwind) and § 1c-v4 (Tailwind v4 theme bridge).
- [[../../../HearthCode-Vault/05-Templates/New-Project-Checklist|New-Project-Checklist]] — Step 0 (brand path decision).
- [[../../../HearthCode-Vault/06-Brand-Assets/css/colors_and_type.css]] — canonical token source.
- [[../../../HearthCode-Vault/02-Design-System/Canonical-Reference|Canonical-Reference]] — the full design system reference.
- [[../../../HearthCode-Vault/04-Standards/Legal-Accessibility|Legal-Accessibility]] — why self-hosted fonts are the default for EU-facing properties.
- [[../../../HearthCode-Vault/05-Templates/Day-1-Walkthrough|Day-1-Walkthrough]] — the narrative sequence this project followed.
