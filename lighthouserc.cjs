// Lighthouse CI — runs against the production build served by `next start`.
// Reference: HearthCode-Vault/04-Standards/Testing-Policy.md § Performance.

module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/privacy',
        'http://localhost:3000/toegankelijkheidsverklaring',
      ],
      // `next start` requires a prior `next build` — the CI step runs build
      // before `lhci autorun`. Locally, run `npm run build && npx @lhci/cli autorun`.
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready in',
      numberOfRuns: 3,
    },

    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        // SEO threshold lowered to 0.6 while pre-DNS-cutover. `src/middleware.ts`
        // emits `X-Robots-Tag: noindex, nofollow` on every host that is not
        // `hearthcodestudio.com`, including `localhost` (which is what CI runs
        // against). That's the right product behaviour — it prevents the
        // *.vercel.app preview from competing with the canonical domain — but
        // it makes the Lighthouse `is-crawlable` audit fail, dropping the SEO
        // category score to ~0.63. See `docs/adr/0003-testing-waiver-lighthouse-seo.md`.
        // Ratchet back to 1.0 once DNS cuts over to hearthcodestudio.com.
        'categories:seo': ['error', { minScore: 0.6 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],

        // LCP / CLS / INP per-metric thresholds are kept as warnings, not
        // hard errors. The binding gate is `categories:performance >= 0.9`
        // above (the vault Quality Bar — "Lighthouse Perf >= 90 mobile").
        // GitHub Actions Lighthouse runs have ±20-30% run-to-run variance
        // (cold-start outliers can hit 8s+); a hard per-metric LCP error
        // produced false failures even when the overall score was fine.
        // Tighten back to `error` if a paid CI runner with stable perf
        // lands, or move Lighthouse to a Vercel preview-URL run instead
        // of a local-build run on the GH runner.
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],

        // INP needs a real user interaction during the trace to produce a
        // value; Lighthouse CI runs against static pages with no input, so
        // the metric is always null and the assertion noise is unhelpful.
        // Revisit if the site grows interactive surfaces.
        'interaction-to-next-paint': 'off',

        'uses-http2': 'off',
        'unused-javascript': 'off',
        'third-party-summary': 'off',
      },
    },

    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
