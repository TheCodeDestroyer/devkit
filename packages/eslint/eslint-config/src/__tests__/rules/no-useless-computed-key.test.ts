import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-useless-computed-key';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary computed property keys', async () => {
    const code = `
      const obj = {
        ['key']: 'value'
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using necessary computed property keys', async () => {
    const code = `
      const key = 'dynamic';
      const obj = {
        [key]: 'value'
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
