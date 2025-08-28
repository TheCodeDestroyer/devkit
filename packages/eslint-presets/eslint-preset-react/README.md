# @tcd-devkit/eslint-preset-react

Comprehensive ESLint Flat Configuration Preset for React projects. This preset bundles a curated set of `@tcd-devkit` ESLint configurations to provide a complete linting solution for modern React applications, including React, TypeScript, accessibility (a11y), and import rules. It is designed for ESLint v9+ and its Flat Config system.

## Features

- **All-in-One React Setup**: Combines configurations for React, React Hooks, TypeScript, Imports (JS & TS), and JSX A11y.
- **Opinionated Defaults**: Provides a strong, opinionated baseline for React projects.
- **Easy Integration**: Simplifies ESLint setup by providing a single package to install and configure.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v9+).

This preset includes the following `@tcd-devkit` configurations:

- `@tcd-devkit/eslint-config` (Base JavaScript rules)
- `@tcd-devkit/eslint-config-ts` (TypeScript rules)
- `@tcd-devkit/eslint-config-import` (JavaScript import rules)
- `@tcd-devkit/eslint-config-import-ts` (TypeScript import rules)
- `@tcd-devkit/eslint-config-react` (React rules)
- `@tcd-devkit/eslint-config-react-hooks` (React Hooks rules)
- `@tcd-devkit/eslint-config-a11y` (JSX Accessibility rules)

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-preset-react eslint@^9.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-preset-react eslint@^9.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-preset-react eslint@^9.0.0
```

All necessary `@tcd-devkit/eslint-config-*` packages are direct dependencies of this preset and will be installed automatically.

## Usage

Import and use the preset in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import reactPreset from '@tcd-devkit/eslint-preset-react'; // This is an array of config objects

export default [
  ...reactPreset,
  {
    // Your project-specific overrides or additional configurations can be added here.
    // For example, to adjust parser options for TypeScript if your tsconfig.json is not in the root:
    // files: ['**/*.ts', '**/*.tsx'],
    // languageOptions: {
    //   parserOptions: {
    //     project: './path/to/your/tsconfig.json',
    //   },
    // },
    rules: {
      // example: '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
```

This preset exports an array of ESLint configuration objects. You should spread it (`...reactPreset`) into your top-level configuration array. The underlying configurations are designed to work together. Ensure your `tsconfig.json` is correctly set up for TypeScript linting to function optimally.

## Rules

This preset combines rules from all the included `@tcd-devkit/eslint-config-*` packages listed in the Features section.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
