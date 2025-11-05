import { describe, expect, it } from 'bun:test';

import { getLintMessagesForRule } from '@tcd-devkit/internal-utils/test';
import type { GetLintMessagesOptions } from '@tcd-devkit/internal-utils/test';

import { reactHooksConfig } from '#hooks.linter';
import type { CustomRule } from '#hooks.rules';

const ruleId: CustomRule = 'react-hooks/exhaustive-deps';

const lintTextOptions: GetLintMessagesOptions = {
  eslintOptions: {
    cwd: import.meta.dirname,
  },
};

describe(`${ruleId} rule`, () => {
  it('should FAIL when missing dependencies', async () => {
    const code = `
      const Component = () => {
        const [count, setCount] = useState(0);

        useEffect(() => {
          setCount(count + 1);
        }, []);

        return count;
      };
    `;
    const messages = await getLintMessagesForRule(
      reactHooksConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(1);
  });

  it('should PASS when dependencies are present', async () => {
    const code = `
    const Component = () => {
      const [count, setCount] = useState(0);

      useEffect(() => {
        setCount(count + 1);
      }, [count]);

      return count;
    };
  `;
    const messages = await getLintMessagesForRule(
      reactHooksConfig,
      code,
      ruleId,
      lintTextOptions,
    );

    expect(messages).toHaveLength(0);
  });
});
