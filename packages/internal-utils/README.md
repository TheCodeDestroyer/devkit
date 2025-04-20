# @tcd-devkit/internal-utils

This private package provides internal utility functions for testing ESLint configurations and rules within the `@tcd-devkit` monorepo.

## Purpose

The primary use of this package is to facilitate the programmatic linting of code snippets or files to verify the behavior of specific ESLint rules during tests.

It currently includes helper functions such as:

- `getLintMessagesForRule`: Lints a string of code and retrieves messages for a specific ESLint rule.
- `getLintMessagesForRuleFromFiles`: Lints specified files and retrieves messages for a specific ESLint rule.

## Usage

These utilities are intended for use in test files within other `@tcd-devkit` packages (e.g., when testing custom ESLint configurations).

**Note**: This package is not intended for direct use in production code or for publishing outside of this monorepo.

## License

MIT © [Nace Logar](https://thecodedestroyer.com)
