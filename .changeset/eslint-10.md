---
"@tcd-devkit/eslint-config": minor
"@tcd-devkit/eslint-config-ts": minor
"@tcd-devkit/eslint-config-import": minor
"@tcd-devkit/eslint-config-import-ts": minor
"@tcd-devkit/eslint-config-react": minor
"@tcd-devkit/eslint-config-react-hooks": minor
"@tcd-devkit/eslint-config-a11y": minor
"@tcd-devkit/eslint-config-next": minor
"@tcd-devkit/eslint-preset-node": minor
"@tcd-devkit/eslint-preset-react": minor
"@tcd-devkit/eslint-preset-next": minor
---

feat!: Move all ESLint configs and presets to ESLint 10

- The `eslint` peer range is now `^10.0.0`. ESLint 9 is no longer supported.
- Dependency updates: `@eslint/js` 10.0.1, `@eslint/compat` 2.1.1, `typescript-eslint` 8.70.0, `eslint-plugin-import-x` 4.17.1, `eslint-import-resolver-typescript` 4.4.5, `eslint-plugin-react-hooks` 7.1.1, `globals` 17.12.0.
- `eslint-plugin-react` and `eslint-plugin-jsx-a11y` have no ESLint 10 release yet. The react config now wraps `eslint-plugin-react` with `fixupConfigRules` from `@eslint/compat`. `eslint-plugin-jsx-a11y` runs on ESLint 10 as is. Your package manager can warn about their `eslint` peer range. The react/a11y config and preset READMEs show how to hide this warning in pnpm.
- `radix`: ESLint 10 ignores the `as-needed` option, so the rule now always requires a radix. `parseInt('10')` is now an error. Use `parseInt('10', 10)`.
- `@typescript-eslint/no-loop-func` is deprecated. The ts config now uses the core `no-loop-func` rule from the base config.
- `eslint-plugin-react-hooks` 7.1.1 can change results for the React Compiler rules (`set-state-in-effect`, `refs`, `immutability`, `preserve-manual-memoization`, `use-memo`).
- ESLint 10 can report new `max-nested-callbacks` errors, and `typescript-eslint` 8.70 can report new `no-unnecessary-type-assertion` errors.
