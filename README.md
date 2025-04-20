# @tcd-devkit

Welcome to `@tcd-devkit`! This monorepo is a collection of shareable configurations and development tools designed to streamline and standardize modern JavaScript and TypeScript projects.

## Philosophy

The goal of `@tcd-devkit` is to provide well-maintained, extensible, and easy-to-use configurations for common development tools. By centralizing these configurations, we aim to:

- **Promote Consistency:** Ensure projects adhere to consistent coding standards and practices.
- **Reduce Boilerplate:** Minimize the setup required for new projects.
- **Simplify Maintenance:** Make it easier to update and manage shared configurations across multiple projects.
- **Embrace Modern Standards:** Focus on current best practices, such as ESLint's Flat Config.

## What's Inside?

This repository contains a variety of packages, including:

- **ESLint Configurations:** Shareable ESLint setups for JavaScript and TypeScript, with support for various frameworks and plugins (e.g., React, Next.js, TypeScript, Import sorting, A11y). These configurations are built using ESLint's v9+ Flat Config system. We offer both granular, focused configs and convenient preset packages.
- **Prettier Configurations:** Opinionated Prettier setups to ensure consistent code formatting, including plugins for sorting imports and formatting specific file types.
- **TypeScript Configurations:** Base `tsconfig.json` files for different project types, promoting type safety and modern TypeScript practices.
- **Build Tool Configurations:** Shareable configurations for build tools like `tsup`, simplifying the process of bundling TypeScript libraries.
- **Development Scripts:** Utility scripts for common development tasks.

## Getting Started

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
