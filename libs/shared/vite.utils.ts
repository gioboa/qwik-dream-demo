import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const customDefineConfig = (name: string) =>
	defineConfig(() => {
		return {
			basePathName: `/${name}/build`,
			server: { host: true, cors: false },
			ssr: { target: 'webworker' },
			plugins: [
				qwikCity({ basePathname: `/${name}/` }),
				qwikVite(),
				tsconfigPaths(),
			],
		};
	});
