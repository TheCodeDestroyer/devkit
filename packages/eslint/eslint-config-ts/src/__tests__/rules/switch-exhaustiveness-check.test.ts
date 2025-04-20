import type { Linter } from 'eslint';
import { config as defineConfig } from 'typescript-eslint';
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

const ruleId: CustomRule = '@typescript-eslint/switch-exhaustiveness-check';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
  lintTextOptions: {
    filePath: './fixtures/fixture.ts',
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when switch statement is not exhaustive', async () => {
    const code = `
      type Color = 'red' | 'green' | 'blue';
      
      function getColorValue(color: Color): number {
        switch (color) {
          case 'red':
            return 1;
          case 'green':
            return 2;
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

  it('should PASS when switch statement is exhaustive', async () => {
    const code = `
      type Color = 'red' | 'green' | 'blue';
      
      function getColorValue(color: Color): number {
        switch (color) {
          case 'red':
            return 1;
          case 'green':
            return 2;
          case 'blue':
            return 3;
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

  it('should PASS when using default case', async () => {
    const code = `
      type Color = 'red' | 'green' | 'blue';
      
      function getColorValue(color: Color): number {
        switch (color) {
          case 'red':
            return 1;
          case 'green':
            return 2;
          default:
            return 3;
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
