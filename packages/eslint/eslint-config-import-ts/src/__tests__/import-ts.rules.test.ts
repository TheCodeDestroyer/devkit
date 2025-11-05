import { describe, expect, it } from 'bun:test';
import { rules as allRules } from 'eslint-plugin-import-x';

import { importTsRules } from '#import-ts.rules';

const allRuleIds = Object.keys(allRules);

const customRuleIds = Object.keys(importTsRules);

const itEach = it.each(customRuleIds);

describe('ESLint Import TS Custom Rules', () => {
  itEach('should ensure rule %s is valid', (customRuleId) => {
    const ruleIdWithoutPrefix = customRuleId.replace('import-x/', '');

    expect(allRuleIds, `No builtin rule found for ${customRuleId}`).toContain(
      ruleIdWithoutPrefix,
    );
  });
});
