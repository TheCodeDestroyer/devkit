# @tcd-devkit/eslint-preset-node

Comprehensive ESLint Flat Configuration Preset for Node.js projects. This preset bundles a curated set of `@tcd-devkit` ESLint configurations to provide a robust linting solution for modern Node.js applications, particularly those using TypeScript. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **All-in-One Node.js Setup**: Combines configurations for core JavaScript, TypeScript, and import rules (JS & TS).
- **Opinionated Defaults**: Provides a strong, opinionated baseline for Node.js projects.
- **Easy Integration**: Simplifies ESLint setup by providing a single package to install and configure.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

This preset includes the following `@tcd-devkit` configurations:

- `@tcd-devkit/eslint-config` (Base JavaScript rules)
- `@tcd-devkit/eslint-config-ts` (TypeScript rules)
- `@tcd-devkit/eslint-config-import` (JavaScript import rules)
- `@tcd-devkit/eslint-config-import-ts` (TypeScript import rules)

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-preset-node eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-preset-node eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-preset-node eslint@^9.0.0
```

All necessary `@tcd-devkit/eslint-config-*` packages are direct dependencies of this preset and will be installed automatically.

## Usage

Import and use the preset in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import nodePreset from '@tcd-devkit/eslint-preset-node'; // This is an array of config objects

export default [
  ...nodePreset,
  {
    // Your project-specific overrides or additional configurations can be added here.
    // For example, to adjust parser options for TypeScript if your tsconfig.json is not in the root:
    // files: ['**/*.ts'],
    // languageOptions: {
    //   parserOptions: {
    //     project: './path/to/your/tsconfig.json',
    //   },
    // },
    rules: {
      // example: '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
```

This preset exports an array of ESLint configuration objects. You should spread it (`...nodePreset`) into your top-level configuration array. The underlying configurations are designed to work together. Ensure your `tsconfig.json` is correctly set up for TypeScript linting to function optimally.

## Rules

This preset combines rules from all the included `@tcd-devkit/eslint-config-*` packages listed in the Features section.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
