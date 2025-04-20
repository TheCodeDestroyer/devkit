# @tcd-devkit/eslint-config

ESLint Flat Configuration for core JavaScript rules from `@eslint/js`. This package provides a foundational set of ESLint rules for the @tcd-devkit ecosystem, enforcing consistent code style and best practices. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **Core JavaScript Rules**: Extends `@eslint/js`'s `recommended` rules.
- **Modern JavaScript**: Optimized for modern JavaScript features.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config eslint@^9.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import baseConfig from '@tcd-devkit/eslint-config'; // This is an array of config objects

export default [
  ...baseConfig,
  {
    // Your custom rules and overrides can be added here
    rules: {
      // example: 'no-unused-vars': 'warn',
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...baseConfig`) into your top-level configuration array.

## Rules

This package primarily configures rules from `@eslint/js#recommended`.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
