import { defineConfig } from 'tsup';

import { tsupLibConfig } from '@tcd-devkit/tsup-config/lib';

export default defineConfig({
  ...tsupLibConfig,
  format: ['esm', 'cjs'],
  onSuccess: async () => {
    if (
      tsupLibConfig.onSuccess &&
      typeof tsupLibConfig.onSuccess === 'function'
    ) {
      await tsupLibConfig.onSuccess();
    }
  },
});
