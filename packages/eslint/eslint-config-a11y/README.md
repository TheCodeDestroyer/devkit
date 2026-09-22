# @tcd-devkit/eslint-config-a11y

ESLint Flat Configuration for JSX A11y (Accessibility). This package provides ESLint rules from `eslint-plugin-jsx-a11y` to help enforce accessibility best practices in your JSX, promoting more inclusive web applications. It is part of the @tcd-devkit ecosystem and designed for ESLint v10 with its Flat Config system.

## Features

- **Accessibility Rules**: Integrates `eslint-plugin-jsx-a11y` for static analysis of JSX for accessibility issues.
- **React/JSX Focused**: Specifically tailored for projects using React and JSX.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v10).

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-config-a11y eslint@^10.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-config-a11y eslint@^10.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-config-a11y eslint@^10.0.0
```

### Peer dependency warnings on ESLint 10

`eslint-plugin-jsx-a11y` does not support ESLint 10 yet. It runs correctly on ESLint 10, but your package manager can still warn about its `eslint` peer range. To hide the warning in pnpm, add this to `pnpm-workspace.yaml`:

```yaml
peerDependencyRules:
  allowedVersions:
    eslint-plugin-jsx-a11y>eslint: '10'
```

## Usage

Import and use the configuration in your `eslint.config.js` (or `.mjs`/`.cjs`) file:

```javascript
import a11yConfig from '@tcd-devkit/eslint-config-a11y'; // This is an array of config objects

export default [
  ...a11yConfig,
  {
    // Your custom rules and overrides can be added here
    // Ensure these rules apply to files with JSX (e.g., .jsx, .tsx)
    files: ['**/*.js?(x)', '**/*.ts?(x)'],
    rules: {
      // example: 'jsx-a11y/anchor-is-valid': ['error', { 'components': ['Link'], 'specialLink': ['to'] }],
    },
  },
];
```

This package exports an array of ESLint configuration objects, so you should spread it (`...a11yConfig`) into your top-level configuration array. Make sure to apply it to the relevant JSX/TSX files in your project.

## Rules

This package configures rules from `eslint-plugin-jsx-a11y`.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
