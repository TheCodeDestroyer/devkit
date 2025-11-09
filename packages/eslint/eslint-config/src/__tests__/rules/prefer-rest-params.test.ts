import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-rest-params';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using arguments object', async () => {
    const code = `
      function sum() {
        return Array.from(arguments).reduce((a, b) => a + b, 0);
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using rest parameters', async () => {
    const code = `
      function sum(...numbers) {
        return numbers.reduce((a, b) => a + b, 0);
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
