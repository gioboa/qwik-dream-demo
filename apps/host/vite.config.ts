/// <reference types="vitest" />

import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { UserConfig, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

const { dependencies = {}, devDependencies = {} } = pkg as any as {
	dependencies: Record<string, string>;
	devDependencies: Record<string, string>;
	[key: string]: unknown;
};

export default defineConfig(({ command, mode }): UserConfig => {
	return {
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
		optimizeDeps: {
			exclude: [],
		},
		ssr:
			command === 'build' && mode === 'production'
				? {
						noExternal: Object.keys(devDependencies),
						external: Object.keys(dependencies),
				  }
				: undefined,
		server: {
			fs: {
				// Allow serving files from the project root
				allow: ['../../'],
			},
			headers: {
				'Cache-Control': 'public, max-age=0',
			},
		},
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
