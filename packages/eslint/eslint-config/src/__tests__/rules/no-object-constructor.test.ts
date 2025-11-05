import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-object-constructor';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using Object constructor', async () => {
    const code = `
      const obj = new Object();
      const obj2 = new Object({ key: 'value' });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using object literals', async () => {
    const code = `
      const obj = {};
      const obj2 = { key: 'value' };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
