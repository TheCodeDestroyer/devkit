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

const ruleId: CustomRule = '@typescript-eslint/return-await';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
  lintTextOptions: {
    filePath: './fixtures/fixture.ts',
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when returning a Promise without await', async () => {
    const code = `
      async function invalidInTryCatch1() {
        try {
          return Promise.reject('try');
        } catch (e) {
          // Doesn't execute due to missing await.
        }
      }
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using await with Promise return', async () => {
    const code = `
      async function validInTryCatch1() {
        try {
          return await Promise.reject('try');
        } catch (e) {
          // Executes as expected.
        }
      }
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
