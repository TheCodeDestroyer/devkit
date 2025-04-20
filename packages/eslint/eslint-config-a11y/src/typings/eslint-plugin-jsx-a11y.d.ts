declare module 'eslint-plugin-jsx-a11y' {
  const eslintPluginJsxA11y: {
    configs: {
      recommended: Linter.LegacyConfig;
      strict: Linter.LegacyConfig;
    };
    flatConfigs: {
      recommended: Linter.Config;
      strict: Linter.Config;
    };
  };

  export = eslintPluginJsxA11y;
}
