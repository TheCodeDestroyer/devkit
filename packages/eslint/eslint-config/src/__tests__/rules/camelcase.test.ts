import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'camelcase';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using snake_case for variables', async () => {
    const code = 'const snake_case = 1;';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using camelCase for variables', async () => {
    const code = 'const snakeCase = 1;';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using snake_case in imports', async () => {
    const code = 'import { snake_case } from "module";';
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using snake_case in globals', async () => {
    const code = `
    /* global no_camelcased */
    const value = no_camelcased;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
