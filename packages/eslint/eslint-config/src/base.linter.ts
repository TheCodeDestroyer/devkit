import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslintPlugin from '@eslint/js';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { baseRules } from '#base.rules';

const cwdURL = `file://${process.cwd()}/`;
const gitignorePath = fileURLToPath(new URL(`.gitignore`, cwdURL));

const fileExists = fs.existsSync(gitignorePath);

let gitignoreConfig = {};

if (fileExists) {
  gitignoreConfig = includeIgnoreFile(gitignorePath);
}

export const baseConfig: Linter.Config[] = defineConfig([
  gitignoreConfig,
  {
    name: '@tcd-devkit/eslint-config',
    extends: [eslintPlugin.configs.recommended],
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    rules: baseRules,
  },
]);

export default baseConfig;
