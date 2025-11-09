import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-use-before-define';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using variable before declaration', async () => {
    const code = `
      foo();
      const foo = () => {};
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using variable after declaration', async () => {
    const code = `
      let x = 1;
      console.log(x);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
