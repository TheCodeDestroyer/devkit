---
"@tcd-devkit/eslint-config-next": patch
"@tcd-devkit/eslint-config-a11y": patch
"@tcd-devkit/eslint-preset-next": patch
"@tcd-devkit/eslint-preset-node": patch
"@tcd-devkit/eslint-preset-react": patch
"@tcd-devkit/tsup-config": patch
---

fix: Remove package entry points that point to files the build does not create

- `eslint-config-next` and `eslint-config-a11y`: remove the `./rule-overrides` export. These packages have no rules file, so the import always failed.
- Presets: remove the `require` export and point `main` to the ESM file. The build makes ESM only, so the `.cjs` file never existed.
- `tsup-config`: point `main` to the ESM file for the same reason.
