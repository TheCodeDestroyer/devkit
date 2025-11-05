import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-promise-reject-errors';

describe(`${ruleId} rule`, () => {
  it('should FAIL when rejecting with non-Error values', async () => {
    const code = `
      new Promise((resolve, reject) => {
        reject('error message');
      });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when rejecting with Error objects', async () => {
    const code = `
      new Promise((resolve, reject) => {
        reject(new Error('error message'));
      });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
