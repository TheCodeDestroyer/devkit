import type { Linter } from 'eslint';
import type { configs } from 'eslint-plugin-react';

type RuleKey = keyof typeof configs.all.rules;

type RuleKeyWithPrefix = `react/${RuleKey}`;

export const reactRules = {
  'react/button-has-type': 'error',
  'react/destructuring-assignment': 'error',
  'react/function-component-definition': [
    'error',
    { namedComponents: 'arrow-function' },
  ],
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'react/jsx-fragments': ['error', 'element'],

  'react/jsx-max-depth': ['error', { max: 7 }],

  'react/jsx-no-constructed-context-values': 'error',
  'react/jsx-no-script-url': 'error',
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-pascal-case': 'error',
  'react/no-array-index-key': 'error',
  'react/no-danger': 'warn',
  'react/no-multi-comp': 'error',
  'react/no-namespace': 'error',
  'react/no-unstable-nested-components': 'error',
  'react/style-prop-object': 'error',
  'react/void-dom-elements-no-children': ['error'],
} satisfies Partial<Record<RuleKeyWithPrefix, Linter.RuleEntry>>;

export type CustomRule = keyof typeof reactRules;
