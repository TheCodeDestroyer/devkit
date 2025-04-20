import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';

const ruleId = 'prefer-regex-literals';

describe('prefer-regex-literals rule', () => {
  it('should FAIL when using RegExp constructor with string literal', async () => {
    const code = `
      const pattern = new RegExp("abc");
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using regex literal', async () => {
    const code = `
      const pattern = /abc/;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
