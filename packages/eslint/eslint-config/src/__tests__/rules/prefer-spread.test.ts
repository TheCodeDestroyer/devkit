import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-spread';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using apply()', async () => {
    const code = `
      function sum(a, b, c) {
        return a + b + c;
      }
      const numbers = [1, 2, 3];
      const result = sum.apply(null, numbers);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using spread operator', async () => {
    const code = `
      function sum(a, b, c) {
        return a + b + c;
      }
      const numbers = [1, 2, 3];
      const result = sum(...numbers);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
