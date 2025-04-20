import type { Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { reactRules } from '#react.rules';

const reactRecommended = reactPlugin.configs.flat.recommended as Linter.Config;
const jsxRuntime = reactPlugin.configs.flat['jsx-runtime'] as Linter.Config;

export const reactConfig: Linter.Config[] = defineConfig({
  name: '@tcd-devkit/eslint-config-react',
  extends: [reactRecommended, jsxRuntime],
  languageOptions: {
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  rules: reactRules,
});

export default reactConfig;
