import type { Linter } from 'eslint';
import { flatConfigs as importPluginConfigs } from 'eslint-plugin-import-x';
import { defineConfig } from 'eslint/config';

import { importRules } from '#import.rules';

const importRecommended = importPluginConfigs.recommended as Linter.Config;

export const importConfig = defineConfig({
  name: '@tcd-devkit/eslint-config-import',
  extends: [importRecommended],
  files: ['**/*.{js,jsx,mjs,cjs}'],
  rules: importRules,
});

export default importConfig;
