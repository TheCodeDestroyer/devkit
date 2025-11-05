import { describe, expect, it } from 'bun:test';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { tsConfig } from '@tcd-devkit/eslint-config-ts';
import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { importTsConfig } from '#import-ts.linter';
import type { CustomRule } from '#import-ts.rules';

const testConfig: Linter.Config[] = defineConfig({
  name: '@tcd-devkit/eslint-config-import-ts',
  extends: [tsConfig, importTsConfig],
});

const ruleId: CustomRule = 'import-x/consistent-type-specifier-style';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
  lintTextOptions: {
    filePath: './fixtures/fixture.ts',
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when using invalid type specifier', async () => {
    const code = `
     import { type Foo } from 'Foo';

     export type Test = Foo | string;
    `;

    const messages = await getLintMessagesForRule(
      testConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });

  it('should PASS when using valid type specifier', async () => {
    const code = `
    import type { Foo } from 'Foo';

     export type Test = Foo | string;
   `;

    const messages = await getLintMessagesForRule(
      testConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });
});
