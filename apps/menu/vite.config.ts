
/// <reference types="vitest" />

import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    qwikCity({ basePathname: `/menu/` }),
		qwikVite({
			client: {
				outDir: '../../dist/apps/menu/client',
			},
			ssr: {
				outDir: '../../dist/apps/menu/server',
			},
		}),
		tsconfigPaths(),
	],
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=600',
    },
  },
  server: { host: true, cors: false }, // TODO
  ssr: { target: 'webworker' },
   test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reportsDirectory: '../../coverage/apps/menu'
    }
  }
  
});
