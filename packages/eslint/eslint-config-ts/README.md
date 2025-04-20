# @tcd-devkit/eslint-config-ts

ESLint Flat Configuration for core TypeScript rules. This package provides a foundational set of ESLint rules for TypeScript projects, powered by `typescript-eslint`. It aims to enforce consistent code style, best practices, and catch potential errors in TypeScript code within the @tcd-devkit ecosystem. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **Core TypeScript Rules**: Leverages `typescript-eslint` recommended and stylistic rules.
- **Type-Checked Linting**: Designed to work with type information for more powerful linting (requires TypeScript setup in the consuming project).
- **Modern TypeScript**: Optimized for modern TypeScript features.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config-ts eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config-ts eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config-ts eslint@^9.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import tsConfig from '@tcd-devkit/eslint-config-ts'; // This is an array of config objects

export default [
  ...tsConfig,
  {
    // Your custom rules and overrides can be added here
    files: ['**/*.ts', '**/*.tsx'], // Ensure these rules apply only to TS/TSX files
    languageOptions: {
      parserOptions: {
        project: true, // Assuming a tsconfig.json is in your project root
        // tsconfigRootDir: import.meta.dirname, // Or specify the directory containing tsconfig.json
      },
    },
    rules: {
      // example: '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...tsConfig`) into your top-level configuration array. For type-aware rules to function correctly, ensure your ESLint configuration provides `languageOptions.parserOptions.project` pointing to your `tsconfig.json`.

## Rules

This package primarily configures rules from `typescript-eslint` (e.g., `eslint-recommended`, `recommended`, `stylistic`).
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
