import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { type RemoteData } from './remotes';

export const customDefineConfig = ({ name }: RemoteData) =>
	defineConfig(() => {
		return {
			basePathName: `/${name}/build`,
			server: {
				host: true,
				cors: false,
				fs: { allow: ['../..'] },
			},
			ssr: { target: 'webworker' },
			plugins: [qwikCity({ basePathname: `/${name}/` }), qwikVite(), tsconfigPaths()],
		};
	});
