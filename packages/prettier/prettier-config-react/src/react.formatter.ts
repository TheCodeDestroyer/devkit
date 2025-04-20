import type { Config } from 'prettier';

import baseFormatter from '@tcd-devkit/prettier-config';

const getPackagePath = (packageName: string): string | null => {
  try {
    if (
      typeof import.meta !== 'undefined' &&
      typeof import.meta.resolve === 'function'
    ) {
      return import.meta.resolve(packageName);
    } else if (
      typeof require !== 'undefined' &&
      typeof require.resolve === 'function'
    ) {
      return require.resolve(packageName);
    }
    throw new Error(
      `Cannot resolve package '${packageName}' in this environment.`,
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

const basePlugins = baseFormatter.plugins || [];

const baseConfig: Config = {
  // Base settings
  ...baseFormatter,

  // Plugin settings
  plugins: [
    ...basePlugins,
    getPackagePath('prettier-plugin-tailwindcss'),
  ].filter(Boolean),

  // Tailwind CSS
  tailwindFunctions: ['clsx', 'cn', 'cva'],
  tailwindAttributes: ['className', 'class', 'tw'],
};

export default baseConfig;
