import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/no-unstable-nested-components';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when a component is defined inside the render scope of another component', async () => {
    const code = `
      const ParentComponent = (props) => {
        const NestedComponent = () => <div>{props.text}</div>;
        return <NestedComponent />;
      };
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(1);
  });

  it('should PASS when a nested component is defined outside the render scope or memoized', async () => {
    const code = `
      const NestedComponent = ({ text }) => <div>{text}</div>; // Defined outside
      const ParentComponent = (props) => {
        return <NestedComponent text={props.text} />;
      };
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
