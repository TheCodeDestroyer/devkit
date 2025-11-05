import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-undef-init';

describe(`${ruleId} rule`, () => {
  it('should FAIL when initializing variables to undefined', async () => {
    const code = `
      let x = undefined;
      const y = undefined;
      var z = undefined;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when not initializing variables to undefined', async () => {
    const code = `
      let x;
      const y = null;
      var z = 0;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
