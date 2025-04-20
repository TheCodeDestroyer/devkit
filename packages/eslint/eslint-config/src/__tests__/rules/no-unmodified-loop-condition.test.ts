import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-unmodified-loop-condition';

describe(`${ruleId} rule`, () => {
  it('should FAIL when loop condition variable is not modified', async () => {
    const code = `
      let x = 0;
      while (x < 10) {
        console.log(x);
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when loop condition variable is modified', async () => {
    const code = `
      let x = 0;
      while (x < 10) {
        console.log(x);
        x++;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using for loop with increment', async () => {
    const code = `
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
