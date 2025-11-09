import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'prefer-object-spread';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using Object.assign', async () => {
    const code = `
      const obj1 = { a: 1 };
      const obj2 = Object.assign({}, obj1, { b: 2 });
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(1);
  });

  it('should PASS when using object spread', async () => {
    const code = `
      const obj1 = { a: 1 };
      const obj2 = { ...obj1, b: 2 };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });

  it('should PASS when using Object.assign with dynamic arguments', async () => {
    const code = 'const obj = Object.assign({}, ...objects);';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
