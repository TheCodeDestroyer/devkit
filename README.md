# @tcd-devkit

A collection of opinionated, shareable configurations and development tools for modern JavaScript and TypeScript projects.

## Features

- **ESLint Base Configurations:** Granular ESLint setups for JavaScript and TypeScript, with support for various frameworks and plugins (e.g., React, Next.js, TypeScript, Import sorting, A11y). Built using ESLint's v9+ Flat Config system.
- **ESLint Presets:** Combined configurations that bundle multiple base configs together, providing ready-to-use setups for specific project types (e.g., Next.js, Node.js).
- **Prettier Configurations:** Opinionated Prettier setups to ensure consistent code formatting, including plugins for sorting imports and formatting specific file types.
- **TypeScript Configurations:** Base `tsconfig.json` files for different project types, promoting type safety and modern TypeScript practices.
- **Build Tool Configurations:** Shareable configurations for build tools like `tsup`, simplifying the process of bundling TypeScript libraries.
- **Development Scripts:** Utility scripts for common development tasks.

## Installation

Each package within this monorepo is independently versioned and published. You can find specific installation and usage instructions in the `README.md` file of each individual package located in the `packages/` directory.

Generally, packages are installed as development dependencies:

```bash
# Example for an ESLint preset
pnpm add -D @tcd-devkit/eslint-preset-name eslint

# Example for a Prettier config
pnpm add -D @tcd-devkit/prettier-config-name prettier

# Example for TypeScript configurations
pnpm add -D @tcd-devkit/tsconfig typescript
```

Replace `eslint-preset-name` or `prettier-config-name` with the respective package names. The `@tcd-devkit/tsconfig` package provides various shareable TypeScript configurations that you can extend in your project's `tsconfig.json`.

## License

MIT © Nace Logar
