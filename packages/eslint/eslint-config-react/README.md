# @tcd-devkit/eslint-config-react

ESLint Flat Configuration for React projects. This package provides a comprehensive set of ESLint rules for React applications, leveraging `eslint-plugin-react` to enforce best practices, improve code quality, and maintain consistency in React/JSX code. It is part of the @tcd-devkit ecosystem and designed for ESLint v9+ with its Flat Config system.

## Features

- **Core React Rules**: Integrates `eslint-plugin-react` recommended rules.
- **JSX Best Practices**: Enforces best practices for writing JSX.
- **Modern React**: Optimized for modern React features (e.g., Hooks, new JSX transform).
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config-react eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config-react eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config-react eslint@^9.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import reactConfig from '@tcd-devkit/eslint-config-react'; // This is an array of config objects

export default [
  ...reactConfig,
  {
    // Your custom rules and overrides can be added here
    files: ['**/*.js?(x)', '**/*.ts?(x)'], // Ensure these rules apply to your React component files
    // You may also need to configure settings like react version if not auto-detected
    // settings: {
    //   react: {
    //     version: 'detect', // Or specify your React version e.g., '18.2'
    //   },
    // },
    rules: {
      // example: 'react/jsx-uses-react': 'off', // Not needed with new JSX transform
      // example: 'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      // example: 'react/prop-types': 'off', // If using TypeScript or prefer not to use prop-types
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...reactConfig`) into your top-level configuration array. Make sure to apply it to the relevant files in your project (e.g., `.jsx`, `.tsx`).

## Rules

This package configures rules from `eslint-plugin-react`.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
