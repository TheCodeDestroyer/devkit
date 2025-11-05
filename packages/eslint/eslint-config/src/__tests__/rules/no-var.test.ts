import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-var';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using var declarations', async () => {
    const code = `
      var foo = 'bar';
      var x = 1, y = 2;
      
      function test() {
        var z = 3;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(3);
  });

  it('should PASS when using let/const declarations', async () => {
    const code = `
      const foo = 'bar';
      let x = 1;
      let y = 2;
      
      function test() {
        const z = 3;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
