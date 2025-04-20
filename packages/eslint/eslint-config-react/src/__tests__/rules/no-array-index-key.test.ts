import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/no-array-index-key';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when array index is used as key', async () => {
    const code = `
      const MyComponent = ({ items }) => (
        <ul>
          {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      );
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(1);
  });

  it('should PASS when a unique property is used as key', async () => {
    const code = `
      const MyComponent = ({ items }) => (
        <ul>
          {items.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
      );
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
