import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-negated-condition';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using negated condition with else branch', async () => {
    const code = `
      if (!isValid) {
        doSomething();
      } else {
        doSomethingElse();
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using negated condition without else branch', async () => {
    const code = `
      if (!isValid) {
        doSomething();
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
