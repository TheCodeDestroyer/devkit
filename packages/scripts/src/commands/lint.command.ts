import type { Command } from '@commander-js/extra-typings';

import {
  cacheOption,
  ignorePathOption,
  lintOnlyOption,
  lintSkipOption,
  projectOption,
  refreshCacheOption,
} from '#constants/option.constants';
import { LINT_TOOLS } from '#types/option.types';
import type { LintCommandOptions } from '#types/option.types';
import {
  getToolsToRun,
  runEslint,
  runPrettier,
  runTsc,
} from '#utils/cli.utils';
import { logger } from '#utils/logger.utils';

export const registerLintCommand = (program: Command) => {
  program
    .command('lint')
    .description('Runs ESLint, Prettier check, and TypeScript type check.')
    .argument('[files...]', 'Files or directories to lint/check', ['.'])
    .addOption(lintOnlyOption)
    .addOption(lintSkipOption)
    .addOption(cacheOption)
    .addOption(refreshCacheOption)
    .addOption(ignorePathOption)
    .addOption(projectOption)
    .action(async (files, options: LintCommandOptions) => {
      const toolsToRun = getToolsToRun(LINT_TOOLS, options);
      let overallSuccess = true;

      if (toolsToRun.includes('prettier')) {
        overallSuccess &&= await runPrettier(files, options, true);
      }
      if (toolsToRun.includes('eslint')) {
        overallSuccess &&= await runEslint(files, options, false);
      }
      if (toolsToRun.includes('tsc')) {
        overallSuccess &&= await runTsc(options);
      }

      if (!overallSuccess) {
        logger.error(`Linting process failed.`);
        process.exit(1);
      }
      logger.success('All checks passed!');
    });
};
