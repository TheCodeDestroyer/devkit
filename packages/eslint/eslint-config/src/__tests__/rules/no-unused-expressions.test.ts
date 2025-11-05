import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-unused-expressions';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using standalone expression without side effects', async () => {
    const code = '1 + 2;';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using expression with side effects', async () => {
    const code = 'x = 1;';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using function call', async () => {
    const code = 'doSomething();';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
