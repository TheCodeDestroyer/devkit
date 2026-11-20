import type { Linter } from 'eslint';
import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import {
  aliasOnlyImports,
  ARROW_FUNCTION_SYNTAX,
  restrictedImports,
  restrictedSyntax,
} from '#restrictions.rules';

const withRules = (rules: Linter.RulesRecord): Linter.Config[] => [
  ...baseConfig,
  { name: 'test/repo-overrides', rules },
];

describe('restrictedSyntax', () => {
  it('should keep the base arrow-function entries first', () => {
    const extra = { selector: 'WithStatement', message: 'No with.' };

    expect(restrictedSyntax([extra])).toEqual([
      'error',
      ...ARROW_FUNCTION_SYNTAX,
      extra,
    ]);
  });

  it('should FAIL on both a base entry and a repo entry', async () => {
    const config = withRules({
      'no-restricted-syntax': restrictedSyntax([
        { selector: 'DebuggerStatement', message: 'No debugger.' },
      ]),
    });
    const code = 'const run = function () { debugger; };';
    const messages = await getLintMessagesForRule(
      config,
      code,
      'no-restricted-syntax',
    );

    expect(messages.map((msg) => msg.message)).toEqual([
      'Use arrow function instead.',
      'No debugger.',
    ]);
  });
});

describe('restrictedImports', () => {
  it('should concatenate the paths and patterns of each group', () => {
    const hooks = { paths: [{ name: 'a', importNames: ['x'] }] };
    const more = { paths: [{ name: 'b' }], patterns: [{ group: ['c/*'] }] };

    expect(restrictedImports(hooks, aliasOnlyImports(), more)).toEqual([
      'error',
      {
        paths: [{ name: 'a', importNames: ['x'] }, { name: 'b' }],
        patterns: [
          {
            group: ['./*', '../*', '!**/*.css'],
            message: 'Use a path alias instead of a relative import.',
          },
          { group: ['c/*'] },
        ],
      },
    ]);
  });

  it('should leave out an empty list', () => {
    expect(restrictedImports({ paths: [{ name: 'a' }] })).toEqual([
      'error',
      { paths: [{ name: 'a' }] },
    ]);
  });

  it('should FAIL on an import from each group', async () => {
    const config = withRules({
      'no-restricted-imports': restrictedImports(
        aliasOnlyImports({ message: 'Use @app.' }),
        { paths: [{ name: 'lodash', message: 'No lodash.' }] },
      ),
    });
    const code = `
      import { a } from './a';
      import b from 'lodash';
      import './globals.css';
      export { a, b };
    `;
    const messages = await getLintMessagesForRule(
      config,
      code,
      'no-restricted-imports',
    );

    expect(messages).toHaveLength(2);
    expect(messages[0]?.message).toContain('Use @app.');
    expect(messages[1]?.message).toContain('No lodash.');
  });
});
