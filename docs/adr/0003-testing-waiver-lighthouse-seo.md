# ADR-0003 — Waive Lighthouse `categories:seo >= 1.0` for `hearthcodestudio-com` while pre-DNS-cutover

> Specialised ADR for temporary exception to the [Testing Policy][tp] performance gate. The site's `src/middleware.ts` deliberately emits `X-Robots-Tag: noindex, nofollow` on every host that is not the canonical `hearthcodestudio.com`. That posture is correct — it prevents the `*.vercel.app` preview from creating duplicate-content competition for the real domain — but it makes the Lighthouse SEO `is-crawlable` audit fail, dragging the SEO category score below the 1.0 quality bar on every CI run that targets `localhost` or any preview alias.

[tp]: ../../HearthCode-Vault/04-Standards/Testing-Policy.md
[gw]: ../../HearthCode-Vault/04-Standards/Git-Workflow.md
[mw]: ../../src/middleware.ts

- **Status:** Closed
- **Date:** 2026-04-28
- **Owner:** Wijnand
- **Expires:** 2026-07-28 (3 months — short, because the Layer-3 DNS cutover that closes this waiver is days-to-weeks away, not quarters)
- **Related issue / PR:** PR #6 — `chore/legal-kvk-published` → `main`

---

## The requirement being waived

- **Policy source:** [Testing Policy § Performance — Websites][tp]
- **Requirement (verbatim):** "Lighthouse CI: Performance ≥ 90 mobile, Accessibility = 100, **SEO = 100**."

This ADR waives the **SEO = 100** part only. Performance and Accessibility gates remain at full strength.

## Scope

- **Applies to:** the `hearthcodestudio-com` repository's Lighthouse CI runs while the site is served from any non-canonical host (CI uses `http://localhost:3000`; production preview is `https://hearthcodestudio-com.vercel.app/`).
- **Does not apply to:** any client repository. Each client's project keeps the full `SEO = 100` gate, because client sites are deployed under their own canonical domain from launch and don't have HearthCode's "noindex everything that isn't the canonical host" middleware pattern.
- **Does not waive:** Performance (`>= 0.9`), Accessibility (`= 1.0`), or Best Practices (`>= 0.9` warn). All remain enforced.

## Why

The middleware in [`src/middleware.ts`][mw] is a deliberate SEO discipline: it stops Google from indexing the `*.vercel.app` deployment so that the canonical domain (once DNS is cut over) doesn't compete with itself for ranking. The Lighthouse SEO audit `is-crawlable` reads the resulting `X-Robots-Tag: noindex, nofollow` header and downscores the page accordingly. The two designs — "block search engines on non-canonical hosts" and "Lighthouse CI requires SEO = 100 on every preview deploy" — are mutually exclusive while CI tests against `localhost`.

The right fix is the DNS cutover itself: as soon as `hearthcodestudio.com` resolves to Vercel and the middleware's `CANONICAL_HOSTS` check passes for the production response, the noindex tag stops firing and the SEO score returns to 1.0 without any code change. Until then, requiring `categories:seo >= 1.0` on `localhost` is asking the middleware to be wrong for the duration of CI.

The alternatives considered and rejected:

- **Add `localhost` to `CANONICAL_HOSTS`.** Rejected — the middleware's `CANONICAL_HOSTS` set is the _production canonical-domain_ set, not "places where we don't want noindex." Polluting it would break the design intent. The middleware comment explicitly lists localhost as a host that _should_ receive noindex.
- **Skip the noindex middleware in `NODE_ENV !== 'production'`.** Rejected — Vercel runs production builds in production mode for previews too. The check would silently differ between `npm run start` locally and Vercel's deploy.
- **Disable only the `is-crawlable` audit.** Considered — would fix the headline failure, but the actual SEO score on this preview is 0.63, suggesting at least one other audit beyond `is-crawlable` is also flagging. Disabling individual audits without seeing each one is fishing-not-fixing.
- **Override the Lighthouse run to use a `Host:` header of `hearthcodestudio.com`.** Possible but adds a CI-only test-double that diverges from how visitors actually reach the page. Rejected for now; can be reconsidered at the DNS-cutover review.

## Risk and mitigation

### What could go wrong without this rule

- A real SEO regression (broken canonical link, missing meta description, wrong viewport, broken hreflang) lands and Lighthouse can't catch it because the SEO score is allowed to be 0.6.

### How we're reducing that risk while the waiver is active

- **The waiver lowers the threshold, it doesn't disable the audit.** `categories:seo >= 0.6` still fails the build if SEO regresses materially. The slack is just enough to absorb the noindex-driven drop, not enough to mask a missing `<title>` or broken meta description.
- **Manual SEO check at DNS cutover.** Before tagging `v1.0.0` (Layer 3), Lighthouse will be re-run against the live `hearthcodestudio.com` domain. The expected score is 1.0 (no middleware noindex). If it isn't, the waiver doesn't close — instead a real fix lands.
- **The waiver is short.** 3 months is not "we'll get to it eventually." DNS cutover is the trigger.

## Resolution plan

- **Target resolution date:** DNS cutover to `hearthcodestudio.com` — expected days to weeks, hard cap 2026-07-28.
- **Who closes it:** Wijnand.
- **What triggers review before expiry:**
  - DNS cutover happens. Re-run Lighthouse against the live canonical URL. If `categories:seo` is 1.0, raise the threshold back to 1.0 in `lighthouserc.cjs` and mark this ADR closed.
  - Or: a real SEO regression caught externally — file a fresh ADR documenting what broke and why the 0.6 floor didn't catch it.
- **Closure procedure:**
  1. Verify Lighthouse against `https://hearthcodestudio.com/` returns `categories:seo == 1.0`.
  2. In `lighthouserc.cjs`, change `'categories:seo': ['error', { minScore: 0.6 }]` back to `['error', { minScore: 1.0 }]`. Remove the explanatory comment that points at this ADR.
  3. CI green on the same commit.
  4. Mark this ADR Status as `Closed`. Add a row to § Review history.

## Review history

| Date       | Reviewer | Notes                                                                                                                                                                                                                                                                                                                    |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-04-28 | Wijnand  | Waiver accepted. Issued at v0.1.0 launch (PR #6) to unblock the merge for the KvK + BTW-id legal update while DNS still points at the \*.vercel.app preview.                                                                                                                                                             |
| 2026-05-17 | Wijnand  | **Waiver closed.** DNS cut over to `hearthcodestudio.com` (A record → 216.198.79.1). Lighthouse CI now runs against the production URL instead of localhost, so the noindex middleware no longer interferes. SEO threshold raised back to 1.0. `npm run build` removed from Lighthouse CI step (no local server needed). |

## References

- [Testing Policy][tp] — § Performance Websites — the source of the SEO = 100 requirement.
- [Git Workflow][gw] — § Required CI gates on `main`.
- [`src/middleware.ts`][mw] — the deliberate noindex behaviour this waiver works around.
- [ADR-0002][adr2] — companion CodeQL waiver issued in the same launch PR.
- [Testing-Waiver-ADR-template](../../HearthCode-Vault/05-Templates/Testing-Waiver-ADR-template.md) — the template this ADR follows.

[adr2]: ./0002-testing-waiver-codeql.md
