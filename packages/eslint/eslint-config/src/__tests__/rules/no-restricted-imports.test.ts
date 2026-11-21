import { describe, expect, it } from 'vitest';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';

import { baseConfig } from '#base.linter';
import type { CustomRule } from '#base.rules';

const ruleId: CustomRule = 'no-restricted-imports';

describe(`${ruleId} rule`, () => {
  it('should FAIL on a relative import and a relative re-export', async () => {
    const code = `
      import { sibling } from './sibling';
      import { parent } from '../parent';
      import { deep } from '../../lib/deep/module';
      import { nested } from './lib/nested';
      export { sibling, parent, deep, nested };
      export * from './barrel';
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(5);
    expect(messages[0]?.message).toContain(
      'Use a path alias instead of a relative import.',
    );
  });

  it('should PASS on an alias, a package and a CSS side-effect import', async () => {
    const code = `
      import { client } from '@client/api';
      import { helper } from '#helper';
      import { useState } from 'react';
      import fs from 'node:fs';
      import './globals.css';
      import './styles/app.css';
      import '../../styles/theme.css';
      export { client, helper, useState, fs };
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId);

    expect(messages).toHaveLength(0);
  });

  it('should PASS in a tool config file', async () => {
    const code = `
      import { shared } from './src/shared.config.js';
      export default shared;
    `;
    const messages = await getLintMessagesForRule(baseConfig, code, ruleId, {
      lintTextOptions: { filePath: 'tsup.config.ts' },
    });

    expect(messages).toHaveLength(0);
  });
});
