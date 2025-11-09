import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactConfig } from '#react.linter';
import type { CustomRule } from '#react.rules';

const ruleId: CustomRule = 'react/jsx-max-depth';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when JSX depth exceeds 7', async () => {
    const code = `
      const Component = () => (
        <div id="0">
          <div id="1">
            <div id="2">
              <div id="3">
                <div id="4">
                  <div id="5">
                    <div id="6">
                      <div id="7">
                        <div id="8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  it('should PASS when JSX depth is within 7', async () => {
    const code = `
      const Component = () => (
        <div id="1">
          <div id="2">
            <div id="3">
              <div id="4">
                <div id="5">
                  <div id="6">
                    <span>Content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
