import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/style-prop-object';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when the style prop is a string', async () => {
    const code = `
      const Component = <div style="color: red;" />;
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(1);
  });

  it('should PASS when the style prop is an object', async () => {
    const code = `
      const Component = <div style={{ color: 'red' }} />;
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(0);
  });
});
