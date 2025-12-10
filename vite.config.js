import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      clientPort: 443
    }
  },
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        auth: './auth.html',
        painel: './painel.html',
        notFound: './404.html'
      }
    }
  }
})
