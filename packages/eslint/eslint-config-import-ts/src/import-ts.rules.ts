import type { Linter } from 'eslint';
import type { rules as AllImportRules } from 'eslint-plugin-import-x';

type ImportRule = typeof AllImportRules;

type ConsistentTypeSpecifierStyleOptions =
  ImportRule['consistent-type-specifier-style']['defaultOptions'][0] & {};

export const importTsRules = {
  'import-x/consistent-type-specifier-style': [
    'error',
    'prefer-top-level' satisfies ConsistentTypeSpecifierStyleOptions,
  ],
} satisfies Linter.RulesRecord;

export type CustomRule = keyof typeof importTsRules;
