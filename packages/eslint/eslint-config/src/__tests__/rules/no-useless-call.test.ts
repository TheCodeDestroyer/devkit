import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-useless-call';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary .call()', async () => {
    const code = `
      foo.call(null, 1, 2, 3);
      foo.call(undefined, 1, 2, 3);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should FAIL when using unnecessary .apply()', async () => {
    const code = `
      foo.apply(null, [1, 2, 3]);
      foo.apply(undefined, [1, 2, 3]);
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });
});
