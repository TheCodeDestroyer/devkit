import nextPlugin from '@next/eslint-plugin-next';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

const { flatConfig: nextPluginConfigs } = nextPlugin;

const nextCoreWebVitals = nextPluginConfigs.coreWebVitals as Linter.Config;

export const nextConfig = defineConfig({
  name: '@tcd-devkit/eslint-config-next',
  extends: [nextCoreWebVitals],
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
});

export default nextConfig;
