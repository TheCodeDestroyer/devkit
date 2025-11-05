import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'default-case';

describe(`${ruleId} rule`, () => {
  it('should FAIL when switch statement has no default case', async () => {
    const code = `
      function example(value) {
        switch (value) {
          case 1:
            return 'one';
          case 2:
            return 'two';
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when switch statement includes default case', async () => {
    const code = `
      function example(value) {
        switch (value) {
          case 1:
            return 'one';
          case 2:
            return 'two';
          default:
            return 'unknown';
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
