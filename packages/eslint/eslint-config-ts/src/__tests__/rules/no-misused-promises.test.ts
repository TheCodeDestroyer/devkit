import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { tsConfig } from '#ts.linter';
import type { CustomRule } from '#ts.rules';

const safeTsConfig = defineConfig(tsConfig, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: process.cwd(),
    },
  },
}) as Linter.Config[];

const ruleId: CustomRule = '@typescript-eslint/no-misused-promises';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
  lintTextOptions: {
    filePath: './fixtures/fixture.ts',
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when using as a conditional (checksConditionals: true)', async () => {
    const code = `
      const promise = Promise.resolve('value');

      const val = promise ? 123 : 456;
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });

  it('should FAIL when using as spread (checksSpreads: true)', async () => {
    const code = `
      const getData = () => fetch('/');

      console.log({ foo: 42, ...getData() });
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });

  it('should FAIL when promises are void (checksVoidReturn: true)', async () => {
    const code = `
      new Promise<void>(async (resolve, reject) => {
        await fetch('/');
        resolve();
      });
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using properly with conditional (checksConditionals: true)', async () => {
    const code = `
      const promise = Promise.resolve('value');

      const val = (await promise) ? 123 : 456;
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using properly with spread (checksSpreads: true)', async () => {
    const code = `
      const getData = () => fetch('/');

      console.log({ foo: 42, ...(await getData()) });
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });

  it('should PASS when properly using void promises (checksVoidReturn: true)', async () => {
    const code = `
      new Promise((resolve, reject) => {
        void (async () => {
          await doSomething();
          resolve();
        })();
      });
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });

  it('should PASS when using void promise in an attribute (checksVoidReturn: { attributes: false })', async () => {
    const code = `
      const promise = async (): Promise<void> => {
        await doSomething();
      };

      const MyComponent = () => {
        return (
          <form onSubmit={promise}>
            <button type="submit">Submit</button>
          </form>
        );
      };
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });
});
