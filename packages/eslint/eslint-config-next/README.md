# @tcd-devkit/eslint-config-next

ESLint Flat Configuration for Next.js projects. This package provides ESLint rules tailored for Next.js applications, leveraging `@next/eslint-plugin-next` to enforce best practices and optimize development within the @tcd-devkit ecosystem. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **Next.js Specific Rules**: Integrates `@next/eslint-plugin-next` for rules specific to Next.js features and conventions.
- **Performance and Best Practices**: Helps identify patterns that can lead to performance issues or deviate from Next.js best practices.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config-next eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config-next eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config-next eslint@^9.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import nextJsConfig from '@tcd-devkit/eslint-config-next'; // This is an array of config objects

export default [
  ...nextJsConfig,
  {
    // Your custom rules and overrides can be added here
    // These rules are typically applied to your entire Next.js project
    files: ['**/*.js?(x)', '**/*.ts?(x)'], // Adjust if needed for your project structure
    rules: {
      // example: '@next/next/no-html-link-for-pages': 'error',
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...nextJsConfig`) into your top-level configuration array.

## Rules

This package configures rules from `@next/eslint-plugin-next`.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
