import { Option } from '@commander-js/extra-typings';

import { FORMAT_TOOLS, LINT_TOOLS } from '#types/option.types';
import type { FormatTool, LintTool } from '#types/option.types';

const getOnlyOption = <T extends boolean>(
  isFormat: T,
): T extends true ? Option<FormatTool> : Option<LintTool> => {
  const tools = isFormat ? FORMAT_TOOLS : LINT_TOOLS;

  return new Option(
    '--only <tool>',
    `Run only a specific tool (${tools.join(', ')})`,
  )
    .choices(isFormat ? FORMAT_TOOLS : LINT_TOOLS)
    .conflicts('skip');
};

const getSkipOption = <T extends boolean>(
  isFormat: T,
): T extends true ? Option<FormatTool> : Option<LintTool> => {
  const tools = isFormat ? FORMAT_TOOLS : LINT_TOOLS;

  return new Option(
    '--skip <tools...>',
    `Skip specific tools (${tools.join(', ')})`,
  )
    .choices(tools)
    .conflicts('only');
};

export const formatOnlyOption = getOnlyOption(true);
export const formatSkipOption = getSkipOption(true);
export const lintOnlyOption = getOnlyOption(false);
export const lintSkipOption = getSkipOption(false);

export const cacheOption = new Option(
  '--cache',
  'Enable Prettier/ESLint cache (use --no-cache to disable)',
).default(true);

export const noCacheOption = new Option(
  '--no-cache',
  'Disable Prettier/ESLint cache',
);

export const refreshCacheOption = new Option(
  '--refresh-cache',
  'Refresh Prettier/ESLint cache before running',
).default(false);

export const ignorePathOption = new Option(
  '--ignore-path <path>',
  'Path to ignore file for Prettier',
);

export const maxWarningsOption = new Option(
  '--max-warnings <number>',
  'Maximum number of warnings allowed before failing',
).default('0');

export const projectOption = new Option(
  '--project <path>',
  'Path to TS config for TSC',
).default('tsconfig.json');
