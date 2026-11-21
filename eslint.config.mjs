import { nodePreset } from '@tcd-devkit/eslint-preset-node';

const config = [
  ...nodePreset,
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    rules: {
      'import-x/no-rename-default': ['off'],
    },
  },
  {
    files: ['**/tsup.config.ts', '**/tsup/**/*.ts'],
    rules: {
      '@typescript-eslint/require-await': ['off'],
    },
  },
  {
    // Why: a tool (tsup, vitest) loads its config file before any path alias
    // resolves, so a relative import is the only import that works there.
    // CONFIG_FILE_GLOBS exempts the repo root only. This monorepo keeps one
    // tool config at each package root, so those need the same exemption.
    files: [
      'packages/*/*.config.{js,cjs,mjs,ts}',
      'packages/*/*/*.config.{js,cjs,mjs,ts}',
    ],
    rules: {
      'no-restricted-imports': ['off'],
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-template-curly-in-string': ['off'],
    },
  },
  {
    files: ['**/fixtures/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['off'],
      // Fixtures import each other by relative path on purpose: the import
      // rule tests (no-cycle, no-deprecated) need real files that resolve.
      'no-restricted-imports': ['off'],
      '@typescript-eslint/no-unsafe-return': ['off'],
      '@typescript-eslint/no-unsafe-call': ['off'],
      'import-x/no-deprecated': ['off'],
      'import-x/no-cycle': ['off'],
    },
  },
];

export default config;
