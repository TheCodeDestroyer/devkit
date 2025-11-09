import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-array-constructor';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using Array constructor', async () => {
    const code = 'const arr = new Array(1, 2, 3);';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using array literal', async () => {
    const code = 'const arr = [1, 2, 3];';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
