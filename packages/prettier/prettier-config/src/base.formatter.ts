import type { Config } from 'prettier';

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

const baseFormatter = {
  // Core settings
  singleQuote: true,
  trailingComma: 'all',

  // Plugin settings
  plugins: [
    getPackagePath('prettier-plugin-toml'),
    getPackagePath('prettier-plugin-packagejson'),
    getPackagePath('@ianvs/prettier-plugin-sort-imports'),
  ].filter(Boolean),

  // Import order
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^react$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^(@tcd-devkit)(/.*)$',
    '',
    '^(@shared|@/shared|#shared)(/.*)$',
    '',
    '^(@server|@/server|#server)(/.*)$',
    '^(@actions|@/actions|#actions)(/.*)$',
    '',
    '^(@client|@/client|#client)(/.*)$',
    '',
    '^(@components|@/components|#components)(/.*)$',
    '',
    '^(@public|@/public|#public)(/.*)$',
    '',
    '^#([^/].*)$',
    '',
    '^(@global-styles?|@/global-styles?|#global-styles?)(/.*)$',
    '^(@styles?|@/styles?|#styles?)(/.*)$',
    '(?:\\.s?css)',
    '',
    '^[./]',
  ],

  // Custom overrides
  overrides: [
    {
      files: '*.svg',
      options: {
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore',
      },
    },
  ],
} satisfies Config;

export default baseFormatter;
