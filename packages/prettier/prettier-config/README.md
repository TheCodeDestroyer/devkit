# @tcd-devkit/prettier-config

Shareable Prettier configuration for the @tcd-devkit ecosystem. This package ensures consistent code formatting across JavaScript, TypeScript, JSON, TOML, and `package.json` files.

It comes pre-configured with the following Prettier plugins:

- `@ianvs/prettier-plugin-sort-imports` for organizing imports
- `prettier-plugin-packagejson` for formatting `package.json` files
- `prettier-plugin-toml` for formatting TOML files

## Features

- **Consistent Formatting**: Enforces a unified code style.
- **Import Sorting**: Automatically sorts imports according to predefined rules.
- **`package.json` Formatting**: Keeps your `package.json` neat and consistently ordered.
- **TOML Formatting**: Ensures TOML files (like `pyproject.toml` or `wrangler.toml`) are well-formatted.
- **Opinionated Defaults**: Based on common Prettier best practices with minor adjustments.

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/prettier-config prettier

# Using yarn
yarn add -D @tcd-devkit/prettier-config prettier

# Using pnpm
pnpm add -D @tcd-devkit/prettier-config prettier
```

The necessary Prettier plugins (`@ianvs/prettier-plugin-sort-imports`, `prettier-plugin-packagejson`, `prettier-plugin-toml`) are direct dependencies of this package and will be installed automatically.

## Usage

To use this Prettier configuration, reference it in your `package.json`:

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "prettier": "@tcd-devkit/prettier-config"
}
```

Alternatively, you can create a Prettier configuration file (e.g., `.prettierrc.js`, `.prettierrc.json`, `prettier.config.js`) and extend this configuration:

**`.prettierrc.js` (or `prettier.config.js`)**

This package exports both CommonJS (CJS) and ES Module (ESM) formats. Choose the appropriate example based on your project's module system:

> **Note**: You can also use `prettier.config.cjs` to force CommonJS format even in projects with `"type": "module"` in package.json.

For CommonJS (`.js` files without `"type": "module"` in package.json):

```javascript
const prettierConfig = require('@tcd-devkit/prettier-config');

module.exports = {
  ...prettierConfig,
  // Your custom overrides can be added here
  // For example:
  // printWidth: 100,
};
```

For ES Modules (`.mjs` files or `.js` files with `"type": "module"` in package.json):

```javascript
import prettierConfig from '@tcd-devkit/prettier-config';

export default {
  ...prettierConfig,
  // Your custom overrides can be added here
  // For example:
  // printWidth: 100,
};
```

**`.prettierrc.json`**

```json
"@tcd-devkit/prettier-config"
```

Refer to the [Prettier documentation](https://prettier.io/docs/en/configuration.html) for more ways to configure Prettier.

## Overriding Configuration

While this package provides a sensible default configuration, you can easily override specific rules in your project's Prettier configuration file as shown in the `.prettierrc.js` example above.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
