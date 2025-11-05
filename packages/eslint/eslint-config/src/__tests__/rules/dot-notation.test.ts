import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'dot-notation';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using bracket notation for simple property access', async () => {
    const code = `
      const obj = { x: 1 };
      const value = obj['x'];
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using dot notation for simple property access', async () => {
    const code = `
      const obj = { x: 1 };
      const value = obj.x;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
