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

const ruleId: CustomRule = '@typescript-eslint/no-unused-vars';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
  lintTextOptions: {
    filePath: './fixtures/fixture.ts',
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when a variable is unused', async () => {
    const code = `const x = 1;`;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });

  it('should PASS when all variables are used', async () => {
    const code = `
      const y = 1;
      console.log(y);
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });

  it('should PASS for unused variables with ignore pattern', async () => {
    const code = `const _x = 1;`;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });
});
