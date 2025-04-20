# @tcd-devkit/eslint-config-import

ESLint Flat Configuration for JavaScript import rules using `eslint-plugin-import-x`. This package provides a comprehensive set of ESLint rules that enforce consistent import statements and best practices for module imports in JavaScript codebases within the @tcd-devkit ecosystem. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **JavaScript Import Rules**: Leverages `eslint-plugin-import-x` for JavaScript projects.
- **Modern JavaScript**: Optimized for modern JavaScript features.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config-import eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config-import eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config-import eslint@^9.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import importConfig from '@tcd-devkit/eslint-config-import'; // This is an array of config objects

export default [
  ...importConfig,
  {
    // Your custom rules and overrides can be added here
    files: ['**/*.js', '**/*.jsx'], // Ensure these rules apply only to JS/JSX files
    rules: {
      // example: 'import-x/no-unresolved': 'off',
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...importConfig`) into your top-level configuration array. Ensure you configure it to apply to the correct JavaScript files (e.g. using a `files` glob).

## Rules

This package configures rules from `eslint-plugin-import-x` for JavaScript.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
