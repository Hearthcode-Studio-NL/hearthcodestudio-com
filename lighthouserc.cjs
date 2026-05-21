// Lighthouse CI — runs against the live production site.
// Reference: HearthCode-Vault/04-Standards/Testing-Policy.md § Performance.
//
// Why production URL, not localhost:
// `src/proxy.ts` sends `X-Robots-Tag: noindex` on any host that isn't
// hearthcodestudio.com (protects preview deploys from indexing). Running
// against localhost would always fail the SEO `is-crawlable` audit. The
// production URL sees the real response with no noindex header.

module.exports = {
  ci: {
    collect: {
      url: [
        'https://hearthcodestudio.com/nl',
        'https://hearthcodestudio.com/nl/projects/pum',
        'https://hearthcodestudio.com/nl/privacy',
        'https://hearthcodestudio.com/nl/toegankelijkheidsverklaring',
        'https://hearthcodestudio.com/en',
        'https://hearthcodestudio.com/en/projects/pum',
      ],
      // 5 runs so the median filters out cold-start outliers on shared
      // runners. With 3 runs a single bad start could tank the result;
      // with 5, two outliers still leave a stable middle value.
      numberOfRuns: 5,
    },

    assert: {
      // Use the median run for assertions — the middle value out of 5
      // runs. This absorbs the ±20-30% variance on GitHub Actions shared
      // runners (cold-start outliers can spike to 8s+ LCP) without
      // lowering the quality bar. The site scores 0.95+ in the real world;
      // the median of 5 CI runs should clear 0.9 comfortably.
      aggregationMethod: 'median-run',

      assertions: {
        // Matches the vault quality bar (Testing-Policy.md § Performance).
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:seo': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],

        // Per-metric warnings — these complement the category gate.
        // Kept as warnings because the median already handles outliers.
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
