import { readdirSync } from 'fs';
import { join } from 'path';

import { describe, expect, it } from 'bun:test';
import { rules as allRules } from 'eslint-plugin-import-x';

import { importRules } from '#import.rules';

const allRuleIds = Object.keys(allRules);

const customRuleIds = Object.keys(importRules);

const itEach = it.each(customRuleIds);

describe('ESLint Import Custom Rules', () => {
  const ruleTestsDir = join(__dirname, 'rules');
  const existingTestFiles = readdirSync(ruleTestsDir)
    .filter((file) => file.endsWith('.test.ts'))
    .map((file) => file.replace('.test.ts', ''));

  it('should not have redundant test files', () => {
    const redundantTestFiles = existingTestFiles.filter((file) => {
      const fileRuleId = `import-x/${file}`;

      return !customRuleIds.includes(fileRuleId);
    });

    expect(
      redundantTestFiles.length,
      `Redundant test files found: ${redundantTestFiles.join(', ')}`,
    ).toEqual(0);
  });

  itEach('should have a test file for rule %s', (ruleId) => {
    const ruleIdWithoutPrefix = ruleId.replace('import-x/', '');

    expect(
      existingTestFiles,
      `No test file found for rule ${ruleId}. Expected: ${ruleId}.test.ts`,
    ).toContain(ruleIdWithoutPrefix);
  });

  itEach('should ensure rule %s is valid', (customRuleId) => {
    const ruleIdWithoutPrefix = customRuleId.replace('import-x/', '');

    expect(allRuleIds, `No builtin rule found for ${customRuleId}`).toContain(
      ruleIdWithoutPrefix,
    );
  });
});
