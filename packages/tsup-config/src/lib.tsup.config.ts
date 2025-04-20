import { execSync } from 'node:child_process';

import type { Options } from 'tsup';

export const tsupLibConfig: Options = {
  entry: ['src/**/*', '!**/__tests__/**/*'],
  sourcemap: true,
  clean: true,
  dts: false,
  shims: true,
  splitting: false,
  treeshake: true,
  bundle: false,
  format: 'esm',
  tsconfig: 'tsconfig.build.json',
  // eslint-disable-next-line @typescript-eslint/require-await
  onSuccess: async () => {
    execSync(
      'tsc --emitDeclarationOnly --noEmit false --project ./tsconfig.build.json',
    );
  },
};
