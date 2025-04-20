# @tcd-devkit/eslint-config-import-ts

ESLint Flat Configuration for TypeScript import rules using `eslint-plugin-import-x`. This package provides a comprehensive set of ESLint rules that enforce consistent import statements and best practices for module imports in TypeScript codebases within the @tcd-devkit ecosystem. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **TypeScript Import Rules**: Leverages `eslint-plugin-import-x` with TypeScript-specific enhancements.
- **Modern JavaScript/TypeScript**: Optimized for modern JavaScript and TypeScript features.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config-import-ts eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config-import-ts eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config-import-ts eslint@^9.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import importTsConfig from '@tcd-devkit/eslint-config-import-ts'; // This is an array of config objects

export default [
  ...importTsConfig,
  {
    // Your custom rules and overrides can be added here
    files: ['**/*.ts', '**/*.tsx'], // Ensure these rules apply only to TS/TSX files
    rules: {
      // example: 'import-x/no-unresolved': 'off',
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...importTsConfig`) into your top-level configuration array. Ensure you configure it to apply to the correct TypeScript files (e.g. using a `files` glob).

## Rules

This package configures rules from `eslint-plugin-import-x` for TypeScript.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
