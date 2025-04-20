/* eslint-disable no-console */
import chalk from 'chalk';

import packageJson from '@tcd-devkit/scripts/package.json' with { type: 'json' };

const getMessage = (data?: unknown) => {
  if (!data) return undefined;

  return data instanceof Error ? data.message : data;
};

const info = (message: string) => {
  console.log(chalk.blue(`\n[${packageJson.name}] ${message}`));
};

const success = (message: string) => {
  console.log(chalk.green(`\n[${packageJson.name}] ${message}`));
};

const warn = (message: string, data?: unknown) => {
  const coloredMessage = chalk.yellow(`\n[${packageJson.name}] ${message}`);

  if (data) {
    console.warn(coloredMessage, getMessage(data));
  } else {
    console.warn(coloredMessage);
  }
};

const error = (message: string, data?: unknown) => {
  const coloredMessage = chalk.red(`\n[${packageJson.name}] ${message}`);

  if (data) {
    console.error(coloredMessage, getMessage(data));
  } else {
    console.error(coloredMessage);
  }
};

export const logger = {
  info,
  success,
  warn,
  error,
};
