import { fileURLToPath } from 'node:url';

import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        reportsDirectory: 'coverage',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: [
          '**/node_modules/**',
          'dist/**',
          'src/main.ts',
        ],
      },
      globals: true,
      environment: 'jsdom',
      setupFiles: ['vitest.init.ts'],
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);
