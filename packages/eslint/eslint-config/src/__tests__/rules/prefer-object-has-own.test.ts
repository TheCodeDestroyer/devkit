import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-object-has-own';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using Object.prototype.hasOwnProperty', async () => {
    const code = `
      const obj = { a: 1 };
      if (Object.prototype.hasOwnProperty.call(obj, 'a')) {
        console.log('has property');
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using Object.hasOwn', async () => {
    const code = `
      const obj = { a: 1 };
      if (Object.hasOwn(obj, 'a')) {
        console.log('has property');
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
