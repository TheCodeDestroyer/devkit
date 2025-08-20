import { ESLint } from 'eslint';
import type { Linter } from 'eslint';

type LintOptions = Omit<ESLint.Options, 'baseConfig' | 'overrideConfigFile'>;

interface LintTextOptions {
  filePath?: string;
}

export interface GetLintMessagesForRuleFromFilesOptions {
  eslintOptions?: LintOptions;
}

export interface GetLintMessagesOptions
  extends GetLintMessagesForRuleFromFilesOptions {
  lintTextOptions?: LintTextOptions;
}

export const getLintMessagesForRule = async <T>(
  config: Linter.Config[],
  code: string,
  ruleId: T | null,
  { eslintOptions, lintTextOptions }: GetLintMessagesOptions = {
    eslintOptions: {},
  },
): Promise<Linter.LintMessage[]> => {
  const eslint = new ESLint({
    baseConfig: config,
    overrideConfigFile: true,
    ...eslintOptions,
  });

  const results = await eslint.lintText(code, lintTextOptions);

  if (!results || !results[0]) {
    return [];
  }

  if (!ruleId) {
    return results[0].messages;
  }

  const flatMessages = results.flatMap((result) => result.messages);

  return flatMessages.filter((msg) => msg.ruleId === ruleId);
};

export const getLintMessagesForRuleFromFiles = async <T>(
  config: Linter.Config[],
  files: string | string[],
  ruleId: T,
  { eslintOptions }: GetLintMessagesOptions = {
    eslintOptions: {},
  },
): Promise<Linter.LintMessage[]> => {
  const eslint = new ESLint({
    baseConfig: config,
    overrideConfigFile: true,
    ...eslintOptions,
  });

  const results = await eslint.lintFiles(files);

  if (!results || !results[0]) {
    return [];
  }

  const flatMessages = results.flatMap((result) => result.messages);

  return flatMessages.filter((msg) => msg.ruleId === ruleId);
};
