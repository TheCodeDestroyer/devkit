import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'class-methods-use-this';

describe(`${ruleId} rule`, () => {
  it('should FAIL when class method does not use this', async () => {
    const code = `
      class MyClass {
        method() {
          return 'hello';
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when class method uses this', async () => {
    const code = `
      class MyClass {
        private value = 'hello';
        
        method() {
          return this.value;
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
