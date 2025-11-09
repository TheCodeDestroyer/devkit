import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-named-capture-group';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnamed capture groups', async () => {
    const code = `
      const regex = /(\\d{4})-(\\d{2})-(\\d{2})/;
      const match = regex.exec('2023-01-01');
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(3);
  });

  it('should PASS when using named capture groups', async () => {
    const code = `
      const regex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
      const match = regex.exec('2023-01-01');
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
