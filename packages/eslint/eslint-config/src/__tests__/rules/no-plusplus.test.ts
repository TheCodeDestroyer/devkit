import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-plusplus';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using increment/decrement operators', async () => {
    const code = `
      let x = 0;
      x++;
      ++x;
      x--;
      --x;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(4);
  });

  it('should PASS when using assignment operators', async () => {
    const code = `
      let x = 0;
      x += 1;
      x -= 1;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
