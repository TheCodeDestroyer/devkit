import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'max-nested-callbacks';

describe(`${ruleId} rule`, () => {
  it('should PASS when callback nesting is within limit', async () => {
    const code = `
      function test() {
        setTimeout(() => {
          setTimeout(() => {
            setTimeout(() => {
              console.log('three levels');
            });
          });
        });
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should FAIL when callback nesting exceeds limit', async () => {
    const code = `
      function test() {
        setTimeout(() => {
          setTimeout(() => {
            setTimeout(() => {
              setTimeout(() => {
                console.log('four levels');
              });
            });
          });
        });
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });
});
