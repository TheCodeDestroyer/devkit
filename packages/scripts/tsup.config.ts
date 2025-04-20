import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*'],
  sourcemap: true,
  clean: true,
  dts: false,
  shims: true,
  splitting: false,
  treeshake: true,
  bundle: false,
  format: 'cjs',
  tsconfig: 'tsconfig.build.json',
});
