import type { Linter } from 'eslint';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const a11yRecommended = a11yPlugin.flatConfigs.recommended as Linter.Config;

export const a11yConfig = defineConfig({
  name: '@tcd-devkit/eslint-config-a11y',
  languageOptions: {
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  extends: [a11yRecommended],
});

export default a11yConfig;
