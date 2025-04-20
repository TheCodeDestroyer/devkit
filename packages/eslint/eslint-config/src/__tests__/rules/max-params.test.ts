import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'max-params';

describe(`${ruleId} rule`, () => {
  it('should FAIL when function has too many parameters', async () => {
    const code = `
      function foo(a, b, c, d, e) {
        return a + b + c + d + e;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when function has acceptable number of parameters', async () => {
    const code = `
      function foo(a, b, c, d) {
        return a + b + c + d;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
