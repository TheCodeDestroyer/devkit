import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-unreachable-loop';

describe(`${ruleId} rule`, () => {
  it('should FAIL when loop is unreachable due to return statement', async () => {
    const code = `
      while (foo) {
        doSomething(foo);
        foo = foo.parent;
        break;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(1);
  });

  it('should PASS when loop is reachable', async () => {
    const code = `
      while (foo) {
        doSomething(foo);
        foo = foo.parent;
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });
});
