import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-param-reassign';

describe(`${ruleId} rule`, () => {
  it('should FAIL when reassigning function parameters', async () => {
    const code = `
      function example(param) {
        param = 42;
        param += 1;
        return param;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when not reassigning function parameters', async () => {
    const code = `
      function example(param) {
        const result = param + 1;
        return result;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
