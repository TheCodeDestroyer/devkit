import type {
  RestrictedImportPath,
  RestrictedImportsGroup,
  RestrictedSyntaxEntry,
} from '@tcd-devkit/eslint-config/restrictions';

export {
  aliasOnlyImports,
  ARROW_FUNCTION_SYNTAX,
  CONFIG_FILE_GLOBS,
  restrictedImports,
  restrictedSyntax,
} from '@tcd-devkit/eslint-config/restrictions';
export type {
  AliasOnlyImportsOptions,
  RestrictedImportPath,
  RestrictedImportPattern,
  RestrictedImportsGroup,
  RestrictedSyntaxEntry,
} from '@tcd-devkit/eslint-config/restrictions';

/**
 * The modules that export the raw Convex React hooks. Both `convex-helpers`
 * entry points re-export a `useQuery` that bypasses the same wrapper.
 * Modules, not whole packages: `ConvexReactClient` and
 * `ConvexQueryCacheProvider` come from these paths, and the provider needs them.
 */
export const CONVEX_HOOK_MODULES = [
  'convex/react',
  'convex-helpers/react',
  'convex-helpers/react/cache',
];

/** Raw hook name → the name of the repo's safe wrapper. */
export type ConvexHookWrappers = Record<string, string>;

export const DEFAULT_CONVEX_HOOK_WRAPPERS: ConvexHookWrappers = {
  useQuery: 'useSafeQuery',
  useMutation: 'useSafeMutation',
  useAction: 'useSafeAction',
};

export interface RawConvexHooksOptions {
  /** Replaces the default map. Add `usePaginatedQuery` here if you wrap it. */
  wrappers?: ConvexHookWrappers;
  /** The module that holds the wrappers, e.g. '@client/hooks/convex.hooks'. */
  from?: string;
}

/**
 * Bans the raw Convex React hooks. Raw `useQuery` returns `undefined` both for
 * a query that threw and for one that is still loading, so a screen renders
 * its empty state on failure. Raw `useMutation` rejects, so a click handler
 * without a catch does nothing. Exempt the file that defines the wrappers.
 */
export const rawConvexHooks = ({
  wrappers = DEFAULT_CONVEX_HOOK_WRAPPERS,
  from,
}: RawConvexHooksOptions = {}): RestrictedImportsGroup => {
  const source = from ? ` from ${from}` : '';
  const paths: RestrictedImportPath[] = CONVEX_HOOK_MODULES.flatMap((name) =>
    Object.entries(wrappers).map(([hook, wrapper]) => ({
      name,
      importNames: [hook],
      message: `Use ${wrapper}${source} instead.`,
    })),
  );

  return { paths };
};

/**
 * Convex scrubs the message of a thrown native Error to "Server Error" on the
 * client in production. Only a ConvexError carries its message and data over
 * the wire. Scope this to `convex/**`, and leave out tests.
 */
export const CONVEX_ERROR_ONLY_SYNTAX: RestrictedSyntaxEntry[] = [
  {
    selector:
      'ThrowStatement > NewExpression[callee.name=/^(Error|TypeError|RangeError|SyntaxError|ReferenceError|EvalError|URIError|AggregateError)$/]',
    message:
      'Throw ConvexError (from convex/values) instead of a native Error. Convex scrubs a native error message to "Server Error" on the client in production.',
  },
];
