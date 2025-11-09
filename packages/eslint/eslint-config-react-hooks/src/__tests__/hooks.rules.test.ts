import { readdirSync } from 'fs';
import { join } from 'path';

import { rules as eslintPluginRules } from 'eslint-plugin-react-hooks';
import { describe, expect, it } from 'vitest';

import { hooksRules } from '#hooks.rules';

const allRuleIds = Object.keys(eslintPluginRules);
const customRuleIds = Object.keys(hooksRules);

const itEach = it.each(customRuleIds);

describe('ESLint React Hooks Custom Rules', () => {
  const ruleTestsDir = join(__dirname, 'rules');
  const existingTestFiles = readdirSync(ruleTestsDir)
    .filter((file) => file.endsWith('.test.ts'))
    .map((file) => file.replace('.test.ts', ''));

  it('should not have redundant test files', () => {
    const redundantTestFiles = existingTestFiles.filter((file) => {
      const fileRuleId = `react-hooks/${file}`;

      return !customRuleIds.includes(fileRuleId);
    });

    expect(
      redundantTestFiles.length,
      `Redundant test files found: ${redundantTestFiles.join(', ')}`,
    ).toEqual(0);
  });

  itEach('should have a test file for rule %s', (ruleId) => {
    const ruleIdWithoutPrefix = ruleId.replace('react-hooks/', '');

    expect(
      existingTestFiles,
      `No test file found for rule ${ruleId}. Expected: ${ruleId}.test.ts`,
    ).toContain(ruleIdWithoutPrefix);
  });

  itEach('should ensure rule %s is valid', (customRuleId) => {
    const ruleIdWithoutPrefix = customRuleId.replace('react-hooks/', '');

    expect(allRuleIds, `No builtin rule found for ${customRuleId}`).toContain(
      ruleIdWithoutPrefix,
    );
  });
});
