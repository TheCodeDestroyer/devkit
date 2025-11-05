import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'radix';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using parseInt without radix', async () => {
    const code = 'const num = parseInt("071", "abc");';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should FAIL when using radix when not needed', async () => {
    const code = 'const num = parseInt("071", 10);';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using parseInt without', async () => {
    const code = 'const num = parseInt("10");';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using parseInt with radix', async () => {
    const code = 'const num = parseInt("10", 8);';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using Number constructor', async () => {
    const code = 'const num = Number("10");';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
