import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-lonely-if';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using a lonely if in an else block', async () => {
    const code = `
      if (x > 0) {
        doSomething();
      } else {
        if (x < 0) {
          doSomethingElse();
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using else if', async () => {
    const code = `
      if (x > 0) {
        doSomething();
      } else if (x < 0) {
        doSomethingElse();
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
