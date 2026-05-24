/**
 * HearthCode ESLint config — Next.js 16 flat-config variant.
 *
 * Merges:
 *   - eslint-config-next/core-web-vitals (performance best practices)
 *   - eslint-config-next/typescript      (TS rules, bundles @typescript-eslint)
 *   - vault rules: import ordering + quality gates (no-console, eqeqeq, curly)
 *   - eslint-config-prettier at the end, so formatting is Prettier's job only.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // TODO: Re-enable after migrating to eslint-plugin-import-x (ESLint 9 compatible fork).
      // eslint-plugin-import crashes on ImportDeclaration nodes in flat config, producing
      // false-positive warnings on every file. import/order still works fine.
      // Migration: npm rm eslint-plugin-import && npm i -D eslint-plugin-import-x
      // Then change the import + plugin key from 'import' to 'import-x'.
      'import/no-duplicates': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'multi-line'],
    },
  },
  // Test files mock next/image with a plain <img> — suppress the "use next/image" warning
  // and the a11y alt-text check on mock elements.
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  prettierConfig,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
