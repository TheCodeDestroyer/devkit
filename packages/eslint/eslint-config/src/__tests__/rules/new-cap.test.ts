import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'new-cap';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using new with lowercase constructor', async () => {
    const code = 'const instance = new myClass();';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using new with capitalized constructor', async () => {
    const code = 'const instance = new MyClass();';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using capitalized function without new', async () => {
    const code = 'const instance = MyClass();';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should FAIL when using lowercase function with new', async () => {
    const code = 'const instance = new myClass();';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });
});
