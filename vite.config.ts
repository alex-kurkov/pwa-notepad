import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      assets: '/src/assets',
      components: '/src/components',
      context: '/src/context',
      hocs: '/src/hocs',
      layout: '/src/layout',
      pages: '/src/pages',
      router: '/src/router',
      utils: '/src/utils',
    },
  },
});
