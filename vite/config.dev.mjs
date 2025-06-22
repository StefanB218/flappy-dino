import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    },
  },
  server: {
    port: 8080,
    hmr: {
      overlay: true,
      // If you're behind a proxy or facing network issues:
      // port: 24678,
      // If HMR still has issues:
      // protocol: 'ws',
      // host: 'localhost',
    },
    // Ensure all network requests can be served
    host: '0.0.0.0',
    // Log more info to debug HMR issues
    watch: {
      usePolling: true,
    },
  },
});
