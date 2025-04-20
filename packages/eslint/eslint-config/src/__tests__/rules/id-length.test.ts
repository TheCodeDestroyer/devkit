import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'id-length';

describe(`${ruleId} rule`, () => {
  it('should FAIL when identifier is too short', async () => {
    const code = `
      const x = 1;
      const y = 2;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(2);
  });

  it('should PASS when identifiers are long enough', async () => {
    const code = `
      const value = 1;
      const count = 2;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
