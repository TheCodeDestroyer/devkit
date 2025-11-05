import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-useless-assignment';

describe(`${ruleId} rule`, () => {
  it('should FAIL when assigning value that is never used', async () => {
    const code = `
      let x = 1;
      doSomething(x);
      x = 2; // This value is never used
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when assigned value is used before next assignment', async () => {
    const code = `
      let x = 1;
      doSomething(x);
      x = 2;
      doSomething(x);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
