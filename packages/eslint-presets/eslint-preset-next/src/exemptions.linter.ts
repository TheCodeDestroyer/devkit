import type { Linter } from 'eslint';

import { CONFIG_FILE_GLOBS } from '@tcd-devkit/eslint-config/restrictions';

/**
 * Exemptions keyed on path conventions. Every app repo used to paste these
 * blocks by hand. The preset spreads them after its rules, so a repo block
 * that comes after the preset can still override them.
 */

const NAME_PREFIX = '@tcd-devkit/eslint-preset-next/exemptions';

/**
 * Test files. No `.mts` or `.cts`: the TypeScript parser setup does not cover
 * them. Use it as `files` in a repo block that targets tests.
 */
export const TEST_FILE_GLOBS = ['**/*.{test,spec}.{ts,tsx,js,jsx,mjs,cjs}'];

/**
 * Tool config files at the repo root spread third-party flat configs that
 * ship without types (`@convex-dev/eslint-plugin`, for example), so the value
 * lands as `any`. They also import a plugin's default export under the
 * plugin's own name.
 */
export const configFilesExemption: Linter.Config = {
  name: `${NAME_PREFIX}/config-files`,
  files: CONFIG_FILE_GLOBS,
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'import-x/no-rename-default': 'off',
  },
};

/**
 * CommonJS has no `import`. Some tools (Prettier, for example) resolve their
 * config through CommonJS, so a `.cjs` file must use `require`.
 */
export const commonJsExemption: Linter.Config = {
  name: `${NAME_PREFIX}/commonjs`,
  files: ['**/*.cjs'],
  rules: { '@typescript-eslint/no-require-imports': 'off' },
};

/**
 * `MetadataRoute.Manifest` follows the Web App Manifest spec, which is
 * snake_case (`short_name`, `start_url`, `background_color`).
 */
export const manifestExemption: Linter.Config = {
  name: `${NAME_PREFIX}/manifest`,
  files: ['**/app/manifest.{ts,js}'],
  rules: { camelcase: 'off' },
};

/** A test reads top to bottom as arrange, act, assert, so it runs long. */
export const testsExemption: Linter.Config = {
  name: `${NAME_PREFIX}/tests`,
  files: TEST_FILE_GLOBS,
  rules: { 'max-statements': 'off' },
};

export const nextExemptions: Linter.Config[] = [
  configFilesExemption,
  commonJsExemption,
  manifestExemption,
  testsExemption,
];
