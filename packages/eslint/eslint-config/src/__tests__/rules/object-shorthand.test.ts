import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'object-shorthand';

describe(`${ruleId} rule`, () => {
  it('should FAIL when not using object shorthand', async () => {
    const code = `
      const obj = {
        x: x,
        y: y,
        method: function() {}
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(3);
  });

  it('should PASS when using object shorthand', async () => {
    const code = `
      const obj = {
        x,
        y,
        method() {}
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
