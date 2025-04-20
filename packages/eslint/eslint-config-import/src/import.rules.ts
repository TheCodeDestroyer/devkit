import type { Linter } from 'eslint';
import type { rules as AllImportRules } from 'eslint-plugin-import-x';

type ImportRule = typeof AllImportRules;

type NoCycleOptions = ImportRule['no-cycle']['defaultOptions'][0];

export const importRules = {
  'import-x/no-deprecated': ['error'],
  'import-x/no-rename-default': ['error'],
  'import-x/no-cycle': ['error', { maxDepth: 1 } satisfies NoCycleOptions],
} satisfies Linter.RulesRecord;

export type CustomRule = keyof typeof importRules;
