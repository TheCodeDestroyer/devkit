import type { RulesConfig, UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const rules: Partial<RulesConfig> = {
  'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
  'footer-leading-blank': [RuleConfigSeverity.Error, 'always'],
  'header-max-length': [RuleConfigSeverity.Error, 'always', 120],
  'header-case': [RuleConfigSeverity.Disabled],
  'header-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
  'scope-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
  'subject-case': [RuleConfigSeverity.Error, 'always', ['sentence-case']],
  'subject-empty': [RuleConfigSeverity.Error, 'never'],
  'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
  'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
  'type-empty': [RuleConfigSeverity.Error, 'never'],
  'type-enum': [
    RuleConfigSeverity.Error,
    'always',
    [
      'build',
      'chore',
      'ci',
      'docs',
      'feat',
      'fix',
      'improvement',
      'perf',
      'refactor',
      'revert',
      'style',
      'test',
    ],
  ],
};

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules,
};

export default config;
