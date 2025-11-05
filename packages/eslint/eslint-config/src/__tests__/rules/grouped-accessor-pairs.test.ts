import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'grouped-accessor-pairs';

describe(`${ruleId} rule`, () => {
  it('should FAIL when getter and setter are not grouped together', async () => {
    const code = `
      const obj = {
        get x() { return this._x; },
        y: 1,
        set x(value) { this._x = value; }
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when getter and setter are grouped together', async () => {
    const code = `
      const obj = {
        get x() { return this._x; },
        set x(value) { this._x = value; },
        y: 1
      };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
