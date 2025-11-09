import eslintPluginNext from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const nextCoreWebVitals = eslintPluginNext.configs['core-web-vitals'];

export const nextConfig = defineConfig({
  name: '@tcd-devkit/eslint-config-next',
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  extends: [nextCoreWebVitals],
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
});

export default nextConfig;
