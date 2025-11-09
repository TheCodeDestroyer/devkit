import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-useless-constructor';

describe(`${ruleId} rule`, () => {
  it('should FAIL when using unnecessary constructor', async () => {
    const code = `
      class A {
        constructor() {}
      }

      class B extends A {
        constructor() {
          super();
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(2);
  });

  it('should PASS when using necessary constructor', async () => {
    const code = `
      class A {
        constructor(name) {
          this.name = name;
        }
      }

      class B extends A {
        constructor(name, age) {
          super(name);
          this.age = age;
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
