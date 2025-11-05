import { readdirSync } from 'fs';
import { join } from 'path';

import eslintPlugin from '@eslint/js';
import { describe, expect, it } from 'bun:test';

import { baseRules } from '#base.rules';

const allRuleIds = Object.keys(eslintPlugin.configs.all.rules);
const customRuleIds = Object.keys(baseRules);

const itEach = it.each(customRuleIds);

describe('ESLint Custom Rules', () => {
  const ruleTestsDir = join(__dirname, 'rules');
  const existingTestFiles = readdirSync(ruleTestsDir)
    .filter((file) => file.endsWith('.test.ts'))
    .map((file) => file.replace('.test.ts', ''));

  it('should not have redundant test files', () => {
    const redundantTestFiles = existingTestFiles.filter(
      (fileRuleId) => !customRuleIds.includes(fileRuleId),
    );

    expect(
      redundantTestFiles.length,
      `Redundant test files found: ${redundantTestFiles.join(', ')}`,
    ).toEqual(0);
  });

  itEach('should have a test file for rule %s', (ruleId) => {
    expect(
      existingTestFiles,
      `No test file found for rule ${ruleId}. Expected: ${ruleId}.test.ts`,
    ).toContain(ruleId);
  });

  itEach('should ensure rule %s is valid', (customRuleId) => {
    expect(allRuleIds, `No builtin rule found for ${customRuleId}`).toContain(
      customRuleId,
    );
  });
});
