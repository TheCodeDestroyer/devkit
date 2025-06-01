import type { Command } from '@commander-js/extra-typings';

import {
  cacheOption,
  formatOnlyOption,
  formatSkipOption,
  ignorePathOption,
  noCacheOption,
  refreshCacheOption,
} from '#constants/option.constants';
import { FORMAT_TOOLS } from '#types/option.types';
import type { FormatCommandOptions } from '#types/option.types';
import { getToolsToRun, runEslint, runPrettier } from '#utils/cli.utils';
import { logger } from '#utils/logger.utils';

export const registerFormatCommand = (program: Command) => {
  program
    .command('format')
    .alias('f')
    .description('Formats code using ESLint --fix and Prettier --write.')
    .argument('[files...]', 'Files or directories to format', ['.'])

    .addOption(formatOnlyOption)
    .addOption(formatSkipOption)
    .addOption(cacheOption)
    .addOption(noCacheOption)
    .addOption(refreshCacheOption)
    .addOption(ignorePathOption)
    .action(async (files: string[], options: FormatCommandOptions) => {
      const toolsToRun = getToolsToRun(FORMAT_TOOLS, options);
      let overallSuccess = true;

      // Run ESLint first, then Prettier for formatting
      if (toolsToRun.includes('eslint')) {
        // Pass only relevant options to runEslint
        overallSuccess &&= await runEslint(
          files,
          {
            cache: options.cache, // ESLint uses --cache flag too
            refreshCache: options.refreshCache,
            cacheLocation: options.cacheLocation,
          },
          true,
        ); // isFix = true
      }
      if (toolsToRun.includes('prettier')) {
        // Pass only relevant options to runPrettier
        overallSuccess &&= await runPrettier(
          files,
          {
            cache: options.cache,
            refreshCache: options.refreshCache,
            cacheLocation: options.cacheLocation,
            ignorePath: options.ignorePath,
          },
          false,
        ); // isCheck = false
      }

      if (!overallSuccess) {
        logger.error(`Formatting process encountered errors.`);
        process.exit(1);
      }
      logger.success('Formatting complete!');
    });

  return program;
};
