import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-duplicate-imports';

describe(`${ruleId} rule`, () => {
  it('should FAIL when importing same module multiple times', async () => {
    const code = `
      import { x } from 'module';
      import { y } from 'module';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when importing different modules', async () => {
    const code = `
      import { x } from 'module1';
      import { y } from 'module2';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
