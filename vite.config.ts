import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const gatewayUrl = env.VITE_OPENCLAW_GATEWAY_URL || 'http://127.0.0.1:18789';
  const gatewayToken = env.VITE_OPENCLAW_GATEWAY_TOKEN || '';

  return {
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    base: './',
    server: {
      proxy: {
        '/tools': {
          target: gatewayUrl,
          changeOrigin: true,
          headers: gatewayToken
            ? { Authorization: `Bearer ${gatewayToken}` }
            : undefined,
        },
      },
    },
  };
});
