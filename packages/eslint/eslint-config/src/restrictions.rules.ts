import type { Linter } from 'eslint';

/**
 * Flat config REPLACES a rule's options rather than merging them. A repo that
 * sets `no-restricted-syntax` or `no-restricted-imports` drops every entry it
 * does not restate. These helpers build one rule entry from several groups, so
 * a repo adds its own group and keeps the shared ones.
 */

export interface RestrictedSyntaxEntry {
  selector: string;
  message?: string;
}

export interface RestrictedImportPath {
  name: string;
  importNames?: string[];
  allowImportNames?: string[];
  message?: string;
}

export interface RestrictedImportPattern {
  group?: string[];
  regex?: string;
  importNames?: string[];
  importNamePattern?: string;
  allowImportNames?: string[];
  allowImportNamePattern?: string;
  caseSensitive?: boolean;
  allowTypeImports?: boolean;
  message?: string;
}

export interface RestrictedImportsGroup {
  paths?: RestrictedImportPath[];
  patterns?: RestrictedImportPattern[];
}

/** The base config's own `no-restricted-syntax` entries: arrow functions only. */
export const ARROW_FUNCTION_SYNTAX: RestrictedSyntaxEntry[] = [
  {
    selector: 'FunctionExpression',
    message: 'Use arrow function instead.',
  },
  {
    selector: 'FunctionDeclaration',
    message: 'Use arrow function instead.',
  },
];

/**
 * ESLint rejects the whole config when a restriction list holds two identical
 * entries. Two groups can share an entry, so keep the first one only.
 */
const uniqueEntries = <T>(entries: T[]): T[] => {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    const key = JSON.stringify(entry);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
};

/**
 * Builds one `no-restricted-syntax` entry. The base config's arrow-function
 * entries always come first, so a repo cannot drop them by accident.
 */
export const restrictedSyntax = (
  ...groups: RestrictedSyntaxEntry[][]
): Linter.RuleEntry => [
  'error',
  ...uniqueEntries([...ARROW_FUNCTION_SYNTAX, ...groups.flat()]),
];

/**
 * Builds one `no-restricted-imports` entry from several groups. It concatenates
 * the `paths` and the `patterns` of each group, and leaves out an empty list.
 */
export const restrictedImports = (
  ...groups: RestrictedImportsGroup[]
): Linter.RuleEntry => {
  const paths = uniqueEntries(groups.flatMap((group) => group.paths ?? []));
  const patterns = uniqueEntries(
    groups.flatMap((group) => group.patterns ?? []),
  );

  return [
    'error',
    {
      ...(paths.length > 0 ? { paths } : {}),
      ...(patterns.length > 0 ? { patterns } : {}),
    },
  ];
};

export interface AliasOnlyImportsOptions {
  /** Names the repo's aliases, e.g. 'Use a path alias (@client, @server).' */
  message?: string;
}

/**
 * Bans relative imports, so code goes through the repo's path aliases. The
 * `!**\/*.css` negation keeps the Next.js idiom of a side-effect
 * `import './globals.css'` next to the layout that owns it.
 */
export const aliasOnlyImports = ({
  message = 'Use a path alias instead of a relative import.',
}: AliasOnlyImportsOptions = {}): RestrictedImportsGroup => ({
  patterns: [{ group: ['./*', '../*', '!**/*.css'], message }],
});
