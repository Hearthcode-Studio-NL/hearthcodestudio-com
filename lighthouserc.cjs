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

        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'interaction-to-next-paint': ['warn', { maxNumericValue: 200 }],

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
