import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-iterator';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using __iterator__ property', async () => {
    const code = `
      const obj = {};
      obj.__iterator__ = function() {};
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using standard iteration', async () => {
    const code = `
      const obj = {
        *[Symbol.iterator]() {
          yield 1;
          yield 2;
        }
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
