import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-sequences';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using the comma operator', async () => {
    const code = `
      let x = 0;
      x = 1, x++;
      for (let i = 0, j = 0; i < 10; i++, j++) {}
      const y = (3, 4);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when not using the comma operator', async () => {
    const code = `
      let x = 0;
      x = 1;
      x++;
      for (let i = 0; i < 10; i++) {}
      const [a, b] = [3, 4];
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
