import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-implied-eval';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using implied eval', async () => {
    const code = `
      /* global setTimeout, setInterval */
      setTimeout("alert('Hi!')", 100);
      setInterval("console.log('test')", 100);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(2);
  });

  it('should PASS when using functions', async () => {
    const code = `
      /* global setTimeout, setInterval */
      setTimeout(() => alert('Hi!'), 100);
      setInterval(function() { console.log('test'); }, 100);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
