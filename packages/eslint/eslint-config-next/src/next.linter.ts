import { configs as nextPluginConfigs } from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';

const nextCoreWebVitals = nextPluginConfigs['core-web-vitals'];

export const nextConfig = defineConfig({
  name: '@tcd-devkit/eslint-config-next',
  extends: [nextCoreWebVitals],
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
});

export default nextConfig;
