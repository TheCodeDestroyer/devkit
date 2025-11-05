import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRuleFromFiles } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/jsx-filename-extension';

const commonLintOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when JSX is in a .js file', async () => {
    const messages = await getLintMessagesForRuleFromFiles(
      reactConfig,
      './fixtures/WrongExtension.js',
      ruleId,
      commonLintOptions,
    );
    expect(messages).toHaveLength(1);
  });

  it('should PASS when JSX is in a .jsx file', async () => {
    const messages = await getLintMessagesForRuleFromFiles(
      reactConfig,
      './fixtures/ProperExtension.jsx',
      ruleId,
      commonLintOptions,
    );
    expect(messages).toHaveLength(0);
  });
});
