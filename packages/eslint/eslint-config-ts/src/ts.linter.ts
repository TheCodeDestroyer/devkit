import type { Linter } from 'eslint';
import {
  config as defineConfig,
  configs as tsConfigs,
} from 'typescript-eslint';

import { tsRules } from '#ts.rules';

export const tsConfig = defineConfig({
  name: '@tcd-devkit/eslint-config-ts',
  extends: [tsConfigs.recommendedTypeChecked],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  rules: tsRules,
  /*
   * Convert from typescript-eslint's ConfigArray to standard ESLint Linter.Config[]
   * to maintain type consistency across all ESLint configurations in the codebase
   */
}) as unknown as Linter.Config[];

export default tsConfig;
