import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'max-statements';

describe(`${ruleId} rule`, () => {
  it('should PASS when function has fewer than 25 statements', async () => {
    const code = `
      function test() {
        let count = 0;
        count += 1;
        count += 2;
        count += 3;
        count += 4;
        count += 5;
        return count;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should FAIL when function has more than 25 statements', async () => {
    const code = `
      function test() {
        let count = 0;
        ${Array(30).fill('count += 1;').join('\n        ')}
        return count;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });
});
