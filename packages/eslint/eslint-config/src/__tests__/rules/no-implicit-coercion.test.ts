import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-implicit-coercion';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using implicit type coercion', async () => {
    const code = `
      const num = +'42';
      const bool = !!value;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(2);
  });

  it('should PASS when using explicit type conversion', async () => {
    const code = `
      const num = Number('42');
      const bool = Boolean(value);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
