#!/usr/bin/env node
import { Command } from '@commander-js/extra-typings';

import packageJson from '@tcd-devkit/scripts/package.json' with { type: 'json' };

import { registerFormatCommand } from '#commands/format.command';
import { registerLintCommand } from '#commands/lint.command';
import { logger } from '#utils/logger.utils';

const main = async () => {
  const program = new Command();

  program
    .name('tcd')
    .version(packageJson.version)
    .description('Linting and formatting tools for @tcd-devkit');

  // Register subcommands
  registerLintCommand(program);
  registerFormatCommand(program);

  await program.parseAsync(process.argv);
};

main().catch((error) => {
  logger.error(`Unexpected error:`, error);
  process.exit(1);
});
