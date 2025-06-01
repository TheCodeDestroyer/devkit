import type { Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import { baseConfig } from '@tcd-devkit/eslint-config';
import { importTsConfig } from '@tcd-devkit/eslint-config-import-ts';
import { tsConfig } from '@tcd-devkit/eslint-config-ts';

const ignoresConfig = globalIgnores(
  ['**/dist/**', '**/node_modules/**', '**/build/**'],
  '@tcd-devkit/eslint-config/ignores',
);

export const nodePreset: Linter.Config[] = defineConfig([
  {
    name: '@tcd-devkit/eslint-preset-node',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    extends: [baseConfig, tsConfig, importTsConfig],
  },
  prettierConfig,
  ignoresConfig,
]);

export default nodePreset;
