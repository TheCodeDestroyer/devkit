import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'max-classes-per-file';

describe(`${ruleId} rule`, () => {
  it('should FAIL when file has too many classes', async () => {
    const code = `
      class A {}
      class B {}
      class C {}
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when file has acceptable number of classes', async () => {
    const code = `
      class A {}
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
