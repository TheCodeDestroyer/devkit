import { readdirSync } from 'fs';
import { join } from 'path';

import { describe, expect, it } from 'bun:test';
import { configs as tsConfigs } from 'typescript-eslint';

import { tsRules } from '#ts.rules';

const allRuleIds = new Set(
  tsConfigs.all.flatMap((config) => Object.keys(config?.rules || {})),
);
const customRuleIds = Object.keys(tsRules);
const customTypeScriptRuleIds = customRuleIds.filter((ruleId) =>
  ruleId.startsWith('@typescript-eslint/'),
);

const itEach = it.each(customTypeScriptRuleIds);

describe('ESLint TS Custom Rules', () => {
  const ruleTestsDir = join(__dirname, 'rules');
  const existingTestFiles = readdirSync(ruleTestsDir)
    .filter((file) => file.endsWith('.test.ts'))
    .map((file) => file.replace('.test.ts', ''));

  it('should not have redundant test files', () => {
    const redundantTestFiles = existingTestFiles.filter((file) => {
      const fileRuleId = `@typescript-eslint/${file}`;

      return !customRuleIds.includes(fileRuleId);
    });

    expect(
      redundantTestFiles.length,
      `Redundant test files found: ${redundantTestFiles.join(', ')}`,
    ).toEqual(0);
  });

  itEach('should have a test file for rule %s', (ruleId) => {
    const ruleIdWithoutPrefix = ruleId.replace('@typescript-eslint/', '');

    expect(
      existingTestFiles,
      `No test file found for rule ${ruleId}. Expected: ${ruleId}.test.ts`,
    ).toContain(ruleIdWithoutPrefix);
  });

  itEach('should ensure rule %s is valid', (customRuleId) => {
    expect(allRuleIds, `No builtin rule found for ${customRuleId}`).toContain(
      customRuleId,
    );
  });
});
