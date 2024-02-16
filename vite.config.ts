import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  optimizeDeps: {
    include: ['tailwindcss'],
  },
  plugins: [
    vue(),
    viteCommonjs(),
    Components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue'],
      deep: true,
      dts: true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
