import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-throw-literal';

describe(`${ruleId} rule`, () => {
  it('should FAIL when throwing literals', async () => {
    const code = `
      throw 'error';
      throw 42;
      throw null;
      throw { message: 'error' };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(4);
  });

  it('should PASS when throwing Error objects', async () => {
    const code = `
      throw new Error('error');
      throw new TypeError('type error');
      throw new CustomError('custom error');
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
