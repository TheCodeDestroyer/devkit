import type { Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

import { baseConfig } from '@tcd-devkit/eslint-config';
import { a11yConfig } from '@tcd-devkit/eslint-config-a11y';
import { importTsConfig } from '@tcd-devkit/eslint-config-import-ts';
import { nextConfig } from '@tcd-devkit/eslint-config-next';
import { reactConfig } from '@tcd-devkit/eslint-config-react';
import { reactHooksConfig } from '@tcd-devkit/eslint-config-react-hooks';
import { tsConfig } from '@tcd-devkit/eslint-config-ts';

const ignoresConfig = globalIgnores(
  ['**/dist/**', '**/node_modules/**', '**/build/**'],
  '@tcd-devkit/eslint-config/ignores',
);

export const nextPreset: Linter.Config[] = defineConfig(
  {
    name: '@tcd-devkit/eslint-preset-next',
    extends: [
      baseConfig,
      tsConfig,
      nextConfig,
      reactConfig,
      reactHooksConfig,
      a11yConfig,
      importTsConfig,
    ],
  },
  prettierConfig,
  ignoresConfig,
);

export default nextPreset;
