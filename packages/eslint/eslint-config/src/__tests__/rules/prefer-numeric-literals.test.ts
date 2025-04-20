import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-numeric-literals';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using parseInt with binary string', async () => {
    const code = `const num = parseInt("111110111", 2);`;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using binary literal', async () => {
    const code = `const num = 0b111110111;`;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
