import type { Linter } from 'eslint';
import { flatConfigs as importPluginConfigs } from 'eslint-plugin-import-x';
import { defineConfig } from 'eslint/config';

import { importRules } from '@tcd-devkit/eslint-config-import/rule-overrides';

import { importTsRules } from '#import-ts.rules';

const importTypescript = importPluginConfigs.typescript as Linter.Config;

export const importTsConfig: Linter.Config[] = defineConfig({
  name: '@tcd-devkit/eslint-config-import-ts',
  extends: [importTypescript],
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  rules: { ...importRules, ...importTsRules },
});

export default importTsConfig;
