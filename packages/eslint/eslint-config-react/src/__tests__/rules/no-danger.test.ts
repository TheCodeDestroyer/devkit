import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/no-danger';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should WARN when dangerouslySetInnerHTML is used', async () => {
    const code = `
      const Component = () => <div dangerouslySetInnerHTML={{ __html: 'Hello' }} />;
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(1);
    if (messages.length > 0 && messages[0]) {
      expect(messages[0].severity).toBe(1); // 1 for warning
    }
  });
});
