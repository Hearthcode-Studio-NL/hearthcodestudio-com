# ADR-0002 — Waive `codeql` static-analysis upload gate for `hearthcodestudio-com`

> Specialised ADR for temporary exception to the [Git Workflow][gw] required gates. The CodeQL job runs successfully (the analysis itself completes against all 22 TypeScript / 3 JavaScript / 1 GitHub Actions files in this repo), but the SARIF-upload step fails because GHAS Code Scanning is not enabled on this private repository. Day-1-Walkthrough explicitly anticipates this — see § Step 8c.

[gw]: ../../HearthCode-Vault/04-Standards/Git-Workflow.md
[tp]: ../../HearthCode-Vault/04-Standards/Testing-Policy.md
[opensource]: ../../HearthCode-Vault/04-Standards/Open-Sourcing-a-Repo.md

- **Status:** Accepted
- **Date:** 2026-04-28
- **Owner:** Wijnand
- **Expires:** 2026-10-28 (6 months — forces revisit at the natural "decide repo visibility" moment around DNS cutover and post-launch retro)
- **Related issue / PR:** PR #6 — `chore/legal-kvk-published` → `main`

---

## The requirement being waived

- **Policy source:** [Git Workflow § Required CI gates on `main`][gw]
- **Requirement (verbatim):** "`codeql` — GitHub CodeQL static analysis"

The job runs every PR and every push to `main`. The waiver only sets aside the **branch-protection requirement that this gate must be green** before merge. The job itself stays in the workflow and continues to run; this ADR explicitly accepts that it will fail at the upload step until GHAS Code Scanning is enabled.

## Scope

- **Applies to:** the `hearthcodestudio-com` repository only.
- **Does not apply to:** any other repository in the [`Hearthcode-Studio-NL`][org] org. Each repo decides its own posture.
- **Does not waive:** the underlying _intent_ of the rule — that static analysis must run on every change. ESLint + TypeScript strict mode + npm audit continue to run and continue to be required.

[org]: https://github.com/Hearthcode-Studio-NL

## Why

GitHub Code Scanning (powered by CodeQL) is a paid feature on private repositories — part of GitHub Advanced Security (GHAS), which is bundled with Enterprise plans and sold separately for Pro/Team. HearthCode Studio is a one-person eenmanszaak that does not currently hold a GHAS license, and the studio's marketing-site repository is private until launch. The CodeQL workflow runs to completion (analysis passes, no findings emitted), but the SARIF upload to GitHub Security can't land because the repository setting required to receive it is gated behind the paid feature.

The repository is **9 source files of brochure-scale Next.js 16 + TypeScript with no authentication, no payment, no user data, no server-side mutation, and no third-party API surface**. The risk profile of waiving the GHAS-backed CodeQL gate is materially smaller here than it would be on a transactional client product.

## Risk and mitigation

### What could go wrong without this rule

- A new dependency pull introduces a known vulnerability that CodeQL queries would flag (covered partly by `npm audit` in the `audit` job).
- A code change introduces an XSS / injection / prototype-pollution pattern that CodeQL queries would catch.
- A regex change introduces a ReDoS pattern.

### How we're reducing that risk while the waiver is active

- **ESLint** with `@typescript-eslint/recommended` and Next.js lint rules runs in the `fast` job. Catches a meaningful subset of what CodeQL's `js/audit` queries cover.
- **TypeScript strict mode** + `exactOptionalPropertyTypes` runs in the `fast` job. Eliminates whole classes of null/undefined and type-coercion bugs at compile time.
- **`npm audit --audit-level=high`** runs in the `audit` job. Catches advisory-published vulnerabilities in the dependency graph.
- **Dependabot** is enabled in repository settings. PRs land for high-severity advisories within hours of disclosure.
- **Secret scanning + push protection** are enabled in repository settings (free on private repos). Catches leaked tokens at push time.
- **Repository scope is small.** ~25 source files, no user input forms, no fetched data, no server actions that mutate state. Fewer lines of code to hide a bug in.
- **CodeQL still runs.** The analysis itself executes; the failing step is only the upload. If the analysis ever exits non-zero (an actual finding), the workflow log will show it even without a SARIF dashboard.

## Resolution plan

- **Target resolution date:** at or before 2026-10-28.
- **Who closes it:** Wijnand.
- **What triggers review before expiry:**
  - DNS cutover to `hearthcodestudio.com` (Layer 3 of the launch). Natural moment to revisit repo visibility per [Open-Sourcing-a-Repo][opensource] — the marketing site has nothing sensitive in it. **If the repo goes public, GHAS Code Scanning becomes free** and this waiver closes automatically.
  - Or: HearthCode adopts a paid GHAS plan (unlikely at studio scale, but flagged).
  - Or: a real security finding in this codebase via any of the compensating controls above. Trigger a fresh look at whether the waiver's risk model still holds.
- **Closure procedure:**
  1. Enable Code Scanning in repository Settings → Code security and analysis → Code scanning → Set up.
  2. Re-run the failing CI on the latest `main`. Confirm green.
  3. Mark this ADR Status as `Closed`. Add a row to § Review history.

## Review history

| Date       | Reviewer | Notes                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------- |
| 2026-04-28 | Wijnand  | Waiver accepted. Issued at v0.1.0 launch (PR #6) to unblock merge for the KvK + BTW-id legal update. |

Add a row each time the waiver is renewed, narrowed, or closed.

## References

- [Git Workflow][gw] — the source standard this ADR temporarily exempts.
- [Testing Policy][tp] — § Code scanning section that documents CodeQL's intent.
- [Day-1-Walkthrough § Step 8c — Set branch protection](../../HearthCode-Vault/05-Templates/Day-1-Walkthrough.md) — the "may go yellow on codeql if GHAS isn't on this repo (expected for private repos without GHAS)" warning that anticipates exactly this case.
- [Open-Sourcing-a-Repo][opensource] — the workflow for the repo-visibility decision that would close this waiver naturally.
- [Testing-Waiver-ADR-template](../../HearthCode-Vault/05-Templates/Testing-Waiver-ADR-template.md) — the template this ADR follows.
