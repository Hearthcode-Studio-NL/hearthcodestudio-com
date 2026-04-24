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
        'categories:seo': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],

        // LCP budget: 3000ms (CWV "needs improvement" ceiling). The overall
        // performance score (>=0.9 above) is still the binding check; this
        // per-metric gate protects against major regressions. Tighten back to
        // 2500ms when fonts move to next/font/local with automatic preload.
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],

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
