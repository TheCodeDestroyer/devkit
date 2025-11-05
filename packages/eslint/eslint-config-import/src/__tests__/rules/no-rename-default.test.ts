import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRuleFromFiles } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { importConfig } from '#import.linter';
import type { CustomRule } from '#import.rules';

const ruleId: CustomRule = 'import-x/no-rename-default';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when renaming default import', async () => {
    const messages = await getLintMessagesForRuleFromFiles(
      importConfig,
      './fixtures/no-rename-default.js',
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });
});
