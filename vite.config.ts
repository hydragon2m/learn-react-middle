import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Tách React và các thư viện lõi thành chunk riêng
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Tách thư viện router
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          // Tách thư viện quản lý state và data fetching
          if (id.includes('node_modules/@tanstack') || id.includes('node_modules/zustand')) {
            return 'state-vendor';
          }
          // Tách toàn bộ node_modules còn lại thành vendor chung
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
