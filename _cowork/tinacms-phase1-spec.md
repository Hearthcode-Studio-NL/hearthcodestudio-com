# TinaCMS Phase 1a — Implementation Spec (Minimal Proof)

> hearthcodestudio.com integration
> Author: Wijnand / Claude — 2026-05-24
> Status: **Approved** — Phase 1a scope locked, reviewed by Wijnand

---

## Why are we doing this?

Right now, every text change on hearthcodestudio.com requires editing JSON files
(`messages/en.json`, `messages/nl.json`), committing to Git, and waiting for
Vercel to rebuild. That works for a developer, but it means:

- You can't fix a typo without opening a code editor.
- A future client (or you yourself) can't update content independently.
- There's no visual preview of changes before they go live.

TinaCMS solves this by giving you a browser-based editing interface that saves
changes directly to your Git repo. You edit content visually, TinaCMS commits
the changes to a branch (or main), and Vercel deploys as usual. The content
files remain in Git — no database, no vendor lock-in.

**Phase 1a goal:** Prove that TinaCMS can safely edit `messages/en.json` and
`messages/nl.json`, commit to Git, trigger Vercel, and leave next-intl
untouched. Only simple, non-structural content blocks are editable.

---

## What is TinaCMS? (the 30-second version)

TinaCMS is a headless CMS that stores content as files in your Git repo
(Markdown, JSON, MDX). It provides:

- A visual editing sidebar that runs on your site at `/admin`
- A GraphQL content API that your pages query at build time
- Git-backed storage — every edit becomes a Git commit
- An optional cloud dashboard (TinaCloud) for auth and collaboration

Think of it as "a nice editing UI on top of your existing files." Your code
stays in Git, your content stays in Git, and you can always fall back to
editing files directly if TinaCMS isn't running.

---

## Current architecture

```
hearthcodestudio-com/
  messages/
    en.json          <- all English strings (flat keys: Hero.tagline, etc.)
    nl.json          <- all Dutch strings
  src/
    app/
      [locale]/
        page.tsx     <- homepage (renders Hero, Approach, Work, Contact)
        projects/
          [slug]/
            page.tsx <- project detail page
        privacy/
        toegankelijkheidsverklaring/
    components/
      sections/      <- Hero.tsx, Approach.tsx, Work.tsx, Contact.tsx
      projects/      <- ProjectContent.tsx
    i18n/            <- next-intl config
```

**i18n approach:** next-intl with subpath routing (`/nl`, `/en`). All
translatable strings live in `messages/{locale}.json`. Components call
`useTranslations('SectionName')` to get their strings.

**Key insight:** The site doesn't use Markdown files for content — it uses
structured JSON translation files. This is important because TinaCMS's default
pattern is "one Markdown file per page." We need a different approach.

---

## Integration strategy

**Option B: JSON collections with locale fields (chosen)**

Keep the existing `messages/en.json` and `messages/nl.json` files. Define
TinaCMS collections that map to these JSON files. TinaCMS edits the JSON
directly, next-intl reads it at build time as before.

**Why this works:**

- Zero changes to existing components — they keep using `useTranslations()`
- Zero changes to the i18n routing — subpath routing stays
- TinaCMS just becomes a nicer way to edit the same JSON files
- Fallback is trivial: remove TinaCMS, files are still plain JSON

**Why not Markdown (Option A):** Would require rewriting every component that
uses `useTranslations()`, breaking all tests, and abandoning the next-intl
setup. Rejected.

---

## Phase 1a scope — what becomes editable

| Section  | Editable fields                | Notes                   |
| -------- | ------------------------------ | ----------------------- |
| Metadata | title, description, og/twitter | SEO strings             |
| Hero     | tagline, description, CTA text | Short strings only      |
| Approach | heading, p1, p2                | Longer prose paragraphs |
| Person   | heading, p1, p2, p3, based     | Biography text          |
| Contact  | heading, description           |                         |
| Footer   | copyright                      | One field only          |

### Explicitly NOT in Phase 1a

- **Work section** (project cards) — structural, has slugs/links/states
- **ProjectDetail** (project detail pages) — nested SEO, paragraphs arrays
- **Navigation labels** — rarely change, high breakage risk
- **Language switcher text** — structural
- **Legal pages** — full pages, separate concern
- **Project images** — managed in `public/brand/`, not CMS content

**Why exclude projects for now?** Project content has slugs, links, project
states, card layout, detail pages, and SEO. That is where accidental breakage
becomes more likely. For a proof of concept, we only need to prove the JSON
editing pipeline works safely. Project pages become Phase 1b.

---

## TinaCMS configuration

### Packages to install

```bash
npm install tinacms @tinacms/cli
```

### Config file: `tina/config.ts`

```typescript
import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'brand',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'siteContent',
        label: 'Site Content',
        path: 'messages',
        format: 'json',
        fields: [
          // -- Metadata --
          {
            type: 'object',
            name: 'Metadata',
            label: 'SEO & Metadata',
            fields: [
              { type: 'string', name: 'title', label: 'Page title' },
              {
                type: 'string',
                name: 'description',
                label: 'Meta description',
                ui: { component: 'textarea' },
              },
              { type: 'string', name: 'ogTitle', label: 'OG title' },
              { type: 'string', name: 'ogDescription', label: 'OG description' },
              { type: 'string', name: 'twitterTitle', label: 'Twitter title' },
              { type: 'string', name: 'twitterDescription', label: 'Twitter description' },
            ],
          },
          // -- Hero --
          {
            type: 'object',
            name: 'Hero',
            label: 'Hero section',
            fields: [
              { type: 'string', name: 'tagline', label: 'Tagline' },
              { type: 'string', name: 'description', label: 'Description' },
              { type: 'string', name: 'cta', label: 'CTA button text' },
            ],
          },
          // -- Approach --
          {
            type: 'object',
            name: 'Approach',
            label: 'Approach section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'p1', label: 'Paragraph 1', ui: { component: 'textarea' } },
              { type: 'string', name: 'p2', label: 'Paragraph 2', ui: { component: 'textarea' } },
            ],
          },
          // -- Person --
          {
            type: 'object',
            name: 'Person',
            label: 'About the person',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'p1', label: 'Paragraph 1', ui: { component: 'textarea' } },
              { type: 'string', name: 'p2', label: 'Paragraph 2', ui: { component: 'textarea' } },
              { type: 'string', name: 'p3', label: 'Paragraph 3', ui: { component: 'textarea' } },
              { type: 'string', name: 'based', label: 'Location line' },
            ],
          },
          // -- Contact --
          {
            type: 'object',
            name: 'Contact',
            label: 'Contact section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              {
                type: 'string',
                name: 'description',
                label: 'Description',
                ui: { component: 'textarea' },
              },
            ],
          },
          // -- Footer --
          {
            type: 'object',
            name: 'Footer',
            label: 'Footer',
            fields: [{ type: 'string', name: 'copyright', label: 'Copyright text' }],
          },
        ],
      },
    ],
  },
});
```

**Note on schema maintenance:** This schema hardcodes section names. That is
fine for HearthCode Studio but does not scale to a reusable CMS template.
For client sites (Phase 3), consider repeated/list blocks, separate content
files per project, or a more flexible `projects.json`. Do not pretend this
is already a reusable template — it is a controlled TinaCMS experiment for
one site.

### How this maps to the existing files

TinaCMS will show two "documents" in the admin:

- **en** (from `messages/en.json`) — English content
- **nl** (from `messages/nl.json`) — Dutch content

When you edit the English Hero tagline, TinaCMS writes the change to
`messages/en.json`. The components never change — they still call
`useTranslations('Hero')`.

**Important:** The schema only covers fields in scope (Metadata through
Footer). The remaining keys in the JSON (SkipLink, Header, Work,
ProjectDetail, LanguageSwitcher) are not in the schema. TinaCMS should
preserve them untouched when saving — but this is exactly what we need to
verify in testing.

---

## Build script changes

```json
{
  "scripts": {
    "dev": "tinacms dev -c \"next dev --turbopack\"",
    "build": "tinacms build && next build",
    "start": "tinacms build && next start"
  }
}
```

**What's happening here:** TinaCMS has its own dev server that runs alongside
Next.js. The `-c` flag tells it "after starting the Tina server, run this
command." For production, `tinacms build` generates the admin UI and GraphQL
client, then `next build` builds the site as normal.

---

## .gitignore policy

Exclude `tina/__generated__` **only if** `tinacms build` is guaranteed to run
before typecheck/build in local, CI, and Vercel.

Verification checklist before excluding:

- [ ] `npm run build` runs `tinacms build` first (package.json scripts above)
- [ ] CI pipeline runs `tinacms build` before `tsc --noEmit`
- [ ] Vercel build command is `tinacms build && next build`
- [ ] Local `npm run dev` starts Tina server (generates files on startup)

If any of these fail, keep `tina/__generated__` in the repo until fixed.

---

## Safety rule: branch-first workflow

**During Phase 1a, TinaCloud must NOT commit directly to main.**

Configure TinaCloud to commit to a `cms/content-edit` branch (or use the
editorial workflow / PR flow). This lets us inspect the first generated diffs
before they reach production.

**Why:** If Tina reformats both JSON files, changes key ordering, or strips
fields not in the schema, we want to see that in a PR diff — not in a broken
production deploy.

**When to switch to main:** After at least 3 successful edits where:

1. Only the edited field changed in the diff
2. Non-schema fields (Work, ProjectDetail, etc.) were preserved
3. JSON formatting matches the project's Prettier config
4. CI passes on the branch

---

## Deployment options

### TinaCloud (recommended for Phase 1a)

- Free tier: 2 users — sufficient for Wijnand + one test editor
- Handles auth (who can edit), Git integration (commits on save)
- Admin lives at `yourdomain.com/admin`
- Setup: register at app.tina.io, connect GitHub repo, set env vars

### Self-hosted (Phase 3)

- Fully free, no user limit
- Requires: your own database, auth provider, git provider config
- Better for productizing for clients
- Not worth the infrastructure overhead for a proof of concept

---

## Implementation steps

### Step 1: Install and init (30 min)

```bash
npx @tinacms/cli@latest init
```

This creates `tina/config.ts` and installs dependencies. Replace the generated
config with our schema above (Phase 1a fields only).

### Step 2: Update .gitignore (5 min)

Add TinaCMS generated files (conditional — see .gitignore policy section).

### Step 3: Update build scripts (5 min)

Update `package.json` scripts. Keep the original scripts as comments.

### Step 4: Test locally WITHOUT TinaCloud (1h)

Run `npm run dev`, go to `/admin/index.html`. At this stage, Tina runs in
"local mode" — no cloud connection, edits write directly to disk.

**Test checklist:**

- [ ] Admin loads and shows `en` and `nl` documents
- [ ] Can edit Hero.tagline in `en`, save, see change in `messages/en.json`
- [ ] Can edit Hero.tagline in `nl`, save, see change in `messages/nl.json`
- [ ] Non-schema keys (Work, ProjectDetail, etc.) survive the save unchanged
- [ ] JSON formatting matches Prettier config (no reformatting on save)
- [ ] Site renders correctly at `/en` and `/nl` with the edited content
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes (all 30 unit tests)
- [ ] `npm run lint` passes

**STOP HERE if any test fails.** Debug before proceeding.

### Step 5: Register on TinaCloud (15 min)

1. Go to app.tina.io, sign up, create project, connect GitHub repo
2. Get `clientId` and `token`
3. Add to `.env.local` and Vercel project settings
4. **Configure branch target:** set to `cms/content-edit`, NOT `main`

### Step 6: Update CI pipeline (15 min)

Add `tinacms build` before typecheck/build. Add TinaCloud env vars to secrets.

### Step 7: Deploy to Vercel (15 min)

Push to main. Verify:

- Vercel build succeeds (both `tinacms build` and `next build`)
- Admin accessible at `hearthcodestudio.com/admin/index.html`
- TinaCloud login works

### Step 8: Branch-first edit test (30 min)

1. Edit Hero tagline (EN) in admin, save
2. Check GitHub: a commit appeared on `cms/content-edit` branch
3. Inspect the diff — only the edited field changed?
4. Non-schema fields preserved?
5. Open a PR, verify CI passes
6. Repeat for NL
7. Merge one PR to main, verify Vercel deploys correctly

### Step 9: Document (15 min)

Add TinaCMS section to project CLAUDE.md.

---

## Risks and mitigations

| Risk                                   | Impact                          | Mitigation                                          |
| -------------------------------------- | ------------------------------- | --------------------------------------------------- |
| Tina reformats JSON on save            | Noisy diffs, potential breakage | Branch-first workflow; inspect diffs before merging |
| Tina strips non-schema keys            | Work/ProjectDetail content lost | Test in Step 4; verify all keys survive save        |
| Next.js 16 / Turbopack incompatibility | Build fails                     | Test early in Step 4 before touching cloud/CI       |
| `tina/__generated__` missing in CI     | Typecheck/build fails           | Ensure `tinacms build` runs first everywhere        |
| TinaCloud free tier limit (2 users)    | Can't add editors               | Sufficient for Phase 1; evaluate in Phase 3         |

---

## Success criteria

Phase 1a is done when:

1. TinaCMS admin accessible at `hearthcodestudio.com/admin`
2. Both `en.json` and `nl.json` editable (Metadata, Hero, Approach, Person,
   Contact, Footer only)
3. Editing one locale does not affect the other
4. Non-schema keys (Work, ProjectDetail, etc.) survive saves unchanged
5. Saves produce clean Git diffs (only edited field changes)
6. Branch-first workflow working (saves go to `cms/content-edit`)
7. All existing tests (30 unit + E2E) still pass
8. CI pipeline updated and green
9. Setup documented in CLAUDE.md

---

## Phase roadmap (not in scope for 1a)

**Phase 1b — Project content:** Work section text, project card descriptions,
project detail paragraphs, project SEO. Goal: prove nested JSON works cleanly.

**Phase 1c — Client-readiness:** Editor instructions, field descriptions,
validation, preview/draft strategy, safer branch workflow.

**Phase 2 — DAP2D:** Same pattern for the dap2d site.

**Phase 3 — Productize:** Reusable template for all HearthCode client sites.
Self-hosting becomes relevant here (unlimited editors, white-label admin).

---

## Time estimate

| Step                             | Estimate  |
| -------------------------------- | --------- |
| Install + config + schema        | 1h        |
| Local testing + debugging        | 1.5h      |
| TinaCloud setup + env vars       | 0.5h      |
| CI pipeline update               | 0.5h      |
| Vercel deployment + verification | 0.5h      |
| Branch-first edit testing        | 0.5h      |
| Documentation                    | 0.5h      |
| Buffer for config weirdness      | 1.5h      |
| **Total**                        | **~6.5h** |

CMS integrations always have small annoying config issues. The buffer is real.
