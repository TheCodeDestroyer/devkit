import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'operator-assignment';

describe(`${ruleId} rule`, () => {
  it('should FAIL when not using operator assignment', async () => {
    const code = 'x = x + 1;';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using operator assignment', async () => {
    const code = 'x += 1;';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
