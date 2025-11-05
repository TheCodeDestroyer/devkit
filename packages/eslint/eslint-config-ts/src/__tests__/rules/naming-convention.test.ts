import { describe, expect, it } from 'bun:test';

import { tsRules } from '#ts.rules';
import type { CustomRule } from '#ts.rules';

const ruleId: CustomRule = '@typescript-eslint/naming-convention';

describe(`${ruleId} rule`, () => {
  it('should have a disabled rule', () => {
    const ruleValue = tsRules[ruleId];

    expect(ruleValue).toEqual(['off']);
  });
});
