---
"@tcd-devkit/eslint-config": minor
"@tcd-devkit/eslint-preset-next": minor
"@tcd-devkit/eslint-preset-node": minor
"@tcd-devkit/eslint-preset-react": minor
---

fix(eslint): Exempt only root tool configs, and keep no-console on everywhere

**Breaking:** `CONFIG_FILE_GLOBS` is now `*.config.{js,cjs,mjs,ts}`. It matches only the folder that holds `eslint.config.*`, which is usually the repo root. It was `**/*.config.{js,cjs,mjs,ts}`, which also matched app modules named `{domain}.config.ts`, such as `src/lib/app.config.ts` or `convex/auth.config.ts`. Those files lost the relative-import ban, `@typescript-eslint/no-unsafe-assignment` and `import-x/no-rename-default`.

- Delete any repo block that turned these rules back on for nested `*.config.ts` files. The preset now keeps them on.
- A nested tool config (for example `packages/ui/tailwind.config.js` in a monorepo) is no longer exempt. Add its path to your own block if it needs the exemption. Put that block after any block that sets `no-restricted-imports` with `ignores: CONFIG_FILE_GLOBS`, because a later block turns the ban back on.

**Breaking (`eslint-preset-next`):** `loggerExemption` and `scriptsExemption` are removed. `no-console` is an error in every file again.

- A logger module that calls `console` starts with `/* eslint-disable no-console -- <reason> */`. Scope it to `no-console`; never use a bare `eslint-disable`.
- A path glob let any file call `console` after a rename, so the preset no longer exempts paths.

Other changes in `eslint-preset-next`:

- `testsExemption` now also matches `.mjs` and `.cjs` test files.
- `TEST_FILE_GLOBS` is exported from `@tcd-devkit/eslint-preset-next/exemptions`, for repo blocks that target tests.
- The README documents `react-hooks/incompatible-library`. The preset keeps it at `warn`. For a known-incompatible library, the expected fix is a one-line suppression with a reason.
