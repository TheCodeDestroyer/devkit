import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-new-func';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using Function constructor', async () => {
    const code = `
      const fn = new Function('x', 'return x + 1');
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using regular functions', async () => {
    const code = `
      function add(x) { return x + 1; }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
