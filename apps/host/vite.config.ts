import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { remotes } from './src/constants/remotes';

let proxy = {};
Object.entries(remotes).forEach(([name, remoteUrl]) => {
	proxy[`^/${name}/.*`] = {
		target: remoteUrl,
		changeOrigin: true,
		rewrite: (path) => path.replace(new RegExp(`^\/${name}`), ''),
	};
});

export default defineConfig(() => {
	return {
		server: { proxy },
		plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
	};
});
