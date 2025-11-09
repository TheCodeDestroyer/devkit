import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-proto';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using __proto__ property', async () => {
    const code = `
      const obj = {};
      obj.__proto__ = { key: 'value' };
      const proto = obj.__proto__;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when using Object methods', async () => {
    const code = `
      const obj = {};
      Object.setPrototypeOf(obj, { key: 'value' });
      const proto = Object.getPrototypeOf(obj);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
