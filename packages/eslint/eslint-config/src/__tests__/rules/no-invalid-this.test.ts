import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-invalid-this';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using this in non-method function', async () => {
    const code = `
      function test() {
        console.log(this);
      }
      test();
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using this in class method', async () => {
    const code = `
      class Test {
        method() {
          return this.value;
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
