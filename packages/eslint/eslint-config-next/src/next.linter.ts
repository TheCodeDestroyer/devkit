import eslintPluginNext from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';

const nextCoreWebVitals = eslintPluginNext.configs['core-web-vitals'];

export const nextConfig = defineConfig({
  name: '@tcd-devkit/eslint-config-next',
  extends: [nextCoreWebVitals],
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
});

export default nextConfig;
