/// <reference types="vitest" />

import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig, ServerOptions } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { remotes } from '@qwikdream/shared';
import { remotes } from '../../libs/shared/src/lib/remotes';

let proxy: ServerOptions['proxy'] = {};
Object.values(remotes).forEach(({ name, url }) => {
	proxy![`^/${name}/.*`] = { target: url.replace(`${name}/`, '') };
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
		proxy,
		fs: {
		  // Allow serving files from the project root
		  allow: ['../../'],
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
