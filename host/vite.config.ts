import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
	return {
		server: {
			proxy: {
				'^/menu/.*': {
					target: 'http://localhost:5001',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/menu/, ''),
				},
				'^/hero/.*': {
					target: 'http://localhost:5002',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/hero/, ''),
				},
			},
		},
		plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
	};
});
