import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/jsx-no-constructed-context-values';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when a new object is passed as context value directly', async () => {
    const code = `
      const MyContext = React.createContext();
      const Component = ({ children }) => {
        return (
          <MyContext.Provider value={{ a: 1 }}>
            {children}
          </MyContext.Provider>
        );
      }
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(1);
  });

  it('should PASS when context value is memoized (e.g., with useMemo or defined outside)', async () => {
    const code = `
      const MyContext = React.createContext();
      const stableValue = { a: 1 };
      const Component = ({ children }) => {
        return (
          <MyContext.Provider value={stableValue}>
            {children}
          </MyContext.Provider>
        );
      }
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
