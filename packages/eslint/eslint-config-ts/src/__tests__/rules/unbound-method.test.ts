import { describe, expect, it } from 'vitest';

import { tsRules } from '#ts.rules';
import type { CustomRule } from '#ts.rules';

const ruleId: CustomRule = '@typescript-eslint/unbound-method';

describe(`${ruleId} rule`, () => {
  it('should have a disabled rule', () => {
    const ruleValue = tsRules[ruleId];

    console.log('tsRules:', tsRules);
    console.log('ruleId:', ruleId);
    console.log('ruleValue:', ruleValue);

    expect(ruleValue).toEqual(['off']);
  });
});
