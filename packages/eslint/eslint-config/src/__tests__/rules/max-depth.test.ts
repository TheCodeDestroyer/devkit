import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'max-depth';

describe(`${ruleId} rule`, () => {
  it('should FAIL when code nesting is too deep', async () => {
    const code = `
      function foo() {
        if (true) {
          if (true) {
            if (true) {
              if (true) {
                if (true) {
                  return 1;
                }
              }
            }
          }
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when code nesting is within limits', async () => {
    const code = `
      function foo() {
        if (true) {
          if (true) {
            if (true) {
              if (true) {
                return 1;
              }
            }
          }
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
