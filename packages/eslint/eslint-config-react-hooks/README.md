# @tcd-devkit/eslint-config-react-hooks

ESLint Flat Configuration for React Hooks. This package provides the ESLint rules from `eslint-plugin-react-hooks` to enforce the Rules of Hooks in React applications, promoting correct and efficient hook usage within the @tcd-devkit ecosystem. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **Rules of Hooks**: Enforces `eslint-plugin-react-hooks` rules (`rules-of-hooks` and `exhaustive-deps`).
- **React Best Practices**: Helps maintain best practices for React Hooks.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config-react-hooks eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config-react-hooks eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config-react-hooks eslint@^9.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import reactHooksConfig from '@tcd-devkit/eslint-config-react-hooks'; // This is an array of config objects

export default [
  ...reactHooksConfig,
  {
    // Your custom rules and overrides can be added here
    // Ensure these rules apply to files where React Hooks are used (e.g., .jsx, .tsx)
    files: ['**/*.js?(x)', '**/*.ts?(x)'],
    rules: {
      // example: 'react-hooks/rules-of-hooks': 'error',
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...reactHooksConfig`) into your top-level configuration array. Make sure to apply it to the relevant files in your project.

## Rules

This package configures rules from `eslint-plugin-react-hooks`.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
