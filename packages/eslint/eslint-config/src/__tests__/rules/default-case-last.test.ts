import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'default-case-last';

describe(`${ruleId} rule`, () => {
  it('should FAIL when default case is not the last case', async () => {
    const code = `
      switch (foo) {
        default:
          bar();
          break;
        case "a":
          baz();
          break;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when default case is the last case', async () => {
    const code = `
      switch (foo) {
        case "a":
          baz();
          break;
        default:
          bar();
          break;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
