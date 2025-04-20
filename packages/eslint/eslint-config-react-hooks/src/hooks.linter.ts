import type { Linter } from 'eslint';
import { configs as hooksPluginConfigs } from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

import { hooksRules } from '#hooks.rules';

const hooksRecommended = hooksPluginConfigs['recommended-latest'];

export const reactHooksConfig: Linter.Config[] = defineConfig({
  name: '@tcd-devkit/eslint-config-react-hooks',
  extends: [hooksRecommended],
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  rules: hooksRules,
});

export default reactHooksConfig;
