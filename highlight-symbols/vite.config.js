import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest';

export default defineConfig({
	build: {
		target: 'esnext'
	},
	resolve: {
		alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) }
	},
	plugins: [crx({ manifest })]
});
