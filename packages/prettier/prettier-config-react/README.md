# @tcd-devkit/prettier-config-react

Shareable Prettier configuration for React projects within the @tcd-devkit ecosystem, with added support for Tailwind CSS.

This package extends the base `@tcd-devkit/prettier-config` and comes pre-configured with the following Prettier plugins:

- `prettier-plugin-tailwindcss` for automatically sorting Tailwind CSS classes

## Features

- **Inherits Base Configuration**: Includes all formatting rules and plugins from `@tcd-devkit/prettier-config` (import sorting, `package.json` formatting, TOML formatting).
- **Tailwind CSS Support**: Automatically sorts Tailwind CSS utility classes, improving readability and consistency in your JSX/TSX components.
- **React Focused**: Optimized for projects using React, JSX, and TSX.

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/prettier-config-react prettier

# Using yarn
yarn add -D @tcd-devkit/prettier-config-react prettier

# Using pnpm
pnpm add -D @tcd-devkit/prettier-config-react prettier
```

The base configuration (`@tcd-devkit/prettier-config`) and the Tailwind CSS plugin (`prettier-plugin-tailwindcss`) are direct dependencies of this package and will be installed automatically.

## Usage

To use this Prettier configuration, reference it in your `package.json`:

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "prettier": "@tcd-devkit/prettier-config-react"
}
```

Alternatively, you can create a Prettier configuration file (e.g., `.prettierrc.js`, `.prettierrc.json`, `prettier.config.js`) and extend this configuration:

**`.prettierrc.js` (or `prettier.config.js`)**

This package exports both CommonJS (CJS) and ES Module (ESM) formats. You can import it accordingly:

```javascript
// For CommonJS (e.g., if your prettier.config.js is a .js file treated as CJS)
// const prettierConfigReact = require('@tcd-devkit/prettier-config-react');

// For ES Modules (e.g., if your prettier.config.js is a .mjs file or package.json has "type": "module")
// import prettierConfigReact from '@tcd-devkit/prettier-config-react';

// Then spread the imported config:
export default {
  // ...prettierConfigReact, // Choose one of the import methods above
  ...require('@tcd-devkit/prettier-config-react'), // Defaulting to require for wider compatibility in basic .js files
  // Your custom overrides can be added here
  // For example, if you have custom Tailwind settings:
  // tailwindConfig: './tailwind.config.js',
};
```

**`.prettierrc.json`**

```json
"@tcd-devkit/prettier-config-react"
```

Refer to the [Prettier documentation](https://prettier.io/docs/en/configuration.html) for more ways to configure Prettier and the [`prettier-plugin-tailwindcss` documentation](https://github.com/tailwindlabs/prettier-plugin-tailwindcss#options) for specific plugin options.

## Overriding Configuration

You can override specific rules from this preset or the base preset in your project's Prettier configuration file as shown in the `.prettierrc.js` example above.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
