import { describe, expect, it } from 'vitest';

import { tsRules } from '#ts.rules';
import type { CustomRule } from '#ts.rules';

const ruleId: CustomRule = '@typescript-eslint/unbound-method';

describe(`${ruleId} rule`, () => {
  it('should have a disabled rule', () => {
    const ruleValue = tsRules[ruleId];

    expect(ruleValue).toEqual(['off']);
  });
});
