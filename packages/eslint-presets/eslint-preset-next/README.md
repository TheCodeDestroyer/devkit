# @tcd-devkit/eslint-preset-next

Comprehensive ESLint Flat Configuration Preset for Next.js projects. This preset bundles a curated set of `@tcd-devkit` ESLint configurations to provide a complete linting solution for modern Next.js applications, including React, TypeScript, accessibility (a11y), and import rules. It is designed for ESLint v10 and its Flat Config system.

## Features

- **All-in-One Next.js Setup**: Combines configurations for Next.js, React, React Hooks, TypeScript, Imports (JS & TS), and JSX A11y.
- **Opinionated Defaults**: Provides a strong, opinionated baseline for Next.js projects.
- **Easy Integration**: Simplifies ESLint setup by providing a single package to install and configure.
- **Flat Config**: Utilizes ESLint's modern flat configuration format (ESLint v10).

This preset includes the following `@tcd-devkit` configurations:

- `@tcd-devkit/eslint-config` (Base JavaScript rules)
- `@tcd-devkit/eslint-config-ts` (TypeScript rules)
- `@tcd-devkit/eslint-config-import` (JavaScript import rules)
- `@tcd-devkit/eslint-config-import-ts` (TypeScript import rules)
- `@tcd-devkit/eslint-config-react` (React rules)
- `@tcd-devkit/eslint-config-react-hooks` (React Hooks rules)
- `@tcd-devkit/eslint-config-next` (Next.js specific rules)
- `@tcd-devkit/eslint-config-a11y` (JSX Accessibility rules)

## Installation

```bash
# Using npm
npm install -D @tcd-devkit/eslint-preset-next eslint@^10.0.0

# Using yarn
yarn add -D @tcd-devkit/eslint-preset-next eslint@^10.0.0

# Using pnpm
pnpm add -D @tcd-devkit/eslint-preset-next eslint@^10.0.0
```

All necessary `@tcd-devkit/eslint-config-*` packages are direct dependencies of this preset and will be installed automatically.

### Peer dependency warnings on ESLint 10

`eslint-plugin-react` and `eslint-plugin-jsx-a11y` do not support ESLint 10 yet. `eslint-plugin-react` runs wrapped with `fixupConfigRules` from `@eslint/compat`, and `eslint-plugin-jsx-a11y` runs as is. Your package manager can still warn about their `eslint` peer range. To hide the warning in pnpm, add this to `pnpm-workspace.yaml`:

```yaml
peerDependencyRules:
  allowedVersions:
    eslint-plugin-react>eslint: '10'
    eslint-plugin-jsx-a11y>eslint: '10'
```

## Usage

Import and use the preset in your `eslint.config.js` (or `.mjs`) file:

```javascript
import nextPreset from '@tcd-devkit/eslint-preset-next'; // This is an array of config objects

export default [
  ...nextPreset,
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

This preset exports an array of ESLint configuration objects. You should spread it (`...nextPreset`) into your top-level configuration array. The underlying configurations are designed to work together. Ensure your `tsconfig.json` is correctly set up for TypeScript linting to function optimally.

## Built-in exemptions

The preset turns some rules off for common path conventions. Each block is exported from `@tcd-devkit/eslint-preset-next/exemptions`, and the preset applies all of them (`nextExemptions`). A block that you put after `...nextPreset` can override them.

| Export                 | Files                                      | Rules off                                                               |
| ---------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `configFilesExemption` | `*.config.{js,cjs,mjs,ts}`                 | `@typescript-eslint/no-unsafe-assignment`, `import-x/no-rename-default` |
| `commonJsExemption`    | `**/*.cjs`                                 | `@typescript-eslint/no-require-imports`                                 |
| `manifestExemption`    | `**/app/manifest.{ts,js}`                  | `camelcase`                                                             |
| `testsExemption`       | `**/*.{test,spec}.{ts,tsx,js,jsx,mjs,cjs}` | `max-statements`                                                        |

`TEST_FILE_GLOBS` is exported from the same entry point. Use it as `files` in your own block for test files.

### Logger files

The preset has no `no-console` exemption, not for loggers and not for `scripts/**`. A logger module that calls `console` turns the rule off at the top of the file, for that rule only, with a reason:

```ts
/* eslint-disable no-console -- The logger is the one module that writes to the console. */
```

Do not use a bare `eslint-disable`. A path glob such as `**/*.logger.ts` would let any file call `console` after a rename.

## Adding restrictions without restating the preset

Flat config replaces a rule's options rather than merging them. If you set `no-restricted-syntax` or `no-restricted-imports`, you lose every entry that you do not restate. Use the helpers from `@tcd-devkit/eslint-preset-next/restrictions` to build one entry from several groups:

```javascript
import nextPreset from '@tcd-devkit/eslint-preset-next';
import {
  aliasOnlyImports,
  CONFIG_FILE_GLOBS,
  CONVEX_ERROR_ONLY_SYNTAX,
  rawConvexHooks,
  restrictedImports,
  restrictedSyntax,
} from '@tcd-devkit/eslint-preset-next/restrictions';

const aliases = aliasOnlyImports({
  message: 'Use a path alias (@client, @server).',
});
const hooks = rawConvexHooks({ from: '@client/hooks/convex.hooks' });

export default [
  ...nextPreset,
  {
    // Keeps the exemption of tool config files from the relative-import ban.
    ignores: CONFIG_FILE_GLOBS,
    rules: {
      'no-restricted-imports': restrictedImports(aliases, hooks),
    },
  },
  {
    files: ['convex/**/*.ts'],
    ignores: ['convex/**/*.test.ts'],
    rules: {
      // Keeps the preset's arrow-function entries, then adds the Convex ban.
      'no-restricted-syntax': restrictedSyntax(CONVEX_ERROR_ONLY_SYNTAX),
    },
  },
  {
    // The file that defines the wrappers imports the raw hooks.
    files: ['src/lib/client/hooks/convex.hooks.ts'],
    rules: { 'no-restricted-imports': restrictedImports(aliases) },
  },
];
```

- `restrictedSyntax(...groups)` always keeps the base arrow-function entries first.
- `restrictedImports(...groups)` concatenates the `paths` and `patterns` of each group. It always keeps the relative-import ban, so you do not need to pass `aliasOnlyImports()`.
- `aliasOnlyImports({ message })` sets your own message for the relative-import ban. Pass it to `restrictedImports` to replace the default message.
- `rawConvexHooks({ wrappers, from })` bans `useQuery`, `useMutation` and `useAction` from `convex/react`, `convex-helpers/react` and `convex-helpers/react/cache`. Pass `wrappers` to change the map, for example to add `usePaginatedQuery`.

## Relative imports

The base config bans an import from `./` or `../`. Use a path alias: `@...` from tsconfig `paths`, or `#...` from package.json `imports`. The "Restrictions" section of the `@tcd-devkit/eslint-config` README lists the exemptions and the limits.

A block that sets `no-restricted-imports` after `...nextPreset` also applies to tool config files, unless its `files` key leaves them out. Add `ignores: CONFIG_FILE_GLOBS` to that block to keep the exemption, as in the example above.

## Rules

This preset combines rules from all the included `@tcd-devkit/eslint-config-*` packages listed in the Features section.
For a detailed view of all active rules in your project, you can run ESLint with the `--print-config` flag.

### Libraries that React Compiler cannot optimize

`react-hooks/incompatible-library` warns when a component calls a library API that React Compiler cannot memoize safely, for example `useVirtualizer` from `@tanstack/react-virtual` or `useForm().watch` from `react-hook-form`. The preset keeps the rule at `warn`. A `'use no memo'` directive does not silence it.

With `--max-warnings=0`, the warning blocks a commit. The expected fix is a one-line suppression with a reason:

```tsx
// eslint-disable-next-line react-hooks/incompatible-library -- useVirtualizer returns unstable functions; the compiler skips this component.
const virtualizer = useVirtualizer({ count, getScrollElement, estimateSize });
```

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
