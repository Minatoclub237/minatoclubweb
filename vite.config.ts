import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({isSsrBuild}) => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        // Le découpage manuel ne s'applique qu'au build client : en SSR, react/react-dom
        // sont externes et ne peuvent pas figurer dans manualChunks.
        output: isSsrBuild
          ? {}
          : {
              // Découpage en chunks séparés : meilleur cache navigateur + chargement parallèle.
              // (hls.js est déjà auto-scindé car importé dynamiquement dans CtaFooter.)
              manualChunks: {
                'react-vendor': ['react', 'react-dom'],
                'motion': ['motion'],
              },
            },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
