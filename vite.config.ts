import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { VitePWA } from 'vite-plugin-pwa';
import config from './postcss.config';
import { version } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: !isProduction
            },
            manifest: {
                name: 'Gontrel',
                short_name: 'Gontrel',
                description: 'Gontrel - Discover & experience',
                theme_color: '#ffffff',
                start_url: '/',
                display: 'standalone',
                background_color: '#3367D6',
                icons: [
                    {
                        src: '/assets/icon.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/assets/icon.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
                maximumFileSizeToCacheInBytes: 5000000
            }
        }),
        chunkSplitPlugin(),
        splitVendorChunkPlugin()
    ],
    build: {
        minify: isProduction,
        chunkSizeWarningLimit: 2000
    },
    define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(version)
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler' // or "modern"
            },
            postcss: config.plugins
        }
    },
    // To allow the emulator to successfully export the firestor on exit
    server: {
        watch: { usePolling: true }
    }
});
