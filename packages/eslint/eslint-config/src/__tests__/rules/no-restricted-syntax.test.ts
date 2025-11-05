import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-restricted-syntax';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using FunctionExpression', async () => {
    const code = `
      const fn = function() {
        return 'test';
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain('Use arrow function instead');
  });

  it('should PASS when using arrow functions', async () => {
    const code = `
      const fn = () => {
        return 'test';
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
