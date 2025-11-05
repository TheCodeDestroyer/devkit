import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-loop-func';

describe(`${ruleId} rule`, () => {
  it('should FAIL when creating a function that references loop variables', async () => {
    const code = `
      var funcs = [];
      for (var i = 0; i < 10; i++) {
        funcs[i] = function() {
          return i;
        };
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when function does not reference loop variables', async () => {
    const code = `
      var funcs = [];
      for (var i = 0; i < 10; i++) {
        funcs[i] = function(x) {
          return x;
        };
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
