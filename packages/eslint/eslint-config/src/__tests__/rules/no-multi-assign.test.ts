import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-multi-assign';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using multiple assignments in a single statement', async () => {
    const code = `
      let a = b = c = 5;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages.length).toBeGreaterThan(0);
  });

  it('should PASS when using separate assignment statements', async () => {
    const code = `
      let a = 5;
      let b = 5;
      let c = 5;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
