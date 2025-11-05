import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'require-unicode-regexp';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using non-unicode regex', async () => {
    const code = `
      const regex = /[A-Z]/;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using unicode regex', async () => {
    const code = `
      const regex = /[A-Z]/u;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
