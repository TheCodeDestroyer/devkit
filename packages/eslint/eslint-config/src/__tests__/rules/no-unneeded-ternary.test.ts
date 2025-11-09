import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-unneeded-ternary';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary ternary expressions', async () => {
    const code = `
      const x = condition ? true : false;
      const y = condition ? false : true;
      const z = condition ? condition : false;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when using necessary ternary expressions', async () => {
    const code = `
      const x = condition ? 1 : 2;
      const y = condition ? 'yes' : 'no';
      const z = condition ? a : b;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
