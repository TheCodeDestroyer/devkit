# @tcd-devkit/tsup-config

Shareable `tsup` configuration for building TypeScript libraries. This configuration provides sensible defaults, focusing on reliable declaration map (`.d.ts.map`) generation and ESM/CJS compatibility.

## Features

- Sensible defaults for `tsup` builds.
- Reliable generation of TypeScript declaration maps.
- Configurable and extensible for various project needs.
- Outputs both ESM and CJS modules by default.

## Installation

To use this configuration in your project, install it along with `tsup` and `typescript`:

```bash
pnpm add -D @tcd-devkit/tsup-config tsup typescript
```

## Usage

Create a `tsup.config.ts` file in the root of your package and import the base configuration. You can then extend it as needed.

```typescript
import { defineConfig } from 'tsup';

import baseConfig from '@tcd-devkit/tsup-config';

export default defineConfig((options) => ({
  ...baseConfig,
  entry: ['src/index.ts'], // Your library's entry point(s)
  // Add any specific overrides or additional options here
  // For example:
  // outDir: 'dist',
  // splitting: false,
  // sourcemap: true,
  // clean: true,
  ...options, // Pass through CLI options
}));
```

### Multiple Configurations

The package also exports named configurations if you need more specific setups or want to combine them. For example, `libConfig` is the default.

```typescript
import { defineConfig } from 'tsup';

import { libConfig } from '@tcd-devkit/tsup-config'; // Or other named configs

export default defineConfig((options) => ({
  ...libConfig, // Use a specific named config
  entry: ['src/index.ts'],
  ...options,
}));
```

Refer to the `tsup` [documentation](https://tsup.egoist.dev/) for all available options.

## License

MIT
