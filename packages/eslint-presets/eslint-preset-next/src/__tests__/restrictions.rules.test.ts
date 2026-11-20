import type { Linter } from 'eslint';
import { describe, expect, it } from 'vitest';

import { baseConfig } from '@tcd-devkit/eslint-config';
import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import {
  aliasOnlyImports,
  CONVEX_ERROR_ONLY_SYNTAX,
  rawConvexHooks,
  restrictedImports,
  restrictedSyntax,
} from '#restrictions.rules';

const withRules = (rules: Linter.RulesRecord): Linter.Config[] => [
  ...baseConfig,
  { name: 'test/repo-overrides', rules },
];

describe('rawConvexHooks', () => {
  it('should ban each default hook in each hook module', () => {
    const { paths = [] } = rawConvexHooks();

    expect(paths).toHaveLength(9);
    expect(paths[0]).toEqual({
      name: 'convex/react',
      importNames: ['useQuery'],
      message: 'Use useSafeQuery instead.',
    });
  });

  it('should name the wrapper module and use custom wrappers', () => {
    const { paths = [] } = rawConvexHooks({
      wrappers: { useQuery: 'useQueryWithStatus' },
      from: '@client/hooks/convex.hooks',
    });

    expect(paths.map((path) => path.message)).toEqual(
      Array(3).fill(
        'Use useQueryWithStatus from @client/hooks/convex.hooks instead.',
      ),
    );
  });

  it('should FAIL on raw hooks and PASS on the client and provider', async () => {
    const config = withRules({
      'no-restricted-imports': restrictedImports(
        aliasOnlyImports(),
        rawConvexHooks(),
      ),
    });
    const code = `
      import { ConvexReactClient, useMutation } from 'convex/react';
      import { ConvexQueryCacheProvider, useQuery } from 'convex-helpers/react/cache';
      export { ConvexReactClient, ConvexQueryCacheProvider, useMutation, useQuery };
    `;
    const messages = await getLintMessagesForRule(
      config,
      code,
      'no-restricted-imports',
    );

    expect(messages.map((msg) => msg.message)).toEqual([
      expect.stringContaining('Use useSafeMutation instead.'),
      expect.stringContaining('Use useSafeQuery instead.'),
    ]);
  });
});

describe('CONVEX_ERROR_ONLY_SYNTAX', () => {
  const config = withRules({
    'no-restricted-syntax': restrictedSyntax(CONVEX_ERROR_ONLY_SYNTAX),
  });

  it('should FAIL when throwing a native Error', async () => {
    const code = 'const run = () => { throw new TypeError("bad"); };';
    const messages = await getLintMessagesForRule(
      config,
      code,
      'no-restricted-syntax',
    );

    expect(messages).toHaveLength(1);
  });

  it('should PASS when throwing a ConvexError', async () => {
    const code = 'const run = () => { throw new ConvexError("bad"); };';
    const messages = await getLintMessagesForRule(
      config,
      code,
      'no-restricted-syntax',
    );

    expect(messages).toHaveLength(0);
  });

  it('should keep the base arrow-function ban', async () => {
    const code = 'const run = function () { return 1; };';
    const messages = await getLintMessagesForRule(
      config,
      code,
      'no-restricted-syntax',
    );

    expect(messages).toHaveLength(1);
  });
});
