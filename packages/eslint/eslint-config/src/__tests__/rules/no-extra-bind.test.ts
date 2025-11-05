import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-extra-bind';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary bind', async () => {
    const code = `
      const fn = function() {
        console.log('test');
      }.bind(this);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when bind is necessary', async () => {
    const code = `
      const fn = function() {
        console.log(this.value);
      }.bind({ value: 42 });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
