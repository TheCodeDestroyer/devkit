import { fixupConfigRules } from '@eslint/compat';
import type { Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { reactRules } from '#react.rules';

/*
 * eslint-plugin-react 7.x calls context APIs that ESLint 10 removed.
 * fixupConfigRules wraps the plugin rules so they run on ESLint 10.
 * Remove when eslint-plugin-react ships ESLint 10 support (devkit-91a.7).
 */
const reactPluginConfigs = fixupConfigRules([
  reactPlugin.configs.flat.recommended as Linter.Config,
  reactPlugin.configs.flat['jsx-runtime'] as Linter.Config,
]) as Linter.Config[];

export const reactConfig: Linter.Config[] = defineConfig({
  name: '@tcd-devkit/eslint-config-react',
  extends: reactPluginConfigs,
  languageOptions: {
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  rules: reactRules,
});

export default reactConfig;
