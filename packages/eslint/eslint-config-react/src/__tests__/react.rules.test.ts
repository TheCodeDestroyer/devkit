import { readdirSync } from 'fs';
import { join } from 'path';

import { describe, expect, it } from 'bun:test';
import eslintPlugin from 'eslint-plugin-react';

import { reactRules } from '#react.rules';

const allRuleIds = Object.keys(eslintPlugin.rules);
const customRuleIds = Object.keys(reactRules);

const itEach = it.each(customRuleIds);

describe('ESLint React Custom Rules', () => {
  const ruleTestsDir = join(__dirname, 'rules');
  const existingTestFiles = readdirSync(ruleTestsDir)
    .filter((file) => file.endsWith('.test.ts'))
    .map((file) => file.replace('.test.ts', ''));

  it('should not have redundant test files', () => {
    const redundantTestFiles = existingTestFiles.filter((file) => {
      const fileRuleId = `react/${file}`;

      return !customRuleIds.includes(fileRuleId);
    });

    expect(
      redundantTestFiles.length,
      `Redundant test files found: ${redundantTestFiles.join(', ')}`,
    ).toEqual(0);
  });

  itEach('should have a test file for rule %s', (ruleId) => {
    const ruleIdWithoutPrefix = ruleId.replace('react/', '');

    expect(
      existingTestFiles,
      `No test file found for rule ${ruleId}. Expected: ${ruleId}.test.ts`,
    ).toContain(ruleIdWithoutPrefix);
  });

  itEach('should ensure rule %s is valid', (customRuleId) => {
    const ruleIdWithoutPrefix = customRuleId.replace('react/', '');

    expect(allRuleIds, `No builtin rule found for ${customRuleId}`).toContain(
      ruleIdWithoutPrefix,
    );
  });
});
