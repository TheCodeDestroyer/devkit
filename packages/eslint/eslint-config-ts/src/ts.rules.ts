import type { Linter } from 'eslint';

export const tsRules = {
  'default-param-last': ['off'],
  'no-invalid-this': ['off'],
  'no-loop-func': ['off'],
  'no-use-before-define': ['off'],
  'no-duplicate-imports': ['off'],
  '@typescript-eslint/consistent-type-imports': ['error'],
  '@typescript-eslint/default-param-last': ['error'],
  '@typescript-eslint/naming-convention': ['off'],
  '@typescript-eslint/no-loop-func': ['error'],
  '@typescript-eslint/no-use-before-define': ['error'],
  '@typescript-eslint/return-await': ['error'],
  '@typescript-eslint/switch-exhaustiveness-check': [
    'error',
    {
      allowDefaultCaseForExhaustiveSwitch: true,
      considerDefaultExhaustiveForUnions: true,
    },
  ],
} satisfies Linter.RulesRecord;

export type CustomRule = keyof typeof tsRules;
