import eslintPlugin from '@eslint/js';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { baseRules } from '#base.rules';

export const baseConfig: Linter.Config[] = defineConfig([
  {
    name: '@tcd-devkit/eslint-config',
    extends: [eslintPlugin.configs.recommended],
    files: ['**/*.{js,jsx,mjs,cjs}'],
    rules: baseRules,
  },
]);

export default baseConfig;
