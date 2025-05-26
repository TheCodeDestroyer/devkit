import fs from 'node:fs/promises';
import path from 'node:path';

import { execa } from 'execa';

import type {
  FormatCommandOptions,
  FormatTool,
  LintCommandOptions,
  LintTool,
  ToolSelectionOptions,
} from '#types/option.types';
import { logger } from '#utils/logger.utils';

export const runCommand = async (
  tool: string,
  args: string[],
  label: string,
): Promise<boolean> => {
  logger.info(`Running: ${tool} ${args.join(' ')}`);
  try {
    await execa(tool, args, { stdio: 'inherit', preferLocal: true });

    logger.success(`${label} check passed.`);

    return true;
  } catch (error) {
    logger.error(`${label} check failed.`, error);
    return false;
  }
};

export const getToolsToRun = <TTool extends LintTool | FormatTool>(
  allTools: readonly TTool[],
  options: ToolSelectionOptions<TTool>,
): TTool[] => {
  let toolsToRun: TTool[] = [...allTools];
  switch (true) {
    case options.only && allTools.includes(options.only):
      toolsToRun = [options.only];
      break;
    case options.only && !allTools.includes(options.only):
      logger.error(
        `Warning: Tool specified in 'only' ("${options.only}") is not available for this command.
        \nAvailable: ${allTools.join(', ')}. No tools will be run.`,
      );
      toolsToRun = [];
      break;
    case options.skip && options.skip.length > 0: {
      const skipSet = new Set(options.skip);
      toolsToRun = toolsToRun.filter((tool) => !skipSet.has(tool));
      break;
    }
    default:
      break;
  }

  if (options.only) {
    if (allTools.includes(options.only)) {
      toolsToRun = [options.only];
    }
  } else if (options.skip) {
    const skipSet = new Set(options.skip);
    toolsToRun = toolsToRun.filter((tool) => !skipSet.has(tool));
  }

  return toolsToRun;
};

export const handleCache = async (
  options: LintCommandOptions | FormatCommandOptions,
  toolArgs: string[],
  defaultCacheLocation: string,
): Promise<void> => {
  const cacheFlag: string = '--cache';
  const cacheLocationFlag: string = '--cache-location';
  const cacheLocation = options.cacheLocation || defaultCacheLocation;
  const cacheLocationResolved = path.resolve(process.cwd(), cacheLocation);

  if (options.refreshCache) {
    logger.info(`Refreshing cache at ${cacheLocationResolved}`);
    try {
      await execa('rimraf', [cacheLocationResolved], { stdio: 'pipe' });
    } catch (err) {
      logger.warn(`Failed to delete cache at ${cacheLocationResolved}`, err);
    }
  } else if (options.cache) {
    toolArgs.push(cacheFlag);
    if (options.cacheLocation) {
      toolArgs.push(cacheLocationFlag, cacheLocationResolved);
    }
  } else if (!options.cache) {
    logger.info('Cache disabled');
  }
};

export const handlePrettierIgnore = async (
  options: { ignorePath?: string },
  prettierArgs: string[],
): Promise<void> => {
  const ignorePathOption: string | undefined = options.ignorePath;
  if (ignorePathOption) {
    try {
      const ignorePathResolved = path.resolve(process.cwd(), ignorePathOption);

      await fs.access(ignorePathResolved);

      prettierArgs.push('--ignore-path', ignorePathResolved);
      logger.info(`Using Prettier ignore path: ${ignorePathResolved}`);
    } catch {
      logger.warn(
        `Prettier ignore path not found at ${ignorePathOption}, skipping...`,
      );
    }
  } else {
    logger.info(
      'No --ignore-path provided. Prettier might use local .gitignore and .prettierignore if found.',
    );
  }
};

export const runPrettier = async <
  TOptions extends {
    cache?: boolean;
    refreshCache?: boolean;
    cacheLocation?: string;
    ignorePath?: string;
  },
>(
  files: string[],
  options: TOptions,
  isCheck: boolean,
): Promise<boolean> => {
  const prettierArgs = [isCheck ? '--check' : '--write', '--ignore-unknown'];

  await handleCache(
    options,
    prettierArgs,
    './node_modules/.cache/prettier/.prettier-cache',
  );
  await handlePrettierIgnore(options, prettierArgs);

  prettierArgs.push(...files);

  return runCommand(
    'prettier',
    prettierArgs,
    isCheck ? 'Prettier Check' : 'Prettier Format',
  );
};

export const runEslint = async (
  files: string[],
  options: LintCommandOptions | FormatCommandOptions,
  isFix: boolean,
): Promise<boolean> => {
  const eslintArgs = [];

  if (isFix) eslintArgs.push('--fix');

  await handleCache(options, eslintArgs, './.eslintcache');

  eslintArgs.push(...files);

  return runCommand(
    'eslint',
    eslintArgs,
    isFix ? 'ESLint Fix' : 'ESLint Check',
  );
};

export const runTsc = async (options: LintCommandOptions): Promise<boolean> => {
  const tsconfigPath = path.resolve(
    process.cwd(),
    options.project || 'tsconfig.json',
  );
  logger.warn(`TSC check using config: ${tsconfigPath}`);
  const tscArgs = ['--noEmit', '--project', tsconfigPath];
  return runCommand('tsc', tscArgs, 'TypeScript');
};
