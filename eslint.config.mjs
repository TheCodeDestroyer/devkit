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
    // Why: tsup-config builds itself, so its tsup config cannot import its
    // own unbuilt package by name. A relative import is the only one that
    // works there. Every other package config imports by package name.
    files: ['packages/tsup-config/tsup.config.ts'],
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
