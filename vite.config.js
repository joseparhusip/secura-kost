import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Memaksa Vite jalan di 127.0.0.1 untuk menghindari blokir CORS PNA Chrome
    port: 5173,
    proxy: {
      '/api/midtrans': {
        target: 'https://app.sandbox.midtrans.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/midtrans/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq) => {
            // Hapus jejak browser agar Midtrans mengira ini request dari Backend murni
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          });
        }
      },
    },
  },
})