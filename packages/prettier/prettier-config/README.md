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

This package exports both CommonJS (CJS) and ES Module (ESM) formats. You can import it accordingly:

```javascript
// For CommonJS (e.g., if your prettier.config.js is a .js file treated as CJS)
// const prettierConfig = require('@tcd-devkit/prettier-config');

// For ES Modules (e.g., if your prettier.config.js is a .mjs file or package.json has "type": "module")
// import prettierConfig from '@tcd-devkit/prettier-config';

// Then spread the imported config:
export default {
  // ...prettierConfig, // Choose one of the import methods above
  ...require('@tcd-devkit/prettier-config'), // Defaulting to require for wider compatibility in basic .js files
  // Your custom overrides can be added here
  // مثلا:
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
