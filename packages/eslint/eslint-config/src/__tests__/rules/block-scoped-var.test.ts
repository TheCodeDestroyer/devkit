import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'block-scoped-var';

describe(`${ruleId} rule`, () => {
  it('should FAIL when var is used in block scope and referenced outside', async () => {
    const code = `
      if (true) {
        var x = 1;
      }
      console.log(x);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when var is not used in block scope', async () => {
    const code = `
      var x = 1;
      if (true) {
        let y = 2;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
