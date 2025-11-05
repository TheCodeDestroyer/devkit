import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'require-atomic-updates';

describe(`${ruleId} rule`, () => {
  it('should FAIL when updating same variable across multiple awaits', async () => {
    const code = `
      let result;
      async function test() {
        result = await fetchData();
        result = await processData(result); // Should be a new variable
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when each await uses its own variable', async () => {
    const code = `
      let result;
      async function test() {
        const data = await fetchData();
        const processed = await processData(data);
        result = processed;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
