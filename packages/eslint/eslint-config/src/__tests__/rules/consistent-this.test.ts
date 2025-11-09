import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'consistent-this';

describe(`${ruleId} rule`, () => {
  it('should FAIL when this is assigned to a different variable name', async () => {
    const code = `
      function MyClass() {
        const self = this;
        self.value = 1;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when this is used consistently', async () => {
    const code = `
      function MyClass() {
        this.value = 1;
        this.method = function() {
          return this.value;
        };
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
