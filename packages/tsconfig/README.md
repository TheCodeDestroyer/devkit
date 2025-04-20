# @tcd-devkit/tsconfig

This package provides a collection of shareable TypeScript configurations (`tsconfig.json` files) for use across various project types within the @tcd-devkit ecosystem. These base configurations help ensure consistency and apply best practices for TypeScript compilation.

## Available Configurations

This package includes the following TypeScript configurations:

- **`@tcd-devkit/tsconfig/base`** (`tsconfig.base.json`): A foundational configuration with common compiler options suitable for most JavaScript/TypeScript projects. Other configurations typically extend this.
- **`@tcd-devkit/tsconfig/build`** (`tsconfig.build.json`): Tailored for build processes, often used for compiling libraries or applications. It might include stricter checks or specific output settings.
- **`@tcd-devkit/tsconfig/lib`** (`tsconfig.lib.json`): Specifically designed for building TypeScript libraries, focusing on declaration file generation and module compatibility.
- **`@tcd-devkit/tsconfig/next`** (`tsconfig.next.json`): Optimized for Next.js projects, incorporating Next.js specific compiler options and type expectations.

## Installation

This package is typically installed as a development dependency.

```bash
# Using npm
npm install -D @tcd-devkit/tsconfig

# Using yarn
yarn add -D @tcd-devkit/tsconfig

# Using pnpm
pnpm add -D @tcd-devkit/tsconfig
```

## Usage

In your project's `tsconfig.json`, you can extend one of the configurations provided by this package using the `extends` property.

**Example: Using the base configuration**

```json
// tsconfig.json
{
  "extends": "@tcd-devkit/tsconfig/base",
  "compilerOptions": {
    // Your project-specific compiler options can override or add to the base
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Example: Using the Next.js configuration**

```json
// tsconfig.json (for a Next.js project)
{
  "extends": "@tcd-devkit/tsconfig/next",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

Choose the configuration that best suits your project type and extend it as needed.

## Viewing Configuration Details

To see the exact compiler options set by each configuration, you can either:

1.  View the source `tsconfig.*.json` files directly within this package (e.g., in `node_modules/@tcd-devkit/tsconfig/`).
2.  Run `tsc --showConfig` in a project that extends one of these configurations to see the fully resolved compiler options.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
