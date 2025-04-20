import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-useless-rename';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary rename', async () => {
    const code = `
      const { foo: foo } = obj;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using necessary rename', async () => {
    const code = `
      const { foo: myFoo } = obj;
      const { bar: renamedBar } = obj;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
