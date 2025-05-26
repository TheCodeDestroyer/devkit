# @tcd-devkit/commitlint-config

Shareable `commitlint` configuration designed to enforce Conventional Commits and promote a consistent, understandable git history.

This configuration extends `@commitlint/config-conventional` as a base.

## Features

- **Enforces Conventional Commits**: Helps ensure commit messages adhere to the specification.
- **Opinionated Defaults**: Built upon the widely accepted `@commitlint/config-conventional`.
- **Customizable**: Easily extend and override rules to fit specific project needs.

## Installation

To use this configuration, install it along with its peer dependency `@commitlint/cli`:

```bash
# Using pnpm
pnpm add -D @tcd-devkit/commitlint-config @commitlint/cli

# Using npm
npm install -D @tcd-devkit/commitlint-config @commitlint/cli

# Using yarn
yarn add -D @tcd-devkit/commitlint-config @commitlint/cli
```

## Usage

Create a `commitlint.config.js` (or `.ts`, `.json`) file in your project root and extend this configuration.

You can extend it using the full package name:

**`commitlint.config.js` (using full package name)**

```javascript
/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@tcd-devkit/commitlint-config'],
  // You can override rules here if needed:
  // rules: {
  //   'body-max-line-length': [1, 'always', 100],
  // },
};
```

Alternatively, since this package follows the `<scope>/commitlint-config` naming convention, you can use the scope shorthand as described in the commitlint shareable config documentation for scoped packages:

**`commitlint.config.js` (using scope shorthand)**

```javascript
/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@tcd-devkit'], // This will resolve to @tcd-devkit/commitlint-config
  // You can override rules here if needed:
  // rules: {
  //   'body-max-line-length': [1, 'always', 100],
  // },
};
```

For more details on configuring `commitlint`, refer to the official commitlint documentation regarding local setup and configuration.

### Integrating with Husky (Recommended)

To automatically lint commit messages before they are created, it is highly recommended to integrate `commitlint` with a Git hooks tool like Husky. Husky can be configured to run `commitlint` on the `commit-msg` hook.

Please refer to the official Husky documentation for the latest installation and configuration instructions to set up the `commit-msg` hook (e.g., `npx --no -- commitlint --edit "$1"`).

## License

MIT © Nace Logar
