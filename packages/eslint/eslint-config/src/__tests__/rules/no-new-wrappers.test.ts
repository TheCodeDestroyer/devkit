import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-new-wrappers';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using new with wrapper objects', async () => {
    const code = `
      const str = new String('hello');
      const num = new Number(42);
      const bool = new Boolean(true);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(3);
  });

  it('should PASS when using primitive values', async () => {
    const code = `
      const str = 'hello';
      const num = 42;
      const bool = true;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
