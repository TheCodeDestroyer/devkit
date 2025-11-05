import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRuleFromFiles } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { importConfig } from '#import.linter';
import type { CustomRule } from '#import.rules';

const ruleId: CustomRule = 'import-x/no-deprecated';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when using deprecated import syntax', async () => {
    const messages = await getLintMessagesForRuleFromFiles(
      importConfig,
      ['./fixtures/deprecated-import.js'],
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(2);
  });
});
