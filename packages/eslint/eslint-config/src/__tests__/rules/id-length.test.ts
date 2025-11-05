import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'id-length';

describe(`${ruleId} rule`, () => {
  it('should FAIL when identifier is too short', async () => {
    const code = `
      const a = 1;
      const b = 2;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(2);
  });

  it('should PASS when identifiers are long enough', async () => {
    const code = `
      const value = 1;
      const count = 2;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when identifiers are on exceptions list', async () => {
    const code = `
      const i = 1;
      const e = 2;
      const _ = 3;
      const x = 4;
      const y = 5;
      const z = 6;
      const q = 7;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
