import { ESLint } from 'eslint';
import type { Linter } from 'eslint';
import { describe, expect, it } from 'vitest';

import { baseConfig } from '@tcd-devkit/eslint-config';
import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import {
  commonJsExemption,
  configFilesExemption,
  manifestExemption,
  TEST_FILE_GLOBS,
  testsExemption,
} from '#exemptions.linter';
import { nextPreset } from '#next-preset.linter';

const OFF = 0;
const ERROR = 2;

/** The severity the full preset gives a rule for a file path. */
const severityInPreset = async (
  filePath: string,
  ruleId: string,
): Promise<number | undefined> => {
  const eslint = new ESLint({
    baseConfig: nextPreset,
    overrideConfigFile: true,
    cwd: import.meta.dirname,
  });
  const config = (await eslint.calculateConfigForFile(filePath)) as
    | Linter.Config
    | undefined;
  const entry = config?.rules?.[ruleId];
  const severity = Array.isArray(entry) ? entry[0] : entry;

  return severity as number | undefined;
};

const lintAt = async (
  block: Linter.Config,
  code: string,
  ruleId: string,
  filePath: string,
): Promise<Linter.LintMessage[]> =>
  getLintMessagesForRule([...baseConfig, block], code, ruleId, {
    eslintOptions: { cwd: import.meta.dirname },
    lintTextOptions: { filePath },
  });

describe('no-console', () => {
  it.each(['scripts/seed.ts', 'src/lib/shared/logger.ts'])(
    'should keep no-console on for %s',
    async (filePath) => {
      expect(await severityInPreset(filePath, 'no-console')).toBe(ERROR);
    },
  );
});

describe(`${manifestExemption.name}`, () => {
  const code = 'export const manifest = { short_name: "App" };';

  it.each(['src/app/manifest.ts', 'app/manifest.ts'])(
    'should PASS when %s uses snake_case',
    async (filePath) => {
      const messages = await lintAt(
        manifestExemption,
        code,
        'camelcase',
        filePath,
      );

      expect(messages).toHaveLength(0);
      expect(await severityInPreset(filePath, 'camelcase')).toBe(OFF);
    },
  );

  it('should FAIL when any other file uses snake_case', async () => {
    const filePath = 'src/app/page.ts';
    const messages = await lintAt(
      manifestExemption,
      code,
      'camelcase',
      filePath,
    );

    expect(messages).toHaveLength(1);
    expect(await severityInPreset(filePath, 'camelcase')).toBe(ERROR);
  });
});

describe(`${testsExemption.name}`, () => {
  it('should use the exported TEST_FILE_GLOBS', () => {
    expect(testsExemption.files).toEqual(TEST_FILE_GLOBS);
    expect(testsExemption.files).not.toBe(TEST_FILE_GLOBS);
  });

  const code = `
    const test = () => {
      let count = 0;
      ${Array(30).fill('count += 1;').join('\n      ')}
      return count;
    };
    test();
  `;

  it.each([
    'src/a.test.ts',
    'src/b.spec.tsx',
    'convex/c.test.js',
    'scripts/d.test.mjs',
    'e.spec.cjs',
  ])('should PASS when %s has many statements', async (filePath) => {
    const messages = await lintAt(
      testsExemption,
      code,
      'max-statements',
      filePath,
    );

    expect(messages).toHaveLength(0);
    expect(await severityInPreset(filePath, 'max-statements')).toBe(OFF);
  });

  it('should FAIL when a source file has many statements', async () => {
    const filePath = 'src/a.utils.ts';
    const messages = await lintAt(
      testsExemption,
      code,
      'max-statements',
      filePath,
    );

    expect(messages).toHaveLength(1);
  });
});

describe(`${configFilesExemption.name}`, () => {
  const ruleIds = [
    '@typescript-eslint/no-unsafe-assignment',
    'import-x/no-rename-default',
  ];

  it.each([
    'eslint.config.mjs',
    'next.config.ts',
    'vitest.config.ts',
    'tailwind.config.js',
  ])('should turn the config-file rules off for %s', async (filePath) => {
    for (const ruleId of ruleIds) {
      expect(await severityInPreset(filePath, ruleId)).toBe(OFF);
    }
  });

  it.each([
    'src/app/app.config.tsx',
    'src/lib/shared/config/app.config.ts',
    'src/lib/server/i18n.config.ts',
    'convex/convex.config.ts',
    'convex/auth.config.ts',
  ])('should keep the config-file rules on for %s', async (filePath) => {
    for (const ruleId of ruleIds) {
      expect(await severityInPreset(filePath, ruleId)).toBe(ERROR);
    }
  });
});

describe(`${commonJsExemption.name}`, () => {
  const ruleId = '@typescript-eslint/no-require-imports';

  it('should turn the rule off for a .cjs file', async () => {
    expect(await severityInPreset('prettier.config.cjs', ruleId)).toBe(OFF);
  });

  it('should keep the rule on for an ES module', async () => {
    expect(await severityInPreset('prettier.config.mjs', ruleId)).toBe(ERROR);
  });
});
