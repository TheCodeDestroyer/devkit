export const FORMAT_TOOLS = ['eslint', 'prettier'] as const;
export const LINT_TOOLS = ['eslint', 'prettier', 'tsc'] as const;

export type FormatTool = (typeof FORMAT_TOOLS)[number];
export type LintTool = (typeof LINT_TOOLS)[number];

interface BaseCommandOptions {
  cache?: boolean;
  refreshCache?: boolean;
  cacheLocation?: string;
  ignorePath?: string;
}

export interface ToolSelectionOptions<TTool extends string> {
  only?: TTool;
  skip?: TTool[];
}

export interface FormatCommandOptions
  extends BaseCommandOptions,
    ToolSelectionOptions<FormatTool> {}

export interface LintCommandOptions
  extends BaseCommandOptions,
    ToolSelectionOptions<LintTool> {
  project?: string;
}
