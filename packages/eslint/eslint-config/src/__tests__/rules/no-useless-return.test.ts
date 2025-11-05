import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-useless-return';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary return', async () => {
    const code = `
      function foo() {
        doSomething();
        return;
      }

      function bar() {
        if (condition) {
          doSomething();
          return;
        }
        return;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(3);
  });

  it('should PASS when using necessary return', async () => {
    const code = `
      function foo() {
        if (condition) {
          doSomething();
          return;
        }
        doSomethingElse();
      }

      function bar() {
        return value;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
