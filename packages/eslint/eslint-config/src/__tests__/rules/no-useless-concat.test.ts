import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-useless-concat';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary string concatenation', async () => {
    const code = `
      const a = "a" + "b";
      const b = 'hello' + 'world';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when using necessary string concatenation', async () => {
    const code = `
      const a = "a" + variable;
      const b = 'hello' + getWorld();
      const c = "hello world";
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
