import { nodePreset } from '@tcd-devkit/eslint-preset-node';

const config = [
  ...nodePreset,
  {
    files: ['**/tsup.config.ts', '**/tsup/**/*.ts'],
    rules: {
      '@typescript-eslint/require-await': ['off'],
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
      '@typescript-eslint/no-unsafe-return': ['off'],
      '@typescript-eslint/no-unsafe-call': ['off'],
      'import-x/no-rename-default': ['off'],
      'import-x/no-deprecated': ['off'],
      'import-x/no-cycle': ['off'],
    },
  },
];

export default config;
