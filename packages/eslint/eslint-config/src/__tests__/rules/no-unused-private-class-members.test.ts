import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-unused-private-class-members';

describe(`${ruleId} rule`, () => {
  it('should FAIL when having unused private class members', async () => {
    const code = `
      class Example {
        #unusedField = 42;
        #unusedMethod() {}
        #unusedGetter() { return 42; }
        #unusedSetter(value) {}
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(4);
  });

  it('should PASS when using private class members', async () => {
    const code = `
      class Example {
        #field = 42;
        #method() { return this.#field; }
        get #getter() { return this.#field; }
        set #setter(value) { this.#field = value; }
        
        publicMethod() {
          this.#method();
          this.#getter;
          this.#setter = 43;
        }
      }
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);
    expect(messages).toHaveLength(0);
  });
});
