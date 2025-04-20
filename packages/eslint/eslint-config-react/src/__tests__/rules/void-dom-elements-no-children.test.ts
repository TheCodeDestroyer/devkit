import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/void-dom-elements-no-children';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when a void DOM element (e.g. <br>) has children', async () => {
    const code = `
      const Component = <br> незаконный ребенок </br>;
    `;
    const messages = await getLintMessagesForRule(
      reactConfig,
      code,
      ruleId,
      lintTextOptions,
    );
    expect(messages).toHaveLength(1);
  });

  it('should PASS when a void DOM element (e.g. <br />) has no children', async () => {
    const code = `
      const Component = <br />;
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
