import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-return-assign';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using assignments in return statements', async () => {
    const code = `
      let x;
      function example() {
        return x = 42;
      }
      function another() {
        return y += 1;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when not using assignments in return statements', async () => {
    const code = `
      let x = 0;
      function example() {
        x = 42;
        return x;
      }
      function another() {
        const y = x + 1;
        return y;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
