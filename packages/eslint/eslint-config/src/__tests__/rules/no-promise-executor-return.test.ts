import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-promise-executor-return';

describe(`${ruleId} rule`, () => {
  it('should FAIL when returning from promise executor', async () => {
    const code = `
      new Promise((resolve) => {
        return resolve(1);
      });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when not returning from promise executor', async () => {
    const code = `
      new Promise((resolve) => {
        resolve(1);
      });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
