import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'default-param-last';

describe(`${ruleId} rule`, () => {
  it('should FAIL when default parameter is not last', async () => {
    const code = `
      function foo(x = 1, y) {
        return x + y;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when default parameter is last', async () => {
    const code = `
      function foo(x, y = 1) {
        return x + y;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
