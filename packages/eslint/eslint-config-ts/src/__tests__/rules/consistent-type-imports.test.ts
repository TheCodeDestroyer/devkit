import { describe, expect, it } from 'bun:test';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

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

const ruleId: CustomRule = '@typescript-eslint/consistent-type-imports';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
  lintTextOptions: {
    filePath: './fixtures/fixture.ts',
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when mixing type and value imports', async () => {
    const code = `
      import { Foo } from 'Foo';
      import Bar from 'Bar';

      type T = Foo;
      const x: Bar = 1;
    `;
    const messages = await getLintMessagesForRule(
      safeTsConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(2);
  });

  it('should PASS when using consistent type imports', async () => {
    const code = `
      import type { Foo } from 'module';
      import { Bar } from 'module';
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
