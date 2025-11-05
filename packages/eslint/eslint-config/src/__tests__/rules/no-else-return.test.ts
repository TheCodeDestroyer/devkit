import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-else-return';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using else after return', async () => {
    const code = `
      function test(x) {
        if (x > 0) {
          return true;
        } else {
          return false;
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when not using else after return', async () => {
    const code = `
      function test(x) {
        if (x > 0) {
          return true;
        }
        return false;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
