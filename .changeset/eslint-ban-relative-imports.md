---
"@tcd-devkit/eslint-config": minor
"@tcd-devkit/eslint-preset-next": minor
"@tcd-devkit/eslint-preset-node": minor
"@tcd-devkit/eslint-preset-react": minor
---

feat(eslint): Ban relative imports in the base config

**Breaking:** an import from `./` or `../` is now an error. Use a path alias (`@...` from tsconfig `paths`, or `#...` from package.json `imports`).

- `@tcd-devkit/eslint-config` sets `no-restricted-imports` with the relative-import ban, so every preset gets it.
- A CSS side-effect import (`import './globals.css'`) and tool config files (`**/*.config.{js,cjs,mjs,ts}`) are exempt.
- `@tcd-devkit/eslint-config/restrictions` exports `CONFIG_FILE_GLOBS`. Pass it as `ignores` in a block that sets `no-restricted-imports` again, to keep the config-file exemption.
- `restrictedImports(...groups)` now always keeps the ban, like `restrictedSyntax` keeps the arrow-function entries. Pass `aliasOnlyImports({ message })` to set your own message.
