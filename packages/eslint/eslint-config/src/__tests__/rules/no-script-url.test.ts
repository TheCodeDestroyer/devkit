import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-script-url';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using javascript: URLs', async () => {
    const code = `
      const link = 'javascript:void(0)';
      const href = "javascript:alert('hello')";
      location.href = \`javascript:doSomething()\`;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(3);
  });

  it('should PASS when using regular URLs', async () => {
    const code = `
      const link = 'https://example.com';
      const href = '#';
      location.href = '/path/to/page';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
