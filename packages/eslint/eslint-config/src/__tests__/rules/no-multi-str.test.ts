import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-multi-str';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using multiline string with backslash', async () => {
    const code = `
      const str = 'line 1 \\
        line 2';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using template literals for multiline strings', async () => {
    const code = `
      const str = \`line 1
        line 2\`;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
