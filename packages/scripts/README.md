# @tcd-devkit/scripts

This package provides the `tcd-scripts` CLI (Command Line Interface), a utility for linting and formatting JavaScript/TypeScript projects within the @tcd-devkit ecosystem. It integrates ESLint, Prettier, and the TypeScript compiler (`tsc`) to enforce code quality and consistency.

## Features

- **Unified Interface**: Single CLI (`tcd-scripts`) for multiple linting and formatting tasks.
- **Linting**: (`tcd-scripts lint`)
  - Runs ESLint for code style and error checking.
  - Runs Prettier in check mode (`prettier --check`) for formatting consistency.
  - Runs TypeScript compiler (`tsc --noEmit`) for type checking.
  - Customizable to run only specific tools (`eslint`, `prettier`, `tsc`).
- **Formatting**: (`tcd-scripts format` or `tcd-scripts f`)
  - Runs ESLint with `--fix` to automatically fix linting issues.
  - Runs Prettier with `--write` to format files.
  - Customizable to run only specific tools (`eslint`, `prettier`).
- **Caching**: Supports caching for faster execution on subsequent runs (where underlying tools support it).
- **Flexible Configuration**: Allows specifying target files/directories and custom ignore paths.

## Installation

Install the package globally if you intend to use `tcd-scripts` as a standalone CLI across multiple projects, or locally as a dev dependency in your project.

```bash
# Global installation (example)
# npm install -g @tcd-devkit/scripts

# Local installation (recommended for most projects)
npm install -D @tcd-devkit/scripts eslint prettier typescript
# or
yarn add -D @tcd-devkit/scripts eslint prettier typescript
# or
pnpm add -D @tcd-devkit/scripts eslint prettier typescript
```

**Peer Dependencies**: This package relies on `eslint`, `prettier`, and `typescript` being available in your project. Please ensure they are installed as peer or dev dependencies.

## Usage

The CLI is invoked using the `tcd-scripts` command.

```
tcd-scripts [command] [options] [files...]
```

### Global Options

- `-V`, `--version`: Output the version number.
- `-h`, `--help`: Display help for command.

### Commands

#### `tcd-scripts lint [files...]`

Runs ESLint, Prettier (check mode), and TypeScript type checking.

- `[files...]`: Optional. Space-separated list of files or glob patterns to lint. Defaults to `.` (current directory).

**Options for `lint`:**

- `--only <tool>`: Run only the specified tool. `<tool>` can be `eslint`, `prettier`, or `tsc`. (e.g., `tcd-scripts lint --only eslint`)
- `--skip <tool>`: Skip the specified tool. `<tool>` can be `eslint`, `prettier`, or `tsc`. (e.g., `tcd-scripts lint --skip tsc`)
- `--cache`, `--no-cache`: Enable/disable caching. (Default: enabled where supported)
- `--refresh-cache`: Force refresh of the cache.
- `--ignore-path <path>`: Path to a custom ignore file (e.g., `.myignore`).
- `--project <path>`: Path to your `tsconfig.json` or equivalent TypeScript project file. (e.g., `tcd-scripts lint --project ./tsconfig.build.json`)
- `--max-warnings <number>`: Maximum number of warnings allowed before failing. (Default: 0)

**Example:**

```bash
tcd-scripts lint ./src ./tests --only eslint --project ./tsconfig.lint.json --max-warnings 10
```

#### `tcd-scripts format [files...]` (alias: `tcd-scripts f`)

Formats code using ESLint (`--fix`) and Prettier (`--write`).

- `[files...]`: Optional. Space-separated list of files or glob patterns to format. Defaults to `.` (current directory).

**Options for `format`:**

- `--only <tool>`: Format only with the specified tool. `<tool>` can be `eslint` or `prettier`. (e.g., `tcd-scripts format --only prettier`)
- `--skip <tool>`: Skip formatting with the specified tool. `<tool>` can be `eslint` or `prettier`. (e.g., `tcd-scripts format --skip eslint`)
- `--cache`, `--no-cache`: Enable/disable caching. (Default: enabled where supported)
- `--refresh-cache`: Force refresh of the cache.
- `--ignore-path <path>`: Path to a custom ignore file (e.g., `.myignore`).

**Example:**

```bash
tcd-scripts format ./src --only prettier
```

## Configuration

The `tcd-scripts` CLI relies on the standard configuration files for its underlying tools:

- **ESLint**: `.eslintrc.js`, `eslint.config.js`, etc. (Uses `@tcd-devkit/eslint-config-*` or `@tcd-devkit/eslint-preset-*` by convention).
- **Prettier**: `.prettierrc.js`, `prettier.config.js`, or `prettier` key in `package.json` (Uses `@tcd-devkit/prettier-config-*` by convention).
- **TypeScript**: `tsconfig.json`.

Ensure these configurations are present and correctly set up in your project.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
