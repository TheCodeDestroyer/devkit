import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'array-callback-return';

describe(`${ruleId} rule`, () => {
  it('should FAIL when map callback does not return a value', async () => {
    const code = `
      [1, 2].map(item => {
        console.log(item);
      });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when map callback returns a value', async () => {
    const code = `
      [1, 2].map(item => {
        return item * 2;
      });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when forEach callback does not return a value', async () => {
    const code = `
      [1, 2].forEach(item => {
        console.log(item);
      });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
