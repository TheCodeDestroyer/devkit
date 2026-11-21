# @tcd-devkit/eslint-config

ESLint Flat Configuration for core JavaScript rules from `@eslint/js`. This package provides a foundational set of ESLint rules for the @tcd-devkit ecosystem, enforcing consistent code style and best practices. It is designed for ESLint v10 and its Flat Config system.

## Features

- **Core JavaScript Rules**: Extends `@eslint/js`'s `recommended` rules.
- **Modern JavaScript**: Optimized for modern JavaScript features.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v10).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config eslint@^10.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config eslint@^10.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config eslint@^10.0.0
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`) file:

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

## Restrictions

The base config sets two restriction rules:

- `no-restricted-syntax` bans `function` declarations and expressions. Use an arrow function.
- `no-restricted-imports` bans an import from `./` or `../`. Use a path alias: `@...` from tsconfig `paths`, or `#...` from package.json `imports`. A CSS side-effect import (`import './globals.css'`) is allowed, and tool config files at the repo root (`*.config.{js,cjs,mjs,ts}`) are exempt. A nested `*.config.ts` file, such as `src/lib/app.config.ts`, is app code and is not exempt.

Flat config replaces a rule's options rather than merging them. To add your own entries and keep the base entries, use the helpers from `@tcd-devkit/eslint-config/restrictions`:

```javascript
import baseConfig from '@tcd-devkit/eslint-config';
import {
  aliasOnlyImports,
  CONFIG_FILE_GLOBS,
  restrictedImports,
  restrictedSyntax,
} from '@tcd-devkit/eslint-config/restrictions';

export default [
  ...baseConfig,
  {
    // Keeps the exemption of tool config files from the relative-import ban.
    ignores: CONFIG_FILE_GLOBS,
    rules: {
      'no-restricted-imports': restrictedImports(
        aliasOnlyImports({ message: 'Use a path alias (#lib).' }),
        { paths: [{ name: 'lodash', message: 'Use lodash-es.' }] },
      ),
      'no-restricted-syntax': restrictedSyntax([
        { selector: 'WithStatement', message: 'Do not use with.' },
      ]),
    },
  },
];
```

- `restrictedSyntax(...groups)` always keeps the arrow-function entries first.
- `restrictedImports(...groups)` always keeps the relative-import ban. Pass `aliasOnlyImports({ message })` only to set your own message.
- A block that sets `no-restricted-imports` after `...baseConfig` also applies to tool config files, unless its `files` key leaves them out. Add `ignores: CONFIG_FILE_GLOBS` to that block to keep the exemption.
- The ban checks `import` and `export ... from` statements. It does not check `import()` or `require()`.

## Rules

This package primarily configures rules from `@eslint/js#recommended`.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
