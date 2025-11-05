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

const ruleId: CustomRule = '@typescript-eslint/no-loop-func';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
  lintTextOptions: {
    filePath: './fixtures/fixture.ts',
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when creating a function inside a loop', async () => {
    const code = `
      var funcs = [];
      for (var i = 0; i < 10; i++) {
        funcs[i] = function() {
          return i;
        };
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

  it('should PASS when creating a function outside a loop', async () => {
    const code = `
      var funcs = [];
      for (var i = 0; i < 10; i++) {
        funcs[i] = function(x) {
          return x;
        };
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
