import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-nested-ternary';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using nested ternary expressions', async () => {
    const code = `
      const result = isValid ? (isActive ? 'active' : 'inactive') : 'invalid';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using single ternary expression', async () => {
    const code = `
      const result = isValid ? 'valid' : 'invalid';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
