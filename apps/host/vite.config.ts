/// <reference types="vitest" />

import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig, ServerOptions } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { remotes } from '@qwikdream/shared';
import { remotes } from '../../libs/shared/src/lib/remotes';

let proxy: ServerOptions['proxy'] = {};
Object.values(remotes).forEach(({ name, url }) => {
	proxy![`^/${name}/.*`] = {
		target: url.replace(`${name}/`, ''),
		changeOrigin: true,
		rewrite: path => path.replace(`/${name}`, ''),
		configure: (proxy, _options) => {
			proxy.on('error', (err, _req, _res) => {
				console.log('proxy error', err);
			});
			proxy.on('proxyReq', (proxyReq, req, _res) => {
				console.log(
					'Sending Request:',
					req.method,
					req.url,
					req,
					' => TO THE TARGET =>  ',
					proxyReq.method,
					proxyReq.protocol,
					proxyReq.host,
					proxyReq.path,
					JSON.stringify(proxyReq.getHeaders()),
				);
			});
			proxy.on('proxyRes', (proxyRes, req, _res) => {
				console.log(
					'Received Response from the Target:',
					proxyRes.statusCode,
					req.url,
					JSON.stringify(proxyRes.headers),
				);
			});
		},
	};
});

export default defineConfig({
	plugins: [
		qwikCity(),
		qwikVite({
			client: {
				outDir: '../../dist/apps/host/client',
			},
			ssr: {
				outDir: '../../dist/apps/host/server',
			},
		}),
		tsconfigPaths(),
	],
	preview: {
		headers: {
			'Cache-Control': 'public, max-age=600',
		},
	},
	server: {
		fs: {
			// Allow serving files from the project root
			allow: ['../../'],
		},
		proxy: {
			// configure: (proxy, _options) => {
			// 	proxy.on('error', (err, _req, _res) => {
			// 		console.log('proxy error', err);
			// 	});
			// 	proxy.on('proxyReq', (proxyReq, req, _res) => {
			// 		console.log('Sending Request to the Target:', req.method, req.url);
			// 	});
			// 	proxy.on('proxyRes', (proxyRes, req, _res) => {
			// 		console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
			// 	});
			// },
			'/cart/build': {
				target: 'http://localhost:5006',
				rewrite: path => path.replace('/cart', ''),
			},
			'/hero/build': {
				target: 'http://localhost:5002',
				rewrite: path => path.replace('/hero', ''),
			},
			'/menu/build': {
				target: 'http://localhost:5003',
				rewrite: path => path.replace('/menu', ''),
			},
			'/product/build': {
				target: 'http://localhost:5004',
				rewrite: path => path.replace('/product', ''),
			},
			'/reviews/build': {
				target: 'http://localhost:5005',
				rewrite: path => path.replace('/reviews', ''),
			},
		},
	},
	test: {
		globals: true,
		cache: {
			dir: '../../node_modules/.vitest',
		},
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		coverage: {
			reportsDirectory: '../../coverage/apps/host',
		},
	},
});
