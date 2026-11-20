---
"@tcd-devkit/eslint-config": minor
"@tcd-devkit/eslint-preset-next": minor
---

feat(eslint): Add shared path exemptions and restriction merge helpers

- `@tcd-devkit/eslint-preset-next` now turns rules off for the logger module, CLI scripts, tool config files, CommonJS files, the Next.js manifest and tests. The blocks are exported from `@tcd-devkit/eslint-preset-next/exemptions`.
- `@tcd-devkit/eslint-config/restrictions` exports `restrictedSyntax`, `restrictedImports` and `aliasOnlyImports`, so a repo can add its own restriction group without restating the shared ones.
- `@tcd-devkit/eslint-preset-next/restrictions` re-exports those helpers and adds the Convex groups `rawConvexHooks` and `CONVEX_ERROR_ONLY_SYNTAX`.
