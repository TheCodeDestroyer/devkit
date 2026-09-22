# @tcd-devkit/tsup-config

Shareable `tsup` configuration for building TypeScript libraries. This configuration provides sensible defaults, focusing on reliable declaration map (`.d.ts.map`) generation for ESM packages.

## Features

- Sensible defaults for `tsup` builds.
- Reliable generation of TypeScript declaration maps.
- Configurable and extensible for various project needs.
- Outputs ESM only (`format: 'esm'`).

## Installation

To use this configuration in your project, install it along with `tsup` and `typescript`:

```bash
pnpm add -D @tcd-devkit/tsup-config tsup typescript
```

## Usage

Create a `tsup.config.ts` file in the root of your package and use the `lib` configuration. You can extend it as needed.

```typescript
import { defineConfig } from 'tsup';

import { tsupLibConfig } from '@tcd-devkit/tsup-config/lib';

export default defineConfig({
  ...tsupLibConfig,
  // Add any specific overrides here
});
```

Refer to the `tsup` [documentation](https://tsup.egoist.dev/) for all available options.

## License

MIT
