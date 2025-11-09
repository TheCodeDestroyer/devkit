import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-arrow-callback';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using function expressions as callbacks', async () => {
    const code = `
      [1, 2, 3].map(function(x) { return x * 2; });
      [1, 2, 3].filter(function(x) { return x > 1; });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when using arrow functions as callbacks', async () => {
    const code = `
      [1, 2, 3].map(x => x * 2);
      [1, 2, 3].filter(x => x > 1);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
