import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-shadow';

describe(`${ruleId} rule`, () => {
  it('should FAIL when shadowing variables', async () => {
    const code = `
      const x = 1;
      function example() {
        const x = 2;
        if (true) {
          let x = 3;
        }
      }
      const y = 1;
      {
        const y = 2;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(3);
  });

  it('should PASS when not shadowing variables', async () => {
    const code = `
      const x = 1;
      function example() {
        const y = 2;
        if (true) {
          let z = 3;
        }
      }
      {
        const w = 4;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
