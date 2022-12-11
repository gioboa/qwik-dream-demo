import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig, ServerOptions } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { remotes } from '../../libs/shared/remotes';

let proxy: ServerOptions['proxy'] = {};
Object.values(remotes).forEach(({ name, url }) => {
	proxy![`^/${name}/.*`] = { target: url.replace(`${name}/`, '') };
});

export default defineConfig(() => {
	return {
		server: { proxy },
		plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
	};
});
