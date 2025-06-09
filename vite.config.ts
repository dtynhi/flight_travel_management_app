import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import path from 'path';

const buildTimestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);

export default defineConfig({
  plugins: [react({ tsDecorators: true })],
  server: {
    port: 3001
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Add timestamp to filenames to clear cache with each build
        entryFileNames: `assets/[name].[hash].${buildTimestamp}.js`,
        chunkFileNames: `assets/[name].[hash].${buildTimestamp}.js`,
        assetFileNames: `assets/[name].[hash].${buildTimestamp}.[ext]`
      }
    },
    outDir: 'build'
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized]
    }
  }
});
