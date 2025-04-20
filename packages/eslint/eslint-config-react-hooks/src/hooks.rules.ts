import type { Linter } from 'eslint';
import type { rules } from 'eslint-plugin-react-hooks';

type RuleKey = keyof typeof rules;

type RuleKeyWithPrefix = `react-hooks/${RuleKey}`;

export const hooksRules = {
  'react-hooks/exhaustive-deps': 'error',
} satisfies Partial<Record<RuleKeyWithPrefix, Linter.RuleSeverity>>;

export type CustomRule = keyof typeof hooksRules;
