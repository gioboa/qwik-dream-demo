import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { type RemoteData } from './remotes';

export const customDefineConfig = ({ name, port }: RemoteData) =>
	defineConfig(() => {
		return {
			basePathName: `/${name}/build`,
			server: { host: true, cors: false, port },
			ssr: { target: 'webworker' },
			plugins: [
				qwikCity({ basePathname: `/${name}/` }),
				qwikVite(),
				tsconfigPaths(),
			],
		};
	});
