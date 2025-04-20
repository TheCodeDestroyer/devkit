import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-constructor-return';

describe(`${ruleId} rule`, () => {
  it('should FAIL when constructor returns a value', async () => {
    const code = `
      class Test {
        constructor() {
          return { foo: 'bar' };
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when constructor does not return a value', async () => {
    const code = `
      class Test {
        constructor() {
          this.foo = 'bar';
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
