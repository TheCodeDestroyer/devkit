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
 * entries. Two groups can share an entry, so keep the first one only. ESLint
 * ignores the key order when it compares two entries, so the key does too.
 */
const uniqueEntries = <T extends object>(entries: T[]): T[] => {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    const key = JSON.stringify(entry, Object.keys(entry).sort());

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
 * The glob group that matches a relative import, but not a CSS side-effect
 * import. The globs follow gitignore rules: a negation cannot bring back a
 * file whose parent directory matches. So the two `/` negations bring back
 * the directories, and `!**\/*.css` then allows a CSS file at any depth.
 */
const RELATIVE_IMPORT_GROUP = [
  './**',
  '../**',
  '!./**/',
  '!../**/',
  '!**/*.css',
];
const RELATIVE_IMPORT_KEY = RELATIVE_IMPORT_GROUP.join();

/**
 * Tool config files. A tool loads its config before any path alias resolves,
 * so the base config exempts these files from the relative-import ban. Pass
 * it as `ignores` in a block that sets `no-restricted-imports` again.
 */
export const CONFIG_FILE_GLOBS = ['**/*.config.{js,cjs,mjs,ts}'];

/** Each call copies the group, so a caller cannot change the shared list. */
const relativeImportBan = (
  message = 'Use a path alias instead of a relative import.',
): RestrictedImportPattern => ({ group: [...RELATIVE_IMPORT_GROUP], message });

const isRelativeImportBan = (pattern: RestrictedImportPattern): boolean =>
  pattern.group?.join() === RELATIVE_IMPORT_KEY;

export interface AliasOnlyImportsOptions {
  /** Names the repo's aliases, e.g. 'Use a path alias (@client, @server).' */
  message?: string;
}

/**
 * Bans relative imports, so code goes through the repo's path aliases. The
 * `!**\/*.css` negation keeps the Next.js idiom of a side-effect
 * `import './globals.css'` next to the layout that owns it. The base config
 * and `restrictedImports` apply it already. Call it only to set the message.
 */
export const aliasOnlyImports = ({
  message,
}: AliasOnlyImportsOptions = {}): RestrictedImportsGroup => ({
  patterns: [relativeImportBan(message)],
});

/**
 * Builds one `no-restricted-imports` entry from several groups. It concatenates
 * the `paths` and the `patterns` of each group, and leaves out an empty
 * `paths` list. The relative-import ban always comes first, and the entry holds it one time
 * only, so a repo cannot drop it by accident. A group from `aliasOnlyImports`
 * replaces the default ban, which is how a repo sets its own message. If more
 * than one group sets a message, the last one wins.
 */
export const restrictedImports = (
  ...groups: RestrictedImportsGroup[]
): Linter.RuleEntry => {
  const paths = uniqueEntries(groups.flatMap((group) => group.paths ?? []));
  const given = groups.flatMap((group) => group.patterns ?? []);
  const bans = given.filter(isRelativeImportBan);
  const others = given.filter((pattern) => !isRelativeImportBan(pattern));
  const patterns = [
    bans.at(-1) ?? relativeImportBan(),
    ...uniqueEntries(others),
  ];

  return ['error', { ...(paths.length > 0 ? { paths } : {}), patterns }];
};
