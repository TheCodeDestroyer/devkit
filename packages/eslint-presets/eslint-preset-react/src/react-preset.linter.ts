import type { Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import { baseConfig } from '@tcd-devkit/eslint-config';
import { a11yConfig } from '@tcd-devkit/eslint-config-a11y';
import { importTsConfig } from '@tcd-devkit/eslint-config-import-ts';
import { reactConfig } from '@tcd-devkit/eslint-config-react';
import { reactHooksConfig } from '@tcd-devkit/eslint-config-react-hooks';
import { tsConfig } from '@tcd-devkit/eslint-config-ts';

const ignoresConfig = globalIgnores(
  ['**/dist/**', '**/node_modules/**', '**/build/**'],
  '@tcd-devkit/eslint-config/ignores',
);

export const reactPreset: Linter.Config[] = defineConfig(
  {
    name: '@tcd-devkit/eslint-preset-react',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    extends: [
      baseConfig,
      tsConfig,
      reactConfig,
      reactHooksConfig,
      a11yConfig,
      importTsConfig,
    ],
  },
  prettierConfig,
  ignoresConfig,
);

export default reactPreset;
