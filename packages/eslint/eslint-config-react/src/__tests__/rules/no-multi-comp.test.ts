import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/no-multi-comp';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when multiple components are defined in the same file', async () => {
    const code = `
      const MyComponent = () => <div>First</div>;
      const AnotherComponent = () => <div>Second</div>;
      export default MyComponent;
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(1); // Expecting error for AnotherComponent
  });

  it('should PASS when only one component is defined in the file (or others are not React components)', async () => {
    const code = `
      const MyComponent = () => <div>First</div>;
      const helperFunction = () => 'not a component';
      export default MyComponent;
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
